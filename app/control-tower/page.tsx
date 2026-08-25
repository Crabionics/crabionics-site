import type { Metadata } from "next";
import ControlTowerV4Page from "./control-tower-v4-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description: "Founder and CTO view of Crabionics horizons, current proof boundary, system architecture and next gate.",
  alternates: { canonical: "/control-tower" },
};

export default function ControlTowerPage() {
  return <ControlTowerV4Page />;
}
