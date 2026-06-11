"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Stage = "proven" | "building" | "longterm";

type Layer = {
  n: string;
  name: string;
  role: string;
  stage: Stage;
  parts: string[];
};

// Ordered top-to-bottom for rendering. Data flows UP (RAS → CIN);
// intelligence feeds back DOWN the right rail (the closed loop).
const layers: Layer[] = [
  {
    n: "04",
    name: "CIN",
    role: "Distributed intelligence network",
    stage: "longterm",
    parts: ["Cross-farm benchmarking", "Predictive control", "Network optimization"],
  },
  {
    n: "03",
    name: "AquaOS",
    role: "Control & decision layer",
    stage: "building",
    parts: ["Biological state inference", "Decision logic", "Causality mapping"],
  },
  {
    n: "02",
    name: "Telemetry",
    role: "Capture & transport",
    stage: "proven",
    parts: ["DO · pH · ammonia · temp", "Molt & lifecycle events", "Structured datasets"],
  },
  {
    n: "01",
    name: "Modular RAS",
    role: "Physical infrastructure",
    stage: "proven",
    parts: ["Individual isolation boxes", "Biofiltration & recirculation", "Vertical grow-out"],
  },
];

const stageMeta: Record<Stage, { label: string; chip: string; dot: string }> = {
  proven: {
    label: "Proven in R&D",
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  building: {
    label: "Building",
    chip: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    dot: "bg-cyan-300",
  },
  longterm: {
    label: "Long-term",
    chip: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    dot: "bg-slate-400",
  },
};

export default function HomeArchitectureMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative mx-auto max-w-4xl">

      {/* Flow direction labels */}
      <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="text-cyan-300">↑</span> Data flows up
        </span>
        <span className="inline-flex items-center gap-2">
          Intelligence feeds back <span className="text-cyan-300">↻</span>
        </span>
      </div>

      <div className="relative grid grid-cols-[auto_1fr_auto] gap-x-3 sm:gap-x-5">

        {/* LEFT RAIL — vertical flow line + rising pulses */}
        <div className="relative flex w-10 justify-center sm:w-12">
          <div className="absolute inset-y-3 w-px bg-gradient-to-t from-emerald-400/40 via-cyan-400/40 to-slate-400/30" />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]"
              initial={{ top: "92%", opacity: 0 }}
              animate={{ top: ["92%", "6%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * 1.05,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* LAYER ROWS */}
        <div className="space-y-4">
          {layers.map((layer) => {
            const meta = stageMeta[layer.stage];
            const isActive = active === layer.n;

            return (
              <div
                key={layer.n}
                onMouseEnter={() => setActive(layer.n)}
                onMouseLeave={() => setActive(null)}
                className={`glass-card rounded-2xl p-5 transition-all duration-200 lg:p-6 ${
                  isActive ? "border-cyan-300/40 -translate-y-0.5" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-xs font-semibold text-cyan-200">
                    {layer.n}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-lg font-semibold text-white">{layer.name}</p>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${meta.chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-cyan-200/60">
                      {layer.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {layer.parts.map((part) => (
                    <span
                      key={part}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT RAIL — closed-loop feedback path */}
        <div className="relative hidden w-10 sm:block sm:w-12">
          <div className="absolute inset-y-6 right-1/2 w-px translate-x-1/2 border-r border-dashed border-cyan-400/30" />
          {/* top cap */}
          <div className="absolute right-0 top-4 h-px w-1/2 bg-cyan-400/30" />
          {/* bottom cap with arrowhead back into the stack */}
          <div className="absolute bottom-6 right-0 h-px w-1/2 bg-cyan-400/30" />
          <span className="absolute bottom-[1.05rem] right-1/2 text-cyan-300">↓</span>

          {/* descending feedback pulse */}
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]"
            initial={{ top: "8%", opacity: 0 }}
            animate={{ top: ["8%", "88%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
        {(Object.keys(stageMeta) as Stage[]).map((s) => (
          <span key={s} className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${stageMeta[s].dot}`} />
            {stageMeta[s].label}
          </span>
        ))}
      </div>
    </div>
  );
}
