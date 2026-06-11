import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Capital — Investment Thesis",
  description:
    "Crabionics is building the production architecture for industrial-scale mud crab aquaculture. Institutionally backed by KIIT-TBI, DST NIDHI PRAYAS, and BIRAC BIG.",
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
      "Modular RAS, isolation, and controlled water — solving biological instability instead of expanding ponds.",
  },
  {
    title: "Operational Intelligence Layer",
    description:
      "AquaOS is being built to turn telemetry into decisions, building a dataset that's hard to replicate.",
  },
  {
    title: "High-value Species Focus",
    description:
      "Mud crab is a premium export species in structural undersupply, today met by volatile wild catch.",
  },
  {
    title: "Modular Scalability",
    description:
      "Units replicate without redesign — clusters scale by adding boxes, not rebuilding.",
  },
  {
    title: "Closed-loop Systems",
    description:
      "RAS improves water reuse and environmental control, cutting the per-cycle variability that breaks pond economics.",
  },
  {
    title: "Long-term Defensibility",
    description:
      "The moat is the production dataset — biological intelligence no incumbent holds.",
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
    year: "Nov 2025",
    title: "Crabionics Aquaculture Pvt. Ltd. Incorporated",
    body:
      "Incorporated as a Private Limited Company on 19 November 2025.",
  },
  {
    year: "2026",
    title: "BIRAC BIG Grant — 24th Call",
    body:
      "Awarded under BIRAC's Biotechnology Ignition Grant (24th call) — 2026.",
  },
  {
    year: "May 2026",
    title: "DPIIT Startup Recognition",
    body:
      "Recognised by the Department for Promotion of Industry and Internal Trade, Government of India — Agriculture / Fisheries sector (Certificate No. DIPP261048).",
  },
];

const validation = [
  {
    org:  "DPIIT · Startup India",
    role: "Government of India — Recognised Startup",
    note: "DPIIT recognition issued May 2026 (Certificate No. DIPP261048). Agriculture / Fisheries sector.",
    logo: "/logos/dpiit-startup-india.png",
    alt:  "DPIIT — Department for Promotion of Industry and Internal Trade",
  },
  {
    org:  "KIIT-TBI",
    role: "Technology Business Incubator",
    note: "Active incubation, operational infrastructure access, and commercialization support.",
    logo: "/logos/kiit-tbi.png",
    alt:  "KIIT-TBI — KIIT Technology Business Incubator",
  },
  {
    org:  "DST NIDHI PRAYAS",
    role: "Government of India — Department of Science & Technology",
    note: "Innovation ecosystem support for deep-tech aquaculture infrastructure development.",
    logo: "/logos/dst-nidhi-prayas.png",
    alt:  "DST NIDHI PRAYAS — Department of Science & Technology",
  },
  {
    org:  "BIRAC BIG",
    role: "Biotechnology Industry Research Assistance Council",
    note: "Biotechnology Ignition Grant — 24th call. Awarded 2026.",
    logo: "/logos/birac-big.png",
    alt:  "BIRAC — Biotechnology Industry Research Assistance Council",
  },
];

const phases = [
  {
    phase:   "Phase A",
    period:  "2026",
    label:   "Pilot + Validation",
    detail:  "600-box RAS at KIIT-TBI. Prove survival and unit economics. Validate SOPs at controlled scale.",
    revenue: "No commercial revenue — by design.",
  },
  {
    phase:   "Phase B",
    period:  "2027",
    label:   "Deployment Services",
    detail:  "Deploy for progressive farms. Cluster partnerships under an asset-light model. First recurring revenue.",
    revenue: "Setup fees + monitoring contracts.",
  },
  {
    phase:   "Phase C",
    period:  "2027–28",
    label:   "Productization",
    detail:  "CrabPod™ unit sales. AquaOS™ SaaS per farm. Hatchery module licensing. Franchise deployment templates.",
    revenue: "Hardware + recurring SaaS.",
  },
  {
    phase:   "Phase D",
    period:  "2028+",
    label:   "Intelligence Network",
    detail:  "CIN predictive models across farms. Supply forecasting, mortality prediction, and carbon traceability.",
    revenue: "Platform licensing + data network.",
  },
];

const marketData = [
  {
    value: "$51/unit",
    label: "Europe price",
    note:  "+230% YoY — supply-starved",
  },
  {
    value: "$35/unit",
    label: "USA price",
    note:  "+146% YoY",
  },
  {
    value: "4,500 t",
    label: "India annual export",
    note:  "Surging demand, capped supply",
  },
  {
    value: "50–70%",
    label: "Traditional mortality",
    note:  "Every cycle, every farm",
  },
];

const unitEconomics = [
  {
    label: "600-box module",
    value: "~1 tonne / yr",
    note:  "Single deployable unit. Validates economics before next step.",
  },
  {
    label: "Cluster (5 modules / 3,000 boxes)",
    value: "~5 tonnes / yr",
    note:  "Standard SOP-driven deployment. Replicable, franchisable.",
  },
  {
    label: "India target — 10% share",
    value: "~452 tonnes / yr",
    note:  "≈ 90 clusters. Hardware bootstraps SaaS.",
  },
  {
    label: "Live export-grade price",
    value: "₹1,200–1,600 / kg",
    note:  "For 500g+ crab. Soft-shell carries a 3× premium.",
  },
];

const useOfFunds = [
  { pct: "35%", label: "600-Box Pilot",      detail: "Hardware + RAS" },
  { pct: "25%", label: "IHMS Prototype",     detail: "Hatchery layer" },
  { pct: "20%", label: "AquaOS + Data Infra", detail: "Software stack" },
  { pct: "15%", label: "IP Filing",          detail: "4 families · under filing" },
  { pct: "5%",  label: "Ops & Contingency",  detail: "Buffer" },
];

export default function CapitalPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-20 lg:py-28">

          <div className="max-w-5xl">

            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Investment thesis
            </div>

            <h1 className="mt-8 max-w-4xl">
              Back the validation inflection of an operationally-experienced team
            </h1>

            <p className="mt-8 max-w-3xl text-lg">
              An operationally-experienced team entering its first controlled-validation
              phase — capital to turn real operating experience into provable industrial
              causality. Backed by KIIT-TBI, DST NIDHI PRAYAS, and BIRAC BIG (24th call).
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
          subtitle="A top-value export crustacean, held back by structurally unstable production. We're building the infrastructure layer that makes precision production possible."
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

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-slate-300">
          <span className="font-medium text-white">The model, stated cleanly:</span>{" "}
          a distributed production network — centralized biological intelligence
          (nursery + finishing) plus decentralized farmer biomass growth, with the
          processor as the customer taking guaranteed export-spec live and soft-shell
          supply.
        </p>
      </SectionWrapper>

      {/* COMMERCIAL PROGRESSION */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Commercial Progression"
          title="From pilot validation to platform infrastructure"
          subtitle="Sequenced, not simultaneous — revenue mix and risk shift with each step."
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
                  {item.phase} · {item.period}
                </p>

                <p className="mt-3 text-lg font-medium text-white">
                  {item.label}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  {item.detail}
                </p>

                <div className="mt-5 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200">
                    {item.revenue}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* UNIT ECONOMICS */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Unit Economics"
          title="Capital-efficient modular deployment"
          subtitle="Design targets the 600-box pilot is built to validate — not yet-achieved results. Each unit proves economics before the next scale step."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">

          {unitEconomics.map((item) => (
            <GlassCard
              key={item.label}
              className="relative overflow-hidden p-8"
            >

              <div className="absolute right-[-20%] top-[-20%] h-[180px] w-[180px] rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                  {item.label}
                </p>

                <p className="mt-5 text-3xl font-semibold text-white">
                  {item.value}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  {item.note}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* MARKET CONDITIONS */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="Market Conditions"
          title="A premium export category that cannot supply itself"
          subtitle="The bottleneck isn't demand — it's supply architecture."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">

          {marketData.map((item) => (
            <GlassCard
              key={item.label}
              className="p-8"
            >
              <p className="text-3xl font-semibold text-white">
                {item.value}
              </p>

              <p className="mt-4 text-sm font-medium text-cyan-200">
                {item.label}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {item.note}
              </p>
            </GlassCard>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-slate-400">
          Shrimp has Aquabyte and Benchmark; salmon has full industrial infrastructure.
          Mud crab production architecture is unclaimed — and we have a 2+ year field head start.
        </p>
      </SectionWrapper>

      {/* THE ASK */}
      <SectionWrapper className="section-divider overflow-hidden">

        <SectionHeading
          eyebrow="The Ask"
          title="Pre-seed capital to execute validation"
          subtitle="Already de-risked: R&D operating experience, an established buyer network, documented grade-uplift economics, and incubation + grant backing. What the capital unlocks: the pilot dataset plus 1-hectare farmer linkage — the proof points for cluster economics."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">

          {/* Round summary */}
          <GlassCard className="relative overflow-hidden p-10">

            <div className="absolute right-[-15%] top-[-15%] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10">

              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                Seeking pre-seed
              </p>

              <p className="mt-6 font-display text-4xl text-white lg:text-5xl">
                Milestone-gated pre-seed
              </p>

              <p className="mt-4 text-sm text-slate-300">
                18-month runway · Pre-validation stage · BIRAC co-funded
              </p>

              <div className="mt-10">

                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                  Structure
                </p>

                <p className="mt-3 text-lg font-medium text-white">
                  Flexible — CCD structure available
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Round size and valuation are shared in the data room. Terms
                  align to strategic fit and validation milestones.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* 18-month outcome */}
          <GlassCard className="p-10">

            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
              18-month outcome
            </p>

            <div className="mt-8 space-y-4">

              {[
                "TRL-6 IHMS, validated through the 600-box RAS pilot",
                "First 600-box production dataset",
                "AquaOS running on the pilot cluster",
                "4 patent families filed",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="h-2 w-2 rounded-full bg-cyan-300" />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Clear inflection point for a milestone-gated Seed round.
            </p>
          </GlassCard>
        </div>

        {/* Use of funds */}
        <div className="mx-auto mt-12 max-w-6xl">

          <p className="text-center text-xs uppercase tracking-[0.22em] text-cyan-200/70">
            Use of funds — 18 months
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {useOfFunds.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <p className="font-display text-3xl text-white">{item.pct}</p>
                <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* INSTITUTIONAL VALIDATION */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Institutional Validation"
          title="Continuity, Credibility, Execution Readiness"
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {validation.map((item) => (
            <GlassCard
              key={item.org}
              className="p-8"
            >

              {/* LOGO */}
              <div className="flex h-20 items-center justify-center rounded-2xl bg-white/95 px-6">
                <Image
                  src={item.logo}
                  alt={item.alt}
                  width={220}
                  height={64}
                  className="max-h-12 w-auto object-contain"
                />
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
          subtitle="Each milestone is a real infrastructure or institutional outcome — not a forecast."
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
                We work with strategic capital and grant-aligned partners — founder-level
                conversations preferred.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link
                href="/contact"
                className="primary-button"
              >
                Talk to the founders
              </Link>

              <Link
                href="/platform"
                className="secondary-button"
              >
                Platform &amp; Technology
              </Link>
            </div>
          </div>
        </div>

      </SectionWrapper>

    </main>
  );
}
