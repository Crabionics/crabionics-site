import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-neutral-50 text-neutral-900">
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Contact
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
            One clear next step
          </h1>
          <p className="mt-6 text-lg text-neutral-700 max-w-3xl">
            For accelerator, grant, investor, or technical collaboration
            conversations, email directly.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto border border-neutral-200 bg-white p-8 md:p-10">
          <p className="text-sm uppercase tracking-widest text-neutral-600">Email</p>
          <a
            href="mailto:sameer@crabionics.com"
            className="mt-3 inline-block text-2xl font-semibold tracking-tight text-neutral-900 hover:underline"
          >
            sameer@crabionics.com
          </a>

          <div className="mt-10 grid md:grid-cols-2 gap-6 text-sm text-neutral-700">
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="mt-2">Placeholder: add preferred contact number</p>
            </div>
            <div>
              <p className="font-semibold">Calendly</p>
              <p className="mt-2">Placeholder: add meeting link for diligence calls</p>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <p className="text-sm font-semibold text-neutral-800">Before contacting, review:</p>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <Link href="/pilot-roadmap" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
                Pilot &amp; Roadmap
              </Link>
              <Link href="/aquaos" className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:bg-neutral-100">
                AquaOS Overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
