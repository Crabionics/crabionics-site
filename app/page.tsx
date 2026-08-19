import type { Metadata } from "next";
import Link from "next/link";

import HomeHeroAnimated from "@/app/components/sections/HomeHeroAnimated";
import SystemsInMotionSection from "@/app/components/sections/SystemsInMotionSection";
import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Crabionics | Precision Mud Crab Production Infrastructure",
  description:
    "Crabionics builds production infrastructure and an operating system for precision mud crab aquaculture — modular habitat, sensing, actuation, and biological control.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Crabionics | Precision Mud Crab Production Infrastructure",
    description:
      "Production infrastructure + operating system for precision mud crab aquaculture.",
    url: "https://crabionics.com/",
    type: "website",
  },
};

const architecture = [
  {
    step: "01",
    title: "Habitat",
    label: "Production environment",
    body: "Modular RAS and isolation architecture designed to make the production environment more controllable.",
  },
  {
    step: "02",
    title: "CrabSense",
    label: "Observe",
    body: "Environmental and operational telemetry creates a structured record of what is happening in production.",
  },
  {
    step: "03",
    title: "CrabPod",
    label: "Act",
    body: "The actuator layer connects production decisions to flushing, oxygenation, water movement, and other interventions.",
  },
  {
    step: "04",
    title: "AquaOS",
    label: "Decide",
    body: "The control layer turns signals, biological events, SOPs, and validated rules into coordinated operational decisions.",
  },
];

const validation = [
  {
    title: "Technology validation",
    status: "Active",
    body: "Engineering the modular RAS, sensing, automation, and operating protocols needed for controlled production.",
  },
  {
    title: "Biological validation",
    status: "Active",
    body: "Controlled production trials are used to test survival, growth, molting, water quality, and intervention logic.",
  },
  {
    title: "Economic validation",
    status: "Next gate",
    body: "The 600-box finishing programme is designed to test repeatable production economics before commercial replication.",
  },
  {
    title: "Commercial validation",
    status: "Building",
    body: "Processor demand, supply consistency, traceability, and deployment partnerships form the next commercial proof layer.",
  },
];

const evidence = [
  "KIIT-TBI incubation",
  "DST NIDHI PRAYAS support",
  "BIRAC BIG — 24th call",
  "DPIIT Startup recognition",
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <HomeHeroAnimated />

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="The Problem"
          title="Mud crab is valuable. Production is still unpredictable."
          subtitle="Crabionics is built around a simple hypothesis: if the production environment, biological signals, and operational responses become measurable and controllable, mud crab production can become more repeatable."
          align="center"
        />

        <div className="mx-auto mt-16 max-w-5xl">
          <GlassCard className="p-8 lg:p-12">
            <div className="grid gap-6 md:grid-cols-4">
              {[
                ["01", "Variable environment"],
                ["02", "Limited observability"],
                ["03", "Delayed intervention"],
                ["04", "Unpredictable output"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-mono text-xs text-cyan-200">{number}</p>
                  <p className="mt-4 text-sm font-medium text-white">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-white/10 pt-8 text-center">
              <p className="text-lg font-medium text-white">Our response: build the control architecture around the biology.</p>
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="The Crabionics Stack"
          title="Habitat → CrabSense → CrabPod → AquaOS"
          subtitle="One production architecture, with each layer solving a different part of the control problem."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-4">
          {architecture.map((item) => (
            <GlassCard key={item.step} className="relative overflow-hidden p-8">
              <div className="absolute right-[-15%] top-[-15%] h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative z-10">
                <p className="font-mono text-xs text-cyan-200">{item.step}</p>
                <p className="mt-5 text-2xl font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">{item.label}</p>
                <p className="mt-5 text-sm text-slate-300">{item.body}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SystemsInMotionSection />

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Validation Architecture"
          title="We are not claiming the finished system. We are building the evidence."
          subtitle="The website now separates what is operating, what is being validated, and what remains a future capability."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
          {validation.map((item) => (
            <GlassCard key={item.title} className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="h-3 w-3 shrink-0 rounded-full bg-cyan-300" />
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm text-slate-300">{item.body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="AquaOS"
          title="Observe → Understand → Decide → Act → Learn"
          subtitle="AquaOS is being built as the operating layer for biological production — not as a generic dashboard."
          align="center"
        />
        <div className="mx-auto mt-16 max-w-5xl">
          <GlassCard className="p-8 lg:p-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {["Observe", "Understand", "Decide", "Act", "Learn"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5 text-center">
                  <p className="font-mono text-xs text-cyan-200">0{index + 1}</p>
                  <p className="mt-3 font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-400">
              The important output is not a prettier dashboard. It is a verified operational decision connected to a biological outcome.
            </p>
          </GlassCard>
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Evidence Base"
          title="The company has institutional validation — now we have to earn production validation."
          align="center"
        />
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {evidence.map((item) => (
            <div key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">The next proof point</p>
              <h2 className="mt-5 max-w-3xl">Build controlled production. Measure it. Learn from it. Then replicate it.</h2>
              <p className="mt-5 max-w-2xl text-slate-300">
                The current stage is validation — turning engineering and operating experience into biological and economic evidence strong enough to support commercial scale.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/platform" className="primary-button">Explore the platform</Link>
              <Link href="/capital" className="secondary-button">Read the investment thesis</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
