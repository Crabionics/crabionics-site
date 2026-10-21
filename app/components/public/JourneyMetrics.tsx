"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const pages: Record<string,string> = {"/":"home", "/producers":"producers", "/aquaos":"aquaos", "/demo":"demo", "/early-access":"early-access", "/contact":"contact", "/resources":"resources"};
let source = "direct";
let initialized = false;
export function journeyEvent(event: string, page: string) {
  if (navigator.doNotTrack === "1" || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl) return;
  try { navigator.sendBeacon("/api/funnel", new Blob([JSON.stringify({event, page, source})], {type:"application/json"})); } catch { /* Optional metrics must never block a product interaction. */ }
}
export default function JourneyMetrics() {
  const path = usePathname();
  useEffect(() => {
    if (!initialized) {
      initialized = true;
      try {
        const saved = sessionStorage.getItem("crabionics:source");
        const query = new URLSearchParams(location.search);
        const campaign = query.get("utm_source")?.toLowerCase().trim() || "";
        const medium = query.get("utm_medium")?.toLowerCase().trim() || "";
        const host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
        // Referrers can be intentionally suppressed by assistants and browsers.
        // In that case the session is direct/unknown, never inferred to be AI.
        const aiHosts = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|poe\.com|you\.com)$|^gemini\.google\.com$|^copilot\.microsoft\.com$/;
        const aiCampaigns = ["chatgpt", "perplexity", "gemini", "claude", "copilot", "ai_search", "ai-search", "ai"];
        const explicit = aiCampaigns.includes(campaign) || medium === "ai" || medium === "ai_search" ? "ai_search"
          : campaign === "youtube" ? "youtube"
          : campaign === "linkedin" ? "linkedin" : null;
        const referral = aiHosts.test(host) ? "ai_search"
          : /(^|\.)(youtube\.com|youtu\.be)$/.test(host) ? "youtube"
          : /(^|\.)linkedin\.com$/.test(host) ? "linkedin"
          : host && host !== location.hostname ? "other" : "direct";
        source = explicit || (referral !== "direct" ? referral : saved && ["direct","youtube","linkedin","ai_search","other"].includes(saved) ? saved : "direct");
        sessionStorage.setItem("crabionics:source", source);
      } catch { source = "direct"; }
    }
    const page = pages[path];
    if (!page) return;
    journeyEvent("view", page);
    function click(event: MouseEvent) {
      const link = (event.target as Element)?.closest("a");
      if (link?.getAttribute("href")?.startsWith("/early-access")) journeyEvent("registration_click", page);
      if (link?.getAttribute("href") === "/contact#aquaos-beta") journeyEvent("guided_demo_click", page);
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
