import type { Metadata } from "next";
import {
  AquaPreview,
  Button,
  CTA,
  Eyebrow,
  Flow,
  Heading,
  Intro,
  Page,
  Section,
  Status,
  TextLink,
  styles as s,
} from "../components/public/Experience";
export const metadata: Metadata = {
  title: "AquaOS | Operating Software",
  description:
    "An operating and control layer connecting observations, operator decisions, bounded actions and history. Explore development scope and grow-out beta interest.",
  alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
  return (
    <Page name="aquaos">
      <Intro
        eyebrow="AquaOS / Operating & control layer"
        title="Production work, connected."
        aside={<AquaPreview />}
      >
        <p className={s.lead}>
          Operating software being developed to connect what is observed, what
          should happen and the response in the production environment.
        </p>
        <Status>In development · beta interest welcome</Status>
        <div className={s.actions}>
          <Button href="#grow-out-beta">Explore grow-out beta interest</Button>
        </div>
      </Intro>
      <Section>
        <Heading
          eyebrow="Observe / Decide / Respond / Review"
          title="Keep each action in its context."
        >
          Operators govern decisions and defined rules. History connects the
          response to the observation and decision that preceded it.
        </Heading>
        <Flow />
      </Section>
      <Section tone="mist">
        <div className={s.split}>
          <div>
            <Eyebrow>Development scope</Eyebrow>
            <h2>Develop the connection. Test it in practice.</h2>
            <p>
              Software foundations for observations, operating records,
              execution requests and event history exist. Physical integration
              is in development; a complete biological control loop remains to
              be demonstrated.
            </p>
            <TextLink href="/validation">
              Explore research and validation
            </TextLink>
          </div>
          <div className={s.detailGrid}>
            {[
              [
                "Observe in context",
                "Connect readings and biological observations to the farm, unit or cohort.",
              ],
              [
                "Operator oversight",
                "Define responsibilities, permitted actions and the rules governing local response.",
              ],
              [
                "Record the response",
                "Link equipment acknowledgement with the next observation.",
              ],
              [
                "Learn across settings",
                "Multi-site learning and coordination depend on reliable operating histories.",
              ],
            ].map(([title, body]) => (
              <article key={title} className={s.detailBox}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section id="grow-out-beta" tone="dark">
        <div className={s.split}>
          <div>
            <Eyebrow>Grow-out beta interest</Eyebrow>
            <h2>Bring your pond and your daily work.</h2>
            <p className={s.lead}>
              Help define useful software work and suitable trial settings
              through your observations, handling routines, stock changes and
              current records.
            </p>
          </div>
          <div>
            <ul className={s.checklist}>
              <li>Tell us about your pond, region and production team</li>
              <li>Describe feeding, handling and stock records</li>
              <li>Discuss what would make the operating history useful</li>
            </ul>
            <p>
              Trial scope and timing are discussed with interested teams. Local
              equipment control depends on the production setting and its
              integration work.
            </p>
            <Button href="/contact#aquaos-beta">
              Register grow-out beta interest
            </Button>
          </div>
        </div>
      </Section>
      <CTA
        title="Software that follows the physical work."
        href="/system"
        label="Explore the connected system"
      >
        See where habitat, sensing, local equipment and the measured response
        fit together.
      </CTA>
    </Page>
  );
}
