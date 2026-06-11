import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Crabionics is built by first-generation deep-tech founders — field operators first, engineers second. Sameer Kumar Dalai (CEO) and M Abhishek (CTO).",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Crabionics Team",
    description:
      "Meet the founders building the production architecture for mud crab aquaculture.",
    url: "https://crabionics.com/team",
    type: "website",
  },
};

const founders = [
  {
    name:     "Sameer Kumar Dalai",
    role:     "Co-Founder & CEO",
    photo:    "/team/sameer-kumar-dalai.jpg",
    alt:      "Sameer Kumar Dalai — Co-Founder & CEO, Crabionics",
    email:    "sameer@crabionics.com",
    linkedin: "https://www.linkedin.com/in/sameer-kumar-dalai-9014737a/",
    bullets: [
      "Systems Architecture & RAS Operations",
      "Hatchery Systems, RAS Architecture & Biological Intelligence",
      "Field execution — 2+ years, 1,000-box pilot operations in Odisha and Andhra Pradesh",
    ],
  },
  {
    name:     "M Abhishek",
    role:     "Co-Founder & CTO",
    photo:    "/team/m-abhishek.jpg",
    alt:      "M Abhishek — Co-Founder & CTO, Crabionics",
    email:    "abhishek@crabionics.com",
    linkedin: "https://www.linkedin.com/in/marediabhishek/",
    bullets: [
      "AI / ML & full-stack software systems",
      "Analytics & intelligence stack",
      "AquaOS platform development",
    ],
  },
];

const support = [
  "KIIT-TBI mentor network",
  "Marine biologists",
  "Aquaculture engineers",
  "BIRAC technical reviewers",
];

export default function TeamPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-20 lg:py-28">

          <div className="max-w-5xl">

            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Team
            </div>

            <h1 className="mt-8 max-w-4xl">
              Field operators first, engineers second
            </h1>

            <p className="mt-8 max-w-3xl text-lg">
              Built by founders who spent two years in Odisha and Andhra Pradesh
              learning where the production system breaks — before raising a rupee.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="The Founders"
          title="Two operators. One closed loop."
          subtitle="Hardware, biology, and the software layer — owned end-to-end."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-2">

          {founders.map((f) => (
            <GlassCard
              key={f.name}
              className="overflow-hidden p-8 lg:p-10"
            >

              {/* Portrait */}
              <div className="relative mx-auto mb-8 h-44 w-44 overflow-hidden rounded-full border border-cyan-400/20 bg-white/[0.03]">
                <Image
                  src={f.photo}
                  alt={f.alt}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>

              <div className="text-center">

                <h3 className="text-2xl font-semibold text-white">
                  {f.name}
                </h3>

                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-cyan-200">
                  {f.role}
                </p>

                {f.email && (
                  <p className="mt-3 text-sm">
                    <a
                      href={`mailto:${f.email}`}
                      className="text-cyan-200 transition hover:text-cyan-100"
                    >
                      {f.email}
                    </a>
                  </p>
                )}

                <div className="mt-5 flex justify-center">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/20 hover:text-cyan-100"
                  >
                    {/* LinkedIn icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {f.bullets.map((b) => (
                  <div
                    key={b}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    <p className="text-sm text-slate-300">{b}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* SUPPORT NETWORK */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Supported by"
          title="Mentors, reviewers, and field collaborators"
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {support.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-md"
            >
              <p className="text-sm text-slate-200">{s}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* FIELD STORY */}
      <SectionWrapper className="section-divider">

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Why this team, why now
              </p>

              <h2 className="mt-5">
                Two years in the field before the company existed
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                Before raising capital, the team ran a 1,000-box mud crab RAS pilot in
                Odisha — observing cannibalism, molt vulnerability, and water-quality
                drift under real conditions. The biology, SOPs, and operating discipline
                came from that field time.
              </p>

              <p className="mt-6 max-w-2xl text-lg">
                The 600-box controlled-validation pilot at KIIT-TBI exists because we
                already know where the system breaks.
              </p>
            </div>

            <div className="space-y-4">

              {[
                {
                  label: "Field operations",
                  value: "2+ years",
                  note:  "Odisha and Andhra Pradesh",
                },
                {
                  label: "Field R&D scale",
                  value: "1,000 boxes",
                  note:  "Odisha operations, 2023–25",
                },
                {
                  label: "Controlled-validation pilot",
                  value: "600 boxes",
                  note:  "KIIT-TBI — in progress",
                },
                {
                  label: "Stack ownership",
                  value: "End-to-end",
                  note:  "Hardware, biology, software — in-house",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>

        <div className="glass-card overflow-hidden p-10 lg:p-14">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                Talk to the founders
              </p>

              <h2 className="mt-5 max-w-3xl">
                Direct, founder-level conversations for pilot, technical, and capital discussions
              </h2>

              <p className="mt-6 max-w-2xl text-lg">
                No funnel, no gatekeeper.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

              <Link href="/contact" className="primary-button">
                Talk to the founders
              </Link>

              <Link href="/capital" className="secondary-button">
                Investor brief
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

    </main>
  );
}
