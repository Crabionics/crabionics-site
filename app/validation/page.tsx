import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Validation | Crabionics",
  description:
    "How Crabionics is validating the biology, engineering, economics, and commercial model behind precision mud crab production.",
  alternates: { canonical: "/validation" },
};

const gates = [
  ["01", "Engineering", "RAS, isolation, sensing, automation, reliability"],
  ["02", "Biology", "Survival, growth, molting, water quality, interventions"],
  ["03", "Economics", "Cycle economics, operating cost, repeatability, payback"],
  ["04", "Commercial", "Processor demand, supply consistency, traceability, deployment"],
];

export default function ValidationPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Validation architecture
            </div>
            <h1 className="mt-8">We build the evidence before we build the scale.</h1>
            <p className="mt-8 max-w-3xl text-lg">
              Crabionics is currently in a controlled validation phase. Every major claim has to pass an engineering, biological, economic, or commercial gate before it becomes part of the scalable production model.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Four gates"
          title="One hypothesis. Four proof layers."
          subtitle="A system is only as strong as the weakest layer connecting biology to economics."
          align="center"
        />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gates.map(([number, title, body]) => (
            <GlassCard key={number} className="p-8">
              <p className="font-mono text-xs text-cyan-200">{number}</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Current programme"
          title="Controlled production is the next evidence engine"
          subtitle="The R&D stack combines controlled infrastructure, operational logging, biological trials, and software instrumentation."
          align="center"
        />
        <div className="mx-auto mt-16 max-w-5xl space-y-4">
          {[
            "Modular RAS and isolation architecture",
            "Environmental telemetry and structured operational records",
            "Biological-event logging and intervention protocols",
            "600-box finishing validation pathway",
            "IHMS / hatchery intelligence development under BIRAC BIG",
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-mono text-xs text-cyan-200">0{index + 1}</span>
              <p className="text-sm text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card p-10 lg:p-14">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Evidence discipline</p>
          <h2 className="mt-5">Known. Observed. Inferred. Unknown.</h2>
          <p className="mt-5 max-w-3xl text-slate-300">
            We distinguish operating evidence from hypotheses and future capabilities. This is how the platform becomes investable without overstating maturity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/platform" className="primary-button">See the technology</Link>
            <Link href="/capital" className="secondary-button">See the capital thesis</Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
