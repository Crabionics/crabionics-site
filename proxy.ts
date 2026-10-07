import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

// Keep Clerk request processing scoped to the protected Control Tower.
// Public marketing pages do not need auth middleware and should remain
// independent from Clerk runtime configuration.
const clerkProxy = clerkMiddleware();
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!request.nextUrl.pathname.startsWith("/control-tower") && !process.env.REGISTRATION_STAFF_USER_IDS?.trim()) return NextResponse.next();
  return clerkProxy(request, event);
}

export const config = {
  matcher: ["/control-tower/:path*", "/early-access/review", "/api/early-access/export", "/api/funnel"],
};
