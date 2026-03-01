import Link from "next/link";
import Reveal from "@/app/components/Reveal";

export default function Platform() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="py-36 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Platform
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Physical Infrastructure Built for Predictable Survival Curves
            </h1>
            <p className="mt-8 text-neutral-400 text-lg max-w-3xl">
              Crabionics combines modular grow-out hardware, closed-loop water
              treatment, and production protocols into one deployable system
              for controlled mud crab cultivation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            [
              "Box-Level Isolation",
              "Each crab is grown in an individual unit to remove territorial conflict and reduce cannibalism risk.",
            ],
            [
              "RAS Water Control",
              "Centralized treatment, filtration, and recirculation maintain stable parameters through the cycle.",
            ],
            [
              "Operational Instrumentation",
              "Sensor streams and operational events are captured as decision-ready production data.",
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
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Deployment Model
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              From Pilot Validation to Scaled Coastal Installations
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-4 gap-8">
            {[
              ["Phase 1", "600 boxes", "Integrated production pilot"],
              ["Phase 2", "2,000+ boxes", "Commercial cluster expansion"],
              ["Phase 3", "Multi-site", "Regional infrastructure rollout"],
              ["Phase 4", "Global", "Export-aligned operating model"],
            ].map(([phase, value, text]) => (
              <Reveal key={phase}>
                <div className="border border-white/10 p-6">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {phase}
                  </p>
                  <p className="mt-3 text-2xl font-semibold">{value}</p>
                  <p className="mt-3 text-sm text-neutral-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-white/10 bg-neutral-900 p-8 md:p-10">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                Next Layer
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
                See the Intelligence Stack Behind the Platform
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Link
              href="/technology"
              className="inline-block px-7 py-3 bg-white text-black text-sm font-medium tracking-wide"
            >
              Explore Technology
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
