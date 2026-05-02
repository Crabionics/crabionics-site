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

        <Image
          src="/infrastructure.png"
          alt="Crabionics modular aquaculture infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <HeroParticles />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

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
            />
          </div>
        </div>

      </section>


      {/* ================= SECTION 2 ================= */}
      <section className="bg-white py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto px-6"
        >
          <p className="text-xs uppercase tracking-widest text-teal-600 mb-4">
            Crabionics Aquaculture OS
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            From Biological Uncertainty to Controlled Production Systems
          </h2>

          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            Crabionics builds a closed-loop aquaculture operating system combining
            modular RAS infrastructure, real-time sensing, and AI-driven decision systems.
          </p>
        </motion.div>
      </section>


      {/* ================= FEATURES ================= */}
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


      {/* ================= AQUAOS ================= */}
      <section className="bg-white py-28 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          How AquaOS Controls Production
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          A closed-loop system that senses, predicts, and acts continuously.
        </p>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 px-6">

          <Step title="Crab Unit" desc="Individual box culture" />
          <Connector />
          <Step title="Sensors" desc="DO · pH · NH3 · Temp" />
          <Connector />
          <Step title="AquaOS" desc="Digital Twin Intelligence" highlight />
          <Connector />
          <Step title="Decision" desc="Predict risk" />
          <Connector />
          <Step title="Action" desc="Flush · Feed · Aerate" />
          <Connector />
          <Step title="Output" desc="Stable yield" />

        </div>
      </section>


      {/* ================= HYBRID FLOW ================= */}
      <section className="bg-slate-50 py-28 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Hybrid Production Model
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Pond-based growth combined with high-precision RAS finishing.
        </p>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 px-6">

          <Step title="Hatchery" desc="Crablet production" />
          <Connector />
          <Step title="Ponds" desc="Low-cost growth" />
          <Connector />
          <Step title="RAS" desc="Controlled finishing" highlight />
          <Connector />
          <Step title="Export" desc="Premium output" />

        </div>
      </section>


      {/* ================= PILOT ================= */}
      <section className="bg-white py-28 text-center">

        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Pilot Validation
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Proven performance under real farming conditions.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto px-6">

          <Metric value="~80%" label="Survival Rate" />
          <Metric value="5x" label="Yield Increase" />
          <Metric value="3 Months" label="Cycle Time" />

        </div>

      </section>

    </main>
  );
}


/* ================= COMPONENTS ================= */

function FeatureCard({ title, desc }: any) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      className="bg-white p-6 rounded-xl border text-center"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </motion.div>
  );
}

function Step({ title, desc, highlight }: any) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      className={`p-6 rounded-xl border w-48 text-center ${
        highlight ? "bg-teal-50 border-teal-500" : "bg-white"
      }`}
    >
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-slate-500 mt-2">{desc}</p>
    </motion.div>
  );
}

function Connector() {
  return <div className="hidden md:block w-10 h-[2px] bg-teal-500" />;
}

function Metric({ value, label }: any) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
    >
      <p className="text-3xl text-teal-600 font-semibold">{value}</p>
      <p className="text-sm text-slate-600 mt-2">{label}</p>
    </motion.div>
  );
}
