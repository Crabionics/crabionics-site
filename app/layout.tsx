import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: { default: "Crabionics | Precision Infrastructure for Mud Crab Farming", template: "%s | Crabionics" },
  description: "Crabionics builds modular production systems that make mud crab farming more controlled, measurable and scalable.",
  keywords: ["Crabionics", "mud crab aquaculture", "Scylla serrata", "RAS", "aquaculture automation", "AquaOS"],
  openGraph: {
    title: "Crabionics | Precision Infrastructure for Mud Crab Farming",
    description: "Modular production systems for more controlled, measurable and scalable mud crab farming.",
    url: "https://crabionics.com",
    siteName: "Crabionics",
    type: "website",
    images: [{ url: "/hero-crabionics.png", width: 1200, height: 630, alt: "Crabionics mud crab production system" }],
  },
  twitter: { card: "summary_large_image", title: "Crabionics | Precision Infrastructure for Mud Crab Farming", description: "Modular production systems for mud crab farming.", images: ["/hero-crabionics.png"] },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crabionics Aquaculture Pvt. Ltd.",
  url: "https://crabionics.com",
  logo: "https://crabionics.com/logo.png",
  email: "sameer@crabionics.com",
  description: "Crabionics builds modular production systems for mud crab farming.",
  sameAs: ["https://www.linkedin.com/company/crabionics-aquaculture-private-limited/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
