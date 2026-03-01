import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-neutral-600 text-base">
        <div>
          <p className="text-neutral-900 font-semibold tracking-tight">
            Crabionics Aquaculture Pvt. Ltd.
          </p>
          <p className="mt-3 max-w-md">
            Building a controllable mud crab production system through modular
            RAS infrastructure and AquaOS.
          </p>
        </div>

        <div>
          <p>Built in India</p>
          <p className="mt-2">Focused on execution, not hype.</p>
        </div>

        <div>
          <p className="text-neutral-900 font-semibold">Sitemap</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            <Link href="/">Home</Link>
            <Link href="/aquaos">AquaOS</Link>
            <Link href="/technology">Technology</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/pilot-roadmap">Pilot &amp; Roadmap</Link>
            <Link href="/blue-economy">Blue Economy</Link>
            <Link href="/capital">Capital</Link>
            <Link href="/team">Team</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="md:col-span-3">
          <p>© 2026 Crabionics</p>
        </div>
      </div>
    </footer>
  );
}
