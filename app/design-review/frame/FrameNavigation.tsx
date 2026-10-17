"use client";
import { useEffect } from "react";
// Product links leave the review frame; local section links stay in it.
export default function FrameNavigation(){
 useEffect(()=>{
  function navigate(event:MouseEvent){
   const anchor=event.target instanceof Element ? event.target.closest("a") : null;
   if(!anchor) return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin || url.pathname!==location.pathname) anchor.target="_top";
  }
  document.addEventListener("click",navigate,true);
  return ()=>document.removeEventListener("click",navigate,true);
 },[]);
 return null;
}
