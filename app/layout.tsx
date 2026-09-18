import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";
import Footer from "./components/layout/Footer";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: { default: "Crabionics | Infrastructure for More Controlled Mud-Crab Production", template: "%s | Crabionics" },
  description: "Crabionics is building a connected production system for mud-crab habitat, observations, local intervention and operating workflows.",
  keywords: ["Crabionics", "mud crab aquaculture", "aquaculture production", "aquaculture infrastructure", "AquaOS"],
  openGraph: { title: "Crabionics | Infrastructure for More Controlled Mud-Crab Production", description: "A connected production system for mud-crab farming.", url: "https://crabionics.com", siteName: "Crabionics", type: "website", images: [{ url: "/hero-crabionics.png", width: 1200, height: 630, alt: "Crabionics mud-crab production infrastructure" }] },
  twitter: { card: "summary_large_image", title: "Crabionics | Infrastructure for More Controlled Mud-Crab Production", description: "A connected production system for mud-crab farming.", images: ["/hero-crabionics.png"] },
  alternates: { canonical: "/" },
};

const organizationJsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": "https://crabionics.com/#organization", name: "Crabionics Aquaculture Pvt. Ltd.", url: "https://crabionics.com", logo: "https://crabionics.com/logo.png", email: "sameer@crabionics.com", description: "Crabionics is building a connected production system for mud-crab farming.", sameAs: ["https://www.linkedin.com/company/crabionics-aquaculture-private-limited/"] },
  { "@type": "WebSite", "@id": "https://crabionics.com/#website", name: "Crabionics", url: "https://crabionics.com", description: "A connected production system for more controlled mud-crab farming.", publisher: { "@id": "https://crabionics.com/#organization" }, inLanguage: "en" },
] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning className={instrumentSerif.variable}><body className="public-site"><ClerkProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /><style>{`.public-site{--site-header-height:72px;background:#fff;color:#0f172a}.public-site>main{padding-top:var(--site-header-height)}.public-site h1,.public-site h2,.public-site h3,.public-site h4,.public-site h5,.public-site h6{color:#102C5C}.public-site p{color:#475569}.public-site .text-white{color:#fff}.public-site .text-slate-200{color:#e2e8f0}.public-site .text-slate-300{color:#cbd5e1}.public-site .text-slate-400{color:#94a3b8}.public-site .text-slate-500{color:#64748b}.public-site .text-slate-600{color:#475569}.public-site .text-slate-700{color:#334155}`}</style><Navbar /><main className="relative z-10 min-h-screen overflow-hidden bg-white">{children}</main><Footer /></ClerkProvider></body></html>;
}
