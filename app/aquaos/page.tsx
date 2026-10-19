import type { Metadata } from "next";
import { Button, Intro, Page, Section, styles as s } from "../components/public/Experience";
import AquaDiscovery from "../components/discovery/AquaDiscovery";
export const metadata: Metadata = {
 title: "AquaOS | See the Work. Keep the Thread.",
 description: "Discover AquaOS through three short interactions. Working RAS grow-out software in CrabDesk, upcoming pond workflows and guided demonstrations by request.",
 alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
 return <Page name="aquaos">
  <Intro eyebrow="AquaOS / Connected farm records" title="The next person shouldn’t have to start again.">
   <p className={s.lead}>See what needs attention, follow a change and keep its history together. Discover the idea in three short interactions.</p>
   <div className={s.actions}><Button href="#discover">Explore in 30–45 seconds</Button><Button href="/contact#aquaos-beta" secondary>Request a guided demo</Button></div>
  </Intro>
  <div id="discover"><AquaDiscovery page="aquaos" /></div>
  <Section id="capabilities">
   <div className={s.heading}><div><p className={s.eyebrow}>Product status</p><h2>A clear view of what’s ready.</h2></div><p>AquaOS is the broader product direction. CrabDesk is the working RAS grow-out application developed by our technical lead, Abhishek.</p></div>
   <div className={s.three}>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Working software</p><h3>RAS grow-out</h3><p>CrabDesk brings the operator’s overview and records into a working application. Guided demonstrations are arranged around approved scope.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Upcoming</p><h3>Pond operations</h3><p>Pond workflows are a separate capability in development. Register interest to discuss your setting and hear about progress.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Separate validation</p><h3>Hardware connections</h3><p>Sensor and equipment integration require their own testing. Functioning software does not establish biological results or a validated physical control loop.</p></div></article>
   </div>
  </Section>
  <Section tone="dark"><div className={s.split}><div><p className={s.eyebrow}>A closer look</p><h2>See the product with the team.</h2><p>Request a guided demonstration of the working RAS software. We agree what can be shown before the session.</p><Button href="/contact#aquaos-beta">Request a guided demo</Button></div><div><h3>Interested in an operator pilot?</h3><p>Register your interest, confirm your email and discuss fit with Crabionics. Access follows review and an individual invitation.</p><Button href="/early-access#register" secondary>Register early-access interest</Button></div></div></Section>
 </Page>;
}
