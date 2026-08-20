"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { IconChart, IconGlobe, IconLeaf } from "@/app/components/ui/Icons";

const points = [
  {
    icon: IconChart,
    body: (
      <>
        India exports <strong className="font-semibold text-slate-900">~4,500 tonnes/year</strong>,
        at a ~$51/unit scarcity premium.
      </>
    ),
  },
  {
    icon: IconGlobe,
    body: (
      <>
        Global demand is growing. Supply is structurally constrained.
      </>
    ),
  },
  {
    icon: IconLeaf,
    body: (
      <>
        We are building <strong className="font-semibold text-slate-900">the infrastructure</strong> to
        change that.
      </>
    ),
  },
];

export default function HomeHeroAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-left"
    >
      {/* brand / category pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-4 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
          Crabionics
        </span>
        <span className="text-slate-300">·</span>
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-700">
          Biological production infrastructure
        </span>
      </div>

      <h1
        className="font-display mt-7 max-w-2xl text-balance text-slate-900"
        style={{ fontSize: "clamp(2.2rem, 4.4vw, 4.2rem)", lineHeight: 1.07 }}
      >
        Mud crab sells for <span className="text-cyan-600">3&ndash;4x</span> the price of shrimp.
        Unlike shrimp, <span className="text-cyan-600">no one has industrialized it.</span>
      </h1>

      <ul className="mt-8 max-w-md space-y-3">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-700">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-sm text-slate-700 sm:text-base">{p.body}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/platform" className="primary-button w-full sm:w-auto">
          Explore Our Platform →
        </Link>

        <Link
          href="mailto:sameer@crabionics.com"
          className="secondary-button w-full border-slate-300/70 bg-white/60 text-slate-900 sm:w-auto"
        >
          Request Demo →
        </Link>
      </div>

      <p className="mt-7 text-[11px] uppercase tracking-[0.18em] text-slate-500">
        Institutionally backed · DPIIT · KIIT-TBI · DST NIDHI PRAYAS · BIRAC BIG
      </p>
    </motion.div>
  );
}
