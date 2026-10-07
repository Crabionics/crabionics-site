import { digest, redis, namespace, storageConfigured } from "../../lib/registration-service";
import { registrationAccess } from "../../lib/registration-access";
import { funnelEvents, funnelPages, funnelSources, readFunnel, recordFunnel } from "../../lib/funnel";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, {status:403});
  if (!storageConfigured()) return new Response(null, {status:204});
  const text = await request.text();
  if (text.length > 300) return new Response(null, {status:413});
  try {
    const {event, source, page} = JSON.parse(text);
    if (!funnelEvents.includes(event) || !funnelSources.includes(source) || !funnelPages.includes(page)) return new Response(null, {status:400});
    const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "local";
    const rateKey = `${namespace()}:funnel-rate:${digest(ip)}:${Math.floor(Date.now()/60000)}`;
    const count = await redis<number>(["EVAL", "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n", 1, rateKey]);
    if (count > 30) return new Response(null, {status:429});
    await recordFunnel(event, source, page);
  } catch { console.warn(JSON.stringify({component:"journey_metrics",event:"count_unavailable"})); }
  return new Response(null, {status:204});
}
export async function GET(request: Request) {
  const headers = {"Cache-Control":"no-store"};
  if (!await registrationAccess(request)) return new Response("Unauthorized", {status:401, headers});
  try { return Response.json({days:await readFunnel()}, {headers}); }
  catch { return Response.json({error:"Journey counts unavailable"}, {status:503, headers}); }
}
