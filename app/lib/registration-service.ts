import { createHash, randomBytes } from "node:crypto";
import type { Registration } from "./early-access";
export const namespace = () =>
  process.env.REGISTRATION_NAMESPACE || "crabionics:early-access";
export const digest = (text: string) =>
  createHash("sha256").update(text).digest("hex");
export const registrationConfigured = () =>
  Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.PUBLIC_SITE_URL,
  );
export async function redis<T = unknown>(
  command: (string | number)[],
): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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
export async function limited(request: Request) {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const key = `${namespace()}:rate:${digest(ip)}:${Math.floor(Date.now() / 300000)}`;
  const count = await redis<number>([
    "EVAL",
    "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],300) end; return n",
    1,
    key,
  ]);
  return count > 5;
}
export type StoredRegistration = Registration & {
  createdAt: string;
  status: "pending" | "confirmed";
  confirmedAt?: string;
  notification?: "sent" | "failed";
};
export async function register(data: Registration) {
  const id = digest(data.email);
  const key = `${namespace()}:record:${id}`;
  const stored = await redis<string | null>(["GET", key]);
  if (
    stored &&
    (JSON.parse(stored) as StoredRegistration).status === "confirmed"
  )
    return;
  const token = randomBytes(32).toString("hex");
  const tokenKey = `${namespace()}:token:${digest(token)}`;
  // A pending form never overwrites details from a confirmed registration.
  const record: StoredRegistration = {
    ...data,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  await redis([
    "SET",
    `${namespace()}:pending:${digest(token)}`,
    JSON.stringify(record),
    "EX",
    604800,
  ]);
  await redis(["SET", tokenKey, id, "EX", 604800]);
  const url = new URL("/early-access/confirm", process.env.PUBLIC_SITE_URL);
  url.searchParams.set("token", token);
  await sendMail(
    data.email,
    "Confirm your Crabionics early-access interest",
    `Hello ${data.name},\n\nConfirm that you want Crabionics to contact you about early access:\n${url}\n\nThis link expires in seven days. Registration is an expression of interest, not a confirmed trial place or launch date. If you did not request this, ignore this email.\n\nCrabionics team`,
    `early-access-${digest(token)}`,
  );
}
export async function confirm(token: string) {
  const tokenHash = digest(token);
  const id = await redis<string | null>([
    "GET",
    `${namespace()}:token:${tokenHash}`,
  ]);
  const pending = await redis<string | null>([
    "GET",
    `${namespace()}:pending:${tokenHash}`,
  ]);
  if (!id || !pending) return false;
  const record: StoredRegistration = {
    ...JSON.parse(pending),
    status: "confirmed",
    confirmedAt: new Date().toISOString(),
  };
  const key = `${namespace()}:record:${id}`;
  // Only the first confirmation creates a registration and notifications.
  const inserted = await redis<string | null>([
    "SET",
    key,
    JSON.stringify(record),
    "NX",
    "EX",
    31536000,
  ]);
  await redis(["ZADD", `${namespace()}:confirmed`, "NX", Date.now(), id]);
  if (inserted) {
    try {
      await sendMail(
        "info@crabionics.com",
        "Confirmed early-access interest",
        `${record.name}\n${record.email}\n${record.role}\n${record.region}\n${record.interest}\n${record.setting}\nUpdates consent: ${record.updates}`,
        `team-${id}`,
      );
      await sendMail(
        record.email,
        "Your Crabionics early-access interest is confirmed",
        `Hello ${record.name},\n\nYour interest is registered. The proposed beta direction is production setup, observations, returning history and record-grounded assistance. This registration records interest; it does not provide access to a released operator beta. The team will review your setting and contact you when there is a suitable next step. Trial scope and timing are discussed individually.\n\nExplore the illustrative workflow preview: ${new URL("/demo", process.env.PUBLIC_SITE_URL)}\n\nYou can reply to this email to update or remove your details.\n\nCrabionics team`,
        `welcome-${id}`,
      );
      record.notification = "sent";
    } catch {
      record.notification = "failed";
    }
    await redis(["SET", key, JSON.stringify(record), "EX", 31536000]);
  }
  return true;
}
