"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/system", label: "System" },
  { href: "/producers", label: "For Producers" },
  { href: "/validation", label: "Validation" },
  { href: "/company", label: "Company" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${scrolled ? "border-slate-200/80 bg-white/95 backdrop-blur" : "border-transparent bg-white/90 backdrop-blur"}`}>
      <div className="container-shell">
        <div className="flex h-[var(--site-header-height)] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Crabionics home">
            <Image src="/logo.png" alt="Crabionics" width={40} height={40} priority className="h-10 w-10" />
            <span className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-[#102C5C]">Crabionics</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`text-sm font-medium ${isActive(item.href) ? "text-[#102C5C]" : "text-slate-600 hover:text-[#102C5C]"}`}>{item.label}</Link>)}
          </nav>
          <Link href="/contact" className="hidden rounded-full bg-[#102C5C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A1F45] lg:inline-flex">Talk to us</Link>
          <button type="button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white lg:hidden">
            <div className="flex flex-col gap-1"><span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "translate-y-[6px] rotate-45" : ""}`} /><span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "opacity-0" : ""}`} /><span className={`h-[2px] w-5 bg-[#102C5C] transition ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`} /></div>
          </button>
        </div>
      </div>
      <div aria-hidden={!isOpen} className={`absolute left-0 right-0 top-[var(--site-header-height)] z-[60] min-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto border-t border-slate-200 bg-white shadow-xl transition-opacity duration-200 lg:hidden ${isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}>
        <div className="container-shell py-8"><nav className="flex flex-col gap-6" aria-label="Mobile navigation"><Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-[#102C5C]">Home</Link>{navLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-slate-700">{item.label}</Link>)}<Link href="/contact" onClick={() => setIsOpen(false)} className="mt-2 inline-flex w-fit rounded-full bg-[#102C5C] px-5 py-3 text-sm font-semibold text-white">Talk to us</Link></nav></div>
      </div>
    </header>
  );
}
