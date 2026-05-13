import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Technology Architecture",
  description:
    "Crabionics technology stack: modular RAS infrastructure, telemetry, biological state engine, decision logic, and the Crabionics Intelligence Network.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Crabionics | Technology Architecture",
    description:
      "Layered architecture linking infrastructure, telemetry, biology, and intelligence into closed-loop precision aquaculture.",
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
      "Vertical modular RAS, individual grow-out boxes, isolation units, plumbing, biofiltration, and aeration hardware.",
  },
  {
    index: "02",
    name: "Sensor Layer",
    sub: "Capture",
    description:
      "Dissolved oxygen, salinity, pH, ammonia, temperature, and lifecycle event capture across the production stack.",
  },
  {
    index: "03",
    name: "Telemetry Layer",
    sub: "Transport",
    description:
      "Continuous synchronization of environmental, biological, and operational signals into structured datasets.",
  },
  {
    index: "04",
    name: "State Layer",
    sub: "Interpretation",
    description:
      "Biological state inference — molt-timing estimation, stress detection, behavioral anomaly classification.",
  },
  {
    index: "05",
    name: "Decision Layer",
    sub: "Operational logic",
    description:
      "Rule-driven intervention systems coordinating flushing, aeration, feeding, and operator workflows.",
  },
  {
    index: "06",
    name: "Intelligence Layer",
    sub: "Cross-cycle learning",
    description:
      "The Crabionics Intelligence Network (CIN) — cross-farm benchmarking and predictive infrastructure built from accumulated production data.",
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
              Technology Architecture
            </div>

            <h1 className="mt-8 max-w-4xl">
              The technology stack linking infrastructure, telemetry, biology, and intelligence
            </h1>

            <p className="mt-8 max-w-3xl text-lg">
              Crabionics combines physical infrastructure with sensor telemetry, biological
              state inference, and operational decision logic into a closed-loop production
              architecture.
            </p>
          </div>
        </div>
      </section>

      {/* LAYERED STACK */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Layered Architecture"
          title="Six Layers, One Closed Loop"
          subtitle="Each layer in the Crabionics stack feeds the next — from physical infrastructure at the base, through telemetry and inference, up to the distributed intelligence network."
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

        {/* DIAGRAM PLACEHOLDER */}
        <div className="mx-auto mt-16 max-w-5xl">

          <GlassCard className="overflow-hidden">

            <div className="flex aspect-[16/9] items-center justify-center border-b border-white/10 bg-white/[0.02] text-center">

              <div className="px-6">

                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">
                  Master architecture diagram placeholder
                </p>

                <p className="mt-3 font-mono text-xs text-slate-500">
                  /public/diagrams/crabionics-stack.svg
                </p>
              </div>
            </div>

            <p className="px-6 py-5 text-sm text-slate-300">
              Insert master topology diagram showing physical layer → sensor → telemetry → state → decision → intelligence, with the closed-loop feedback arrow.
            </p>
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

      {/* CORE INTELLIGENCE SYSTEMS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Core Intelligence Systems"
          title="What the Stack Produces"
          subtitle="Three intelligence outputs are designed into the architecture from day one."
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

      {/* INFRASTRUCTURE EVIDENCE */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Physical Layer in Practice"
          title="The Stack, Photographed"
          subtitle="Photo placeholders below — swap with actual infrastructure and sensor images."
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

              <div className="flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-white/[0.02] text-center">

                <div className="px-6">

                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">
                    Photo placeholder
                  </p>

                  <p className="mt-3 font-mono text-xs text-slate-500">
                    /public/photos/{item.file}
                  </p>
                </div>
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
                AquaOS Explains the Operating Logic — the Platform Page Shows the Hardware
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                Continue exploring the operational layer or the physical infrastructure
                that this stack runs on.
              </p>
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
