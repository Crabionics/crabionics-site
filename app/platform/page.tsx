import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import AquaOSControlLoop from "@/app/components/sections/AquaOSControlLoop";
import CINNetworkMap from "@/app/components/diagrams/CINNetworkMap";
import StackDiagram from "@/app/components/diagrams/StackDiagram";
import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Platform & Technology",
  description:
    "The full Crabionics stack: modular RAS hardware, AquaOS control, the technology architecture, and the Crustacean Intelligence Network.",
  alternates: { canonical: "/platform" },
  openGraph: {
    title: "Crabionics | Platform & Technology",
    description:
      "Modular RAS, AquaOS control, and the Crustacean Intelligence Network — one stack.",
    url: "https://crabionics.com/platform",
    type: "website",
  },
};

const infrastructure = [
  {
    title: "Isolation Architecture",
    description: "Each crab grows in its own module — less conflict, more predictable survival.",
  },
  {
    title: "Closed-loop Water Systems",
    description: "RAS filtration and recirculation hold environmental parameters steady.",
  },
  {
    title: "Operational Telemetry",
    description: "Continuous environmental and infrastructure monitoring.",
  },
  {
    title: "Automation Layer",
    description: "Flushing, oxygen control, and telemetry sync reduce instability.",
  },
  {
    title: "Modular Deployment",
    description: "Scales from pilot systems to distributed coastal clusters.",
  },
  {
    title: "Production Standardization",
    description: "Controlled conditions improve consistency and export-grade quality.",
  },
];

const deployment = [
  { phase: "Phase 01", value: "600+",       label: "Pilot Infrastructure" },
  { phase: "Phase 02", value: "2,000+",     label: "Commercial Scaling" },
  { phase: "Phase 03", value: "Multi-site", label: "Regional Clusters" },
  { phase: "Phase 04", value: "Global",     label: "Infrastructure Expansion" },
];

const aquaCapabilities = [
  { title: "Telemetry Aggregation",        description: "Continuous environmental and operational signal collection." },
  { title: "Biological State Detection",   description: "Tracks stress, molting probability, and behavioral anomalies." },
  { title: "Operational Decision Logic",   description: "Rule-driven interventions that coordinate production actions." },
  { title: "Infrastructure Synchronization", description: "Links water systems, flushing, oxygen regulation, and sensors." },
  { title: "Causality Mapping",            description: "Connects conditions and actions to biological outcomes." },
  { title: "Distributed Intelligence",     description: "Cross-cycle learning via the Crustacean Intelligence Network." },
];

const stages = [
  {
    stage: "Stage 1",
    status: "Current",
    title: "Infrastructure + Telemetry + Operations",
    items: ["Modular RAS systems", "Isolation architecture", "Environmental telemetry", "Operational SOPs", "Causality logging"],
  },
  {
    stage: "Stage 2",
    status: "Developing",
    title: "Biological Intelligence Layer",
    items: ["Molt-timing estimation", "Mortality risk classification", "Behavioral anomaly detection", "Yield forecasting"],
  },
  {
    stage: "Stage 3",
    status: "Long-term",
    title: "Distributed Production Network",
    items: ["Cross-farm benchmarking", "Predictive infrastructure", "CIN learning systems", "Network-level optimization"],
  },
];

const controlStack = [
  { step: "01", label: "Manual logging",   note: "Pen-and-paper records on the R&D floor." },
  { step: "02", label: "Spreadsheets",     note: "First structured per-animal data." },
  { step: "03", label: "AppSheet",         note: "Mobile capture for field operators." },
  { step: "04", label: "Salesforce",       note: "Operational records and process discipline." },
  { step: "05", label: "Telemetry",        note: "Continuous environmental + biological signal capture." },
  { step: "06", label: "AquaOS (concept)", note: "The control layer being built on top of it all." },
];

export default function PlatformPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-shell relative z-10 py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Platform &amp; Technology
            </div>
            <h1 className="mt-8 max-w-4xl">
              Hardware, control, and intelligence — one stack
            </h1>
            <p className="mt-8 max-w-3xl text-lg">
              Modular RAS on the floor, AquaOS turning signal into decisions, and a
              learning network on top — built to replicate from pilot to export scale.
            </p>
          </div>
        </div>
      </section>

      {/* CORE INFRASTRUCTURE */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Physical Layer"
          title="Built for Stability, Isolation, and Control"
          align="center"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {infrastructure.map((item) => (
            <GlassCard key={item.title} className="p-8">
              <div className="h-3 w-3 rounded-full bg-cyan-300" />
              <h3 className="mt-6">{item.title}</h3>
              <p className="mt-5">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* DEPLOYMENT */}
      <SectionWrapper className="section-divider overflow-hidden">
        <SectionHeading
          eyebrow="Deployment Model"
          title="Scalable Production Infrastructure"
          align="center"
        />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {deployment.map((item) => (
            <GlassCard key={item.phase} className="relative overflow-hidden p-8">
              <div className="absolute right-[-20%] top-[-20%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
                  {item.phase}
                </div>
                <p className="mt-6 text-5xl font-semibold text-white">{item.value}</p>
                <p className="mt-4 text-sm text-slate-400">{item.label}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* AQUAOS */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="AquaOS — The Control Layer"
          title="Beyond Monitoring Systems"
          subtitle="AquaOS coordinates infrastructure, telemetry, and intervention logic — not a generic farm dashboard. Being built and validated through the pilot."
          align="center"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aquaCapabilities.map((item) => (
            <GlassCard key={item.title} className="p-8">
              <div className="h-3 w-3 rounded-full bg-cyan-300" />
              <h3 className="mt-6">{item.title}</h3>
              <p className="mt-5">{item.description}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12">
          <AquaOSControlLoop />
        </div>
      </SectionWrapper>

      {/* TECHNOLOGY STACK */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Technology Architecture"
          title="Six Layers, One Closed Loop"
          subtitle="From hardware at the base, through telemetry and inference, up to the network."
          align="center"
        />
        <div className="mx-auto mt-16 max-w-5xl">
          <GlassCard className="overflow-hidden p-6 lg:p-10">
            <StackDiagram />
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* CAPABILITY STAGES */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Capability Stages"
          title="Current, Developing, Long-term — Stated Honestly"
          subtitle="What the technology does today versus what it will do as production data accumulates."
          align="center"
        />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
          {stages.map((stage) => (
            <GlassCard key={stage.stage} className="p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{stage.stage}</p>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                  {stage.status}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{stage.title}</h3>
              <div className="mt-8 space-y-3">
                {stage.items.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="h-2 w-2 rounded-full bg-cyan-300" />
                    <p className="text-sm text-slate-300">{feature}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CONTROL-STACK EVOLUTION */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="How the Control Stack Evolved"
          title="From Operational Pain, Not Software Ambition"
          subtitle="Each tool was adopted to solve a real problem on the R&D floor. AquaOS is the next step in that line."
          align="center"
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {controlStack.map((item) => (
            <GlassCard key={item.step} className="p-6 lg:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-xs font-semibold text-cyan-200">
                {item.step}
              </div>
              <p className="mt-5 text-lg font-semibold text-white">{item.label}</p>
              <p className="mt-3 text-sm text-slate-300">{item.note}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CIN */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Stage 3 — Distributed Production Network"
          title="The Crustacean Intelligence Network"
          subtitle="The long-term layer. Today only the R&D site is active; pilot and planned nodes show the expansion path."
          align="center"
        />
        <div className="mx-auto mt-16 max-w-6xl">
          <GlassCard className="overflow-hidden p-6 lg:p-10">
            <CINNetworkMap />
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* PHOTOS */}
      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Physical Layer in Practice"
          title="The Stack, Photographed"
          subtitle="R&D infrastructure and sensor images from the development stack."
          align="center"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { caption: "Modular RAS plumbing and recirculation hardware.", file: "ras-plumbing.jpg" },
            { caption: "Individual isolation boxes — vertical grow-out.", file: "isolation-box.jpg" },
            { caption: "Sensor node and telemetry instrumentation.", file: "sensor-node.jpg" },
          ].map((item) => (
            <GlassCard key={item.file} className="overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/[0.02]">
                <Image src={`/photos/${item.file}`} alt={item.caption} fill className="object-cover" />
              </div>
              <p className="px-6 py-5 text-sm text-slate-300">{item.caption}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Precision Infrastructure</p>
              <h2 className="mt-5 max-w-3xl">See the case for backing it</h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="primary-button">Talk to the founders</Link>
              <Link href="/capital" className="secondary-button">Investor brief</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

    </main>
  );
}
