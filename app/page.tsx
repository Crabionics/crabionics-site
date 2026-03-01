import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] tracking-wider uppercase text-neutral-600">
          <span>Modular RAS Grow-Out</span>
          <span>600-Box Pilot Scale</span>
          <span>AquaOS MVP</span>
          <span>Execution Focused</span>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Crabionics Aquaculture Pvt. Ltd.
          </p>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-5xl">
            From Biological Chaos to Predictable Crab Production
          </h1>
          <p className="mt-8 text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Turning mud crab farming into a controllable production system using
            modular RAS and AquaOS.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/aquaos"
              className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide"
            >
              Explore AquaOS
            </Link>
            <Link
              href="/pilot-roadmap"
              className="inline-block px-6 py-3 border border-neutral-300 text-sm font-medium tracking-wide text-neutral-800 hover:bg-neutral-100"
            >
              View Pilot &amp; Roadmap
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why traditional pond-based mud crab farming fails
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-neutral-700">
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">Cannibalism in dense ponds</h3>
              <p className="mt-3 text-sm">
                Territorial behavior makes shared-density grow-out unstable,
                especially during vulnerable molting periods.
              </p>
            </article>
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">High mortality windows</h3>
              <p className="mt-3 text-sm">
                Molting and stress events can cause sudden losses when animals
                are not isolated and monitored at unit level.
              </p>
            </article>
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">Environmental variability</h3>
              <p className="mt-3 text-sm">
                Pond conditions fluctuate with weather and local factors,
                creating inconsistent cycle outcomes.
              </p>
            </article>
            <article className="border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold">Unpredictable economics</h3>
              <p className="mt-3 text-sm">
                Mortality and uneven growth directly reduce harvest confidence
                and planning reliability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why batch farming works for shrimp and fish, but breaks for crabs
          </h2>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Batch systems assume group compatibility and relatively uniform
            growth behavior. Mud crabs do not behave this way. Their aggressive
            territorial dynamics and molt vulnerability make grouped grow-out
            unreliable unless infrastructure is designed for individual control.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Operating logic in three steps
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600">
                1
              </p>
              <h3 className="mt-2 font-semibold">Biology</h3>
              <p className="mt-3 text-sm text-neutral-700">
                Individual crab identity, molt events, and environment signals.
              </p>
            </div>
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600">
                2
              </p>
              <h3 className="mt-2 font-semibold">Decisions</h3>
              <p className="mt-3 text-sm text-neutral-700">
                Rule-based decisions in AquaOS for feeding, isolation timing,
                intervention, and cycle control.
              </p>
            </div>
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600">
                3
              </p>
              <h3 className="mt-2 font-semibold">Outcomes</h3>
              <p className="mt-3 text-sm text-neutral-700">
                Survival stability, lower cycle uncertainty, and predictable
                harvest planning.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/team"
              className="inline-block px-6 py-3 border border-neutral-300 text-sm font-medium tracking-wide text-neutral-800 hover:bg-neutral-100"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight">
            Continue by area
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Link href="/platform" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">Platform</p>
              <p className="mt-2 text-sm text-neutral-700">Modular RAS infrastructure and deployment logic.</p>
            </Link>
            <Link href="/aquaos" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">AquaOS</p>
              <p className="mt-2 text-sm text-neutral-700">Production operating system and decision engine.</p>
            </Link>
            <Link href="/pilot-roadmap" className="border border-neutral-200 p-5 hover:bg-neutral-100">
              <p className="font-semibold">Pilot &amp; Roadmap</p>
              <p className="mt-2 text-sm text-neutral-700">Execution status, milestones, and next 12 months.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
