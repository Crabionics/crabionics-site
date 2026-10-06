import type { Metadata } from "next";
import {
  Button,
  CTA,
  Eyebrow,
  Heading,
  Intro,
  ImagePanel,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import { VisualFacts } from "../components/public/Visuals";
import v from "../components/public/Refinements.module.css";
export const metadata: Metadata = {
  title: "Research & Validation",
  description:
    "The current research, next learning steps and proposed validation for Crabionics.",
  alternates: { canonical: "/validation" },
};
export default function ValidationPage() {
  return (
    <Page name="validation">
      <Intro
        eyebrow="Research & production validation"
        title="Measure the response. Earn the next step."
        aside={<ImagePanel src="/images/versioned/sensing.b79a337c.webp" alt="Concept illustration of environmental measurements in a mud-crab habitat." caption="Concept illustration · sensing context" priority />}
      >
        <p className={s.lead}>
          Integration, biology and commercial fit each need their own evidence.
        </p>
        <Button href="/contact#research">Discuss a research partnership</Button>
      </Intro>
      <Section tone="mist">
        <Heading
          eyebrow="Development pathway"
          title="Current work. Next learning. Proposed validation."
        />
        <div className={v.states}>
          <div id="research-integration">
            <small>Current / development</small>
            <strong>Research & integration</strong>
            <p>
              Funded IHMS work: components, observations and operating routines.
            </p>
          </div>
          <div id="pond-biology">
            <small>Production learning</small>
            <strong>Biological & production learning</strong>
            <p>
              Defined protocols and scientific ownership before biological trials; pond baselines and cohort learning.
            </p>
          </div>
          <div id="controlled-finishing">
            <small>Proposed / later</small>
            <strong>600-box finishing validation</strong>
            <p>
              Intake, survival, growth, occupancy and operating repeatability.
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <Heading
          eyebrow="What we need to measure"
          title="Three parts of the evidence."
        />
        <VisualFacts
          items={[
            ["pod", "Physical integration", "Commands & equipment responses"],
            ["habitat", "Biological outcomes", "Cohorts over time"],
            ["market", "Commercial fit", "Routines, costs & requirements"],
          ]}
        />
      </Section>
      <Section tone="mist" id="demand-adoption">
        <div className={s.split}>
          <div>
            <Eyebrow>Demand & adoption</Eyebrow>
            <h2>Learn from the people doing the work.</h2>
            <p>
              Producer needs and buyer specifications inform the next step. Verified interest is a discovery signal; actual use, willingness to pay and repeat orders need separate evidence.
            </p>
            <Button href="/early-access">Share your interest</Button>
          </div>
          <div className={v.roadmap}>
            {[
              ["Unit", "Integration & measured outcomes"],
              ["Connections", "Supply, transfer & buyer requirements"],
              ["Network", "Repeatability, adoption & economics"],
            ].map(([title, detail], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.note}>
          <p>
            Broader deployment depends on repeatable evidence. Proposed work is
            not a published performance result.
          </p>
        </div>
      </Section>
      <CTA
        href="/contact#research"
        label="Discuss the research setting"
        title="Bring a question we can examine."
      />
    </Page>
  );
}
