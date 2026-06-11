"use client";

import { motion } from "framer-motion";
import { useState, type ComponentType } from "react";

import {
  IconDrop,
  IconGear,
  IconNetwork,
  IconTarget,
} from "@/app/components/ui/Icons";

type Accent = "slate" | "violet" | "cyan" | "emerald";

type Layer = {
  id: string;
  name: string;
  sub: string;
  stage: string;
  accent: Accent;
  icon: ComponentType<{ className?: string }>;
  items: string[];
  flow?: boolean; // render items as a left-to-right production flow
  footer: string;
};

// Ordered top-to-bottom. Data flows UP (Physical → Market);
// control & feedback flow DOWN the right rail (the closed loop).
const layers: Layer[] = [
  {
    id: "market",
    name: "Market & Impact Layer",
    sub: "From biology to market outcomes",
    stage: "Outcome",
    accent: "slate",
    icon: IconTarget,
    items: ["Processors", "Global Markets", "Premium Pricing", "Mangroves & Carbon"],
    footer: "Economic value · Export continuity · Climate positive",
  },
  {
    id: "cin",
    name: "Intelligence Layer (CIN)",
    sub: "Intelligence network — in development",
    stage: "In development",
    accent: "violet",
    icon: IconNetwork,
    items: ["Data Fusion", "Pattern Learning", "Predictive Models", "Adaptive Decisions"],
    footer: "Designed to turn data into biological intelligence",
  },
  {
    id: "aquaos",
    name: "Control Layer (AquaOS)",
    sub: "Control architecture — being built",
    stage: "Building",
    accent: "cyan",
    icon: IconGear,
    items: ["Monitoring", "Automation", "Optimization", "Alerts & Insights"],
    footer: "Orchestrating systems · Ensuring stability · Improving outcomes",
  },
  {
    id: "physical",
    name: "Physical Infrastructure Layer",
    sub: "Modular RAS infrastructure",
    stage: "Proven in R&D",
    accent: "emerald",
    icon: IconDrop,
    items: [
      "Hatchery — Crablet input",
      "Nursery — Early rearing",
      "Grow-out — Production",
      "Soft-shell — Finishing",
    ],
    flow: true,
    footer: "RAS Modules · Water Treatment · Life Support · Power & Utilities",
  },
];

const accentMap: Record<
  Accent,
  { panel: string; iconWrap: string; chip: string; stage: string; dot: string }
> = {
  slate: {
    panel: "border-slate-300/15",
    iconWrap: "border-slate-300/25 bg-slate-300/10 text-slate-200",
    chip: "border-slate-300/20 text-slate-200",
    stage: "border-slate-300/25 bg-slate-300/10 text-slate-300",
    dot: "bg-slate-300",
  },
  violet: {
    panel: "border-violet-400/25",
    iconWrap: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    chip: "border-violet-400/25 text-violet-100",
    stage: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    dot: "bg-violet-300",
  },
  cyan: {
    panel: "border-cyan-400/25",
    iconWrap: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    chip: "border-cyan-400/25 text-cyan-100",
    stage: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    dot: "bg-cyan-300",
  },
  emerald: {
    panel: "border-emerald-400/25",
    iconWrap: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    chip: "border-emerald-400/25 text-emerald-100",
    stage: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    dot: "bg-emerald-300",
  },
};

export default function HomeArchitectureMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative mx-auto max-w-5xl">

      {/* Flow direction labels */}
      <div className="mb-5 flex items-center justify-between px-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="text-cyan-300">↑</span> Data flow
        </span>
        <span className="inline-flex items-center gap-2">
          Control &amp; feedback <span className="text-cyan-300">↓</span>
        </span>
      </div>

      <div className="relative grid grid-cols-[auto_1fr_auto] gap-x-3 sm:gap-x-4">

        {/* LEFT RAIL — data flows up */}
        <div className="relative hidden w-8 sm:block">
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-emerald-400/40 via-cyan-400/40 to-slate-300/30" />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]"
              initial={{ top: "94%", opacity: 0 }}
              animate={{ top: ["94%", "4%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, delay: i * 1.1, ease: "linear" }}
            />
          ))}
        </div>

        {/* LAYER PANELS */}
        <div className="space-y-4">
          {layers.map((layer) => {
            const a = accentMap[layer.accent];
            const Icon = layer.icon;
            const isActive = active === layer.id;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActive(layer.id)}
                onMouseLeave={() => setActive(null)}
                className={`glass-card rounded-2xl border p-5 transition-all duration-200 lg:p-6 ${a.panel} ${
                  isActive ? "-translate-y-0.5" : ""
                }`}
              >
                {/* header */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${a.iconWrap}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      {layer.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{layer.sub}</p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${a.stage}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                    {layer.stage}
                  </span>
                </div>

                {/* items */}
                {layer.flow ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {layer.items.map((item, i) => (
                      <span key={item} className="flex items-center gap-2">
                        <span
                          className={`rounded-lg border bg-white/[0.03] px-3 py-1.5 text-xs ${a.chip}`}
                        >
                          {item}
                        </span>
                        {i < layer.items.length - 1 && (
                          <span className="text-slate-500" aria-hidden>
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className={`rounded-lg border bg-white/[0.03] px-3 py-1.5 text-xs ${a.chip}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-400">{layer.footer}</p>
              </div>
            );
          })}
        </div>

        {/* RIGHT RAIL — control & feedback flows down */}
        <div className="relative hidden w-8 sm:block">
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-cyan-400/30" />
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)]"
            initial={{ top: "4%", opacity: 0 }}
            animate={{ top: ["4%", "94%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-cyan-300/70" /> Data flow
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-6 border-t border-dashed border-cyan-300/70" /> Control signals
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-6 border-t border-dotted border-cyan-300/70" /> System feedback
        </span>
      </div>
    </div>
  );
}
