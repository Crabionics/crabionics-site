import type { Metadata } from "next";
import Link from "next/link";
import { Button, Intro, Page, Section, styles as s } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";

export const metadata: Metadata = {
  title: { absolute: "Mud Crab Farm Management Software | CrabDesk + Moltie | Crabionics" },
  description: "Explore CrabDesk, working mud-crab RAS grow-out software for intake, batches, individual habitats, sampling and manual water records, with Moltie assistance. Pond workflows upcoming.",
  alternates: { canonical: "/aquaos" },
  openGraph: {
    title: "Mud Crab Farm Management Software | CrabDesk + Moltie",
    description: "See working RAS grow-out software and a source-linked assistant in an authentic, narrated product demonstration. Pond workflows are upcoming.",
    url: "/aquaos",
    images: [{ url: "/product/film/poster-v2-desktop.webp", width: 1920, height: 1080, alt: "CrabDesk and Moltie software demonstration using sample records" }],
  },
  twitter: { card: "summary_large_image", images: ["/product/film/poster-v2-desktop.webp"] },
};

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://www.crabionics.com/aquaos#crabdesk",
  name: "CrabDesk",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.crabionics.com/aquaos",
  description: "CrabDesk is a working RAS grow-out operator application within AquaOS for mud-crab intake, batches, individual habitat records, sampling and manually entered water tests. Moltie is its built-in assistant. Pond workflows are upcoming.",
  publisher: { "@id": "https://www.crabionics.com/#organization" },
  image: "https://www.crabionics.com/product/film/poster-v2-desktop.webp",
};

const questions = [
  ["What mud-crab farming software does Crabionics offer?", "CrabDesk is our working RAS grow-out operator application, within the broader AquaOS platform. It brings intake, batches, individual habitats, sampling and manual water-test records into a workspace. The product film uses demonstration records."],
  ["Is CrabDesk working software or just a concept?", "CrabDesk is working software. The public film shows captured application screens and Moltie responses with demo records. Access for external operators is arranged through an agreed pilot scope; the film is not evidence of commercial deployment or biological results."],
  ["Does AquaOS currently support pond farming?", "Pond operations are an upcoming, separately developed workflow. Register your pond-production interest so the team can discuss your setting without representing the pond product as released."],
  ["Do I need sensors or an automated RAS system to use the software?", "The demonstrated water-test records can be entered manually. CrabSense sensors, CrabPod equipment connections and closed-loop hardware control require separate integration and validation. No physical control capability is implied by this software demonstration."],
  ["What can I ask Moltie?", "Moltie is the assistant visible in CrabDesk. The demonstration shows questions about sample operating records and supporting source links. Record-grounded accuracy, missing-data behavior and suitability for live use are assessed within the beta scope."],
  ["How do operators in Odisha or elsewhere request access?", "Use the existing early-access form, confirm your email, and describe your region, farm type and operating routine. Crabionics reviews the setting and contacts suitable candidates about a guided demonstration or scoped pilot. Registration does not automatically grant an application account."],
] as const;

export default function AquaOSPage() {
  return <Page name="aquaos">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
    <Intro eyebrow="Mud-crab farming software / AquaOS" title="RAS grow-out management. Meet CrabDesk.">
      <p className={s.lead}>CrabDesk is Crabionics' working mud-crab farm management application for individual-crab RAS grow-out. Follow intake, batches, habitats, sampling and manual water observations in the real interface, then meet Moltie, its built-in assistant. Demo records shown; proprietary farm operations are not published.</p>
      <div className={s.actions}>
        <Button href="#discover">Watch the real product</Button>
        <Button href="/early-access#register" secondary>Request guided access</Button>
      </div>
    </Intro>
    <div id="discover"><ProductFilm page="aquaos" /></div>
    <Section id="capabilities">
      <div className={s.heading}>
        <div><p className={s.eyebrow}>What is available</p><h2>Working software. Clear boundaries.</h2></div>
        <p>AquaOS is the wider aquaculture operating-system direction. CrabDesk is its first working RAS grow-out application, developed by our technical lead, Abhishek.</p>
      </div>
      <div className={s.three}>
        <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Working RAS software</p><h3>CrabDesk + Moltie</h3><p>See genuine software screens covering intake, stock and habitat context, manual observations and a source-linked assistant, using sample records.</p><Link href="/demo">See the narrated product film ↗</Link></div></article>
        <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Upcoming</p><h3>Pond operations</h3><p>A dedicated pond operator workflow is upcoming. Pond farmers can register interest and describe the records they need.</p><Link href="/early-access#register">Register pond interest ↗</Link></div></article>
        <article className={s.card}><div className={s.cardBody}><p className={s.eyebrow}>Separate validation</p><h3>Sensors and hardware</h3><p>Environmental sensing, local equipment and biological outcomes have independent testing requirements. Working software does not prove closed-loop physical control.</p><Link href="/validation">Research and validation ↗</Link></div></article>
      </div>
    </Section>
    <Section>
      <div className={s.heading}><div><p className={s.eyebrow}>Mud-crab software questions</p><h2>What operators want to know.</h2></div><p>Direct answers for farmers, finishing operators, technical partners and processors evaluating AquaOS.</p></div>
      <div className={s.article}>
        {questions.map(([question, answer]) => <section key={question}><h3>{question}</h3><p>{answer}</p></section>)}
        <p>For background on production records and preparing a pilot, explore our <Link href="/resources">practical resources</Link>. We do not publish restricted SOPs, RAS setpoints or internal application access.</p>
      </div>
    </Section>
    <Section tone="dark">
      <p className={s.eyebrow}>Work with Crabionics</p>
      <h2>See if CrabDesk fits your farm.</h2>
      <p>Tell us whether you operate RAS grow-out, pond production or a related aquaculture facility. Use the existing registration system, confirm your email and we'll review the appropriate guided demonstration or pilot discussion.</p>
      <Button href="/early-access#register">Register operator interest</Button>
    </Section>
  </Page>;
}
