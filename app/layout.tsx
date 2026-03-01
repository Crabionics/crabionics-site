import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: {
    default: "Mud Crab RAS Automation | Crabionics",
    template: "%s | Crabionics",
  },
  description:
    "Crabionics builds modular RAS and AquaOS automation for predictable mud crab grow-out, higher survival stability, and measurable pilot outcomes.",
  keywords: [
    "Crabionics",
    "mud crab farming",
    "mud crab RAS automation",
    "predictable grow-out",
    "mud crab survival optimization",
    "modular RAS",
    "aquaculture technology",
    "AquaOS",
    "BIRAC",
    "NIDHI",
  ],
  openGraph: {
    title: "Mud Crab RAS Automation | Crabionics",
    description:
      "Predictable mud crab grow-out with modular RAS and AquaOS automation.",
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
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        <Navbar />
        <div className="pt-24">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
