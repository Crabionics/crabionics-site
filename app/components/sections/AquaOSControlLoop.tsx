"use client";

import { useState } from "react";

const steps = [
  {
    id: "capture",
    title: "Capture",
    short: "Sense telemetry",
    detailTitle: "Capture · Sense",
    detailText:
      "Collect real-time biological and environmental telemetry, including dissolved oxygen, pH, ammonia, feeding activity, and molt signals.",
    x: "top-0 left-1/2 -translate-x-1/2",
    arrow: "top-20 left-1/2 -translate-x-1/2",
    arrowGlyph: "↓",
  },
  {
    id: "decide",
    title: "Decide",
    short: "Compute risk",
    detailTitle: "Decide · Compute",
    detailText:
      "Analyze signal patterns and estimate risk with rules, biological models, and operational thresholds before interventions are dispatched.",
    x: "right-0 top-1/2 -translate-y-1/2",
    arrow: "right-24 top-1/2 -translate-y-1/2",
    arrowGlyph: "→",
  },
  {
    id: "act",
    title: "Act",
    short: "Execute control",
    detailTitle: "Act · Execute",
    detailText:
      "Trigger feeding adjustments, aeration, flushing, and isolation actions to maintain stable biological and infrastructure conditions.",
    x: "bottom-0 left-1/2 -translate-x-1/2",
    arrow: "bottom-20 left-1/2 -translate-x-1/2",
    arrowGlyph: "↑",
  },
  {
    id: "learn",
    title: "Learn",
    short: "Improve models",
    detailTitle: "Learn · Feedback",
    detailText:
      "Continuously improve prediction and intervention logic from outcomes such as survival, growth, stress events, and cycle performance.",
    x: "left-0 top-1/2 -translate-y-1/2",
    arrow: "left-24 top-1/2 -translate-y-1/2",
    arrowGlyph: "←",
  },
] as const;

export default function ControlLoop() {
  const [active, setActive] = useState<(typeof steps)[number]["id"]>("decide");
  const activeStep = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl lg:p-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-400/10 via-transparent to-teal-400/10" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Closed-loop Engine</p>
        <h3 className="mt-5">AquaOS Control Loop</h3>
        <p className="mt-4 text-slate-300">
          Biological signals are transformed into infrastructure decisions, then fed back into the system for
          continuous operational learning.
        </p>
      </div>

      <div className="relative mx-auto mt-14 flex h-[520px] max-w-5xl items-center justify-center">
        <div className="absolute inset-0 rounded-[36px] border border-cyan-300/10 bg-gradient-to-b from-cyan-400/5 to-transparent" />

        <div className="absolute flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/15 text-center text-white shadow-[0_0_40px_rgba(56,189,248,0.25)]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">Core</p>
            <p className="mt-2 text-lg font-semibold">AquaOS</p>
          </div>
        </div>

        {steps.map((step) => (
          <div key={step.id} className={`absolute ${step.x}`}>
            <StepCard
              title={step.title}
              desc={step.short}
              active={active === step.id}
              onSelect={() => setActive(step.id)}
            />
          </div>
        ))}

        {steps.map((step) => (
          <span
            key={`${step.id}-arrow`}
            aria-hidden="true"
            className={`absolute ${step.arrow} text-lg text-cyan-100/55`}
          >
            {step.arrowGlyph}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Active loop stage</p>
          <h4 className="mt-4 text-xl font-semibold text-white">{activeStep.detailTitle}</h4>
          <p className="mt-4 text-slate-300">{activeStep.detailText}</p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          This is not monitoring. This is closed-loop biological control.
        </p>
      </div>
    </section>
  );
}

type StepCardProps = {
  title: string;
  desc: string;
  active: boolean;
  onSelect: () => void;
};

function StepCard({ title, desc, active, onSelect }: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-52 rounded-2xl border p-4 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        active
          ? "border-cyan-300/45 bg-cyan-400/15 shadow-[0_0_22px_rgba(34,211,238,0.2)]"
          : "border-white/15 bg-white/[0.03] hover:border-cyan-200/40 hover:bg-cyan-400/10"
      }`}
      aria-pressed={active}
    >
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </button>
  );
}
