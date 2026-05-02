"use client";

import Image from "next/image";
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
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return `relative px-2 py-1 text-sm transition ${
      isActive
        ? "text-neutral-900 font-medium"
        : "text-neutral-600 hover:text-neutral-900"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* LEFT - BRAND */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Crabionics logo"
            width={32}
            height={32}
            priority
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">
              Crabionics
            </p>
            <p className="text-[11px] uppercase text-neutral-500 tracking-wide">
              Aquaculture OS
            </p>
          </div>
        </Link>

        {/* CENTER NAV */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-neutral-900" />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="text-sm border border-neutral-300 px-4 py-2 hover:bg-neutral-100 transition"
          >
            Contact
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden border border-neutral-300 px-3 py-2 text-sm"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-neutral-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-neutral-700 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 border border-neutral-300 px-4 py-2 text-center text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}