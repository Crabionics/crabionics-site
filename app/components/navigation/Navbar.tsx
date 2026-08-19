"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/technology", label: "Platform" },
  { href: "/validation", label: "Validation" },
  { href: "/investors", label: "Investors" },
  { href: "/company", label: "Company" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl" : "border-b border-slate-200/60 bg-white/90 backdrop-blur-xl"}`}>
      <div className="container-shell">
        <div className="flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Crabionics home">
            <Image src="/logo.png" alt="Crabionics" width={42} height={42} priority className="h-10 w-10" />
            <span className="text-[1.45rem] font-extrabold tracking-[-0.035em] text-[#102C5C]">Crabionics</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href === "/technology" && pathname === "/aquaos");
              return <Link key={item.href} href={item.href} className={`relative py-2 text-sm font-semibold transition ${active ? "text-[#102C5C] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[#1DA8DD]" : "text-slate-500 hover:text-[#102C5C]"}`}>{item.label}</Link>;
            })}
          </nav>

          <div className="hidden lg:block">
            <Link href="/contact" className="rounded-full bg-[#102C5C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0A1F45]">Partner with us</Link>
          </div>

          <button type="button" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden">
            <div className="flex flex-col gap-1.5">
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div aria-hidden={!isOpen} className={`absolute left-0 right-0 top-[76px] z-[60] min-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-200 bg-white shadow-2xl transition-all duration-200 lg:hidden ${isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}>
        <div className="container-shell py-8">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            <Link href="/" className="border-b border-slate-100 py-4 text-2xl font-semibold text-[#102C5C]">Home</Link>
            {navLinks.map((item) => <Link key={item.href} href={item.href} className="border-b border-slate-100 py-4 text-2xl font-semibold text-slate-700">{item.label}</Link>)}
            <Link href="/why-crab" className="border-b border-slate-100 py-4 text-2xl font-semibold text-slate-700">Why mud crab</Link>
            <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#102C5C] px-5 py-3.5 text-sm font-semibold text-white">Partner with us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
