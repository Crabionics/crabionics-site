import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/public/CompanyPages.module.css";

export const metadata: Metadata = {
  title: "Investors",
  description: "The Crabionics infrastructure thesis, current research and production validation, and the development path towards wider deployment.",
  alternates: { canonical: "/investors" },
};

const thesis = [
  ["Company problem", "Biology and operating conditions need to be understood together.", "Mud-crab production depends on animal behaviour, habitat, water, handling and human decisions. The production environment is the foundation for repeatability."],
  ["System approach", "Connect the physical setting with observation and action.", "Crabionics is developing individual habitats, CrabSense observation, operator-governed CrabPod intervention and AquaOS operating records around the production work."],
  ["Current development", "Bring the system together and study defined settings.", "Current work includes system integration, funded research, pond biological learning and a defined 600-box controlled-finishing pilot scope."],
  ["Commercial questions", "Understand where the system fits and who would adopt it.", "Producer, processor, buyer and cluster-operator conversations examine practical requirements, adoption and who would support the integration layer."],
];

const progression = [
  ["Production unit", "Physical integration, biological and operating outcomes."],
  ["Production connections", "Suitable biomass, transfer conditions and buyer requirements."],
  ["Repeatable cluster", "Adoption, operating responsibilities and deployment economics."],
  ["Wider network", "Learning across production settings and clusters."],
];

export default function InvestorsPage() {
  return <div data-page="investors" className={styles.page}>
    <section className={`${styles.investorIntro} ${styles.dark}`}><div className={styles.wrap}>
      <p className={styles.eyebrow}>Company / Investors</p>
      <div className={styles.investorOpening}><div><h1>Building the production infrastructure for mud-crab aquaculture.</h1><p className={styles.lead}>An integrated approach to biology, habitat, observation, local action and operating records—developed around the people running production.</p><Link className={styles.button} href="/contact#investors">Discuss the company and investment <span aria-hidden="true">↗</span></Link></div><figure className={styles.investorImage}><Image src="/images/company-world.webp" alt="Concept illustration of Crabionics production habitats and water equipment within a physical aquaculture setting." fill sizes="(max-width: 767px) 100vw, 40vw" className={styles.detailImage} /><figcaption>Concept illustration</figcaption></figure></div>
    </div></section>

    <section className={styles.section}><div className={styles.wrap}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The thesis</p><h2>Company, system and development.</h2></div><p>The wider production network is a later application of the architecture. Today’s work starts with the production unit and the questions around it.</p></div><div className={styles.thesis}>{thesis.map(([label, title, text], index) => <article key={label} className={styles.thesisRow}><p className={styles.rowNumber}>0{index + 1}</p><div><p className={styles.eyebrow}>{label}</p><h3>{title}</h3></div><p>{text}</p></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.pale}`}><div className={styles.wrap}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Development pathway</p><h2>From the unit to wider deployment.</h2></div><p>Physical integration, biological outcomes, commercial adoption and scale each need their own evidence. The proposed wider connection links farmer grow-out, controlled finishing and market requirements.</p></div><ol className={styles.progression}>{progression.map(([title, text], index) => <li key={title}><span className={styles.rowNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className={styles.actions}><Link href="/validation" className={`${styles.button} ${styles.darkButton}`}>Explore validation <span aria-hidden="true">↗</span></Link><Link href="/company" className={styles.textLink}>People and research context <span aria-hidden="true">↗</span></Link></div></div></section>

    <section className={`${styles.section} ${styles.dark} ${styles.closing}`}><div className={`${styles.wrap} ${styles.essay}`}><div><p className={styles.eyebrow}>A current company conversation</p><h2>Discuss the work and where it could lead.</h2></div><div><p>Contact the team for the latest development and validation context, and to discuss your interest in Crabionics.</p><Link className={styles.button} href="/contact#investors">Discuss the company and investment <span aria-hidden="true">↗</span></Link></div></div></section>
  </div>;
}
