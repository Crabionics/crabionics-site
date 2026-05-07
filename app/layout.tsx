import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),

  title: {
    default: "Crabionics | Precision Aquaculture Infrastructure",
    template: "%s | Crabionics",
  },

  description:
    "Crabionics builds precision aquaculture infrastructure integrating modular RAS, biological intelligence, automation, and closed-loop production control.",

  keywords: [
    "Crabionics",
    "Precision Aquaculture",
    "AquaOS",
    "Mud Crab Farming",
    "RAS Automation",
    "Biological Intelligence",
    "Aquaculture Infrastructure",
    "Closed-loop Aquaculture",
    "IoT Aquaculture",
    "Hatchery Intelligence",
  ],

  openGraph: {
    title: "Crabionics | Precision Aquaculture Infrastructure",
    description:
      "Closed-loop biological infrastructure for predictable mud crab production.",
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
    <html lang="en" suppressHydrationWarning>
      <body>
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