"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import ClosedLoopSection from "@/app/components/sections/ClosedLoopSection";
import PlatformStackSection from "@/app/components/sections/PlatformStackSection";
import AquaOSSection from "@/app/components/sections/AquaOSSection";
import DataIntelligenceSection from "@/app/components/sections/DataIntelligenceSection";
import RoadmapSection from "@/app/components/sections/RoadmapSection";
import FinalCTASection from "@/app/components/sections/FinalCTASection";
import ValidationSection from "@/app/components/sections/ValidationSection";
import InfrastructureSection from "@/app/components/sections/InfrastructureSection";

const problems = [
  "Cannibalism spikes during stress windows",
  "Molting vulnerability remains invisible until loss",
  "Water instability cascades across batches",
  "No individual telemetry, no predictive control",
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/infrastructure.png"
            alt="Crabionics Infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_center] md:object-center"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#04111f]/80 to-[#020617]/90" />
        <div className="telemetry-lines absolute inset-0 opacity-35" />
        <div className="absolute left-[-10%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="container-shell py-24 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-4xl"
            >
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-cyan-200 sm:text-xs">
                Closed-loop Biological Infrastructure
              </div>

              <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Operating System Infrastructure for Precision Mud Crab Aquaculture
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Crabionics unifies modular RAS, AquaOS orchestration, and CIN intelligence into a telemetry-driven production system.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/platform" className="primary-button w-full sm:w-auto">Explore Platform</Link>
                <Link href="/aquaos" className="secondary-button w-full sm:w-auto">View AquaOS</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-shell">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Operational Instability
            </div>
            <h2>Traditional Aquaculture Behaves Like an Unstable Biological System</h2>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {problems.map((item, index) => (
              <div key={item} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-300">Risk 0{index + 1}</p>
                <p className="mt-4 text-sm text-slate-200">{item}</p>
                {index < problems.length - 1 && <div className="absolute right-[-12px] top-1/2 hidden h-[1px] w-6 bg-cyan-400/40 lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosedLoopSection />
      <PlatformStackSection />
      <AquaOSSection />
      <InfrastructureSection />
      <DataIntelligenceSection />
      <ValidationSection />
      <RoadmapSection />
      <FinalCTASection />
    </main>
  );
}
