import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/components/public/CompanyPages.module.css";

export const metadata: Metadata = {
  title: "Validation",
  description: "The research, pond biology, controlled-finishing and partner work informing the Crabionics development programme.",
  alternates: { canonical: "/validation" },
};

const workstreams = [
  { id: "research-integration", title: "Research & integration", scope: "Funded research / IHMS", setting: "Defined research setting", question: "Can the physical setting, observations and operating routines work together as intended?", measurements: "Integration records and operating evidence.", learning: "This work informs how the system fits together and the next research step." },
  { id: "pond-biology", title: "Pond biology & biomass", scope: "Pond & supply pilot", setting: "Farmer pond and stage-to-stage transfer context", question: "How does the cohort perform, and can pond production provide biomass with the size, condition and timing needed for controlled finishing?", measurements: "Species, seed source, cohort performance, harvest condition and supply cadence.", learning: "This work informs biological learning, suitable intake and connections between production stages." },
  { id: "controlled-finishing", title: "Controlled finishing", scope: "600-box pilot", setting: "Defined controlled-finishing setting", question: "How does the production unit perform under its intended intake, operating and measurement plan?", measurements: "Cohort performance, survival, growth, occupancy and operating records.", learning: "Measured outcomes and operating repeatability inform the next scale decision." },
  { id: "demand-adoption", title: "Demand & adoption", scope: "Partner discovery", setting: "Producer, processor, buyer and cluster-operator conversations", question: "What specifications would buyers require, and which partners would adopt or fund the integration layer?", measurements: "Species, size, quantity, cadence, handling, logistics and commercial requirements.", learning: "Partner learning informs practical fit, adoption and the commercial integration model." },
];

const evidence = [
  ["Physical integration", "How the setting, components and operating routines work together."],
  ["Biological outcomes", "What pond and finishing studies show about cohorts and production conditions."],
  ["Commercial adoption", "How the work fits producer, buyer and partner requirements."],
  ["Repeatability", "What can be repeated across units, production connections and clusters."],
];

export default function ValidationPage() {
  return <div data-page="validation" className={styles.page}>
    <section className={`${styles.validationIntro} ${styles.pale}`}><div className={`${styles.wrap} ${styles.validationOpening}`}><div><p className={styles.eyebrow}>Research / Production validation</p><h1>Learning what works, in defined production settings.</h1><p className={styles.lead}>Research, pond biology, controlled finishing and partner work examine different parts of the production problem.</p><Link className={styles.textLink} href="/contact#research">Explore a research partnership <span aria-hidden="true">↗</span></Link></div><nav className={styles.streamIndex} aria-label="Validation workstreams"><p className={styles.eyebrow}>Four workstreams</p>{workstreams.map(({ id, title }, index) => <Link key={id} href={`#${id}`}><span>0{index + 1}</span>{title}<span aria-hidden="true">↘</span></Link>)}</nav></div></section>

    <section className={`${styles.section} ${styles.dark}`}><div className={styles.wrap}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The programme</p><h2>The questions we are testing.</h2></div><p>Each activity has a production setting, a question and intended measurements.</p></div><div className={styles.streams}>{workstreams.map(({ id, title, scope, setting, question, measurements, learning }, index) => <article id={id} className={styles.stream} key={id}><div className={styles.streamTitle}><span className={styles.rowNumber}>0{index + 1}</span><div><p className={styles.eyebrow}>{scope}</p><h3>{title}</h3><p className={styles.setting}>{setting}</p></div></div><div className={styles.streamBody}><p className={styles.question}>{question}</p><div className={styles.measurements}><p className={styles.eyebrow}>Intended measurements</p><p>{measurements}</p></div><p className={styles.learning}>{learning}</p></div></article>)}</div></div></section>

    <section className={styles.section}><div className={styles.wrap}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>What the work can tell us</p><h2>Different questions need different evidence.</h2></div><p>BIRAC/IHMS milestone completion shows progress in putting the system together. Biological, economic and commercial outcomes are learned separately in their own settings.</p></div><div className={styles.evidence}>{evidence.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.pale}`}><div className={`${styles.wrap} ${styles.essay}`}><div><p className={styles.eyebrow}>Development pathway</p><h2>Learn from the unit, then the connections.</h2></div><div className={styles.prose}><p>Integration work examines how the system fits together. Pond and finishing studies examine biological and operating outcomes. Partner work examines practical and commercial fit.</p><ol className={styles.compactPath}><li>Production unit</li><li>Production connections</li><li>Repeatable cluster</li><li>Wider network</li></ol><p>Progress towards broader deployment depends on what can be repeated in production and with partners.</p></div></div></section>

    <section className={`${styles.section} ${styles.dark} ${styles.closing}`}><div className={`${styles.wrap} ${styles.essay}`}><div><p className={styles.eyebrow}>Explore the work</p><h2>Bring a production or research question.</h2></div><div><p>Tell us about the setting, the question and what you need to learn.</p><div className={styles.actions}><Link className={styles.button} href="/contact#research">Research partnership <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact#institutions">Institutional collaboration <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact#production">Production partnership <span aria-hidden="true">↗</span></Link></div></div></div></section>
  </div>;
}
