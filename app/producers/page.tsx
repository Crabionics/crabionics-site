import type { Metadata } from "next";
import Link from "next/link";
import styles from "../components/public/Participation.module.css";

export const metadata: Metadata = {
  title: "For Producers",
  description: "Explore a pond partnership, controlled-finishing pilot or the requirements that connect mud-crab production to market.",
  alternates: { canonical: "/producers" },
};

const roles = [
  { id: "pond-production", name: "Pond production", title: "Begin with the growing environment.", body: "Growers contribute the pond, daily care and knowledge of the stock. Species, seed source, size, harvest condition, expected quantity and availability season give a partnership its starting point. Sensing and software work need to fit those routines.", href: "/contact#production", label: "Discuss a pond partnership", detail: "Grow-out / farmer partner" },
  { id: "controlled-finishing", name: "Controlled finishing", title: "Define the intake and the production unit.", body: "Finishing operators contribute the receiving setting, handling and daily production work. Intake condition, grading, equipment responsibilities, water management and operating records need to be defined together with the pond partner.", href: "/contact#production", label: "Discuss a finishing pilot", detail: "Finishing operator" },
  { id: "buyer-requirements", name: "Buyer requirements", title: "Work back from the requirement.", body: "Processors, buyers and cluster operators contribute the specification: species, size, condition, quantity, required dates, handling and destination. These requirements help shape the trials and proposed production connection.", href: "/contact#market", label: "Discuss market requirements", detail: "Processor / buyer / cluster operator" },
];

export default function ProducersPage() {
  return (
    <div data-page="producers" className={styles.page}>
      <section className={`${styles.section} ${styles.pale} ${styles.producerOpening}`}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>For mud-crab producers</p>
          <div className={styles.openingGrid}>
            <div>
              <h1 className={styles.title}>Start with your production setting.</h1>
              <p className={styles.lead}>Explore a pond partnership, controlled-finishing pilot or the requirements that connect production to market.</p>
              <div className={styles.actions}>
                <Link className={styles.action} href="/contact#production">Discuss a pond partnership <span aria-hidden="true">↗</span></Link>
                <Link className={styles.textLink} href="/aquaos#grow-out-beta">AquaOS grow-out beta interest <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <div className={styles.settingIndex} aria-label="Three production roles">
              <p className={styles.indexHeading}>Your role in the work</p>
              <a href="#pond-production"><span>Pond</span><small>Growing conditions · routines · biomass</small><b aria-hidden="true">↘</b></a>
              <a href="#controlled-finishing"><span>Finishing</span><small>Intake · habitat · operating context</small><b aria-hidden="true">↘</b></a>
              <a href="#buyer-requirements"><span>Market</span><small>Condition · timing · requirements</small><b aria-hidden="true">↘</b></a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>Production contexts</p><h2 className={styles.heading}>Different settings.<br />Specific responsibilities.</h2></div>
          <div className={styles.roleList}>
            {roles.map((role, index) => (
              <article className={styles.roleRow} id={role.id} key={role.name}>
                <div className={styles.roleLabel}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><h3>{role.name}</h3><p>{role.detail}</p></div>
                <div className={styles.roleBody}><h3>{role.title}</h3><p>{role.body}</p><Link className={styles.textLink} href={role.href}>{role.label} <span aria-hidden="true">→</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`}>
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>The daily work</p><h2 className={styles.heading}>Conditions, handling and the next decision.</h2></div>
          <div className={styles.workList}>
            <article><h3>Observe the setting.</h3><p>Connect environmental and operating observations to the pond, cohort or production unit they describe.</p></article>
            <article><h3>Act with a defined responsibility.</h3><p>Identify who reviews an observation, who handles the stock and where a local intervention is appropriate.</p></article>
            <article><h3>Keep the response in the record.</h3><p>AquaOS is being developed to connect conditions, operator decisions, actions and outcomes so the team can review what changed.</p></article>
            <Link className={styles.textLink} href="/system">See how the system fits together <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pale}`}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}><p className={styles.eyebrow}>Proposed production connection</p><h2 className={styles.heading}>Connect the work<br />between settings.</h2><p className={styles.body}>The proposed model links farmer pond biomass with aggregation, grading and controlled finishing around downstream requirements. Transfer condition, size, available quantity and timing need to be examined alongside biological performance and operating costs.</p></div>
          <ol className={styles.network} aria-label="Proposed production pathway">
            {[ ["Hatchery / nursery", "Starting stock and its production context"], ["Farmer production", "Growing conditions and biomass"], ["Controlled finishing", "Intake, handling and operating records"], ["Market requirements", "Size, condition, cadence and destination"] ].map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}
          </ol>
          <div className={styles.networkNote}><span>Production partners help define the connection.</span><p>Partners help define who grows, grades, transports and finishes the stock, and who specifies the required output. Responsibilities, costs and trial arrangements are agreed for each setting.</p></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div><p className={styles.eyebrow}>Start a conversation</p><h2 className={styles.heading}>Bring a setting.<br />Define the question.</h2></div>
          <div><p className={styles.body}>Tell us your operating role, region and species; size and condition of the stock; expected quantity and availability dates; handling and destination; and the production question you want to examine. We can discuss responsibilities, trial scope and useful measurements.</p><div className={styles.actions}><Link className={styles.action} href="/contact#production">Production partnership <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact#market">Buyer or cluster enquiry <span aria-hidden="true">→</span></Link></div></div>
        </div>
      </section>
    </div>
  );
}
