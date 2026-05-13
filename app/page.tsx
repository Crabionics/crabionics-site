"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import ClosedLoopRing from "@/app/components/diagrams/ClosedLoopRing";
import HomePlatformBrief from "@/app/components/sections/HomePlatformBrief";
import HomeValidationStrip from "@/app/components/sections/HomeValidationStrip";

const problems = [
  {
    lead: "Cannibalism",
    title: "Crabs kill each other",
    text: "Pack them together and the strong ones kill the weak ones — especially during molt. Entire batches vanish before harvest.",
  },
  {
    lead: "Vulnerability window",
    title: "Molt is a blind spot",
    text: "For roughly a day after molting, a crab is defenseless. Without per-animal visibility you only learn it happened when the animal is already gone.",
  },
  {
    lead: "Environmental drift",
    title: "Water shifts faster than you see it",
    text: "Oxygen, salinity, ammonia, temperature — all swing with weather and feed load. By the time symptoms show up in the crab, the cycle is already compromised.",
  },
  {
    lead: "No causality",
    title: "Nothing is tracked individually",
    text: "Traditional ponds give one number at harvest. No growth history, no molt log, no link between an action and an outcome — so nothing improves cycle to cycle.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">

      {/* ===========================================================
           HERO — light, centered, serif H1
         =========================================================== */}
      <section className="section-light relative overflow-hidden">

        {/* decorative glows */}
        <div className="pointer-events-none absolute right-[-20%] top-[-15%] h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute left-[-15%] bottom-[-30%] h-[460px] w-[460px] rounded-full bg-teal-300/12 blur-3xl" />

        <div className="container-shell relative z-10 py-24 text-center lg:py-36">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-50 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-cyan-700 sm:text-xs">
              Production Architecture
            </div>

            {/* H1 — serif display */}
            <h1
              className="font-display mx-auto max-w-5xl text-center text-slate-900"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)", lineHeight: 1.05 }}
            >
              Production Architecture for Precision Crustacean Aquaculture
            </h1>

            {/* The deck — the strongest copy on the site */}
            <div className="mx-auto mt-10 max-w-2xl">
              <p className="text-xl text-slate-600 sm:text-2xl">
                We are not building a better farm.
              </p>
              <p className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">
                We are building the system that makes industrial-scale crustacean production possible.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link href="/platform" className="primary-button w-full sm:w-auto">
                Explore the Platform
              </Link>

              <Link href="/capital" className="secondary-button w-full sm:w-auto">
                Investor Brief
              </Link>
            </div>

            {/* Proof strip */}
            <div className="mt-14">

              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                Institutionally backed
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">

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
        </div>
      </section>

      {/* ===========================================================
           HERO IMAGE STRIP — wide, no caption
         =========================================================== */}
      <section className="section-light relative">

        <div className="container-shell pb-16">

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">

            <div className="relative aspect-[16/9] w-full">

              <Image
                src="/infrastructure.png"
                alt="Crabionics modular grow-out and RAS hardware"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />

              {/* Subtle vignette at the edges */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
           PROBLEM — light
         =========================================================== */}
      <section className="section-light section-padding section-divider">

        <div className="container-shell">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
              The problem
            </p>

            <h2 className="mt-5">
              Mud crab farming was never designed as a controlled system
            </h2>

            <p className="mt-6 text-lg">
              Traditional methods produce unpredictable survival,
              unstable yields, and fragmented supply chains. Four specific
              failure modes drive most of the loss.
            </p>
          </div>

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

          <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium text-slate-700">
            Crabionics converts biological uncertainty into repeatable production.
          </p>
        </div>
      </section>

      {/* ===========================================================
           CLOSED-LOOP RING — dark, the signature visual moment
         =========================================================== */}
      <section className="relative overflow-hidden section-padding">

        {/* dark backdrop on top of the global background — reinforces darkness */}
        <div className="pointer-events-none absolute inset-0 bg-[#04091a]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="container-shell relative z-10">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              The operating principle
            </p>

            <h2 className="mt-5 text-white">
              <span className="font-display italic text-cyan-200">Every cycle</span> teaches the next.
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              Sensors capture biological and environmental signals. The system
              infers state, computes the right response, and acts — then logs
              what happened so the next cycle starts smarter.
            </p>
          </div>

          <div className="mt-16">
            <ClosedLoopRing />
          </div>
        </div>
      </section>

      {/* ===========================================================
           PLATFORM BRIEF — light
         =========================================================== */}
      <HomePlatformBrief />

      {/* ===========================================================
           VALIDATION STRIP — light
         =========================================================== */}
      <HomeValidationStrip />

      {/* ===========================================================
           FINAL CTA — dark, single statement
         =========================================================== */}
      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0 bg-[#04091a]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="container-shell relative z-10 py-32 text-center lg:py-44">

          <h2
            className="font-display mx-auto max-w-4xl text-center text-white"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.05 }}
          >
            Want to see it <em className="text-cyan-200">run?</em>
          </h2>

          <div className="mt-12">

            <Link href="/contact" className="primary-button">
              Contact founder
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
