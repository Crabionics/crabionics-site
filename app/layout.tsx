import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: {
    default: "Crabionics | Aquaculture OS",
    template: "%s | Crabionics",
  },
  description:
    "Crabionics builds a closed-loop aquaculture operating system combining modular RAS, real-time sensing, and biological control logic for predictable production.",
  keywords: [
    "Crabionics",
    "Aquaculture OS",
    "mud crab farming",
    "RAS automation",
    "AquaOS",
    "predictable aquaculture",
    "IoT aquaculture",
    "BIRAC",
    "NIDHI",
  ],
  openGraph: {
    title: "Crabionics | Aquaculture OS",
    description:
      "Closed-loop biological control system for predictable aquaculture production.",
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
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">

        {/* NAVBAR (fixed) */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="relative pt-20">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}