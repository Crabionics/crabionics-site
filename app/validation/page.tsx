import type { Metadata } from "next";
import {
  Button,
  CTA,
  Eyebrow,
  Heading,
  Intro,
  Page,
  Section,
  Status,
  styles as s,
} from "../components/public/Experience";
export const metadata: Metadata = {
  title: "Research & Validation",
  description:
    "The questions, settings and measurements behind Crabionics integration, pond biology, proposed controlled-finishing validation and partner discovery.",
  alternates: { canonical: "/validation" },
};
const streams = [
  {
    id: "research-integration",
    title: "Research & integration",
    tag: "Funded research / IHMS",
    status: "Development programme",
    question:
      "Can the physical setting, observations and operating routines work together as intended?",
    measurement:
      "Integration records, equipment responses and operating evidence.",
    note: "This work informs how the components fit together and the next research step.",
  },
  {
    id: "pond-biology",
    title: "Pond biology & biomass",
    tag: "Pond & supply learning",
    status: "Defined production settings",
    question:
      "How does the cohort perform, and can pond production provide suitable biomass for controlled finishing?",
    measurement:
      "Species, seed source, cohort performance, harvest condition and supply timing.",
    note: "This work informs biological learning, suitable intake and connections between production stages.",
  },
  {
    id: "controlled-finishing",
    title: "Controlled finishing",
    tag: "Proposed 600-box validation",
    status: "Proposed later validation",
    question:
      "How does the production unit perform under its intended intake, operating and measurement plan?",
    measurement:
      "Cohort performance, survival, growth, occupancy and operating records.",
    note: "Measured outcomes and operating repeatability would inform the next scale decision.",
  },
  {
    id: "demand-adoption",
    title: "Demand & adoption",
    tag: "Partner discovery",
    status: "Requirements & commercial fit",
    question:
      "What would buyers require, and which partners would adopt or support the integration layer?",
    measurement:
      "Species, size, quantity, cadence, handling, logistics and commercial requirements.",
    note: "Partner learning informs practical fit, adoption and the commercial model.",
  },
];
export default function ValidationPage() {
  return (
    <Page name="validation">
      <Intro
        eyebrow="Research & production validation"
        title="Evidence for the next step."
        links={
          <>
            {streams.map((stream) => (
              <a key={stream.id} href={`#${stream.id}`}>
                {stream.title}
              </a>
            ))}
          </>
        }
      >
        <p className={s.lead}>
          Research, pond biology, controlled finishing and partner work examine
          different parts of the production problem. Each has its own setting,
          question and measurements.
        </p>
        <div className={s.actions}>
          <Button href="/contact#research">
            Explore a research partnership
          </Button>
        </div>
      </Intro>
      <Section>
        <Heading
          eyebrow="The programme"
          title="Clear questions. Defined measurements."
        />
        <div className={s.detailGrid}>
          {streams.map((stream) => (
            <article id={stream.id} className={s.detailBox} key={stream.id}>
              <Eyebrow>{stream.tag}</Eyebrow>
              <h3>{stream.title}</h3>
              <Status>{stream.status}</Status>
              <p style={{ marginTop: 22, fontSize: 18 }}>{stream.question}</p>
              <h4 style={{ fontSize: 15, margin: "24px 0 10px" }}>
                Intended measurements
              </h4>
              <p>{stream.measurement}</p>
              <div className={s.note}>
                <p>{stream.note}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <Heading
          eyebrow="How to read the evidence"
          title="A technical response is one part of the story."
        >
          Integration, biological performance, economics and adoption each need
          their own measurements.
        </Heading>
        <div className={s.three}>
          {[
            [
              "Physical integration",
              "How equipment, observations, commands and responses work together.",
            ],
            [
              "Biological outcomes",
              "What cohorts and production settings show over the relevant period.",
            ],
            [
              "Commercial fit",
              "How the work fits producer routines, costs and buyer requirements.",
            ],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Development pathway"
          title="Learn from the unit, then the connections."
        />
        <ol className={s.flow}>
          {[
            [
              "Production unit",
              "Integration and biological or operating outcomes.",
            ],
            [
              "Production connections",
              "Biomass, transfer condition and buyer requirements.",
            ],
            ["Repeatable cluster", "Adoption, responsibilities and economics."],
            [
              "Wider network",
              "Learning from reliable histories across settings.",
            ],
          ].map(([title, body], i) => (
            <li key={title}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className={s.note}>
          <p>
            The immediate work brings the integrated prototype together. The
            proposed 600-box configuration is a later validation setting.
            Broader deployment depends on what can be repeated in production and
            with partners.
          </p>
        </div>
      </Section>
      <CTA
        title="Bring a production or research question."
        href="/contact#research"
        label="Discuss the research setting"
      />
    </Page>
  );
}
