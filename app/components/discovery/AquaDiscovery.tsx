"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { journeyEvent } from "../public/JourneyMetrics";
import s from "./AquaDiscovery.module.css";

type DiscoveryPage = "home" | "aquaos" | "demo";
const steps = ["Check the farm", "Ask Moltie", "Check the source"];
const reply = "There are 331 crabs in the system right now: 159 male and 172 female. They occupy 331 of the 600 boxes, leaving 269 free.";
const helpReply = "I can help you with questions about your farm's crab data in CrabDesk, such as growth, batches, suppliers, water tests and daily activity, and with how to use the app.";
const assets = "/product/crabdesk/";
function Capture({ name, alt, width, height, className = "" }: {name:string;alt:string;width:number;height:number;className?:string}) {
  return <Image src={`${assets}${name}.webp`} alt={alt} width={width} height={height} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 55vw, 650px" className={className} />;
}
export default function AquaDiscovery({ page = "home" }: { page?: DiscoveryPage }) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"overview" | "month" | "week">("overview");
  const [question, setQuestion] = useState<"count" | "help" | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [explored, setExplored] = useState<number[]>([]);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const events = useRef(new Set<string>());
  const id = useId();
  function count(event:string) {
    if (events.current.has(event)) return;
    events.current.add(event); journeyEvent(event,page);
  }
  useEffect(() => {
    const node=root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry=>entry.isIntersecting) && !events.current.has("teaser_view")) {
        events.current.add("teaser_view");journeyEvent("teaser_view",page);observer.disconnect();
      }
    },{threshold:.2});
    observer.observe(node); return ()=>observer.disconnect();
  },[page]);
  function mark(index:number) {
    count("teaser_start");
    count(["teaser_overview","teaser_change","teaser_history"][index]);
    if (!explored.includes(index)) {
      const next=[...explored,index];setExplored(next);
      if(next.length===3) count("teaser_complete");
    }
  }
  function choose(index:number) {setActive(index);count("teaser_start");}
  function next(index:number) {choose(index);tabs.current[index]?.focus();}
  function ask(value:"count"|"help") {setQuestion(value);mark(1);count(value==="count"?"moltie_count_replay":"moltie_help_replay");}
  const complete=explored.length===3;
  return <section ref={root} className={s.discovery} aria-labelledby={`${id}-title`} data-product-discovery>
    <header className={s.heading}>
      <div><p className={s.kicker}>AQUAOS / FIRST PRODUCT CAPABILITY</p><h2 id={`${id}-title`}>CrabDesk <span>+ Moltie.</span></h2></div>
      <div className={s.intro}><p>RAS grow-out management. See the real software, ask a question and check the answer.</p><span>30–45 SECONDS · NO SIGN-IN</span></div>
    </header>
    <div className={s.explorer}>
      <div className={s.toolbar}><span className={s.product}><i aria-hidden="true">⌘</i> CrabDesk</span><span className={s.badge}><i />DEMO RECORDS · RECORDED BUILD</span></div>
      <div className={s.tabs} role="tablist" aria-label="Try CrabDesk and Moltie">
        {steps.map((label,index)=><button key={label} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={active===index} aria-controls={`${id}-panel`} tabIndex={active===index?0:-1} ref={el=>{tabs.current[index]=el;}} onClick={()=>choose(index)} onKeyDown={event=>{
          const target=event.key==="ArrowRight"?(index+1)%3:event.key==="ArrowLeft"?(index+2)%3:event.key==="Home"?0:event.key==="End"?2:-1;
          if(target>=0){event.preventDefault();next(target);}
        }}><span className={s.stepNo}>{explored.includes(index)?"✓":`0${index+1}`}</span><strong>{label}</strong><span className={s.tabArrow} aria-hidden="true">↗</span></button>)}
      </div>
      <div className={s.panel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className={s.stage}>
          <div className={s.stageLabel}><span>{active===0?"THE FARM AT A GLANCE":active===1?"MOLTIE / RECORDED EXCHANGE":"TRACE THE ANSWER"}</span><span>19 OCT 2026</span></div>
          <div key={`${active}-${active===0?view:active===1?question:sourceOpen}`} className={s.scene}>
            {active===0 ? <div className={s.captureFrame} data-view={view}><Capture name={view==="overview"?"overview":view==="month"?"activity-month":"activity-week"} width={465} height={view==="overview"?483:295} alt={view==="overview"?"Actual CrabDesk demo dashboard: 131.7 kilograms of stock, 331 crabs and monthly activity chart.":view==="month"?"Actual monthly activity view with 89 molts, 13 deaths, 59 regular harvests and 15 soft-shell harvests. Demo records.":"Actual weekly activity view, with zero recorded events for the current week. Demo records."}/></div>
            :active===1 ? question===null ? <div className={s.welcome}><Capture name="moltie-welcome" width={257} height={268} alt="Actual Moltie welcome panel: ask about your farm, with suggested questions."/><span>Choose a question to reveal a recorded answer.</span></div>
            :question==="count" ? <div className={s.answerCapture}><Capture name="moltie-answer" width={257} height={205} alt={`Actual Moltie exchange. Question: How many crabs are in the system? Answer: ${reply} Source links displayed: Dashboard this month, Live crabs, Past crabs all time.`}/><button type="button" onClick={()=>{setSourceOpen(true);mark(2);next(2);}}>Inspect the dashboard source <span aria-hidden="true">↗</span></button></div>
            :<div className={s.transcript}><span className={s.recorded}>RECORDED TRANSCRIPT</span><h4>What can you help with in CrabDesk?</h4><blockquote>{helpReply}</blockquote><p>Actual response to a generic capability question. No farm records requested.</p></div>
            :<div className={s.sourceScene}><div className={s.sourceAnswer}><span>MOLTIE’S RECORDED ANSWER</span><strong>331 <small>crabs</small></strong></div><div className={s.traceLine} aria-hidden="true">↓</div>{sourceOpen?<div className={s.sourceCapture}><span>ACTUAL DASHBOARD SOURCE</span><Capture name="stock-source" width={227} height={125} alt="Actual CrabDesk demo dashboard card: Crabs in system, 331. 136 in and 87 out this month."/><p><i aria-hidden="true">✓</i> The displayed count matches.</p></div>:<button type="button" className={s.sourceButton} onClick={()=>{setSourceOpen(true);mark(2);}}>Open the recorded dashboard source <span aria-hidden="true">↗</span></button>}</div>}
          </div>
          <p className={s.captureNote}>Authentic interface captures · sample records · read-only public replay</p>
        </div>
        <div className={s.narrative}>
          <p className={s.chapter}>0{active+1} / 03</p>
          <h3>{["Start with the overview.","Ask a farm question.","Check what it points to."][active]}</h3>
          <p className={s.description}>{["Check the demo stock and activity. Switch the period to see how the view changes.","Choose a question below. You’ll see an answer captured from the working Moltie assistant.","Moltie displayed a dashboard source link. Compare its answer with the count shown there."][active]}</p>
          {active===0?<div className={s.options} role="group" aria-label="Dashboard view">{[["overview","Stock & activity"],["month","This month"],["week","This week"]].map(([value,label])=><button key={value} type="button" aria-pressed={view===value} onClick={()=>{setView(value as typeof view);mark(0);}}>{label}<span aria-hidden="true">{view===value?"●":"↗"}</span></button>)}</div>
          :active===1?<div className={s.options} role="group" aria-label="Recorded Moltie questions"><button type="button" aria-pressed={question==="count"} onClick={()=>ask("count")}>How many crabs are in the system?<span aria-hidden="true">↗</span></button><button type="button" aria-pressed={question==="help"} onClick={()=>ask("help")}>What can Moltie help with?<span aria-hidden="true">↗</span></button></div>
          :<div className={s.sourceExplanation}><span className={s.recorded}>DASHBOARD / THIS MONTH</span><p>Source links make an answer easier to check. This example confirms the displayed stock count; it does not validate every assistant answer.</p></div>}
          <div className={s.announcement} role="status" aria-live="polite" aria-atomic="true">{active===0?(explored.includes(0)?`${view==="overview"?"Overview":view==="month"?"Monthly activity":"Weekly activity"} explored.`:"Choose a view to start."):active===1?(question?`Recorded answer shown. ${question==="count"?"331 crabs in the demo system.":"Moltie describes help with farm records and app use."}`:"Recorded responses, not a live chat."):sourceOpen?"Dashboard source opened. Both counts show 331 crabs.":"Open the dashboard source to compare."}</div>
          <div className={s.nextRow}>{active<2?<button type="button" className={s.next} onClick={()=>next(active+1)}>{steps[active+1]} <span aria-hidden="true">→</span></button>:<button type="button" className={s.next} onClick={()=>next(0)}>Explore again <span aria-hidden="true">↺</span></button>}<span>{complete?"All three explored ✓":`${explored.length} of 3 explored`}</span></div>
        </div>
      </div>
    </div>
    <footer className={s.footer}><p><strong>Working RAS grow-out software.</strong><br/>Pond workflows upcoming. Hardware integration requires separate validation.</p><div className={s.links}>{page==="home"?<Link href="/aquaos">About CrabDesk + AquaOS ↗</Link>:null}<Link href="/contact#aquaos-beta">Request a guided demo ↗</Link><Link href="/early-access#register">Register interest ↗</Link></div></footer>
  </section>;
}
