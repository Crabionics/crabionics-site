import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

import LoadingIntro from "@/app/components/intro/LoadingIntro";
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
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={instrumentSerif.variable}>
      <body>
        <LoadingIntro />

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