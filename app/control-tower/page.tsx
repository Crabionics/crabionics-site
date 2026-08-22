import type { Metadata } from "next";
import ControlTowerV3 from "./control-tower-v3";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description: "Live CEO, mentor, investor, technical and programme-readiness view of Crabionics company state, evidence and gates.",
  alternates: { canonical: "/control-tower" },
};

export default function ControlTowerPage() {
  return <ControlTowerV3 />;
}
