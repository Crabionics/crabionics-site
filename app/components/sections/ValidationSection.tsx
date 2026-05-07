import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../ui/SectionWrapper";

const milestones = [
  {
    year: "2023",
    title: "Modular RAS Development",
    description:
      "Development of vertical mud crab production architecture with individual isolation systems and operational SOPs.",
  },

  {
    year: "2024",
    title: "NIDHI PRAYAS Support",
    description:
      "Supported under the NIDHI PRAYAS innovation ecosystem for deep-tech aquaculture infrastructure development.",
  },

  {
    year: "2024",
    title: "KIIT TBI Incubation",
    description:
      "Incubated under KIIT Technology Business Incubator to accelerate infrastructure and commercialization strategy.",
  },

  {
    year: "2025",
    title: "AquaOS + CIN Development",
    description:
      "Development of telemetry infrastructure, biological intelligence systems, and distributed operational architecture.",
  },

  {
    year: "2025",
    title: "Pilot Infrastructure Scaling",
    description:
      "Expansion toward multi-system production architecture including hatchery, nursery, soft-shell, and RAS finishing systems.",
  },
];

export default function ValidationSection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <SectionHeading
        eyebrow="Validation & Execution"
        title="Built Through Research, Infrastructure Development, and Field Execution"
        subtitle="Crabionics combines biological research, engineering systems, infrastructure prototyping, and operational experimentation into a scalable precision aquaculture platform."
        align="center"
      />

      {/* TIMELINE */}
      <div className="relative mx-auto mt-24 max-w-5xl">

        {/* CENTER LINE */}
        <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400/40 via-cyan-300/10 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

        <div className="space-y-12">

          {milestones.map((item, index) => (
            <div
              key={item.title}
              className={`relative grid gap-8 lg:grid-cols-2 ${
                index % 2 === 0
                  ? ""
                  : "lg:[&>*:first-child]:order-2"
              }`}
            >

              {/* EMPTY */}
              <div className="hidden lg:block" />

              {/* CARD */}
              <GlassCard className="relative p-8 lg:p-10">

                {/* NODE */}
                <div className="absolute left-[-43px] top-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-xs font-semibold text-cyan-200 lg:left-auto lg:right-[-61px]">
                  {item.year}
                </div>

                <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                  Infrastructure Milestone
                </p>

                <h3 className="mt-5">
                  {item.title}
                </h3>

                <p className="mt-6">
                  {item.description}
                </p>

                {/* STATUS */}
                <div className="mt-8 flex flex-wrap gap-3">

                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
                    Execution Active
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
                    Infrastructure Layer
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* LOWER GRID */}
      <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            value: "600+",
            label: "Box Infrastructure Architecture",
          },

          {
            value: "4",
            label: "Integrated Production Systems",
          },

          {
            value: "RAS",
            label: "Closed-loop Infrastructure",
          },

          {
            value: "AI",
            label: "Biological Intelligence Layer",
          },
        ].map((item) => (
          <GlassCard
            key={item.label}
            className="p-8 text-center"
          >

            <p className="text-5xl font-semibold text-white">
              {item.value}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              {item.label}
            </p>
          </GlassCard>
        ))}
      </div>

    </SectionWrapper>
  );
}