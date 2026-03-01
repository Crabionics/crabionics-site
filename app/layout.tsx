import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://crabionics.com"),
  title: {
    default: "Crabionics | Modular RAS + AquaOS",
    template: "%s | Crabionics",
  },
  description:
    "Credibility-focused site for Crabionics Aquaculture Pvt. Ltd. building controllable mud crab production using modular RAS and AquaOS.",
  keywords: [
    "Crabionics",
    "mud crab farming",
    "modular RAS",
    "aquaculture technology",
    "AquaOS",
    "BIRAC",
    "NIDHI",
  ],
  openGraph: {
    title: "Crabionics | Modular RAS + AquaOS",
    description:
      "From biological chaos to predictable crab production through modular RAS and AquaOS.",
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
