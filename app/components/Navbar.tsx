"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link href="/" className="font-semibold text-lg tracking-tight text-neutral-100">
          Crabionics
        </Link>

        <div className="hidden md:flex gap-12 text-sm text-neutral-400">
          <Link href="/platform" className="hover:text-neutral-100 transition">Platform</Link>
          <Link href="/technology" className="hover:text-neutral-100 transition">Technology</Link>
          <Link href="/blue-economy" className="hover:text-neutral-100 transition">Blue Economy</Link>
          <Link href="/capital" className="hover:text-neutral-100 transition">Capital</Link>
        </div>

        <Link
          href="/contact"
          className="px-6 py-2 border border-white/20 rounded-md text-sm hover:bg-white hover:text-black transition"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}