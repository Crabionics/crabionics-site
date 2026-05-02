import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full">

      {/* ================= HERO ================= */}
      <section className="relative h-[100vh] w-full overflow-hidden">

        {/* Background Image */}
        <Image
          src="/hero-crabionics.png"
          alt="Crabionics AquaOS"
          fill
          priority
          className="object-cover object-[75%_center] sm:object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-end sm:items-center">

          <div className="px-6 pb-12 sm:pb-0 max-w-2xl text-white">

            <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
              Engineering Predictable
              <br />
              Crustacean Production
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200">
              Closed-loop biological control powered by modular RAS,
              real-time sensing, and AI-driven decision systems.
            </p>

            <div className="mt-6 flex gap-4">

              <Link
                href="/contact"
                className="bg-teal-600 px-5 py-3 text-sm font-medium hover:bg-teal-700 transition"
              >
                Request Technical Brief
              </Link>

              <Link
                href="/pilot-roadmap"
                className="border border-white px-5 py-3 text-sm hover:bg-white hover:text-black transition"
              >
                View Pilot Data
              </Link>

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
            <h3 className="text-lg font-semibold text-slate-900">
              AI for Precision
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Real-time biological monitoring and predictive decision models.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Carbon Smart Farming
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Integrated mangrove-based systems and sustainable aquaculture practices.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Data-Driven Scaling
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Continuous learning loops enabling predictable and repeatable production.
            </p>
          </div>

        </div>
      </section>


      {/* ================= SECTION 4 ================= */}
      <section className="bg-slate-900 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-3xl font-semibold">
            Build Predictable Crab Production Systems
          </h2>

          <p className="mt-4 text-slate-300">
            Explore AquaOS, infrastructure modules, and pilot deployments.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Link
              href="/aquaos"
              className="bg-teal-600 px-6 py-3 text-white font-medium hover:bg-teal-700 transition"
            >
              Explore AquaOS
            </Link>

            <Link
              href="/contact"
              className="border border-white px-6 py-3 hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}