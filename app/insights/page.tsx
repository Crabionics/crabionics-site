import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import styles from "@/app/components/public/CompanyPages.module.css";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "normal", variable: "--font-display", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Insights",
  description: "Crabionics research notes, field learning and production updates, published when the material is ready.",
  alternates: { canonical: "/insights" },
};

const topics = [
  ["Research", "The question, its setting and what the observations show."],
  ["Production & pilots", "The production context, measurements and learning plan."],
  ["Field learning", "Pond biology, biomass conditions and connections between stages."],
  ["Technology", "Physical integration and the operating work around it."],
];

export default function InsightsPage() {
  return <div data-page="insights" className={`${styles.page} ${instrumentSerif.variable}`}>
    <section className={`${styles.insightsIntro} ${styles.pale}`}><div className={styles.wrap}><p className={styles.eyebrow}>Insights / Projects &amp; learning</p><h1>Notes from the work.</h1><div className={styles.insightsLead}><p className={styles.lead}>What we ask, test and learn.</p><p>The public library is being established. Research notes, production and field-learning updates will be published when there is a defined setting, a useful record and evidence to share.</p></div></div></section>
    <section className={styles.section}><div className={`${styles.wrap} ${styles.insightsBody}`}><div><p className={styles.eyebrow}>Future topics</p><h2>A record grounded in the work.</h2></div><ul className={styles.topics}>{topics.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul></div></section>
    <section className={`${styles.section} ${styles.dark} ${styles.closing}`}><div className={`${styles.wrap} ${styles.essay}`}><div><p className={styles.eyebrow}>Explore Crabionics today</p><h2>The system and the questions behind it.</h2></div><div><p>For current information, explore the production architecture and validation programme, or discuss the work with the team.</p><div className={styles.actions}><Link className={styles.button} href="/system">Explore the system <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/validation">Validation programme <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact#research">Discuss the work <span aria-hidden="true">↗</span></Link></div></div></div></section>
  </div>;
}
