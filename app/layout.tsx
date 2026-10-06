import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";
import Footer from "./components/layout/Footer";
import AskCrabionics from "./components/public/AskCrabionics";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: {
    default: "Crabionics | Production Architecture for Mud-Crab Aquaculture",
    template: "%s | Crabionics",
  },
  description:
    "Crabionics is developing mud-crab production infrastructure around biology, habitat, observation and operating control.",
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
      "Biology, physical infrastructure and operating tools for mud-crab production.",
    url: "https://crabionics.com",
    siteName: "Crabionics",
    type: "website",
    images: [
      {
        url: "/images/versioned/social-world.09a2efb2.webp",
        width: 1200,
        height: 630,
        alt: "Concept illustration of mud-crab production infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crabionics | Production Architecture for Mud-Crab Aquaculture",
    description:
      "Biology, physical infrastructure and operating tools for mud-crab production.",
    images: ["/images/versioned/social-world.09a2efb2.webp"],
  },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://crabionics.com/#organization",
      name: "Crabionics Aquaculture Pvt. Ltd.",
      url: "https://crabionics.com",
      logo: "https://crabionics.com/logo.png",
      email: "info@crabionics.com",
      description:
        "Crabionics is developing production architecture for mud-crab aquaculture.",
      sameAs: [
        "https://www.linkedin.com/company/crabionics-aquaculture-private-limited/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://crabionics.com/#website",
      name: "Crabionics",
      url: "https://crabionics.com",
      description:
        "Production architecture for mud-crab aquaculture, in development.",
      publisher: { "@id": "https://crabionics.com/#organization" },
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
      <body className="public-site">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <style>{`.public-site{--site-header-height:72px;background:#fff;color:#0f172a}.public-site>main{padding-top:0}.public-site h1,.public-site h2,.public-site h3,.public-site h4,.public-site h5,.public-site h6{color:#102C5C}.public-site p{color:#475569}.public-site .text-white{color:#fff}.public-site .text-slate-200{color:#e2e8f0}.public-site .text-slate-300{color:#cbd5e1}.public-site .text-slate-400{color:#94a3b8}.public-site .text-slate-500{color:#64748b}.public-site .text-slate-600{color:#475569}.public-site .text-slate-700{color:#334155}`}</style>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative z-10 min-h-screen bg-white"
        >
          {children}
        </main>
        <Footer />
        <AskCrabionics />
      </body>
    </html>
  );
}
