import type { Metadata } from "next";
import { Button, CTA, Eyebrow, ImagePanel, Intro, Page, Section, Status, TextLink, styles as s } from "../components/public/Experience";
import { OperatingLoop, OperatorCapabilities, DevelopmentLayers, CopilotPosition } from "../components/public/AquaOSStory";
export const metadata: Metadata = {
 title: "AquaOS | Connecting Production, Decisions & Outcomes",
 description: "AquaOS is the developing operating layer for mud-crab production: connecting production context, observations, operator decisions, actions and outcome evidence.",
 alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
 return <Page name="aquaos">
 <Intro eyebrow="AquaOS / The operating layer" title="Connect production, decisions and outcomes." aside={<ImagePanel src="/images/versioned/company-world-mobile.ebb1281c.webp" alt="Concept illustration of an operator, crab habitats and connected production equipment." caption="Connected production direction · concept illustration" priority/>}>
 <p className={s.lead}>Mud-crab production brings biology, water, infrastructure and daily work together. AquaOS is being developed to keep that work connected—from the production setting to the evidence for the next decision.</p><Status>In development · proposed operator beta</Status><div className={s.actions}><Button href="#operating-loop">See how it fits together</Button><TextLink href="/demo">Explore an operating example</TextLink></div></Intro>
 <Section id="operating-loop"><div className={s.heading}><div><Eyebrow>Why an operating layer?</Eyebrow><h2>Every decision has<br/>a production context.</h2></div><p>Seed and stock, production stage, water, feeding and labour all shape the work. Connecting the records helps teams see what happened, what they chose and what still needs checking.</p></div><OperatingLoop/></Section>
 <Section tone="mist" id="capabilities"><div className={s.heading}><div><Eyebrow>Designed around the operator</Eyebrow><h2>Make the daily work<br/>easier to follow.</h2></div><p>Proposed capabilities and illustrative tasks across the operating loop. The first beta will test a focused scope agreed with participating operators.</p></div><OperatorCapabilities/></Section>
 <Section><CopilotPosition/></Section>
 <Section tone="mist" id="development"><div className={s.heading}><div><Eyebrow>Development direction</Eyebrow><h2>Build the foundation.<br/>Prove each connection.</h2></div><p>The wider system and the first operator beta have different scopes. Integration, biological outcomes and commercial value each need evidence.</p></div><DevelopmentLayers/><div className={s.note}><p>The public operating example illustrates the proposed workflow with sample data. Beta interest starts a discussion about your setting and suitable participation; it does not provide immediate product access.</p></div></Section>
 <Section tone="dark"><div className={s.split}><div><Eyebrow>From records to evidence</Eyebrow><h2>A response needs<br/>an outcome.</h2><p>A recorded action or equipment acknowledgement alone cannot demonstrate a biological result. The intended loop keeps the response and what changed afterwards connected.</p></div><div><h3>Measure the production question.</h3><p>Survival, growth, condition, water, labour and economics need defined observation and validation. Those questions guide what we build and test.</p><TextLink href="/validation">Explore research & validation</TextLink></div></div></Section>
 <CTA href="/early-access" label="Express beta interest" title="Bring a real operating routine.">Help shape the first useful AquaOS workflow around your production setting and daily work.</CTA>
 </Page>;
}
