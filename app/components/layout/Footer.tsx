import Image from "next/image";
import Link from "next/link";

const platformLinks = [
  { href: "/platform", label: "Platform" },
  { href: "/aquaos", label: "AquaOS" },
  { href: "/technology", label: "Technology" },
  { href: "/infrastructure", label: "Infrastructure" },
];

const companyLinks = [
  { href: "/capital", label: "Capital" },
  { href: "/blue-economy", label: "Blue Economy" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-400/[0.03]" />

      <div className="container-shell relative z-10">

        {/* TOP */}
        <div className="grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-4">

              <Image
                src="/logo.png"
                alt="Crabionics"
                width={44}
                height={44}
                className="h-11 w-auto"
              />

              <div>
                <p className="text-lg font-semibold tracking-tight text-white">
                  Crabionics
                </p>

                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/60">
                  Precision Aquaculture Infrastructure
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-lg text-slate-400">
              Building closed-loop biological infrastructure for predictable
              mud crab production through modular RAS systems, AquaOS,
              automation, and intelligence-driven operations.
            </p>

            {/* STATUS */}
            <div className="mt-8 flex flex-wrap gap-3">

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
                AquaOS Active
              </div>

              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200">
                Closed-loop Infrastructure
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Platform
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {platformLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CONTACT */}
            <div className="mt-10">

              <p className="text-sm text-slate-500">
                Contact
              </p>

              <a
                href="mailto:sameer@crabionics.com"
                className="mt-2 inline-block text-cyan-200 hover:text-white"
              >
                sameer@crabionics.com
              </a>

              <p className="mt-4 text-sm text-slate-500">
                For partnerships, pilot deployments,
                technical collaboration, and investment inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.
          </p>

          <div className="flex items-center gap-6">
            <span>Precision Aquaculture</span>
            <span>Biological Infrastructure</span>
            <span>AquaOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}