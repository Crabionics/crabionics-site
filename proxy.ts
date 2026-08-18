import { clerkMiddleware } from "@clerk/nextjs/server";

// Keep Clerk request processing scoped to the protected Control Tower.
// Public marketing pages do not need auth middleware and should remain
// independent from Clerk runtime configuration.
export default clerkMiddleware();

export const config = {
  matcher: ["/control-tower/:path*"],
};
