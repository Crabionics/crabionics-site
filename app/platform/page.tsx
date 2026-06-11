import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Platform — The Hardware",
  description:
    "Modular RAS, individual isolation, telemetry nodes, and automation — the physical layer of Crabionics mud crab production.",
  alternates: { canonical: "/platform" },
  openGraph: {
    title: "Crabionics | The Hardware",
    description:
      "Modular RAS, isolation boxes, sensors, automation — the physical layer.",
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
  {
    phase: "Phase 01",
    value: "600+",
    label: "Pilot Infrastructure",
  },

  {
    phase: "Phase 02",
    value: "2,000+",
    label: "Commercial Scaling",
  },

  {
    phase: "Phase 03",
    value: "Multi-site",
    label: "Regional Clusters",
  },

  {
    phase: "Phase 04",
    value: "Global",
    label: "Infrastructure Expansion",
  },
];

export default function PlatformPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        {/* GLOW */}
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">

          <div className="max-w-5xl">

            {/* EYEBROW */}
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              The hardware
            </div>

            {/* TITLE */}
            <h1 className="mt-8 max-w-4xl">
              The physical layer of controlled mud crab production
            </h1>

            {/* TEXT */}
            <p className="mt-8 max-w-3xl text-lg">
              Modular grow-out, closed-loop water, telemetry, and automation —
              built to replicate from pilot to export scale.
            </p>
          </div>
        </div>
      </section>

      {/* CORE GRID */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Core Infrastructure"
          title="Built for Stability, Isolation, and Control"
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {infrastructure.map((item) => (
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

      {/* DEPLOYMENT */}
      <SectionWrapper className="overflow-hidden">

        <SectionHeading
          eyebrow="Deployment Model"
          title="Scalable Production Infrastructure"
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">

          {deployment.map((item) => (
            <GlassCard
              key={item.phase}
              className="relative overflow-hidden p-8"
            >

              {/* GLOW */}
              <div className="absolute right-[-20%] top-[-20%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10">

                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
                  {item.phase}
                </div>

                <p className="mt-6 text-5xl font-semibold text-white">
                  {item.value}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  {item.label}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* LOWER CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            {/* LEFT */}
            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Infrastructure Expansion
              </p>

              <h2 className="mt-5 max-w-3xl">
                Building the Infrastructure Layer for Precision Aquaculture
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                Explore the telemetry, control, and intelligence layers behind it.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/technology"
                className="primary-button"
              >
                Explore Technology
              </Link>

              <Link
                href="/aquaos"
                className="secondary-button"
              >
                View AquaOS
              </Link>
            </div>
          </div>
        </div>

      </SectionWrapper>

    </main>
  );
}