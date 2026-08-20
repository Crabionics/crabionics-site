import Link from "next/link";

const layers = [
  {
    title: "Modular RAS",
    description: "Closed-loop water systems, isolation modules, precision grow-out.",
    status: "Stage 1 · Current",
    color: "emerald",
    href: "/platform",
  },
  {
    title: "CrabPod Edge",
    description: "Sensor integration and low-latency local infrastructure control.",
    status: "Stage 2 · Developing",
    color: "cyan",
    href: "/platform",
  },
  {
    title: "AquaOS",
    description: "Telemetry aggregation, biological state, decision logic.",
    status: "Stage 2 · Developing",
    color: "cyan",
    href: "/platform",
  },
  {
    title: "HatchSync",
    description: "Hatchery intelligence and seed security layer.",
    status: "Stage 2 · Developing",
    color: "cyan",
    href: "/platform",
  },
  {
    title: "CIN",
    description: "Cross-farm benchmarking and distributed learning.",
    status: "Stage 3 · Long-term",
    color: "slate",
    href: "/platform",
  },
] as const;

const colorMap = {
  emerald: "border-[#25B947]/40 bg-[#25B947]/10 text-[#1B7E32]",
  cyan:    "border-[#1DA8DD]/40 bg-[#1DA8DD]/10 text-[#0E6F9B]",
  slate:   "border-slate-300 bg-slate-50 text-slate-600",
} as const;

export default function HomePlatformBrief() {
  return (
    <section className="section-light section-padding section-divider">

      <div className="container-shell">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs uppercase tracking-[0.22em] text-cyan-700">
            Platform at a Glance
          </p>

          <h2 className="mt-5">
            Five layers, one production system
          </h2>

          <p className="mt-6 text-lg">
            Crabionics is built bottom-up — hardware first, then telemetry,
            then control, then the network. Each layer is at a different
            stage of maturity.
          </p>
        </div>

        {/* TILES */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {layers.map((layer, index) => (
            <Link
              key={layer.title}
              href={layer.href}
              className="card-light group block rounded-2xl p-6 transition"
            >

              <p className="font-mono text-xs text-slate-400">
                0{index + 1}
              </p>

              <h3 className="mt-3 text-lg font-semibold">
                {layer.title}
              </h3>

              <p className="mt-3 text-sm">
                {layer.description}
              </p>

              <div className={`mt-5 inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${colorMap[layer.color]}`}>
                {layer.status}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">

          <Link href="/platform" className="primary-button">
            Explore Platform &amp; Technology
          </Link>
        </div>
      </div>
    </section>
  );
}
