"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { journeyEvent } from "../public/JourneyMetrics";
import s from "./ProductFilm.module.css";

export default function ProductFilm({page="home"}:{page?:"home"|"aquaos"|"demo"}) {
  const [source,setSource]=useState<string|null>(null);
  const player=useRef<HTMLVideoElement>(null);
  const completed=useRef(false);
  const id=useId();
  useEffect(()=>{
    if(!source) return;
    player.current?.focus({preventScroll:true});
    player.current?.play().catch(()=>{/* Native controls remain available if automatic playback is blocked. */});
  },[source]);
  function play(){
    setSource(window.matchMedia("(max-width: 650px)").matches?"mobile":"desktop");
    journeyEvent("film_start",page);
  }
  return <section className={s.film} id="crabdesk-film" aria-labelledby={`${id}-title`}>
    <div className={s.heading}><div><p className={s.eyebrow}>AQUAOS / FIRST WORKING CAPABILITY</p><h2 id={`${id}-title`}>CrabDesk <span>+ Moltie.</span></h2></div><p className={s.introduction}>RAS grow-out management, with a built-in assistant.<br/>See the working software in 30 seconds.</p></div>
    <div className={s.frame}>
      {source ? <video key={source} ref={player} className={s.video} controls muted playsInline preload="metadata" tabIndex={0} aria-label="CrabDesk and Moltie product demonstration" aria-describedby={`${id}-summary`} onEnded={()=>{if(!completed.current){completed.current=true;journeyEvent("film_complete",page);}}}><source src={`/product/film/crabdesk-${source}.mp4`} type="video/mp4"/>Your browser does not support this video. <a href={`/product/film/crabdesk-${source}.mp4`}>Download the film</a>.</video> : <>
        {/* Real captured product imagery; the responsive poster never downloads the video. */}
        <picture><source media="(max-width: 650px)" srcSet="/product/film/poster-mobile.webp"/><img className={s.poster} src="/product/film/poster-desktop.webp" alt="CrabDesk product film: actual Moltie stock-count answer and its source links, using demo records." width={1920} height={1080} loading="lazy"/></picture>
        <button type="button" className={s.play} onClick={play}><span aria-hidden="true">▶</span><span>Watch the product film<small>30 SECONDS · CAPTIONED · SILENT</small></span></button>
      </>}
    </div>
    <div className={s.footer}><p id={`${id}-summary`}>Actual CrabDesk dashboard and Moltie response, using demo records.<br/><span>Working RAS software. Pond workflows upcoming. Hardware integration requires separate validation.</span></p><div className={s.links}>{page==="home"?<Link href="/aquaos">About AquaOS <span aria-hidden="true">↗</span></Link>:null}<Link className={s.register} href="/early-access#register">Register interest <span aria-hidden="true">↗</span></Link></div></div>
  </section>;
}
