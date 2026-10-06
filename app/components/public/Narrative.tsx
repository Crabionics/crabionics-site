import Image from "next/image";
import Link from "next/link";
import { Eyebrow, TextLink } from "./Experience";
import n from "./Narrative.module.css";

export function ProductionJourney() {
  return <figure className={n.journey} aria-label="Proposed production direction: seed and nursery, pond grow-out, aggregation and grading, controlled finishing, buyer requirements. Each stage needs its own evidence.">
    <div className={n.scene}>
      <picture><source media="(max-width:767px)" srcSet="/images/versioned/company-world-mobile.ebb1281c.webp" /><Image src="/images/versioned/company-world.93a5d529.webp" alt="Concept illustration of mud-crab habitats, production racks, water equipment and an operator in a coastal landscape." fill sizes="(max-width:767px) 100vw, 90vw" /></picture>
      <div className={n.sceneCopy}><Eyebrow>The production direction</Eyebrow><h2>Connect the stages.<br />Build around the biology.</h2><p>From suitable starting stock to the condition and consistency buyers need.</p></div>
      <span className={n.caption}>Concept illustration · proposed direction</span>
    </div>
    <ol className={n.stages}>
      {[
        ["Seed & nursery", "Suitable starting stock", "/validation"],
        ["Pond grow-out", "Biomass & daily care", "/producers#pond-production"],
        ["Aggregation", "Grade & track transfers", "/producers#buyer-requirements"],
        ["Controlled finishing", "Defined habitat & intake", "/producers#controlled-finishing"],
        ["Buyer requirements", "Size, condition & cadence", "/contact#market"],
      ].map(([title,detail,href],i)=><li key={title}><small>0{i+1}</small><Link href={href}>{title}<span aria-hidden="true">↗</span></Link><p>{detail}</p></li>)}
    </ol>
    <figcaption className={n.journeyNote}>A proposed production connection, not an established supply network. Integration, biology and commercial fit are validated separately.</figcaption>
  </figure>;
}
export function CompanyEngines() {
  return <div className={n.engines}>
    {[
      ["Production", "Work with the biology.", "Stock, habitat, handling and the route to market.", "/producers"],
      ["Technology", "Connect the physical work.", "Sensing, operator decisions, local equipment and AquaOS.", "/system"],
      ["Learning", "Measure what changes.", "Defined experiments, useful records and evidence for the next step.", "/validation"],
    ].map(([tag,title,body,href])=><article key={tag}><Eyebrow>{tag}</Eyebrow><h3>{title}</h3><p>{body}</p><TextLink href={href}>Explore {tag.toLowerCase()}</TextLink></article>)}
  </div>;
}
export function OperatorScope() {
  return <div className={n.scope}>
    <div><Eyebrow>Proposed early-access workflow</Eyebrow><h2>A workspace you can return to.</h2><p>Describe your site, review its setup, record observations and return to the same history. Assistance should answer from those records and make missing information clear.</p><TextLink href="/early-access">Express early-access interest</TextLink></div>
    <ol>{[
      ["Set up", "Site, system & stock context"],
      ["Record", "Observations with source & time"],
      ["Return", "Retrieve the same operating history"],
      ["Ask", "Answers grounded in stored records"],
    ].map(([title,detail],i)=><li key={title}><span>0{i+1}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol>
  </div>;
}
