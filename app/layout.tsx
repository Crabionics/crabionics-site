import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/navigation/Navbar";
import Footer from "./components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),

  title: {
    default: "Crabionics | Production Architecture for Mud Crab Aquaculture",
    template: "%s | Crabionics",
  },

  description:
    "Crabionics builds the production architecture that makes industrial-scale mud crab aquaculture possible — modular RAS, AquaOS, telemetry, and closed-loop control.",

  keywords: [
    "Crabionics",
    "Mud Crab Aquaculture",
    "AquaOS",
    "Mud Crab Farming",
    "RAS Automation",
    "Closed-loop Aquaculture",
    "Aquaculture Production Architecture",
    "Industrial Aquaculture",
    "IoT Aquaculture",
    "Hatchery Intelligence",
  ],

  openGraph: {
    title: "Crabionics | Production Architecture for Mud Crab Aquaculture",
    description:
      "The system that makes industrial-scale mud crab production possible.",
    url: "https://crabionics.com",
    siteName: "Crabionics",
    type: "website",
    images: [
      {
        url: "/infrastructure.png",
        width: 1200,
        height: 630,
        alt: "Crabionics — modular RAS and AquaOS production infrastructure",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Crabionics | Production Architecture for Mud Crab Aquaculture",
    description:
      "Modular RAS, AquaOS, and closed-loop control for industrial mud crab production.",
    images: ["/infrastructure.png"],
  },

  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crabionics Aquaculture Pvt. Ltd.",
  url: "https://crabionics.com",
  logo: "https://crabionics.com/logo.png",
  email: "sameer@crabionics.com",
  description:
    "Crabionics builds the production architecture for industrial-scale mud crab aquaculture — modular RAS, AquaOS, telemetry, and closed-loop control.",
  sameAs: [
    "https://www.linkedin.com/company/crabionics-aquaculture-private-limited/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={instrumentSerif.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <div className="site-background" />

        <Navbar />

        <main className="relative z-10 pt-20 min-h-screen overflow-hidden">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}