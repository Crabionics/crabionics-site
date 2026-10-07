"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const pages: Record<string,string> = {"/":"home", "/producers":"producers", "/aquaos":"aquaos", "/demo":"demo", "/early-access":"early-access", "/contact":"contact", "/resources":"resources"};
let source = "direct";
let initialized = false;
export function journeyEvent(event: string, page: string) {
  if (navigator.doNotTrack === "1" || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl) return;
  navigator.sendBeacon("/api/funnel", new Blob([JSON.stringify({event, page, source})], {type:"application/json"}));
}
export default function JourneyMetrics() {
  const path = usePathname();
  useEffect(() => {
    if (!initialized) {
      initialized = true;
      try {
        const saved = sessionStorage.getItem("crabionics:source");
        const campaign = new URLSearchParams(location.search).get("utm_source")?.toLowerCase();
        const host = document.referrer ? new URL(document.referrer).hostname : "";
        source = saved && ["direct","youtube","linkedin","other"].includes(saved) ? saved : campaign === "youtube" || /(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(host) ? "youtube" : campaign === "linkedin" || /(^|\.)linkedin\.com$/.test(host) ? "linkedin" : host && host !== location.hostname ? "other" : "direct";
        sessionStorage.setItem("crabionics:source", source);
      } catch { source = "direct"; }
    }
    const page = pages[path];
    if (!page) return;
    journeyEvent("view", page);
    function click(event: MouseEvent) {
      const link = (event.target as Element)?.closest("a");
      if (link && ["/early-access","/contact","/aquaos","/demo"].some(route => link.getAttribute("href")?.startsWith(route))) journeyEvent("journey_click", page);
    }
    function submit(event: Event) {
      const label = (event.target as Element)?.getAttribute("aria-label");
      if (label === "Early-access interest" || label === "Partnership enquiry") journeyEvent("form_attempt", page);
    }
    document.addEventListener("click", click);
    document.addEventListener("submit", submit);
    return () => { document.removeEventListener("click", click); document.removeEventListener("submit", submit); };
  }, [path]);
  return null;
}
