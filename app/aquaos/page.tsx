import type { Metadata } from "next";
import Link from "next/link";

import AquaOSControlLoop from "../components/sections/AquaOSControlLoop";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "AquaOS — The Control Layer",
  description:
    "AquaOS coordinates telemetry, biological state inference, decision logic, and closed-loop response — the operating layer for controlled crustacean production.",
  alternates: { canonical: "/aquaos" },
  openGraph: {
    title: "Crabionics AquaOS | The Control Layer",
    description:
      "Sensor → State → Decision → Action. The operating layer for closed-loop crustacean production.",
    url: "https://crabionics.com/aquaos",
    type: "website",
  },
};

const capabilities = [
  {
    title: "Telemetry Aggregation",
    description:
      "Continuous environmental and operational signal collection across infrastructure layers.",
  },

  {
    title: "Biological State Detection",
    description:
      "Tracking stress, molting probability, behavioral anomalies, and production conditions.",
  },

  {
    title: "Operational Decision Logic",
    description:
      "Rule-driven intervention systems coordinating production actions and infrastructure response.",
  },

  {
    title: "Infrastructure Synchronization",
    description:
      "Linking water systems, flushing infrastructure, oxygen regulation, and telemetry nodes.",
  },

  {
    title: "Causality Mapping",
    description:
      "Connecting environmental conditions and operational actions to biological outcomes.",
  },

  {
    title: "Distributed Intelligence",
    description:
      "Building cross-cycle learning systems through the Crabionics Intelligence Network.",
  },
];

const roadmap = [
  {
    stage: "Current",
    title: "Rule-based Operations",
    items: [
      "Threshold-based monitoring",
      "Operational SOP orchestration",
      "Infrastructure alerts",
      "Intervention logging",
    ],
  },

  {
    stage: "Next",
    title: "Predictive Infrastructure",
    items: [
      "Molting prediction",
      "Mortality risk scoring",
      "Yield optimization",
      "Behavioral inference",
    ],
  },
];

export default function AquaOSPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        {/* GLOW */}
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">

          <div className="max-w-5xl">

            {/* EYEBROW */}
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              AquaOS
            </div>

            {/* TITLE */}
            <h1 className="mt-8 max-w-4xl">
              The operating layer of the production system
            </h1>

            {/* TEXT */}
            <p className="mt-8 max-w-3xl text-lg">
              AquaOS coordinates telemetry, biological signals,
              hardware response, and operator workflows into one
              control surface — so every action is logged, every
              outcome is traceable, and every cycle gets sharper.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IS AQUAOS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Operational Intelligence"
          title="Beyond Monitoring Systems"
          subtitle="AquaOS is not a generic farm dashboard. It is a biological operating system designed to coordinate production infrastructure, telemetry, and intervention logic."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {capabilities.map((item) => (
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

      {/* CONTROL LOOP */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Closed-loop Operations"
          title="Sensor → State → Decision → Action"
          subtitle="AquaOS continuously converts telemetry into operational awareness and infrastructure response."
          align="center"
        />

        <div className="mt-20">
          <AquaOSControlLoop />
        </div>
      </SectionWrapper>

      {/* DASHBOARD MOCK */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Telemetry Infrastructure"
          title="Unified Operational Visibility"
          subtitle="Environmental conditions, infrastructure systems, and biological signals are synchronized into one operational interface."
          align="center"
        />

        <div className="relative mx-auto mt-20 max-w-6xl">

          {/* GLOW */}
          <div className="absolute inset-0 rounded-[40px] bg-cyan-400/10 blur-3xl" />

          <GlassCard className="relative overflow-hidden p-8 lg:p-10">

            {/* HEADER */}
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-lg font-semibold text-white">
                  AquaOS Live Infrastructure
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Closed-loop biological telemetry systems
                </p>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-emerald-300">
                  Operational
                </span>
              </div>
            </div>

            {/* GRID */}
            <div className="mt-8 grid gap-5 lg:grid-cols-3">

              {[
                "RAS Cluster",
                "Telemetry Node",
                "Water Stability",
                "Oxygen Layer",
                "Molting Detection",
                "Operational Sync",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-white">
                      {item}
                    </p>

                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 to-teal-300" />
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    Active synchronization
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* ROADMAP */}
      <SectionWrapper>

        <SectionHeading
          eyebrow="Evolution Path"
          title="From Rule-based Operations to Predictive Infrastructure"
          subtitle="AquaOS evolves through continuous telemetry accumulation, biological modeling, and infrastructure learning."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-2">

          {roadmap.map((item) => (
            <GlassCard
              key={item.title}
              className="p-8 lg:p-10"
            >

              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
                {item.stage}
              </div>

              <h3 className="mt-6">
                {item.title}
              </h3>

              <div className="mt-8 space-y-4">

                {item.items.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >

                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-300" />

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

      {/* CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Operational Intelligence
              </p>

              <h2 className="mt-5 max-w-3xl">
                Building the Biological Operating Layer for Aquaculture
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                Explore the infrastructure systems, telemetry layers,
                and biological intelligence architecture powering AquaOS.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/technology"
                className="primary-button"
              >
                Explore Technology
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