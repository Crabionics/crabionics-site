import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const telemetry = [
  {
    label: "Water Stability",
    value: "92%",
  },
  {
    label: "Biological Synchronization",
    value: "88%",
  },
  {
    label: "Telemetry Confidence",
    value: "94%",
  },
  {
    label: "Infrastructure Health",
    value: "97%",
  },
];

const features = [
  "Real-time telemetry",
  "Risk scoring engine",
  "Biological state detection",
  "Operator action logging",
  "Automated alerts",
  "Digital twin workflows",
];

export default function AquaOSSection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <SectionHeading
        eyebrow="AquaOS"
        title="Operational Intelligence for Precision Aquaculture"
        subtitle="AquaOS functions as the biological operating system coordinating telemetry, infrastructure automation, operational response, and predictive production workflows."
        align="center"
      />

      <div className="mt-24 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">

        {/* LEFT CONTENT */}
        <div>

          <GlassCard className="p-8 lg:p-10">

            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
              Control Infrastructure
            </p>

            <h3 className="mt-5">
              Infrastructure-aware Biological Operations
            </h3>

            <p className="mt-6">
              AquaOS aggregates environmental telemetry,
              biological conditions, and operational workflows
              into a unified decision and orchestration layer.
            </p>

            {/* FEATURE LIST */}
            <div className="mt-10 grid gap-4">

              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >

                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300" />

                  <p className="text-sm text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="relative">

          {/* GLOW */}
          <div className="absolute inset-0 rounded-[40px] bg-cyan-400/10 blur-3xl" />

          <GlassCard className="relative overflow-hidden p-6 lg:p-8">

            {/* HEADER */}
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-lg font-semibold text-white">
                  AquaOS Live Dashboard
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Closed-loop biological infrastructure monitoring
                </p>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-emerald-300">
                  System Operational
                </span>
              </div>
            </div>

            {/* METRIC GRID */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">

              {telemetry.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >

                  <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-300">
                      {item.label}
                    </p>

                    <p className="text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-teal-300"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* LOWER PANELS */}
            <div className="mt-8 grid gap-5 lg:grid-cols-2">

              {/* LEFT */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <p className="text-sm uppercase tracking-[0.16em] text-cyan-200">
                  Active Infrastructure
                </p>

                <div className="mt-6 space-y-4">

                  {[
                    "RAS Cluster 01",
                    "Edge Telemetry Node",
                    "Oxygen Regulation",
                    "Nursery Monitoring",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >

                      <p className="text-sm text-slate-300">
                        {item}
                      </p>

                      <div className="flex items-center gap-2">

                        <span className="h-2 w-2 rounded-full bg-emerald-400" />

                        <span className="text-xs text-emerald-300">
                          Live
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                <p className="text-sm uppercase tracking-[0.16em] text-cyan-200">
                  Biological Signals
                </p>

                <div className="mt-6 space-y-5">

                  {[
                    {
                      label: "Molting probability",
                      value: "67%",
                    },
                    {
                      label: "Stress anomaly",
                      value: "Low",
                    },
                    {
                      label: "Behavioral stability",
                      value: "Stable",
                    },
                  ].map((item) => (
                    <div key={item.label}>

                      <div className="flex items-center justify-between">

                        <p className="text-sm text-slate-300">
                          {item.label}
                        </p>

                        <p className="text-sm font-medium text-white">
                          {item.value}
                        </p>
                      </div>

                      <div className="mt-3 h-2 rounded-full bg-white/5">

                        <div className="h-2 w-2/3 rounded-full bg-cyan-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </GlassCard>
        </div>
      </div>

    </SectionWrapper>
  );
}