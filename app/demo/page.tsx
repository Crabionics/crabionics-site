import type { Metadata } from "next";
import BetaDemo from "../components/public/BetaDemo";
import {
  Button,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import { BetaDirection, VisualFacts } from "../components/public/Visuals";
export const metadata: Metadata = {
  title: "Explore AquaOS",
  description:
    "Try a sample pond observation and operating-record walkthrough, then help shape the AquaOS beta.",
  alternates: { canonical: "/demo" },
};
export default function DemoPage() {
  return (
    <Page name="demo">
      <Intro
        eyebrow="AquaOS / Explore the beta direction"
        title="From an observation to an operating history."
      >
        <p className={s.lead}>
          Try four steps with sample information. See the workflow we want to
          shape with producers.
        </p>
      </Intro>
      <Section>
        <BetaDemo />
      </Section>
      <Section tone="mist">
        <VisualFacts
          items={[
            ["pond", "For pond teams", "Daily observations & records"],
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
      <BetaDirection />
    </Page>
  );
}
