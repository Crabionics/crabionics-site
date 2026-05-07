import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const nodes = [
  "Sensor Telemetry",
  "Biological State Detection",
  "Risk Engine",
  "Infrastructure Response",
  "Automation Layer",
  "Operational Logging",
  "Predictive Optimization",
];

export default function ClosedLoopSection() {
  return (
    <SectionWrapper className="overflow-hidden">
      <SectionHeading
        eyebrow="Closed-loop Biological Feedback Engine"
        title="AquaOS Core with Continuous Telemetry Intelligence"
        subtitle="Operational telemetry, biological inference, and infrastructure response form a single circular control architecture."
        align="center"
      />

      <div className="relative mx-auto mt-16 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-12">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)]" />

        <div className="relative z-10 grid gap-4 md:grid-cols-3">
          {nodes.slice(0, 3).map((n) => (
            <div key={n} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-200">{n}</div>
          ))}
          <div className="md:col-span-3 flex justify-center py-3">
            <div className="rounded-full border border-cyan-300/30 bg-cyan-400/15 px-8 py-6 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">Intelligence Core</p>
              <p className="mt-2 text-xl font-semibold text-white">AquaOS Core</p>
            </div>
          </div>
          {nodes.slice(3).map((n) => (
            <div key={n} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-200">{n}</div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
