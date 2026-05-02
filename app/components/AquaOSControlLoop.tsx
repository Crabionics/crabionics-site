"use client";

import { useMemo, useState } from "react";

type Step = {
  id: string;
  name: string;
  label: string;
  title: string;
  description: string;
  details: string[];
};

const steps: Step[] = [
  {
    id: "capture",
    name: "Capture",
    label: "Sense",
    title: "Capture (Sense)",
    description: "Collect real-time biological and environmental data",
    details: ["Crab ID", "Molt stage", "DO", "pH", "Ammonia"],
  },
  {
    id: "decide",
    name: "Decide",
    label: "Think",
    title: "Decide (Think)",
    description: "Analyze signals and compute risk",
    details: ["Uses production rules", "Uses scoring and predictive models"],
  },
  {
    id: "act",
    name: "Act",
    label: "Execute",
    title: "Act (Execute)",
    description: "Trigger automated interventions",
    details: ["Feeding", "Aeration", "Isolation"],
  },
  {
    id: "learn",
    name: "Learn",
    label: "Feedback",
    title: "Learn (Feedback)",
    description: "Update models based on outcomes",
    details: ["Improves thresholds", "Improves future decisions"],
  },
];

export default function AquaOSControlLoop() {
  const [activeId, setActiveId] = useState<string>(steps[0].id);

  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeId) ?? steps[0],
    [activeId],
  );

  return (
    <section className="py-16 md:py-20 px-6 border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          AquaOS Control Loop
        </h2>
        <p className="mt-4 text-neutral-700 max-w-3xl leading-relaxed">
          A closed-loop operating cycle connecting sensing, decision support,
          intervention, and learning around the AquaOS Core.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-4">
            {steps.map((step) => {
              const isActive = step.id === activeId;

              return (
                <button
                  key={step.id}
                  type="button"
                  onMouseEnter={() => setActiveId(step.id)}
                  onFocus={() => setActiveId(step.id)}
                  onClick={() => setActiveId(step.id)}
                  className={`group rounded-xl border p-5 text-left transition-all duration-300 ease-out ${
                    isActive
                      ? "border-cyan-500 bg-cyan-50 shadow-sm"
                      : "border-neutral-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/40"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                    Step
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="md:justify-self-center">
            <div className="mx-auto h-44 w-44 rounded-full border-4 border-cyan-200 bg-cyan-100 text-cyan-900 flex items-center justify-center text-center p-6 shadow-sm transition-all duration-500">
              <span className="text-lg font-semibold leading-tight">AquaOS Core</span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
            Active Step
          </p>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">
            {activeStep.title}
          </h3>
          <p className="mt-3 text-neutral-700">{activeStep.description}</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
            {activeStep.details.map((item) => (
              <li key={item} className="rounded-md border border-neutral-200 bg-white px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
