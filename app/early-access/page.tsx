import type { Metadata } from "next";
import {
  Button,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import EarlyAccessForm from "../components/public/EarlyAccessForm";
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
          Bring one routine—from a feeding round to an inspection—that your team needs to manage better. Register interest to help shape a focused operator pilot.
        </p>
        <div className={s.actions}>
          <Button href="#register">Register interest</Button>
          <Button href="/demo" secondary>Try the operating example</Button>
        </div>
      </Intro>
      <Section id="register">
        <div className={s.split} style={{ alignItems: "start" }}>
          <EarlyAccessForm enabled={enabled} />
          <div>
            <h2>Tell us about your team and routine.</h2>
            <p>
              The operator beta is in development. Registration starts a fit conversation; software access follows an agreed pilot scope and invitation.
            </p>
            <h3>What happens next</h3>
            <ol className={s.checklist}>
              <li>{enabled ? "Confirm your email." : "Send your interest email to the team."}</li>
              <li>The team reviews your setting and the routine you want to improve.</li>
              <li>If there is a suitable fit, discuss the pilot task, support and feedback process.</li>
            </ol>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <div className={s.split}>
          <div>
            <h2>A focused routine. A useful history.</h2>
            <p>The proposed pilot connects an observation, its follow-up and the recorded outcome. Your team helps test whether that makes everyday work easier to manage.</p>
            <Button href="/aquaos" secondary>Explore the AquaOS direction</Button>
          </div>
          <div>
            <h3>We agree the pilot before testing</h3>
            <ul className={s.checklist}>
              <li>Your site, production stage and operating units.</li>
              <li>One daily routine and the records it needs.</li>
              <li>The task, support, timing and feedback process.</li>
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <h2>Exploring a production project instead?</h2>
        <p>For seed, nursery, pond production, controlled finishing, buyer requirements or research collaboration, describe your project directly to the team.</p>
        <Button href="/contact">Discuss a production project</Button>
      </Section>
    </Page>
  );
}
