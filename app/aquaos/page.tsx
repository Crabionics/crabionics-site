import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/public/Participation.module.css";

export const metadata: Metadata = {
  title: "AquaOS",
  description: "AquaOS is being developed to connect observations, operator decisions, actions and outcomes for mud-crab production teams. Register grow-out beta interest.",
  alternates: { canonical: "/aquaos" },
};

const workflow = [
  ["Record", "What happened?", "Link an observation or production event to the farm, zone and operating context it describes. Keep the setting and the people involved alongside the record."],
  ["Review", "What changed?", "Bring the conditions, operator decision and action into the same conversation. Review the next observation to understand the response."],
  ["Learn", "What should we examine next?", "Build an operating history the production team can use to compare cycles and identify the next question to test."],
];

export default function AquaOSPage() {
  return (
    <div data-page="aquaos" className={styles.page}>
      <section className={`${styles.section} ${styles.dark} ${styles.aquaOpening}`}>
        <div className={`${styles.container} ${styles.aquaGrid}`}>
          <div><p className={styles.eyebrow}>AquaOS / Operating record</p><h1 className={styles.title}>A shared operating record for the production team.</h1><p className={styles.lead}>AquaOS is being developed to connect observations, operator decisions, actions and outcomes in their production context.</p><Link className={styles.textLink} href="#grow-out-beta">Explore grow-out beta interest <span aria-hidden="true">↓</span></Link></div>
          <figure className={styles.operatorFigure}>
            <div className={styles.operatorImage}><Image src="/images/company-world.webp" alt="Concept illustration of an operator beside controlled mud-crab production equipment and a cutaway individual habitat." fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
            <figcaption><span>People, observations and the physical setting</span><small>Concept illustration</small></figcaption>
            <ol className={styles.operatorSequence} aria-label="Operating relationship"><li>Observation</li><li>Operator decision</li><li>Recorded response</li></ol>
          </figure>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>Record / Review / Learn</p><h2 className={styles.heading}>Keep the work<br />connected to its setting.</h2><p className={styles.body}>A reading becomes more useful when the team can see where it came from, what they decided and what happened afterwards.</p></div>
          <div className={styles.workflow}>
            {workflow.map(([name, title, body], index) => <article key={name}><div className={styles.workflowIndex}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3></div><div><h3>{title}</h3><p>{body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pale}`}>
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>Development scope</p><h2 className={styles.heading}>Begin at the farm.<br />Learn before extending.</h2></div>
          <div className={styles.scopeList}><article><h3>Farm and zone-level operating work</h3><p>The initial scope brings observations, operating records and operator decision support together. AquaOS is being developed alongside the physical production work.</p></article><article><h3>A wider production connection</h3><p>Supply planning, cohort movement and buyer-linked coordination are proposed extensions to examine with production partners.</p></article></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.betaSection}`} id="grow-out-beta">
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>Grow-out beta interest</p><h2 className={styles.heading}>Bring your pond<br />and your daily work.</h2></div>
          <div><p className={styles.lead}>Tell us about your pond, team and current record-keeping. We’ll discuss whether your setting fits the work being developed.</p><div className={styles.actions}><Link className={styles.action} href="/contact#aquaos-beta">Register interest in the grow-out beta <span aria-hidden="true">↗</span></Link></div></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.closing}`}>
        <div className={`${styles.container} ${styles.closingInner}`}><div><p className={styles.eyebrow}>Part of Crabionics</p><h2 className={styles.smallHeading}>The record follows the physical work.</h2><p className={styles.body}>See where observation, operator decisions and local intervention fit within the production system.</p></div><Link className={styles.textLink} href="/system">Explore the system <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
