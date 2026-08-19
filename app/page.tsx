import Image from "next/image";
import Link from "next/link";

const layers = [
  ["Habitat", "Controlled environment for individual production.", "/photos/isolation-box.jpg"],
  ["CrabSense", "Telemetry for water, environment and production state.", "/photos/sensor-node.jpg"],
  ["CrabPod", "Edge control for the physical production system.", "/photos/ras-plumbing.jpg"],
  ["AquaOS", "The operating layer connecting events, SOPs and decisions.", "/aquaos-diagram.png"],
];

const institutions = [
  ["BIRAC BIG", "Funded R&D", "/logos/birac-big.png"],
  ["DST NIDHI PRAYAS", "Deep-tech innovation support", "/logos/dst-nidhi-prayas.png"],
  ["KIIT-TBI", "Technology incubation", "/logos/kiit-tbi.png"],
  ["DPIIT / Startup India", "Startup recognition", "/logos/dpiit-startup-india.png"],
];

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#071a36] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(29,168,221,0.18),transparent_30%),linear-gradient(115deg,#06172f_0%,#0b2b55_58%,#071a36_100%)]" />
        <div className="container-shell relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Precision aquaculture · Scylla serrata</p>
              <h1 className="mt-6 max-w-2xl text-[3.6rem] font-semibold leading-[0.92] tracking-[-0.065em] text-white sm:text-[5rem] lg:text-[5.7rem]">The production system for mud crab.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">Crabionics is engineering the physical and digital infrastructure to make high-value mud crab production controlled, measurable and repeatable.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/technology" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#102C5C] transition hover:-translate-y-0.5">Explore the platform <span className="ml-2">→</span></Link>
                <Link href="/validation" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5">See what we are proving</Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a2447] shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
                <Image src="/infrastructure.png" alt="Crabionics production infrastructure" width={1200} height={900} priority className="h-[360px] w-full object-cover sm:h-[500px] lg:h-[590px]" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#071a36]/92 px-5 py-4 shadow-xl backdrop-blur-md sm:left-8 sm:right-8">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-slate-300">
                  <span>Habitat</span><span className="text-cyan-300">→</span><span>CrabSense</span><span className="text-cyan-300">→</span><span>CrabPod</span><span className="text-cyan-300">→</span><span>AquaOS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid border-t border-white/10 pt-7 sm:grid-cols-4">
            {[
              ["R&amp;D", "BIRAC BIG"],
              ["Pilot", "600 boxes"],
              ["Field", "Pond + RAS"],
              ["Focus", "Mud crab"],
            ].map(([label, value]) => (
              <div key={label} className="border-white/10 py-3 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f7fafc]">
        <div className="container-shell grid gap-8 py-14 lg:grid-cols-[1fr_1fr_1fr] lg:items-start">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168bb8]">The problem</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#102C5C]">A valuable crab is still a difficult animal to produce consistently.</h2></div>
          <p className="text-base leading-7 text-slate-600">Growth, moulting, water quality and survival interact. Small operational errors can become biological losses.</p>
          <p className="text-base leading-7 text-slate-600">Our answer is not another dashboard. It is a production system designed around the biology of the crab.</p>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-shell">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168bb8]">The platform</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#102C5C] sm:text-5xl">Physical infrastructure first. Intelligence on top.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Four layers work together to turn a fragmented farm process into a measurable production system.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {layers.map(([title, description, image], index) => (
              <article key={title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/60">
                <div className="relative h-52 overflow-hidden bg-slate-100"><Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
                <div className="p-6"><div className="text-xs font-bold tracking-[0.16em] text-[#168bb8]">0{index + 1}</div><h3 className="mt-3 text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-9"><Link href="/technology" className="text-sm font-semibold text-[#168bb8]">See how the stack works →</Link></div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#102C5C] py-20 text-white lg:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Built around the animal</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">The crab is the unit of production.</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate-200">Every system decision should ultimately improve a biological outcome that can be measured and traced.</p></div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {["Individual habitat", "Water-quality control", "Molt and growth events", "Traceable production records"].map((item, index) => <div key={item} className="bg-[#102C5C] p-7"><span className="text-xs font-bold tracking-[0.16em] text-cyan-200">0{index + 1}</span><p className="mt-4 text-base font-semibold text-white">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-20 lg:py-28">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168bb8]">Validation</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#102C5C] sm:text-5xl">We are building evidence in parallel.</h2><p className="mt-5 text-lg leading-8 text-slate-600">BIRAC R&amp;D, a pond programme and a 600-box finishing pilot each test a different part of the business.</p></div><Link href="/validation" className="text-sm font-semibold text-[#168bb8]">View the programme →</Link></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["BIRAC / IHMS", "Pond production", "600-box finishing"].map((title, index) => <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#168bb8]">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold text-[#102C5C]">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{index === 0 ? "Funded R&D for the intelligent hatchery and production intelligence stack." : index === 1 ? "Field evidence on biomass production and biological performance." : "Controlled finishing to test repeatability, operating cost and unit economics."}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168bb8]">Institutional backing</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#102C5C] sm:text-4xl">Supported by the Indian innovation ecosystem.</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Support across incubation, deep-tech innovation and funded R&amp;D.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {institutions.map(([name, caption, logo]) => <div key={name} className="flex min-h-[145px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"><div className="relative h-12 w-full"><Image src={logo} alt={name} fill sizes="220px" className="object-contain object-left" /></div><div className="mt-6"><p className="text-sm font-semibold text-[#102C5C]">{name}</p><p className="mt-1 text-xs leading-5 text-slate-500">{caption}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-20 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168bb8]">The next stage</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#102C5C] sm:text-5xl">Validate the system. Then scale what works.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">We are looking for capital, pilot partners and technical collaborators who want to help turn controlled production into a repeatable commercial system.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end"><Link href="/investors" className="rounded-full bg-[#102C5C] px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5">Investor overview</Link><Link href="/contact" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-[#102C5C]">Partner with us</Link></div>
        </div>
      </section>
    </div>
  );
}
