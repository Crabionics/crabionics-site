import Link from "next/link";

export default function TechnologyPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
            Technology
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            AquaOS Biological Intelligence Architecture
          </h1>
          <p className="mt-7 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Infrastructure-integrated modeling for survival optimization,
            molt-timing estimation, mortality risk classification, and
            production accountability.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Closed-loop infrastructure intelligence
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              ["Physical Layer", "Vertical RAS infrastructure, individual grow-out boxes, and controlled water systems."],
              ["Sensor Layer", "Dissolved oxygen, nitrate, temperature, salinity, and lifecycle event capture."],
              ["Data Layer", "Structured identity, environmental, operational, and yield metrics."],
              ["Model Layer", "Molt-timing estimation, mortality risk classification, and survival optimization."],
              ["Decision Layer", "Harvest window optimization, feeding control, and cost-per-kg stabilization."],
            ].map(([title, text]) => (
              <article key={title} className="border border-neutral-200 bg-white p-6">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-base text-neutral-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <article className="border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold">Molt timing intelligence</h3>
            <p className="mt-2 text-base text-neutral-700">
              Identifies high-risk windows to reduce mortality and improve intervention timing.
            </p>
          </article>
          <article className="border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold">Risk stabilization</h3>
            <p className="mt-2 text-base text-neutral-700">
              Forecasts stress conditions before thresholds are crossed.
            </p>
          </article>
          <article className="border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold">Crab Carbon Index (CCI)</h3>
            <p className="mt-2 text-base text-neutral-700">
              Connects production events to carbon-accountable reporting.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-base text-neutral-700 max-w-3xl">
            AquaOS explains the operating logic. This page details the broader
            technical stack that supports production reliability.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link href="/aquaos" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
              Go to AquaOS Overview
            </Link>
            <Link href="/platform" className="px-6 py-3 border border-neutral-300 text-base font-medium hover:bg-neutral-100">
              Go to Platform Infrastructure
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
