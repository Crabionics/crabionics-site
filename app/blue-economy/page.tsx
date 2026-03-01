import Reveal from "@/app/components/Reveal";

export default function BlueEconomy() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="py-36 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Blue Economy
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Coastal Protein Production With Measurable Ecological Discipline
            </h1>
            <p className="mt-8 text-neutral-400 text-lg max-w-3xl">
              Crabionics is designed as a production infrastructure model that
              aligns survival optimization, resource efficiency, and carbon
              accountability in one operating system.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {[
              [
                "Resource Efficiency",
                "Closed-loop recirculation minimizes water loss and improves input efficiency versus open pond variability.",
              ],
              [
                "Stable Yield Curves",
                "Controlled infrastructure reduces uncertainty in survival rates, allowing predictable annualized output.",
              ],
              [
                "Coastal Livelihoods",
                "Standardized operational playbooks support skilled local employment and repeatable site performance.",
              ],
              [
                "Traceable Production Data",
                "Operational and biological event capture enables transparent reporting for policy and market stakeholders.",
              ],
            ].map(([title, text]) => (
              <Reveal key={title}>
                <article className="h-full border border-white/10 bg-neutral-900 p-8">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                    {text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Accountability
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Crab Carbon Index (CCI) Framework
            </h2>
            <p className="mt-6 text-neutral-400 max-w-3xl">
              The CCI layer links production events, resource utilization, and
              yield outcomes to carbon-aware reporting metrics that can be
              audited over time.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              ["Input Signals", "Energy, water, feed, oxygen, and biomass data"],
              ["Model Engine", "Cycle-level emissions and intensity estimates"],
              ["Output Reports", "Export-ready carbon-linked production records"],
            ].map(([title, text]) => (
              <Reveal key={title}>
                <div className="border border-white/10 p-6">
                  <h3 className="font-semibold text-neutral-100">{title}</h3>
                  <p className="mt-3 text-sm text-neutral-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto border border-white/10 bg-neutral-900 p-8 md:p-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Strategic Outcome
            </p>
            <p className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight max-w-4xl">
              A replicable aquaculture infrastructure model for food security,
              coastal jobs, and carbon-aware market access.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
