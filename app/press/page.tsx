import type { Metadata } from "next";
import Link from "next/link";

import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Press | Crabionics",
  description: "Crabionics company background, validation programme, and media resources.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10"><div className="container-shell py-24 lg:py-32"><div className="max-w-5xl"><div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Press</div><h1 className="mt-8 max-w-4xl">A clear source of truth for the Crabionics story.</h1><p className="mt-8 max-w-3xl text-lg">Crabionics is building production infrastructure and an operating system for precision mud crab aquaculture. Media and ecosystem conversations should distinguish current evidence from future capability.</p></div></div></div></section>
      <SectionWrapper className="section-divider"><SectionHeading eyebrow="Company snapshot" title="What we are building" subtitle="Controlled habitat + sensing + actuation + operating intelligence, validated through real production." align="center" /><div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">{["Production infrastructure for precision mud crab aquaculture", "Technology spine: Habitat → CrabSense → CrabPod → AquaOS", "Parallel validation: BIRAC + technology + pond + 600-box", "Evidence-first path from pilot to economics to commercial scale"].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><span className="font-mono text-xs text-cyan-200">0{index + 1}</span><p className="mt-3 text-sm text-slate-200">{item}</p></div>)}</div></SectionWrapper>
      <SectionWrapper><div className="glass-card p-10 lg:p-14"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Media / ecosystem</p><h2 className="mt-5">For current company facts, use the validation and capital pages.</h2><p className="mt-5 max-w-2xl text-slate-300">We update the public narrative around evidence rather than treating prototypes or projections as achieved production outcomes.</p></div><div className="flex flex-col gap-4 sm:flex-row lg:flex-col"><Link href="/validation" className="primary-button">Validation</Link><Link href="/capital" className="secondary-button">Capital</Link></div></div></div></SectionWrapper>
    </main>
  );
}
