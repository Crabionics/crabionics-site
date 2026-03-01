"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Infrastructure" },
  { href: "/aquaos", label: "AquaOS" },
  { href: "/technology", label: "Technology & How It Works" },
  { href: "/pilot-roadmap", label: "Pilots & Data" },
  { href: "/blue-economy", label: "Impact" },
  { href: "/capital", label: "Investors" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/92 backdrop-blur border-b border-neutral-200 z-50">
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold text-xl tracking-tight text-neutral-900">
          Crabionics
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm text-neutral-700">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-neutral-900 transition">
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-700 transition"
          >
            Request Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden px-4 py-2.5 border border-neutral-300 rounded text-base text-neutral-800 hover:bg-neutral-100 transition"
        >
          Menu
        </button>
      </div>

      {isOpen ? (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 gap-4 text-base text-neutral-700">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-neutral-900 transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="col-span-2 mt-2 inline-flex items-center justify-center px-4 py-3 bg-neutral-900 text-white text-base font-medium"
            >
              Request Technical Brief / Demo
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
