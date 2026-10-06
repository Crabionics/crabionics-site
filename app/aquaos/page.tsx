import type { Metadata } from "next";
import {
  Button,
  CTA,
  Intro,
  Page,
  Section,
  Status,
  styles as s,
} from "../components/public/Experience";
import { BetaDirection } from "../components/public/Visuals";
import BetaDemo from "../components/public/BetaDemo";
export const metadata: Metadata = {
  title: "AquaOS | Operating Software",
  description:
    "Explore AquaOS observations, operating records and grow-out beta direction.",
  alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
  return (
    <Page name="aquaos">
      <Intro
        eyebrow="AquaOS / Operating & control layer"
        title="Turn daily observations into useful records."
      >
        <p className={s.lead}>
          Observations, operator decisions and follow-up in one developing
          workflow.
        </p>
        <Status>In development · early-access interest</Status>
        <div className={s.actions}>
          <Button href="/early-access">Join early access</Button>
        </div>
      </Intro>
      <Section>
        <BetaDemo />
      </Section>
      <Section tone="mist">
        <div className={s.note}>
          <p>
            Software foundations exist. Physical integration remains in
            development; a complete biological control loop is not yet
            demonstrated.
          </p>
        </div>
      </Section>
      <div id="grow-out-beta" />
      <BetaDirection />
      <CTA
        href="/system"
        label="Explore the connected system"
        title="See where the physical work fits."
      >
        Habitat, sensing, local equipment and measured response.
      </CTA>
    </Page>
  );
}
