import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HomePage from "../../page";
import FrameNavigation from "./FrameNavigation";
export const metadata: Metadata = {
  title: "Crabionics | Responsive review frame",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};
export default function ReviewFrame(){if(process.env.VERCEL_ENV === "production") notFound(); return <><FrameNavigation/><HomePage/></>;}
