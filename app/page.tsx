"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroParticles from "@/app/components/HeroParticles";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <main className="w-full overflow-x-hidden">
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/infrastructure.png"
          alt="Crabionics modular aquaculture infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <HeroParticles />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/55 to-teal-950/20" />

        <div className="relative z-10 flex h-full items-center" style={{ opacity }}>
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card max-w-2xl p-8 sm:p-10"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.22em] text-teal-100/90">Crabionics Aquaculture OS</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Premium Aquaculture Infrastructure With AI-Native Control.
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-100/90 sm:text-lg">
                We combine modular RAS engineering, biological intelligence, and digital twin automation to deliver stable, scalable, and export-grade production.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-xs uppercase tracking-widest text-teal-700">Crabionics Aquaculture OS</p>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">From Biological Uncertainty to Controlled Production Systems</h2>
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            Crabionics builds a closed-loop aquaculture operating system combining modular RAS infrastructure, real-time sensing, and AI-driven decision systems.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
