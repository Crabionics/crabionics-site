import Image from "next/image";
import Link from "next/link";

const platformLinks = [
  {
    label: "Platform",
    href: "/platform",
  },

  {
    label: "AquaOS",
    href: "/aquaos",
  },

  {
    label: "Technology",
    href: "/technology",
  },

  {
    label: "Capital",
    href: "/capital",
  },
];

const companyLinks = [
  {
    label: "Team",
    href: "/team",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Press",
    href: "/press",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">

      {/* GLOW */}
      <div className="absolute left-[-10%] bottom-[-20%] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container-shell relative z-10 py-20">

        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.7fr_0.8fr]">

          {/* LEFT */}
          <div>

            {/* LOGO */}
            <div className="flex items-start gap-4">

              <Image
                src="/logo.png"
                alt="Crabionics"
                width={52}
                height={52}
                className="h-12 w-auto"
              />

              <div>

                <p className="text-2xl font-semibold text-white">
                  Crabionics Aquaculture
                </p>

                <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">
                  Production Architecture
                </p>
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-400">
              Building the system that makes industrial-scale
              crustacean production possible — modular RAS,
              AquaOS, telemetry, and closed-loop control.
            </p>

            {/* TAGS */}
            <div className="mt-10 flex flex-wrap gap-3">

              {[
                { label: "AquaOS Active",      tone: "green" as const },
                { label: "Closed-loop Control", tone: "ocean" as const },
              ].map((item) => (
                <div
                  key={item.label}
                  className={
                    item.tone === "green"
                      ? "rounded-full border border-[#25B947]/30 bg-[#25B947]/10 px-5 py-3 text-sm text-[#5DD27A]"
                      : "rounded-full border border-[#1DA8DD]/30 bg-[#1DA8DD]/10 px-5 py-3 text-sm text-[#5AC4EA]"
                  }
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* PLATFORM */}
          <div>

            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Platform
            </p>

            <div className="mt-8 flex flex-col gap-5">

              {platformLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>

            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Company
            </p>

            <div className="mt-8 flex flex-col gap-5">

              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CONTACT */}
            <div className="mt-14">

              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
                Contact
              </p>

              <a
                href="mailto:sameer@crabionics.com"
                className="mt-5 inline-block text-3xl font-medium text-cyan-200 transition hover:text-cyan-100"
              >
                sameer@crabionics.com
              </a>

              <p className="mt-6 text-base leading-relaxed text-slate-400">
                For partnerships, pilot deployments,
                technical collaboration, and investment inquiries.
              </p>

              {/* Company LinkedIn */}
              <a
                href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Crabionics on LinkedIn"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* LOWER */}
        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.
          </p>

          <div className="flex flex-wrap items-center gap-4">

            <p>
              Production Architecture for Crustacean Aquaculture
            </p>

            <div className="flex items-center gap-4">

              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms",   href: "/terms"   },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-slate-300"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Crabionics on LinkedIn"
                className="transition hover:text-slate-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
