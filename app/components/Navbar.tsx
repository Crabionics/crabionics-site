"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      "rounded-md px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-teal-50 text-teal-800"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          <span className="text-teal-700">Crab</span>ionics
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex flex-wrap justify-end gap-1">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white"
          >
            Request Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 sm:grid-cols-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white sm:col-span-2"
            >
              Request Technical Brief / Demo
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
