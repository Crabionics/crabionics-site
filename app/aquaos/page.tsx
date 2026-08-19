import type { Metadata } from "next";
import Link from "next/link";

import AquaOSControlLoop from "@/app/components/sections/AquaOSControlLoop";
import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "AquaOS | Crabionics",
  description:
    "AquaOS is the operating layer connecting observations, biological events, decisions, actions, and outcomes in precision aquaculture.",
  alternates: { canonical: "/aquaos" },
};

const loop = [
  ["Observe", "Structured facts", "Telemetry and operator observations carry identity, timestamp, quality, and provenance."],
  ["Decide", "Rules + context", "Validated rules and SOPs connect system state to a safe operational decision."],
  ["Learn", "Outcome evidence", "Actions are connected to outcomes so future models are trained on production history rather than assumptions."],
];

export default function AquaOSPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              AquaOS
            </div>
            <h1 className="mt-8 max-w-4xl">The operating layer for biological production.</h1>
            <p className="mt-8 max-w-3xl text-lg">
              AquaOS connects telemetry, state, biological events, SOPs, decisions, interventions, and outcomes. The goal is not a generic farm dashboard; it is a reconstructable production control loop.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Control loop"
          title="Observe → Understand → Decide → Act → Learn"
          subtitle="Each step should produce an auditable record that can be connected to the biological outcome."
          align="center"
        />
        <div className="mt-16">
          <AquaOSControlLoop />
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="grid gap-6 md:grid-cols-3">
          {loop.map(([label, title, body]) => (
            <GlassCard key={label} className="p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{label}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Current stage</p>
              <h2 className="mt-5">Build the minimum reliable evidence spine first.</h2>
              <p className="mt-5 max-w-2xl text-slate-300">
                Predictive and autonomous capabilities come after data quality, event definitions, integration, and field validation are strong enough to support them.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/platform" className="primary-button">Technology spine</Link>
              <Link href="/validation" className="secondary-button">Validation</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
