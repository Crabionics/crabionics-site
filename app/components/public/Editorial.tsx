import Image from "next/image";
import { Eyebrow, TextLink } from "./Experience";
import { Glyph } from "./Visuals";
import e from "./Editorial.module.css";

export function SolutionOverview() {
  return <div className={e.overview}>
    <figure className={e.stockPhoto}>
      <Image src="/photos/isolation-box.jpg" alt="Mud crab inside an individual blue habitat." fill sizes="(max-width:767px) 100vw, 45vw" />
      <figcaption>Individual habitat · production photograph</figcaption>
    </figure>
    <div className={e.solutionList}>
      {[
        ["habitat", "Habitat", "A defined space for care and handling.", "/solutions/habitat"],
        ["sense", "CrabSense", "Water observations linked to the right setting.", "/solutions/crabsense"],
        ["pod", "CrabPod", "A developing connection to local equipment.", "/solutions/crabpod"],
        ["record", "AquaOS", "Operating context, decisions, local response and history.", "/aquaos"],
      ].map(([icon,title,detail,href], i) => <article key={title}>
        <span className={e.number}>0{i+1}</span><Glyph kind={icon} />
        <div><h3>{title}</h3><p>{detail}</p><TextLink href={href}>Explore {title}</TextLink></div>
      </article>)}
      <p className={e.scope}>Components and integration are in development.</p>
      <TextLink href="/system">See how the system connects</TextLink>
    </div>
  </div>;
}
export function EvidenceStrip() {
  return <div className={e.evidence}>
    <div><Eyebrow>Research & validation</Eyebrow><h2>Learn in the lab.<br />Earn the next step.</h2><TextLink href="/validation">View the development pathway</TextLink></div>
    <ol>
      <li><span>Current work</span><strong>Research & integration</strong><p>Funded IHMS monitoring and control development.</p></li>
      <li><span>Production learning</span><strong>Biological & production learning</strong><p>Defined experiments, stock and cohort records.</p></li>
      <li><span>Proposed later</span><strong>Controlled finishing</strong><p>600-box validation proposal.</p></li>
    </ol>
  </div>;
}
