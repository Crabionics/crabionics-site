import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crabionics | Aquaculture OS",
  description:
    "Closed-loop aquaculture operating system combining modular RAS, sensing, and biological control.",
};

export default function Home() {
  return (
    <main className="bg-neutral-50 text-neutral-900">

      {/* HERO - FULL WIDTH IMAGE */}
      <section className="relative h-[90vh] w-full overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <Image
          src="/hero-crabionics.png"
          alt="Crabionics AquaOS"
          fill
          priority
          className="object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
          <div className="max-w-2xl text-white">

            <p className="text-xs uppercase tracking-[0.3em] text-teal-200">
              Crabionics Aquaculture OS
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Engineering Predictable
              <br />
              Crustacean Production
            </h1>

            <p className="mt-6 text-lg text-neutral-200">
              Closed-loop biological control powered by modular RAS, real-time sensing,
              and AI-driven decision systems.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="bg-teal-600 px-6 py-3 text-white hover:bg-teal-700"
              >
                Request Technical Brief
              </Link>

              <Link
                href="/pilot-roadmap"
                className="border border-white px-6 py-3 text-white hover:bg-white hover:text-black"
              >
                View Pilot Data
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SIGNAL STRIP */}
      <section className="border-b border-neutral-200 bg-white py-12 px-6">
        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-3">
          <Card
            title="Deployment"
            text="600-unit modular RAS system operating under controlled conditions."
          />
          <Card
            title="Control Layer"
            text="AquaOS executing rule-based biological decisions across cycles."
          />
          <Card
            title="Execution Track"
            text="BIRAC BIG and NIDHI aligned for scale and commercialization."
          />
        </div>
      </section>

      {/* CONTROL LOOP */}
      <section className="border-b border-neutral-200 bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-3xl font-semibold">
            AquaOS Control Loop
          </h2>

          <p className="mt-4 text-neutral-700">
            AquaOS converts biological signals into decisions and actions through
            a continuous closed-loop system.
          </p>

          <div className="mt-10">
            <Image
              src="/aquaos-diagram.png"
              alt="AquaOS system diagram"
              width={1400}
              height={800}
              className="rounded-lg shadow-md"
            />
          </div>

          <p className="mt-6 font-medium text-neutral-800">
            This is not monitoring. This is a biological control system.
          </p>

        </div>
      </section>

      {/* CHOOSE PATH */}
      <section className="py-20 px-6 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold">Choose your path</h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Link href="/capital" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Investors</p>
              <p className="mt-3 text-neutral-700">
                Review KPIs, roadmap, and capital readiness.
              </p>
            </Link>

            <Link href="/contact" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Farmers</p>
              <p className="mt-3 text-neutral-700">
                Discuss deployment and pilot collaboration.
              </p>
            </Link>

            <Link href="/pilot-roadmap" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Partners</p>
              <p className="mt-3 text-neutral-700">
                See integration roadmap and milestones.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY RAS */}
      <section className="py-20 px-6 border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold">Why RAS for crabs?</h2>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card title="Problem" text="Cannibalism and molting losses in ponds." />
            <Card title="System" text="Individual control via modular RAS." />
            <Card title="Outcome" text="Predictable cycles and higher survival." />
          </div>
        </div>
      </section>

      {/* AQUAOS LOGIC */}
      <section className="py-20 px-6 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold">
            How AquaOS improves survival
          </h2>

          <p className="mt-6 text-neutral-700">
            AquaOS converts environmental and behavioral signals into executable
            decisions across feeding, isolation, and recovery.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card title="Capture" text="Track biological events at unit level." />
            <Card title="Decide" text="Run risk-based decision logic." />
            <Card title="Act" text="Execute interventions automatically." />
          </div>
        </div>
      </section>

    </main>
  );
}

/* COMPONENTS */

function Card({ title, text }: any) {
  return (
    <div className="border border-neutral-200 bg-white p-6">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-neutral-700">{text}</p>
    </div>
  );
}