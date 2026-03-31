import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Predictable Mud Crab Grow-Out",
  description:
    "Predictable mud crab harvest cycles with modular RAS and AquaOS automation. Review pilot signals, KPIs, and deployment roadmap.",
};

const heroPills = [
  "Modular RAS Grow-Out",
  "600-Box Pilot Scale",
  "AquaOS MVP Live",
  "TRL 6-7 Progress",
];

export default function Home() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white/80">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-6 py-4 text-xs uppercase tracking-[0.15em] text-neutral-600 md:grid-cols-4">
          {heroPills.map((pill) => (
            <span key={pill} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-center">
              {pill}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              <Image src="/logo.png" alt="Crabionics logo" width={28} height={30} priority />
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-600">Crabionics Aquaculture Pvt. Ltd.</p>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Predictable mud crab harvest cycles with higher survival stability
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-neutral-700">
              We combine modular RAS infrastructure with AquaOS automation to turn mud crab grow-out into a
              reliable, operationally controlled production system.
            </p>
            <p className="mt-4 text-base font-medium text-neutral-800">Smart. Sustainable. Scalable.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-block bg-neutral-900 px-6 py-3 text-base font-medium tracking-wide text-white">
                Request Technical Brief / Demo
              </Link>
              <Link
                href="/pilot-roadmap"
                className="inline-block border border-neutral-300 px-6 py-3 text-base font-medium tracking-wide text-neutral-800 hover:bg-neutral-100"
              >
                See Pilot Results &amp; KPIs
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <article className="border border-neutral-200 bg-gradient-to-b from-white to-slate-50 p-6">
              <p className="text-sm uppercase tracking-wider text-neutral-600">Current Signals</p>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Pilot Capacity</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">600 Integrated Boxes</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Operating Layer</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">AquaOS MVP Live</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Maturity</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">TRL 6-7 Progress</p>
                </div>
              </div>
            </article>
          </div>

          <div className="md:col-span-12">
            <div className="mt-2 grid gap-4 md:grid-cols-3">
              <article className="border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm uppercase tracking-wider text-neutral-600">Pilot Signal</p>
                <p className="mt-2 text-xl font-semibold">600-box integrated setup</p>
                <p className="mt-2 text-base text-neutral-700">Modular system is live for reliability-focused grow-out operations.</p>
              </article>
              <article className="border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm uppercase tracking-wider text-neutral-600">Operating Layer</p>
                <p className="mt-2 text-xl font-semibold">AquaOS MVP active</p>
                <p className="mt-2 text-base text-neutral-700">Rule-based interventions and event capture are in current pilot workflows.</p>
              </article>
              <article className="border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm uppercase tracking-wider text-neutral-600">Programs</p>
                <p className="mt-2 text-xl font-semibold">BIRAC BIG + NIDHI</p>
                <p className="mt-2 text-base text-neutral-700">Execution aligned with institution-backed aquaculture innovation tracks.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Choose your path</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Link href="/capital" className="border border-neutral-200 bg-white p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Investors</p>
              <p className="mt-3 text-base text-neutral-700">Review traction, KPIs, roadmap, and capital readiness milestones.</p>
            </Link>
            <Link href="/contact" className="border border-neutral-200 bg-white p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Farmers</p>
              <p className="mt-3 text-base text-neutral-700">Discuss pilot collaboration, operating model, and farm deployment fit.</p>
            </Link>
            <Link href="/pilot-roadmap" className="border border-neutral-200 bg-white p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Partners</p>
              <p className="mt-3 text-base text-neutral-700">See measurable pilot status and upcoming milestones for integration.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Why RAS for crabs?</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Territoriality</p>
              <h3 className="mt-2 font-semibold">Problem</h3>
              <p className="mt-3 text-base text-neutral-700">Pond density amplifies aggression and molt-period losses.</p>
            </article>
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Modular RAS</p>
              <h3 className="mt-2 font-semibold">Solution</h3>
              <p className="mt-3 text-base text-neutral-700">
                Unit-level control reduces biological conflict and environment variability.
              </p>
            </article>
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Production</p>
              <h3 className="mt-2 font-semibold">Outcome</h3>
              <p className="mt-3 text-base text-neutral-700">
                Better cycle reliability for planning, harvest windows, and cash predictability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How AquaOS improves survival</h2>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            AquaOS structures decisions around animal identity, molt timing, feeding windows, and intervention
            triggers so operations shift from reactive to rule-based execution.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-sm uppercase tracking-widest text-neutral-600">1</p>
              <p className="mt-2 font-semibold">Capture events</p>
              <p className="mt-3 text-base text-neutral-700">Track biological and system events at unit level.</p>
            </div>
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-sm uppercase tracking-widest text-neutral-600">2</p>
              <p className="mt-2 font-semibold">Apply rules</p>
              <p className="mt-3 text-base text-neutral-700">Run intervention logic for feeding, isolation, and recovery timing.</p>
            </div>
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-sm uppercase tracking-widest text-neutral-600">3</p>
              <p className="mt-2 font-semibold">Review outcomes</p>
              <p className="mt-3 text-base text-neutral-700">Measure survival stability, growth uniformity, and cycle performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight">Quick take and deep dive</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Link href="/platform" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">Infrastructure</p>
              <p className="mt-2 text-base text-neutral-700">Modular RAS architecture and deployment logic.</p>
            </Link>
            <Link href="/technology" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">Technology &amp; How It Works</p>
              <p className="mt-2 text-base text-neutral-700">Biological logic, operating model, and control structure.</p>
            </Link>
            <Link href="/pilot-roadmap" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">Pilots &amp; Data</p>
              <p className="mt-2 text-base text-neutral-700">Execution status, KPI tracking, and next milestones.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
