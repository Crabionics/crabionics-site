import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CINNetworkMap from "@/app/components/diagrams/CINNetworkMap";
import StackDiagram from "@/app/components/diagrams/StackDiagram";
import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Technology — How It Works",
  description:
    "How Crabionics works under the hood: modular RAS, telemetry, biological state inference, decision logic, and the Crustacean Intelligence Network.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Crabionics | How It Works",
    description:
      "Six layers, one closed loop — the technology stack behind controlled mud crab production.",
    url: "https://crabionics.com/technology",
    type: "website",
  },
};

const layers = [
  {
    index: "01",
    name: "Physical Layer",
    sub: "Infrastructure",
    description:
      "Vertical RAS racks, isolation boxes, plumbing, biofiltration, aeration.",
  },
  {
    index: "02",
    name: "Sensor Layer",
    sub: "Capture",
    description:
      "Dissolved oxygen, salinity, pH, ammonia, temperature — plus lifecycle events.",
  },
  {
    index: "03",
    name: "Telemetry Layer",
    sub: "Transport",
    description:
      "Continuous sync of environmental, biological, and operational signals into structured datasets.",
  },
  {
    index: "04",
    name: "State Layer",
    sub: "Interpretation",
    description:
      "Molt-timing estimation, stress detection, and behavioral anomaly classification.",
  },
  {
    index: "05",
    name: "Decision Layer",
    sub: "Operational logic",
    description:
      "Rule-driven interventions: flushing, aeration, feeding, operator action.",
  },
  {
    index: "06",
    name: "Intelligence Layer",
    sub: "Cross-cycle learning",
    description:
      "CIN — cross-farm benchmarking and predictive control built from production data.",
  },
];

const stages = [
  {
    stage: "Stage 1",
    status: "Current",
    title: "Infrastructure + Telemetry + Repeatable Operations",
    items: [
      "Modular RAS systems",
      "Isolation architecture",
      "Environmental telemetry",
      "Operational SOPs",
      "Causality logging",
    ],
  },
  {
    stage: "Stage 2",
    status: "Developing",
    title: "Biological Intelligence Layer",
    items: [
      "Molt-timing estimation",
      "Mortality risk classification",
      "Behavioral anomaly detection",
      "Yield forecasting",
      "Survival optimization",
    ],
  },
  {
    stage: "Stage 3",
    status: "Long-term",
    title: "Distributed Production Network",
    items: [
      "Cross-farm benchmarking",
      "Predictive infrastructure",
      "CIN learning systems",
      "Regional production orchestration",
      "Network-level optimization",
    ],
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

const coreSystems = [
  {
    title: "Molt Timing Intelligence",
    description:
      "Identifies high-risk biological windows to reduce mortality and improve intervention timing.",
  },
  {
    title: "Risk Stabilization",
    description:
      "Forecasts stress conditions before thresholds are crossed, enabling preventive operational response.",
  },
  {
    title: "Crab Carbon Index (CCI)",
    description:
      "Production-linked sustainability metrics connecting biological operations to carbon-accountable reporting.",
  },
];

export default function TechnologyPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">

          <div className="max-w-5xl">

            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              How it works
            </div>

            <h1 className="mt-8 max-w-4xl">
              Six layers, one closed loop
            </h1>

            <p className="mt-8 max-w-3xl text-lg">
              Bottom-up: hardware on the floor, telemetry above it, state inference,
              decision logic, and a learning network on top — all feeding back.
            </p>
          </div>
        </div>
      </section>

      {/* LAYERED STACK */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Layered Architecture"
          title="Six Layers, One Closed Loop"
          subtitle="From hardware at the base, through telemetry and inference, up to the network."
          align="center"
        />

        <div className="mx-auto mt-20 max-w-5xl space-y-4">

          {layers.map((layer, index) => (
            <div
              key={layer.index}
              className="relative"
            >

              <GlassCard className="p-6 lg:p-8">

                <div className="grid items-center gap-6 lg:grid-cols-[80px_220px_1fr]">

                  {/* INDEX */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm font-semibold text-cyan-200">
                    {layer.index}
                  </div>

                  {/* NAME + SUB */}
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {layer.name}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cyan-200/70">
                      {layer.sub}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-slate-300">
                    {layer.description}
                  </p>
                </div>
              </GlassCard>

              {/* CONNECTOR */}
              {index !== layers.length - 1 && (
                <div className="mx-auto h-4 w-px bg-cyan-400/20" />
              )}
            </div>
          ))}
        </div>

        {/* MASTER ARCHITECTURE DIAGRAM */}
        <div className="mx-auto mt-16 max-w-5xl">

          <GlassCard className="overflow-hidden p-6 lg:p-10">

            <StackDiagram />
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* STAGE LOGIC — HONEST FRAMING */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Capability Stages"
          title="Current, Developing, Long-term — Stated Honestly"
          subtitle="We separate what the technology does today from what it will do as more production data accumulates."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-3">

          {stages.map((stage) => (
            <GlassCard
              key={stage.stage}
              className="p-8 lg:p-10"
            >

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                  {stage.stage}
                </p>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                  {stage.status}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {stage.title}
              </h3>

              <div className="mt-8 space-y-3">

                {stage.items.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="h-2 w-2 rounded-full bg-cyan-300" />

                    <p className="text-sm text-slate-300">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CONTROL-STACK EVOLUTION — origin story */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="How the Control Stack Evolved"
          title="The Platform Came From Operational Pain, Not Software Ambition"
          subtitle="Each tool was adopted to solve a real problem on the R&D floor. AquaOS is the next step in that line — not a clean-sheet idea."
          align="center"
        />

        <div className="mx-auto mt-20 max-w-5xl">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {controlStack.map((item) => (
              <GlassCard
                key={item.step}
                className="p-6 lg:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-xs font-semibold text-cyan-200">
                  {item.step}
                </div>

                <p className="mt-5 text-lg font-semibold text-white">
                  {item.label}
                </p>

                <p className="mt-3 text-sm text-slate-300">
                  {item.note}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CORE INTELLIGENCE SYSTEMS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Core Intelligence Systems"
          title="What the Stack Produces"
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-3">

          {coreSystems.map((item) => (
            <GlassCard
              key={item.title}
              className="p-8"
            >

              <div className="h-3 w-3 rounded-full bg-cyan-300" />

              <h3 className="mt-6">
                {item.title}
              </h3>

              <p className="mt-5">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CIN NETWORK MAP — Stage 3 visualization */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Stage 3 — Distributed Production Network"
          title="The Crustacean Intelligence Network"
          subtitle="The long-term (Stage 3) layer. As sites come online, each contributes telemetry to a shared learning substrate. Today only the R&D site is active; pilot and planned nodes show the expansion path."
          align="center"
        />

        <div className="mx-auto mt-16 max-w-6xl">

          <GlassCard className="overflow-hidden p-6 lg:p-10">

            <CINNetworkMap />
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* INFRASTRUCTURE EVIDENCE */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Physical Layer in Practice"
          title="The Stack, Photographed"
          subtitle="R&D infrastructure and sensor images from the development stack — the foundation the pilot is built on."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[
            {
              caption: "Modular RAS plumbing and recirculation hardware.",
              file: "ras-plumbing.jpg",
            },
            {
              caption: "Individual isolation boxes — vertical grow-out architecture.",
              file: "isolation-box.jpg",
            },
            {
              caption: "Sensor node and telemetry instrumentation.",
              file: "sensor-node.jpg",
            },
          ].map((item) => (
            <GlassCard
              key={item.file}
              className="overflow-hidden"
            >

              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/[0.02]">

                <Image
                  src={`/photos/${item.file}`}
                  alt={item.caption}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="px-6 py-5 text-sm text-slate-300">
                {item.caption}
              </p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Precision Infrastructure
              </p>

              <h2 className="mt-5 max-w-3xl">
                See the operating logic and the hardware it runs on
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/aquaos"
                className="primary-button"
              >
                Explore AquaOS
              </Link>

              <Link
                href="/platform"
                className="secondary-button"
              >
                View Infrastructure
              </Link>
            </div>
          </div>
        </div>

      </SectionWrapper>

    </main>
  );
}
