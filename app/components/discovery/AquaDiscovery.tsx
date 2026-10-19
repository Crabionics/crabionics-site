"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { journeyEvent } from "../public/JourneyMetrics";
import s from "./AquaDiscovery.module.css";

type DiscoveryPage = "home" | "aquaos" | "demo";
const chapters = [
  { label: "See the operation", title: "A clear view of the work.", body: "Bring activity and items needing attention into view. Start with the overview, then choose where to look closer.", action: "Bring the overview into focus", result: "The overview connects activity, attention and history without opening individual records." },
  { label: "Follow a change", title: "A change stays visible.", body: "An observation is only the beginning. See how a visible follow-up keeps it from becoming a forgotten note.", action: "Reveal the follow-up", result: "The observation and its follow-up stay linked. The team can see that something still needs attention." },
  { label: "Understand the history", title: "Pick up where the team left off.", body: "A useful history connects an earlier observation with later activity. Continuity matters when another person takes over.", action: "Connect the history", result: "The earlier observation, follow-up and later update remain connected. A recorded update is not proof of a biological result." },
] as const;

export default function AquaDiscovery({ page = "home" }: { page?: DiscoveryPage }) {
  const [active, setActive] = useState(0);
  const [explored, setExplored] = useState<number[]>([]);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const events = useRef(new Set<string>());
  const id = useId();
  const chapter = chapters[active];
  const revealed = explored.includes(active);
  const complete = explored.length === 3;

  function count(event: string) {
    if (events.current.has(event)) return;
    events.current.add(event);
    journeyEvent(event, page);
  }
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !events.current.has("teaser_view")) {
        events.current.add("teaser_view");
        journeyEvent("teaser_view", page);
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [page]);

  function choose(index: number) {
    setActive(index);
    count("teaser_start");
  }
  function reveal() {
    count("teaser_start");
    count(["teaser_overview", "teaser_change", "teaser_history"][active]);
    if (!explored.includes(active)) {
      const next = [...explored, active];
      setExplored(next);
      if (next.length === 3) count("teaser_complete");
    }
  }

  return <section ref={root} className={s.discovery} aria-labelledby={`${id}-title`}>
    <div className={s.heading}>
      <div><p className={s.kicker}>AQUAOS / PRODUCT DISCOVERY</p><h2 id={`${id}-title`}>See the work.<br /><span>Keep the thread.</span></h2></div>
      <div className={s.introduction}><p>Three short interactions. A closer look at what connected farm records can make visible.</p><span className={s.duration}>ABOUT 30–45 SECONDS · EXPLORE AT YOUR PACE</span></div>
    </div>
    <div className={s.explorer}>
      <div className={s.tabs} role="tablist" aria-label="AquaOS discovery chapters">
        {chapters.map((item, index) => <button key={item.label} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} ref={el => { tabs.current[index] = el; }} onClick={() => choose(index)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
          if (next >= 0) { event.preventDefault(); choose(next); tabs.current[next]?.focus(); }
        }}><span>0{index + 1}</span><strong>{item.label}</strong><small aria-label={explored.includes(index) ? "Explored" : "Not yet explored"}>{explored.includes(index) ? "✓" : "↗"}</small></button>)}
      </div>
      <div className={s.panel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className={s.visual} data-stage={active} data-revealed={revealed}>
          <div className={s.visualTop}><span>AquaOS</span><span className={s.concept}>CONCEPTUAL VISUAL</span></div>
          <div key={active} className={s.scene} aria-hidden="true">
            {active === 0 ? <div className={s.orbit}><div className={s.orbitRing} /><div className={s.orbitRingInner} /><div className={s.orbitCore}><span>ONE VIEW</span><strong>The operation</strong></div><div className={`${s.satellite} ${s.activity}`}><i />Activity<span>{revealed ? "Visible together" : "Look closer"}</span></div><div className={`${s.satellite} ${s.attention}`}><i />Attention<span>{revealed ? "Keep it in view" : "Look closer"}</span></div><div className={`${s.satellite} ${s.history}`}><i />History<span>{revealed ? "Keep the context" : "Look closer"}</span></div></div> : active === 1 ? <div className={s.connection}><div className={s.record}><span>01 / OBSERVATION</span><strong>A change is noted.</strong><p>A starting point for the team.</p><i /></div><div className={s.connector}><span>↓</span><small>{revealed ? "LINKED" : "WHAT FOLLOWS?"}</small></div><div className={`${s.record} ${s.followup}`}><span>02 / FOLLOW-UP</span><strong>{revealed ? "Attention stays on it." : "Reveal the connection."}</strong><p>{revealed ? "Visible to the next person." : "One observation. A continuing thread."}</p></div></div> : <div className={s.timeline}><div className={s.thread} />{["Earlier observation", "Linked follow-up", "Later update"].map((label, index) => <div className={s.timelineItem} key={label}><span className={s.dot}>{index + 1}</span><div><small>{["EARLIER", "IN BETWEEN", "LATER"][index]}</small><strong>{label}</strong><p>{revealed ? ["The starting context remains.", "The connection stays visible.", "The next person can catch up."][index] : "A moment in the same story."}</p></div></div>)}</div>}
          </div>
          <p className={s.visualNote}>Conceptual illustration · no live records or CrabDesk screenshots</p>
        </div>
        <div className={s.narrative}>
          <span className={s.chapter}>0{active + 1} / 03</span><h3>{chapter.title}</h3><p>{chapter.body}</p>
          <button className={s.reveal} type="button" onClick={reveal} disabled={revealed}>{revealed ? "Connection revealed" : chapter.action}<span aria-hidden="true">{revealed ? "✓" : "+"}</span></button>
          <div className={s.result} aria-live="polite" aria-atomic="true">{revealed ? <p>{chapter.result}</p> : <p>Tap to explore this connection.</p>}</div>
          {active < 2 ? <button className={s.next} type="button" onClick={() => { choose(active + 1); tabs.current[active + 1]?.focus(); }}>{chapters[active + 1].label} <span aria-hidden="true">→</span></button> : <span className={s.finish}>{complete ? "All three connections explored." : "Explore each connection to complete the story."}</span>}
        </div>
      </div>
    </div>
    <div className={s.footer}><p><span className={s.statusDot} />Working RAS grow-out software in CrabDesk.<br /><span>Pond workflows upcoming. Hardware integration assessed separately.</span></p><div className={s.links}>{page === "home" && <Link href="/aquaos">Discover AquaOS <span aria-hidden="true">↗</span></Link>}<Link href="/contact#aquaos-beta">Request a guided demo <span aria-hidden="true">↗</span></Link><Link href="/early-access#register">Register interest <span aria-hidden="true">↗</span></Link></div></div>
  </section>;
}
