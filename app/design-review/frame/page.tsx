import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HomePage from "../../page";
import AquaOSPage from "../../aquaos/page";
import DemoPage from "../../demo/page";
import EarlyAccessPage from "../../early-access/page";
import FrameNavigation from "./FrameNavigation";
export const metadata: Metadata = {
  title: "Crabionics | Responsive review frame",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};
export default async function ReviewFrame({searchParams}:{searchParams:Promise<{page?:string}>}){if(process.env.VERCEL_ENV === "production") notFound(); const {page}=await searchParams; const Content=page==="aquaos"?AquaOSPage:page==="demo"?DemoPage:page==="early-access"?EarlyAccessPage:HomePage;return <><FrameNavigation/><Content/></>;}
