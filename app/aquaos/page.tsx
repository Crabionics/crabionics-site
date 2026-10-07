import type { Metadata } from "next";
import { Button, CTA, Eyebrow, ImagePanel, Intro, Page, Section, Status, TextLink, styles as s } from "../components/public/Experience";
import { OperatorScope } from "../components/public/Narrative";
import BetaDemo from "../components/public/BetaDemo";
export const metadata: Metadata = {
  title: "AquaOS | Operating Software",
  description: "Explore AquaOS: the developing operating layer connecting production context, observations, decisions, local response and history.",
  alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
  return <Page name="aquaos">
    <Intro eyebrow="AquaOS / Operating & control layer" title="Understand the setting. Connect the next action." aside={<ImagePanel src="/images/versioned/company-world-mobile.ebb1281c.webp" alt="Concept illustration of an operator, individual crab habitats and connected production equipment." caption="Concept illustration" priority />}>
      <p className={s.lead}>AquaOS is being developed to connect what is observed, what should happen and what changed afterwards—under operator oversight.</p>
      <Status>Software foundations · physical integration in development</Status>
      <div className={s.actions}><Button href="#operator-preview">Explore the workflow preview</Button><TextLink href="/early-access">Early-access interest</TextLink></div>
    </Intro>
    <Section id="operator-preview"><div className={s.heading}><div><Eyebrow>A day in the work / Illustrative example</Eyebrow><h2>A feeding observation.<br />A follow-up you can trace.</h2></div><p>Walk through a sample individual-habitat check. See the setting, review the record and keep the operator’s next step visible.</p></div><BetaDemo /></Section>
    <Section tone="mist" id="grow-out-beta"><OperatorScope /><div className={s.note}><p>This is the proposed early-access direction. The operator beta is in development. Our website preview uses sample information; it does not save your farm records or provide product access.</p></div></Section>
    <Section tone="dark"><div className={s.split}><div><Eyebrow>Connected to physical work</Eyebrow><h2>Records are part of the operating loop.</h2><p>The wider AquaOS design includes observations, rules, decisions, execution requests and outcomes. Local control depends on the production setting, permitted actions and physical integration.</p></div><div><h3>What exists, and what comes next.</h3><p>Software and synthetic workflows provide a foundation. Real sensor and equipment integration, biological outcomes and commercial value require separate evidence.</p><TextLink href="/validation">Explore research & validation</TextLink></div></div></Section>
    <CTA href="/system" label="Explore the connected system" title="See where the physical work fits.">Habitat, sensing, local equipment and the measured response.</CTA>
  </Page>;
}
