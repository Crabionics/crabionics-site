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
    "Closed-loop aquaculture operating system for predictable crab production.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-900 antialiased">

        <Navbar />

        {/* FIX: push content BELOW navbar globally */}
        <main className="pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}