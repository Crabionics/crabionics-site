import Image from "next/image";
import Link from "next/link";

const layers = [
  ["Habitat", "Individual production environment around the crab.", "/photos/isolation-box.jpg"],
  ["CrabSense", "Water-quality and operational telemetry.", "/photos/sensor-node.jpg"],
  ["CrabPod", "Local hardware for flow, flush and other controls.", "/photos/ras-plumbing.jpg"],
  ["AquaOS", "Production records, rules, decisions and outcomes.", "/aquaos-diagram.png"],
];

const institutions = [
  ["DPIIT / Startup India", "Government startup recognition", "/logos/dpiit-startup-india.png"],
  ["BIRAC BIG", "Biotechnology Ignition Grant — 24th call", "/logos/birac-big.png"],
  ["DST NIDHI PRAYAS", "Deep-tech innovation support", "/logos/dst-nidhi-prayas.png"],
  ["KIIT-TBI", "Technology incubation and ecosystem", "/logos/kiit-tbi.png"],
];

const biology = [
  ["Aggression", "Individual habitat and handling matter because crabs cannot simply be managed as one uniform biomass."],
  ["Moulting", "Growth changes the animal's state and creates periods when handling and environmental control matter more."],
  ["Water quality", "Dissolved oxygen, salinity, temperature and nitrogen compounds can directly affect production."],
  ["Traceability", "Useful records need to connect the animal, environment, intervention and outcome."],
];

const evidence = [
  ["Biology", "Can controlled conditions improve survival, growth and moulting outcomes?"],
  ["Engineering", "Can habitat, water treatment, sensing and actuation operate reliably as one system?"],
  ["Economics", "Can controlled finishing produce repeatable unit economics?"],
  ["Commercial", "Can the system create enough value for producers and downstream buyers to adopt it?"],
];

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#f5f8fb]">
        <div className="container-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168bb8]">Crabionics Aquaculture</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#102C5C] sm:text-6xl lg:text-[4.7rem]">Precision infrastructure for mud crab farming.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">We are building the production infrastructure and operating layer that makes mud crab farming more controlled, measurable and repeatable.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/platform" className="rounded-full bg-[#102C5C] px-6 py-3 text-sm font-semibold text-white">See the technology</Link>
              <Link href="/validation" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#102C5C]">See the validation</Link>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(16,44,92,0.16)]">
            <Image src="/hero-crabionics.png" alt="Crabionics mud crab production system" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-shell grid gap-8 py-14 md:grid-cols-[1.05fr_1fr_1fr]">
          <div><p className="text-sm font-semibold text-[#168bb8]">The opportunity</p><h2 className="mt-2 text-2xl font-semibold text-[#102C5C]">Premium crab needs predictable production.</h2></div>
          <p className="text-sm leading-7 text-slate-600">Mud crab is a high-value seafood product, but production remains exposed to biological variability, water-quality changes and inconsistent operating practices.</p>
          <p className="text-sm leading-7 text-slate-600">The production problem is not only water management. It is the interaction between the animal, its habitat, the environment and the operator.</p>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20 lg:py-24">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Why mud crab</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[#102C5C] sm:text-5xl">The biology drives the system design.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Crabionics starts with the animal and works outward. Habitat, water, handling and production records are designed around the biology rather than added as separate farm tools.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {biology.map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></article>)}
          </div>
          <Link href="/why-crab" className="mt-8 inline-flex text-sm font-semibold text-[#168bb8]">Why mud crab is our wedge →</Link>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">The system</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[#102C5C] sm:text-5xl">One production system, four layers.</h2><p className="mt-5 text-lg leading-8 text-slate-600">The technology spine connects the physical habitat to sensing, local control and production software.</p></div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {layers.map(([title, description, image]) => (
              <article key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-48 bg-slate-100"><Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" /></div>
                <div className="p-6"><h3 className="text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Operating loop</p>
            <div className="mt-5 grid gap-4 text-sm font-semibold text-[#102C5C] sm:grid-cols-5">
              {["Sense", "Decide", "Act", "Test", "Learn / Escalate"].map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#102C5C] text-xs text-white">{index + 1}</span><span>{step}</span></div>)}
            </div>
          </div>
          <div className="mt-8 text-center"><Link href="/platform" className="text-sm font-semibold text-[#168bb8]">Explore the full technology stack →</Link></div>
        </div>
      </section>

      <section className="bg-[#102C5C] py-20 text-white lg:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">From farm to platform</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">Build the production system first. Turn the evidence into intelligence.</h2></div>
            <div className="grid gap-8 sm:grid-cols-3">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">01</p><h3 className="mt-3 text-xl font-semibold">Habitat</h3><p className="mt-3 text-sm leading-6 text-slate-300">Control the physical production environment around the crab.</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">02</p><h3 className="mt-3 text-xl font-semibold">Telemetry</h3><p className="mt-3 text-sm leading-6 text-slate-300">Capture environmental and operational state with provenance.</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">03</p><h3 className="mt-3 text-xl font-semibold">Operating intelligence</h3><p className="mt-3 text-sm leading-6 text-slate-300">Connect events, SOPs, decisions and outcomes through AquaOS.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Current validation</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-[#102C5C] sm:text-5xl">Four questions, tested in parallel.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Funded R&amp;D, pond production, controlled finishing and commercial work each retire a different risk before scale.</p></div><Link href="/validation" className="text-sm font-semibold text-[#168bb8]">See the validation programme →</Link></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {evidence.map(([title, question], index) => <article key={title} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-7"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168bb8]">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{question}</p></article>)}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["BIRAC / IHMS — funded R&D", "Pond production — field biology", "600-box finishing — controlled production"].map((item) => <div key={item} className="border-l-2 border-[#42b6dc] pl-4 text-sm font-medium text-slate-700">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 lg:py-20">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">What we measure</p><h2 className="mt-3 text-3xl font-semibold text-[#102C5C] sm:text-4xl">Production evidence, not presentation metrics.</h2><p className="mt-4 text-slate-600">The validation programme is designed to connect biological outcomes to operating conditions, interventions and economics.</p></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Survival", "Growth and harvest weight", "Molt events", "Water quality", "Feed and labour", "Energy and operating cost", "Interventions and outcomes", "Cycle repeatability"].map((item) => <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 lg:py-16">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#168bb8]">Institutional backing</p><h2 className="mt-3 text-3xl font-semibold text-[#102C5C] sm:text-4xl">Built with support from India's innovation ecosystem.</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {institutions.map(([name, caption, logo]) => (
              <div key={name} className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="relative h-12 w-full"><Image src={logo} alt={name} fill sizes="220px" className="object-contain object-left" /></div>
                <div className="mt-5"><p className="font-semibold text-[#102C5C]">{name}</p><p className="mt-1 text-xs leading-5 text-slate-500">{caption}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102C5C] py-18 text-white lg:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">For investors</p><h2 className="mt-3 text-3xl font-semibold text-white">The next capital is for validation.</h2><p className="mt-4 max-w-xl text-slate-300">The objective is to establish repeatable production evidence across technology, biology, economics and commercial demand before scaling deployment.</p><Link href="/investors" className="mt-6 inline-flex text-sm font-semibold text-[#65c7e8]">Investor overview →</Link></div>
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">For producers and processors</p><h2 className="mt-3 text-3xl font-semibold text-white">Talk to us about the production system.</h2><p className="mt-4 max-w-xl text-slate-300">We are looking for pilot, production, processing and technology partners as the system moves through field validation.</p><Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-[#65c7e8]">Start a conversation →</Link></div>
        </div>
      </section>
    </div>
  );
}
