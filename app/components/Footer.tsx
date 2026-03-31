import Image from "next/image";
import Link from "next/link";

const sitemapLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Infrastructure" },
  { href: "/aquaos", label: "AquaOS" },
  { href: "/technology", label: "Technology" },
  { href: "/pilot-roadmap", label: "Pilots & Data" },
  { href: "/blue-economy", label: "Impact" },
  { href: "/capital", label: "Investors" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 px-6 py-16 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 text-base text-slate-600 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Crabionics logo" width={38} height={40} />
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              Crabionics Aquaculture Pvt. Ltd.
            </p>
          </div>
          <p className="mt-3 max-w-md">
            Building controllable mud crab production through modular RAS
            infrastructure and AquaOS-driven operations.
          </p>
          <p className="mt-4 text-sm text-slate-500">Smart. Sustainable. Scalable.</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Get in touch</p>
          <a
            className="mt-3 inline-block text-slate-700 hover:text-teal-700"
            href="mailto:sameer@crabionics.com"
          >
            sameer@crabionics.com
          </a>
          <p className="mt-3 text-sm text-slate-500">
            For pilot collaboration, technical brief requests, and investment
            diligence.
          </p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Sitemap</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {sitemapLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-teal-700">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500 md:col-span-3">
          © {new Date().getFullYear()} Crabionics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
