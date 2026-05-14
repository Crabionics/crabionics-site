import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Crabionics to help build the production architecture for crustacean aquaculture — across systems engineering, operations, and biology-led modeling.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Crabionics",
    description:
      "Work on modular RAS, telemetry, and biology-aware control for the next generation of aquaculture.",
    url: "https://crabionics.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-shell relative z-10 py-28 lg:py-36">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Careers</div>
            <h1 className="mt-8 max-w-4xl">Build core infrastructure for precision aquaculture</h1>
            <p className="mt-8 max-w-3xl text-lg">We recruit for people who are excited by difficult systems problems, field execution, and long-horizon deep-tech development.</p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="What We Value" title="High Ownership, Measurable Execution" subtitle="Our team culture combines startup speed with engineering discipline and scientific curiosity." align="center" />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            ["Systems Thinking", "You can move across hardware, operations, and software without losing rigor."],
            ["Field Reality", "You can design for real constraints and adapt quickly in production environments."],
            ["Long-term Depth", "You value compounding insights over short-term optics and hype."],
          ].map(([title, description]) => (
            <GlassCard key={title} className="p-8">
              <div className="h-3 w-3 rounded-full bg-cyan-300" />
              <h3 className="mt-6">{title}</h3>
              <p className="mt-5">{description}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="glass-card p-10 lg:p-14">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Current Hiring Areas</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Aquaculture operations and production supervision",
              "RAS and process engineering",
              "Embedded telemetry and instrumentation",
              "Data, analytics, and biological modeling",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-slate-300">{item}</div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2>Interested in joining the team?</h2>
              <p className="mt-5 max-w-2xl text-lg">Send your profile, project links, and a short note on why this mission fits your background.</p>
            </div>
            <Link href="/contact" className="primary-button">Contact Team</Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
