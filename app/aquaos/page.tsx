import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AquaOS", description: "The operating software layer being developed within the Crabionics production system." };

const cards = [
  ["Record", "What happened?", "Connect production events and observations to the relevant unit, condition and operating context."],
  ["Review", "What changed?", "Make interventions, operating steps and decisions easier to trace and discuss."],
  ["Learn", "What should happen next?", "Keep the record needed to compare conditions, actions and production learning over time."],
];

export default function AquaOSPage() {
  return <div className="bg-white text-slate-900"><section className="bg-[#102C5C] py-24 text-white lg:py-32"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">System / AquaOS</p><h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">A shared operating record for the production team.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">AquaOS is being developed to connect conditions, operating actions, decisions and outcomes around the Crabionics production system.</p></div></section><section className="py-20 lg:py-28"><div className="container-shell"><div className="grid gap-6 md:grid-cols-3">{cards.map(([eyebrow,title,body])=><article key={eyebrow} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#168bb8]">{eyebrow}</p><h2 className="mt-4 text-2xl font-semibold text-[#102C5C]">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{body}</p></article>)}</div><div className="mt-10 rounded-3xl border border-[#a8dfed] bg-[#effafd] p-7 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176d85]">Current status</p><h2 className="mt-3 text-3xl font-semibold text-[#102C5C]">AquaOS is in development.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">The current product direction is records and workflows developed alongside the physical production system.</p></div></div></section><section className="bg-[#f8fafc] py-16"><div className="container-shell flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold text-[#102C5C]">See the complete system.</h2><p className="mt-3 text-slate-600">AquaOS is one part of the physical production conversation.</p></div><Link href="/system" className="rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">How the system works</Link></div></section></div>;
}
