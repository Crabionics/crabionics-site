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
    "Help shape an AquaOS operator pilot around a real daily production routine, reviewed follow-up and useful operating history.",
  alternates: { canonical: "/early-access" },
};
export default function EarlyAccessPage() {
  const enabled = registrationConfigured();
  return (
    <Page name="early-access">
      <Intro
        eyebrow="AquaOS / Early-access interest"
        title="Help build AquaOS around your daily production work."
      >
        <p className={s.lead}>
          Bring one routine your team needs to manage better—from a feeding round to a follow-up inspection. Help shape a proposed operator pilot that connects what happened, what needs attention and what happened next.
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
              "Bring a real routine",
              "A daily task, its records & a recurring difficulty",
            ],
            ["pond", "Help shape the pilot", "Test a focused workflow & share feedback"],
            ["decision", "Follow through", "Connect observations, actions & outcomes"],
          ]}
        />
      </Section>
      <Section>
        <div className={s.split}>
          <div>
            <h2>A first useful step towards connected operations.</h2>
            <p>AquaOS is being developed to connect production context, decisions, actions and evidence. The proposed first pilot focuses on the work an operator returns to every day.</p>
            <Button href="/aquaos" secondary>Understand the AquaOS direction</Button>
          </div>
          <div>
            <h3>What we propose to explore together</h3>
            <ul className={s.checklist}>
              <li>Establish the site, production stage and operating units.</li>
              <li>Record daily observations and review what needs attention.</li>
              <li>Keep follow-up actions and outcomes with their history.</li>
              <li>Explore assistance grounded in those records.</li>
            </ul>
            <p>The founders will agree the exact pilot scope and support before inviting participants to test it.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className={s.split}>
          <div>
            <h2>Tell us about your team and routine.</h2>
            <p>
              The operator beta is in development. Registering starts a conversation about fit; it does not provide immediate software access. Pilot invitations, timing and any equipment integration depend on agreed scope and readiness.
            </p>
            <h3>What happens next</h3>
            <ol className={s.checklist}>
              <li>{enabled ? "Confirm your email." : "Send your interest email to the team."}</li>
              <li>The team reviews your setting and the routine you want to improve.</li>
              <li>If there is a suitable fit, discuss the pilot task, support and feedback process.</li>
            </ol>
          </div>
          <EarlyAccessForm enabled={enabled} />
        </div>
      </Section>
      <Section tone="mist">
        <h2>Exploring a production project instead?</h2>
        <p>For seed, nursery, pond production, controlled finishing, buyer requirements or research collaboration, describe your project directly to the team.</p>
        <Button href="/contact">Discuss your production setting</Button>
      </Section>
    </Page>
  );
}
