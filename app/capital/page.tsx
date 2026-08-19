import type { Metadata } from "next";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Capital | Crabionics",
  description:
    "Crabionics is financing the next evidence gates for precision mud crab production: technology, biology, controlled finishing, economics, and commercial demand.",
  alternates: { canonical: "/capital" },
  openGraph: {
    title: "Crabionics | Capital",
    description:
      "Capital to retire the next technology, biological, economic, and commercial uncertainties in precision mud crab production.",
    url: "https://crabionics.com/capital",
    type: "website",
  },
};

const gates = [
  ["01", "Technology", "Habitat, CrabSense, CrabPod, and AquaOS must become reliable enough for field deployment."],
  ["02", "Biology", "Pond and controlled-production trials must establish survival, growth, events, and operating envelopes."],
  ["03", "Economics", "The 600-box programme must replace modelled assumptions with actual cost, yield, and cycle data."],
  ["04", "Commercial", "Processor/customer evidence must show that consistent, traceable production creates willingness to pay."],
];

const capitalPools = [
  ["BIRAC / IHMS", "Funded R&D", "Execute the approved IHMS programme and generate its contractual technical evidence."],
  ["Company validation capital", "Pond + 600-box", "Fund non-BIRAC pilot infrastructure, biomass, working capital, field operations, and commercial validation."],
  ["Strategic / customer capital", "Partner-aligned", "Where appropriate, use capital or deployment support from parties with a direct economic stake in reliable supply."],
  ["Scale capital", "Post-validation", "Raise larger deployment capital only after technical, biological, economic, and commercial evidence supports the case."],
];

const evidence = [
  ["Known", "Institutional support and funded R&D are real company evidence."],
  ["Observed", "Operating and prototype evidence is valuable but must be separated from repeatability claims."],
  ["Unknown", "Commercial repeatability, full unit economics, and long-term biological performance remain to be proven."],
  ["Next experiment", "Run the pond + 600-box validation programme with a frozen protocol and evidence chain."],
];

export default function CapitalPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-shell relative z-10 py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              Capital
            </div>
            <h1 className="mt-8 max-w-4xl">Fund the next evidence gates — not an arbitrary scale target.</h1>
            <p className="mt-8 max-w-3xl text-lg">
              Crabionics is building production infrastructure and an operating system for precision mud crab aquaculture. The current capital requirement sits between funded R&amp;D and commercial scale: we need to retire the next technical, biological, economic, and commercial uncertainties.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["BIRAC BIG", "DST NIDHI PRAYAS", "KIIT-TBI", "DPIIT Startup"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="The capital logic" title="Different capital solves different uncertainty" subtitle="BIRAC and company validation capital are complementary, not interchangeable." align="center" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2">
          {capitalPools.map(([title, label, body]) => (
            <GlassCard key={title} className="p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{label}</p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="What the next capital unlocks" title="Technology → Biology → Economics → Commercial" subtitle="The 600-box and nearby pond programme run in parallel with BIRAC because they answer different questions." align="center" />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gates.map(([number, title, body]) => (
            <GlassCard key={title} className="p-8">
              <p className="font-mono text-xs text-cyan-200">{number}</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Capital discipline" title="Every rupee should retire a defined uncertainty." align="center" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4">
          {[
            ["Pilot infrastructure", "Creates the physical system and field evidence."],
            ["Biomass + working capital", "Allows the biological cycle to run without distorting the experiment."],
            ["Sensors / edge / software", "Creates an auditable evidence chain across production events."],
            ["Scientific support", "Turns biological unknowns into controlled experiments and defensible conclusions."],
            ["Commercial validation", "Tests whether the resulting production capability is worth paying for."],
          ].map(([title, body], index) => (
            <div key={title} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-mono text-xs text-cyan-200">0{index + 1}</span>
              <div><p className="font-medium text-white">{title}</p><p className="mt-1 text-sm text-slate-400">{body}</p></div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Evidence discipline" title="What we know, what we have observed, and what remains to be proven." align="center" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {evidence.map(([title, body]) => (
            <GlassCard key={title} className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{title}</p>
              <p className="mt-4 text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">The ask</p>
              <h2 className="mt-5 max-w-3xl">Back the next proof point, then let the evidence determine the scale.</h2>
              <p className="mt-5 max-w-2xl text-slate-300">We are not using the website to manufacture a round size or claim commercial readiness that has not been earned. The capital case should be tied to the exact evidence gap and the gate it unlocks.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/validation" className="primary-button">See validation</Link>
              <Link href="/contact" className="secondary-button">Talk to the team</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
