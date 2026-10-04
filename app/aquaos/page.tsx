import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/public/Participation.module.css";

export const metadata: Metadata = {
  title: "AquaOS",
  description: "AquaOS is being developed to connect observations, operating decisions, bounded control and outcomes for mud-crab production teams. Register grow-out beta interest.",
  alternates: { canonical: "/aquaos" },
};

const workflow = [
  ["Observe", "What is happening?", "Connect environmental readings and biological observations to the farm, unit or cohort they describe. Use the conditions and operating history to understand the situation."],
  ["Decide & act", "What should happen next?", "Support operator decisions and defined operating rules. Where local control is appropriate, a bounded command connects the decision to equipment and records its acknowledgement."],
  ["Verify & learn", "What changed after the action?", "Connect the response with the observation and decision that preceded it. Equipment response, biological outcome and production value each need their own measurements."],
];

export default function AquaOSPage() {
  return (
    <div data-page="aquaos" className={styles.page}>
      <section className={`${styles.section} ${styles.dark} ${styles.aquaOpening}`}>
        <div className={`${styles.container} ${styles.aquaGrid}`}>
          <div><p className={styles.eyebrow}>AquaOS / Operating & control layer</p><h1 className={styles.title}>An operating and control layer for production.</h1><p className={styles.lead}>AquaOS is being developed to connect what is observed, what should happen and the response in the production environment. Operators oversee decisions and defined rules, with an operating history that keeps each action in context.</p><Link className={styles.textLink} href="#grow-out-beta">Explore grow-out beta interest <span aria-hidden="true">↓</span></Link></div>
          <figure className={styles.operatorFigure}>
            <div className={styles.operatorImage}><Image src="/images/versioned/company-world.93a5d529.webp" alt="Concept illustration of an operator beside controlled mud-crab production equipment and a cutaway individual habitat." fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
            <figcaption><span>People, observations and the physical setting</span><small>Concept illustration</small></figcaption>
            <ol className={styles.operatorSequence} aria-label="Operating relationship"><li>Observe conditions</li><li>Decide & act</li><li>Check the response</li></ol>
          </figure>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>Observe / Decide / Act / Verify</p><h2 className={styles.heading}>Connect the observation<br />to the response.</h2><p className={styles.body}>The operating design links conditions, decisions, alerts, commands and outcomes. The people responsible for production govern how it is used.</p></div>
          <div className={styles.workflow}>
            {workflow.map(([name, title, body], index) => <article key={name}><div className={styles.workflowIndex}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3></div><div><h3>{title}</h3><p>{body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pale}`}>
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>Development scope</p><h2 className={styles.heading}>Develop the connection.<br />Test it in practice.</h2></div>
          <div className={styles.scopeList}><article><h3>Monitoring and local control</h3><p>Software foundations for observations, operating records, execution requests and event history exist. Physical integration is in development; a complete biological control loop remains to be demonstrated.</p></article><article><h3>Across production settings</h3><p>The wider direction includes hatchery, nursery, grow-out and controlled-production settings. Multi-site learning and production coordination are later extensions that depend on reliable operating histories.</p></article></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark} ${styles.betaSection}`} id="grow-out-beta">
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>Grow-out beta interest</p><h2 className={styles.heading}>Bring your pond<br />and your daily work.</h2></div>
          <div><p className={styles.lead}>Tell us about your pond, team and daily work: observations, feeding and handling routines, stock changes and current records. This beta-interest conversation helps define useful grow-out software work and suitable trial settings.</p><p className={styles.body}>Trial scope and timing will be discussed with interested teams. Local equipment control depends on the production setting and its integration work.</p><div className={styles.actions}><Link className={styles.action} href="/contact#aquaos-beta">Register interest in the grow-out beta <span aria-hidden="true">↗</span></Link></div></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.closing}`}>
        <div className={`${styles.container} ${styles.closingInner}`}><div><p className={styles.eyebrow}>Part of Crabionics</p><h2 className={styles.smallHeading}>Operating software, connected to physical work.</h2><p className={styles.body}>See how habitat, observation, decisions, local equipment and the measured response fit within Crabionics.</p></div><Link className={styles.textLink} href="/system">Explore the system <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
