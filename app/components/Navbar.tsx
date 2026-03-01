 "use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/aquaos", label: "AquaOS" },
  { href: "/technology", label: "Technology" },
  { href: "/pilot-roadmap", label: "Pilot & Roadmap" },
  { href: "/blue-economy", label: "Blue Economy" },
  { href: "/capital", label: "Capital" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-neutral-200 z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold text-lg tracking-tight text-neutral-900">
          Crabionics
        </Link>

        <div className="hidden lg:flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs text-neutral-600">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-neutral-900 transition">
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden px-3 py-2 border border-neutral-300 rounded text-sm text-neutral-800 hover:bg-neutral-100 transition"
        >
          Menu
        </button>
      </div>

      {isOpen ? (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 gap-3 text-sm text-neutral-700">
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
          </div>
        </div>
      ) : null}
    </nav>
  );
}
