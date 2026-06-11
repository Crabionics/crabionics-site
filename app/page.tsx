import Image from "next/image";
import Link from "next/link";

import ClosedLoopRing from "@/app/components/diagrams/ClosedLoopRing";
import HomePlatformBrief from "@/app/components/sections/HomePlatformBrief";
import HomeValidationStrip from "@/app/components/sections/HomeValidationStrip";
import HomeHeroAnimated from "@/app/components/sections/HomeHeroAnimated";

const problems = [
  {
    lead: "Cannibalism",
    title: "Mud crabs kill each other",
    text: "Pack mud crabs into a shared pond and the strong ones tear the soft post-molt crabs apart within hours. Entire batches vanish before harvest. The industry has tried isolation boxes for years — never with the per-animal control to make them work at production scale.",
  },
  {
    lead: "Vulnerability window",
    title: "Molt is a blind spot",
    text: "A mud crab molts every few weeks to grow — and for the day or so the new shell takes to harden, it is defenseless. Without per-animal visibility, you only learn the molt happened when the crab is already gone.",
  },
  {
    lead: "Environmental drift",
    title: "Water shifts faster than you see it",
    text: "Oxygen, salinity, ammonia, temperature — all swing with weather and feed load. By the time symptoms show up in the crab, the cycle is already compromised.",
  },
  {
    lead: "No causality",
    title: "Nothing is tracked individually",
    text: "A traditional mud crab pond gives you one number at harvest. No growth history, no molt log, no link between an action and an outcome — so nothing improves cycle to cycle.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">

      {/* ===========================================================
           HERO — light, centered, serif H1
         =========================================================== */}
      <section className="section-light relative overflow-hidden">

        {/* decorative glows */}
        <div className="pointer-events-none absolute right-[-20%] top-[-15%] h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute left-[-15%] bottom-[-30%] h-[460px] w-[460px] rounded-full bg-teal-300/12 blur-3xl" />

        <div className="container-shell relative z-10 py-24 text-center lg:py-36">

          <HomeHeroAnimated />
        </div>
      </section>

      {/* ===========================================================
           HERO IMAGE STRIP — wide, no caption
         =========================================================== */}
      <section className="section-light relative">

        <div className="container-shell pb-16">

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">

            <div className="relative aspect-[16/9] w-full">

              <Image
                src="/infrastructure.png"
                alt="Crabionics modular grow-out and RAS hardware"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />

              {/* Subtle vignette at the edges */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
            </div>
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
              Forty years, no change in production architecture. Result:
              50–70% mortality per cycle, 100% wild-seed dependency, and
              India exporting just 4,500 tonnes while Europe pays a
              scarcity premium of $51 per unit.
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
           WHAT'S REAL TODAY — proof of operation, before the architecture
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
           CLOSED-LOOP RING — dark, the signature visual moment
         =========================================================== */}
      <section className="relative overflow-hidden section-padding">

        {/* dark backdrop on top of the global background — reinforces darkness */}
        <div className="pointer-events-none absolute inset-0 bg-[#04091a]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="container-shell relative z-10">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              The operating principle
            </p>

            <h2 className="mt-5 text-white">
              <span className="font-display italic text-cyan-200">Every cycle</span> teaches the next.
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              Sensors capture biological and environmental signals. The architecture
              is designed to infer state, compute the right response, and act — then
              log what happened so the next cycle starts smarter. This is the loop
              the platform is being built to run.
            </p>
          </div>

          <div className="mt-16">
            <ClosedLoopRing />
          </div>
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
