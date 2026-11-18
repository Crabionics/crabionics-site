import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AuthProviders from "@/app/components/auth/AuthProviders";

export const metadata:Metadata={title:"Brain Workspace",robots:{index:false,follow:false}};
export default async function BrainLayout({children}:{children:React.ReactNode}){
  await auth.protect();
  const user=await currentUser();
  // No default access for ordinary public website signups.
  if(user?.publicMetadata?.role!=="admin")notFound();
  return <AuthProviders>{children}</AuthProviders>;
}
