import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Predictable Mud Crab Grow-Out",
  description:
    "Crabionics builds a closed-loop aquaculture operating system combining modular RAS, sensing, and biological control.",
};

export default function Home() {
  return (
    <main className="bg-neutral-50 text-neutral-900">

      {/* HERO */}
      <section className="border-b border-neutral-200 bg-white mt-6 md:mt-10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-12 md:py-28">

          <div className="md:col-span-7">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
              Crabionics Aquaculture OS
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Engineering Predictable Crustacean Production
            </h1>

            <p className="mt-8 text-lg text-neutral-700">
              Crabionics builds a closed-loop aquaculture operating system combining modular RAS,
              real-time sensing, and biological control logic.
            </p>

            <p className="mt-4 font-medium text-neutral-800">
              From biological uncertainty to controlled production systems
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="bg-neutral-900 px-6 py-3 text-white">
                Request Technical Brief / Demo
              </Link>

              <Link href="/pilot-roadmap" className="border border-neutral-300 px-6 py-3 hover:bg-neutral-100">
                See Pilot Results & KPIs
              </Link>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="md:col-span-5">
            <article className="border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Crabionics" width={40} height={40} />
                <div>
                  <p className="font-semibold tracking-tight">CRABIONICS</p>
                  <p className="text-xs uppercase text-neutral-500">
                    Aquaculture OS
                  </p>
                </div>
              </div>

              <p className="mt-5 text-neutral-700">
                Closed-loop biological control for predictable production.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat value="600" label="Active Units" />
                <Stat value="TRL 6–7" label="System Stage" />
                <Stat value="Live" label="AquaOS Status" />
              </div>
            </article>
          </div>

          {/* SIGNAL CARDS */}
          <div className="md:col-span-12">
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <Card title="Deployment" text="600-unit modular RAS system operating under controlled conditions." />
              <Card title="Control Layer" text="AquaOS executing rule-based biological decisions across cycles." />
              <Card title="Execution Track" text="BIRAC BIG and NIDHI aligned for scaled deployment." />
            </div>
          </div>
        </div>
      </section>

      {/* AQUAOS CONTROL LOOP */}
      <section className="px-6 py-20 border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-3xl font-semibold">
            AquaOS Control Loop
          </h2>

          <p className="mt-4 text-neutral-700">
            AquaOS converts biological signals into decisions and actions through a continuous closed-loop system.
          </p>

          <div className="mt-10">
            <Image
              src="/aquaos-diagram.png"
              alt="AquaOS system"
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
      <section className="py-20 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold">Choose your path</h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Link href="/capital" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Investors</p>
              <p className="mt-3 text-neutral-700">Review KPIs, roadmap, and capital readiness.</p>
            </Link>

            <Link href="/contact" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Farmers</p>
              <p className="mt-3 text-neutral-700">Discuss deployment and pilot collaboration.</p>
            </Link>

            <Link href="/pilot-roadmap" className="border p-6 hover:bg-neutral-100">
              <p className="font-semibold">For Partners</p>
              <p className="mt-3 text-neutral-700">See integration roadmap and milestones.</p>
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
      <section className="py-20 px-6 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold">How AquaOS improves survival</h2>

          <p className="mt-6 text-neutral-700">
            AquaOS converts environmental and behavioral signals into executable decisions across feeding, isolation, and recovery.
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

function Card({ title, text }: any) {
  return (
    <div className="border border-neutral-200 bg-white p-6">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-neutral-700">{text}</p>
    </div>
  );
}

function Stat({ value, label }: any) {
  return (
    <div className="border bg-white p-4">
      <p className="font-semibold">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}