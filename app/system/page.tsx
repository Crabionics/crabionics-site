import type { Metadata } from "next";
import { Button, CTA, Eyebrow, Heading, ImagePanel, Intro, Page, Section, TextLink, styles as s } from "../components/public/Experience";
import { ConnectedDiagram } from "../components/public/Visuals";
import { ProductionJourney } from "../components/public/Narrative";
export const metadata: Metadata = {
  title: "The Connected System",
  description: "Explore the habitat, sensing, operator decisions, local equipment and measured response behind Crabionics.",
  alternates: { canonical: "/system" },
};
export default function SystemPage() {
  return <Page name="system">
    <Intro eyebrow="The connected production system" title="The crab. The water. The people doing the work." aside={<ImagePanel src="/images/versioned/company-world-mobile.ebb1281c.webp" alt="Concept illustration of an operator beside crab habitats and production equipment." caption="Concept illustration" priority />}>
      <p className={s.lead}>A production setting becomes useful when its observations, decisions and physical response stay connected.</p>
      <Button href="/solutions">Explore the components</Button>
    </Intro>
    <Section><Heading eyebrow="The operating relationship" title="Observe. Decide. Respond. Check what changed." /><ConnectedDiagram /></Section>
    <Section tone="mist" id="habitat"><div className={s.split}>
      <ImagePanel src="/photos/isolation-box.jpg" alt="A mud crab in an individual blue habitat." />
      <div><Eyebrow>01 / Physical setting</Eyebrow><h2>Begin with the animal’s environment.</h2><p>Habitat, handling and water management define the conditions in which care and observation happen. BioPod / RAS supports water management where the setting requires it.</p><div id="water" /><TextLink href="/solutions/habitat">Habitat & supporting infrastructure</TextLink></div>
    </div></Section>
    <Section id="observation"><div className={s.split}>
      <div><Eyebrow>02 / Observation</Eyebrow><h2>A reading needs context.</h2><p>CrabSense connects environmental measurements to the right setting. Operators add biological observations and daily work. Measurement quality and maintenance matter as much as collecting data.</p><TextLink href="/solutions/crabsense">Explore the sensing role</TextLink></div>
      <ImagePanel src="/images/versioned/sensing.b79a337c.webp" alt="Concept illustration of sensing probes beside an individual mud-crab habitat." caption="Concept illustration" />
    </div></Section>
    <Section tone="dark" id="decisions"><div className={s.split}>
      <div><Eyebrow>03 / Decision & response</Eyebrow><h2>Keep the action connected to its reason.</h2><p>AquaOS links observations, decisions and operating history. Where integration is available, permitted commands pass to local equipment through CrabPod under operator oversight.</p><div className={s.actions}><Button href="/aquaos">Explore AquaOS</Button><TextLink href="/solutions/crabpod">Explore CrabPod</TextLink></div></div>
      <div id="intervention"><h3>Close the loop with evidence.</h3><p>Record the response, then observe what changed. An equipment acknowledgement and a biological outcome are different measurements.</p><p>Software and synthetic foundations exist. Physical integration and biological performance need their own accepted evidence.</p><TextLink href="/validation">See what we are validating</TextLink></div>
    </div></Section>
    <Section><ProductionJourney /></Section>
    <CTA href="/contact#technical" title="Start with your production setting." label="Discuss the technical scope" />
  </Page>;
}
