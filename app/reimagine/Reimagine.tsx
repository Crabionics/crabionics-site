"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./reimagine.module.css";

const moments=[
 {number:"01",title:"The animal",image:"/photos/isolation-box.jpg",alt:"Individual blue crab habitats in field production equipment",eyebrow:"BIOLOGY IS THE BRIEF",body:"Growth, moulting and cannibalism never follow a slide deck. The system starts by designing care around each animal."},
 {number:"02",title:"The environment",image:"/photos/ras-plumbing.jpg",alt:"Actual crab production rack and RAS circulation equipment",eyebrow:"ENGINEERING IS THE RESPONSE",body:"Habitat, water circulation and treatment are engineered together. The physical environment is where dependable production must begin."},
 {number:"03",title:"The operating record",image:"/product/film/poster-desktop.webp",alt:"Actual CrabDesk and Moltie captured software demo using sample records",eyebrow:"SOFTWARE ADDS CONTEXT",body:"CrabDesk, the first working AquaOS application, helps bring RAS grow-out operations into a shared record. Moltie helps explore information and its sources."}
] as const;

export default function Reimagine(){
 const [reveal,setReveal]=useState(48);
 return <div className={s.page} data-page="reimagine">
  <div className={s.preview}><span><i aria-hidden="true"/> CONCEPT PREVIEW</span><span>Production website unchanged · Not a released product</span></div>

  <section className={s.hero} aria-labelledby="reimagine-title">
    <div className={s.heroVisual}>
      <Image src="/photos/ras-plumbing.jpg" fill priority alt="Real crab grow-out RAS racks and water-treatment infrastructure" sizes="100vw" className={s.heroImage}/>
      <div className={s.heroShade}/>
      <div className={s.heroCoordinate}>FIG. 001 <span>FIELD INFRASTRUCTURE</span></div>
    </div>
    <div className={s.heroContent}>
      <p className={s.micro}><span className={s.microLine}/> CRABIONICS / AQUACULTURE ENGINEERING</p>
      <h1 id="reimagine-title">Farming starts<br/>with <em>life.</em><br/><span>We build around it.</span></h1>
      <div className={s.heroBottom}>
        <p>From individual crab habitats to recirculating water and operating intelligence. One biological challenge. A connected engineering response.</p>
        <a href="#the-story" className={s.start}>Enter the story <span aria-hidden="true">↘</span></a>
      </div>
    </div>
    <div className={s.heroFoot}><span>ODISHA, INDIA — MUD CRAB AQUACULTURE</span><span>SCROLL / DISCOVER</span><span>01 — 05</span></div>
  </section>

  <section className={s.thesis} id="the-story" aria-labelledby="thesis-title">
    <div className={s.sectionIndex}><span>01 / THE STARTING POINT</span><span>MORE THAN A TECHNOLOGY STORY</span></div>
    <div className={s.thesisGrid}>
      <h2 id="thesis-title">You cannot engineer production without understanding <em>the crab.</em></h2>
      <div className={s.thesisSide}>
        <p>Individual survival, water quality, moulting and daily care are connected problems. That is why Crabionics began with physical aquaculture—not with an app.</p>
        <Link href="/company">Explore the field journey <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className={s.visualTriptych}>
      {moments.map((moment,i)=><article key={moment.number} className={s.moment}>
        <div className={s.momentImage}>
          <Image src={moment.image} alt={moment.alt} fill sizes="(max-width: 780px) 100vw, 33vw" className={s.momentPhoto}/>
          <span className={s.momentNumber}>{moment.number}</span>
          {i===2?<span className={s.demoFlag}>REAL UI · DEMO RECORDS</span>:<span className={s.demoFlag}>FIELD CONTEXT</span>}
        </div>
        <div className={s.momentBody}><span>{moment.eyebrow}</span><h3>{moment.title}</h3><p>{moment.body}</p></div>
      </article>)}
    </div>
  </section>

  <section className={s.revealSection} aria-labelledby="reveal-heading">
    <div className={s.revealHeader}>
      <p className={s.sectionIndex}>02 / FROM FIELD TO OPERATING INTELLIGENCE</p>
      <h2 id="reveal-heading">The next layer of aquaculture<br/><em>is context.</em></h2>
      <p>Move the divider to see two real parts of our work. The hardware photograph and the software capture are separate; this is not a depiction of live equipment integration.</p>
    </div>
    <div className={s.comparison}>
      <div className={s.compareBase}>
        <Image src="/product/film/poster-desktop.webp" alt="CrabDesk and Moltie demonstration film still with sample records" fill sizes="(max-width: 800px) 100vw, 1100px" className={s.comparePhoto}/>
        <span className={s.compareLabelRight}>SOFTWARE / CRABDESK + MOLTIE</span>
      </div>
      <div className={s.compareOverlay} style={{clipPath:`inset(0 ${100-reveal}% 0 0)`}}>
        <Image src="/photos/ras-plumbing.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 1100px" className={s.comparePhoto}/>
        <span className={s.compareLabelLeft}>FIELD / RAS INFRASTRUCTURE</span>
      </div>
      <div className={s.compareDivider} style={{left:`${reveal}%`}} aria-hidden="true"><span>↔</span></div>
      <label className={s.srOnly} htmlFor="system-reveal">Drag to compare RAS field equipment and the working CrabDesk software film</label>
      <input id="system-reveal" type="range" min="5" max="95" value={reveal} onChange={e=>setReveal(Number(e.target.value))} className={s.compareSlider} aria-valuetext={`${reveal}% field equipment, ${100-reveal}% CrabDesk software`}/>
    </div>
    <div className={s.comparisonFoot}>
      <p><b>Physical foundation</b><br/>Habitat, water treatment and field-engineered infrastructure</p>
      <p><b>Digital capability</b><br/>RAS grow-out records and Moltie, shown using sample records</p>
      <Link href="/aquaos">Watch the software in action ↗</Link>
    </div>
  </section>

  <section className={s.stages} aria-labelledby="journey-heading">
    <div className={s.stagesLead}>
      <span className={s.sectionIndex}>03 / PROGRESS, NOT PRETENSE</span>
      <h2 id="journey-heading">Built in the field.<br/><em>Moving into software.</em></h2>
    </div>
    <div className={s.stagesGrid}>
      <article><span className={s.stageNo}>01</span><h3>The experience</h3><p>Early crab-farming and individual-habitat experiments laid the practical foundation for the company.</p><small>FIELD DEVELOPMENT</small></article>
      <article><span className={s.stageNo}>02</span><h3>The infrastructure</h3><p>RAS engineering, controlled environments and water-treatment work connect biology to physical production systems.</p><small>ENGINEERING & VALIDATION</small></article>
      <article><span className={s.stageNo}>03</span><h3>The software</h3><p>CrabDesk + Moltie is the first working RAS grow-out application in the evolving AquaOS platform.</p><small>WORKING SOFTWARE · DEMO DATA</small></article>
      <article><span className={s.stageNo}>04</span><h3>The next frontier</h3><p>Pond workflows, equipment connectivity, hatchery intelligence and predictive systems are development and validation tracks.</p><small>ROADMAP / RESEARCH</small></article>
    </div>
  </section>

  <section className={s.product} aria-labelledby="product-heading">
    <div className={s.productCopy}>
      <span className={s.sectionIndex}>04 / OUR FIRST WORKING SOFTWARE</span>
      <p className={s.productKicker}>MEET CRABDESK + MOLTIE</p>
      <h2 id="product-heading">What happens<br/>after the observation?</h2>
      <p>Put RAS grow-out records in one place. Ask a useful question. Inspect the information behind the answer. This is the beginning of AquaOS—not a claim that every piece of farm equipment is connected today.</p>
      <Link href="/aquaos" className={s.productCta}>Experience the product film <span aria-hidden="true">↗</span></Link>
      <span className={s.productMeta}>WORKING RAS SOFTWARE / DEMONSTRATION DATA</span>
    </div>
    <div className={s.productVisual}>
      <Image src="/product/film/poster-desktop.webp" alt="Authentic CrabDesk product-film capture of Moltie assistant and supporting operational records" fill sizes="(max-width: 900px) 100vw, 60vw" className={s.productImage}/>
      <Link href="/aquaos" aria-label="Open CrabDesk and Moltie product film" className={s.watch}><span aria-hidden="true">▶</span> WATCH THE ACTUAL INTERFACE</Link>
    </div>
  </section>

  <section className={s.dialogue} aria-labelledby="dialogue-heading">
    <span className={s.sectionIndex}>05 / THE INVITATION</span>
    <h2 id="dialogue-heading">Different production problems.<br/><em>One place to start.</em></h2>
    <div className={s.pathways}>
      <Link href="/producers"><span>FOR PRODUCERS</span><strong>Improve the working system.</strong><span className={s.pathArrow}>↗</span></Link>
      <Link href="/validation"><span>FOR RESEARCHERS</span><strong>Investigate the biology.</strong><span className={s.pathArrow}>↗</span></Link>
      <Link href="/contact"><span>FOR PARTNERS</span><strong>Build what comes next.</strong><span className={s.pathArrow}>↗</span></Link>
    </div>
    <div className={s.finalAction}><p>Tell us your operating context. We will start with the real problem.</p><Link href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link></div>
  </section>
 </div>;
}
