"use client";

import { useMemo, useState } from "react";

type Props = { pmoState: string | null; processorIssueOpen: boolean | null; pmoStateUrl: string };
type Tone = "good" | "warn" | "risk" | "neutral";
type Perspective = "CEO" | "CTO" | "Scientist" | "Investor" | "Farmer" | "Commercial" | "Competitor";
type Tab = "today" | "decisions" | "company" | "evidence" | "lenses";

type Matter = {
  id: string;
  title: string;
  scope: string;
  state: string;
  tone: Tone;
  why: string;
  recommendation: string;
  next: string;
  evidence: string;
  lenses: Record<Perspective, string>;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "decisions", label: "Decisions" },
  { id: "company", label: "Company" },
  { id: "evidence", label: "Evidence" },
  { id: "lenses", label: "Lenses" },
];

const perspectives: Perspective[] = ["CEO", "CTO", "Scientist", "Investor", "Farmer", "Commercial", "Competitor"];

const palette: Record<Tone, { bg: string; border: string; text: string; dot: string }> = {
  good: { bg: "#effaf5", border: "#b9e6d3", text: "#087f5b", dot: "#18a673" },
  warn: { bg: "#fff9ed", border: "#ead49a", text: "#8a6100", dot: "#d99a00" },
  risk: { bg: "#fff4f3", border: "#efc5c0", text: "#b42318", dot: "#e5483e" },
  neutral: { bg: "#f6f8fb", border: "#dbe3ee", text: "#52627a", dot: "#8795a8" },
};

const tracks = [
  ["Technology", "On track", "good"], ["Biology", "Owner required", "risk"], ["Commercial", "Validation open", "warn"],
  ["BIRAC", "Evidence gap", "warn"], ["IP", "On track", "neutral"], ["Economics", "Needs proof", "risk"],
  ["Capital", "Evidence-led", "warn"], ["Operations", "Developing", "neutral"],
] as const;

const gates = [
  ["G0", "Architecture / control plane", "ACTIVE", "good"],
  ["G1", "Synthetic / no-crab evidence", "IMPLEMENTED · NOT VALIDATED", "warn"],
  ["G2", "Biological lab integration", "CURRENT GATE · NOT CLEARED", "risk"],
  ["G3", "Field / pilot readiness", "NOT CLEARED", "risk"],
  ["G4", "600-box biological validation", "NOT CLEARED", "risk"],
  ["G5", "Commercial / customer validation", "NOT CLEARED", "risk"],
  ["G6", "Scale / repeatability capital", "TARGET", "neutral"],
] as const;

function clean(value: string) {
  return value.replace(/\*\*/g, "").replace(/`/g, "").replace(/^[-*]\s+/gm, "").replace(/\n{2,}/g, " ").trim();
}

function has(value: string, ...terms: string[]) {
  const text = value.toLowerCase();
  return terms.every((term) => text.includes(term.toLowerCase()));
}

function section(markdown: string | null, heading: string) {
  if (!markdown) return "";
  const start = markdown.indexOf(`## ${heading}`);
  if (start < 0) return "";
  const body = markdown.slice(start + heading.length + 3).replace(/^\r?\n/, "");
  const end = body.search(/\r?\n## /);
  return clean(end >= 0 ? body.slice(0, end) : body);
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  const c = palette[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", borderRadius: 999, border: `1px solid ${c.border}`, background: c.bg, color: c.text, fontSize: 9, fontWeight: 850, letterSpacing: ".06em", whiteSpace: "nowrap" }}>{children}</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "#7a889a", fontSize: 9, fontWeight: 900, letterSpacing: ".15em", textTransform: "uppercase" }}>{children}</div>;
}

function Card({ children, tone = "neutral", style = {} }: { children: React.ReactNode; tone?: Tone; style?: React.CSSProperties }) {
  const c = palette[tone];
  return <div style={{ background: "#fff", border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, ...style }}>{children}</div>;
}

export default function FounderDecisionWorkspace({ pmoState, processorIssueOpen, pmoStateUrl }: Props) {
  const state = pmoState ?? "";
  const physicalPending = has(state, "physical", "validation", "pending");
  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;
  const date = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "current PMO snapshot";
  const strategic = section(pmoState, "Current strategic position") || "Current company position is read from the authoritative PMO snapshot.";

  const matters = useMemo<Matter[]>(() => [
    {
      id: "biology", title: "Scientific validation owner", scope: "BIOLOGY", state: biologyRisk ? "Founder decision required" : "Ownership not exposed", tone: biologyRisk ? "risk" : "neutral",
      why: "Biological gates cannot advance responsibly without an accountable scientific owner.",
      recommendation: "Assign one accountable scientific validation owner before biological advancement.",
      next: "Resolve ownership, then freeze protocol, endpoints, controls and deviation rules.",
      evidence: "PMO CURRENT_STATE.md · Biological validation rule",
      lenses: {
        CEO: "Resolve the accountability gap. This is a people decision, not another software task.",
        CTO: "Do not encode biological policy into software until the scientific protocol is authoritative.",
        Scientist: "Define controls, endpoints, acceptance criteria, measurements and deviations before stocking.",
        Investor: "Unowned biological validation is a material execution risk for every later claim.",
        Farmer: "The protocol must work under real husbandry constraints, not only laboratory assumptions.",
        Commercial: "Customer promises should wait for measured biological performance against a defined protocol.",
        Competitor: "Clear ownership and controlled evidence strengthen credibility.",
      },
    },
    {
      id: "technical", title: "Physical validation readiness", scope: "TECHNOLOGY", state: physicalPending ? "Track constraint" : "No blocker exposed", tone: physicalPending ? "warn" : "good",
      why: "The immediate technical path is procurement → AquaOS truth → lab start → first technical data.",
      recommendation: "Finish the existing integration path before adding new capability.",
      next: "Execute the approved technical path and capture reconstructable evidence.",
      evidence: "PMO CURRENT_STATE.md · Phase 2 gate · VAL-007",
      lenses: {
        CEO: "Protect focus. Prove the existing system before expanding the product surface.",
        CTO: "Prove sense → command → actuation → acknowledgement/outcome before changing architecture.",
        Scientist: "Technical proof remains separate from biological proof.",
        Investor: "This retires a concrete technical risk without overstating validation.",
        Farmer: "The loop matters only if it becomes reliable, understandable and maintainable on-farm.",
        Commercial: "Do not sell integration as production proof.",
        Competitor: "The defensible asset is a proven physical + digital operating loop, not another dashboard.",
      },
    },
    {
      id: "birac", title: "BIRAC M0 receipt evidence", scope: "BIRAC", state: biracPending ? "Primary receipt not evidenced" : "No unresolved receipt condition", tone: biracPending ? "warn" : "good",
      why: "The agreement may be executed, but the PMO requires primary evidence before treating the ₹20L as received.",
      recommendation: "Keep the funding status evidence-led until the primary receipt is reconciled.",
      next: "Reconcile bank/receipt evidence and archive the final signed records.",
      evidence: "PMO funding boundary · BIRAC/IHMS milestone record",
      lenses: {
        CEO: "Know whether cash actually arrived before treating it as available capital.",
        CTO: "Keep funded work inside the approved scope and evidence boundary.",
        Scientist: "A funding milestone does not establish biological validation.",
        Investor: "Clean cash evidence improves diligence; do not inflate available capital.",
        Farmer: "Grant status does not change whether the system works on-farm.",
        Commercial: "Grant progress supports capability development, not customer proof.",
        Competitor: "Compete on validated outcomes, not funding optics.",
      },
    },
    {
      id: "commercial", title: "Processor validation", scope: "COMMERCIAL", state: commercialOpen ? "External evidence open" : "Issue closed · outcome review", tone: commercialOpen ? "warn" : "neutral",
      why: "An open processor track is useful only when evidence moves beyond prospects into real requirements and economics.",
      recommendation: "Continue the existing commercial validation track in parallel; do not upgrade prospects into customers prematurely.",
      next: "Capture response → problem → specification → economics → pilot evidence.",
      evidence: "PMO #39 · commercial evidence ladder",
      lenses: {
        CEO: "Spend founder time where external evidence can change a material company decision.",
        CTO: "Let evidenced customer requirements change engineering; do not build for imagined demand.",
        Scientist: "Commercial specifications must remain compatible with measurable biological quality and repeatability.",
        Investor: "A prospect is not traction. Look for evidence that survives diligence.",
        Farmer: "Processor requirements must translate into something a farm can repeatedly produce.",
        Commercial: "Advance only as evidence moves through the validation ladder.",
        Competitor: "Real processor evidence is stronger than an imagined market narrative.",
      },
    },
  ], [biologyRisk, biracPending, commercialOpen, physicalPending]);

  const [tab, setTab] = useState<Tab>("today");
  const [matterId, setMatterId] = useState("biology");
  const [lens, setLens] = useState<Perspective>("CEO");
  const matter = matters.find((item) => item.id === matterId) ?? matters[0];
  const attention = matters.filter((item) => item.tone === "risk" || item.tone === "warn");

  const openMatter = (id: string) => { setMatterId(id); setLens("CEO"); setTab("decisions"); };

  return <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#14243c", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
    <style>{`*{box-sizing:border-box}button{font:inherit}@media(max-width:700px){.topGrid{grid-template-columns:1fr!important}.decisionGrid{grid-template-columns:1fr!important}.trackGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.gateGrid{grid-template-columns:1fr!important}.lensGrid{grid-template-columns:1fr!important}.tabs{overflow-x:auto!important;justify-content:flex-start!important}.tab{min-width:92px!important}.heroTitle{font-size:30px!important}.todayCards{grid-template-columns:1fr!important}.metaGrid{grid-template-columns:1fr!important}.page{padding:14px 12px 42px!important}}`}</style>
    <div className="page" style={{ maxWidth: 1040, margin: "0 auto", padding: "22px 18px 60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, paddingBottom: 18, borderBottom: "1px solid #dde5ee" }}>
        <div><div style={{ color: "#75849a", fontSize: 9, fontWeight: 900, letterSpacing: ".15em" }}>CRABIONICS · FOUNDER OPERATING TERMINAL</div><h1 className="heroTitle" style={{ margin: "5px 0 0", color: "#102c5c", fontSize: 38, lineHeight: 1, letterSpacing: "-.04em" }}>Control Tower</h1></div>
        <div style={{ textAlign: "right" }}><Badge tone={pmoState ? "good" : "risk"}>{pmoState ? "LIVE · PMO STATE" : "PMO UNAVAILABLE"}</Badge><div style={{ marginTop: 5, color: "#8c99aa", fontSize: 9 }}>{date}</div></div>
      </header>

      <nav className="tabs" aria-label="Founder operating tabs" style={{ display: "flex", gap: 5, margin: "14px 0 0", padding: 5, background: "#e9eef4", borderRadius: 13 }}>
        {tabs.map((item) => { const active = tab === item.id; return <button className="tab" key={item.id} onClick={() => setTab(item.id)} style={{ flex: 1, minWidth: 0, border: active ? "1px solid #d8e1ec" : "1px solid transparent", borderRadius: 10, padding: "10px 12px", background: active ? "#fff" : "transparent", color: active ? "#102c5c" : "#65748a", fontSize: 12, fontWeight: 850, cursor: "pointer", boxShadow: active ? "0 1px 3px rgba(16,44,92,.08)" : "none" }}>{item.label}</button>; })}
      </nav>

      {tab === "today" && <section style={{ marginTop: 22, display: "grid", gap: 18 }}>
        <div><Label>Today</Label><div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, marginTop: 4 }}><div><h2 className="heroTitle" style={{ margin: 0, color: "#102c5c", fontSize: 31, letterSpacing: "-.035em" }}>What matters right now</h2><p style={{ margin: "6px 0 0", color: "#6b7b90", fontSize: 12 }}>The few things that can change the company position.</p></div><button onClick={() => setTab("decisions")} style={{ border: "1px solid #d9e2ec", background: "#fff", color: "#075bc4", borderRadius: 10, padding: "9px 11px", fontSize: 10, fontWeight: 850, cursor: "pointer" }}>View decisions →</button></div></div>
        <div className="todayCards" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10 }}>
          {attention.map((item, index) => <button key={item.id} onClick={() => openMatter(item.id)} style={{ textAlign: "left", border: `1px solid ${palette[item.tone].border}`, background: "#fff", borderRadius: 15, padding: 14, cursor: "pointer", minHeight: 158 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><span style={{ width: 26, height: 26, display: "grid", placeItems: "center", borderRadius: 99, background: palette[item.tone].bg, color: palette[item.tone].text, fontWeight: 900, fontSize: 11 }}>{index + 1}</span><Badge tone={item.tone}>{item.tone === "risk" ? "DECISION" : "ATTENTION"}</Badge></div><div style={{ marginTop: 17, color: "#102c5c", fontSize: 14, fontWeight: 850, lineHeight: 1.25 }}>{item.title}</div><div style={{ marginTop: 7, color: "#718096", fontSize: 10, lineHeight: 1.45 }}>{item.state}</div><div style={{ marginTop: 16, color: "#075bc4", fontSize: 10, fontWeight: 850 }}>Open →</div></button>)}
        </div>
        <div className="topGrid" style={{ display: "grid", gridTemplateColumns: "1.35fr .8fr", gap: 12 }}>
          <Card><Label>Immediate execution sequence</Label><div style={{ marginTop: 13, display: "grid", gap: 14 }}>{[["1", "Advance physical validation", "AquaOS truth → lab start → first technical data"], ["2", "Protect the biological evidence boundary", "Technical closed-loop proof remains separate from biological proof"], ["3", "Continue processor validation in parallel", "Do not wait for software polish to collect customer evidence"]].map(([n, title, text]) => <div key={n} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 11 }}><div style={{ width: 26, height: 26, borderRadius: 99, background: "#eefaf5", color: "#087f5b", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 900 }}>{n}</div><div><div style={{ color: "#102c5c", fontSize: 12, fontWeight: 850 }}>{title}</div><div style={{ marginTop: 3, color: "#718096", fontSize: 10, lineHeight: 1.45 }}>{text}</div></div></div>)}</div></Card>
          <Card tone="risk"><Label>Current constraint</Label><h3 style={{ margin: "8px 0 5px", color: "#102c5c", fontSize: 18, letterSpacing: "-.02em" }}>Physical validation readiness</h3><Badge tone="risk">TRACK CONSTRAINT</Badge><p style={{ margin: "10px 0 0", color: "#68788e", fontSize: 10.5, lineHeight: 1.5 }}>This is a technical track constraint, not a claim that the whole company is blocked.</p><button onClick={() => openMatter("technical")} style={{ marginTop: 12, border: 0, background: "transparent", padding: 0, color: "#075bc4", fontSize: 10, fontWeight: 850, cursor: "pointer" }}>Why this matters →</button></Card>
        </div>
        <div className="metaGrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[['Current horizon','H1 · Lab / IP / technical validation'],['Current gate','Technical closed-loop validation precedes biological validation'],['Source of truth','PMO · CURRENT_STATE.md']].map(([label,value]) => <Card key={label} style={{ padding: 13 }}><Label>{label}</Label><div style={{ marginTop: 7, color: "#30445f", fontSize: 11, lineHeight: 1.45 }}>{value}</div></Card>)}
        </div>
        <Card><Label>At-a-glance company position</Label><div className="trackGrid" style={{ display: "grid", gridTemplateColumns: "repeat(8,minmax(0,1fr))", gap: 7, marginTop: 11 }}>{tracks.map(([name,status,tone]) => <div key={name} style={{ border: "1px solid #e1e7ee", borderRadius: 11, padding: "10px 8px", background: "#fff" }}><div style={{ color: "#30445f", fontSize: 10, fontWeight: 850 }}>{name}</div><div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, color: palette[tone].text, fontSize: 9 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: palette[tone].dot }} />{status}</div></div>)}</div></Card>
        <Card><div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><Label>Evidence boundary</Label><button onClick={() => setTab("evidence")} style={{ border: 0, background: "transparent", color: "#075bc4", fontSize: 10, fontWeight: 850, cursor: "pointer" }}>Open evidence →</button></div><p style={{ margin: "9px 0 0", color: "#617189", fontSize: 10.5, lineHeight: 1.5 }}>{strategic.length > 360 ? `${strategic.slice(0, 360)}…` : strategic}</p></Card>
      </section>}

      {tab === "decisions" && <section style={{ marginTop: 22 }}><Label>Decision queue</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 29, letterSpacing: "-.035em" }}>What needs a judgement?</h2><p style={{ margin: 0, color: "#6b7b90", fontSize: 12 }}>Select one matter. Everything below stays about that matter.</p><div className="decisionGrid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 12, marginTop: 15 }}><div style={{ display: "grid", gap: 7, alignContent: "start" }}>{matters.map((item) => { const active = item.id === matter.id; return <button key={item.id} onClick={() => setMatterId(item.id)} style={{ textAlign: "left", border: `1px solid ${active ? "#102c5c" : palette[item.tone].border}`, borderRadius: 12, background: active ? "#fff" : "#fafbfc", padding: 12, cursor: "pointer" }}><div style={{ color: "#102c5c", fontSize: 12, fontWeight: 850 }}>{item.title}</div><div style={{ marginTop: 4, color: "#7a889a", fontSize: 9 }}>{item.scope} · {item.state}</div></button>})}</div><Card tone={matter.tone} style={{ padding: 18 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}><div><Label>{matter.scope}</Label><h3 style={{ margin: "6px 0 0", color: "#102c5c", fontSize: 22, letterSpacing: "-.025em" }}>{matter.title}</h3></div><Badge tone={matter.tone}>{matter.tone === "risk" ? "DECISION REQUIRED" : "ATTENTION"}</Badge></div><div style={{ marginTop: 18, display: "grid", gap: 14 }}><div><Label>Why now</Label><p style={{ margin: "5px 0 0", color: "#55677f", fontSize: 11, lineHeight: 1.55 }}>{matter.why}</p></div><div><Label>Recommendation</Label><p style={{ margin: "5px 0 0", color: "#102c5c", fontSize: 13, lineHeight: 1.5, fontWeight: 750 }}>{matter.recommendation}</p></div><div><Label>Next action</Label><p style={{ margin: "5px 0 0", color: "#55677f", fontSize: 11, lineHeight: 1.55 }}>{matter.next}</p></div><div style={{ paddingTop: 10, borderTop: "1px solid #e5eaf0" }}><Label>Evidence</Label><div style={{ marginTop: 5, color: "#718096", fontSize: 10 }}>{matter.evidence}</div></div></div></Card></div></section>}

      {tab === "company" && <section style={{ marginTop: 22 }}><Label>Company</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 29, letterSpacing: "-.035em" }}>Company position</h2><p style={{ margin: 0, color: "#6b7b90", fontSize: 12 }}>One compact view of the parallel company tracks.</p><div style={{ display: "grid", gap: 9, marginTop: 16 }}>{tracks.map(([name,status,tone]) => <Card key={name} tone={tone} style={{ padding: 14, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}><div><div style={{ color: "#102c5c", fontSize: 13, fontWeight: 850 }}>{name}</div><div style={{ marginTop: 3, color: "#718096", fontSize: 10 }}>{status}</div></div><button onClick={() => openMatter(name === "Biology" ? "biology" : name === "Commercial" ? "commercial" : name === "BIRAC" ? "birac" : "technical")} style={{ border: "1px solid #dbe3ee", borderRadius: 9, background: "#fff", color: "#075bc4", padding: "7px 9px", fontSize: 9, fontWeight: 850, cursor: "pointer" }}>Open →</button></Card>)}</div></section>}

      {tab === "evidence" && <section style={{ marginTop: 22 }}><Label>Evidence</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 29, letterSpacing: "-.035em" }}>What must be proven</h2><p style={{ margin: 0, color: "#6b7b90", fontSize: 12 }}>The existing validation ladder stays intact. It is evidence, not the company operating system.</p><div className="gateGrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 9, marginTop: 16 }}>{gates.map(([id,title,status,tone]) => <Card key={id} tone={tone} style={{ padding: 14 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><Label>{id}</Label><Badge tone={tone}>{status}</Badge></div><div style={{ marginTop: 10, color: "#102c5c", fontSize: 12, fontWeight: 850 }}>{title}</div></Card>)}</div><Card style={{ marginTop: 12 }}><Label>Evidence rule</Label><p style={{ margin: "7px 0 0", color: "#5f7087", fontSize: 11, lineHeight: 1.55 }}>Implementation evidence does not equal physical validation. Synthetic runtime does not equal biological validation. Market research does not equal customer validation.</p><a href={pmoStateUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, color: "#075bc4", fontSize: 10, fontWeight: 850 }}>Open PMO source →</a></Card></section>}

      {tab === "lenses" && <section style={{ marginTop: 22 }}><Label>Seven perspectives</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 29, letterSpacing: "-.035em" }}>Look at the same matter from every side</h2><p style={{ margin: 0, color: "#6b7b90", fontSize: 12 }}>One matter. One recommendation. Different questions.</p><div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "13px 0 4px" }}>{matters.map((item) => <button key={item.id} onClick={() => setMatterId(item.id)} style={{ flex: "0 0 auto", border: item.id === matter.id ? "1px solid #102c5c" : "1px solid #dbe3ee", borderRadius: 999, background: item.id === matter.id ? "#102c5c" : "#fff", color: item.id === matter.id ? "#fff" : "#52627a", padding: "8px 11px", fontSize: 9, fontWeight: 850, cursor: "pointer" }}>{item.scope}</button>)}</div><Card tone={matter.tone} style={{ marginTop: 10 }}><Label>Selected matter</Label><h3 style={{ margin: "6px 0 0", color: "#102c5c", fontSize: 20 }}>{matter.title}</h3><div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "14px 0 5px" }}>{perspectives.map((item) => <button key={item} onClick={() => setLens(item)} style={{ flex: "0 0 auto", border: lens === item ? "1px solid #075bc4" : "1px solid #dbe3ee", borderRadius: 9, background: lens === item ? "#edf5ff" : "#fff", color: lens === item ? "#075bc4" : "#52627a", padding: "8px 10px", fontSize: 9, fontWeight: 850, cursor: "pointer" }}>{item}</button>)}</div><div style={{ marginTop: 14, padding: 15, borderRadius: 12, background: "#f7f9fc", border: "1px solid #e3e9f0" }}><Label>{lens} perspective</Label><p style={{ margin: "7px 0 0", color: "#263b58", fontSize: 13, lineHeight: 1.6 }}>{matter.lenses[lens]}</p></div><div style={{ marginTop: 15, paddingTop: 13, borderTop: "1px solid #e3e9f0" }}><Label>Recommendation</Label><p style={{ margin: "6px 0 0", color: "#102c5c", fontSize: 13, lineHeight: 1.5, fontWeight: 750 }}>{matter.recommendation}</p><div style={{ marginTop: 11 }}><Label>Next action</Label><div style={{ marginTop: 5, color: "#5f7087", fontSize: 11, lineHeight: 1.5 }}>{matter.next}</div></div></div></Card></section>}
    </div>
  </main>;
}
