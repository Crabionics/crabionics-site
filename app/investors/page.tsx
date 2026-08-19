import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Investors", description: "Crabionics investor overview: market, technology, validation and capital." };

const points = [["Market", "Mud crab is a high-value seafood category with a fragmented production base and a need for more consistent supply."],["Technology", "Crabionics combines controlled habitat, sensing, edge control and production software in one stack."],["Validation", "Funded R&D is running alongside pond production and a 600-box controlled-finishing programme."],["Business", "The long-term model combines production infrastructure with software, service and supply-chain relationships."]];

const institutions = [
  ["DPIIT / Startup India", "Government startup recognition", "DPIIT Startup recognition", "/logos/dpiit-startup-india.png"],
  ["BIRAC BIG", "Biotechnology Ignition Grant", "24th call · 2026", "/logos/birac-big.png"],
  ["DST NIDHI PRAYAS", "Department of Science & Technology", "Innovation support", "/logos/dst-nidhi-prayas.png"],
  ["KIIT-TBI", "Technology Business Incubator", "Incubation and ecosystem support", "/logos/kiit-tbi.png"],
];

export default function InvestorsPage() {
  return <div className="bg-white text-slate-900">
    <section className="bg-[#102C5C] py-24 text-white lg:py-32"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">Investor overview</p><h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-6xl">Building the infrastructure for more predictable mud crab production.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">Crabionics is at the transition from prototype and funded R&amp;D to controlled field validation. The next capital should turn technical and biological work into repeatable production evidence.</p></div></section>

    <section className="py-20 lg:py-28"><div className="container-shell"><div className="grid gap-6 md:grid-cols-2">{points.map(([title,text])=><div key={title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-semibold text-[#102C5C]">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>

    <section className="border-y border-slate-200 bg-[#f8fafc] py-16 lg:py-20"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Institutional backing</p><h2 className="mt-3 text-3xl font-semibold text-[#102C5C] sm:text-4xl">Evidence that the company has moved beyond an idea.</h2><p className="mt-4 max-w-2xl text-slate-600">These are institutional relationships and recognitions that support the company's R&amp;D and technology journey.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{institutions.map(([name,role,note,logo])=><article key={name} className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="relative h-14 w-full"><Image src={logo} alt={name} fill sizes="220px" className="object-contain object-left" /></div><div className="mt-6"><h3 className="text-base font-semibold text-[#102C5C]">{name}</h3><p className="mt-1 text-xs font-medium text-slate-500">{role}</p><p className="mt-2 text-xs leading-5 text-slate-500">{note}</p></div></article>)}</div></div></section>

    <section className="bg-[#f5f8fb] py-20 lg:py-28"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Capital pathway</p><h2 className="mt-3 text-4xl font-semibold text-[#102C5C]">Different capital answers different questions.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2">{[["BIRAC / IHMS","Funded R&D and technical development under the approved programme."],["Company validation capital","Pond, 600-box infrastructure, biomass, working capital and non-BIRAC field validation."],["Strategic capital","Potential deployment or commercial partnerships where the partner has a direct economic stake."],["Scale capital","Larger deployment capital after technical, biological, economic and commercial evidence is established."]].map(([title,text])=><div key={title} className="rounded-2xl bg-white p-7"><h3 className="text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>
    <section className="py-20"><div className="container-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-semibold text-[#102C5C]">Interested in the next validation gate?</h2><p className="mt-3 max-w-2xl text-slate-600">We can share the current company, technology and validation picture with investors and strategic partners.</p></div><Link href="/contact" className="rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">Talk to the team</Link></div></section>
  </div>;
}
