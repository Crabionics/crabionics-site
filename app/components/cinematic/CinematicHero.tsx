import Image from "next/image";
import Link from "next/link";
import s from "./CinematicHero.module.css";

const layers = [["Habitat", "habitat"], ["RAS", "water"], ["CrabSense", "sense"], ["CrabPod", "pod"], ["AquaOS", "aquaos"]];

export default function CinematicHero() {
  return (
    <section className={s.hero} aria-labelledby="cinematic-title">
      <div className={s.heading}>
        <div className={s.prelude}>
          <span><i aria-hidden="true" /> MUD-CRAB AQUACULTURE / CRABIONICS</span>
          <span>BIOLOGY × ENGINEERING × SOFTWARE</span>
        </div>
        <h1 id="cinematic-title">Built around the crab.<br /><span>Connected by design.</span></h1>
        <div className={s.introduction}>
          <div className={s.biologyIntro}>
            <Image src="/photos/isolation-box.jpg" alt="Mud crab in an individual blue habitat." width={72} height={72} sizes="72px" />
            <p>Modular habitats, recirculating water, sensing and local equipment—being developed together with AquaOS.</p>
          </div>
          <div className={s.actions}>
            <a className={s.primaryAction} href="#connected-system">Explore the connected system <span aria-hidden="true">↓</span></a>
            <Link href="/contact#production">Discuss your production setting <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <figure className={s.field}>
        <Image src="/photos/ras-plumbing.jpg" alt="Real blue individual crab production racks, circulation plumbing and water-treatment equipment." fill preload sizes="100vw" className={s.fieldImage} />
        <div className={s.imageTop}><span>INSIDE THE PRODUCTION ENVIRONMENT</span><span>Production equipment photograph</span></div>
        <a className={`${s.hotspot} ${s.habitat}`} href="#connection-habitat"><span className={s.target} aria-hidden="true" /><span>Individual habitats <b aria-hidden="true">↗</b></span></a>
        <a className={`${s.hotspot} ${s.water}`} href="#connection-water"><span className={s.target} aria-hidden="true" /><span>Water infrastructure <b aria-hidden="true">↗</b></span></a>
        <figcaption className={s.imageBottom}><span>THE PHYSICAL FOUNDATION</span><p>A defined environment.<br />A connected operating system.</p></figcaption>
      </figure>
      <nav className={s.index} aria-label="Explore the technology layers">
        <span className={s.indexLabel}>FOLLOW THE CONNECTIONS</span>
        <div>{layers.map(([name, id], i) => <a key={id} href={`#connection-${id}`}><span>0{i + 1}</span>{name}<b aria-hidden="true">↗</b></a>)}</div>
      </nav>
    </section>
  );
}
