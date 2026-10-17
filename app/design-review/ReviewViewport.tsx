"use client";
import { useState } from "react";
import s from "./review.module.css";
export default function ReviewViewport(){
 const [width,setWidth]=useState(390);
 return <div className={s.review}>
  <div className={s.toolbar}><div><span>CRABIONICS / DESIGN REVIEW</span><h1>One frontend. Every screen.</h1><p>Use the controls to inspect the working homepage at a specific viewport width.</p></div><div className={s.controls} role="group" aria-label="Preview viewport width">{[[390,"Phone"],[768,"Tablet"],[1280,"Desktop"]].map(([size,label])=><button type="button" key={size} aria-pressed={width===size} onClick={()=>setWidth(Number(size))}>{label}<small>{size}px</small></button>)}</div></div>
  <p className={s.notice}>Review environment · illustrative AquaOS records · production has not been changed. Product links open the full preview. <a href="/">Open full preview ↗</a> <a href="https://www.crabionics.com/" target="_blank" rel="noopener noreferrer">View current live site ↗</a></p>
  <div className={s.stage}><iframe title="Crabionics responsive homepage preview" src="/design-review/frame" style={{width, minWidth:width}} className={s.frame}/></div>
 </div>;
}
