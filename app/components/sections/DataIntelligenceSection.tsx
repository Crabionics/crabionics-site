import CINNetworkMap from "../diagrams/CINNetworkMap";
import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const dataLayers = [
  {
    title: "Environmental Data",
    items: [
      "Dissolved oxygen",
      "pH stability",
      "Ammonia velocity",
      "Temperature synchronization",
    ],
  },

  {
    title: "Biological Signals",
    items: [
      "Molting probability",
      "Behavioral anomalies",
      "Growth performance",
      "Stress indicators",
    ],
  },

  {
    title: "Operational Intelligence",
    items: [
      "Intervention history",
      "Operator actions",
      "Infrastructure events",
      "Response timing",
    ],
  },

  {
    title: "Economic Outcomes",
    items: [
      "Yield consistency",
      "Survival optimization",
      "Occupancy utilization",
      "Production forecasting",
    ],
  },
];

export default function DataIntelligenceSection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <SectionHeading
        eyebrow="Biological Intelligence"
        title="The Long-term Moat is Data-linked Biological Intelligence"
        subtitle="Crabionics continuously converts biological operations into structured intelligence through telemetry, operational causality mapping, and distributed production learning."
        align="center"
      />

      {/* MAIN GRID */}
      <div className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_1fr]">

        {/* LEFT */}
        <GlassCard className="relative overflow-hidden p-8 lg:p-10">

          {/* GLOW */}
          <div className="absolute right-[-10%] top-[-10%] h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">

            {/* HEADER */}
            <div className="border-b border-white/10 pb-6">

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                CIN — Crustacean Intelligence Network
              </p>

              <h3 className="mt-5">
                Distributed Learning Infrastructure
              </h3>

              <p className="mt-6">
                Every production cycle contributes operational,
                biological, and environmental intelligence into a
                continuously improving infrastructure network.
              </p>
            </div>

            {/* DATA FLOW */}
            <div className="mt-10 space-y-5">

              {[
                {
                  title: "Telemetry Aggregation",
                  description:
                    "Continuous ingestion of infrastructure and environmental signals.",
                },

                {
                  title: "Biological Correlation",
                  description:
                    "Mapping environmental patterns to production outcomes.",
                },

                {
                  title: "Predictive Infrastructure",
                  description:
                    "Using historical causality to improve operational response.",
                },

                {
                  title: "Distributed Benchmarking",
                  description:
                    "Cross-farm intelligence and production optimization.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                    0{index + 1}
                  </div>

                  <div>

                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* RIGHT */}
        <div className="grid gap-6">

          {dataLayers.map((layer) => (
            <GlassCard
              key={layer.title}
              className="p-7"
            >

              <h3 className="text-2xl">
                {layer.title}
              </h3>

              <div className="mt-6 grid gap-4">

                {layer.items.map((item) => (
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
          ))}
        </div>
      </div>

      {/* CIN NETWORK MAP */}
      <div className="mx-auto mt-24 max-w-6xl">

        <GlassCard className="overflow-hidden p-6 lg:p-10">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
              Distributed Production Network
            </p>

            <h3 className="mt-4">
              One Hub, Many Nodes — Connected by Telemetry
            </h3>

            <p className="mx-auto mt-6 max-w-3xl">
              The Crustacean Intelligence Network connects pilot, hatchery,
              nursery, grow-out, and partner sites into a single learning
              substrate. Live nodes feed real telemetry today; pilot and
              planned nodes show the path of network expansion.
            </p>
          </div>

          <div className="mt-10">
            <CINNetworkMap />
          </div>
        </GlassCard>
      </div>

      {/* BOTTOM STATEMENT */}
      <div className="mx-auto mt-24 max-w-5xl text-center">

        <div className="glass-card p-10 lg:p-14">

          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
            Intelligence Flywheel
          </p>

          <h3 className="mt-6">
            Biological Operations Become Continuous Infrastructure Intelligence
          </h3>

          <p className="mx-auto mt-8 max-w-3xl text-lg">
            The long-term defensibility of Crabionics is not hardware alone.
            It is the continuously expanding biological intelligence layer
            built through closed-loop operational telemetry, causality-linked
            production data, and distributed learning infrastructure.
          </p>
        </div>
      </div>

    </SectionWrapper>
  );
}