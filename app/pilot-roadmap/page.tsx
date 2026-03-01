import Link from "next/link";

export default function PilotRoadmapPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
            Pilot &amp; Roadmap
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            Execution-first roadmap for controllable crab production
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            This page is focused on what is built, what is live, and what is
            next in the next 12 months.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            What we&apos;ve done
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">Prior RAS grow-out pilots</h3>
              <p className="mt-3 text-base text-neutral-700">
                Completed controlled grow-out trials to validate infrastructure
                assumptions and practical operations.
              </p>
            </article>
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">SOP development</h3>
              <p className="mt-3 text-base text-neutral-700">
                Created repeatable operational SOPs for handling, water control,
                monitoring, and intervention windows.
              </p>
            </article>
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">TRL 6-7 grow-out system</h3>
              <p className="mt-3 text-base text-neutral-700">
                Current system maturity is aligned with applied pilot execution
                rather than only concept-stage documentation.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            What&apos;s live / restarting
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="border border-neutral-200 p-6">
              <h3 className="font-semibold">AquaOS MVP</h3>
              <p className="mt-3 text-base text-neutral-700">
                MVP operating layer for event capture, rule-based decisions, and
                outcome tracking is live for pilot operations.
              </p>
            </article>
            <article className="border border-neutral-200 p-6">
              <h3 className="font-semibold">Modular RAS pilot (600-box scale)</h3>
              <p className="mt-3 text-base text-neutral-700">
                Integrated grow-out pilot at 600-box scale with a target to
                stabilize survival and cycle reliability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Next 12 months
          </h2>

          <div className="mt-8 border border-neutral-200 bg-white p-6 md:p-8">
            <ol className="space-y-6">
              <li className="grid md:grid-cols-5 gap-3 md:gap-6">
                <p className="text-base font-medium text-neutral-600">Q2-Q3</p>
                <div className="md:col-span-4">
                  <p className="font-semibold">Hatchery integration (BIRAC BIG)</p>
                  <p className="mt-2 text-base text-neutral-700">
                    Integrate hatchery-stage controls with grow-out operations to
                    reduce lifecycle discontinuity.
                  </p>
                </div>
              </li>
              <li className="grid md:grid-cols-5 gap-3 md:gap-6">
                <p className="text-base font-medium text-neutral-600">Q3-Q4</p>
                <div className="md:col-span-4">
                  <p className="font-semibold">Cluster-based deployment</p>
                  <p className="mt-2 text-base text-neutral-700">
                    Expand from single-site pilot execution toward clustered
                    production units with shared operating standards.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
          <Link href="/capital" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
            View Capital Readiness
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
