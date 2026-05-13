"use client";

import { useState } from "react";

type StepId = "capture" | "decide" | "act" | "learn";

type Step = {
  id: StepId;
  title: string;
  desc: string;
  short: string;
  detailTitle: string;
  detailText: string;
};

const steps: Step[] = [
  {
    id: "capture",
    title: "Capture",
    desc: "Collect biological & environmental data",
    short: "Sense data",
    detailTitle: "Capture (Sense)",
    detailText:
      "Collect real-time biological and environmental data including DO, pH, ammonia, feeding activity and molt signals.",
  },
  {
    id: "decide",
    title: "Decide",
    desc: "Analyze signals & compute risk",
    short: "Compute risk",
    detailTitle: "Decide (Think)",
    detailText:
      "Analyze signal patterns and compute risk using rule engines and biological models.",
  },
  {
    id: "act",
    title: "Act",
    desc: "Trigger automated interventions",
    short: "Execute control",
    detailTitle: "Act (Execute)",
    detailText:
      "Trigger feeding adjustments, aeration, flushing and isolation to stabilize the system.",
  },
  {
    id: "learn",
    title: "Learn",
    desc: "Update models from outcomes",
    short: "Improve system",
    detailTitle: "Learn (Feedback)",
    detailText:
      "Continuously improve models based on survival, growth and cycle performance.",
  },
];

const STEP_POSITIONS: Record<StepId, string> = {
  capture: "md:col-start-2 md:row-start-1",
  decide: "md:col-start-3 md:row-start-2",
  act: "md:col-start-2 md:row-start-3",
  learn: "md:col-start-1 md:row-start-2",
};

export default function ControlLoop() {
  const [active, setActive] = useState<StepId>("decide");
  const activeStep = steps.find((step) => step.id === active) ?? steps[1];
  const detailRegionId = "aquaos-control-loop-detail";

  return (
    <section className="bg-white py-24">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-4xl font-semibold">AquaOS Control Loop</h2>
        <p className="text-gray-600">
          From biological signals to automated decisions and controlled outcomes
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 md:gap-6">
        <div className="order-1 flex justify-center sm:col-span-2 md:order-none md:col-start-2 md:row-start-2">
          <div className="flex h-40 w-40 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
            <div className="text-center">
              <p className="text-xs opacity-80">CORE</p>
              <p className="font-semibold">AquaOS</p>
            </div>
          </div>
        </div>

        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(step.id)}
            aria-pressed={active === step.id}
            aria-controls={detailRegionId}
            className={`flex justify-center transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
              STEP_POSITIONS[step.id]
            } ${active === step.id ? "scale-[1.02]" : ""}`}
          >
            <StepCard title={step.title} desc={step.short} active={active === step.id} />
          </button>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-6">
        <div id={detailRegionId} role="region" aria-live="polite" className="rounded-xl border p-6 shadow-sm">
          <Detail title={activeStep.detailTitle} text={activeStep.detailText} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          This is not monitoring. This is a closed-loop biological control system.
        </p>
      </div>
    </section>
  );
}

type StepCardProps = {
  title: string;
  desc: string;
  active: boolean;
};

function StepCard({ title, desc, active }: StepCardProps) {
  return (
    <div
      className={`w-full max-w-48 rounded-xl border p-4 text-center ${
        active ? "border-blue-600 bg-blue-50" : "border-gray-200"
      }`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

type DetailProps = {
  title: string;
  text: string;
};

function Detail({ title, text }: DetailProps) {
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </>
  );
}
