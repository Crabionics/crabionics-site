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
        title="From a daily observation to a useful operating history."
      >
        <p className={s.lead}>
          A feeding round flags one crab for attention. Explore how a proposed AquaOS workflow connects its setting, an operator review, a follow-up action and the next observation. Each entry must be recorded explicitly in this sample.
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
            This interactive example demonstrates the proposed workflow using sample information. The wider AquaOS direction includes record-grounded assistance and physical integration; neither is demonstrated by this preview.
          </p>
        </div>
        <Button href="/early-access">Help shape an operator pilot</Button>
      </Section>

    </Page>
  );
}
