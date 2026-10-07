import { namespace, redis, storageConfigured } from "./registration-service";

export const funnelEvents = ["view", "journey_click", "form_attempt", "verification_requested", "confirmed", "enquiry_sent"] as const;
export const funnelPages = ["home", "producers", "aquaos", "demo", "early-access", "contact", "resources"] as const;
export const funnelSources = ["direct", "youtube", "linkedin", "other"] as const;
export async function recordFunnel(event: string, source: string, page: string) {
  if (!storageConfigured()) return;
  const key = `${namespace()}:funnel:${new Date().toISOString().slice(0, 10)}`;
  await redis(["EVAL", "local n=redis.call('HINCRBY',KEYS[1],ARGV[1],1); redis.call('EXPIRE',KEYS[1],7776000); return n", 1, key, `${source}:${page}:${event}`]);
}
export async function readFunnel() {
  const dates = Array.from({length:30}, (_, i) => new Date(Date.now() - i * 86400000).toISOString().slice(0,10));
  const values = await Promise.all(dates.map(date => redis<string[] | Record<string,string>>(["HGETALL", `${namespace()}:funnel:${date}`])));
  return dates.map((date, index) => {
    const value = values[index];
    const counts = Array.isArray(value) ? Object.fromEntries(Array.from({length:value.length / 2}, (_, i) => [value[i*2], Number(value[i*2+1])])) : Object.fromEntries(Object.entries(value).map(([key,count]) => [key,Number(count)]));
    return {date, counts};
  });
}
