"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./TechnologyExplorer.module.css";

const layers = [
  { name: "Habitat", label: "Biological environment", title: "Start with the animal.", description: "Individual spaces bring care, handling and observation to the scale of a single crab. Water management supports the production setting around it.", detail: "Physical layer", relation: "Habitat → observations", href: "/solutions/habitat", image: "/photos/isolation-box.jpg", alt: "A mud crab resting inside an individual blue habitat.", caption: "Individual habitat · production photograph" },
  { name: "CrabSense", label: "Sensing & observation", title: "Give every reading a context.", description: "Connect water measurements and operator observations to a production unit and time. Calibration, maintenance and measurement quality are part of the sensing work.", detail: "Observation layer", relation: "Observations → operator review", href: "/solutions/crabsense", image: "/photos/ras-plumbing.jpg", alt: "Production racks and supporting water equipment.", caption: "Production setting · sensing integration in development" },
  { name: "CrabPod", label: "Local equipment connection", title: "Connect a decision to a response.", description: "A developing local interface between permitted commands and equipment. Operator oversight, acknowledgements and response checks define each integration.", detail: "Equipment layer", relation: "Approved action → equipment → response check", href: "/solutions/crabpod", image: "/photos/ras-plumbing.jpg", alt: "Water equipment and plumbing beside individual production racks.", caption: "Supporting equipment · local integration in development" },
  { name: "AquaOS", label: "Operating software", title: "Keep the whole story together.", description: "Stock, feeding, water observations and follow-ups belong in one operating history. Connect what the team noticed, what it decided and what changed afterwards.", detail: "Operating layer", relation: "Context → review → action → outcome", href: "/aquaos", image: null, alt: "", caption: "Illustrative interface · sample records, not live farm data" },
];

export function TechnologyExplorer() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const layer = layers[selected];
  return <div className={s.explorer}>
    <div className={s.selector} role="tablist" aria-label="Explore the Crabionics technology layers">
      {layers.map((item, i) => <button key={item.name} id={`${id}-tab-${i}`} role="tab" type="button" aria-selected={selected === i} aria-controls={`${id}-panel`} tabIndex={selected === i ? 0 : -1}
        onClick={() => setSelected(i)} onKeyDown={event => {
          let next = i;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % layers.length;
          else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i + layers.length - 1) % layers.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = layers.length - 1;
          else return;
          event.preventDefault(); setSelected(next);
          document.getElementById(`${id}-tab-${next}`)?.focus();
        }}><span className={s.index}>0{i + 1}</span><span><strong>{item.name}</strong><small>{item.label}</small></span><span aria-hidden="true">↗</span></button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className={s.panel}>
      <div className={s.visual}>
        {layer.image ? <Image key={layer.image} src={layer.image} alt={layer.alt} fill sizes="(max-width: 767px) 100vw, 55vw" className={selected === 0 ? s.crabPhoto : s.equipmentPhoto} /> : <OperatingPreview />}
        <span className={s.caption}>{layer.caption}</span>
      </div>
      <div className={s.description}>
        <div><span className={s.kicker}>{layer.detail}</span><h3>{layer.title}</h3><p>{layer.description}</p></div>
        <Link href={layer.href}>Explore {layer.name} <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={s.connection}><span className={s.dot} />{layer.relation}<span className={s.scope}>Components & integration in development</span></div>
    </div>
  </div>;
}

export function OperatingPreview() {
  return <div className={s.console} aria-label="Illustrative AquaOS operating record. Sample information, not live farm data.">
    <div className={s.consoleBar}><strong>AquaOS<span> / workspace</span></strong><span className={s.sample}>SAMPLE DATA</span></div>
    <div className={s.consoleBody}>
      <div className={s.consoleRail}><span>Overview</span><strong>Daily rounds</strong><span>Stock records</span><span>Water & care</span><span>History</span><small>Operator workspace<br/>Design direction</small></div>
      <div className={s.consoleMain}><div className={s.consoleTitle}><span>PRODUCTION / DAILY ROUND</span><h4>A record with a reason.</h4><p>Habitat B-12 · illustrative operating context</p></div>
        {[ ["01", "Observe", "Feed response needs a follow-up", "Recorded"], ["02", "Review", "Earlier feed response: missing", "Review needed"], ["03", "Follow up", "Operator inspection requested", "Task only"], ["04", "Check outcome", "Return to record what changed", "Pending"] ].map(([n,title,detail,state]) => <div className={s.record} key={n}><span>{n}</span><div><strong>{title}</strong><small>{detail}</small></div><em>{state}</em></div>)}
        <div className={s.consoleNote}><span className={s.dot} />Operator oversight · no equipment command issued</div>
      </div>
    </div>
  </div>;
}

const waterSteps = [
  {title:"Production habitats", text:"The rearing environment is the starting point. Stock, feeding and daily care determine the biological load entering the water system."},
  {title:"Solids removal", text:"Remove uneaten feed and particulate waste. Mechanical separation and cleaning routines are selected for the installation and operating load."},
  {title:"Biological treatment", text:"A biofilter supports microbial conversion of ammonia through nitrification. Maturation, oxygen and alkalinity need attention; a diagram alone cannot establish treatment capacity."},
  {title:"Condition & return", text:"Check oxygenation, circulation and relevant water conditions before return. Make-up water and discharge requirements remain specific to the site."},
];
export function WaterPath() {
  const [step,setStep] = useState(0);
  return <div className={s.water}>
    <div className={s.waterHead}><span>RAS / CONCEPTUAL WATER PATH</span><span>Recirculation ≠ zero exchange</span></div>
    <ol className={s.waterSteps}>{waterSteps.map((item,i)=><li key={item.title}><button type="button" aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span><svg viewBox="0 0 80 64" fill="none" aria-hidden="true"><path d={i===0?"M12 17h56v38H12zM12 29h56M26 17v38M53 17v38M8 9h64":i===1?"M16 10h48v32L47 54H33L16 42zM21 22h38M21 30h38M29 38h22":i===2?"M15 10h50v45H15zM23 20h7v7h-7zM43 20h7v7h-7zM33 37h7v7h-7zM53 37h5M23 44h4":"M40 7c-8 12-20 24-20 34a20 20 0 0 0 40 0C60 31 48 19 40 7zM31 44c0 6 4 10 10 10"} stroke="currentColor" strokeWidth="1.5"/></svg><strong>{item.title}</strong><span aria-hidden="true" className={s.flowArrow}>→</span></button></li>)}</ol>
    <div className={s.waterDetail} aria-live="polite"><strong>{waterSteps[step].title}</strong><p>{waterSteps[step].text}</p></div>
    <div className={s.returnPath}><span aria-hidden="true">↳</span> Return water to the habitats <span aria-hidden="true">↰</span></div>
    <p className={s.waterNote}>Functional explanation of a RAS. Configuration, treatment capacity and integration require site-specific engineering and validation.</p>
  </div>;
}
