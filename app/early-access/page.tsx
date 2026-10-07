import type { Metadata } from "next";
import {
  Button,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import EarlyAccessForm from "../components/public/EarlyAccessForm";
import { VisualFacts } from "../components/public/Visuals";
import { registrationConfigured } from "../lib/registration-service";
export const metadata: Metadata = {
  title: "Join Early Access",
  description:
    "Express interest in the proposed AquaOS operator workflow: production setup, observations, history and record-grounded assistance.",
  alternates: { canonical: "/early-access" },
};
export default function EarlyAccessPage() {
  const enabled = registrationConfigured();
  return (
    <Page name="early-access">
      <Intro
        eyebrow="AquaOS / Early-access interest"
        title="Help shape the work that helps your team."
      >
        <p className={s.lead}>
          For growers and operating teams interested in setting up production context, recording observations and returning to a useful history.
        </p>
        <Button href="/demo" secondary>
          Explore the workflow preview first
        </Button>
      </Intro>
      <Section tone="mist">
        <VisualFacts
          items={[
            [
              "record",
              "Proposed beta direction",
              "Setup, observations, history & assistance",
            ],
            ["pond", "Bring your setting", "Region, role & daily routines"],
            ["decision", "Next step together", "Discuss fit, scope & timing"],
          ]}
        />
      </Section>
      <Section>
        <div className={s.split}>
          <div>
            <h2>Tell us where you work.</h2>
            <p>
              The operator beta is in development. Early access is an expression of interest. A place, trial start
              date and equipment integration are not guaranteed.
            </p>
            <h3>What happens next</h3>
            <ol className={s.checklist}>
              <li>{enabled ? "Confirm your email." : "Send your interest email to the team."}</li>
              <li>The team reviews your role and setting.</li>
              <li>Discuss a suitable feedback or pilot opportunity.</li>
            </ol>
          </div>
          <EarlyAccessForm enabled={enabled} />
        </div>
      </Section>
    </Page>
  );
}
