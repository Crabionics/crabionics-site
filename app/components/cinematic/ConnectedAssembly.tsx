"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./ConnectedAssembly.module.css";

const layerRoles = ["Individual care & observation", "Circulation & treatment", "Measurements in context", "Local equipment connection", "Decisions & operating history"];

const chapters = [
 {id:"habitat",name:"Habitat",tag:"01 / THE BIOLOGY",title:"One animal. A defined environment.",body:"An individual space brings feeding, handling and observation to the scale of a single crab. The animal and its production stage define the operating question.",href:"/solutions/habitat",link:"Explore the habitat",image:"/photos/isolation-box.jpg",alt:"A mud crab resting in a blue individual habitat.",caption:"Individual habitat · production photograph"},
 {id:"water",name:"RAS",tag:"02 / THE WATER",title:"The water connects the physical system.",body:"Circulation links habitats with solids removal, biological treatment and oxygenation. Configuration, treatment capacity and water exchange depend on the site and biological load.",href:"/system#water",link:"Follow the water system",image:"/photos/ras-plumbing.jpg",alt:"Production racks connected to circulation plumbing and water treatment equipment.",caption:"Water infrastructure · production photograph"},
 {id:"sense",name:"CrabSense",tag:"03 / THE OBSERVATION",title:"A reading needs a place and a time.",body:"Environmental measurements become useful when linked to the right unit, cohort and operating context. Calibration, maintenance and operator observations are part of that work.",href:"/solutions/crabsense",link:"Explore CrabSense",image:null,alt:"",caption:"Sensing scope & integration in development"},
 {id:"pod",name:"CrabPod",tag:"04 / THE RESPONSE",title:"Connect the decision to local equipment.",body:"Where integration is available, a permitted action passes to equipment under operator oversight. An acknowledgement and a measured response help establish what actually happened.",href:"/solutions/crabpod",link:"Explore CrabPod",image:null,alt:"",caption:"Local equipment integration in development"},
 {id:"aquaos",name:"AquaOS",tag:"05 / THE OPERATING HISTORY",title:"Bring the connections into one history.",body:"Connect stock, water observations, feeding and follow-ups with the decisions and outcomes that follow. A useful record keeps the next operating question grounded in context.",href:"/aquaos",link:"Explore AquaOS",image:null,alt:"",caption:"Operating layer in development · illustrative interface"},
];

function point(x:number,y:number,z:number){return [295+(x-y)*.9,405+(x+y)*.36-z];}
function Block({x,y,z,w=58,d=67,h=27,light=false}:{x:number;y:number;z:number;w?:number;d?:number;h?:number;light?:boolean}){
 const p=(a:number,b:number,c:number)=>point(a,b,c).join(",");
 return <g stroke="#a9e4e4" strokeOpacity=".4" strokeWidth=".7"><polygon points={[p(x,y,z+h),p(x+w,y,z+h),p(x+w,y+d,z+h),p(x,y+d,z+h)].join(" ")} fill={light?"#98c7b4":"#84bac8"}/><polygon points={[p(x,y+d,z),p(x+w,y+d,z),p(x+w,y+d,z+h),p(x,y+d,z+h)].join(" ")} fill={light?"#4c8d82":"#20759a"}/><polygon points={[p(x+w,y,z),p(x+w,y+d,z),p(x+w,y+d,z+h),p(x+w,y,z+h)].join(" ")} fill={light?"#30625f":"#144960"}/><path d={`M${p(x+7,y+d+.5,z+9)} L${p(x+w-7,y+d+.5,z+9)}`} stroke="#d1f5ec" strokeOpacity=".5"/></g>;
}
function SystemModel({active,exploded}:{active:number;exploded:boolean}){
 return <svg viewBox="0 0 700 510" className={s.model} role="img" aria-label="Isometric schematic connecting modular habitats, water treatment, sensing, a local controller and AquaOS. This is a conceptual relationship, not an engineering drawing.">
  <defs><linearGradient id="tank-face" x1="0" x2="1"><stop stopColor="#3d8b8b"/><stop offset=".5" stopColor="#a5cbbb"/><stop offset="1" stopColor="#22545f"/></linearGradient><linearGradient id="os-screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#244c58"/><stop offset="1" stopColor="#102d3c"/></linearGradient><radialGradient id="ground-light"><stop stopColor="#77bfb3" stopOpacity=".17"/><stop offset="1" stopColor="#77bfb3" stopOpacity="0"/></radialGradient></defs>
  <ellipse cx="350" cy="350" rx="300" ry="170" fill="url(#ground-light)"/>
  <g className={s.floor}><path d="M65 385L342 252L650 392L371 513Z" fill="#183b43" stroke="#497077" strokeWidth=".8"/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M${70+i*49} ${385-i*23.5}l302 139M${115+i*52} ${408+i*23.5}l275 -132`} stroke="#90bbb7" strokeOpacity=".1"/>)}</g>
  <g className={`${s.waterModel} ${active===1?s.focus:s.muted}`}>
   <path d="M103 290V365C103 397 190 397 190 365V290" fill="url(#tank-face)" stroke="#b1dbd0" strokeWidth="1"/><ellipse cx="146.5" cy="290" rx="43.5" ry="20" fill="#b0d0bc" stroke="#d6e8d1"/><ellipse cx="146.5" cy="290" rx="26" ry="11" fill="#407e7c"/><path d="M147 278V250H220V370H273" fill="none" stroke="#b7d4cf" strokeWidth="8" strokeLinejoin="round"/><path d="M181 361H212V420H300" fill="none" stroke="#9cbfbd" strokeWidth="7" strokeLinejoin="round"/>
   <path className={active===1?s.flow:s.hiddenFlow} d="M147 278V250H220V370H273M181 361H212V420H300" fill="none" stroke="#83e1d1" strokeWidth="2" strokeDasharray="5 9"/><path d="M120 327h53M120 335h53M120 343h53" stroke="#416f70" strokeOpacity=".7"/>
  </g>
  <g className={`${s.rackModel} ${active===0?s.focus:s.muted}`}>
   <path d="M270 425V167L475 240V495M240 400V165L440 90V400" stroke="#90b6b9" strokeWidth="5" fill="none"/>
   {[0,1,2,3,4].map(row=><g key={row} className={s.tier} style={{transform:`translateY(${exploded?-row*12:0}px)`}}>{[0,1,2].map(col=><Block key={col} x={col*65} y={12} z={row*37+12} light={active===0&&row===2&&col===1}/>)}</g>)}
   <path d="M473 245V473M482 255V477" stroke="#b8d4d1" strokeWidth="5"/>
  </g>
  <g className={`${s.senseModel} ${active===2?s.focus:s.muted}`}><path d="M487 315v85M504 322v70" stroke="#d6e5db" strokeWidth="4"/><rect x="479" y="310" width="15" height="25" rx="3" fill="#7cbbaa"/><rect x="497" y="316" width="14" height="23" rx="3" fill="#8bc2c9"/><path d="M489 310v-44h50" stroke="#8fc9c0" strokeWidth="2" fill="none"/><circle cx="489" cy="266" r="4" fill="#b8edce"/><path className={active===2?s.flow:s.hiddenFlow} d="M490 265L540 245L556 200" fill="none" stroke="#9ee1cf" strokeWidth="2" strokeDasharray="4 7"/></g>
  <g className={`${s.podModel} ${active===3?s.focus:s.muted}`}><path d="M540 211l59 20v82l-59-21z" fill="#abc6ba"/><path d="M599 231l15-9v82l-15 9z" fill="#54877c"/><path d="M540 211l15-9 59 20-15 9z" fill="#d5e6d7"/><path d="M549 228l39 13v41l-39-13z" fill="#123c4b"/><circle cx="558" cy="244" r="3" fill="#a0dfc4"/><path d="M566 247l14 5M552 258l28 10M555 286v39l-48 23" stroke="#9ac9bd" fill="none" strokeWidth="2"/></g>
  <g className={`${s.osModel} ${active===4?s.focus:s.muted}`}><path d="M63 89l181 54v127L63 216z" fill="#638f8f"/><path d="M244 143l10-7v127l-10 7z" fill="#2f606a"/><path d="M70 99l166 49v110L70 209z" fill="url(#os-screen)" stroke="#94c7be" strokeWidth=".6"/><g transform="matrix(1 .295 0 1 86 124)" fill="#d1ece0"><text fontSize="16" fontFamily="Arial,sans-serif">AquaOS</text><text y="21" fontSize="6.5" letterSpacing="1" fill="#9bc8c2">OPERATING HISTORY</text>{[0,1,2].map(i=><g key={i} transform={`translate(0 ${40+i*16})`}><circle r="2" fill="#7dd6c2"/><path d="M10 0h99" stroke="#92c4c0" strokeOpacity=".45"/><path d="M10 5h62" stroke="#92c4c0" strokeOpacity=".2"/></g>)}</g><path d="M151 242v28l-28 13 61 18 20-13-29-10v-28" fill="#6b9895"/><path d="M244 219Q305 165 411 188T551 220" fill="none" stroke="#82b8ae" strokeWidth="1.5" strokeDasharray="3 7" className={active===4?s.flow:""}/></g>
 </svg>;
}

export default function ConnectedAssembly(){
 const [active,setActive]=useState(0);
 const [exploded,setExploded]=useState(false);
 const [mode,setMode]=useState<"system"|"field">("system");
 const chapterRefs=useRef<(HTMLElement|null)[]>([]);
 const stageRef=useRef<HTMLDivElement>(null);
 const assemblyRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const stage=stageRef.current;
  const assembly=assemblyRef.current;
  if(!stage || !assembly) return;
  let frame=0;
  function update(){
   frame=0;
   if(!stage || !assembly) return;
   const bounds=assembly.getBoundingClientRect();
   if(bounds.bottom<0 || bounds.top>window.innerHeight) return;
   const mobileSticky=window.matchMedia("(max-width:767px) and (min-height:741px)").matches;
   const readingLine=mobileSticky ? Math.min(stage.getBoundingClientRect().bottom+55,window.innerHeight*.82) : window.innerHeight*.4;
   let next=0;
   chapterRefs.current.forEach((chapter,index)=>{if(chapter && chapter.getBoundingClientRect().top<=readingLine) next=index;});
   setActive(previous=>previous===next?previous:next);
  }
  function schedule(){if(!frame) frame=window.requestAnimationFrame(update);}
  function measure(){
   if(stage && assembly) assembly.style.setProperty("--stage-height",`${stage.offsetHeight}px`);
   schedule();
  }
  const observer=new ResizeObserver(measure);
  observer.observe(stage);
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",measure);
  measure();
  return()=>{observer.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",measure);window.cancelAnimationFrame(frame);};
 },[]);
 const chapter=chapters[active];
 function select(i:number){
  setActive(i);
  chapterRefs.current[i]?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 }
 return <section ref={assemblyRef} className={s.assembly} id="connected-system" aria-labelledby="assembly-title">
  <div className={s.sectionHeading}><div><p>THE CONNECTED SYSTEM / 01—05</p><h2 id="assembly-title">Follow the connections.<br/><span>Understand the whole.</span></h2></div><p>One production context. Five connected roles.<br/>Scroll through the system, or choose a layer.</p></div>
  <div className={s.assemblyGrid}>
   <div ref={stageRef} className={s.stickyStage}>
    <div className={s.stageTop}><span><b>0{active+1}</b> {chapter.name}</span><div role="group" aria-label="System visual view"><button type="button" aria-pressed={mode==='system'} onClick={()=>setMode('system')}>3D schematic</button><button type="button" aria-pressed={mode==='field'} onClick={()=>setMode('field')}>In the field</button></div></div>
    <div className={s.stageVisual}>{mode==='system'?<><SystemModel active={active} exploded={exploded}/><button type="button" className={s.explode} aria-pressed={exploded} onClick={()=>setExploded(previous=>!previous)}>{exploded?'Assemble layers':'Separate layers'} <span aria-hidden="true">{exploded?'−':'+'}</span></button></>:<div className={s.fieldVisual}><Image src={chapter.image||'/photos/ras-plumbing.jpg'} alt={chapter.alt||'Real production racks and supporting water equipment; the context for developing system integration.'} fill sizes="(max-width:1000px) 100vw, 55vw"/><span>{chapter.image?chapter.caption:'Production setting · '+chapter.caption}</span></div>}</div>
    <div className={s.layerButtons} role="group" aria-label="Choose a system layer">{chapters.map((ch,i)=><button type="button" key={ch.id} aria-pressed={active===i} aria-controls={`connection-${ch.id}`} onClick={()=>select(i)}><span>0{i+1}</span>{ch.name}</button>)}</div>
    <div className={s.activeCaption}><span aria-hidden="true">↳</span><p>{layerRoles[active]}</p></div><p className={s.stageNote}>Conceptual schematic · integration in development</p>
   </div>
   <div className={s.chapters}>{chapters.map((ch,i)=><article key={ch.id} id={`connection-${ch.id}`} data-chapter={i} data-active={active===i} ref={el=>{chapterRefs.current[i]=el}}><span className={s.chapterTag}>{ch.tag}</span><h3>{ch.title}</h3><p>{ch.body}</p><Link href={ch.href}>{ch.link}<span aria-hidden="true">↗</span></Link><span className={s.chapterCounter} aria-hidden="true">0{i+1}</span></article>)}</div>
  </div>
  <div className={s.summary}><span aria-hidden="true">↳</span><p>Observe the response. Record what changed. <strong>Biological outcomes need their own evidence.</strong></p><Link href="/system">Explore the full system ↗</Link></div>
 </section>;
}
