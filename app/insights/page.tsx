import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Insights", description: "Early notes on mud-crab production, engineering integration and validation from Crabionics." };

const categories = ["R&D notes", "Engineering milestones", "Pilot design", "Field learning", "Validation results"];

export default function InsightsPage() {
  return <div className="bg-white text-slate-900">
    <section className="bg-[#f5f8fb] py-24 lg:py-32"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Insights</p><h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#102C5C] sm:text-6xl">Notes from the build.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">Crabionics is keeping this channel deliberately focused: practical notes as engineering integration, field learning and validation produce material worth publishing.</p></div></section>
    <section className="py-20 lg:py-28"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Publishing policy</p><h2 className="mt-3 text-3xl font-semibold text-[#102C5C]">Evidence before volume.</h2><p className="mt-5 leading-8 text-slate-600">There are not yet enough genuine public publications to fill a feed. We would rather leave the page sparse than manufacture thought leadership or imply results that have not been independently established.</p></div><div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Future categories</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{categories.map((category, index) => <div key={category} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="text-xs font-semibold text-[#168bb8]">0{index + 1}</span><span className="font-semibold text-[#102C5C]">{category}</span></div>)}</div></div></div></section>
    <section className="bg-[#102C5C] py-16"><div className="container-shell flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold text-white">Want to follow the work directly?</h2><p className="mt-2 text-slate-300">Talk to the team about the system and its validation path.</p></div><Link href="/contact" className="inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#102C5C]">Talk to us</Link></div></section>
  </div>;
}

