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

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-6">

          {flowSteps.map((step, index) => (
            <GlassCard
              key={step}
              className="relative p-5 text-center lg:p-6"
            >

              {/* STEP NUMBER */}
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200 lg:h-12 lg:w-12">
                {index + 1}
              </div>

              {/* TITLE */}
              <p className="mt-5 text-xs font-medium text-white sm:text-sm lg:mt-6">
                {step}
              </p>

              {/* CONNECTOR */}
              {index !== flowSteps.length - 1 && (
                <div className="absolute right-[-13px] top-1/2 hidden h-[2px] w-7 -translate-y-1/2 bg-cyan-400/20 lg:block" />
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

            {/* INFRASTRUCTURE RESPONSE TARGETS */}
            <div className="mt-10 space-y-5">

              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">
                Pilot targets (in development)
              </p>

              {[
                {
                  label: "Environmental Stability",
                  body: "Hold key water parameters inside the target band for the full grow-out cycle.",
                },
                {
                  label: "Telemetry Coverage",
                  body: "Continuous sensor capture across every active grow-out box, with no blind windows.",
                },
                {
                  label: "Operational Response Time",
                  body: "Closed-loop infrastructure response triggered before the biological condition becomes visible.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-medium text-white">
                    {item.label}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

    </SectionWrapper>
  );
}