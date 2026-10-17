import type { Metadata } from "next";
import ReviewViewport from "./ReviewViewport";
export const metadata: Metadata = { title: "Crabionics | Website design review", robots: { index: false, follow: false } };
export default function ReviewPage(){return <ReviewViewport/>;}
