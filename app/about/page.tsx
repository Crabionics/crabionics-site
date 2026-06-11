import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "About",
  description:
    "Crabionics is building the production architecture for industrial-scale mud crab aquaculture — modular hardware, telemetry, and operational intelligence, integrated.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Crabionics",
    description:
      "Mission, operating model, and long-term vision behind Crabionics.",
    url: "https://crabionics.com/about",
    type: "website",
  },
};

const principles = [
  {
    title: "Infrastructure Before Scale",
    description:
      "We focus first on repeatable operating environments, because predictable biology depends on predictable infrastructure.",
  },
  {
    title: "Data With Operational Context",
    description:
      "Telemetry only matters when linked to intervention logic, SOP discipline, and production outcomes.",
  },
  {
    title: "Build for Deployment",
    description:
      "Every system is designed to move from pilot units to distributed coastal clusters without architectural rewrites.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              About
            </div>

            <h1 className="mt-8 max-w-4xl">Engineering controlled mud crab production</h1>

            <p className="mt-8 max-w-3xl text-lg">
              We build the hardware and the control layer that makes mud crab
              production predictable — and treat the data it generates as the
              long-term moat.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading
          eyebrow="Who We Are"
          title="A Hardware + Intelligence Company for Aquaculture"
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {principles.map((item) => (
            <GlassCard key={item.title} className="p-8">
              <div className="h-3 w-3 rounded-full bg-cyan-300" />
              <h3 className="mt-6">{item.title}</h3>
              <p className="mt-5">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Operating Focus</p>
              <h2 className="mt-5">From Biological Volatility to Operational Control</h2>
              <p className="mt-6 max-w-2xl text-lg">
                Turning high-value species complexity into repeatable protocols across
                hatchery, nursery, soft-shell, and grow-out.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Modular and isolation-based system architecture",
                "Continuous telemetry integrated with SOP execution",
                "Biological event tracking for inference-ready datasets",
                "Deployment model for regional production scaling",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Explore Further</p>
              <h2 className="mt-5 max-w-3xl">See the full platform and technology architecture</h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/platform" className="primary-button">Platform Overview</Link>
              <Link href="/technology" className="secondary-button">How It Works</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
