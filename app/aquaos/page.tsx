import Link from "next/link";
import AquaOSControlLoop from "../components/AquaOSControlLoop";

export default function AquaOSPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
            Technology
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            AquaOS: A Production Operating System for Mud Crab Grow-Out
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            AquaOS is not a generic farm dashboard. It is the operating layer
            that links biological events and infrastructure signals to
            day-to-day production decisions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            What is AquaOS?
          </h2>
          <p className="mt-6 text-neutral-700 max-w-4xl leading-relaxed">
            AquaOS is a production operating system that structures each crab as
            a tracked biological unit, maps events such as molting and stress,
            and supports operational interventions across the cycle. The goal is
            controlled production outcomes, not only monitoring.
          </p>
        </div>
      </section>

      <AquaOSControlLoop />

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <article className="border border-neutral-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Rule-based today</h2>
            <ul className="mt-4 text-base text-neutral-700 space-y-2">
              <li>Operational threshold rules for water quality and stress flags</li>
              <li>Intervention logic for feeding and isolation timing</li>
              <li>Cycle-level SOP driven decision support</li>
            </ul>
          </article>
          <article className="border border-neutral-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Model-driven later</h2>
            <ul className="mt-4 text-base text-neutral-700 space-y-2">
              <li>Higher-confidence molt-window prediction</li>
              <li>Mortality risk scoring from event patterns</li>
              <li>Yield and cycle-time optimization from longitudinal data</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
          <Link href="/technology" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
            View Full Technology Stack
          </Link>
          <Link href="/pilot-roadmap" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
            See Pilot Execution
          </Link>
        </div>
      </section>
    </main>
  );
}
