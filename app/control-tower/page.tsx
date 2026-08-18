import type { Metadata } from "next";
import ControlTowerV2 from "./control-tower-v2";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description:
    "Live CEO, mentor and investor view of Crabionics company state, evidence and gates.",
  alternates: { canonical: "/control-tower" },
};

export default function ControlTowerPage() {
  return <ControlTowerV2 />;
}
