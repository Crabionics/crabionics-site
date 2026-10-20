import type { Metadata } from "next";
import { Button, Intro, Page, Section, styles as s } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";
export const metadata: Metadata = {
 title: "CrabDesk + Moltie | AquaOS",
 description: "Watch CrabDesk and Moltie in a short product film. Working RAS grow-out software, with pond workflows upcoming.",
 alternates: { canonical: "/aquaos" },
};
export default function AquaOSPage() {
 return <Page name="aquaos">
  <Intro eyebrow="AquaOS / CrabDesk + Moltie" title="RAS grow-out management. Meet CrabDesk.">
   <p className={s.lead}>CrabDesk is the first working application in the AquaOS platform. Watch the dashboard and Moltie in action, using demo records.</p>
   <div className={s.actions}><Button href="#discover">Watch the 30-second film</Button><Button href="/early-access#register" secondary>Register interest</Button></div>
  </Intro>
  <div id="discover"><ProductFilm page="aquaos" /></div>
  <Section id="capabilities">
   <div className={s.heading}><div><p className={s.eyebrow}>Product status</p><h2>A clear view of what’s ready.</h2></div><p>AquaOS is the broader product direction. CrabDesk is the working RAS grow-out application developed by our technical lead, Abhishek. Moltie is its built-in assistant.</p></div>
   <div className={s.three}>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Working software</p><h3>RAS grow-out</h3><p>CrabDesk brings the operator’s overview and records into a working application. Guided demonstrations are arranged around approved scope.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Upcoming</p><h3>Pond operations</h3><p>Pond workflows are a separate capability in development. Register interest to discuss your setting and hear about progress.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Separate validation</p><h3>Hardware connections</h3><p>Sensor and equipment integration require their own testing. Functioning software does not establish biological results or a validated physical control loop.</p></div></article>
   </div>
  </Section>
  <Section tone="dark"><p className={s.eyebrow}>Work with Crabionics</p><h2>See if CrabDesk fits your farm.</h2><p>Use our existing early-access registration. Confirm your email and the team will follow up about your setting and access.</p><Button href="/early-access#register">Register interest</Button></Section>
 </Page>;
}
