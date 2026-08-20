import Image from "next/image";
import Link from "next/link";

const institutions = [
  {
    name:    "DPIIT · Startup India",
    role:    "Recognised Startup",
    logo:    "/logos/dpiit-startup-india.png",
    alt:     "DPIIT — Department for Promotion of Industry and Internal Trade, Government of India",
  },
  {
    name:    "KIIT-TBI",
    role:    "Incubation",
    logo:    "/logos/kiit-tbi.png",
    alt:     "KIIT-TBI — KIIT Technology Business Incubator",
  },
  {
    name:    "DST NIDHI PRAYAS",
    role:    "Innovation Support",
    logo:    "/logos/dst-nidhi-prayas.png",
    alt:     "DST NIDHI PRAYAS — Department of Science & Technology, India",
  },
  {
    name:    "BIRAC BIG",
    role:    "Grant — 24th Call",
    logo:    "/logos/birac-big.png",
    alt:     "BIRAC — Biotechnology Industry Research Assistance Council",
  },
];

const recentMilestones = [
  {
    year: "May 2026",
    title: "DPIIT Recognition",
    body:  "Government of India recognised Crabionics as a startup under Agriculture / Fisheries (DIPP261048).",
  },
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
            Each name below has put capital or infrastructure behind us.
          </p>
        </div>

        {/* LOGOS */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {institutions.map((item) => (
            <div
              key={item.name}
              className="card-light rounded-2xl p-5 text-center"
            >

              {/* LOGO */}
              <div className="relative mx-auto flex h-14 w-full items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.alt}
                  width={200}
                  height={56}
                  className="max-h-12 w-auto object-contain"
                />
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
