import SectionWrapper from "../ui/SectionWrapper";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";

const flowSteps = [
  "Sensor Input",
  "State Detection",
  "Risk Engine",
  "Decision Layer",
  "Automated Action",
  "Causality Logging",
  "Continuous Optimization",
];

export default function ClosedLoopSection() {
  return (
    <SectionWrapper>

      <SectionHeading
        eyebrow="Closed-loop Control"
        title="Biological Intelligence Through Continuous Feedback Systems"
        subtitle="Crabionics transforms aquaculture from reactive farming into a controllable operational system using sensor telemetry, biological state detection, and automated infrastructure response."
        align="center"
      />

      {/* FLOW */}
      <div className="mt-24">

        <div className="grid gap-6 lg:grid-cols-7">

          {flowSteps.map((step, index) => (
            <GlassCard
              key={step}
              className="relative p-6 text-center"
            >

              {/* STEP NUMBER */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                {index + 1}
              </div>

              {/* TITLE */}
              <p className="mt-6 text-sm font-medium text-white">
                {step}
              </p>

              {/* CONNECTOR */}
              {index !== flowSteps.length - 1 && (
                <div className="absolute right-[-18px] top-1/2 hidden h-[2px] w-9 -translate-y-1/2 bg-cyan-400/20 lg:block" />
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* LOWER GRID */}
      <div className="mt-20 grid gap-8 lg:grid-cols-2">

        {/* LEFT */}
        <GlassCard className="p-10">

          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
            Biological State Engine
          </p>

          <h3 className="mt-5">
            Predictive Operational Awareness
          </h3>

          <p className="mt-6">
            Crabionics continuously interprets environmental,
            biological, and operational telemetry to detect
            instability before visible production failure occurs.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {[
              "Molting inference",
              "Behavioral risk detection",
              "Water quality velocity",
              "Environmental anomaly detection",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-sm text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* RIGHT */}
        <GlassCard className="relative overflow-hidden p-10">

          {/* BACKGROUND GLOW */}
          <div className="absolute right-[-20%] top-[-20%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">

            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
              Infrastructure Response Layer
            </p>

            <h3 className="mt-5">
              Automated Closed-loop Actions
            </h3>

            <p className="mt-6">
              Infrastructure nodes respond dynamically to detected
              biological conditions through circulation control,
              flushing systems, aeration logic, and operator alerts.
            </p>

            {/* SYSTEM STATES */}
            <div className="mt-10 space-y-5">

              {[
                {
                  label: "Environmental Stability",
                  value: "94%",
                },
                {
                  label: "Telemetry Confidence",
                  value: "87%",
                },
                {
                  label: "Operational Synchronization",
                  value: "91%",
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

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-teal-300"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

    </SectionWrapper>
  );
}