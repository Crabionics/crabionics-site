import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
// The historical synthetic engineering prototype is not a public product demo.
export default function PrototypeLayout({children}:{children:React.ReactNode}){
 if(process.env.VERCEL_ENV === "production") notFound();
 return children;
}
