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
        title="See an observation become a traceable next step."
      >
        <p className={s.lead}>
          Choose a sample observation and follow an operator review, a follow-up task and its history. This website preview is separate from the proposed AquaOS beta.
        </p>
      </Intro>
      <Section>
        <BetaDemo />
      </Section>
      <Section tone="mist">
        <VisualFacts
          items={[
            ["habitat", "A concrete example", "An individual-habitat feeding round"],
            [
              "decision",
              "With operator oversight",
              "People review the next step",
            ],
            ["record", "What to help shape", "Useful context & follow-up"],
          ]}
        />
        <div className={s.note}>
          <p>
            This demonstrates a proposed software workflow. It does not
            demonstrate a complete biological control loop or connected
            equipment.
          </p>
        </div>
        <Button href="/early-access">Help shape early access</Button>
      </Section>

    </Page>
  );
}
