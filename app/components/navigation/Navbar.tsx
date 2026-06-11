"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/team", label: "Team" },
  { href: "/capital", label: "Capital" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // The homepage hero is a light section; only there (and only while at the
  // top with the menu closed) does the transparent navbar sit over a light
  // background and need dark text. Every other page has a dark hero.
  const onLight = pathname === "/" && !scrolled && !isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-shell">
        <div className="flex h-20 items-center justify-between">

          {/* LEFT */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5"
          >
            <Image
              src="/logo.png"
              alt="Crabionics"
              width={44}
              height={44}
              priority
              className="h-11 w-11"
            />

            <div className="leading-none">
              <p
                className={`text-[1.7rem] font-extrabold tracking-[-0.02em] transition-colors ${
                  onLight ? "text-slate-900" : "text-white"
                }`}
              >
                Crabionics
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm transition ${
                    isActive
                      ? onLight
                        ? "text-slate-900"
                        : "text-white"
                      : onLight
                        ? "text-slate-600 hover:text-slate-900"
                        : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] w-full ${
                        onLight ? "bg-cyan-600" : "bg-cyan-300"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="mailto:sameer@crabionics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button text-sm"
            >
              Request Demo
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-xl transition-colors lg:hidden ${
              onLight
                ? "border-slate-200 bg-white/70 text-slate-900"
                : "border-white/10 bg-white/5 text-white"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`block h-[2px] w-5 transition ${
                  onLight ? "bg-slate-900" : "bg-white"
                } ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />

              <span
                className={`block h-[2px] w-5 transition ${
                  onLight ? "bg-slate-900" : "bg-white"
                } ${isOpen ? "opacity-0" : ""}`}
              />

              <span
                className={`block h-[2px] w-5 transition ${
                  onLight ? "bg-slate-900" : "bg-white"
                } ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#050816] transition-all duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">

          <div className="flex flex-col gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-3xl font-semibold tracking-tight transition ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              href="mailto:sameer@crabionics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
