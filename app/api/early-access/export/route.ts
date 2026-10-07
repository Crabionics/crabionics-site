import { registrationAccess } from "../../../lib/registration-access";
import {
  namespace,
  redis,
  type StoredRegistration,
  retryPendingNotifications,
  retryNotification,
  operation,
  digest,
} from "../../../lib/registration-service";
export const runtime = "nodejs";
export async function GET(request: Request) {
  if (!await registrationAccess(request))
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  try {
    await retryPendingNotifications(1);
    const params = new URL(request.url).searchParams;
    const offset = Math.floor(Math.max(0, Math.min(1000000, Number(params.get("offset")) || 0)));
    const limit = Math.floor(Math.max(1, Math.min(100, Number(params.get("limit")) || 100)));
    const ids = await redis<string[]>([
      "ZREVRANGE",
      `${namespace()}:confirmed`,
      offset,
      offset + limit - 1,
    ]);
    const rows = ids.length
      ? await redis<(string | null)[]>([
          "MGET",
          ...ids.map((id) => `${namespace()}:record:${id}`),
        ])
      : [];
    const records = rows
      .filter((row): row is string => Boolean(row))
      .map((row) => JSON.parse(row) as StoredRegistration)
      .filter((row) => row.status === "confirmed");
    if (new URL(request.url).searchParams.get("format") === "json")
      return Response.json(
        { records, nextOffset: ids.length === limit ? offset + limit : null },
        { headers: { "Cache-Control": "no-store" } },
      );
    const fields = [
      "name",
      "email",
      "role",
      "region",
      "interest",
      "setting",
      "updates",
      "createdAt",
      "confirmedAt",
      "notification",
    ] as const;
    const cell = (value: unknown) =>
      '"' +
      String(value ?? "")
        .replace(/^\s*[=+@-]/, "'$&")
        .replaceAll('"', '""') +
      '"';
    const csv = [
      fields.join(","),
      ...records.map((row) =>
        fields.map((field) => cell(row[field])).join(","),
      ),
    ].join("\r\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=early-access.csv",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    operation("export_failed");
    return new Response("Export unavailable", { status: 503, headers: {"Cache-Control":"no-store"} });
  }
}

export async function POST(request: Request) {
  const reply = (body: object, status = 200) => Response.json(body, {status, headers:{"Cache-Control":"no-store"}});
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({error:"Use the review page."},403);
  if (!await registrationAccess(request)) return reply({error:"Unauthorized"},401);
  try {
    const body = await request.json();
    if (body.action === "retry") {
      if (typeof body.email === "string" && body.email.length <= 254) await retryNotification(digest(body.email.trim().toLowerCase()));
      else await retryPendingNotifications(10);
      operation("staff_retry_requested");
      return reply({retried:true});
    }
    if (body.action === "delete" && typeof body.email === "string" && body.email.length <= 254) {
      const id = digest(body.email.trim().toLowerCase());
      // Remove the live record, outbox and index together. Pending links can no longer recreate it.
      await redis(["EVAL", "redis.call('DEL',KEYS[1],KEYS[2]); redis.call('ZREM',KEYS[3],ARGV[1]); redis.call('ZREM',KEYS[4],ARGV[1]); redis.call('SET',KEYS[5],'1','EX',604800); for _,hash in ipairs(redis.call('SMEMBERS',KEYS[6])) do redis.call('DEL',ARGV[2]..':token:'..hash,ARGV[2]..':pending:'..hash) end; redis.call('DEL',KEYS[6]); return 1",6, `${namespace()}:record:${id}`,`${namespace()}:delivery:${id}`,`${namespace()}:confirmed`,`${namespace()}:outbox`,`${namespace()}:deleted:${id}`,`${namespace()}:pending-links:${id}`,id,namespace()]);
      operation("staff_registration_deleted");
      return reply({deleted:true});
    }
    return reply({error:"Invalid action."},400);
  } catch { operation("staff_action_failed"); return reply({error:"Action unavailable."},503); }
}
