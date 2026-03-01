import Link from "next/link";

export default function TeamPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Team
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
            Founder
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto border border-neutral-200 bg-white p-8 md:p-10">
          <p className="text-sm uppercase tracking-widest text-neutral-600">Founder</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Sameer Kumar Dalai</h2>
          <p className="mt-2 text-neutral-700">Role: Founder</p>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Sameer Kumar Dalai has worked hands-on in mud crab RAS operations,
            with a practical focus on field execution and system-level control.
            His work centers on turning biologically volatile grow-out into a
            repeatable production workflow, with long-term commitment to
            aquaculture infrastructure and operations.
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link href="/pilot-roadmap" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
              Review Execution Roadmap
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
              Contact Sameer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
