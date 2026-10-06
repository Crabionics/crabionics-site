import type { Metadata } from "next";
import {
  Button,
  CTA,
  Flow,
  Heading,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import {
  AnnotatedProduction,
  ConnectedDiagram,
  VisualFacts,
} from "../components/public/Visuals";
export const metadata: Metadata = {
  title: "The Connected System",
  description:
    "See how habitat, CrabSense, AquaOS and CrabPod connect under operator oversight.",
  alternates: { canonical: "/system" },
};
export default function SystemPage() {
  return (
    <Page name="system">
      <Intro
        eyebrow="How it connects"
        title="One setting. Four connected roles."
      >
        <p className={s.lead}>
          Observe conditions, review the context, connect a bounded response and
          keep the history.
        </p>
        <Button href="/demo">Explore the record walkthrough</Button>
      </Intro>
      <Section>
        <ConnectedDiagram />
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="The physical setting"
          title="See the production environment."
        />
        <AnnotatedProduction />
        <div className={s.note}>
          <p>
            Production photograph: supporting equipment varies by setting. This
            image does not demonstrate a complete control loop.
          </p>
        </div>
      </Section>
      <Section>
        <VisualFacts
          items={[
            ["habitat", "Habitat", "Care & handling"],
            ["sense", "CrabSense", "Observations in context"],
            ["decision", "AquaOS", "Operator review & history"],
          ]}
        />
        <div id="habitat" />
        <div id="observation" />
        <div id="decisions" />
        <div style={{ marginTop: 18 }}>
          <VisualFacts
            items={[
              ["pod", "CrabPod", "Local equipment connection"],
              ["pond", "Water environment", "Management for the setting"],
              [
                "record",
                "Measured response",
                "Integration & biology evaluated separately",
              ],
            ]}
          />
        </div>
        <div id="intervention" />
        <div id="water" />
      </Section>
      <Section tone="dark">
        <Heading
          eyebrow="Operating design in development"
          title="Observe. Decide. Respond. Review."
        />
        <Flow />
        <p className={s.note}>
          Operator oversight governs permitted actions. A recorded equipment
          response does not establish a biological outcome.
        </p>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Proposed production connection"
          title="From starting stock to market."
        />
        <Flow production />
        <div className={s.note}>
          <p>
            Intake, transfer condition, biological performance and commercial
            fit need validation in each setting.
          </p>
        </div>
      </Section>
      <CTA href="/contact#technical" label="Discuss the technical scope" />
    </Page>
  );
}
