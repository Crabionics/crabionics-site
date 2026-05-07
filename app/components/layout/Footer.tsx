import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "AquaOS", href: "/aquaos" },
  { label: "Technology", href: "/technology" },
  { label: "Capital", href: "/capital" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="container-shell relative z-10 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-start gap-4">
              <Image src="/logo.png" alt="Crabionics" width={52} height={52} className="h-12 w-auto" />
              <div>
                <p className="text-2xl font-semibold text-white">Crabionics</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-400">Precision Aquaculture Infrastructure</p>
              </div>
            </div>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-400">
              Engineering a closed-loop biological production platform across modular RAS, AquaOS orchestration, and distributed intelligence networks.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Navigate</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {links.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <a href="mailto:sameer@crabionics.com" className="mt-8 inline-block text-lg font-medium text-cyan-200">
              sameer@crabionics.com
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.
        </div>
      </div>
    </footer>
  );
}
