import Link from "next/link";

const institutions = [
  { name: "KIIT-TBI",         role: "Incubation" },
  { name: "DST NIDHI PRAYAS", role: "Innovation Support" },
  { name: "BIRAC BIG",        role: "Grant — 24th Call" },
];

const recentMilestones = [
  {
    year: "2026",
    title: "BIRAC BIG Grant — 24th Call",
    body:  "Awarded under BIRAC's Biotechnology Ignition Grant.",
  },
  {
    year: "2025",
    title: "Pilot Infrastructure Scaling",
    body:  "Expansion toward multi-system architecture: hatchery, nursery, soft-shell, RAS finishing.",
  },
  {
    year: "2024",
    title: "KIIT-TBI Incubation",
    body:  "Incubated under KIIT Technology Business Incubator for commercialization and scaling.",
  },
];

export default function HomeValidationStrip() {
  return (
    <section className="section-light section-padding section-divider">

      <div className="container-shell">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs uppercase tracking-[0.22em] text-cyan-700">
            Validation & Execution
          </p>

          <h2 className="mt-5">
            Institutionally backed, field-executed
          </h2>

          <p className="mt-6 text-lg">
            Crabionics has progressed through institutional checkpoints
            that validate both the science and the execution path.
          </p>
        </div>

        {/* LOGOS */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">

          {institutions.map((item) => (
            <div
              key={item.name}
              className="card-light rounded-2xl p-5 text-center"
            >

              {/* LOGO PLACEHOLDER */}
              <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/60 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Logo — {item.name}
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-900">
                {item.name}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-700">
                {item.role}
              </p>
            </div>
          ))}
        </div>

        {/* RECENT MILESTONES */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">

          {recentMilestones.map((m) => (
            <div
              key={m.title}
              className="card-light rounded-2xl p-6"
            >

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                {m.year}
              </p>

              <p className="mt-3 text-base font-semibold text-slate-900">
                {m.title}
              </p>

              <p className="mt-3 text-sm">
                {m.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">

          <Link href="/capital" className="secondary-button">
            See the full timeline →
          </Link>
        </div>
      </div>
    </section>
  );
}
