import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const infrastructure = [
  {
    title: "Modular Isolation",
    description:
      "Individual housing architecture minimizes cannibalism and improves biological control.",
  },

  {
    title: "Closed-loop RAS",
    description:
      "Recirculating water infrastructure designed for stability, reuse efficiency, and operational predictability.",
  },

  {
    title: "Edge Telemetry",
    description:
      "Distributed sensor nodes continuously monitor biological and environmental conditions.",
  },

  {
    title: "Automated Flushing",
    description:
      "Dynamic flushing systems maintain environmental consistency and reduce operational risk.",
  },

  {
    title: "Oxygen Infrastructure",
    description:
      "Integrated aeration and oxygen management systems stabilize production conditions.",
  },

  {
    title: "Scalable Deployment",
    description:
      "Modular production architecture enables distributed scaling across coastal clusters.",
  },
];

export default function InfrastructureSection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <SectionHeading
        eyebrow="Infrastructure"
        title="Built for Isolation, Stability, and Industrial Scale"
        subtitle="Crabionics combines modular RAS engineering, biological isolation systems, telemetry infrastructure, and operational automation into a scalable production architecture."
        align="center"
      />

      {/* MAIN GRID */}
      <div className="mt-24 grid gap-8 lg:grid-cols-[1.2fr_1fr]">

        {/* LEFT VISUAL */}
        <GlassCard className="relative overflow-hidden p-8 lg:p-10">

          {/* GLOW */}
          <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">

            {/* TITLE */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">

              <div>

                <p className="text-lg font-semibold text-white">
                  Modular RAS Architecture
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Precision biological production infrastructure
                </p>
              </div>

              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200">
                Active System
              </div>
            </div>

            {/* INFRA GRID */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {[
                "Isolation Boxes",
                "Biofiltration",
                "Telemetry Nodes",
                "Water Recirculation",
                "Aeration Layer",
                "Edge Controllers",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >

                  <div className="flex items-center justify-between">

                    <p className="text-sm font-medium text-white">
                      {item}
                    </p>

                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 to-teal-300" />
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    Infrastructure synchronized
                  </p>
                </div>
              ))}
            </div>

            {/* LOWER STATUS */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <div className="grid gap-6 sm:grid-cols-3">

                {[
                  {
                    label: "Water Reuse",
                    value: "90%",
                  },
                  {
                    label: "System Stability",
                    value: "96%",
                  },
                  {
                    label: "Operational Sync",
                    value: "91%",
                  },
                ].map((item) => (
                  <div key={item.label}>

                    <p className="text-3xl font-semibold text-white">
                      {item.value}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* RIGHT FEATURES */}
        <div className="grid gap-6">

          {infrastructure.map((item) => (
            <GlassCard
              key={item.title}
              className="p-7"
            >

              <div className="flex items-start gap-4">

                <div className="mt-1 h-3 w-3 rounded-full bg-cyan-300" />

                <div>

                  <h3 className="text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}