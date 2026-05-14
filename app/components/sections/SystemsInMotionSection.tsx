"use client";

import { useEffect, useMemo, useState } from "react";

const METRIC_TARGETS = [
  { label: "Telemetry streams per pilot site", value: 1280, suffix: "/min" },
  { label: "Closed-loop response coverage",    value: 94,   suffix: "%"   },
  { label: "Per-tank state inference",         value: 92,   suffix: "%"   },
  { label: "Edge-node availability target",    value: 99.5, suffix: "%"   },
];

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));

    const tick = () => {
      frame += 1;
      const p = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);

      if (p < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);

  return value;
}

function MetricCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const live = useCountUp(value);
  const decimals = Number.isInteger(value) ? 0 : 1;

  return (
    <div className="rounded-2xl border border-[#1DA8DD]/15 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-[#0E6F9B]">Pilot target</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25B947]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#1B7E32]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25B947]" />
          designed for
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-900">
        {live.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
        <span className="ml-1 text-base text-slate-600">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

export default function SystemsInMotionSection() {
  const metrics = useMemo(() => METRIC_TARGETS, []);

  return (
    <section className="relative overflow-hidden section-padding section-light systems-motion">
      <div className="pointer-events-none absolute inset-0 motion-grid" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-3xl" />

      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0E6F9B]">Systems in motion</p>
          <h2 className="mt-5">What the stack does when it runs</h2>
          <p className="mt-6 text-lg">
            Sensors capture telemetry, state models infer biological condition, and the system
            acts — continuously. Below: an animated illustration of the loop and the pilot
            targets we&apos;re building toward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyan-900/10 bg-white/80 p-6 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="tank-shell">
              <div className="water-layer" />
              <div className="water-layer water-layer-2" />
              <div className="pulse-dot pulse-a" />
              <div className="pulse-dot pulse-b" />
              <div className="tank-state state-optimal">Optimal oxygenation</div>
              <div className="tank-state state-alert">Load balancing in progress</div>
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} value={metric.value} suffix={metric.suffix} />
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-900/10 bg-white/80 p-6">
          <div className="architecture-track">
            <span>Sensor mesh</span>
            <span>Inference engine</span>
            <span>Control loop</span>
            <span>AquaOS dashboard</span>
            <span>Fleet network graph</span>
            <span>Sensor mesh</span>
            <span>Inference engine</span>
          </div>
        </div>
      </div>
    </section>
  );
}
