import type { Metadata } from "next";
import { Button, CTA, Eyebrow, ImagePanel, Intro, Page, Section, Status, TextLink, styles as s } from "../components/public/Experience";
import { OperatingLoop, OperatingExample, OperatorCapabilities, DevelopmentLayers, CopilotPosition } from "../components/public/AquaOSStory";
export const metadata: Metadata = {
 title: "AquaOS | Connecting Production, Decisions & Outcomes",
 description: "AquaOS is the developing operating layer for mud-crab production: connecting production context, observations, operator decisions, actions and outcome evidence.",
 alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
 return <Page name="aquaos">
 <Intro eyebrow="AquaOS / The operating layer" title="Connect production, decisions and outcomes." aside={<ImagePanel src="/images/versioned/company-world-mobile.ebb1281c.webp" alt="Concept illustration of an operator, crab habitats and connected production equipment." caption="Connected production direction · concept illustration" priority/>}>
 <p className={s.lead}>Bring stock, feeding, water observations and follow-ups into one operating history—so your team can see what changed and what needs attention.</p><Status>In development · proposed operator beta</Status><div className={s.actions}><Button href="/demo">Try an operating example</Button><TextLink href="#operating-loop">See how AquaOS fits</TextLink></div></Intro>
 <Section><OperatingExample/></Section>
 <Section id="operating-loop"><div className={s.heading}><div><Eyebrow>Why an operating layer?</Eyebrow><h2>Every decision has<br/>a production context.</h2></div><p>Seed and stock, production stage, water, feeding and labour all shape the work. Connecting the records helps teams see what happened, what they chose and what still needs checking.</p></div><OperatingLoop/></Section>
 <Section tone="mist" id="capabilities"><div className={s.heading}><div><Eyebrow>Designed around the operator</Eyebrow><h2>Make the daily work<br/>easier to follow.</h2></div><p>Four connected jobs for the proposed operator workspace.</p></div><OperatorCapabilities/></Section>
 <Section><CopilotPosition/></Section>
 <Section tone="mist" id="development"><div className={s.heading}><div><Eyebrow>What you can explore and what comes next</Eyebrow><h2>Build the foundation.<br/>Prove each connection.</h2></div><p>Beta interest starts a fit discussion. Product access, physical integration and production benefits each depend on the agreed scope and validation.</p></div><DevelopmentLayers/></Section>
 <Section tone="dark"><div className={s.split}><div><Eyebrow>From records to evidence</Eyebrow><h2>A response needs<br/>an outcome.</h2><p>Connect the action to what happened afterwards. A recorded task alone cannot show a biological result.</p></div><div><h3>Measure the production question.</h3><p>Survival, growth, water, labour and economics guide what we observe and validate.</p><TextLink href="/validation">Explore research & validation</TextLink></div></div></Section>
 <CTA href="/early-access" label="Express beta interest" title="Bring a real operating routine.">Help shape the first useful AquaOS workflow around your production setting and daily work.</CTA>
 </Page>;
}
