import Link from "next/link";

export default function BlueEconomyPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Blue Economy
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            Coastal protein production with measurable operational discipline
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Crabionics aligns survival optimization, resource efficiency, and
            carbon accountability in a single production framework.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            ["Resource efficiency", "Closed-loop recirculation minimizes water loss and improves input efficiency."],
            ["Stable yield curves", "Controlled infrastructure reduces uncertainty in survival and cycle outcomes."],
            ["Coastal livelihoods", "Standardized SOPs support local employment and repeatable site operations."],
            ["Traceable production data", "Operational and biological events are logged for transparent reporting."],
          ].map(([title, text]) => (
            <article key={title} className="border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm text-neutral-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto border border-neutral-200 bg-white p-8">
          <p className="text-xs uppercase tracking-widest text-neutral-600">Accountability</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
            Crab Carbon Index (CCI) framework
          </h2>
          <p className="mt-4 text-neutral-700 max-w-3xl">
            CCI links production events, resource utilization, and yield
            outcomes to carbon-aware reporting metrics that can be audited over
            time.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link href="/pilot-roadmap" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
              See Execution Roadmap
            </Link>
            <Link href="/capital" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
              See Capital Context
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
