"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./workspace.module.css";

type Task={id:string;title:string;instruction:string;createdAt:string;updatedAt:string;status:"ready"|"running"|"completed"|"failed";runCount:number;output:string|null;model:string|null;error:string|null;messages?:Array<{id:string;role:"user"|"assistant";content:string;at:string}>;usage:{inputTokens:number|null;outputTokens:number|null;totalTokens:number|null;cachedInputTokens:number|null;costUsd:number|null}|null};
type Activity={number:number;title:string;url:string;state:string;updatedAt:string};
type Usage={runs:number;measuredRuns:number;inputTokens:number;outputTokens:number;cachedInputTokens:number;costUsd:number|null;unpricedRuns:number;failedRuns:number};
type System={persistence:"configured"|"unavailable";textExecution:"enabled"|"disabled";codexAgents:string;whatsapp:string;historicalCliSessions:string;model:string|null;providerCreditBalance:null};
const emptyUsage:Usage={runs:0,measuredRuns:0,inputTokens:0,outputTokens:0,cachedInputTokens:0,costUsd:null,unpricedRuns:0,failedRuns:0};
const fmt=(n:number)=>Intl.NumberFormat("en-IN").format(n);
const dt=(d:string)=>{try{return new Date(d).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}catch{return d}};
async function getJSON<T>(path:string):Promise<T>{
 const r=await fetch(path,{cache:"no-store",headers:{"Accept":"application/json"}});
 const b=await r.json();
 if(!r.ok)throw Error(b.error||"Request failed");
 return b as T;
}
async function postJSON<T>(path:string,body:object={}):Promise<T>{
 const r=await fetch(path,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
 const b=await r.json();if(!r.ok)throw Error(b.error||"Request failed");return b as T;
}
const nav=["Work","Sources","Usage"] as const;type Tab=typeof nav[number];

export default function BrainWorkspace(){
 const [tab,setTab]=useState<Tab>("Work");
 const [tasks,setTasks]=useState<Task[]>([]);
 const [selected,setSelected]=useState<string|null>(null);
 const [system,setSystem]=useState<System|null>(null);
 const [usage,setUsage]=useState<Usage>(emptyUsage);
 const [activities,setActivities]=useState<Activity[]>([]);
 const [loading,setLoading]=useState(true);
 const [working,setWorking]=useState(false);
 const [error,setError]=useState("");
 const [title,setTitle]=useState("");
 const [instruction,setInstruction]=useState("");
 const [followup,setFollowup]=useState("");
 const [activityNote,setActivityNote]=useState("");
 const [usageNote,setUsageNote]=useState("");
 const [notice,setNotice]=useState("");
 const chosen=tasks.find(x=>x.id===selected)||null;
 async function refresh(){
   const [t,u,a]=await Promise.allSettled([
     getJSON<{tasks:Task[]}>("/api/brain/tasks"),
     getJSON<{usage:Usage;note:string}>("/api/brain/usage"),
     getJSON<{items:Activity[];note:string}>("/api/brain/activity")
   ]);
   if(t.status==="fulfilled"){setTasks(t.value.tasks);setSelected(p=>p&&t.value.tasks.some(x=>x.id===p)?p:(t.value.tasks[0]?.id||null))}
   else setError("Tasks could not be loaded. Check storage and access.");
   if(u.status==="fulfilled"){setUsage(u.value.usage);setUsageNote(u.value.note)}
   if(a.status==="fulfilled"){setActivities(a.value.items);setActivityNote(a.value.note)}
   else setActivityNote("Source activity could not be fetched.");
 }
 useEffect(()=>{
  let mounted=true;
  Promise.allSettled([getJSON<System>("/api/brain/status"),getJSON<{tasks:Task[]}>("/api/brain/tasks"),getJSON<{usage:Usage;note:string}>("/api/brain/usage"),getJSON<{items:Activity[];note:string}>("/api/brain/activity")])
   .then(res=>{if(!mounted)return;
      if(res[0].status==="fulfilled")setSystem(res[0].value);
      if(res[1].status==="fulfilled"){setTasks(res[1].value.tasks);setSelected(res[1].value.tasks[0]?.id||null)}
      else setError("Storage or authorization is unavailable.");
      if(res[2].status==="fulfilled"){setUsage(res[2].value.usage);setUsageNote(res[2].value.note)}
      if(res[3].status==="fulfilled"){setActivities(res[3].value.items);setActivityNote(res[3].value.note)}
      else setActivityNote("Source activity unavailable.");
      setLoading(false);
   });
  return()=>{mounted=false};
 },[]);
 async function createTask(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setNotice("");
  if(!title.trim()||!instruction.trim())return;
  setWorking(true);
  try{
   const response=await postJSON<{task:Task}>("/api/brain/tasks",{title:title.trim(),instruction:instruction.trim()});
   setTasks(x=>[response.task,...x]);setSelected(response.task.id);setTitle("");setInstruction("");setTab("Work");
   setNotice("Task saved to the persistent workspace.");
  }catch(e){setError(e instanceof Error?e.message:"Could not create task.")}
  finally{setWorking(false)}
 }
 async function runTask(task:Task){
  setError("");setNotice("");setWorking(true);
  setTasks(x=>x.map(v=>v.id===task.id?{...v,status:"running"}:v));
  try{
   const response=await postJSON<{task:Task;completed:boolean}>(`/api/brain/tasks/${task.id}/run`,{});
   setTasks(x=>x.map(v=>v.id===task.id?response.task:v));
   setNotice("Model result saved to the task record.");
  }catch(e){setError(e instanceof Error?e.message:"Execution failed.");await refresh();}
  finally{setWorking(false)}
 }
 async function addFollowup(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(!chosen||!followup.trim())return;setWorking(true);setError("");setNotice("");
  try{const response=await postJSON<{task:Task}>(`/api/brain/tasks/${chosen.id}/messages`,{message:followup.trim()});
    setTasks(x=>x.map(v=>v.id===chosen.id?response.task:v));setFollowup("");
    setNotice("Follow-up added to the same task. The conversation history is preserved.");
  }catch(e){setError(e instanceof Error?e.message:"Follow-up could not be saved.")}
  finally{setWorking(false)}
 }
 async function trackActivity(a:Activity){
  setWorking(true);setError("");setNotice("");
  try{const response=await postJSON<{task:Task}>("/api/brain/tasks",{
    title:`Follow up on PR #${a.number}: ${a.title}`.slice(0,99),
    instruction:`Follow up on the existing GitHub change. Source: ${a.url}\nPR title: ${a.title}\nReview the source directly before making any evidence or completion claim. Record what to verify and the next action.`
   });setTasks(x=>[response.task,...x]);setSelected(response.task.id);setTab("Work");
   setNotice("GitHub reference tracked as a new Brain task. The PR source is linked, not ingested into the model.");
  }catch(e){setError(e instanceof Error?e.message:"Could not track this PR.")}
  finally{setWorking(false)}
 }
 const pending=tasks.filter(t=>t.status==="ready").length;
 const completed=tasks.filter(t=>t.status==="completed").length;
 return <div className={s.shell}>
   <aside className={s.rail}>
     <Link href="/" className={s.identity}><span className={s.logo}>C</span><span><b>CRABIONICS</b><small>BRAIN / PRIVATE WORKSPACE</small></span></Link>
     <div className={s.railLabel}>CONTROL</div>
     <nav className={s.navigation} aria-label="Brain sections">
       {nav.map(n=><button key={n} type="button" onClick={()=>setTab(n)} className={tab===n?s.navActive:s.navButton}>
         <span aria-hidden="true">{n==="Work"?"▦":n==="Sources"?"◈":"◷"}</span>{n}
       </button>)}
     </nav>
     <div className={s.railBottom}>
       <div className={s.railNote}><span className={s.liveDot}/><strong>Protected workspace</strong><p>Tasks are saved for your authenticated account. No other user can access these task records.</p></div>
       <Link href="/" className={s.back}>↗ Company website</Link>
     </div>
   </aside>
   <div className={s.workspace}>
      <header className={s.header}>
       <div><div className={s.eyebrow}>CRABIONICS / WORK INTELLIGENCE</div><h1>{tab==="Work"?"Your work, with proof.":tab==="Sources"?"Previous work & sources":"Measured usage"}</h1></div>
       <div className={s.flags}><span className={s.flag}>{system?.persistence==="configured"?"● Storage connected":"◌ Storage unverified"}</span><span className={s.flag}>{system?.textExecution==="enabled"?"● Model enabled":"○ Model off"}</span></div>
      </header>
      <nav className={s.mobileTabs}>{nav.map(n=><button key={n} className={tab===n?s.mobileActive:""} onClick={()=>setTab(n)}>{n}</button>)}</nav>
      {error&&<div role="alert" className={s.error}>{error}<button type="button" onClick={()=>setError("")} aria-label="Dismiss error">×</button></div>}
      {notice&&<div role="status" className={s.success}>{notice}</div>}
      {loading?<div className={s.empty}><div className={s.spinner}/>Loading the saved workspace…</div>:null}
      {!loading&&tab==="Work"&&<div className={s.contentGrid}>
        <section className={s.workList}>
         <div className={s.cardHead}><h2>Tasks <span>{tasks.length}</span></h2><button onClick={()=>void refresh()} type="button" className={s.tinyButton}>Refresh</button></div>
         {tasks.length===0?<p className={s.placeholder}>No saved tasks yet. Create your first one.</p>:<div className={s.taskStack}>
           {tasks.map(t=><button key={t.id} type="button" className={selected===t.id?s.taskActive:s.taskButton} onClick={()=>setSelected(t.id)}>
             <div className={s.taskButtonTop}><strong>{t.title}</strong><span className={s.state} data-status={t.status}>{t.status}</span></div>
             <span>{dt(t.updatedAt)} · {t.runCount} {t.runCount===1?"run":"runs"}</span>
           </button>)}
         </div>}
        </section>
        <section className={s.taskMain}>
         <div className={s.cardHead}><h2>{chosen?"Task detail":"Create a task"}</h2><button onClick={()=>setSelected(null)} type="button" className={s.tinyButton}>+ New task</button></div>
         {chosen?<div className={s.taskDetail}>
           <div className={s.taskBanner}><div className={s.eyebrow}>TASK ID · {chosen.id.slice(0,8)}</div><h2>{chosen.title}</h2><div className={s.smallText}>Created {dt(chosen.createdAt)} · Last updated {dt(chosen.updatedAt)}</div></div>
           <div className={s.thread} aria-label="Saved task conversation">
              {(chosen.messages?.length?chosen.messages:[{id:"initial",role:"user" as const,content:chosen.instruction,at:chosen.createdAt}]).map(m=>
                <div className={m.role==="assistant"?s.threadAssistant:s.threadUser} key={m.id}>
                  <span className={s.messageLabel}>{m.role==="assistant"?"BRAIN OUTPUT":"TASK INSTRUCTION"} · {dt(m.at)}</span>
                  <p>{m.content}</p>
                </div>)}
            </div>
            <form className={s.followupForm} onSubmit={e=>void addFollowup(e)}>
              <label htmlFor="brain-followup">Continue this task</label>
              <textarea id="brain-followup" value={followup} onChange={e=>setFollowup(e.target.value)}
                placeholder="Add a correction, new constraint or follow-up instruction…" rows={3} minLength={3} maxLength={2000} required/>
              <button type="submit" className={s.secondaryButton} disabled={working}>Save follow-up</button>
            </form>
           {chosen.output&&!(chosen.messages||[]).some(m=>m.role==="assistant")&&<div className={s.result}><span className={s.messageLabel}>SAVED OUTPUT · {chosen.model||"model"}</span><div className={s.resultBody}>{chosen.output}</div></div>}
           {chosen.error&&<div className={s.error}><span>Last run: {chosen.error}</span></div>}
           <div className={s.actionbar}>
             <button className={s.primaryButton} disabled={working||system?.textExecution!=="enabled"} onClick={()=>void runTask(chosen)}>
                {working?"Executing…":chosen.runCount>0?"Run again":"Execute text task"}
             </button>
             <span>{system?.textExecution!=="enabled"?"Model execution requires an approved provider budget and enabled setting.":"Text-only model run. No tools, GitHub changes or Codex agents."}</span>
           </div>
           <div className={s.metrics}>
             <div><small>Runs</small><strong>{chosen.runCount}</strong></div>
             <div><small>Input</small><strong>{chosen.usage?.inputTokens==null?"—":fmt(chosen.usage.inputTokens)}</strong></div>
             <div><small>Output</small><strong>{chosen.usage?.outputTokens==null?"—":fmt(chosen.usage.outputTokens)}</strong></div>
             <div><small>Cost USD</small><strong>{chosen.usage?.costUsd==null?"Not reported":'$'+chosen.usage.costUsd.toFixed(5)}</strong></div>
           </div>
         </div>:<form className={s.newForm} onSubmit={e=>void createTask(e)}>
           <div className={s.newIntro}><div className={s.eyebrow}>PERSISTENT WORK ITEM</div><h2>What should Brain accomplish?</h2><p>A task is saved in the company workspace even when model execution is not enabled.</p></div>
           <label>Task title<input value={title} onChange={e=>setTitle(e.target.value)} maxLength={100} minLength={3} required placeholder="e.g. Review pilot purchase requirements"/></label>
           <label>Instructions<textarea value={instruction} onChange={e=>setInstruction(e.target.value)} maxLength={5000} minLength={8} required rows={7} placeholder="Describe the desired output, constraints, evidence, and what a finished result should contain." /></label>
           <div className={s.actionbar}><button className={s.primaryButton} disabled={working||system?.persistence!=="configured"} type="submit">{working?"Saving…":"Save real task"}</button><span>Private to your authenticated account.</span></div>
         </form>}
        </section>
       </div>}
      {!loading&&tab==="Sources"&&<div className={s.wideCard}>
       <div className={s.cardHead}><div><h2>GitHub — recent company work</h2><p className={s.smallText}>These are real linked pull requests, not reconstructed CLI sessions.</p></div><button className={s.tinyButton} onClick={()=>void refresh()}>Refresh</button></div>
       {activities.length===0?<div className={s.placeholder}>{activityNote||"No source history available."}</div>:<div className={s.activityList}>
         {activities.map(a=><div key={a.number} className={s.activity}>
            <div className={s.activityNum}>#{a.number}</div><div><a href={a.url} target="_blank" rel="noopener noreferrer"><strong>{a.title} ↗</strong></a><small>{dt(a.updatedAt)} · {a.state}</small></div>
             <button type="button" className={s.tinyButton} disabled={working} onClick={()=>void trackActivity(a)}>Track</button>
         </div>)}
        </div>}
       <div className={s.footnote}>Local Codex CLI session transcripts are not yet connected. This list is sourced from the authorized GitHub repository only.</div>
      </div>}
      {!loading&&tab==="Usage"&&<div className={s.wideCard}>
        <div className={s.cardHead}><div><h2>Execution metering</h2><p className={s.smallText}>Recorded model runs in this Brain account; not historical external API bills.</p></div><button className={s.tinyButton} onClick={()=>void refresh()}>Refresh</button></div>
        <div className={s.usageGrid}>
         <div><small>Tracked attempts</small><strong>{fmt(usage.runs)}</strong></div>
         <div><small>Measured runs</small><strong>{fmt(usage.measuredRuns)}</strong></div>
         <div><small>Input tokens</small><strong>{fmt(usage.inputTokens)}</strong></div>
         <div><small>Output tokens</small><strong>{fmt(usage.outputTokens)}</strong></div>
         <div><small>Cached input</small><strong>{fmt(usage.cachedInputTokens)}</strong></div>
         <div><small>Provider cost</small><strong>{usage.costUsd===null?"Not reported":"$"+usage.costUsd.toFixed(5)}</strong></div>
        </div>
        <div className={s.info}>
         <strong>Usage interpretation</strong><p>{usageNote||"Usage is recorded when the provider returns metering data. Missing cost data is not zero cost."}</p>
         <p>Unpriced runs: {usage.unpricedRuns} · Failed attempts: {usage.failedRuns}</p>
         <p>Provider credit balance: unavailable. Internal task quota is not purchased API credit.</p>
        </div>
      </div>}
      <footer className={s.footer}><span>Brain R1 · Authenticated tasks & tracked work</span><span>Agent gateway, CLI session import and WhatsApp are separate integrations, not falsely marked complete.</span></footer>
   </div>
 </div>;
}
