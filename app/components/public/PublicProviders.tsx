import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
// Public pages do not require authentication. Preserve Clerk when configured.
export default function PublicProviders({children}:{children:ReactNode}){
 return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <ClerkProvider>{children}</ClerkProvider> : <>{children}</>;
}
