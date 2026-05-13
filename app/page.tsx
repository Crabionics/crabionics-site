"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import ClosedLoopSection from "@/app/components/sections/ClosedLoopSection";
import HomePlatformBrief from "@/app/components/sections/HomePlatformBrief";
import HomeValidationStrip from "@/app/components/sections/HomeValidationStrip";
import FinalCTASection from "@/app/components/sections/FinalCTASection";

const problems = [
  {
    lead: "Cannibalism",
    title: "Crabs kill each other",
    text: "Put crabs together in a pond or tank and the strong ones kill the weak ones — especially during molt. Whole batches disappear before harvest.",
  },
  {
    lead: "Vulnerability window",
    title: "Molt is a blind spot",
    text: "For roughly a day after molting a crab is defenseless. Without per-crab visibility, you only learn it happened when the animal is already gone.",
  },
  {
    lead: "Environmental drift",
    title: "Water shifts faster than you see it",
    text: "Oxygen, salinity, ammonia and temperature swing with weather and feed load. By the time symptoms show up in the crab, the cycle is compromised.",
  },
  {
    lead: "No causality",
    title: "Nothing gets tracked individually",
    text: "Traditional ponds give one number at harvest. There is no growth history, no molt log, no link between an action and an outcome — so nothing improves cycle to cycle.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">

      {/* ----------------------------------------------------------- */}
      {/* HERO — light                                                 */}
      {/* ----------------------------------------------------------- */}
      <section className="section-light relative overflow-hidden">

        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute left-[-10%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-teal-300/15 blur-3xl" />

        <div className="container-shell relative z-10 py-20 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">

            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >

              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-50 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-cyan-700 sm:text-xs">
                Precision Aquaculture Infrastructure
              </div>

              {/* Headline */}
              <h1 className="max-w-2xl text-slate-900 sm:text-6xl lg:text-[5.2rem]">
                The operating system for precision mud crab aquaculture.
              </h1>

              {/* Subtext */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Closed-loop infrastructure combining modular RAS,
                telemetry, biological intelligence, and operational
                automation — built bottom-up at our KIIT-TBI pilot.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link href="/platform" className="primary-button w-full sm:w-auto">
                  Explore Platform
                </Link>

                <Link href="/capital" className="secondary-button w-full sm:w-auto">
                  Investor Brief
                </Link>
              </div>

              {/* Proof strip */}
              <div className="mt-10">

                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Institutionally backed
                </p>

                <div className="mt-4 flex flex-wrap gap-3">

                  {[
                    "KIIT-TBI Incubated",
                    "DST NIDHI PRAYAS Supported",
                    "BIRAC BIG Grant Recipient",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      <span className="text-xs font-medium text-slate-800">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">

                <div className="relative aspect-[4/5] w-full">

                  <Image
                    src="/infrastructure.png"
                    alt="Crabionics modular infrastructure"
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />

                  {/* Soft caption overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-6">

                    <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200">
                      Pilot infrastructure
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      600-box modular grow-out architecture under development at KIIT-TBI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating metric chip */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl sm:block">

                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Pilot scale
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  600+ boxes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* PROBLEM — light                                              */}
      {/* ----------------------------------------------------------- */}
      <section className="section-light section-padding section-divider">

        <div className="container-shell">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.22em] text-cyan-700">
              The problem
            </p>

            <h2 className="mt-5">
              Mud crab farming was never designed as a controlled system
            </h2>

            <p className="mt-6 text-lg">
              Traditional production methods create unpredictable survival,
              unstable yields, and fragmented supply chains. Four specific
              failure modes drive most of the loss.
            </p>
          </div>

          {/* PROBLEM GRID */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {problems.map((item) => (
              <div
                key={item.title}
                className="card-light rounded-2xl p-7"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                  {item.lead}
                </p>

                <h3 className="mt-4 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* TAKEAWAY */}
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium text-slate-700">
            Crabionics converts biological uncertainty into predictable production.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* CLOSED-LOOP — dark (the data / dashboard moment)             */}
      {/* ----------------------------------------------------------- */}
      <ClosedLoopSection />

      {/* ----------------------------------------------------------- */}
      {/* PLATFORM BRIEF — light                                       */}
      {/* ----------------------------------------------------------- */}
      <HomePlatformBrief />

      {/* ----------------------------------------------------------- */}
      {/* VALIDATION STRIP — light                                     */}
      {/* ----------------------------------------------------------- */}
      <HomeValidationStrip />

      {/* ----------------------------------------------------------- */}
      {/* FINAL CTA — dark                                             */}
      {/* ----------------------------------------------------------- */}
      <FinalCTASection />

    </main>
  );
}
