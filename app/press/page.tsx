import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press resources, company background, and media contact information for Crabionics.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Crabionics Press",
    description: "Media resources and direct contact for editorial conversations.",
    url: "https://crabionics.com/press",
    type: "website",
  },
};

export default function PressPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-shell relative z-10 py-28 lg:py-36">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Press</div>
            <h1 className="mt-8 max-w-4xl">Media and communications resources</h1>
            <p className="mt-8 max-w-3xl text-lg">For editorial features, industry briefings, and infrastructure-focused stories on aquaculture innovation, contact the team directly.</p>
          </div>
        </div>
      </section>
      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Press Kit" title="What We Can Provide" subtitle="To support accurate coverage, we provide verified background information and operational context." align="center" />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            ["Company Background", "Mission, founding context, and infrastructure strategy narrative."],
            ["Technology Overview", "RAS architecture, telemetry stack, and staged capability roadmap."],
            ["Validation References", "Institutional support details and public grant/incubation context."],
          ].map(([title, description]) => (
            <GlassCard key={title} className="p-8"><div className="h-3 w-3 rounded-full bg-cyan-300" /><h3 className="mt-6">{title}</h3><p className="mt-5">{description}</p></GlassCard>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div><h2>Media inquiries and interviews</h2><p className="mt-5 max-w-2xl text-lg">For interviews, speaking requests, or publication timelines, reach out through the contact channel and include publication details and deadlines.</p></div>
            <Link href="/contact" className="primary-button">Press Contact</Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
