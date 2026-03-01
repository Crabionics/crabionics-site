import Reveal from "@/app/components/Reveal";

export default function Contact() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="py-36 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Contact
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Partner With Crabionics
            </h1>
            <p className="mt-8 text-neutral-400 text-lg max-w-3xl">
              Reach out for pilot partnerships, technical collaborations,
              procurement opportunities, or investor conversations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
          <Reveal>
            <aside className="md:col-span-2 border border-white/10 bg-neutral-900 p-8 h-full">
              <h2 className="text-xl font-semibold">Direct Channels</h2>
              <div className="mt-8 space-y-6 text-sm text-neutral-400">
                <div>
                  <p className="text-neutral-300 uppercase tracking-widest text-xs">
                    Email
                  </p>
                  <a
                    className="mt-2 inline-block text-neutral-100 hover:underline"
                    href="mailto:hello@crabionics.com"
                  >
                    hello@crabionics.com
                  </a>
                </div>
                <div>
                  <p className="text-neutral-300 uppercase tracking-widest text-xs">
                    Team
                  </p>
                  <p className="mt-2">Crabionics Aquaculture Pvt. Ltd.</p>
                </div>
                <div>
                  <p className="text-neutral-300 uppercase tracking-widest text-xs">
                    Focus
                  </p>
                  <p className="mt-2">
                    Infrastructure-led mud crab production and biological
                    intelligence systems.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>

          <Reveal>
            <form className="md:col-span-3 border border-white/10 p-8 md:p-10 space-y-6">
              <h2 className="text-xl font-semibold">Send an Inquiry</h2>
              <p className="text-sm text-neutral-400">
                Provide the essentials and the team will respond by email.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                <label className="text-sm">
                  <span className="block mb-2 text-neutral-400">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-white/15 bg-neutral-900 px-4 py-3 outline-none focus:border-white/40"
                  />
                </label>
                <label className="text-sm">
                  <span className="block mb-2 text-neutral-400">
                    Organization
                  </span>
                  <input
                    type="text"
                    name="organization"
                    className="w-full border border-white/15 bg-neutral-900 px-4 py-3 outline-none focus:border-white/40"
                  />
                </label>
              </div>

              <label className="text-sm block">
                <span className="block mb-2 text-neutral-400">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-white/15 bg-neutral-900 px-4 py-3 outline-none focus:border-white/40"
                />
              </label>

              <label className="text-sm block">
                <span className="block mb-2 text-neutral-400">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full border border-white/15 bg-neutral-900 px-4 py-3 outline-none focus:border-white/40"
                />
              </label>

              <button
                type="submit"
                className="px-7 py-3 bg-white text-black text-sm font-medium tracking-wide"
              >
                Submit Inquiry
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
