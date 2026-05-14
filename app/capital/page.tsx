import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Capital — Investment Thesis",
  description:
    "Crabionics is building the production architecture for industrial-scale crustacean aquaculture. Institutionally backed by KIIT-TBI, DST NIDHI PRAYAS, and BIRAC BIG.",
  alternates: { canonical: "/capital" },
  openGraph: {
    title: "Crabionics | Investment Thesis",
    description:
      "From pilot execution to a distributed production network — the case for Crabionics.",
    url: "https://crabionics.com/capital",
    type: "website",
  },
};

const thesis = [
  {
    title: "Infrastructure-first Approach",
    description:
      "Crabionics solves biological instability through precision infrastructure — modular RAS, isolation systems, and controlled water management — instead of conventional pond expansion.",
  },
  {
    title: "Operational Intelligence Layer",
    description:
      "AquaOS turns continuous telemetry into operational decisions. Every cycle adds to a dataset that gets harder to replicate over time.",
  },
  {
    title: "High-value Species Focus",
    description:
      "Mud crab is a premium export species with structurally undersupplied global demand. Controlled production unlocks predictable yield in a category currently dominated by volatile wild catch.",
  },
  {
    title: "Modular Scalability",
    description:
      "Each unit replicates without redesign. Pilots scale into regional clusters by adding boxes, not by rebuilding.",
  },
  {
    title: "Closed-loop Systems",
    description:
      "RAS infrastructure improves water reuse, operational consistency, and environmental control — reducing per-cycle variability that breaks traditional aquaculture economics.",
  },
  {
    title: "Long-term Defensibility",
    description:
      "The long-term moat is the biological intelligence and operational learning generated from production telemetry — a dataset no incumbent currently holds.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "Modular RAS Development",
    body:
      "Vertical mud crab production architecture with individual isolation systems and operational SOPs developed.",
  },
  {
    year: "2024",
    title: "NIDHI PRAYAS Support",
    body:
      "Supported under the DST NIDHI PRAYAS innovation ecosystem for deep-tech aquaculture infrastructure development.",
  },
  {
    year: "2024",
    title: "KIIT-TBI Incubation",
    body:
      "Incubated under KIIT Technology Business Incubator to accelerate infrastructure and commercialization strategy.",
  },
  {
    year: "2025",
    title: "AquaOS + CIN Development",
    body:
      "Telemetry infrastructure, biological intelligence systems, and distributed operational architecture under active development.",
  },
  {
    year: "2025",
    title: "Pilot Infrastructure Scaling",
    body:
      "Expansion toward multi-system production architecture: hatchery, nursery, soft-shell, and RAS finishing systems.",
  },
  {
    year: "2026",
    title: "BIRAC BIG Grant — 24th Call",
    body:
      "Awarded under BIRAC's Biotechnology Ignition Grant (24th call) — 2026.",
  },
];

const validation = [
  {
    org: "KIIT-TBI",
    role: "Technology Business Incubator",
    note:
      "Active incubation, operational infrastructure access, and commercialization support.",
  },
  {
    org: "DST NIDHI PRAYAS",
    role: "Government of India — Department of Science & Technology",
    note:
      "Innovation ecosystem support for deep-tech aquaculture infrastructure development.",
  },
  {
    org: "BIRAC BIG",
    role: "Biotechnology Industry Research Assistance Council",
    note:
      "Biotechnology Ignition Grant — 24th call. Awarded 2026.",
  },
];

const phases = [
  {
    phase: "Phase 01",
    label: "Pilot Validation",
    detail: "600-box modular infrastructure, telemetry instrumentation, survival benchmarking.",
  },
  {
    phase: "Phase 02",
    label: "Commercial Expansion",
    detail: "Scale-out to ~2,000 boxes, integrated hatchery + grow-out, AquaOS production rollout.",
  },
  {
    phase: "Phase 03",
    label: "Regional Clusters",
    detail: "Multi-site deployment across coastal regions with shared operational intelligence.",
  },
  {
    phase: "Phase 04",
    label: "Distributed Intelligence Network",
    detail: "CIN benchmarking layer, cross-farm learning, predictive infrastructure across clusters.",
  },
];

export default function CapitalPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">

          <div className="max-w-5xl">

            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Investment thesis
            </div>

            <h1 className="mt-8 max-w-4xl">
              Built on hardware, measured on milestones
            </h1>

            <p className="mt-8 max-w-3xl text-lg">
              Crabionics is converting one of aquaculture&apos;s most volatile
              categories into a controllable, data-governed production model —
              backed by KIIT-TBI, DST NIDHI PRAYAS, and BIRAC&apos;s Biotechnology
              Ignition Grant (BIG, 24th call).
            </p>

            {/* PROOF STRIP */}
            <div className="mt-10 flex flex-wrap gap-3">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span className="text-xs font-medium text-white sm:text-sm">
                  KIIT-TBI Incubated
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span className="text-xs font-medium text-white sm:text-sm">
                  DST NIDHI PRAYAS Supported
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span className="text-xs font-medium text-white sm:text-sm">
                  BIRAC BIG Grant Recipient
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT THESIS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Investment Thesis"
          title="Why Crabionics, Why Now"
          subtitle="Mud crab is one of the highest-value crustaceans in Asia-Pacific export markets, but production has remained structurally unstable. Crabionics is building the infrastructure layer that makes precision production possible."
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

      {/* STAGED ROLLOUT */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Staged Rollout"
          title="From Pilot Infrastructure to Distributed Production Networks"
          subtitle="Crabionics infrastructure is designed to scale through modular deployment and telemetry-linked operational learning. Stage 1 is current; Stage 2 is in active development; Stages 3 and 4 are long-term."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">

          {phases.map((item, index) => (
            <GlassCard
              key={item.phase}
              className="relative overflow-hidden p-8"
            >

              <div className="absolute right-[-20%] top-[-20%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                  0{index + 1}
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-cyan-200">
                  {item.phase}
                </p>

                <p className="mt-3 text-lg font-medium text-white">
                  {item.label}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  {item.detail}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* INSTITUTIONAL VALIDATION */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Institutional Validation"
          title="Continuity, Credibility, Execution Readiness"
          subtitle="Crabionics has progressed through institutional checkpoints that validate both the science and the execution path."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          {validation.map((item) => (
            <GlassCard
              key={item.org}
              className="p-8"
            >

              {/* LOGO PLACEHOLDER */}
              <div className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Logo placeholder — {item.org}
              </div>

              <p className="mt-6 text-lg font-semibold text-white">
                {item.org}
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                {item.role}
              </p>

              <p className="mt-5">
                {item.note}
              </p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* EXECUTION MILESTONES */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Execution Milestones"
          title="Built Through Field Execution, Not Slideware"
          subtitle="Each milestone below corresponds to a real infrastructure or institutional outcome — not a forecast."
          align="center"
        />

        <div className="mx-auto mt-20 max-w-4xl">

          <div className="relative space-y-6 border-l border-white/10 pl-8">

            {milestones.map((item) => (
              <div
                key={item.title}
                className="relative"
              >

                {/* DOT */}
                <div className="absolute left-[-41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-300/40 bg-[#050816]">
                  <div className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>

                <GlassCard className="p-6 lg:p-8">

                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">
                    {item.year}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3">
                    {item.body}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* INFRASTRUCTURE EVIDENCE — PHOTO STRIP */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Infrastructure Evidence"
          title="Real Work, Photographed"
          subtitle="Replace the placeholders below with current infrastructure, lab, and pilot photographs."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {[
            {
              caption: "KIIT-TBI office setup — Crabionics infrastructure base of operations.",
              file: "kiit-office.jpg",
            },
            {
              caption: "Modular box rack / RAS plumbing under development at the pilot site.",
              file: "ras-plumbing.jpg",
            },
            {
              caption: "Sensor calibration and telemetry node setup for AquaOS instrumentation.",
              file: "sensor-setup.jpg",
            },
            {
              caption: "Current pilot infrastructure progress — grow-out and isolation systems.",
              file: "pilot-setup.jpg",
            },
          ].map((item) => (
            <GlassCard
              key={item.file}
              className="overflow-hidden"
            >

              {/* PHOTO PLACEHOLDER */}
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

      {/* INVESTOR CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Investor Access
              </p>

              <h2 className="mt-5 max-w-3xl">
                For Deck Requests, Diligence Access, and Pilot Collaboration
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                Crabionics works with strategic capital, grant-aligned partners,
                and infrastructure collaborators. Direct founder-level conversations
                preferred for technical and capital discussions.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/contact"
                className="primary-button"
              >
                Contact Founder
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
