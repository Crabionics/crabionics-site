import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Predictable Mud Crab Grow-Out",
  description:
    "Predictable mud crab harvest cycles with modular RAS and AquaOS automation. Review pilot signals, KPIs, and deployment roadmap.",
};

export default function Home() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm tracking-wider uppercase text-neutral-600">
          <span>Modular RAS Grow-Out</span>
          <span>600-Box Pilot Scale</span>
          <span>AquaOS MVP Live</span>
          <span>TRL 6-7 Progress</span>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
            Crabionics Aquaculture Pvt. Ltd.
          </p>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-5xl">
            Predictable mud crab harvest cycles with higher survival stability
          </h1>
          <p className="mt-8 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            We combine modular RAS infrastructure with AquaOS automation to turn
            mud crab grow-out into an operationally controlled production system.
          </p>
          <p className="mt-4 text-base font-medium text-neutral-800">
            Pilot target: up to 2x survival vs conventional pond grow-out under
            comparable operating windows.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-neutral-900 text-white text-base font-medium tracking-wide"
            >
              Request Technical Brief / Demo
            </Link>
            <Link
              href="/pilot-roadmap"
              className="inline-block px-6 py-3 border border-neutral-300 text-base font-medium tracking-wide text-neutral-800 hover:bg-neutral-100"
            >
              See Pilot Results &amp; KPIs
            </Link>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
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
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Choose your path
          </h2>
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
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why RAS for crabs?
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Territoriality</p>
              <h3 className="mt-2 font-semibold">Problem</h3>
              <p className="mt-3 text-base text-neutral-700">
                Pond density amplifies aggression and molt-period losses.
              </p>
            </article>
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Modular RAS</p>
              <h3 className="mt-2 font-semibold">Solution</h3>
              <p className="mt-3 text-base text-neutral-700">
                Unit-level control reduces biological conflict and environment
                variability.
              </p>
            </article>
            <article className="border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-medium text-neutral-600">Production</p>
              <h3 className="mt-2 font-semibold">Outcome</h3>
              <p className="mt-3 text-base text-neutral-700">
                Better cycle reliability for planning, harvest windows, and cash
                predictability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            How AquaOS improves survival
          </h2>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            AquaOS structures decisions around animal identity, molt timing,
            feeding windows, and intervention triggers so operations shift from
            reactive to rule-based execution.
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
          <h2 className="text-2xl font-semibold tracking-tight">
            Quick take and deep dive
          </h2>
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
