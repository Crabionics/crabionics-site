"use client";

import { useState } from "react";

type Step = {
  id: "capture" | "decide" | "act" | "learn";
  title: string;
  desc: string;
  input: string;
  output: string;
  icon: string;
  artifact: string;
  detailTitle: string;
  detailText: string;
};

const steps: Step[] = [
  {
    id: "capture",
    title: "Capture",
    desc: "Sense data",
    input: "Sensor + biological signals",
    output: "Normalized telemetry",
    icon: "📡",
    artifact: "Telemetry stream",
    detailTitle: "Capture (Sense)",
    detailText:
      "Collect real-time biological and environmental data including DO, pH, ammonia, feeding activity and molt signals.",
  },
  {
    id: "decide",
    title: "Decide",
    desc: "Compute risk",
    input: "Normalized telemetry",
    output: "Risk score + control plan",
    icon: "🧠",
    artifact: "Control plan",
    detailTitle: "Decide (Think)",
    detailText:
      "Analyze signal patterns and compute risk using rule engines and biological models.",
  },
  {
    id: "act",
    title: "Act",
    desc: "Execute control",
    input: "Control plan",
    output: "Automated adjustments",
    icon: "⚙️",
    artifact: "Intervention events",
    detailTitle: "Act (Execute)",
    detailText:
      "Trigger feeding adjustments, aeration, flushing and isolation to stabilize the system.",
  },
  {
    id: "learn",
    title: "Learn",
    desc: "Improve system",
    input: "Outcome + intervention events",
    output: "Updated model weights",
    icon: "🔁",
    artifact: "Model update",
    detailTitle: "Learn (Feedback)",
    detailText:
      "Continuously improve models based on survival, growth and cycle performance.",
  },
] as const;


export default function ControlLoop() {
  const [active, setActive] = useState<Step["id"]>("decide");
  const activeStep = steps.find((step) => step.id === active);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12 px-6">
        <h2 className="text-4xl font-semibold mb-4">AquaOS Control Loop</h2>
        <p className="text-gray-600">
          From biological signals to automated decisions and controlled outcomes
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-3 md:hidden">
          {steps.map((step, index) => (
            <div key={step.id}>
              <button
                onClick={() => setActive(step.id)}
                className={`w-full text-left transition ${
                  active === step.id ? "scale-[1.01]" : ""
                }`}
              >
                <StepCard step={step} active={active === step.id} />
              </button>
              {index < steps.length - 1 && (
                <div className="py-1 text-center text-gray-400" aria-hidden>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:items-center">
          <div className="space-y-6">
            <button
              onClick={() => setActive("capture")}
              className={`w-full text-left transition ${
                active === "capture" ? "scale-[1.02]" : ""
              }`}
            >
              <StepCard step={steps[0]} active={active === "capture"} />
            </button>
            <button
              onClick={() => setActive("learn")}
              className={`w-full text-left transition ${
                active === "learn" ? "scale-[1.02]" : ""
              }`}
            >
              <StepCard step={steps[3]} active={active === "learn"} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3" aria-hidden>
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center
              bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl animate-pulse"
            >
              <div className="text-center">
                <p className="text-xs opacity-80">CORE</p>
                <p className="font-semibold">AquaOS</p>
              </div>
            </div>
            <div className="text-gray-400 text-xl">↻</div>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => setActive("decide")}
              className={`w-full text-left transition ${
                active === "decide" ? "scale-[1.02]" : ""
              }`}
            >
              <StepCard step={steps[1]} active={active === "decide"} />
            </button>
            <button
              onClick={() => setActive("act")}
              className={`w-full text-left transition ${
                active === "act" ? "scale-[1.02]" : ""
              }`}
            >
              <StepCard step={steps[2]} active={active === "act"} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className={`text-left border rounded-lg p-3 transition ${
                active === step.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-sm font-semibold text-gray-900">
                <span className="mr-1" aria-hidden>
                  {step.icon}
                </span>
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">Artifact: {step.artifact}</p>
            </button>
          ))}
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="border rounded-xl p-6 shadow-sm">
          {activeStep && <Detail title={activeStep.detailTitle} text={activeStep.detailText} />}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          This is not monitoring. This is closed-loop biological control.
        </p>
      </div>
    </section>
  );
}

function StepCard({ step, active }: { step: Step; active: boolean }) {
  return (
    <div
      className={`w-full md:max-w-64 p-4 rounded-xl border text-left ${
        active ? "border-blue-600 bg-blue-50" : "border-gray-200"
      }`}
      aria-pressed={active}
    >
      <h3 className="font-semibold flex items-center gap-2">
        <span aria-hidden>{step.icon}</span>
        {step.title}
      </h3>
      <p className="text-sm text-gray-500">{step.desc}</p>
      <p className="text-xs text-gray-600 mt-2">
        <span className="font-medium text-gray-800">Input:</span> {step.input}
      </p>
      <p className="text-xs text-gray-600">
        <span className="font-medium text-gray-800">Output:</span> {step.output}
      </p>
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
