import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk must run for every application request so server-side auth() checks
// can reliably protect sensitive resources. Access policy stays at the
// resource boundary rather than making the entire public website private.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
