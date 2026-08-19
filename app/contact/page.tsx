import type { Metadata } from "next";

import Link from "next/link";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact | Crabionics",
  description: "Talk to Crabionics about pilots, technology, science, partnerships, or capital.",
  alternates: { canonical: "/contact" },
};

const routes = [
  ["Pilot / deployment", "Discuss the nearby pond and 600-box validation programme, site requirements, and operating partnerships.", "sameer@crabionics.com"],
  ["Technology / science", "Discuss RAS, sensing, automation, AquaOS, experiments, research capability, or technical collaboration.", "sameer@crabionics.com"],
  ["Capital / strategic", "Discuss validation capital, processor relationships, strategic partnerships, and the next evidence gate.", "sameer@crabionics.com"],
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Contact</div>
            <h1 className="mt-8 max-w-4xl">Start with the evidence you want to help create.</h1>
            <p className="mt-8 max-w-3xl text-lg">We are currently focused on validation: technology, biology, controlled production, economics, and commercial demand.</p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Talk to the team" title="Choose the conversation" subtitle="Direct founder-level conversations. No generic sales funnel." align="center" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {routes.map(([title, body, email]) => <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"><h3 className="text-xl font-semibold text-white">{title}</h3><p className="mt-4 text-sm text-slate-300">{body}</p><a href={`mailto:${email}`} className="mt-6 inline-block text-sm font-medium text-cyan-200 hover:text-cyan-100">{email}</a></div>)}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card p-10 lg:p-14"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Before the call</p><h2 className="mt-5">Tell us which uncertainty you want to help retire.</h2><p className="mt-5 max-w-2xl text-slate-300">A pilot site, technical capability, scientific collaboration, processor relationship, or capital partnership is most useful when tied to a specific gate.</p></div><Link href="/validation" className="primary-button">See the validation gates</Link></div></div>
      </SectionWrapper>
    </main>
  );
}
