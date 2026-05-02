"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (href: string) => {
    const isActive = pathname === href;

    return `relative px-2 py-1 text-sm transition ${
      scrolled
        ? isActive
          ? "text-slate-900 font-medium"
          : "text-slate-600 hover:text-slate-900"
        : isActive
        ? "text-white font-medium"
        : "text-white/80 hover:text-white"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

        {/* LEFT - BRAND */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Crabionics logo"
            width={34}
            height={34}
            priority
          />

          <div className="leading-tight">
            <p
              className={`text-sm font-semibold tracking-tight ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Crabionics
            </p>
            <p
              className={`text-[11px] uppercase tracking-wide ${
                scrolled ? "text-slate-500" : "text-white/70"
              }`}
            >
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
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] ${
                      scrolled ? "bg-slate-900" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={`text-sm px-4 py-2 border transition ${
              scrolled
                ? "border-slate-300 text-slate-900 hover:bg-slate-100"
                : "border-white/40 text-white hover:bg-white hover:text-black"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`lg:hidden px-3 py-2 text-sm border ${
            scrolled
              ? "border-slate-300 text-slate-900"
              : "border-white/40 text-white"
          }`}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 border border-slate-300 px-4 py-2 text-center text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}