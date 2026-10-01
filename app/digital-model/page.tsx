"use client";

import { useEffect, useMemo, useState } from "react";

type Screen = "founder" | "site" | "assets" | "sensors" | "environment" | "alerts" | "actuators" | "ledger" | "validation" | "commercial" | "experiment";

const screens: [Screen, string, string][] = [
  ["founder","Founder dashboard","System overview"],
  ["site","Site dashboard","Deployment view"],
  ["assets","Asset explorer","Habitat → boxes → devices"],
  ["sensors","Sensor dashboard","CrabSense telemetry"],
  ["environment","Environment","Current water state"],
  ["alerts","Alerts & decisions","Rule → decision → action"],
  ["actuators","Actuator control","CrabPod commands"],
  ["ledger","Event ledger","Causality & history"],
  ["validation","Validation","Evidence gates"],
  ["commercial","Commercial","Supply → finishing → market"],
  ["experiment","Lab experiment","CP-INT-001 / VAL-007"],
];

const telemetry0 = [
  ["Temperature","28.4","°C","normal"],["pH","7.86","","normal"],["DO","5.9","mg/L","normal"],
  ["Salinity","24.8","ppt","normal"],["Ammonia","0.018","mg/L","normal"],["Nitrite","0.11","mg/L","watch"],
];

const events = [
  ["EVT-2048","Telemetry","CP-INT-001","Temperature observation accepted","22:41:18"],
  ["EVT-2047","Decision","AOS-RULE-DO-01","No intervention required","22:41:17"],
  ["EVT-2046","Observation","HAB-V1-001","Zone observation updated","22:41:16"],
  ["EVT-2045","Command","CP-ACT-001","Aeration state acknowledged","22:40:52"],
  ["EVT-2044","System","CRABPOD-001","Heartbeat received","22:40:48"],
];

const assets = [
  ["HAB-V1-001","Habitat","Integrated runtime pending","amber"],
  ["COMP-001","Compartment","Engineering identity","blue"],
  ["CRABPOD-001","CrabPod","Software integration","green"],
  ["CRABSENSE-001","CrabSense","Telemetry contract","green"],
  ["AQUAOS-001","AquaOS","Cloud demo runtime","green"],
];

const gates = [
  ["PMO-G0","Procurement / lab readiness","Pending","Physical equipment + acceptance records"],
  ["PMO-G1","AquaOS truth","In progress","Runtime path and evidence reconciliation"],
  ["PMO-G2","First closed loop","Pending","Real sensor → command → acknowledgement"],
  ["PMO-G3","Biological observation","Pending","Controlled biological protocol"],
  ["PMO-G4","Pond supply wedge","Evidence required","Farmer baseline + measured biomass"],
  ["PMO-G6","600-box validation","Downstream","Biological + economic repeatability"],
  ["PMO-G7","Processor validation","Evidence required","External buyer/customer evidence"],
];

function Pill({ children, tone="blue" }: {children: React.ReactNode; tone?: "green"|"amber"|"red"|"blue"|"slate"}) {
  const c = {green:"border-emerald-200 bg-emerald-50 text-emerald-700",amber:"border-amber-200 bg-amber-50 text-amber-700",red:"border-rose-200 bg-rose-50 text-rose-700",blue:"border-cyan-200 bg-cyan-50 text-cyan-700",slate:"border-slate-200 bg-slate-100 text-slate-600"}[tone];
  return <span className={"inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] "+c}>{children}</span>;
}

function Card({children,className=""}:{children:React.ReactNode;className?:string}) {
  return <section className={"rounded-2xl border border-slate-200 bg-white shadow-sm "+className}>{children}</section>;
}

function Header({screen}:{screen:string}) {
  return <div className="border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
    <div className="flex items-center justify-between gap-4">
      <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-700">CRABIONICS · AQUAOS</p><h1 className="mt-1 text-xl font-bold tracking-tight text-[#0b2347]">{screen}</h1></div>
      <div className="flex items-center gap-2"><Pill tone="green">Cloud runtime</Pill><Pill tone="amber">Synthetic lab data</Pill></div>
    </div>
  </div>;
}

export default function DigitalModelPage() {
  const [screen,setScreen] = useState<Screen>("founder");
  const [running,setRunning] = useState(false);
  const [step,setStep] = useState(0);
  const [telemetry,setTelemetry] = useState(telemetry0);
  const [selectedAsset,setSelectedAsset] = useState("HAB-V1-001");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTelemetry(t => t.map(([n,v,u,s]) => {
      const x = Number(v); const delta = (Math.random()-.5) * (n==="Temperature"?.12:n==="pH"?.04:.08);
      return [n,(x+delta).toFixed(n==="pH"?2:2),u,s];
    })),1500);
    return () => clearInterval(id);
  },[running]);

  const stage = ["Observation","Event correlation","Decision","Command","Acknowledgement","Outcome / evidence"][step];
  const summary = useMemo(() => ({
    activeAssets: assets.length, telemetry: telemetry.length, openAlerts: 1, evidence: 2
  }),[telemetry]);

  return <main className="min-h-screen bg-[#f4f8fb] text-slate-900">
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-[#071d3b] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-6 py-6"><div className="text-lg font-extrabold tracking-tight">Crabionics</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">AquaOS cloud demo</div></div>
        <nav className="flex-1 overflow-y-auto p-3">{screens.map(([id,label,sub])=><button key={id} onClick={()=>setScreen(id)} className={"mb-1 w-full rounded-xl px-3 py-3 text-left transition "+(screen===id?"bg-white text-[#0b2347]":"text-slate-300 hover:bg-white/10")}><div className="text-sm font-semibold">{label}</div><div className={"mt-0.5 text-[10px] "+(screen===id?"text-slate-500":"text-slate-500")}>{sub}</div></button>)}</nav>
        <div className="border-t border-white/10 p-4 text-[10px] leading-5 text-slate-400">Demo mode: synthetic values only.<br/>No physical validation is implied.</div>
      </aside>

      <div className="flex-1">
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3"><div><b className="text-[#0b2347]">Crabionics</b><span className="ml-2 text-[10px] text-cyan-700">AquaOS</span></div><Pill tone="amber">DEMO</Pill></div>
          <div className="flex gap-1 overflow-x-auto px-3 pb-2">{screens.map(([id,label])=><button key={id} onClick={()=>setScreen(id)} className={"whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold "+(screen===id?"bg-[#0b2347] text-white":"bg-slate-100 text-slate-600")}>{label}</button>)}</div>
        </div>

        <Header screen={screens.find(x=>x[0]===screen)?.[1] || "AquaOS"} />

        <div className="mx-auto max-w-[1500px] space-y-5 p-4 lg:p-8">
          {screen==="founder" && <Founder summary={summary} gates={gates} setScreen={setScreen}/>}
          {screen==="site" && <Site assets={assets} setScreen={setScreen}/>}
          {screen==="assets" && <Assets selected={selectedAsset} setSelected={setSelectedAsset}/>}
          {screen==="sensors" && <Sensors telemetry={telemetry} running={running} setRunning={setRunning}/>}
          {screen==="environment" && <Environment telemetry={telemetry}/>}
          {screen==="alerts" && <Alerts/>}
          {screen==="actuators" && <Actuators/>}
          {screen==="ledger" && <Ledger/>}
          {screen==="validation" && <Validation gates={gates}/>}
          {screen==="commercial" && <Commercial/>}
          {screen==="experiment" && <Experiment running={running} setRunning={setRunning} step={step} setStep={setStep} stage={stage}/>}
        </div>
      </div>
    </div>
  </main>;
}

function Founder({summary,gates,setScreen}:{summary:any;gates:any[];setScreen:(x:Screen)=>void}) {
 return <div className="space-y-5">
  <div className="grid gap-3 md:grid-cols-4">{[
    ["Assets",summary.activeAssets,"registry view"],["Telemetry",summary.telemetry,"CrabSense channels"],["Open alerts",summary.openAlerts,"operator attention"],["Evidence records",summary.evidence,"demo evidence"]
  ].map(x=><Card key={x[0]} className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">{x[0]}</p><div className="mt-2 text-3xl font-bold text-[#0b2347]">{x[1]}</div><p className="mt-1 text-xs text-slate-500">{x[2]}</p></Card>)}</div>
  <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
   <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Operating chain</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Habitat → Sense → Pod → AquaOS</h2></div><Pill tone="blue">Integrated architecture</Pill></div><div className="mt-7 grid gap-2 md:grid-cols-4">{["Habitat","CrabSense","CrabPod","AquaOS"].map((x,i)=><div key={x} className="rounded-xl border border-slate-200 p-4"><div className="text-[10px] font-bold text-slate-400">0{i+1}</div><div className="mt-3 font-bold text-[#0b2347]">{x}</div><div className="mt-1 text-xs text-slate-500">{["Physical context","Observation","Edge action","State + evidence"][i]}</div></div>)}</div><div className="mt-5 rounded-xl bg-[#071d3b] p-5 text-white"><div className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-300">Current cloud experiment</div><div className="mt-2 text-lg font-semibold">CP-INT-001 / VAL-007 synthetic closed loop</div><div className="mt-2 text-sm text-slate-300">Observation → event → decision → command → acknowledgement → outcome.</div><button onClick={()=>setScreen("experiment")} className="mt-4 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-[#071d3b]">Open experiment console</button></div></Card>
   <Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Validation status</p><h2 className="mt-1 text-xl font-bold text-[#0b2347]">Evidence ladder</h2><div className="mt-4 space-y-3">{gates.slice(0,5).map(g=><div key={g[0]} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"><div><div className="text-xs font-bold text-[#0b2347]">{g[0]}</div><div className="text-xs text-slate-500">{g[1]}</div></div><Pill tone={g[2]==="In progress"?"blue":g[2]==="Pending"?"amber":"slate"}>{g[2]}</Pill></div>)}</div><button onClick={()=>setScreen("validation")} className="mt-4 text-xs font-bold text-cyan-700">View all validation gates →</button></Card>
  </div>
  <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Latest causality</p><h2 className="mt-1 text-xl font-bold text-[#0b2347]">What happened and why?</h2></div><button onClick={()=>setScreen("ledger")} className="text-xs font-bold text-cyan-700">Event ledger →</button></div><div className="mt-4 grid gap-3 md:grid-cols-5">{events.map(e=><div key={e[0]} className="rounded-xl border border-slate-200 p-4"><Pill tone={e[1]==="Decision"?"blue":"slate"}>{e[1]}</Pill><div className="mt-3 text-sm font-semibold text-[#0b2347]">{e[3]}</div><div className="mt-2 text-[10px] text-slate-400">{e[0]} · {e[4]}</div></div>)}</div></Card>
 </div>
}

function Site({assets,setScreen}:{assets:any[];setScreen:(x:Screen)=>void}) {
 return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Deployment</p><div className="mt-2 text-xl font-bold text-[#0b2347]">KIIT validation lab</div><Pill tone="amber">Readiness pending</Pill></Card><Card className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Connectivity</p><div className="mt-2 text-xl font-bold text-[#0b2347]">MQTT / cloud</div><Pill tone="blue">Synthetic broker path</Pill></Card><Card className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Validation</p><div className="mt-2 text-xl font-bold text-[#0b2347]">PMO-G1</div><Pill tone="blue">Integration focus</Pill></Card></div><Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Site topology</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Physical deployment model</h2><div className="mt-6 space-y-3">{assets.map((a:any)=><div key={a[0]} className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"><div><b className="text-sm text-[#0b2347]">{a[0]}</b><span className="ml-3 text-xs text-slate-400">{a[1]}</span></div><div className="flex items-center gap-3"><span className="text-xs text-slate-500">{a[2]}</span><Pill tone={a[3]==="green"?"green":a[3]==="amber"?"amber":"blue"}>{a[3]}</Pill></div></div>)}</div><button onClick={()=>setScreen("assets")} className="mt-5 rounded-lg bg-[#0b2347] px-4 py-2 text-xs font-bold text-white">Open asset explorer</button></Card></div>
}

function Assets({selected,setSelected}:{selected:string;setSelected:(x:string)=>void}) {
 const item=assets.find(a=>a[0]===selected) || assets[0];
 return <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><Card className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Asset registry</p>{assets.map(a=><button key={a[0]} onClick={()=>setSelected(a[0])} className={"mt-2 w-full rounded-xl p-4 text-left "+(selected===a[0]?"bg-cyan-50 ring-1 ring-cyan-300":"bg-slate-50")}><b className="text-sm text-[#0b2347]">{a[0]}</b><div className="mt-1 text-xs text-slate-500">{a[1]} · {a[2]}</div></button>)}</Card><Card className="p-6"><Pill tone="blue">ASSET DETAIL</Pill><h2 className="mt-3 text-3xl font-bold text-[#0b2347]">{item[0]}</h2><p className="mt-1 text-sm text-slate-500">{item[1]}</p><div className="mt-6 grid gap-3 md:grid-cols-2"><Info k="Identity" v={item[0]}/><Info k="State" v={item[2]}/><Info k="Parent" v={item[0].startsWith("HAB")?"Site / lab":"Habitat / system"}/><Info k="Evidence" v="Engineering/demo state only"/></div><div className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">Registry identity is not proof of commissioned physical equipment. Physical identity and commissioning remain evidence gates.</div></Card></div>
}

function Sensors({telemetry,running,setRunning}:{telemetry:any[];running:boolean;setRunning:(x:boolean)=>void}) {
 return <div className="space-y-5"><Card className="p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">CrabSense telemetry</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Sensor dashboard</h2><p className="mt-1 text-xs text-slate-500">Synthetic values · deterministic demo surface · not calibrated field data.</p></div><button onClick={()=>setRunning(!running)} className={"rounded-lg px-4 py-2 text-xs font-bold "+(running?"bg-rose-600 text-white":"bg-[#0b2347] text-white")}>{running?"Stop simulation":"Start telemetry simulation"}</button></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{telemetry.map((x:any)=><div key={x[0]} className="rounded-xl border border-slate-200 p-5"><div className="flex justify-between"><span className="text-xs font-semibold text-slate-500">{x[0]}</span><Pill tone={x[3]==="normal"?"green":"amber"}>{x[3]}</Pill></div><div className="mt-4 text-3xl font-bold text-[#0b2347]">{x[1]} <span className="text-sm font-medium text-slate-400">{x[2]}</span></div><div className="mt-2 h-1.5 rounded bg-slate-100"><div className="h-1.5 w-3/4 rounded bg-cyan-500"/></div><div className="mt-2 text-[10px] text-slate-400">CRABSENSE-001 · synthetic</div></div>)}</div></Card></div>
}

function Environment({telemetry}:{telemetry:any[]}) {
 return <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]"><Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Environmental state</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Zone COMP-001</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{telemetry.map((x:any)=><div key={x[0]} className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-500">{x[0]}</div><div className="mt-2 text-xl font-bold text-[#0b2347]">{x[1]} {x[2]}</div></div>)}</div></Card><Card className="p-6"><Pill tone="green">STATE: OPERATING</Pill><h3 className="mt-4 text-xl font-bold text-[#0b2347]">Environmental interpretation</h3><p className="mt-3 text-sm leading-6 text-slate-600">The demo state is generated from the synthetic telemetry fixture. A production state must be derived from validated telemetry and governed thresholds.</p><div className="mt-5 rounded-xl border border-slate-200 p-4"><div className="text-xs font-bold text-slate-400">Rule engine</div><div className="mt-1 text-sm font-semibold text-[#0b2347]">AOS-RULE-DO-01</div><div className="mt-1 text-xs text-slate-500">No intervention required</div></div></Card></div>
}

function Alerts() { return <div className="space-y-5"><Card className="p-6"><div className="flex justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Operator attention</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Alerts & decisions</h2></div><Pill tone="amber">1 synthetic watch</Pill></div><div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex flex-wrap items-center gap-2"><Pill tone="amber">WATCH</Pill><b className="text-[#0b2347]">Nitrite trend requires observation</b></div><p className="mt-3 text-sm leading-6 text-amber-900">Synthetic telemetry crossed the demo watch threshold. The deterministic decision records observation rather than claiming a biological effect.</p><div className="mt-5 grid gap-3 md:grid-cols-4">{["Observation accepted","Rule evaluated","Decision recorded","Operator acknowledgement"].map((x,i)=><div key={x} className="rounded-xl bg-white/70 p-3 text-xs font-semibold text-slate-700"><span className="mr-2 text-slate-400">0{i+1}</span>{x}</div>)}</div></div></Card></div> }

function Actuators() { const [on,setOn]=useState(false); return <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]"><Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">CrabPod edge control</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Actuator command console</h2><p className="mt-2 text-xs text-slate-500">Simulation only. No physical relay is connected to this cloud UI.</p><div className="mt-6 grid gap-3 md:grid-cols-2">{["Aeration relay","Pump relay","Flush solenoid","Buzzer"].map((x,i)=><div key={x} className="flex items-center justify-between rounded-xl border border-slate-200 p-4"><div><b className="text-sm text-[#0b2347]">{x}</b><div className="text-[10px] text-slate-400">CRABPOD-001 · channel {i+1}</div></div><button onClick={()=>i===0&&setOn(!on)} className={"rounded-full px-4 py-2 text-xs font-bold "+(i===0&&on?"bg-emerald-600 text-white":"bg-slate-100 text-slate-500")}>{i===0&&on?"ON":"OFF"}</button></div>)}</div></Card><Card className="p-6"><Pill tone={on?"green":"slate"}>{on?"COMMAND SIMULATED":"IDLE"}</Pill><h3 className="mt-4 text-xl font-bold text-[#0b2347]">Execution lifecycle</h3><div className="mt-4 space-y-2">{["ExecutionRequest created","Command emitted","Ack received","Outcome recorded"].map((x,i)=><div key={x} className="rounded-lg bg-slate-50 p-3 text-xs">{on||i===0?<span className="mr-2 text-emerald-600">●</span>:<span className="mr-2 text-slate-300">○</span>}{x}</div>)}</div></Card></div> }

function Ledger(){return <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Append-only event view</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Event & causality ledger</h2></div><Pill tone="blue">DEMO RECORDS</Pill></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-slate-200 text-[10px] uppercase tracking-[.1em] text-slate-400"><tr><th className="p-3">Event</th><th className="p-3">Type</th><th className="p-3">Source</th><th className="p-3">Description</th><th className="p-3">Time</th></tr></thead><tbody>{events.map(e=><tr key={e[0]} className="border-b border-slate-100"><td className="p-3 font-mono">{e[0]}</td><td className="p-3"><Pill tone={e[1]==="Decision"?"blue":"slate"}>{e[1]}</Pill></td><td className="p-3">{e[2]}</td><td className="p-3 font-semibold text-[#0b2347]">{e[3]}</td><td className="p-3 text-slate-500">{e[4]}</td></tr>)}</tbody></table></div></Card>}

function Validation({gates}:{gates:any[]}){return <div className="space-y-5"><Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Programme evidence</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Validation control board</h2><div className="mt-6 space-y-3">{gates.map(g=><div key={g[0]} className="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-[100px_1fr_180px_1.4fr] md:items-center"><b className="text-sm text-[#0b2347]">{g[0]}</b><span className="text-sm font-semibold">{g[1]}</span><Pill tone={g[2].includes("Pending")?"amber":g[2].includes("Evidence")?"red":"blue"}>{g[2]}</Pill><span className="text-xs text-slate-500">{g[3]}</span></div>)}</div></Card><Card className="p-6 bg-[#071d3b] text-white"><div className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-300">Evidence rule</div><div className="mt-3 text-lg font-semibold">Implementation → integration → runtime/raw evidence → validation</div><p className="mt-2 text-sm text-slate-300">This cloud demo proves only software presentation and deterministic simulation. It does not clear a PMO gate.</p></Card></div>}

function Commercial(){return <div className="space-y-5"><Card className="p-6"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-cyan-700">Commercial architecture</p><h2 className="mt-1 text-2xl font-bold text-[#0b2347]">Distributed biomass → controlled finishing → standardized output</h2><div className="mt-7 grid gap-3 md:grid-cols-5">{[["01","Seed / hatchery","IHMS / HatchSync","Intelligence"],["02","Farmer nursery","Community supply","Baseline required"],["03","Pond biomass","Distributed production","G4 evidence"],["04","RAS finishing","Crabionics controlled system","G6 validation"],["05","Processor / export","Specification-driven market","G7 evidence"]].map(x=><div key={x[0]} className="rounded-xl border border-slate-200 p-5"><span className="text-xs font-bold text-cyan-700">{x[0]}</span><h3 className="mt-3 font-bold text-[#0b2347]">{x[1]}</h3><p className="mt-2 text-xs text-slate-500">{x[2]}</p><p className="mt-4 text-[10px] font-bold uppercase tracking-[.1em] text-slate-400">{x[3]}</p></div>)}</div></Card><div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><Pill tone="amber">Revalidation</Pill><h3 className="mt-3 font-bold text-[#0b2347]">Buyer requirements</h3><p className="mt-2 text-sm text-slate-600">External buyer evidence must be captured before commercial claims are promoted.</p></Card><Card className="p-5"><Pill tone="amber">Baseline</Pill><h3 className="mt-3 font-bold text-[#0b2347]">Farmer network</h3><p className="mt-2 text-sm text-slate-600">Initial multi-farm baseline is a downstream evidence requirement.</p></Card><Card className="p-5"><Pill tone="slate">Scenario</Pill><h3 className="mt-3 font-bold text-[#0b2347]">600 / 3,000 boxes</h3><p className="mt-2 text-sm text-slate-600">Validation and deployment configurations, not achieved production results.</p></Card></div></div>}

function Experiment({running,setRunning,step,setStep,stage}:{running:boolean;setRunning:(x:boolean)=>void;step:number;setStep:(x:number)=>void;stage:string}){return <div className="space-y-5"><Card className="p-6"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><Pill tone="blue">CP-INT-001</Pill><h2 className="mt-3 text-2xl font-bold text-[#0b2347]">First technical closed-loop console</h2><p className="mt-2 text-sm text-slate-600">The cloud prototype exercises the same evidence sequence intended for the physical temperature experiment and VAL-007.</p></div><button onClick={()=>{setRunning(!running);if(!running)setStep(0)}} className={"rounded-lg px-5 py-3 text-xs font-bold "+(running?"bg-rose-600 text-white":"bg-[#0b2347] text-white")}>{running?"Stop run":"Run synthetic experiment"}</button></div><div className="mt-8 grid gap-2 md:grid-cols-6">{["Observation","Event","Decision","Command","Ack","Outcome"].map((x,i)=><button key={x} onClick={()=>setStep(i)} className={"rounded-xl border p-4 text-left "+(i<=step?"border-cyan-300 bg-cyan-50":"border-slate-200 bg-slate-50")}><div className="text-[10px] font-bold text-slate-400">0{i+1}</div><div className="mt-2 text-sm font-bold text-[#0b2347]">{x}</div><div className="mt-1 text-[10px] text-slate-500">{i<=step?"recorded":"awaiting"}</div></button>)}</div><div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-2xl bg-[#071d3b] p-6 text-white"><Pill tone="blue">CURRENT STAGE</Pill><h3 className="mt-4 text-2xl font-bold">{stage}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{["Canonical observation enters the operating path.","Observation is correlated with asset and operating context.","Deterministic rule evaluates the current state.","Execution request is emitted toward CrabPod.","Edge acknowledgement is captured.","Outcome is recorded for reconstruction and evidence."][step]}</p><button disabled={step===5} onClick={()=>setStep(Math.min(5,step+1))} className="mt-5 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-[#071d3b] disabled:opacity-40">Advance step</button></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><Pill tone="amber">SIMULATION BOUNDARY</Pill><ul className="mt-4 space-y-3 text-sm leading-6 text-amber-900"><li>• No real sensor is connected.</li><li>• No physical relay is switched.</li><li>• No crab response is inferred.</li><li>• This becomes physical evidence only after CP-INT-001 hardware execution.</li></ul></div></div></Card></div>}

function Info({k,v}:{k:string;v:string}){return <div className="rounded-xl bg-slate-50 p-4"><div className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{k}</div><div className="mt-1 text-sm font-semibold text-[#0b2347]">{v}</div></div>}
