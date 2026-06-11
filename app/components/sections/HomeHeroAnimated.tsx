"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHeroAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          Crabionics
        </span>
        <span className="text-slate-300">·</span>
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-700">
          Biological production infrastructure
        </span>
      </div>

      <h1
        className="font-display mx-auto max-w-5xl text-center text-slate-900"
        style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)", lineHeight: 1.05 }}
      >
        Mud crab sells for <span className="text-cyan-600">3&ndash;4x</span> the price of shrimp. Unlike shrimp, no one has industrialized it.
      </h1>

      <div className="mx-auto mt-10 max-w-2xl">
        <p className="text-xl text-slate-600 sm:text-2xl">
          India exports 4,500 tonnes a year &mdash; and still can&rsquo;t supply it reliably.
        </p>
        <p className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">
          We are not building a better farm. We are building the modular RAS and AquaOS that give processors a 365-day, export-grade supply chain instead of a seasonal gamble.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/platform" className="primary-button w-full sm:w-auto">
          Explore the Platform
        </Link>

        <Link href="/capital" className="secondary-button w-full sm:w-auto">
          Investor Brief
        </Link>
      </div>

      <div className="mt-14">
        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
          Institutionally backed
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {[
            "DPIIT Recognised Startup",
            "KIIT-TBI Incubated",
            "DST NIDHI PRAYAS Supported",
            "BIRAC BIG Grant Recipient",
          ].map((item) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span className="text-xs font-medium text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
