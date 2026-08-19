import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "About | Crabionics",
  description:
    "Why Crabionics exists: building production infrastructure and an operating system for precision mud crab aquaculture.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">About Crabionics</div>
            <h1 className="mt-8 max-w-4xl">Make mud crab production measurable, controllable, and repeatable.</h1>
            <p className="mt-8 max-w-3xl text-lg">Crabionics is building production infrastructure and an operating system for precision mud crab aquaculture — combining controlled habitat, sensing, actuation, biological protocols, and software into one evidence-driven production system.</p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="The hypothesis" title="Production becomes more predictable when the system can observe, decide, act, and learn." subtitle="We treat every major product claim as a hypothesis that must survive engineering, biological, and economic validation." align="center" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-5">
          {["Observe", "Understand", "Decide", "Act", "Learn"].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"><p className="font-mono text-xs text-cyan-200">0{index + 1}</p><p className="mt-3 font-medium text-white">{item}</p></div>)}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-8 lg:p-10"><p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Physical system</p><h2 className="mt-5 text-2xl font-semibold text-white">Habitat + CrabSense + CrabPod</h2><p className="mt-5 text-sm text-slate-300">The physical layer creates a controlled environment, structured observation, and safe pathways from decisions to production actions.</p></GlassCard>
          <GlassCard className="p-8 lg:p-10"><p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Operating system</p><h2 className="mt-5 text-2xl font-semibold text-white">AquaOS</h2><p className="mt-5 text-sm text-slate-300">AquaOS connects telemetry, biological events, SOPs, decisions, interventions, and outcomes so production history can be reconstructed and improved.</p></GlassCard>
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Where we are" title="Validation before scale" subtitle="The current programme runs several tracks in parallel because each retires a different uncertainty." align="center" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4">
          {["BIRAC / IHMS — funded R&D", "Technology Spine — engineering and integration", "Pond — biomass and biological production", "600-box — controlled finishing and economics", "Funding + Commercial — capital and demand evidence"].map((item, index) => <div key={item} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6"><span className="font-mono text-xs text-cyan-200">0{index + 1}</span><p className="text-sm text-slate-200">{item}</p></div>)}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card p-10 lg:p-14"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Evidence standard</p><h2 className="mt-5">Known. Observed. Inferred. Unknown.</h2><p className="mt-5 max-w-2xl text-slate-300">We would rather expose an unresolved question than turn a prototype, model, or branch into a claim of commercial readiness.</p></div><div className="flex flex-col gap-4 sm:flex-row lg:flex-col"><Link href="/validation" className="primary-button">See validation</Link><Link href="/platform" className="secondary-button">Explore platform</Link></div></div></div>
      </SectionWrapper>
    </main>
  );
}
