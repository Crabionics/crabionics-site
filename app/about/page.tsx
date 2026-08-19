import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Crabionics",
  description:
    "Why Crabionics exists: building production infrastructure and an operating system for precision mud crab aquaculture.",
  alternates: { canonical: "/about" },
};

const tracks = [
  "BIRAC / IHMS — funded R&D",
  "Technology Spine — engineering and integration",
  "Pond — biomass and biological production",
  "600-box — controlled finishing and economics",
  "Funding + Commercial — capital and demand evidence",
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">About Crabionics</div>
            <h1 className="mt-8 max-w-4xl">Make mud crab production measurable, controllable, and repeatable.</h1>
            <p className="mt-8 max-w-3xl text-lg">Crabionics is building production infrastructure and an operating system for precision mud crab aquaculture — combining controlled habitat, sensing, actuation, biological protocols, and software into one evidence-driven production system.</p>
          </div>
        </div>
      </section>

      <section className="section-divider container-shell py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">The hypothesis</p>
          <h2 className="mt-5">Production becomes more predictable when the system can observe, decide, act, and learn.</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">Every major product claim is treated as a hypothesis that must survive engineering, biological, and economic validation.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {["Observe", "Understand", "Decide", "Act", "Learn"].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"><p className="font-mono text-xs text-cyan-200">0{index + 1}</p><p className="mt-3 font-medium text-white">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-divider container-shell py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Where we are</p>
          <h2 className="mt-5">Validation before scale.</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">These tracks run in parallel because each retires a different uncertainty.</p>
          <div className="mt-12 grid gap-4">
            {tracks.map((item, index) => <div key={item} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6"><span className="font-mono text-xs text-cyan-200">0{index + 1}</span><p className="text-sm text-slate-200">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="container-shell py-20 lg:py-28">
        <div className="glass-card p-10 lg:p-14">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Evidence standard</p>
          <h2 className="mt-5">Known. Observed. Inferred. Unknown.</h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">We would rather expose an unresolved question than turn a prototype, model, or branch into a claim of commercial readiness.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href="/validation" className="primary-button">See validation</Link><Link href="/platform" className="secondary-button">Explore platform</Link></div>
        </div>
      </section>
    </main>
  );
}
