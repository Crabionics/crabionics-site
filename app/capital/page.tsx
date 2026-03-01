import Reveal from "@/app/components/Reveal";

export default function Capital() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="py-36 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Capital
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Infrastructure-Led Aquaculture Built for Scalable Unit Economics
            </h1>
            <p className="mt-8 text-neutral-400 text-lg max-w-3xl">
              Crabionics focuses on converting volatile aquaculture outcomes
              into a controlled, data-governed production model with defensible
              operating margins.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            ["Pilot Capacity", "600 boxes", "Integrated controlled deployment"],
            ["Survival Target", "80%+", "Stabilized biological performance"],
            ["Annual Output", "~1 ton", "Based on validated cycle model"],
            ["Operating Model", "365 days", "Continuous production windows"],
          ].map(([label, value, text]) => (
            <Reveal key={label}>
              <div className="border border-white/10 p-6">
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  {label}
                </p>
                <p className="mt-3 text-3xl font-semibold">{value}</p>
                <p className="mt-3 text-sm text-neutral-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Use of Capital
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Deployment Priorities
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {[
              [
                "Infrastructure Expansion",
                "Scale production units, water treatment modules, and operational automation capacity.",
              ],
              [
                "Biological Model Development",
                "Improve predictive modules for molt timing, stress conditions, and mortality prevention.",
              ],
              [
                "Commercial Route Development",
                "Build domestic and export channels with traceability and quality compliance layers.",
              ],
              [
                "Team and Execution Systems",
                "Strengthen technical operations, farm control workflows, and data governance practices.",
              ],
            ].map(([title, text]) => (
              <Reveal key={title}>
                <article className="h-full border border-white/10 bg-neutral-900 p-8">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                    {text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto border border-white/10 bg-neutral-900 p-8 md:p-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Investor Contact
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
              For deck requests and diligence access, use the contact page.
            </h2>
            <p className="mt-4 text-sm text-neutral-400">
              Include institution name, focus area, and preferred response
              timeline.
            </p>
            <a
              href="/contact"
              className="inline-block mt-8 px-7 py-3 bg-white text-black text-sm font-medium tracking-wide"
            >
              Contact Team
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
