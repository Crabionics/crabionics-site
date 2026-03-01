import Link from "next/link";

export default function CapitalPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
            Capital
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            Infrastructure-led aquaculture with execution-driven milestones
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Focused on converting volatile aquaculture outcomes into a
            controllable, data-governed production model.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            ["Pilot Capacity", "600 boxes", "Integrated controlled deployment"],
            ["Survival Target", "80%+", "Stabilized biological performance"],
            ["Annual Output", "~1 ton", "Based on validated cycle model"],
            ["Operating Model", "365 days", "Continuous production windows"],
          ].map(([label, value, text]) => (
            <article key={label} className="border border-neutral-200 bg-white p-6">
              <p className="text-sm uppercase tracking-widest text-neutral-600">{label}</p>
              <p className="mt-2 text-3xl font-semibold">{value}</p>
              <p className="mt-2 text-base text-neutral-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto border border-neutral-200 bg-white p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Investor contact</h2>
          <p className="mt-3 text-neutral-700">
            For deck requests and diligence access, contact the team directly.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link href="/team" className="inline-block px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
              Founder Profile
            </Link>
            <Link href="/contact" className="inline-block px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
