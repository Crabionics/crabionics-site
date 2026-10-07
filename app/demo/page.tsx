import type { Metadata } from "next";
import BetaDemo from "../components/public/BetaDemo";
import {
  Button,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import { VisualFacts } from "../components/public/Visuals";
export const metadata: Metadata = {
  title: "Explore AquaOS",
  description:
    "Explore an illustrative AquaOS operator workflow with sample information, then express early-access interest.",
  alternates: { canonical: "/demo" },
};
export default function DemoPage() {
  return (
    <Page name="demo">
      <Intro
        eyebrow="AquaOS / Illustrative workflow preview"
        title="One feeding round. A connected operating history."
      >
        <p className={s.lead}>
          Follow habitat B-12 from an observation to an operator review, assigned inspection and recorded outcome. Watch its history build as you record each sample entry.
        </p>
      </Intro>
      <Section>
        <BetaDemo />
      </Section>
      <Section tone="mist">
        <VisualFacts
          items={[
            ["habitat", "Know the setting", "One crab, one habitat, one operating round"],
            [
              "decision",
              "Make the next step visible",
              "An operator reviews & assigns follow-up",
            ],
            ["record", "Keep the evidence together", "Observation, action & recorded outcome"],
          ]}
        />
        <div className={s.note}>
          <p>
            Illustrative prototype, not a live farm workspace. The proposed beta will test agreed operator routines; copilot assistance and equipment integration require their own development and validation.
          </p>
        </div>
        <Button href="/early-access">Help shape an operator pilot</Button>
      </Section>

    </Page>
  );
}
