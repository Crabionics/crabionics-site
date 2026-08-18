import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function ControlTowerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authentication is enforced at the protected resource boundary.
  await auth.protect();

  // The current Clerk user already has publicMetadata.role = "admin".
  // Keep this authorization check server-side so the Control Tower cannot
  // be unlocked by changing client-side state or browser-visible metadata.
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    notFound();
  }

  return children;
}
