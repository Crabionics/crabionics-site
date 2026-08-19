import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Company", description: "The team and ecosystem behind Crabionics." };

const people = [["Sameer Kumar Dalai","Co-Founder & CEO","/team/sameer-kumar-dalai.jpg","Systems architecture, RAS operations and field execution."],["M Abhishek","Co-Founder & CTO","/team/m-abhishek.jpg","AI/ML, software systems and AquaOS development."]];

export default function CompanyPage() {
  return <div className="bg-white text-slate-900">
    <section className="bg-[#f5f8fb] py-20 lg:py-28"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Company</p><h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#102C5C] sm:text-6xl">Built from the farm floor up.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">Crabionics brings field aquaculture, engineering and software together around one production problem: making mud crab farming more controlled and repeatable.</p></div></section>
    <section className="py-20 lg:py-28"><div className="container-shell"><div className="grid gap-6 md:grid-cols-2">{people.map(([name,role,photo,bio])=><article key={name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="relative h-80 bg-slate-100"><Image src={photo} alt={name} fill sizes="50vw" className="object-cover" /></div><div className="p-7"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#168bb8]">{role}</p><h2 className="mt-2 text-2xl font-semibold text-[#102C5C]">{name}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{bio}</p></div></article>)}</div></div></section>
    <section className="bg-[#102C5C] py-20 text-white lg:py-24"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">Ecosystem</p><h2 className="mt-3 text-4xl font-semibold text-white">Built with an ecosystem, not in isolation.</h2><p className="mt-5 text-slate-200">Crabionics works across incubation, research, engineering and government-backed R&amp;D relationships as the production system moves through validation.</p></div><div className="mt-10 flex flex-wrap gap-3">{["KIIT-TBI","BIRAC","DST NIDHI PRAYAS","DPIIT Startup recognition"].map((item)=><span key={item} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100">{item}</span>)}</div></div></section>
    <section className="py-20"><div className="container-shell text-center"><h2 className="text-3xl font-semibold text-[#102C5C]">Looking to build with us?</h2><Link href="/contact" className="mt-7 inline-flex rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">Contact Crabionics</Link></div></section>
  </div>;
}
