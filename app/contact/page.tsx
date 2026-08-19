import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact", description: "Talk to Crabionics about pilots, technology, investment and partnerships." };

export default function ContactPage() {
  return <div className="bg-white text-slate-900">
    <section className="bg-[#f5f8fb] py-24 lg:py-32"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Contact</p><h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#102C5C] sm:text-6xl">Let’s talk about production.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">We are open to conversations with producers, processors, research partners, technology partners and investors.</p><a href="mailto:sameer@crabionics.com" className="mt-9 inline-flex rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">sameer@crabionics.com</a></div></section>
    <section className="py-20 lg:py-28"><div className="container-shell grid gap-6 md:grid-cols-2 lg:grid-cols-4">{[["Pilot","Production pilots and field deployment."],["Technology","Hardware, sensing, software and integration."],["Commercial","Processor, buyer and supply partnerships."],["Investment","Capital and strategic investment conversations."]].map(([title,text])=><div key={title} className="rounded-2xl border border-slate-200 p-7"><h2 className="text-xl font-semibold text-[#102C5C]">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></section>
    <section className="bg-[#102C5C] py-16"><div className="container-shell flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold text-white">Prefer to understand the system first?</h2><p className="mt-2 text-slate-300">Start with the technology or current validation programme.</p></div><div className="flex flex-wrap gap-3"><Link href="/technology" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102C5C]">Technology</Link><Link href="/validation" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">Validation</Link></div></div></section>
  </div>;
}
