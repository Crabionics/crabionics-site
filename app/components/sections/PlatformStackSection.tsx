import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const layers = [
  {
    title: "Modular RAS",
    subtitle: "Biological production infrastructure",
    description:
      "Closed-loop water systems, isolation modules, flushing systems, and precision grow-out architecture.",
    status: "live" as const,
  },

  {
    title: "CrabPod Edge",
    subtitle: "Infrastructure edge computing layer",
    description:
      "Sensor integration, telemetry synchronization, and low-latency local infrastructure control.",
    status: "developing" as const,
  },

  {
    title: "AquaOS",
    subtitle: "Operational control and orchestration engine",
    description:
      "Telemetry aggregation, automation logic, predictive workflows, and operator infrastructure.",
    status: "developing" as const,
  },

  {
    title: "HatchSync",
    subtitle: "Hatchery intelligence and seed security layer",
    description:
      "Continuous larval production, biological monitoring, and juvenile stabilization systems.",
    status: "developing" as const,
  },

  {
    title: "CIN",
    subtitle: "Crabionics Intelligence Network",
    description:
      "Cross-farm benchmarking, biological learning systems, and distributed operational intelligence.",
    status: "longterm" as const,
  },
];

const statusBadge = {
  live: {
    label: "Stage 1 · Current",
    classes: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
  developing: {
    label: "Stage 2 · Developing",
    classes: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  },
  longterm: {
    label: "Stage 3 · Long-term",
    classes: "border-white/10 bg-white/[0.04] text-slate-300",
  },
} as const;

export default function PlatformStackSection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <SectionHeading
        eyebrow="Platform Architecture"
        title="The Crabionics Infrastructure Stack"
        subtitle="A vertically integrated production platform combining biological infrastructure, operational intelligence, automation systems, and distributed learning networks."
        align="center"
      />

      {/* STACK */}
      <div className="relative mx-auto mt-24 max-w-5xl">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-cyan-300/10 to-transparent lg:block" />

        <div className="space-y-10">

          {layers.map((layer, index) => (
            <div
              key={layer.title}
              className={`relative grid items-center gap-8 lg:grid-cols-2 ${
                index % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >

              {/* EMPTY SIDE */}
              <div className="hidden lg:block" />

              {/* CARD */}
              <GlassCard className="relative overflow-hidden p-8 lg:p-10">

                {/* GLOW */}
                <div className="absolute right-[-15%] top-[-20%] h-[200px] w-[200px] rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative z-10">

                  {/* LAYER NUMBER */}
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </div>

                  {/* TITLE */}
                  <h3>
                    {layer.title}
                  </h3>

                  {/* SUBTITLE */}
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-cyan-200">
                    {layer.subtitle}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="mt-6">
                    {layer.description}
                  </p>

                  {/* STATUS */}
                  <div className="mt-8 flex flex-wrap gap-3">

                    <div className={`rounded-full border px-4 py-2 text-xs ${statusBadge[layer.status].classes}`}>
                      {statusBadge[layer.status].label}
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
                      Infrastructure Node
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}