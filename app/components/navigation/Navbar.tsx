"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/system", label: "System" },
  { href: "/producers", label: "For producers" },
  { href: "/validation", label: "Validation" },
  { href: "/company", label: "Company" },
  { href: "/insights", label: "Insights" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const active = (href: string) => pathname === href || (href === "/system" && pathname === "/technology") || (href === "/producers" && pathname === "/why-crab");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${scrolled ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur" : "border-slate-200/70 bg-white/90 backdrop-blur"}`}>
      <div className="container-shell">
        <div className="flex h-[var(--site-header-height)] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Crabionics home">
            <Image src="/logo.png" alt="Crabionics" width={40} height={40} priority className="h-10 w-10" />
            <span className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-[#102C5C]">Crabionics</span>
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => <Link key={item.href} href={item.href} className={`text-sm font-semibold capitalize ${active(item.href) ? "text-[#102C5C]" : "text-slate-600 hover:text-[#102C5C]"}`}>{item.label}</Link>)}
          </nav>
          <Link href="/contact" className="hidden rounded-full bg-[#102C5C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A1F45] lg:inline-flex">Talk to us</Link>
          <button type="button" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white lg:hidden">
            <span className="sr-only">Menu</span><div className="flex flex-col gap-1"><span className={`h-0.5 w-5 bg-[#102C5C] transition ${isOpen ? "translate-y-1.5 rotate-45" : ""}`} /><span className={`h-0.5 w-5 bg-[#102C5C] transition ${isOpen ? "opacity-0" : ""}`} /><span className={`h-0.5 w-5 bg-[#102C5C] transition ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`} /></div>
          </button>
        </div>
      </div>
      <div aria-hidden={!isOpen} className={`absolute left-0 right-0 top-[var(--site-header-height)] min-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-slate-200 bg-white shadow-xl transition-opacity duration-200 lg:hidden ${isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}>
        <div className="container-shell py-8"><nav aria-label="Mobile navigation" className="flex flex-col gap-2">
          {navLinks.map((item) => <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-2xl font-semibold capitalize text-[#102C5C] hover:bg-[#f2f7fa]">{item.label}</Link>)}
          <Link href="/contact" className="mt-5 inline-flex w-fit rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">Talk to us</Link>
        </nav></div>
      </div>
    </header>
  );
}
