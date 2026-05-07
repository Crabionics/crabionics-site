import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const roadmap = [
  {
    phase: "Phase 01",
    title: "Biological Infrastructure",
    description:
      "Modular RAS systems, isolation architecture, and operational telemetry foundations.",
  },

  {
    phase: "Phase 02",
    title: "Operational Intelligence",
    description:
      "AquaOS orchestration, biological monitoring, and closed-loop infrastructure response.",
  },

  {
    phase: "Phase 03",
    title: "Distributed Production",
    description:
      "Connected hatchery, nursery, soft-shell, and grow-out production architecture.",
  },

  {
    phase: "Phase 04",
    title: "CIN Network",
    description:
      "Cross-farm intelligence, predictive systems, and distributed biological learning.",
  },

  {
    phase: "Phase 05",
    title: "Global Infrastructure Layer",
    description:
      "Scalable precision crustacean production infrastructure for export and food systems.",
  },
];

export default function RoadmapSection() {
  return (
    <SectionWrapper>

      <SectionHeading
        eyebrow="Roadmap"
        title="Building the Infrastructure Layer for Precision Aquaculture"
        subtitle="Crabionics is evolving from modular production infrastructure into a distributed biological intelligence platform."
        align="center"
      />

      <div className="mx-auto mt-20 max-w-5xl">

        <div className="space-y-6">

          {roadmap.map((item, index) => (
            <GlassCard
              key={item.phase}
              className="relative overflow-hidden p-8"
            >

              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

                {/* LEFT */}
                <div>

                  <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-200">
                    {item.phase}
                  </div>

                  <p className="mt-5 text-2xl font-semibold text-white">
                    0{index + 1}
                  </p>
                </div>

                {/* RIGHT */}
                <div>

                  <h3>
                    {item.title}
                  </h3>

                  <p className="mt-5">
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