import type { Metadata } from "next";
import { Page } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";

export const metadata: Metadata = {
  title: "CrabDesk + Moltie | Product Film",
  description: "See CrabDesk's working RAS grow-out interface and Moltie assistant using demo records. Explore AquaOS and register interest in an operator pilot.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "CrabDesk + Moltie | First Working AquaOS Capability",
    description: "Follow the CrabDesk operator journey and Moltie source-linked answers, using demo records. Narrated and captioned.",
    url: "/demo",
    images: [{
      url: "/product/film/poster-v2-desktop.webp",
      width: 1920,
      height: 1080,
      alt: "CrabDesk and Moltie product interface demonstrated with sample records",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrabDesk + Moltie | AquaOS Product Film",
    description: "A narrated operator journey through working RAS grow-out software, using demo records.",
    images: ["/product/film/poster-v2-desktop.webp"],
  },
};

export default function DemoPage() {
  return <Page name="demo"><ProductFilm page="demo" /></Page>;
}
