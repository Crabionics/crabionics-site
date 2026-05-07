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
export default function HomePage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src="/infrastructure.png"
            alt="Crabionics Infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/95 via-[#08111f]/88 to-[#041018]/80" />

        {/* TELEMETRY GLOW */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-3xl" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-screen items-center">
          <div className="container-shell">

            <div className="grid items-center gap-12 lg:grid-cols-2">

              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >

                {/* EYEBROW */}
                <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
                  Precision Aquaculture Infrastructure
                </div>

                {/* HEADLINE */}
                <h1 className="max-w-3xl">
                  Engineering the Operating System for Precision Mud Crab Aquaculture
                </h1>

                {/* SUBTEXT */}
                <p className="mt-8 max-w-2xl text-lg sm:text-xl">
                  Closed-loop aquaculture infrastructure integrating
                  modular RAS systems, biological intelligence,
                  telemetry, and operational automation.
                </p>

                {/* CTA */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href="/platform"
                    className="primary-button"
                  >
                    Explore Platform
                  </Link>

                  <Link
                    href="/aquaos"
                    className="secondary-button"
                  >
                    View AquaOS
                  </Link>
                </div>

                {/* METRICS */}
                <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">

                  <div>
                    <p className="text-3xl font-semibold text-white">
                      600+
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Box Pilot Architecture
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-white">
                      AI
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Closed-loop Control
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-white">
                      RAS
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Modular Infrastructure
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-semibold text-white">
                      CIN
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Intelligence Network
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT VISUAL */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >

                <div className="glass-card relative overflow-hidden p-6">

                  {/* DASHBOARD HEADER */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">

                    <div>
                      <p className="text-sm font-medium text-white">
                        AquaOS Live Infrastructure
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Closed-loop biological monitoring
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-slate-400">
                        Operational
                      </span>
                    </div>
                  </div>

                  {/* MOCK GRID */}
                  <div className="mt-6 grid grid-cols-2 gap-4">

                    {[
                      "HatchSync",
                      "AquaOS",
                      "CrabPod",
                      "RAS Layer",
                      "CIN Network",
                      "Telemetry",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-sm font-medium text-white">
                          {item}
                        </p>

                        <div className="mt-4 h-2 rounded-full bg-white/5">
                          <div className="h-2 w-2/3 rounded-full bg-cyan-300" />
                        </div>

                        <p className="mt-3 text-xs text-slate-400">
                          Active monitoring layer
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* TELEMETRY */}
                  <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm text-cyan-100">
                          Live Risk Engine
                        </p>

                        <p className="mt-1 text-xs text-cyan-200/70">
                          Sensor → State → Decision
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-semibold text-white">
                          Stable
                        </p>

                        <p className="text-xs text-slate-400">
                          System Status
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* PROBLEM SECTION */}
      <section className="section-padding relative">

        <div className="container-shell">

          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Industry Problem
            </div>

            <h2>
              Mud Crab Farming Was Never Designed as a Controlled System
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg">
              Traditional production methods create unpredictable survival,
              unstable yields, and fragmented supply chains. Crabionics
              replaces reactive farming with closed-loop biological control.
            </p>
          </div>

          {/* PROBLEM GRID */}
          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Cannibalism",
                text: "High mortality from batch-based production systems.",
              },
              {
                title: "Molting Vulnerability",
                text: "Invisible biological risk windows causing losses.",
              },
              {
                title: "Water Instability",
                text: "Reactive operations create cascading system failures.",
              },
              {
                title: "No Individual Tracking",
                text: "Lack of causality and predictive operational control.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-8"
              >
                <h3 className="text-2xl">
                  {item.title}
                </h3>

                <p className="mt-5">
                  {item.text}
                </p>
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