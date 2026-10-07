import { timingSafeEqual } from "node:crypto";
import { operation } from "./registration-service";
export const staffAccessConfigured = () => Boolean(process.env.REGISTRATION_STAFF_USER_IDS?.trim());
export async function registrationAccess(request: Request) {
  if (staffAccessConfigured()) {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    const allowed = (process.env.REGISTRATION_STAFF_USER_IDS || "").split(",").map(id => id.trim()).filter(Boolean);
    const authorized = Boolean(userId && allowed.includes(userId));
    operation(authorized ? "staff_access_allowed" : "staff_access_denied", {method:"identity"});
    return authorized;
  }
  const configured = process.env.REGISTRATION_EXPORT_TOKEN;
  const provided = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const authorized = Boolean(configured && Buffer.byteLength(provided) === Buffer.byteLength(configured) && timingSafeEqual(Buffer.from(provided), Buffer.from(configured)));
  operation(authorized ? "staff_access_allowed" : "staff_access_denied", {method:"legacy_token"});
  return authorized;
}
