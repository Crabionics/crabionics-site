"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const publicPaths = new Set([
  "/", "/producers", "/solutions", "/solutions/habitat", "/solutions/crabsense",
  "/solutions/crabpod", "/aquaos", "/demo", "/early-access", "/contact",
  "/resources", "/resources/planning-a-production-pilot",
  "/resources/understanding-the-operating-loop", "/resources/defining-finishing-intake",
  "/company", "/research", "/validation", "/system", "/technology", "/about",
  "/team", "/careers", "/press", "/privacy", "/terms", "/why-crab", "/investors",
]);

function sanitizeEvent<T extends { url: string }>(event: T): T | null {
  if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return null;
  try {
    const url = new URL(event.url);
    if (!publicPaths.has(url.pathname)) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}

export default function VercelObservability() {
  const path = usePathname();
  if (!publicPaths.has(path)) return null;
  return (
    <>
      <Analytics beforeSend={sanitizeEvent} debug={false} />
      <SpeedInsights beforeSend={sanitizeEvent} debug={false} sampleRate={0.25} />
    </>
  );
}
