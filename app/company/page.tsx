import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company",
  description: "The team, operating model and institutional ecosystem behind Crabionics.",
};

const people = [
  ["Sameer Kumar Dalai", "Co-Founder & CEO", "/team/sameer-kumar-dalai.jpg", "Systems architecture, RAS operations and field execution."],
  ["M Abhishek", "Co-Founder & CTO", "/team/m-abhishek.jpg", "AI/ML, software systems and AquaOS development."],
];

const institutions = [
  ["KIIT-TBI", "Technology incubation", "/logos/kiit-tbi.png"],
  ["BIRAC BIG", "Funded R&D / IHMS", "/logos/birac-big.png"],
  ["DST NIDHI PRAYAS", "Innovation support", "/logos/dst-nidhi-prayas.png"],
  ["DPIIT / Startup India", "Startup recognition", "/logos/dpiit-startup-india.png"],
];

const capabilities = [
  ["Biology", "Understand the production problem"],
  ["Habitat", "Engineer the production environment"],
  ["Sensing", "Observe biological and system state"],
  ["AquaOS", "Turn state into operating decisions"],
  ["Automation", "Execute repeatable interventions"],
  ["Production", "Measure outcomes and learn"],
];

const architecture = [
  ["Habitat", "Production environment", "Physical foundation", "◈"],
  ["CrabSense", "Sense", "Telemetry / observations", "◌"],
  ["AquaOS", "State → decide", "Decision + event layer", "⌁"],
  ["CrabPod", "Intervene", "Actuator / command execution", "◆"],
  ["BioPod", "Outcome", "Biological response + evidence", "✦"],
];

const maturity = [
  ["Technology integration", "Today", "Current focus"],
  ["Controlled validation", "Next", "Reproducible laboratory evidence"],
  ["Biological validation", "Then", "Measured biological performance"],
  ["Production repeatability", "Future", "600-box → repeatable production"],
];

function FlowIcon({ symbol }: { symbol: string }) {
  return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7fb] text-lg font-semibold text-[#168bb8]" aria-hidden="true">{symbol}</span>;
}

export default function CompanyPage() {
  return <div className="bg-white text-slate-900">
    <section className="bg-[#f5f8fb] py-16 sm:py-20 lg:py-24"><div className="container-shell max-w-5xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Company</p><h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#102C5C] sm:text-6xl lg:text-7xl">Built from the farm floor up.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">Crabionics brings field aquaculture, engineering and software together around one production problem: making mud crab farming more controlled and repeatable.</p></div></section>

    <section className="py-14 sm:py-16 lg:py-20"><div className="container-shell"><div className="grid gap-5 md:grid-cols-2">{people.map(([name,role,photo,bio])=><article key={name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="relative h-72 bg-slate-100 sm:h-80"><Image src={photo} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-6 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168bb8]">{role}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#102C5C]">{name}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{bio}</p></div></article>)}</div>

      <div className="mt-12 rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168bb8]">What we build</p><h2 className="mt-2 max-w-3xl text-2xl font-semibold tracking-[-0.02em] text-[#102C5C]">One company spanning the biological problem, physical production environment and operating software.</h2><div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{capabilities.map(([title,caption],index)=><div key={title} className="relative rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#102C5C] text-xs font-semibold text-white">{index+1}</span><p className="font-semibold text-[#102C5C]">{title}</p></div><p className="mt-3 text-xs leading-5 text-slate-500">{caption}</p>{index<capabilities.length-1&&<span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block" aria-hidden="true">→</span>}</div>)}</div></div>
    </div></section>

    <section className="border-y border-slate-100 py-16 sm:py-20"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Institutional ecosystem</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#102C5C] sm:text-4xl">Incubation, R&amp;D and startup support around the build.</h2></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{institutions.map(([name,caption,logo])=><div key={name} className="flex min-h-[148px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="relative h-12 w-full"><Image src={logo} alt={name} fill sizes="220px" className="object-contain object-left" /></div><div><p className="text-sm font-semibold text-[#102C5C]">{caption}</p><p className="mt-1 text-xs text-slate-500">Institutional support / relationship</p></div></div>)}</div><div className="mt-5 rounded-2xl border border-[#ecd78e] bg-[#fffaf0] px-5 py-4 text-sm font-medium text-[#745a0a]">Support / relationship ≠ product validation.</div></div></section>

    <section className="py-16 sm:py-20 lg:py-24"><div className="container-shell"><div className="flex flex-wrap items-end justify-between gap-5"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">How Crabionics works</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#102C5C] sm:text-4xl">A closed-loop production system.</h2><p className="mt-4 max-w-2xl text-slate-600">The company connects habitat, sensing, decision software, intervention and biological outcome into one operating loop.</p></div><span className="rounded-full border border-[#a8dfed] bg-[#effafd] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#176d85]">Sense → Decide → Intervene → Outcome</span></div><div className="mt-10 grid gap-3 md:grid-cols-5">{architecture.map(([title,stage,caption,symbol],index)=><div key={title} className={`relative rounded-3xl border p-5 ${title==="AquaOS"?"border-[#9ddfca] bg-[#f1fbf7]":title==="BioPod"?"border-[#efc5c5] bg-[#fff7f7]":"border-[#ecd78e] bg-[#fffdf4]"}`}><FlowIcon symbol={symbol}/><p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#176d85]">{stage}</p><h3 className="mt-1 text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{caption}</p>{index<architecture.length-1&&<span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white px-1 text-slate-400 md:block" aria-hidden="true">→</span>}</div>)}</div><div className="mt-5 rounded-2xl border border-slate-200 bg-[#f8fafc] px-5 py-4 text-center text-sm text-slate-600">The intended product is a biological control system: <strong className="text-[#102C5C]">habitat + sensing + decision software + intervention + measured outcome.</strong></div></div></section>

    <section className="bg-[#102C5C] py-16 text-white sm:py-20"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">Where we are now</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Technology integration → controlled validation → biological validation → production repeatability.</h2><p className="mt-4 text-slate-200">The current focus is moving from integrated technology into controlled laboratory validation before claiming biological or commercial validation.</p></div><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{maturity.map(([title,label,caption],index)=><div key={title} className={`rounded-2xl border p-5 ${index===0?"border-[#ecd78e] bg-[#fffaf0] text-[#102C5C]":"border-white/15 bg-white/5 text-white"}`}><div className="flex items-center justify-between gap-3"><span className={`text-xs font-semibold uppercase tracking-[0.14em] ${index===0?"text-[#745a0a]":"text-[#9bd8eb]"}`}>{label}</span><span className="text-xs font-semibold">0{index+1}</span></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className={`mt-2 text-sm leading-6 ${index===0?"text-slate-600":"text-slate-300"}`}>{caption}</p></div>)}</div><div className="mt-6 rounded-2xl border border-[#e9b6b6] bg-[#fff7f7] px-5 py-4 text-sm font-medium text-[#8c3030]">Not yet claimed: biological validation · 600-box repeatability · commercial validation.</div></div></section>

    <section className="py-16 sm:py-20 lg:py-24"><div className="container-shell"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Where we are going</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#102C5C] sm:text-4xl">Building toward repeatable crab production infrastructure.</h2></div><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Today","Controlled technology integration"],["Next","Biological validation"],["Then","600-box production validation"],["Future","Repeatable production + processor/customer network"]].map(([label,text],index)=><div key={label} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#168bb8]">{label}</span><p className="mt-3 font-semibold leading-6 text-[#102C5C]">{text}</p>{index<3&&<span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white px-1 text-slate-400 lg:block" aria-hidden="true">→</span>}</div>)}</div><div className="mt-9 flex flex-wrap gap-3"><Link href="/technology" className="inline-flex rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#173b78]">Explore the technology →</Link><Link href="/validation" className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#102C5C] transition hover:border-[#168bb8]">View validation →</Link></div></div></section>

    <section className="border-t border-slate-100 py-12"><div className="container-shell text-center"><p className="text-sm text-slate-500">Crabionics is being built around a difficult production problem — with biology, engineering and software integrated around the same loop.</p></div></section>
  </div>;
}
