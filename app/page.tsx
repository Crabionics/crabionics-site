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
      <section className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src="/infrastructure.png"
            alt="Crabionics Infrastructure"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              md:object-cover
              object-[68%_center]
              md:object-center
              scale-100
              md:scale-100
            "
          />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/88 via-[#04111f]/78 to-[#020617]/88" />

        {/* GLOW */}
        <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl md:h-[500px] md:w-[500px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-teal-400/10 blur-3xl md:h-[500px] md:w-[500px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-screen items-center">

          <div className="container-shell py-28 md:py-32">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="max-w-5xl"
            >

              {/* EYEBROW */}
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-cyan-200 backdrop-blur-md sm:text-xs">
                Precision Aquaculture Infrastructure
              </div>

              {/* HEADLINE */}
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Engineering the Operating System for Precision Mud Crab Aquaculture
              </h1>

              {/* SUBTEXT */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                Closed-loop aquaculture infrastructure integrating modular
                RAS systems, biological intelligence, telemetry,
                and operational automation.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/platform"
                  className="primary-button w-full sm:w-auto"
                >
                  Explore Platform
                </Link>

                <Link
                  href="/aquaos"
                  className="secondary-button w-full sm:w-auto"
                >
                  View AquaOS
                </Link>
              </div>

              {/* METRICS */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">

                <div>
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    600+
                  </p>

                  <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                    Box Pilot Architecture
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    AI
                  </p>

                  <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                    Closed-loop Control
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    RAS
                  </p>

                  <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                    Modular Infrastructure
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    CIN
                  </p>

                  <p className="mt-2 text-xs text-slate-300 sm:text-sm">
                    Intelligence Network
                  </p>
                </div>

              </div>

            </motion.div>

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
