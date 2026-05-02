"use client";

import { useState } from "react";

const steps = [
  {
    id: "capture",
    title: "Capture",
    desc: "Collect biological & environmental data",
  },
  {
    id: "decide",
    title: "Decide",
    desc: "Analyze signals & compute risk",
  },
  {
    id: "act",
    title: "Act",
    desc: "Trigger automated interventions",
  },
  {
    id: "learn",
    title: "Learn",
    desc: "Update models from outcomes",
  },
];

export default function ControlLoop() {
  const [active, setActive] = useState("decide");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12 px-6">
        <h2 className="text-4xl font-semibold mb-4">
          AquaOS Control Loop
        </h2>
        <p className="text-gray-600">
          From biological signals to automated decisions and controlled outcomes
        </p>
      </div>

      <div className="relative flex items-center justify-center h-[500px]">

        {/* CENTER CORE */}
        <div className="absolute w-40 h-40 rounded-full flex items-center justify-center
          bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl animate-pulse">
          <div className="text-center">
            <p className="text-xs opacity-80">CORE</p>
            <p className="font-semibold">AquaOS</p>
          </div>
        </div>

        {/* TOP */}
        <div
          onClick={() => setActive("capture")}
          className={`absolute top-0 cursor-pointer transition ${
            active === "capture" ? "scale-105" : ""
          }`}
        >
          <StepCard title="Capture" desc="Sense data" active={active==="capture"} />
        </div>

        {/* RIGHT */}
        <div
          onClick={() => setActive("decide")}
          className={`absolute right-0 cursor-pointer transition ${
            active === "decide" ? "scale-105" : ""
          }`}
        >
          <StepCard title="Decide" desc="Compute risk" active={active==="decide"} />
        </div>

        {/* BOTTOM */}
        <div
          onClick={() => setActive("act")}
          className={`absolute bottom-0 cursor-pointer transition ${
            active === "act" ? "scale-105" : ""
          }`}
        >
          <StepCard title="Act" desc="Execute control" active={active==="act"} />
        </div>

        {/* LEFT */}
        <div
          onClick={() => setActive("learn")}
          className={`absolute left-0 cursor-pointer transition ${
            active === "learn" ? "scale-105" : ""
          }`}
        >
          <StepCard title="Learn" desc="Improve system" active={active==="learn"} />
        </div>

        {/* SIMPLE FLOW INDICATORS */}
        <div className="absolute top-20 text-gray-400 text-xl">↓</div>
        <div className="absolute right-24 text-gray-400 text-xl">→</div>
        <div className="absolute bottom-20 text-gray-400 text-xl">↑</div>
        <div className="absolute left-24 text-gray-400 text-xl">←</div>

      </div>

      {/* DETAIL PANEL */}
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="border rounded-xl p-6 shadow-sm">
          {active === "capture" && (
            <Detail
              title="Capture (Sense)"
              text="Collect real-time biological and environmental data including DO, pH, ammonia, feeding activity and molt signals."
            />
          )}
          {active === "decide" && (
            <Detail
              title="Decide (Think)"
              text="Analyze signal patterns and compute risk using rule engines and biological models."
            />
          )}
          {active === "act" && (
            <Detail
              title="Act (Execute)"
              text="Trigger feeding adjustments, aeration, flushing and isolation to stabilize the system."
            />
          )}
          {active === "learn" && (
            <Detail
              title="Learn (Feedback)"
              text="Continuously improve models based on survival, growth and cycle performance."
            />
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          This is not monitoring. This is a closed-loop biological control system.
        </p>
      </div>
    </section>
  );
}

function StepCard({ title, desc, active }: any) {
  return (
    <div
      className={`w-48 p-4 rounded-xl border text-center ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Detail({ title, text }: any) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </>
  );
}