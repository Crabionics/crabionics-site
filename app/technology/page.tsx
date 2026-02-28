import Reveal from "@/app/components/Reveal";

export default function Technology() {
  return (
    <main className="bg-neutral-950 text-neutral-100">

      {/* ================= HERO ================= */}
      <section className="py-36 px-6 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-neutral-500">
            Domain Intelligence
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
            AquaOS™ Biological Intelligence Architecture
          </h1>
          <p className="mt-8 text-neutral-400 max-w-3xl mx-auto">
            Infrastructure-integrated modeling for survival optimization,
            molt timing prediction, mortality risk classification,
            and carbon-accountable aquaculture.
          </p>
        </Reveal>
      </section>

      {/* ================= ARCHITECTURE STACK ================= */}
      <section className="py-36 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">

          <Reveal>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              System Architecture
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Closed-Loop Infrastructure Intelligence
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-8 text-neutral-400">

            {[
              ["Physical Layer", "Vertical RAS infrastructure, individual grow-out boxes, controlled water systems."],
              ["Sensor Layer", "Dissolved oxygen, nitrate, temperature, salinity, and lifecycle event capture."],
              ["Data Layer", "Structured identity, environmental, operational, and yield metrics."],
              ["Model Layer", "Molt timing prediction, mortality risk classification, survival optimization."],
              ["Decision Layer", "Harvest window optimization, feeding control, cost-per-kg stabilization."],
            ].map(([title, desc], i) => (
              <Reveal key={i}>
                <div className="border border-white/10 p-8 rounded-md">
                  <h3 className="text-lg font-semibold text-neutral-100">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm">{desc}</p>
                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* ================= BIOLOGICAL MODULES ================= */}
      <section className="py-36 px-6 border-t border-white/10 bg-neutral-900">
        <div className="max-w-6xl mx-auto">

          <Reveal>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              Intelligence Modules
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Biological Risk Stabilization
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-16 text-neutral-400">

            <Reveal>
              <div>
                <h3 className="text-neutral-100 font-semibold">
                  Molt Timing Prediction
                </h3>
                <p className="mt-4 text-sm">
                  Identifies high-risk molting windows to reduce cannibalism and mortality.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h3 className="text-neutral-100 font-semibold">
                  Mortality Risk Modeling
                </h3>
                <p className="mt-4 text-sm">
                  Forecasts water quality stress patterns before lethal thresholds occur.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h3 className="text-neutral-100 font-semibold">
                  Harvest Optimization
                </h3>
                <p className="mt-4 text-sm">
                  Aligns size progression, cycle timing, and export-grade yield targets.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= CARBON LAYER ================= */}
      <section className="py-36 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">

          <Reveal>
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              Carbon Accountability
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Crab Carbon Index (CCI™)
            </h2>
            <p className="mt-8 text-neutral-400 max-w-3xl mx-auto">
              Integrates production data with environmental modeling to
              quantify carbon-aligned aquaculture output within Blue Economy frameworks.
            </p>
          </Reveal>

        </div>
      </section>

    </main>
  );
}