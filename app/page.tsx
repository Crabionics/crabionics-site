"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroParticles from "@/app/components/HeroParticles";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <main className="w-full">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[100vh] overflow-hidden">

        {/* Background Image */}
        <Image
          src="/hero-crabionics.png"
          alt="Crabionics AquaOS"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-[70%_center]
            sm:object-[65%_center]
            md:object-center
          "
        />

        {/* Particles */}
        <HeroParticles />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Scroll Fade Wrapper */}
        <div
          className="relative z-10 flex h-full items-center transition-opacity duration-300"
          style={{ opacity }}
        >
          <div className="mx-auto w-full max-w-6xl px-6">

            <div className="max-w-xl">

              {/* Label */}
              <p className="text-teal-400 text-xs tracking-widest uppercase mb-4">
                Crabionics Aquaculture OS
              </p>

              {/* Heading */}
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">

                Engineering{" "}
                <span className="text-teal-400 animate-pulse">
                  Predictable
                </span>
                <br />
                Crustacean Production

              </h1>

              {/* Subtext */}
              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed">
                Closed-loop biological control powered by modular RAS,
                real-time sensing, and AI-driven decision systems.
              </p>

            </div>

          </div>
        </div>

      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-xs uppercase tracking-widest text-teal-600 mb-4">
            Crabionics Aquaculture OS
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            From Biological Uncertainty to Controlled Production Systems
          </h2>

          <p className="mt-6 text-slate-600 text-base max-w-2xl mx-auto">
            Crabionics builds a closed-loop aquaculture operating system combining
            modular RAS infrastructure, real-time sensing, and AI-driven decision systems.
          </p>

        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-3">

          <div className="rounded-xl border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">AI for Precision</h3>
            <p className="text-sm text-slate-600 mt-2">
              Real-time biological monitoring and predictive decision models.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">Carbon Smart Farming</h3>
            <p className="text-sm text-slate-600 mt-2">
              Integrated mangrove-based systems and sustainable aquaculture practices.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">Data-Driven Scaling</h3>
            <p className="text-sm text-slate-600 mt-2">
              Continuous learning loops enabling predictable production.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}