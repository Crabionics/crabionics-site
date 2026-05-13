import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect directly with the Crabionics founding team for pilot deployments, technical collaboration, partnerships, and investment discussions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Crabionics",
    description:
      "Direct founder-level conversations for technical, infrastructure, and strategic collaboration.",
    url: "https://crabionics.com/contact",
    type: "website",
  },
};

const contactChannels = [
  {
    title: "Technical Collaboration",
    description:
      "Infrastructure systems, telemetry architecture, biological intelligence, and automation discussions.",
  },

  {
    title: "Pilot Deployment",
    description:
      "Production infrastructure pilots, field implementation, and operational partnerships.",
  },

  {
    title: "Investment & Grants",
    description:
      "Strategic capital, grant collaboration, infrastructure scaling, and ecosystem partnerships.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">

        {/* GLOW */}
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="container-shell relative z-10 py-28 lg:py-36">

          <div className="max-w-5xl">

            {/* EYEBROW */}
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Contact
            </div>

            {/* TITLE */}
            <h1 className="mt-8 max-w-4xl">
              Talk to the team directly
            </h1>

            {/* TEXT */}
            <p className="mt-8 max-w-3xl text-lg">
              For pilot collaboration, technical conversations,
              capital discussions, and partnership inquiries —
              one channel, founder-level, no funnel.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <SectionWrapper className="section-divider">

        <SectionHeading
          eyebrow="Collaboration Areas"
          title="Designed for Strategic Infrastructure Partnerships"
          subtitle="Crabionics collaborates across aquaculture infrastructure, operational intelligence, biological systems, and scalable production deployment."
          align="center"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          {contactChannels.map((item) => (
            <GlassCard
              key={item.title}
              className="p-8"
            >

              <div className="h-3 w-3 rounded-full bg-cyan-300" />

              <h3 className="mt-6">
                {item.title}
              </h3>

              <p className="mt-5">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CONTACT PANEL */}
      <SectionWrapper className="section-divider overflow-hidden">

        <div className="relative mx-auto max-w-5xl">

          {/* GLOW */}
          <div className="absolute inset-0 rounded-[40px] bg-cyan-400/10 blur-3xl" />

          <GlassCard className="relative overflow-hidden p-10 lg:p-14">

            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">

              {/* LEFT */}
              <div>

                <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
                  Direct Contact
                </p>

                <h2 className="mt-6 max-w-2xl">
                  One Clear Communication Channel
                </h2>

                <p className="mt-6 max-w-xl text-lg">
                  We prefer direct founder-level conversations
                  for technical, infrastructure, and strategic
                  collaboration discussions.
                </p>

                {/* EMAIL */}
                <div className="mt-12">

                  <p className="text-sm uppercase tracking-[0.16em] text-slate-500">
                    Email
                  </p>

                  <a
                    href="mailto:sameer@crabionics.com"
                    className="mt-5 inline-block text-3xl font-semibold text-cyan-200 transition hover:text-cyan-100"
                  >
                    sameer@crabionics.com
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">

                {[
                  {
                    label: "Infrastructure",
                    value: "Closed-loop RAS Systems",
                  },

                  {
                    label: "Operational Layer",
                    value: "AquaOS + CIN",
                  },

                  {
                    label: "Focus Area",
                    value: "Precision Aquaculture",
                  },

                  {
                    label: "Deployment",
                    value: "Pilot to Distributed Scaling",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >

                    <p className="text-sm uppercase tracking-[0.14em] text-slate-500">
                      {item.label}
                    </p>

                    <p className="mt-3 text-lg font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* PRE-READ */}
      <SectionWrapper>

        <SectionHeading
          eyebrow="Before Connecting"
          title="Explore the Core Infrastructure Stack"
          subtitle="Review the platform architecture, operational intelligence systems, and biological infrastructure before initiating strategic discussions."
          align="center"
        />

        <div className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-5">

          <Link
            href="/platform"
            className="primary-button"
          >
            Platform Infrastructure
          </Link>

          <Link
            href="/aquaos"
            className="secondary-button"
          >
            Explore AquaOS
          </Link>

          <Link
            href="/technology"
            className="secondary-button"
          >
            Technology Architecture
          </Link>
        </div>
      </SectionWrapper>

    </main>
  );
}