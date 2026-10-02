import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/public/CompanyPages.module.css";

export const metadata: Metadata = {
  title: "Company",
  description: "The field experience, people, physical production work and research relationships behind Crabionics.",
  alternates: { canonical: "/company" },
};

const people = [
  { name: "Sameer Kumar Dalai", role: "Founder / Company Lead", photo: "/team/sameer-kumar-dalai.jpg", bio: "Field aquaculture, system design and company execution." },
  { name: "M Abhishek", role: "Technology / AquaOS", photo: "/team/m-abhishek.jpg", bio: "Technology systems, software/firmware and the AquaOS system." },
];

const institutions = [
  { name: "KIIT-TBI", caption: "Technology incubation", logo: "/logos/kiit-tbi.png" },
  { name: "BIRAC / IHMS", caption: "Funded research relationship", logo: "/logos/birac-big.png" },
  { name: "DPIIT Recognition", caption: "Startup recognition", logo: "/logos/dpiit-startup-india.png" },
];

export default function CompanyPage() {
  return <div data-page="company" className={styles.page}>
    <section className={`${styles.companyIntro} ${styles.pale}`}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Company</p>
        <div className={styles.companyOpening}>
          <div>
            <h1>Built from the production problem outward.</h1>
            <p className={styles.lead}>Crabionics brings biology, physical production infrastructure, engineering and operating software together around mud-crab aquaculture.</p>
            <Link className={styles.textLink} href="/system">Explore the production system <span aria-hidden="true">↗</span></Link>
          </div>
          <figure className={styles.worldDetail}>
            <Image src="/images/company-world.webp" alt="Concept illustration showing individual blue crab habitats, production racks, water equipment and a human operator." fill sizes="(max-width: 767px) 100vw, 45vw" className={styles.detailImage} />
            <figcaption>Concept illustration</figcaption>
          </figure>
        </div>
        <div className={styles.companyCoordinates} aria-label="Company disciplines">
          <span>Biology</span><span>Production infrastructure</span><span>Engineering</span><span>Operating software</span>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={`${styles.wrap} ${styles.essay}`}>
        <div><p className={styles.eyebrow}>Why Crabionics exists</p><h2>The production environment is the starting point.</h2></div>
        <div className={styles.prose}>
          <p>Mud-crab production brings together animal behaviour, habitat, water conditions, handling and operator decisions. These conditions need to be understood together.</p>
          <p>Individual habitats, sensing, local intervention and AquaOS are being developed around that physical work. The people running production remain central to observation, decisions and care.</p>
          <p>Crabionics connects the physical production environment, the biological problem and the operating decisions around them. Relevant Odisha and Andhra Pradesh field work, including Ninjacrab 2022, forms part of the company’s research and operating history.</p>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.pale}`}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The people</p><h2>Field operations, engineering and software.</h2></div><p>The team combines company execution, field aquaculture, system design and software/firmware work around the production problem.</p></div>
        <div className={styles.people}>
          {people.map(({ name, role, photo, bio }) => <article className={styles.person} key={name}>
            <div className={styles.portrait}><Image src={photo} alt={`${name}, ${role}`} fill sizes="(max-width: 767px) 100vw, 40vw" className={styles.portraitImage} /></div>
            <div className={styles.personCopy}><p className={styles.eyebrow}>{role}</p><h3>{name}</h3><p>{bio}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.dark}`}>
      <div className={`${styles.wrap} ${styles.essay}`}>
        <div><p className={styles.eyebrow}>Development programme</p><h2>Bring the system together. Learn in production.</h2></div>
        <div className={styles.prose}>
          <p>The current focus is system integration and defined production validation. Scientific validation capability is being established alongside that work.</p>
          <p>Funded research, pond biological learning and the controlled-finishing pilot examine different parts of the production problem. Biological outcomes, operating repeatability and commercial fit are measured in their own settings.</p>
          <div className={styles.actions}><Link href="/validation" className={styles.button}>See the validation programme <span aria-hidden="true">↗</span></Link><Link href="/investors" className={styles.textLink}>Investor context <span aria-hidden="true">↗</span></Link></div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Institutional relationships</p><h2>Support for the build and research context.</h2></div><p>These relationships form part of Crabionics’ current incubation, recognition and funded research context.</p></div>
        <div className={styles.institutions}>{institutions.map(({ name, caption, logo }) => <div key={name} className={styles.institution}>
          <div className={styles.logo}><Image src={logo} alt={name} fill sizes="(max-width: 767px) 200px, 260px" className={styles.logoImage} /></div>
          <h3>{name}</h3><p>{caption}</p>
        </div>)}</div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.pale}`}>
      <div className={`${styles.wrap} ${styles.essay}`}>
        <div><p className={styles.eyebrow}>Longer-term direction / CIN</p><h2>Extend what can be repeated.</h2></div>
        <div className={styles.prose}><p>The wider direction connects seed and farmer grow-out, controlled finishing and market requirements. CIN is the longer-term direction for learning across multiple clusters.</p><p>That development depends on repeatable production units, reliable biomass supply and demonstrated partner demand.</p><Link className={styles.textLink} href="/producers">Explore the proposed production connection <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.dark} ${styles.closing}`}><div className={`${styles.wrap} ${styles.essay}`}><div><p className={styles.eyebrow}>Work with Crabionics</p><h2>Start with the question you want to explore.</h2></div><div><p>Discuss a research partnership, institutional collaboration or a current company conversation.</p><div className={styles.actions}><Link className={styles.button} href="/contact#research">Research partnership <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href="/contact#institutions">Government or institutional collaboration <span aria-hidden="true">↗</span></Link></div></div></div></section>
  </div>;
}
