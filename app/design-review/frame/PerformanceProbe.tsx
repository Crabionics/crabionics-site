"use client";
import { useEffect, useRef, useState } from "react";
// Preview-only lab measurements. Never imported into a production page.
export default function PerformanceProbe(){
 const samples=useRef({longTasks:0,blockingMs:0,cls:0,lcpMs:0});
 const [report,setReport]=useState("Not sampled");
 useEffect(()=>{
  const observers:PerformanceObserver[]=[];
  for(const type of ["longtask","layout-shift","largest-contentful-paint"]){
   if(!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
   const observer=new PerformanceObserver(list=>{for(const entry of list.getEntries()){
    if(type==="longtask"){samples.current.longTasks++;samples.current.blockingMs+=Math.max(0,entry.duration-50);}
    if(type==="layout-shift"&&!(entry as PerformanceEntry & {hadRecentInput:boolean}).hadRecentInput) samples.current.cls+=(entry as PerformanceEntry & {value:number}).value;
    if(type==="largest-contentful-paint") samples.current.lcpMs=entry.startTime;
   }});observer.observe({type,buffered:true});observers.push(observer);
  }
  return()=>observers.forEach(o=>o.disconnect());
 },[]);
 function sample(){
  const gaps:number[]=[];let previous=0;const start=performance.now();
  setReport("Sampling 5 seconds — scroll the page");
  function frame(now:number){if(previous) gaps.push(now-previous);previous=now;if(now-start<5000){requestAnimationFrame(frame);return;}
   gaps.sort((a,b)=>a-b);
   setReport(JSON.stringify({...samples.current,frameP95Ms:gaps[Math.floor(gaps.length*.95)],frames:gaps.length,animations:document.getAnimations().filter(a=>a.playState==="running").length,resources:performance.getEntriesByType("resource").reduce((n,r)=>n+(r as PerformanceResourceTiming).transferSize,0),viewport:[innerWidth,innerHeight]}));
  }requestAnimationFrame(frame);
 }
 return <details style={{position:"fixed",left:8,bottom:8,zIndex:200,background:"#fff",color:"#082c46",padding:8,maxWidth:300,fontSize:12}}><summary>Lab performance</summary><button type="button" onClick={sample}>Sample 5 seconds</button><output aria-live="polite" style={{display:"block",overflowWrap:"anywhere"}}>{report}</output></details>;
}
