"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import s from "../public/Identity.module.css";
const links = [["System","/system"],["For Producers","/producers"],["Validation","/validation"],["Company","/company"],["Insights","/insights"]];
export default function Navbar(){
 const pathname=usePathname(); const [openAt,setOpenAt]=useState<string|null>(null); const open=openAt===pathname; const toggle=useRef<HTMLButtonElement>(null); function close(){setOpenAt(null);}
 return <header className={s.header} onKeyDown={e=>{if(e.key==="Escape"&&open){close();toggle.current?.focus();}}}>
  <a href="#main-content" className={s.skip}>Skip to content</a><div className={s.masthead}>
  <Link href="/" onClick={close} className={s.brand} aria-label="Crabionics home"><span className={s.symbol}><Image src="/logo.png" alt="" width="88" height="88" /></span><span>Crabionics</span></Link>
  <Link href="/contact" onClick={close} className={s.contact}>Talk to us <span aria-hidden>↗</span></Link>
  <button ref={toggle} className={s.menu} aria-label={open?"Close menu":"Open menu"} aria-controls="primary-navigation" aria-expanded={open} onClick={()=>setOpenAt(open?null:pathname)}><span>Menu</span><svg aria-hidden viewBox="0 0 32 32"><path d="M25 7a12 12 0 1 0 0 18"/><path d={open?"M14 10l12 12M14 22l12-12":"M16 12h12M16 20h12"}/></svg></button></div>
  <nav id="primary-navigation" className={s.navigation} aria-label="Primary navigation" hidden={!open}><div className={s.primary}>{links.map(([label,href],i)=><Link onClick={close} key={href} href={href} aria-current={pathname===href?"page":undefined}><span>0{i+1}</span>{label}</Link>)}</div><div className={s.secondary}>{[["Home","/"],["AquaOS","/aquaos"],["Investors","/investors"],["Talk to us","/contact"]].map(([label,href])=><Link onClick={close} href={href} key={href} aria-current={pathname===href?"page":undefined}>{label} <span aria-hidden>↗</span></Link>)}</div></nav>
  <noscript><nav className={s.fallback} aria-label="Site navigation">{[...links,["AquaOS","/aquaos"],["Investors","/investors"],["Contact","/contact"]].map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav></noscript></header>;
}