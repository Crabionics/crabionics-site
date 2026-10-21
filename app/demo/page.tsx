import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section, styles as s } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";

export const metadata: Metadata = {
  title: "CrabDesk + Moltie | Real RAS Software Product Film",
  description: "Watch a narrated, captioned look at working CrabDesk RAS grow-out software and Moltie. Actual application screens, demonstration records, and an operator access request.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "CrabDesk + Moltie | Working Mud-Crab Software Demo",
    description: "Captured CrabDesk and Moltie application views, with demo records. Guided access by invitation.",
    url: "/demo",
    images: [{url:"/product/film/poster-v2-desktop.webp",width:1920,height:1080,alt:"Actual CrabDesk and Moltie software screen shown with demo records"}]
  },
  twitter: {card:"summary_large_image",images:["/product/film/poster-v2-desktop.webp"]}
};

const filmSchema = {
  "@context":"https://schema.org",
  "@type":"VideoObject",
  "@id":"https://www.crabionics.com/demo#film",
  name:"CrabDesk + Moltie — RAS Grow-Out Software Product Film",
  description:"Narrated demonstration of the working CrabDesk operator workspace and Moltie assistant using demonstration records, including intake, batch, habitat, sampling and manual water-test views. Pond workflows and hardware integrations are not presented as completed.",
  thumbnailUrl:["https://www.crabionics.com/product/film/poster-v2-desktop.webp"],
  uploadDate:"2026-10-21T08:42:20+05:30",
  duration:"PT1M25S",
  contentUrl:"https://www.crabionics.com/product/film/crabdesk-v2-desktop.mp4",
  embedUrl:"https://www.crabionics.com/demo",
  publisher:{"@id":"https://www.crabionics.com/#organization"},
};

export default function DemoPage() {
 return <Page name="demo">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(filmSchema)}} />
  <ProductFilm page="demo" />
  <Section>
   <div className={s.heading}><div><p className={s.eyebrow}>Accessible film companion</p><h2>What the demonstration shows.</h2></div><p>A readable overview for visitors who prefer text or cannot watch the film. This is a summary, not a transcript of the narration or an operational SOP.</p></div>
   <div className={s.three}>
    <article className={s.card}><div className={s.cardBody}><h3>Operator overview</h3><p>CrabDesk's actual application screens show RAS grow-out records and an overview of intake, batches and individual habitat context. The footage uses demonstration records.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><h3>Observations and records</h3><p>Sample records illustrate sampling and manual water-test entries in the software. The film does not publish internal operating procedures, control thresholds or an engineering specification.</p></div></article>
    <article className={s.card}><div className={s.cardBody}><h3>Ask Moltie</h3><p>Moltie appears inside the working interface and responds to a question about sample records with supporting sources. The film is not evidence of autonomous farm control or verified biological prediction.</p></div></article>
   </div>
   <p>CrabDesk is the working RAS grow-out capability within <Link href="/aquaos">AquaOS</Link>. Pond workflows are upcoming. For a guided demonstration, <Link href="/early-access#register">register interest and confirm your email</Link>.</p>
  </Section>
 </Page>;
}
