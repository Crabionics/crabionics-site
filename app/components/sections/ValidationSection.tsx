import Image from "next/image";

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
      "Supported under the DST NIDHI PRAYAS innovation ecosystem for deep-tech aquaculture infrastructure development.",
  },
  {
    year: "2024",
    title: "KIIT-TBI Incubation",
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
  {
    year: "2026",
    title: "BIRAC BIG Grant — 24th Call",
    description:
      "Awarded under BIRAC's Biotechnology Ignition Grant (24th call) — 2026.",
  },
];

const institutions = [
  {
    name: "KIIT-TBI",
    role: "Incubation",
    logo: "/logos/kiit-tbi.png",
    alt:  "KIIT-TBI — KIIT Technology Business Incubator",
  },
  {
    name: "DST NIDHI PRAYAS",
    role: "Innovation Support",
    logo: "/logos/dst-nidhi-prayas.png",
    alt:  "DST NIDHI PRAYAS — Department of Science & Technology",
  },
  {
    name: "BIRAC BIG",
    role: "Grant — 24th Call",
    logo: "/logos/birac-big.png",
    alt:  "BIRAC — Biotechnology Industry Research Assistance Council",
  },
];

const photos = [
  {
    caption: "KIIT-TBI office setup — Crabionics operations base.",
    file: "kiit-office.jpg",
  },
  {
    caption: "Modular box / grow-out rack under development.",
    file: "box-rack.jpg",
  },
  {
    caption: "Sensor calibration and lab work for AquaOS instrumentation.",
    file: "sensor-lab.jpg",
  },
  {
    caption: "RAS plumbing and recirculation infrastructure build.",
    file: "ras-build.jpg",
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

      {/* INSTITUTIONAL LOGO STRIP */}
      <div className="mx-auto mt-16 max-w-5xl">

        <p className="text-center text-[10px] uppercase tracking-[0.24em] text-cyan-200/70">
          Institutionally backed
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {institutions.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-md"
            >

              {/* LOGO */}
              <div className="flex h-16 items-center justify-center rounded-xl bg-white/95 px-5">
                <Image
                  src={item.logo}
                  alt={item.alt}
                  width={200}
                  height={56}
                  className="max-h-10 w-auto object-contain"
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-white">
                {item.name}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cyan-200/70">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>

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

      {/* PHOTO STRIP */}
      <div className="mt-24">

        <p className="text-center text-[10px] uppercase tracking-[0.24em] text-cyan-200/70">
          Real work, photographed
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {photos.map((item) => (
            <GlassCard
              key={item.file}
              className="overflow-hidden"
            >

              {/* PHOTO PLACEHOLDER */}
              <div className="flex aspect-[4/3] items-center justify-center border-b border-white/10 bg-white/[0.02] text-center">

                <div className="px-6">

                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">
                    Photo placeholder
                  </p>

                  <p className="mt-3 font-mono text-xs text-slate-500">
                    /public/photos/{item.file}
                  </p>
                </div>
              </div>

              <p className="px-6 py-5 text-sm text-slate-300">
                {item.caption}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}
