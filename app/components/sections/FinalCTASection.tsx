import Link from "next/link";

import SectionWrapper from "../ui/SectionWrapper";

export default function FinalCTASection() {
  return (
    <SectionWrapper className="overflow-hidden">

      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.02] to-teal-400/[0.06] px-8 py-20 lg:px-16 lg:py-28">

        {/* GLOW */}
        <div className="absolute left-[-10%] top-[-20%] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[320px] w-[320px] rounded-full bg-teal-400/10 blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">

          {/* EYEBROW */}
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
            Precision Aquaculture Infrastructure
          </div>

          {/* HEADLINE */}
          <h2 className="mx-auto mt-8 max-w-4xl">
            Engineering the Future of Biological Production Infrastructure
          </h2>

          {/* TEXT */}
          <p className="mx-auto mt-8 max-w-3xl text-lg">
            Crabionics is building closed-loop biological infrastructure
            combining modular RAS systems, operational intelligence,
            distributed telemetry, and predictive production architecture
            for the next generation of aquaculture.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/contact"
              className="primary-button"
            >
              Partner With Us
            </Link>

            <Link
              href="/capital"
              className="secondary-button"
            >
              View Capital Thesis
            </Link>
          </div>

          {/* LOWER TAGS */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">

            {[
              "AquaOS",
              "Closed-loop Infrastructure",
              "CIN",
              "Precision RAS",
              "Biological Intelligence",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

    </SectionWrapper>
  );
}