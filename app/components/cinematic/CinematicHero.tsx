import Image from "next/image";
import Link from "next/link";
import s from "./CinematicHero.module.css";

export default function CinematicHero() {
  return <section className={s.hero} aria-labelledby="cinematic-title">
    <div className={s.heading}>
      <div className={s.prelude}><span><i /> CRABIONICS / CONNECTED AQUACULTURE</span><span>BIOLOGY × ENGINEERING × SOFTWARE</span></div>
      <h1 id="cinematic-title">Biology at the centre.<br/><span>Everything connected.</span></h1>
      <div className={s.introduction}><div className={s.biologyIntro}><Image src="/photos/isolation-box.jpg" alt="Mud crab in an individual blue habitat." width={72} height={72} sizes="72px"/><p>We’re developing the connection between mud-crab biology,<br className={s.desktopBreak}/> modular farming systems and the people doing the work.</p></div><a href="#connected-system">Discover the system <span aria-hidden="true">↓</span></a></div>
    </div>
    <figure className={s.field}>
      <Image src="/photos/ras-plumbing.jpg" alt="Real blue individual crab production racks, circulation plumbing and water-treatment equipment." fill preload sizes="100vw" className={s.fieldImage}/>
      <div className={s.imageTop}><span>01 / INSIDE THE PRODUCTION ENVIRONMENT</span><span>Production equipment photograph</span></div>
      <a className={`${s.hotspot} ${s.habitat}`} href="#connection-habitat"><span className={s.target} aria-hidden="true"/><span>Individual habitats <b aria-hidden="true">↗</b></span></a>
      <a className={`${s.hotspot} ${s.water}`} href="#connection-water"><span className={s.target} aria-hidden="true"/><span>Water infrastructure <b aria-hidden="true">↗</b></span></a>
      <figcaption className={s.imageBottom}><div><span>REAL SYSTEMS. REAL OPERATING QUESTIONS.</span><p>From the animal’s environment<br/>to the next informed decision.</p></div><Link href="/contact#production">Discuss a production project <span aria-hidden="true">↗</span></Link></figcaption>
      <span className={s.cross} aria-hidden="true">+</span>
    </figure>
    <div className={s.index}><span>HABITAT</span><i aria-hidden="true"/><span>WATER</span><i aria-hidden="true"/><span>CRABSENSE</span><i aria-hidden="true"/><span>CRABPOD</span><i aria-hidden="true"/><span>AQUAOS</span><small>Components & integration in development</small></div>
  </section>;
}
