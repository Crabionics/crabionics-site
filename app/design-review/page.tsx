import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReviewViewport from "./ReviewViewport";
export const metadata: Metadata = { title: "Crabionics | Website design review", robots: { index: false, follow: false } };
export default function ReviewPage(){if(process.env.VERCEL_ENV === "production") notFound(); return <ReviewViewport/>;}
