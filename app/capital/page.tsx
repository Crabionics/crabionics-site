import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

const metrics = [
  {
    label: "Pilot Infrastructure",
    value: "600+",
    description:
      "Integrated modular production architecture",
  },

  {
    label: "Target Survival",
    value: "80%+",
    description:
      "Controlled biological production systems",
  },

  {
    label: "Operational Model",
    value: "365",
    description:
      "Continuous production infrastructure",
  },

  {
    label: "Production Stack",
    value: "4",
    description:
      "Integrated infrastructure systems",
  },
];

const thesis = [
  {
    title: "Infrastructure-first Approach",
    description:
      "Crabionics focuses on solving biological instability through precision infrastructure instead of conventional pond expansion.",
  },

  {
    title: "Operational Intelligence Layer",
    description:
      "AquaOS and CIN create a continuously improving biological intelligence network through telemetry-linked production data.",
  },

  {
    title: "Modular Scalability",
    description:
      "The production architecture is designed for distributed deployment across coastal infrastructure clusters.",
  },

  {
    title: "High-value Species Focus",
    description:
      "Mud crab production targets export-grade premium seafood markets with controlled production workflows.",
  },

  {
    title: "Closed-loop Systems",
    description:
      "RAS infrastructure improves water reuse, operational consistency, and environmental control.",
  },

  {
    title: "Long-term Defensibility",
    description:
      "The long-term moat is the biological intelligence and operational learning generated from production telemetry.",
  },
];

export default function CapitalPage() {
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
              Capital & Infrastructure Thesis
            </div>

            {/* TITLE */}
            <h1 className="mt-8 max-w-4xl">
              Building Precision Aquaculture Infrastructure for Scalable Biological Production
            </h1>

            {/* TEXT */}
            <p className="mt-8 max-w-3xl text-lg">
              Crabionics combines modular RAS infrastructure,
              operational intelligence, telemetry systems,
              and biological learning architecture into a
              scalable aquaculture platform.
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Infrastructure Metrics"
          title="Execution-led Infrastructure Development"
          subtitle="Crabionics is focused on transforming aquaculture from biologically volatile operations into controlled production systems."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">

          {metrics.map((item) => (
            <GlassCard
              key={item.label}
              className="relative overflow-hidden p-8"
            >

              {/* GLOW */}
              <div className="absolute right-[-20%] top-[-20%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10">

                <p className="text-sm uppercase tracking-[0.16em] text-cyan-200">
                  {item.label}
                </p>

                <p className="mt-5 text-5xl font-semibold text-white">
                  {item.value}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* INVESTMENT THESIS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Investment Thesis"
          title="Infrastructure, Intelligence, and Biological Control"
          subtitle="The Crabionics platform combines physical infrastructure with operational intelligence to improve predictability, scalability, and production consistency."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {thesis.map((item) => (
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

      {/* ROADMAP PANEL */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Scalability Roadmap"
          title="From Pilot Infrastructure to Distributed Production Networks"
          subtitle="Crabionics infrastructure is designed to scale through modular deployment and telemetry-linked operational learning."
          align="center"
        />

        <div className="relative mx-auto mt-20 max-w-6xl">

          {/* GLOW */}
          <div className="absolute inset-0 rounded-[40px] bg-cyan-400/10 blur-3xl" />

          <GlassCard className="relative overflow-hidden p-8 lg:p-10">

            <div className="grid gap-8 lg:grid-cols-4">

              {[
                {
                  phase: "Phase 01",
                  label: "Pilot Validation",
                },

                {
                  phase: "Phase 02",
                  label: "Commercial Expansion",
                },

                {
                  phase: "Phase 03",
                  label: "Regional Clusters",
                },

                {
                  phase: "Phase 04",
                  label: "Distributed Intelligence Network",
                },
              ].map((item, index) => (
                <div
                  key={item.phase}
                  className="relative"
                >

                  {/* CONNECTOR */}
                  {index !== 3 && (
                    <div className="absolute right-[-18px] top-6 hidden h-[2px] w-9 bg-cyan-400/20 lg:block" />
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </div>

                  <p className="mt-6 text-sm uppercase tracking-[0.16em] text-cyan-200">
                    {item.phase}
                  </p>

                  <p className="mt-3 text-lg font-medium text-white">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            {/* LEFT */}
            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Investor Access
              </p>

              <h2 className="mt-5 max-w-3xl">
                Building the Future Infrastructure Layer for Precision Aquaculture
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                For investment discussions, pilot collaboration,
                technical diligence, and strategic partnerships,
                connect with the Crabionics team.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/contact"
                className="primary-button"
              >
                Contact Team
              </Link>

              <Link
                href="/technology"
                className="secondary-button"
              >
                Explore Technology
              </Link>
            </div>
          </div>
        </div>

      </SectionWrapper>

    </main>
  );
}