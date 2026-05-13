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

              {/* INSTITUTIONAL PROOF STRIP */}
              <div className="mt-12">

                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/70">
                  Institutionally backed
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

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

                {/* PILOT CALLOUT */}
                <div className="mt-8 flex items-center gap-4">

                  <p className="text-3xl font-semibold text-white sm:text-4xl">
                    600+
                  </p>

                  <p className="max-w-xs text-xs text-slate-300 sm:text-sm">
                    Box-scale pilot infrastructure under development at KIIT-TBI
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
                title: "Crabs kill each other",
                lead: "Cannibalism",
                text: "Put crabs together in a pond or tank and the strong ones kill the weak ones — especially during molt. Whole batches disappear before harvest.",
              },
              {
                title: "Molt is a blind spot",
                lead: "Vulnerability window",
                text: "For roughly a day after molting a crab is defenseless. Without per-crab visibility, you only learn it happened when the animal is already gone.",
              },
              {
                title: "Water shifts faster than you see it",
                lead: "Environmental drift",
                text: "Oxygen, salinity, ammonia and temperature swing with weather and feed load. By the time the symptoms show up in the crab, the cycle is already compromised.",
              },
              {
                title: "Nothing gets tracked individually",
                lead: "No causality",
                text: "Traditional ponds give one number at harvest. There is no growth history, no molt log, no link between an action and an outcome — so nothing improves cycle to cycle.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-8"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                  {item.lead}
                </p>

                <h3 className="mt-4 text-2xl">
                  {item.title}
                </h3>

                <p className="mt-5">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* TAKEAWAY */}
          <p className="mx-auto mt-16 max-w-3xl text-center text-lg text-slate-200">
            Crabionics converts biological uncertainty into predictable production.
          </p>
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
