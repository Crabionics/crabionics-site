import type { Metadata } from "next";
import Reimagine from "./Reimagine";

export const metadata: Metadata = {
  title: "Living System — Crabionics Experience Concept",
  description: "An interactive concept for exploring Crabionics: mud-crab biology, individual habitats, RAS infrastructure, sensing and AquaOS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/reimagine" },
};

export default function ReimaginePage() {
  return <Reimagine />;
}
