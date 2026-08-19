import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GlassCard from "@/app/components/ui/GlassCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Team | Crabionics",
  description:
    "Meet the founders and technical ecosystem building the production infrastructure and operating system for precision mud crab aquaculture.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Crabionics Team",
    description: "The people building the physical, biological, and software layers of precision mud crab production.",
    url: "https://crabionics.com/team",
    type: "website",
  },
};

const founders = [
  {
    name: "Sameer Kumar Dalai",
    role: "Co-Founder & CEO",
    photo: "/team/sameer-kumar-dalai.jpg",
    alt: "Sameer Kumar Dalai — Co-Founder & CEO, Crabionics",
    email: "sameer@crabionics.com",
    linkedin: "https://www.linkedin.com/in/sameer-kumar-dalai-9014737a/",
    bullets: [
      "Systems architecture and RAS operations",
      "Hatchery systems, biological production, and operating protocols",
      "Field execution across Odisha and Andhra Pradesh",
    ],
  },
  {
    name: "M Abhishek",
    role: "Co-Founder & CTO",
    photo: "/team/m-abhishek.jpg",
    alt: "M Abhishek — Co-Founder & CTO, Crabionics",
    email: "abhishek@crabionics.com",
    linkedin: "https://www.linkedin.com/in/marediabhishek/",
    bullets: [
      "AI / ML and full-stack software systems",
      "Analytics, data infrastructure, and intelligence stack",
      "AquaOS platform development",
    ],
  },
];

const support = [
  "KIIT-TBI mentor network",
  "Aquaculture and biological specialists",
  "Engineering and instrumentation specialists",
  "BIRAC technical review ecosystem",
];

export default function TeamPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-shell relative z-10 py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">Team</div>
            <h1 className="mt-8 max-w-4xl">Build the system close to the biology.</h1>
            <p className="mt-8 max-w-3xl text-lg">Crabionics is founder-led across the physical, biological, and software layers, with specialist capability added where the evidence programme requires it.</p>
          </div>
        </div>
      </section>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="The founders" title="One production problem. Multiple technical disciplines." subtitle="The founding team owns the system architecture while research, engineering, and field expertise expand around the validation programme." align="center" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {founders.map((f) => (
            <GlassCard key={f.name} className="overflow-hidden p-8 lg:p-10">
              <div className="relative mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border border-cyan-400/20 bg-white/[0.03]">
                <Image src={f.photo} alt={f.alt} fill sizes="160px" className="object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white">{f.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-cyan-200">{f.role}</p>
                <p className="mt-3 text-sm"><a href={`mailto:${f.email}`} className="text-cyan-200 hover:text-cyan-100">{f.email}</a></p>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-400/20">LinkedIn</a>
              </div>
              <div className="mt-8 space-y-3">
                {f.bullets.map((b) => <div key={b} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" /><p className="text-sm text-slate-300">{b}</p></div>)}
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <SectionHeading eyebrow="Scientific and technical network" title="Capability grows around the experiments." subtitle="We add specialist capacity against defined scientific and engineering workloads rather than building a large organisation ahead of evidence." align="center" />
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((s) => <div key={s} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"><p className="text-sm text-slate-200">{s}</p></div>)}
        </div>
      </SectionWrapper>

      <SectionWrapper className="section-divider">
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Operating principle</p>
              <h2 className="mt-5">Unknown → experiment → capability → person</h2>
              <p className="mt-6 max-w-2xl text-lg">Scientific hiring is part of the validation architecture. The question is not whether a PhD looks good on the team page; it is whether the experimental portfolio creates a sustained capability gap that needs dedicated research capacity.</p>
            </div>
            <div className="space-y-4">
              {["Define the biological or engineering unknown", "Design the experiment and evidence requirement", "Measure the recurring workload", "Choose researcher, PhD, advisor, specialist, or collaboration"].map((item, index) => <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><span className="font-mono text-xs text-cyan-200">0{index + 1}</span><p className="text-sm text-slate-300">{item}</p></div>)}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="glass-card overflow-hidden p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div><p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Work with us</p><h2 className="mt-5 max-w-3xl">Pilot, technical, scientific, and capital conversations are welcome.</h2><p className="mt-5 max-w-2xl text-slate-300">The company is building through evidence. If you can help close a specific capability or deployment gap, talk directly to the team.</p></div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col"><Link href="/contact" className="primary-button">Talk to us</Link><Link href="/capital" className="secondary-button">Investor brief</Link></div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
