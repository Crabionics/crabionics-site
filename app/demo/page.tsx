import type { Metadata } from "next";
import { Page } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";

export const metadata: Metadata = {
  title: "CrabDesk + Moltie | 30-Second Product Film",
  description: "See CrabDesk's working RAS grow-out interface and Moltie assistant using demo records. Explore AquaOS and register interest in an operator pilot.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "CrabDesk + Moltie | First Working AquaOS Capability",
    description: "Watch the 30-second demonstration of CrabDesk RAS grow-out management and Moltie, using demo records.",
    url: "/demo",
    images: [{
      url: "/product/film/poster-desktop.webp",
      width: 1920,
      height: 1080,
      alt: "CrabDesk and Moltie product interface demonstrated with sample records",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrabDesk + Moltie | AquaOS Product Film",
    description: "A 30-second look at working RAS grow-out software using demo records.",
    images: ["/product/film/poster-desktop.webp"],
  },
};

export default function DemoPage() {
  return <Page name="demo"><ProductFilm page="demo" /></Page>;
}
