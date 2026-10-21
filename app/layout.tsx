import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";
import Footer from "./components/layout/Footer";
import JourneyMetrics from "./components/public/JourneyMetrics";
import VercelObservability from "./components/public/VercelObservability";

const manrope = localFont({ src: "../public/fonts/manrope-latin.woff", variable: "--font-manrope", display: "swap", weight: "200 800" });

export const metadata: Metadata = {
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  metadataBase: new URL("https://www.crabionics.com"),
  title: {
    default: "Crabionics | Production Architecture for Mud-Crab Aquaculture",
    template: "%s | Crabionics",
  },
  description:
    "Crabionics develops mud-crab aquaculture infrastructure and AquaOS. CrabDesk is working RAS grow-out software with Moltie; pond and hardware integration are upcoming.",
  keywords: [
    "Crabionics",
    "mud crab aquaculture",
    "aquaculture production",
    "aquaculture infrastructure",
    "AquaOS",
  ],
  openGraph: {
    title: "Crabionics | Production Architecture for Mud-Crab Aquaculture",
    description:
      "Mud-crab production infrastructure and working CrabDesk RAS grow-out software, with Moltie assistance.",
    url: "https://www.crabionics.com",
    siteName: "Crabionics",
    type: "website",
    images: [
      {
        url: "/photos/ras-plumbing.jpg",
        alt: "Real mud-crab production racks, individual habitats and recirculating water equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crabionics | Production Architecture for Mud-Crab Aquaculture",
    description:
      "Biology, physical infrastructure and operating tools for mud-crab production.",
    images: ["/photos/ras-plumbing.jpg"],
  },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.crabionics.com/#organization",
      name: "Crabionics Aquaculture Pvt. Ltd.",
      url: "https://www.crabionics.com",
      logo: "https://www.crabionics.com/logo.png",
      email: "info@crabionics.com",
      description:
        "Crabionics develops mud-crab production infrastructure and AquaOS, including the working CrabDesk RAS grow-out operator application with Moltie.",
      sameAs: [
        "https://www.linkedin.com/company/crabionics-aquaculture-private-limited/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.crabionics.com/#website",
      name: "Crabionics",
      url: "https://www.crabionics.com",
      description:
        "Mud-crab aquaculture infrastructure, working RAS grow-out software and separately developing pond and equipment integration.",
      publisher: { "@id": "https://www.crabionics.com/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`public-site ${manrope.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <style>{`.public-site{--site-header-height:78px;background:#fff;color:#0f172a}.public-site>main{padding-top:0}.public-site h1,.public-site h2,.public-site h3,.public-site h4,.public-site h5,.public-site h6{color:#102C5C}.public-site p{color:#475569}.public-site .text-white{color:#fff}.public-site .text-slate-200{color:#e2e8f0}.public-site .text-slate-300{color:#cbd5e1}.public-site .text-slate-400{color:#94a3b8}.public-site .text-slate-500{color:#64748b}.public-site .text-slate-600{color:#475569}.public-site .text-slate-700{color:#334155}`}</style>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative z-10 bg-white"
        >
          {children}
        </main>
        <Footer />
        <JourneyMetrics />
        <VercelObservability />
      </body>
    </html>
  );
}
