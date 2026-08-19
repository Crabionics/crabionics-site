"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/technology", label: "Technology" },
  { href: "/why-crab", label: "Why Crab" },
  { href: "/validation", label: "Validation" },
  { href: "/investors", label: "Investors" },
  { href: "/company", label: "Company & Team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${scrolled ? "border-slate-200/80 bg-white/95 backdrop-blur" : "border-transparent bg-white/85 backdrop-blur"}`}>
      <div className="container-shell">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Crabionics" width={40} height={40} priority className="h-10 w-10" />
            <span className="text-[1.45rem] font-extrabold tracking-[-0.03em] text-[#102C5C]">Crabionics</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm font-medium ${pathname === item.href ? "text-[#102C5C]" : "text-slate-600 hover:text-[#102C5C]"}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/contact" className="rounded-full bg-[#102C5C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A1F45]">Partner with us</Link>
          </div>

          <button type="button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white lg:hidden">
            <div className="flex flex-col gap-1">
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu: an opaque panel below the fixed header. */}
      <div
        aria-hidden={!isOpen}
        className={`absolute left-0 right-0 top-[72px] z-[60] min-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-xl transition-opacity duration-200 lg:hidden ${isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
      >
        <div className="container-shell py-8">
          <nav className="flex flex-col gap-6">
            <Link href="/" className="text-2xl font-semibold text-[#102C5C]">Home</Link>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-2xl font-semibold text-slate-700">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2 inline-flex w-fit rounded-full bg-[#102C5C] px-5 py-3 text-sm font-semibold text-white">Partner with us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
