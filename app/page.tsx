import Image from "next/image";
import Link from "next/link";

import HomeArchitectureMap from "@/app/components/diagrams/HomeArchitectureMap";
import HomePlatformBrief from "@/app/components/sections/HomePlatformBrief";
import HomeValidationStrip from "@/app/components/sections/HomeValidationStrip";
import HomeHeroAnimated from "@/app/components/sections/HomeHeroAnimated";
import {
  IconChip,
  IconDrop,
  IconGlobe,
  IconLeaf,
  IconNetwork,
  IconWifi,
} from "@/app/components/ui/Icons";

const features = [
  { icon: IconDrop,    title: "Integrated RAS",                note: "Modular & Scalable" },
  { icon: IconWifi,    title: "Telemetry-ready Infrastructure", note: "Sensors across the system" },
  { icon: IconChip,    title: "AquaOS Control Architecture",    note: "Automate & Optimize" },
  { icon: IconNetwork, title: "CIN Intelligence Layer",         note: "In development" },
  { icon: IconLeaf,    title: "Designed for Sustainability",    note: "Water · Carbon · Mangroves" },
  { icon: IconGlobe,   title: "Built for Scale",                note: "Processors · Global Markets" },
];

const problems = [
  {
    lead: "Cannibalism",
    title: "Crabs kill each other",
    text: "In a shared pond, the strong tear apart the soft post-molt crabs — entire batches vanish before harvest.",
  },
  {
    lead: "Vulnerability window",
    title: "Molt is a blind spot",
    text: "For the day a new shell takes to harden, the crab is defenseless — and without per-animal visibility, you find out too late.",
  },
  {
    lead: "Environmental drift",
    title: "Water shifts unseen",
    text: "Oxygen, salinity, ammonia and temperature swing with weather and feed — by the time the crab shows symptoms, the cycle is compromised.",
  },
  {
    lead: "No causality",
    title: "Nothing tracked individually",
    text: "A traditional pond gives one number at harvest — no growth history, no molt log, nothing that improves cycle to cycle.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">

      {/* ===========================================================
           HERO — full-bleed infrastructure image composition
         =========================================================== */}
      <section className="relative overflow-hidden">

        {/* background image + legibility scrims */}
        <div className="absolute inset-0">
          <Image
            src="/infrastructure.png"
            alt="Crabionics modular RAS grow-out and AquaOS-instrumented infrastructure on the coast"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/15" />
        </div>

        <div className="container-shell relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24">

          <HomeHeroAnimated />
        </div>
      </section>

      {/* ===========================================================
           FEATURE BAR — full-width dark
         =========================================================== */}
      <section className="relative bg-[#04091a]">

        <div className="container-shell py-6 lg:py-7">

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">

            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-white">
                      {f.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{f.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================================================
           ARCHITECTURE MAP — dark, the signature visual moment
         =========================================================== */}
      <section className="relative overflow-hidden section-padding">

        {/* dark backdrop on top of the global background — reinforces darkness */}
        <div className="pointer-events-none absolute inset-0 bg-[#04091a]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="container-shell relative z-10">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              The architecture
            </p>

            <h2 className="mt-5 text-white">
              From biological systems to <span className="font-display italic text-cyan-200">market outcomes.</span>
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              One system, four layers: modular RAS on the floor, AquaOS turning signal
              into decisions, a CIN learning layer in development, and the market
              outcomes it all drives. Data flows up; control and feedback flow back
              down. The proven layer operates in R&amp;D today; the control and
              intelligence layers are being built.
            </p>
          </div>

          <div className="mt-16">
            <HomeArchitectureMap />
          </div>
        </div>
      </section>

      {/* ===========================================================
           WHAT'S REAL TODAY — proof of operation, leads before the problem
         =========================================================== */}
      <section className="section-light section-padding section-divider">

        <div className="container-shell">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
              What&rsquo;s real today
            </p>

            <h2 className="mt-5">
              We have already operated the hard part
            </h2>

            <p className="mt-6 text-lg">
              Crabionics is a biological production infrastructure company. Before
              any platform claim, three things are proven by real R&amp;D operations.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">

            {[
              {
                lead: "Operational R&D history",
                title: "Hundreds of individually-tracked crabs",
                text: "Across soft-shell, hard-shell and RAS trials — each animal logged per-unit, not as a pond average. The operating experience is real, not theoretical.",
              },
              {
                lead: "Proven value mechanics",
                title: "Molt-driven grade uplift",
                text: "A single molt can roughly double an animal's weight and lift it a full export grade — demonstrated meaningful grade uplift in early field work. Documented, repeatable economics.",
              },
              {
                lead: "Real market linkage",
                title: "Live export & retail channels",
                text: "Already operating through live export and retail channels with grade-based pricing — the demand side is commercial, not hypothetical.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-light rounded-2xl p-7"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                  {item.lead}
                </p>

                <h3 className="mt-4 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
           PROBLEM — light
         =========================================================== */}
      <section className="section-light section-padding section-divider">

        <div className="container-shell">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
              The problem
            </p>

            <h2 className="mt-5">
              Mud crab farming was never designed as a controlled system
            </h2>

            <p className="mt-6 text-lg">
              Forty years, no change in production architecture — and the
              numbers still look like this:
            </p>
          </div>

          {/* Hard numbers strip */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-4">
            {[
              { value: "50–70%", label: "Cycle mortality" },
              { value: "$51",    label: "Europe — per unit" },
              { value: "4,500 t", label: "India annual export" },
              { value: "100%",   label: "Wild-seed dependency" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
              >
                <p className="text-2xl font-semibold text-slate-900">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cyan-700">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {problems.map((item) => (
              <div
                key={item.title}
                className="card-light rounded-2xl p-7"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                  {item.lead}
                </p>

                <h3 className="mt-4 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium text-slate-700">
            Crabionics converts biological uncertainty into repeatable production.
          </p>
        </div>
      </section>

      {/* ===========================================================
           PLATFORM BRIEF — light
         =========================================================== */}
      <HomePlatformBrief />

      {/* ===========================================================
           VALIDATION STRIP — light
         =========================================================== */}
      <HomeValidationStrip />

      {/* ===========================================================
           AUDIENCE SPLIT — two paths, light
         =========================================================== */}
      <section className="section-light section-padding section-divider">

        <div className="container-shell">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
              Where to next
            </p>

            <h2 className="mt-5">
              Two ways to engage Crabionics
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">

            {[
              {
                tag: "For investors",
                title: "Back the validation inflection",
                text: "An operationally-experienced team entering its first controlled-validation phase. See the thesis, milestones, and what the capital unlocks.",
                cta: "Investor Brief",
                href: "/capital",
              },
              {
                tag: "For processors & buyers",
                title: "Secure export-grade supply",
                text: "A 365-day pipeline of export-spec live and soft-shell crab — built on modular RAS and AquaOS, not a seasonal gamble.",
                cta: "Explore the Platform",
                href: "/platform",
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="card-light flex flex-col rounded-2xl p-8"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                  {item.tag}
                </p>

                <h3 className="mt-4 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm">
                  {item.text}
                </p>

                <div className="mt-7">
                  <Link href={item.href} className="primary-button">
                    {item.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
           FINAL CTA — dark, single statement
         =========================================================== */}
      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0 bg-[#04091a]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="container-shell relative z-10 py-32 text-center lg:py-44">

          <p className="mx-auto max-w-2xl text-base text-slate-300">
            The 600-box pilot is the bridge — from operational intelligence to
            provable industrial causality.
          </p>

          <h2
            className="font-display mx-auto mt-6 max-w-4xl text-center text-white"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.05 }}
          >
            Want to see it <em className="text-cyan-200">run?</em>
          </h2>

          <div className="mt-12">

            <Link href="/contact" className="primary-button">
              Contact founder
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
