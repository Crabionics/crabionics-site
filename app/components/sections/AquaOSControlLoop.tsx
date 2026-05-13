"use client";

import { useMemo, useState } from "react";

type Step = {
  id: string;
  title: string;
  desc: string;
  shortDesc: string;
  detailTitle: string;
  detailText: string;
  index: number;
};

const steps: Step[] = [
  {
    id: "capture",
    title: "Capture",
    desc: "Collect biological & environmental data",
    shortDesc: "Sense data",
    detailTitle: "Capture (Sense)",
    detailText:
      "Collect real-time biological and environmental data including DO, pH, ammonia, feeding activity and molt signals.",
    index: 1,
  },
  {
    id: "decide",
    title: "Decide",
    desc: "Analyze signals & compute risk",
    shortDesc: "Compute risk",
    detailTitle: "Decide (Think)",
    detailText:
      "Analyze signal patterns and compute risk using rule engines and biological models.",
    index: 2,
  },
  {
    id: "act",
    title: "Act",
    desc: "Trigger automated interventions",
    shortDesc: "Execute control",
    detailTitle: "Act (Execute)",
    detailText:
      "Trigger feeding adjustments, aeration, flushing and isolation to stabilize the system.",
    index: 3,
  },
  {
    id: "learn",
    title: "Learn",
    desc: "Update models from outcomes",
    shortDesc: "Improve system",
    detailTitle: "Learn (Feedback)",
    detailText:
      "Continuously improve models based on survival, growth and cycle performance.",
    index: 4,
  },
];

const orderedIds = [...steps.map((step) => step.id), "capture"];

export default function ControlLoop() {
  const [active, setActive] = useState("decide");
  const activeEdgeIndex = useMemo(
    () => steps.findIndex((step) => step.id === active),
    [active],
  );
  const activeDetail = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-4xl font-semibold">AquaOS Control Loop</h2>
        <p className="text-gray-600">
          From biological signals to automated decisions and controlled outcomes
        </p>
      </div>

      {/* Mobile / Tablet explicit sequence layout */}
      <div className="mx-auto mb-10 max-w-3xl px-6 lg:hidden">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className="group w-full text-left"
            >
              <div className="flex items-start gap-4 pb-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold tracking-wider ${
                      active === step.id
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {String(step.index).padStart(2, "0")}
                  </span>
                  {index < steps.length - 1 && (
                    <span
                      className={`mt-2 h-10 w-px ${
                        activeEdgeIndex === index ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`flex-1 rounded-xl border p-4 transition ${
                    active === step.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                    {step.index}/4
                  </p>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.shortDesc}</p>
                </div>
              </div>
            </button>
          ))}
          <p className="pl-14 text-xs text-gray-400">Loops back to Capture</p>
        </div>
      </div>

      {/* Desktop cycle layout */}
      <div className="relative mx-auto hidden h-[540px] max-w-5xl items-center justify-center lg:flex">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 540"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="500" cy="270" r="150" className="fill-none stroke-gray-200" strokeWidth="24" />
          <circle cx="500" cy="270" r="150" className="fill-none stroke-blue-100" strokeWidth="8" />

          {[
            "M 500 90 Q 720 90 760 270",
            "M 760 270 Q 760 450 500 450",
            "M 500 450 Q 240 450 240 270",
            "M 240 270 Q 240 90 500 90",
          ].map((d, index) => (
            <path
              key={d}
              d={d}
              className={activeEdgeIndex === index ? "animate-pulse" : ""}
              fill="none"
              stroke={activeEdgeIndex === index ? "#2563eb" : "#d1d5db"}
              strokeWidth={activeEdgeIndex === index ? 5 : 3}
              strokeLinecap="round"
              strokeDasharray={activeEdgeIndex === index ? "8 8" : "0"}
            />
          ))}
        </svg>

        <div className="absolute flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
          <div className="text-center">
            <p className="text-xs opacity-80">CORE</p>
            <p className="font-semibold">AquaOS</p>
          </div>
        </div>

        <div className="absolute top-6">
          <StepNode step={steps[0]} active={active === steps[0].id} onClick={() => setActive(steps[0].id)} />
        </div>
        <div className="absolute right-0">
          <StepNode step={steps[1]} active={active === steps[1].id} onClick={() => setActive(steps[1].id)} />
        </div>
        <div className="absolute bottom-6">
          <StepNode step={steps[2]} active={active === steps[2].id} onClick={() => setActive(steps[2].id)} />
        </div>
        <div className="absolute left-0">
          <StepNode step={steps[3]} active={active === steps[3].id} onClick={() => setActive(steps[3].id)} />
        </div>

        <div className="absolute bottom-0 text-xs font-medium tracking-[0.2em] text-gray-400">
          {orderedIds.join(" → ").toUpperCase()}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-6">
        <div className="rounded-xl border p-6 shadow-sm">
          <Detail title={activeDetail.detailTitle} text={activeDetail.detailText} />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          This is not monitoring. This is a closed-loop biological control system.
        </p>
      </div>
    </section>
  );
}

function StepNode({ step, active, onClick }: { step: Step; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`cursor-pointer transition ${active ? "scale-105" : ""}`}>
      <StepCard title={step.title} desc={step.shortDesc} index={step.index} active={active} />
    </button>
  );
}

function StepCard({ title, desc, index, active }: { title: string; desc: string; index: number; active: boolean }) {
  return (
    <div
      className={`w-52 rounded-xl border p-4 text-center ${
        active ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      <p className={`text-xs font-semibold tracking-[0.2em] ${active ? "text-blue-700" : "text-gray-400"}`}>
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </>
  );
}
