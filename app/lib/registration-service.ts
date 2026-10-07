import { createHash, randomBytes } from "node:crypto";
import type { Registration } from "./early-access";
export const namespace = () =>
  process.env.REGISTRATION_NAMESPACE || "crabionics:early-access";
export const digest = (text: string) =>
  createHash("sha256").update(text).digest("hex");
const storageUrl = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const storageToken = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const storageConfigured = () => Boolean(storageUrl() && storageToken());
export const registrationConfigured = () =>
  Boolean(
    storageConfigured() &&
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.PUBLIC_SITE_URL,
  );
export async function redis<T = unknown>(
  command: (string | number)[],
): Promise<T> {
  const url = storageUrl();
  const token = storageToken();
  if (!url || !token) throw new Error("Storage unavailable");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const payload = await response.json();
  if (!response.ok || payload.error || !("result" in payload))
    throw new Error("Storage request failed");
  return payload.result;
}
export async function sendMail(
  to: string,
  subject: string,
  text: string,
  key: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [to],
      reply_to: "info@crabionics.com",
      subject,
      text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  const receipt = await response.json();
  if (!response.ok || typeof receipt.id !== "string" || !receipt.id)
    throw new Error("Email not accepted");
}
export async function limited(request: Request, purpose: "signup" | "confirmation" | "enquiry" = "signup") {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const key = `${namespace()}:rate:${purpose}:${digest(ip)}:${Math.floor(Date.now() / 300000)}`;
  const count = await redis<number>([
    "EVAL",
    "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],300) end; return n",
    1,
    key,
  ]);
  return count > (purpose === "confirmation" ? 20 : 5);
}
export type StoredRegistration = Registration & {
  createdAt: string;
  status: "pending" | "confirmed";
  confirmedAt?: string;
  notification?: "sent" | "failed";
};
export function operation(event: string, details: Record<string, string | number> = {}) {
  console.info(JSON.stringify({ component: "registration", event, ...details }));
}
export type DeliveryState = { team: "pending" | "sent"; welcome: "pending" | "sent"; attempts: number; lastAttempt?: string };
export async function register(data: Registration) {
  const id = digest(data.email);
  const stored = await redis<string | null>(["GET", `${namespace()}:record:${id}`]);
  if (stored && (JSON.parse(stored) as StoredRegistration).status === "confirmed") return;
  // Return the same public response for a cooldown, avoiding email enumeration.
  if (!await redis(["SET", `${namespace()}:cooldown:${id}`, "1", "NX", "EX", 120])) return;
  const token = randomBytes(32).toString("hex");
  const hash = digest(token);
  const record: StoredRegistration = { ...data, createdAt: new Date().toISOString(), status: "pending" };
  await redis(["EVAL", "redis.call('SET',KEYS[1],ARGV[1],'EX',604800); redis.call('SET',KEYS[2],ARGV[2],'EX',604800); redis.call('SADD',KEYS[3],ARGV[3]); redis.call('EXPIRE',KEYS[3],604800); return 1", 3, `${namespace()}:pending:${hash}`, `${namespace()}:token:${hash}`, `${namespace()}:pending-links:${id}`, JSON.stringify(record), id, hash]);
  const url = new URL("/early-access/confirm", process.env.PUBLIC_SITE_URL);
  url.searchParams.set("token", token);
  try {
    await sendMail(data.email, "Confirm your Crabionics early-access interest", `Hello ${data.name},\n\nConfirm that you want Crabionics to contact you about AquaOS:\n${url}\n\nThis link expires in seven days. Registration records interest, not a confirmed trial place or launch date. If you did not request this, ignore this email.\n\nCrabionics team`, `early-access-${hash}`);
    operation("verification_accepted");
  } catch (error) {
    await redis(["DEL", `${namespace()}:cooldown:${id}`]);
    operation("verification_failed");
    throw error;
  }
}
const confirmScript = `if redis.call('EXISTS',KEYS[5])==1 then return false end; local current=redis.call('GET',KEYS[1]); if not current then redis.call('SET',KEYS[1],ARGV[1],'EX',31536000); redis.call('SET',KEYS[3],ARGV[3],'EX',31536000); redis.call('ZADD',KEYS[4],ARGV[2],ARGV[4]); end; redis.call('ZADD',KEYS[2],'NX',ARGV[2],ARGV[4]); return current or ARGV[1]`;
export async function confirm(token: string) {
  const hash = digest(token);
  const id = await redis<string | null>(["GET", `${namespace()}:token:${hash}`]);
  const pending = await redis<string | null>(["GET", `${namespace()}:pending:${hash}`]);
  if (!id || !pending) return false;
  if (await redis(["GET", `${namespace()}:deleted:${id}`])) return false;
  const record: StoredRegistration = { ...JSON.parse(pending), status: "confirmed", confirmedAt: new Date().toISOString() };
  const saved = await redis(["EVAL", confirmScript, 5, `${namespace()}:record:${id}`, `${namespace()}:confirmed`, `${namespace()}:delivery:${id}`, `${namespace()}:outbox`, `${namespace()}:deleted:${id}`, JSON.stringify(record), Date.now(), JSON.stringify({team:"pending",welcome:"pending",attempts:0}), id]);
  if (!saved) return false;
  operation("confirmation_saved");
  try { await retryNotification(id); } catch { operation("notification_retry_deferred"); }
  return true;
}
export async function retryNotification(id: string) {
  const lock = `${namespace()}:delivery-lock:${id}`;
  if (!await redis(["SET", lock, "1", "NX", "EX", 60])) return false;
  try {
    const raw = await redis<string | null>(["GET", `${namespace()}:record:${id}`]);
    const status = await redis<string | null>(["GET", `${namespace()}:delivery:${id}`]);
    if (!raw) { await redis(["ZREM", `${namespace()}:outbox`, id]); return false; }
    const record = JSON.parse(raw) as StoredRegistration;
    const retention = Math.max(1, Math.floor((Date.parse(record.confirmedAt || record.createdAt) + 31536000000 - Date.now()) / 1000));
    // Legacy failed registrations can be retried through staff review.
    const state: DeliveryState = status ? JSON.parse(status) : {team: record.notification === "sent" ? "sent" : "pending", welcome: record.notification === "sent" ? "sent" : "pending", attempts:0};
    state.attempts += 1;
    state.lastAttempt = new Date().toISOString();
    for (const target of ["team", "welcome"] as const) {
      if (state[target] === "sent") continue;
      try {
        await sendMail(target === "team" ? "info@crabionics.com" : record.email,
          target === "team" ? "Confirmed AquaOS interest" : "Your Crabionics early-access interest is confirmed",
          target === "team" ? `${record.name}\n${record.email}\n${record.role}\n${record.region}\n${record.interest}\n${record.setting}\nUpdates consent: ${record.updates}` : `Hello ${record.name},\n\nYour interest in AquaOS is confirmed. AquaOS is being developed to connect production observations, decisions, follow-up work and outcomes. We will review the daily routine you shared and contact you to discuss a suitable next step. Pilot scope and timing are agreed together; registration does not provide access to a released operator beta.\n\nExplore AquaOS: ${new URL("/aquaos", process.env.PUBLIC_SITE_URL)}\n\nReply to update or remove your details.\n\nCrabionics team`, `${target}-${id}`);
        state[target] = "sent";
      } catch { operation("notification_failed", {target}); }
      // Persist each result independently; failure of team delivery never prevents welcome delivery.
      await redis(["SET", `${namespace()}:delivery:${id}`, JSON.stringify(state), "EX", retention]);
    }
    const sent = state.team === "sent" && state.welcome === "sent";
    record.notification = sent ? "sent" : "failed";
    await redis(["SET", `${namespace()}:record:${id}`, JSON.stringify(record), "EX", retention]);
    if (sent) await redis(["ZREM", `${namespace()}:outbox`, id]);
    else await redis(["ZADD", `${namespace()}:outbox`, Date.now() + 300000, id]);
    operation(sent ? "notifications_complete" : "notifications_pending");
    return sent;
  } finally { await redis(["DEL", lock]); }
}
export async function retryPendingNotifications(limit = 3) {
  const ids = await redis<string[]>(["ZRANGEBYSCORE", `${namespace()}:outbox`, "-inf", Date.now(), "LIMIT", 0, Math.min(10, limit)]);
  for (const id of ids) { try { await retryNotification(id); } catch { operation("notification_retry_deferred"); } }
}
export async function pruneExpiredRegistrationIndex(limit = 100) {
  const ids = await redis<string[]>(["ZRANGEBYSCORE", `${namespace()}:confirmed`, "-inf", Date.now()-31536000000, "LIMIT", 0, limit]);
  for (const id of ids) await redis(["EVAL", "if redis.call('EXISTS',KEYS[1])==0 then redis.call('ZREM',KEYS[2],ARGV[1]); redis.call('ZREM',KEYS[3],ARGV[1]); return 1 end; return 0", 3, `${namespace()}:record:${id}`, `${namespace()}:confirmed`, `${namespace()}:outbox`, id]);
}
