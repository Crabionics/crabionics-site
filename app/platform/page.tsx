import Link from "next/link";

export default function PlatformPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Platform
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            Physical infrastructure for predictable survival curves
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Crabionics combines modular grow-out hardware, closed-loop water
            treatment, and operating protocols into one deployable system for
            controlled mud crab cultivation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            ["Box-level isolation", "Each crab is grown in an individual unit to remove territorial conflict and reduce cannibalism risk."],
            ["RAS water control", "Centralized treatment, filtration, and recirculation maintain stable parameters through the cycle."],
            ["Operational instrumentation", "Sensor streams and operational events are captured as decision-ready production data."],
          ].map(([title, text]) => (
            <article key={title} className="border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm text-neutral-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Deployment model
          </h2>
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              ["Phase 1", "600 boxes", "Integrated production pilot"],
              ["Phase 2", "2,000+ boxes", "Commercial cluster expansion"],
              ["Phase 3", "Multi-site", "Regional infrastructure rollout"],
              ["Phase 4", "Global", "Export-aligned operating model"],
            ].map(([phase, value, text]) => (
              <div key={phase} className="border border-neutral-200 p-5">
                <p className="text-xs uppercase tracking-widest text-neutral-600">{phase}</p>
                <p className="mt-2 text-2xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-neutral-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
          <Link href="/technology" className="inline-block px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
            Explore Technology
          </Link>
          <Link href="/pilot-roadmap" className="inline-block px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
            Review Pilot &amp; Roadmap
          </Link>
        </div>
      </section>
    </main>
  );
}
