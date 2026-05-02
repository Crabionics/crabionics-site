"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroParticles from "@/app/components/HeroParticles";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <main className="w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* IMAGE */}
        <Image
          src="/hero-crabionics.png"
          alt="Crabionics AquaOS"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-[75%_center]
            sm:object-[65%_center]
            md:object-center
          "
        />

        {/* PARTICLES */}
        <HeroParticles />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* CONTENT */}
        <div
          className="relative z-10 flex h-full items-center"
          style={{ opacity }}
        >
          <div className="mx-auto w-full max-w-6xl px-6">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >

              {/* LABEL */}
              <p className="text-teal-400 text-xs tracking-widest uppercase mb-4">
                Crabionics Aquaculture OS
              </p>

              {/* HEADING */}
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">

                Engineering{" "}
                <span className="text-teal-400 animate-pulse">
                  Predictable
                </span>
                <br />
                Crustacean Production

              </h1>

              {/* SUBTEXT */}
              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed">
                Closed-loop biological control powered by modular RAS,
                real-time sensing, and AI-driven decision systems.
              </p>

            </motion.div>

          </div>
        </div>

      </section>


      {/* ================= SECTION 2 ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-teal-600 mb-4"
          >
            Crabionics Aquaculture OS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight"
          >
            From Biological Uncertainty to Controlled Production Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-6 text-slate-600 text-base max-w-2xl mx-auto"
          >
            Crabionics builds a closed-loop aquaculture operating system combining
            modular RAS infrastructure, real-time sensing, and AI-driven decision systems.
          </motion.p>

        </div>
      </section>


      {/* ================= SECTION 3 ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-3">

          <FeatureCard
            title="AI for Precision"
            desc="Real-time biological monitoring and predictive decision models."
          />

          <FeatureCard
            title="Carbon Smart Farming"
            desc="Integrated mangrove-based systems and sustainable aquaculture practices."
          />

          <FeatureCard
            title="Data-Driven Scaling"
            desc="Continuous learning loops enabling predictable production."
          />

        </div>
      </section>


      {/* ================= AQUAOS INTERACTIVE ================= */}
      <section className="bg-white py-28">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-semibold text-slate-900"
          >
            How AquaOS Controls Production
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-4 text-slate-600 max-w-2xl mx-auto"
          >
            A closed-loop system that senses, predicts, and acts — continuously.
          </motion.p>

        </div>

        <div className="mt-20 max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            <Step delay={0} title="Crab Unit" desc="Individual box culture" />
            <Connector delay={0.2} />

            <Step delay={0.3} title="Sensors" desc="DO · pH · NH3 · Temp" />
            <Connector delay={0.5} />

            <Step delay={0.6} title="AquaOS" desc="Digital Twin Intelligence" highlight />
            <Connector delay={0.8} />

            <Step delay={0.9} title="Decision" desc="Predict risk & growth" />
            <Connector delay={1.1} />

            <Step delay={1.2} title="Action" desc="Flush · Feed · Aerate" />
            <Connector delay={1.4} />

            <Step delay={1.5} title="Output" desc="Stable yield" />

          </div>

          {/* LOOP */}
          <motion.div
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1, pathLength: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-12 flex justify-center"
          >
            <svg width="400" height="100">
              <path
                d="M10 80 C150 10, 250 10, 390 80"
                stroke="#14b8a6"
                strokeWidth="2"
                fill="transparent"
              />
            </svg>
          </motion.div>

        </div>
      </section>

    </main>
  );
}
{/* ================= HYBRID FLOW ================= */}
<section className="bg-slate-50 py-28">

  {/* HEADER */}
  <div className="max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-4xl font-semibold text-slate-900"
    >
      Hybrid Production Model
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-4 text-slate-600 max-w-2xl mx-auto"
    >
      Combining low-cost pond biomass with high-precision RAS finishing to deliver
      predictable, export-grade production.
    </motion.p>

  </div>

  {/* FLOW */}
  <div className="mt-20 max-w-7xl mx-auto px-6">

    <div className="flex flex-col md:flex-row items-center justify-between gap-10">

      <FlowStep
        delay={0}
        title="Hatchery"
        desc="Crablet production (Zoea → Megalopa)"
      />

      <FlowConnector delay={0.2} />

      <FlowStep
        delay={0.3}
        title="Farmer Ponds"
        desc="Low-cost biomass growth (20g → 120g)"
      />

      <FlowConnector delay={0.5} />

      <FlowStep
        delay={0.6}
        title="RAS Finishing"
        desc="Individual box system (200g → 500g)"
        highlight
      />

      <FlowConnector delay={0.8} />

      <FlowStep
        delay={0.9}
        title="Export Market"
        desc="Premium grade, traceable output"
      />

    </div>

  </div>

  {/* METRICS */}
  <div className="mt-16 max-w-6xl mx-auto px-6 grid gap-6 sm:grid-cols-3 text-center">

    <Metric value="5x" label="Higher Yield per Area" />
    <Metric value="~80%" label="Survival Rate" />
    <Metric value="4 Cycles" label="Per Year Production" />

  </div>

</section>

/* ================= COMPONENTS ================= */

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-6 text-center"
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </motion.div>
  );
}

function Step({
  title,
  desc,
  delay,
  highlight = false,
}: {
  title: string;
  desc: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 rounded-xl border text-center w-44
        ${highlight ? "bg-teal-50 border-teal-500" : "bg-white"}`}
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 40 }}
      transition={{ delay }}
      className="h-[2px] bg-teal-500 hidden md:block"
    />
  );
}
function FlowStep({
  title,
  desc,
  delay,
  highlight = false,
}: {
  title: string;
  desc: string;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-6 rounded-xl border text-center w-56
        ${highlight ? "bg-teal-50 border-teal-500" : "bg-white"}`}
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </motion.div>
  );
}

function FlowConnector({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 50 }}
      transition={{ delay }}
      className="h-[2px] bg-teal-500 hidden md:block"
    />
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <p className="text-3xl font-semibold text-teal-600">{value}</p>
      <p className="text-sm text-slate-600 mt-2">{label}</p>
    </motion.div>
  );
}