import Image from "next/image";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-100">

     <div className="border-b border-white/5 py-3 text-[11px] tracking-wider uppercase text-neutral-500">
  <div className="max-w-6xl mx-auto px-6 flex justify-between">
    <span>600-Box Integrated Pilot</span>
    <span>≥80% Survival Target</span>
    <span>~1 Ton Annualized Output</span>
    <span>Blue Economy Aligned</span>
  </div>
</div>

{/* ================= HERO ================= */}
<section className="relative min-h-screen flex items-center px-6 border-b border-white/5">

  <div className="max-w-5xl mx-auto pt-32">

    <Reveal>
      <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">
        Biological Infrastructure Intelligence
      </div>
    </Reveal>

    <Reveal>
      <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight leading-[1.05]">
        Engineering Predictable<br />
        Mud Crab Production.
      </h1>
    </Reveal>

    <Reveal>
      <p className="mt-10 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
        Infrastructure-integrated modeling and controlled RAS architecture
        enabling stable survival, lifecycle predictability, and
        carbon-accountable aquaculture.
      </p>
    </Reveal>

    <Reveal>
      <div className="mt-16 flex gap-6">
        <a
          href="/platform"
          className="px-10 py-4 bg-white text-black text-sm font-medium tracking-wide"
        >
          View Platform
        </a>

        <a
          href="/technology"
          className="px-10 py-4 border border-white/20 text-sm tracking-wide text-neutral-300 hover:bg-white hover:text-black transition"
        >
          Explore Architecture
        </a>
      </div>
    </Reveal>

  </div>
</section>

     <section className="py-28 px-6 border-b border-white/5">
  <div className="max-w-5xl mx-auto">

    <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">
      Constraint
    </div>

    <h2 className="mt-4 text-3xl font-medium tracking-tight">
      Structural Limitations of Traditional Pond Systems
    </h2>

    <div className="mt-14 grid md:grid-cols-2 gap-16 text-neutral-400">
      {[
        "Territorial Behavior and Density Conflict",
        "Molting Mortality and Vulnerability Windows",
        "Environmental Variability",
        "Uncontrolled Cannibalism",
      ].map((item, i) => (
        <div key={i}>
          <p className="text-neutral-100">{item}</p>
          <p className="mt-3 text-sm text-neutral-500">
            Infrastructure-level isolation and environmental control
            are required to stabilize survival curves.
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

      {/* ================= INFRASTRUCTURE ================= */}
      <section className="py-32 px-6 border-t border-white/10 bg-neutral-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">
                Infrastructure
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                Modular Vertical RAS Architecture
              </h2>
              <p className="mt-8 text-neutral-400">
                Individual grow-out boxes integrated into a controlled RAS loop,
                engineered for predictable survival and scalable deployment.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative h-[380px]">
              <Image
                src="/infrastructure.png"
                alt="RAS Infrastructure"
                fill
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>
<div className="mt-12 grid grid-cols-3 gap-12 text-xs uppercase tracking-wider text-neutral-500">
  <div>
    <div className="text-neutral-100 text-lg font-medium">Individualized Units</div>
    <div className="mt-2">Zero Cannibalism Density</div>
  </div>
  <div>
    <div className="text-neutral-100 text-lg font-medium">Closed-Loop RAS</div>
    <div className="mt-2">Water Stability Control</div>
  </div>
  <div>
    <div className="text-neutral-100 text-lg font-medium">Integrated Sensing</div>
    <div className="mt-2">Lifecycle Monitoring</div>
  </div>
</div>
      {/* ================= PILOT VALIDATION ================= */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              Validation
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              600-Box Integrated Pilot
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-4 gap-16 text-neutral-400">
            {[
              ["Units", "600"],
              ["Target Survival", "≥80%"],
              ["Annualized Output", "~1 Ton"],
              ["Production Model", "365 Days"],
            ].map(([label, value], i) => (
              <Reveal key={i}>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {label}
                  </p>
                  <p className="text-4xl font-semibold mt-3 text-neutral-100">
                    {value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY PREVIEW ================= */}
      <section className="py-32 px-6 border-t border-white/10 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              Technology
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              AquaOS™ Biological Intelligence
            </h2>
            <p className="mt-8 text-neutral-400 max-w-3xl">
              Infrastructure-integrated modeling for survival optimization,
              molt timing prediction, mortality risk classification,
              and carbon-accountable aquaculture.
            </p>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-12 text-neutral-400">
            <div>
              <h3 className="text-neutral-100 font-semibold">
                Closed-Loop Architecture
              </h3>
              <p className="mt-4 text-sm">
                Physical infrastructure, sensors, and predictive models unified
                into a single operational intelligence layer.
              </p>
            </div>

            <div>
              <h3 className="text-neutral-100 font-semibold">
                Biological Risk Stabilization
              </h3>
              <p className="mt-4 text-sm">
                Reduced molting mortality through lifecycle modeling.
              </p>
            </div>

            <div>
              <h3 className="text-neutral-100 font-semibold">
                Crab Carbon Index (CCI™)
              </h3>
              <p className="mt-4 text-sm">
                Production-linked carbon accountability aligned with Blue Economy frameworks.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <a
              href="/technology"
              className="inline-block px-8 py-4 bg-white text-black rounded-md shadow-lg shadow-white/10 hover:opacity-90 transition"
            >
              Explore Full Architecture
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}