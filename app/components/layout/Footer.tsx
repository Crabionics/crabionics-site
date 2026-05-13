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
    label: "Contact",
    href: "/contact",
  },
  {
    label: "About",
    href: "/about",
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
                "AquaOS Active",
                "Closed-loop Control",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-200"
                >
                  {item}
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
            </div>
          </div>
        </div>

        {/* LOWER */}
        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.
          </p>

          <div className="flex items-center gap-4">

            <p>
              Production Architecture for Crustacean Aquaculture
            </p>

            <div className="flex items-center gap-4">

              {[
                {
                  label: "Privacy",
                  href: "/privacy",
                },
                {
                  label: "Terms",
                  href: "/terms",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-slate-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
