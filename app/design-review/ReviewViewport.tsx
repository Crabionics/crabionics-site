"use client";
import { useState } from "react";
import Link from "next/link";
import s from "./review.module.css";
export default function ReviewViewport(){
 const [width,setWidth]=useState(390);
 const [page,setPage]=useState("home");
 return <div className={s.review}>
  <div className={s.toolbar}><div><span>CRABIONICS / DESIGN REVIEW</span><h1>One frontend. Every screen.</h1><p>Use the controls to inspect the working homepage at a specific viewport width.</p></div><div className={s.controls} role="group" aria-label="Preview viewport width">{[[320,"Small phone"],[390,"Phone"],[768,"Tablet"],[1280,"Desktop"]].map(([size,label])=><button type="button" key={size} aria-pressed={width===size} onClick={()=>setWidth(Number(size))}>{label}<small>{size}px</small></button>)}</div></div>
  <p className={s.notice}>Review environment · illustrative AquaOS records · production has not been changed. Product links open the full preview. <Link href="/">Open full preview ↗</Link> <a href="https://www.crabionics.com/" target="_blank" rel="noopener noreferrer">View current live site ↗</a></p>
  <label>Review page <select aria-label="Review page" value={page} onChange={event=>setPage(event.target.value)}><option value="home">Homepage</option><option value="aquaos">AquaOS</option><option value="demo">Discovery</option><option value="early-access">Registration</option></select></label>
  <div className={s.stage}><iframe title="Crabionics responsive homepage preview" src={`/design-review/frame?page=${page}`} style={{width, minWidth:width, height:width===320?667:width===390?844:950}} className={s.frame}/></div>
 </div>;
}
