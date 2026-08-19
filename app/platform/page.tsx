import type { Metadata } from "next";
import Link from "next/link";

import AquaOSControlLoop from "@/app/components/sections/AquaOSControlLoop";
import StackDiagram from "@/app/components/diagrams/StackDiagram";
import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Platform | Crabionics",
  description:
    "Habitat, CrabSense, CrabPod, and AquaOS — the technology spine for precision mud crab production.",
  alternates: { canonical: "/platform" },
};

const layers = [
  ["01", "Habitat", "Production environment", "Modular RAS and isolation architecture designed around environmental control and operational repeatability."],
  ["02", "CrabSense", "Observe", "Structured sensing and telemetry for the environmental variables and operational signals that matter."],
  ["03", "CrabPod", "Sense + Act", "Edge hardware connecting sensing, local control, buffering, and safe actuation to the production system."],
  ["04", "AquaOS", "Decide", "The operating layer that connects observations, biological events, rules, decisions, actions, and outcomes."],
];

const current = [
  "Modular RAS and isolation architecture",
  "Environmental telemetry and operational records",
  "Edge sensing and actuator integration",
  "Event and outcome traceability",
  "SOP-driven production workflows",
];

const future = [
  "Moult prediction",
  "Mortality-risk models",
  "Yield forecasting",
  "Network-level benchmarking",
  "Progressively autonomous control",
];

export default function PlatformPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Technology spine</div>
            <h1 className="mt-8">Production infrastructure with an operating system for biology.</h1>
            <p className="mt-8 max-w-3xl text-lg">Crabionics combines a controlled physical habitat, sensing, edge actuation, and AquaOS into one production architecture. The stack is being built and validated layer by layer.</p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Architecture" title="Habitat → CrabSense → CrabPod → AquaOS" subtitle="Each layer has a distinct job. Together they create the path from environmental observation to verified operational action." align="center" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-4">
          {layers.map(([number, title, label, body]) => (
            <GlassCard key={title} className="p-8">
              <p className="font-mono text-xs text-cyan-200">{number}</p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">{label}</p>
              <p className="mt-5 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Physical layer" title="Control the environment before asking software to control the biology." align="center" />
        <div className="mx-auto mt-16 max-w-5xl">
          <GlassCard className="overflow-hidden p-6 lg:p-10"><StackDiagram /></GlassCard>
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center text-sm text-slate-400">The physical system remains the foundation. Software cannot compensate for an unvalidated habitat, unreliable instrumentation, or unsafe actuation.</div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="AquaOS" title="Observe → Understand → Decide → Act → Learn" subtitle="AquaOS is being built as the operating/control layer for biological production, not simply as a dashboard." align="center" />
        <div className="mt-16"><AquaOSControlLoop /></div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Current / being validated</p>
            <h2 className="mt-5 text-2xl font-semibold text-white">What the stack is being built to do now</h2>
            <div className="mt-8 space-y-3">{current.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">{item}</div>)}</div>
          </GlassCard>
          <GlassCard className="p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Future capability</p>
            <h2 className="mt-5 text-2xl font-semibold text-white">What evidence may unlock later</h2>
            <div className="mt-8 space-y-3">{future.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">{item}</div>)}</div>
          </GlassCard>
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Design principle" title="Implementation is not validation." subtitle="A merged branch, working prototype, or model output is not automatically field evidence. Each capability moves through implementation, testing, integration, runtime validation, and field validation." align="center" />
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {["Specified", "Implemented", "Tested", "Integrated", "Runtime validated", "Field validated", "Repeatably validated"].map((item, index) => <div key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-200"><span className="mr-2 font-mono text-cyan-200">0{index + 1}</span>{item}</div>)}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div><p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Next proof point</p><h2 className="mt-5 max-w-3xl">The 600-box pilot is where the stack meets production.</h2><p className="mt-5 max-w-2xl text-slate-300">Technology readiness, biological evidence, operating discipline, and economics have to converge before the company earns the right to scale.</p></div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col"><Link href="/validation" className="primary-button">See validation</Link><Link href="/capital" className="secondary-button">See capital thesis</Link></div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
