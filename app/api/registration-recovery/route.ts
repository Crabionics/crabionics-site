import { timingSafeEqual } from "node:crypto";
import { operation, retryPendingNotifications, pruneExpiredRegistrationIndex } from "../../lib/registration-service";
export const runtime = "nodejs";
export const maxDuration = 120;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET || "";
  const provided = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  const headers = {"Cache-Control":"no-store"};
  if (!secret || Buffer.byteLength(secret) !== Buffer.byteLength(provided) || !timingSafeEqual(Buffer.from(secret), Buffer.from(provided))) return new Response("Unauthorized", {status:401, headers});
  try {
    await retryPendingNotifications(5);
    await pruneExpiredRegistrationIndex();
    operation("scheduled_recovery_complete");
    return Response.json({recovery:"complete"}, {headers});
  } catch {
    operation("scheduled_recovery_failed");
    return Response.json({error:"Recovery unavailable"}, {status:503, headers});
  }
}
