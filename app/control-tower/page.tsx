import type { Metadata } from "next";
import ControlTowerV5Page from "./control-tower-v5-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description: "Founder and CTO view of Crabionics current PMO state, proof boundary and next gate.",
  alternates: { canonical: "/control-tower" },
};

export default function ControlTowerPage() {
  return <ControlTowerV5Page />;
}
