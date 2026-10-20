"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./reimagine.module.css";

const layers = [
  {
    id:"habitat",
    number:"01",
    short:"Habitat",
    eyebrow:"BIOLOGY FIRST · FIELD EXPERIENCE",
    title:"One animal. One environment.",
    body:"Mud crabs are not a crop you can simply crowd together. Individual habitats create a practical way to feed, observe and manage animals while designing around moulting and cannibalism risks.",
    image:"/photos/isolation-box.jpg",
    alt:"Blue individual crab habitat used to illustrate compartment-based grow-out",
    imageTag:"FIELD EQUIPMENT",
    stage:"Field experience",
    next:"Explore habitats",
    url:"/solutions/habitat"
  },
  {
    id:"ras",
    number:"02",
    short:"Water",
    eyebrow:"RECIRCULATING AQUACULTURE SYSTEMS",
    title:"Shared water. Engineered control.",
    body:"From individual compartments to solids capture, biofiltration and oxygenation: the water system is the invisible infrastructure that connects every animal.",
    image:"/photos/ras-plumbing.jpg",
    alt:"RAS circulation plumbing and water infrastructure",
    imageTag:"FIELD EQUIPMENT",
    stage:"Engineering foundation",
    next:"Follow the water",
    url:"/system"
  },
  {
    id:"sense",
    number:"03",
    short:"Sensing",
    eyebrow:"ENVIRONMENTAL OBSERVATION · DEVELOPMENT",
    title:"Make the invisible observable.",
    body:"Environmental signals become useful only when they are recorded in context. CrabSense is being developed to connect measurements, equipment and production units; calibration and manual checks still matter.",
    image:"/photos/sensor-node.jpg",
    alt:"Aquaculture monitoring hardware shown as a sensing reference",
    imageTag:"SENSING REFERENCE",
    stage:"In development",
    next:"Explore sensing",
    url:"/solutions/crabsense"
  },
  {
    id:"connect",
    number:"04",
    short:"Equipment",
    eyebrow:"LOCAL EQUIPMENT · DEVELOPMENT",
    title:"The farm still needs a human in control.",
    body:"CrabPod is the developing connection between local equipment, operator instructions and confirmed actions. It is a future integration track, not a claim of autonomous live farm control.",
    image:"/images/company-world.webp",
    alt:"Illustrative connected aquaculture infrastructure",
    imageTag:"SYSTEM CONCEPT",
    stage:"In development",
    next:"See system architecture",
    url:"/system"
  },
  {
    id:"aquaos",
    number:"05",
    short:"AquaOS",
    eyebrow:"OPERATING SOFTWARE · WORKING RAS APPLICATION",
    title:"From observations to an operating record.",
    body:"CrabDesk is the first working RAS grow-out application within AquaOS. Its operator overview, records and built-in Moltie assistant can be explored in a public film using demonstration data.",
    image:"/product/film/poster-desktop.webp",
    alt:"CrabDesk and Moltie product film poster using demonstration records",
    imageTag:"ACTUAL SOFTWARE · DEMO DATA",
    stage:"Working RAS software",
    next:"Watch CrabDesk + Moltie",
    url:"/aquaos"
  }
] as const;

const audiences = [
  {number:"01",name:"For producers",text:"Explore how individual care, water treatment and record keeping could fit your operating context.",link:"/producers",action:"Production pathways"},
  {number:"02",name:"For collaborators",text:"Connect with us on technology, equipment, systems integration and pilot development.",link:"/contact",action:"Discuss a project"},
  {number:"03",name:"For researchers",text:"Understand the biological and engineering questions behind our validation work.",link:"/validation",action:"Research & validation"},
] as const;

export default function Reimagine() {
  const [active,setActive] = useState(0);
  const selected = layers[active];

  return (
    <div className={styles.site} data-page="reimagine">
      <div className={styles.previewNotice}>
        <span className={styles.liveDot} aria-hidden="true" />
        <strong>DESIGN EXPLORATION / NOT PRODUCTION</strong>
        <span className={styles.previewRight}>A NEW WAY TO EXPERIENCE CRABIONICS</span>
      </div>

      <section className={styles.hero} aria-labelledby="reimagine-hero-title">
        <div className={styles.heroGrain} aria-hidden="true"/>
        <div className={styles.heroCopy}>
          <div className={styles.overline}><span>01 / A LIVING SYSTEM</span><i aria-hidden="true" /><span>MUD-CRAB AQUACULTURE</span></div>
          <h1 id="reimagine-hero-title" className={styles.heroTitle}>Life is complex.<br/><em>Farming can be</em><br/>more understood.</h1>
          <p className={styles.heroLead}>Crabionics is engineering the environment around the crab — combining physical systems, biological observation and operating software.</p>
          <div className={styles.heroActions}>
            <a href="#explore-system" className={styles.primaryLink}>Explore the living system <span aria-hidden="true">↘</span></a>
            <Link href="/aquaos" className={styles.quietLink}>See the working software <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.heroScroll} aria-hidden="true"><span className={styles.verticalRule}/> SCROLL TO DISCOVER <span>001—005</span></div>
        </div>
        <div className={styles.heroMedia}>
          <Image src="/photos/isolation-box.jpg" alt="Real blue individual crab habitat infrastructure" fill priority sizes="(max-width: 900px) 100vw, 56vw" className={styles.heroPhoto}/>
          <div className={styles.mediaTint}/>
          <div className={styles.specimenMark}><span className={styles.specimenSmall}>THE STARTING POINT</span><strong>THE<br/>CRAB<span>.</span></strong></div>
          <div className={styles.photoTag}><span className={styles.tagIndex}>FIG 01.</span><span>Physical production infrastructure<br/>Crabionics field context</span></div>
          <div className={styles.mediaAxis} aria-hidden="true"><span>HABITAT</span><span>↗</span><span>WATER</span><span>↗</span><span>DATA</span></div>
        </div>
      </section>

      <section className={styles.manifesto} aria-label="Company philosophy">
        <span className={styles.sectionIndex}>THE PROBLEM / 00</span>
        <p>There is no single challenge in mud-crab farming. <strong>There is a connected biological and operational system.</strong> We are building the tools to understand it, one connection at a time.</p>
        <span className={styles.manifestoFoot}>BIOLOGY <b>+</b> INFRASTRUCTURE <b>+</b> INTELLIGENCE</span>
      </section>

      <section id="explore-system" className={styles.explore} aria-labelledby="layer-heading">
        <div className={styles.sectionHeading}>
          <div><p className={styles.sectionIndex}>INTERACTIVE EXPLORER / 01–05</p><h2 id="layer-heading">Five connected layers.<br/><span>One production reality.</span></h2></div>
          <p>Choose a layer. See what it does, how it connects, and which capabilities are being developed.</p>
        </div>

        <div className={styles.explorerShell}>
          <div className={styles.tabs} role="group" aria-label="Explore the five connected layers">
            {layers.map((layer,index)=><button type="button" key={layer.id} aria-pressed={active===index} onClick={()=>setActive(index)} className={active===index?styles.tabActive:styles.tab}><span>{layer.number}</span><strong>{layer.short}</strong><span aria-hidden="true">{active===index?"↗":"+"}</span></button>)}
          </div>
          <div className={styles.explorerContent}>
            <div className={styles.layerImage} key={selected.id}>
              <Image src={selected.image} alt={selected.alt} fill sizes="(max-width:900px) 100vw, 55vw" className={styles.layerPhoto}/>
              <span className={styles.imageStamp}>{selected.imageTag}</span>
              <span className={styles.layerNumber} aria-hidden="true">{selected.number}</span>
            </div>
            <div className={styles.layerCopy} aria-live="polite">
              <p className={styles.layerKicker}>{selected.eyebrow}</p>
              <h3>{selected.title}</h3>
              <p className={styles.layerDescription}>{selected.body}</p>
              <div className={styles.stageLine}><span className={styles.stageIndicator}/><span>{selected.stage}</span></div>
              <Link className={styles.layerAction} href={selected.url}>{selected.next}<span aria-hidden="true">↗</span></Link>
              <div className={styles.layerCount}><span>THE CONNECTED SYSTEM</span><strong>{selected.number} / 05</strong></div>
            </div>
          </div>
        </div>
        <p className={styles.exploreDisclaimer}>Explore what exists and what is being developed. Concept imagery is labeled. Working software demonstrations use sample records, not live farm performance data.</p>
      </section>

      <section className={styles.physical} aria-label="Engineering and operational intelligence">
        <div className={styles.physicalImage}>
          <Image src="/photos/ras-plumbing.jpg" fill sizes="(max-width: 900px) 100vw, 48vw" alt="Real RAS plumbing and water infrastructure" className={styles.physicalPhoto}/>
          <span className={styles.physicalImageTag}>PHYSICAL ENGINEERING / FIELD CONTEXT</span>
        </div>
        <div className={styles.physicalCopy}>
          <p className={styles.sectionIndex}>HARDWARE × BIOLOGY / 02</p>
          <h2>Not a dashboard<br/>looking for a farm.</h2>
          <p>We began with mud crabs, production racks, water circuits and the practical realities of grow-out. That field experience is the foundation for the connected system.</p>
          <div className={styles.physicalFacts}>
            <div><strong>01</strong><span>Design around crab biology</span></div>
            <div><strong>02</strong><span>Engineer the water environment</span></div>
            <div><strong>03</strong><span>Connect daily observations</span></div>
          </div>
          <Link href="/company" className={styles.whiteLink}>Our company and field journey <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.software} aria-labelledby="software-heading">
        <div className={styles.softwareCopy}>
          <p className={styles.sectionIndex}>THE WORKING APPLICATION / 03</p>
          <p className={styles.smallPreheading}>INTRODUCING CRABDESK + MOLTIE</p>
          <h2 id="software-heading">Records with context.<br/><span>Questions with sources.</span></h2>
          <p>CrabDesk brings RAS grow-out operations into a working interface. Moltie helps users ask questions about the available records and inspect the underlying source information.</p>
          <div className={styles.softwareStatus}><span className={styles.activePulse}/> WORKING RAS SOFTWARE <span className={styles.statusSep}>/</span> DEMO RECORDS</div>
          <Link href="/aquaos" className={styles.softwareButton}>Watch the actual product film <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.softwareImage}>
          <Image src="/product/film/poster-desktop.webp" alt="Actual CrabDesk and Moltie film poster using demonstration data" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.softwarePhoto}/>
          <Link href="/aquaos" aria-label="Go to CrabDesk + Moltie product film" className={styles.playCircle}>▶</Link>
          <span className={styles.softwareStamp}>ACTUAL INTERFACE CAPTURE · DEMONSTRATION DATA</span>
        </div>
      </section>

      <section className={styles.roadmap} aria-label="Capability maturity">
        <div className={styles.roadmapHeader}><p className={styles.sectionIndex}>MILESTONES / 04</p><h2>Built in stages.<br/><span>Not promises disguised as products.</span></h2></div>
        <div className={styles.roadmapGrid}>
          <div><span className={styles.roadNum}>01 — FOUNDATION</span><strong>Physical system experience</strong><p>Individual habitats, RAS engineering and field learning.</p><small>EXISTING FIELD WORK</small></div>
          <div><span className={styles.roadNum}>02 — WORKING</span><strong>CrabDesk + Moltie</strong><p>RAS grow-out operations, records and source-linked assistant responses.</p><small>DEMONSTRABLE SOFTWARE</small></div>
          <div><span className={styles.roadNum}>03 — DEVELOPMENT</span><strong>Broader connected intelligence</strong><p>Pond workflows, equipment connections, hatchery intelligence and validation.</p><small>R&D / DEVELOPMENT TRACKS</small></div>
        </div>
      </section>

      <section className={styles.audiences} aria-labelledby="audiences-title">
        <div className={styles.sectionHeading}><div><p className={styles.sectionIndex}>WORK WITH US / 05</p><h2 id="audiences-title">Different starting points.<br/><span>A shared problem to solve.</span></h2></div><p>Technology has to meet the people doing the work. Start with the path most relevant to you.</p></div>
        <div className={styles.audienceGrid}>
          {audiences.map(a=><Link key={a.number} href={a.link} className={styles.audienceCard}><span>{a.number} / CRABIONICS</span><h3>{a.name}</h3><p>{a.text}</p><div>{a.action}<span aria-hidden="true">↗</span></div></Link>)}
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalLine} aria-hidden="true"/>
        <p className={styles.sectionIndex}>THE NEXT CONVERSATION</p>
        <h2>A better aquaculture system<br/><em>starts with a real problem.</em></h2>
        <p>Tell us what you are farming, building or trying to understand. We will start there.</p>
        <div className={styles.finalLinks}><Link href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link><Link href="/early-access#register">Register interest in CrabDesk <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.finalFoot}><span>CRABIONICS AQUACULTURE PRIVATE LIMITED</span><span>BIOLOGY / ENGINEERING / OPERATING INTELLIGENCE</span></div>
      </section>
    </div>
  );
}
