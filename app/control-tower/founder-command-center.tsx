"use client";

import { useMemo, useState, type ReactNode } from "react";

type Props = {
  pmoState: string | null;
  processorIssueOpen: boolean | null;
};

type Tone = "good" | "warn" | "risk" | "neutral";
type Tab = "today" | "decisions" | "execution" | "company" | "evidence";
type Perspective = "CEO" | "CTO" | "Scientist" | "Investor" | "Farmer" | "Commercial" | "Competitor";

type Decision = {
  id: string;
  area: string;
  question: string;
  state: string;
  tone: Tone;
  why: string;
  recommendation: string;
  next: string;
  evidence: string;
  options: string[];
  consequence: string;
  perspectives: Record<Perspective, string>;
};

type Track = {
  name: string;
  state: string;
  tone: Tone;
  objective: string;
  constraint: string;
  next: string;
  owner: string;
  evidence: string;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "decisions", label: "Decisions" },
  { id: "execution", label: "Execution" },
  { id: "company", label: "Company" },
  { id: "evidence", label: "Evidence" },
];

const perspectives: Perspective[] = ["CEO", "CTO", "Scientist", "Investor", "Farmer", "Commercial", "Competitor"];

const palette: Record<Tone, { bg: string; border: string; text: string }> = {
  good: { bg: "#eefaf5", border: "#b7e5d2", text: "#087f5b" },
  warn: { bg: "#fff9ed", border: "#ead49a", text: "#8a6100" },
  risk: { bg: "#fff4f3", border: "#efc5c0", text: "#b42318" },
  neutral: { bg: "#f6f8fb", border: "#dbe3ee", text: "#52627a" },
};

const gates = [
  ["G0", "Architecture / control plane", "ACTIVE", "good"],
  ["G1", "Synthetic / no-crab evidence", "IMPLEMENTED · NOT VALIDATED", "warn"],
  ["G2", "Biological lab integration", "CURRENT GATE · NOT CLEARED", "risk"],
  ["G3", "Field / pilot readiness", "NOT CLEARED", "risk"],
  ["G4", "600-box biological validation", "NOT CLEARED", "risk"],
  ["G5", "Commercial / customer validation", "NOT CLEARED", "risk"],
  ["G6", "Scale / repeatability capital", "TARGET", "neutral"],
] as const;

function has(value: string, ...terms: string[]) {
  const text = value.toLowerCase();
  return terms.every((term) => text.includes(term.toLowerCase()));
}

function section(markdown: string | null, heading: string) {
  if (!markdown) return "";
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return "";
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, "");
  const end = body.search(/\r?\n## /);
  return (end >= 0 ? body.slice(0, end) : body)
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .trim();
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  const c = palette[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${c.border}`, borderRadius: 999, padding: "5px 8px", background: c.bg, color: c.text, fontSize: 9, fontWeight: 850, letterSpacing: ".06em", whiteSpace: "nowrap" }}>{children}</span>;
}

function Label({ children }: { children: ReactNode }) {
  return <div style={{ color: "#7a889a", fontSize: 9, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>{children}</div>;
}

function Panel({ children, tone = "neutral", style = {} }: { children: ReactNode; tone?: Tone; style?: React.CSSProperties }) {
  const c = palette[tone];
  return <section style={{ background: "#fff", border: `1px solid ${c.border}`, borderRadius: 16, padding: 15, ...style }}>{children}</section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div><Label>{label}</Label><div style={{ marginTop: 4, color: "#173153", fontSize: 12, lineHeight: 1.45 }}>{children}</div></div>;
}

export default function FounderCommandCenter({ pmoState, processorIssueOpen }: Props) {
  const state = pmoState ?? "";
  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const physicalPending = has(state, "physical", "validation", "pending");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;
  const stateDate = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "current PMO snapshot";
  const strategic = section(pmoState, "Current strategic position") || "Current company position is read from the authoritative PMO snapshot.";
  const executionPosture = section(pmoState, "Current execution posture") || "The PMO snapshot does not expose a more specific execution posture.";

  const decisions = useMemo<Decision[]>(() => [
    {
      id: "biology-owner", area: "BIOLOGY", question: "Who is the accountable scientific validation owner?", state: biologyRisk ? "NEEDS FOUNDER DECISION" : "OWNER NOT EXPOSED", tone: biologyRisk ? "risk" : "neutral",
      why: "Biological gates cannot advance responsibly without accountable scientific ownership.",
      recommendation: "Assign one accountable scientific validation owner before biological advancement.",
      next: "Resolve ownership, then freeze protocol, endpoints, controls and deviation rules.",
      evidence: "PMO CURRENT_STATE.md · Biological validation rule",
      options: ["Founder retains scientific accountability", "Assign an external / institutional scientific owner", "Assign an internal scientific owner"],
      consequence: "Without an owner, biological advancement remains governance- and evidence-constrained.",
      perspectives: {
        CEO: "This is an accountability decision, not another software task.",
        CTO: "Do not encode biological policy until the scientific protocol is authoritative.",
        Scientist: "The owner must control protocol, endpoints, controls, acceptance and deviations.",
        Investor: "Unowned biological validation is a material execution risk.",
        Farmer: "The protocol must survive real husbandry constraints, not only lab assumptions.",
        Commercial: "Customer promises should follow measured biological performance.",
        Competitor: "Controlled, attributable evidence is more defensible than speed without proof.",
      },
    },
    {
      id: "physical", area: "TECHNOLOGY", question: "Is the physical validation path ready to execute?", state: physicalPending ? "TRACK CONSTRAINT" : "NO BLOCKER EXPOSED", tone: physicalPending ? "warn" : "good",
      why: "The existing technical path is procurement → AquaOS truth → lab start → first technical data.",
      recommendation: "Finish the existing integration path before adding new capability.",
      next: "Execute the governed technical path and capture reconstructable evidence.",
      evidence: "PMO CURRENT_STATE.md · Phase 2 gate · VAL-007",
      options: ["Continue the existing validation path", "Change architecture", "Add new capability"],
      consequence: "Changing architecture before validation increases scope without retiring the current technical uncertainty.",
      perspectives: {
        CEO: "Protect focus; prove the existing system before expanding the product surface.",
        CTO: "Prove sense → command → actuation → acknowledgement/outcome before changing architecture.",
        Scientist: "Technical evidence remains separate from biological evidence.",
        Investor: "This is a concrete risk-retirement step, not business proof.",
        Farmer: "The loop must eventually be reliable, understandable and maintainable on-farm.",
        Commercial: "Do not sell integration as production proof.",
        Competitor: "A proven physical + digital operating loop is more valuable than another dashboard.",
      },
    },
    {
      id: "birac", area: "BIRAC", question: "Can the M0 release be treated as received cash?", state: biracPending ? "EVIDENCE REQUIRED" : "NO UNRESOLVED CONDITION EXPOSED", tone: biracPending ? "warn" : "good",
      why: "The PMO requires primary receipt evidence before treating the ₹20L as received.",
      recommendation: "Keep the funding status evidence-led until primary receipt evidence is reconciled.",
      next: "Reconcile bank / receipt evidence and archive the signed supporting records.",
      evidence: "PMO funding boundary · BIRAC/IHMS milestone record",
      options: ["Treat as received now", "Keep unreconciled until primary evidence arrives"],
      consequence: "Prematurely treating the release as cash can distort capital and runway decisions.",
      perspectives: {
        CEO: "Know whether cash actually arrived before allocating it.",
        CTO: "Keep funded work inside approved scope and evidence boundaries.",
        Scientist: "Funding evidence does not establish biological validation.",
        Investor: "Clean cash evidence improves diligence and prevents inflated runway claims.",
        Farmer: "Grant status does not establish farm performance.",
        Commercial: "Funding progress is not customer proof.",
        Competitor: "Compete on validated outcomes, not funding optics.",
      },
    },
    {
      id: "commercial", area: "COMMERCIAL", question: "What evidence do we actually have from processor validation?", state: commercialOpen ? "EXTERNAL EVIDENCE OPEN" : "OUTCOME REVIEW", tone: commercialOpen ? "warn" : "neutral",
      why: "Commercial value advances only when evidence moves beyond prospects into requirements, economics and pilot commitment.",
      recommendation: "Continue the existing processor validation track in parallel; do not upgrade prospects into customers prematurely.",
      next: "Capture response → problem → specification → economics → pilot evidence.",
      evidence: "PMO #39 · commercial evidence ladder",
      options: ["Continue validation", "Pause until technical work is complete", "Treat current prospects as traction"],
      consequence: "Stopping early loses external learning; overstating traction corrupts the company evidence boundary.",
      perspectives: {
        CEO: "Spend founder time where external evidence can change a material decision.",
        CTO: "Let evidenced customer requirements change engineering; do not build for imagined demand.",
        Scientist: "Commercial specifications must remain compatible with measurable biological quality.",
        Investor: "A prospect is not traction; look for evidence that survives diligence.",
        Farmer: "Processor requirements must translate into something a farm can repeatedly produce.",
        Commercial: "Advance only as evidence moves through the actual validation ladder.",
        Competitor: "Real processor evidence is stronger than an imagined market narrative.",
      },
    },
  ], [biologyRisk, biracPending, commercialOpen, physicalPending]);

  const tracks: Track[] = [
    { name: "Technology", state: physicalPending ? "Integration dependency" : "On track", tone: physicalPending ? "warn" : "good", objective: "Technology integration → controlled validation.", constraint: physicalPending ? "Verified physical/runtime integration remains pending." : "No current PMO constraint exposed.", next: "Execute the governed technical closed-loop path.", owner: "Engineering / PMO", evidence: "PMO current state" },
    { name: "Biology", state: biologyRisk ? "Owner required" : "Gate constrained", tone: "risk", objective: "Establish controlled biological validation.", constraint: biologyRisk ? "Scientific validation owner is TBD." : "Biological gate remains uncleared.", next: "Assign accountable scientific owner and freeze protocol before biological advancement.", owner: biologyRisk ? "Founder decision required" : "PMO", evidence: "Biological validation rule" },
    { name: "Commercial", state: commercialOpen ? "Validation open" : "Outcome review", tone: commercialOpen ? "warn" : "neutral", objective: "Validate processor demand and economic fit.", constraint: commercialOpen ? "External evidence remains open; no customer commitment is implied." : "Processor issue is closed; outcome still needs review.", next: "Continue response → specification → economics → pilot evidence.", owner: "Commercial / Founder", evidence: "PMO #39" },
    { name: "BIRAC", state: biracPending ? "Receipt evidence gap" : "Current", tone: biracPending ? "warn" : "good", objective: "Execute approved milestones with traceable evidence.", constraint: biracPending ? "M0 receipt is not evidenced as received cash." : "No current funding constraint exposed.", next: "Reconcile primary receipt and supporting records.", owner: "Founder / Finance", evidence: "PMO funding boundary" },
    { name: "IP", state: "Governed", tone: "neutral", objective: "Protect differentiated technical claims.", constraint: "No live filing blocker is exposed by the current PMO snapshot.", next: "Use existing IP records; do not optimize for patent count.", owner: "Founder / Counsel", evidence: "PMO source hierarchy" },
    { name: "Economics", state: "Needs proof", tone: "risk", objective: "Retire production-cost and contribution uncertainty.", constraint: "Working model outputs remain unverified until actual inputs are reconciled.", next: "Measure the inputs that determine contribution/kg.", owner: "Founder / Finance / Operations", evidence: "PMO financial posture" },
    { name: "Capital", state: "Evidence-led", tone: "warn", objective: "Fund risk retirement, then commercial repeatability.", constraint: "Scale capital remains dependent on evidence maturity.", next: "Retire current validation risk before scaling capital claims.", owner: "Founder", evidence: "Capital sequencing principle" },
    { name: "Corporate", state: "No blocker exposed", tone: "neutral", objective: "Maintain compliant company records.", constraint: "No current corporate blocker is surfaced in the PMO snapshot.", next: "Keep diligence and compliance evidence current.", owner: "Founder / Finance / Counsel", evidence: "PMO state" },
    { name: "Operations", state: "Readying", tone: "warn", objective: "Prepare ground/lab execution without confusing readiness with validation.", constraint: "Lab start depends on procurement, AquaOS truth and physical readiness.", next: "Follow the governed procurement → lab start sequence.", owner: "Ground / Engineering", evidence: "Critical path" },
    { name: "PMO", state: "Authoritative", tone: "good", objective: "Keep company execution governed by current evidence.", constraint: "No new control artifact unless programme reality changes.", next: "Use current state to select existing governed work.", owner: "PMO", evidence: "CURRENT_STATE.md" },
  ];

  const [tab, setTab] = useState<Tab>("today");
  const [decisionId, setDecisionId] = useState("biology-owner");
  const [perspective, setPerspective] = useState<Perspective>("CEO");
  const decision = decisions.find((item) => item.id === decisionId) ?? decisions[0];
  const blockers = decisions.filter((item) => item.tone === "risk" || item.tone === "warn");

  const openDecision = (id: string) => {
    setDecisionId(id);
    setPerspective("CEO");
    setTab("decisions");
  };

  return <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#14243c", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
    <style>{`*{box-sizing:border-box}button{font:inherit}@media(max-width:760px){.page{padding:14px 12px 42px!important}.summaryGrid{grid-template-columns:1fr 1fr!important}.decisionLayout,.executionLayout{grid-template-columns:1fr!important}.companyGrid{grid-template-columns:1fr!important}.gateGrid{grid-template-columns:1fr!important}.perspectiveGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.tabs{overflow-x:auto!important}.tab{min-width:92px!important}.headline{font-size:29px!important}}`}</style>
    <div className="page" style={{ maxWidth: 1080, margin: "0 auto", padding: "22px 18px 60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "1px solid #dde5ee" }}>
        <div><div style={{ color: "#7a889a", fontSize: 9, fontWeight: 900, letterSpacing: ".15em" }}>CRABIONICS · FOUNDER OPERATING TERMINAL</div><h1 className="headline" style={{ margin: "5px 0 0", color: "#102c5c", fontSize: 38, lineHeight: 1, letterSpacing: "-.04em" }}>Control Tower</h1></div>
        <div style={{ textAlign: "right" }}><Badge tone={pmoState ? "good" : "risk"}>{pmoState ? "LIVE · PMO STATE" : "PMO UNAVAILABLE"}</Badge><div style={{ marginTop: 5, color: "#8c99aa", fontSize: 9 }}>{stateDate}</div></div>
      </header>

      <nav className="tabs" aria-label="Founder operating sections" style={{ display: "flex", gap: 5, marginTop: 14, padding: 5, background: "#e9eef4", borderRadius: 13 }}>
        {tabs.map((item) => { const active = tab === item.id; return <button className="tab" key={item.id} onClick={() => setTab(item.id)} style={{ flex: 1, border: active ? "1px solid #d8e1ec" : "1px solid transparent", borderRadius: 10, padding: "10px 12px", background: active ? "#fff" : "transparent", color: active ? "#102c5c" : "#65748a", fontSize: 12, fontWeight: 850, cursor: "pointer", boxShadow: active ? "0 1px 3px rgba(16,44,92,.08)" : "none" }}>{item.label}</button>; })}
      </nav>

      {tab === "today" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Today</Label><h2 className="headline" style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What matters right now</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>The few things that can change the company position.</p></div>
        <Panel tone="warn"><Label>Company position</Label><div style={{ marginTop: 6, color: "#102c5c", fontSize: 21, fontWeight: 900, letterSpacing: "-.025em" }}>H1 · Lab / IP / technical validation</div><p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>{strategic}</p></Panel>
        <div className="summaryGrid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 9 }}>
          <Panel tone={biologyRisk ? "risk" : "neutral"}><Field label="DECIDE NOW">{biologyRisk ? "Scientific owner" : "No explicit decision"}</Field></Panel>
          <Panel tone={physicalPending ? "warn" : "good"}><Field label="BLOCKED / CONSTRAINED">{physicalPending ? "Physical validation" : "No constraint exposed"}</Field></Panel>
          <Panel tone={commercialOpen ? "warn" : "neutral"}><Field label="WAITING ON OTHERS">{commercialOpen ? "Processor evidence" : "Nothing exposed"}</Field></Panel>
          <Panel tone="good"><Field label="EXECUTE NOW">Existing governed work</Field></Panel>
        </div>
        <div className="decisionLayout" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)", gap: 12 }}>
          <Panel tone={blockers[0]?.tone ?? "neutral"}><Label>Founder action queue</Label><div style={{ display: "grid", gap: 7, marginTop: 9 }}>{blockers.map((item) => <button key={item.id} onClick={() => openDecision(item.id)} style={{ textAlign: "left", border: `1px solid ${palette[item.tone].border}`, background: "#fff", borderRadius: 12, padding: "11px 12px", cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><strong style={{ color: "#102c5c", fontSize: 12 }}>{item.question}</strong><Badge tone={item.tone}>{item.state}</Badge></div><div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>{item.recommendation}</div></button>)}</div></Panel>
          <Panel><Label>Critical path</Label><div style={{ marginTop: 9, display: "grid", gap: 6 }}>{["Procurement", "AquaOS truth", "Physical validation", "Evidence package", "G2 decision"].map((step, i) => <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 22, height: 22, display: "grid", placeItems: "center", borderRadius: 99, background: i === 0 && physicalPending ? "#fff9ed" : "#eefaf5", color: i === 0 && physicalPending ? "#8a6100" : "#087f5b", fontSize: 10, fontWeight: 900 }}>{i + 1}</span><span style={{ color: "#173153", fontSize: 11, fontWeight: 750 }}>{step}</span></div>)}</div><div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #e4eaf1" }}><Field label="DO NOT">Add new capability without a changed requirement, observed failure or gate linkage.</Field></div></Panel>
        </div>
      </section>}

      {tab === "decisions" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Decision queue</Label><h2 className="headline" style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What needs a judgement?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>One matter at a time. The system explains the decision; the Founder decides.</p></div>
        <div className="decisionLayout" style={{ display: "grid", gridTemplateColumns: "270px minmax(0,1fr)", gap: 12, alignItems: "start" }}>
          <div style={{ display: "grid", gap: 7 }}>{decisions.map((item) => { const active = item.id === decision.id; return <button key={item.id} onClick={() => setDecisionId(item.id)} style={{ textAlign: "left", border: `1px solid ${active ? "#173153" : palette[item.tone].border}`, background: active ? "#fff" : "#fbfdff", borderRadius: 12, padding: 11, cursor: "pointer" }}><div style={{ color: "#102c5c", fontSize: 11, fontWeight: 850 }}>{item.question}</div><div style={{ marginTop: 4, color: "#7a889a", fontSize: 9 }}>{item.area} · {item.state}</div></button>; })}</div>
          <Panel tone={decision.tone}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}><div><Badge tone={decision.tone}>{decision.area}</Badge><h3 style={{ margin: "7px 0 0", color: "#102c5c", fontSize: 22, lineHeight: 1.15, letterSpacing: "-.02em" }}>{decision.question}</h3></div><Badge tone={decision.tone}>{decision.state}</Badge></div>
            <div style={{ display: "grid", gap: 11, marginTop: 16 }}><Field label="WHY NOW">{decision.why}</Field><Field label="RECOMMENDATION">{decision.recommendation}</Field><Field label="OPTIONS"><div style={{ display: "grid", gap: 5 }}>{decision.options.map((option, i) => <div key={option} style={{ padding: "7px 9px", background: "#f7f9fc", borderRadius: 8 }}><b>{String.fromCharCode(65 + i)}.</b> {option}</div>)}</div></Field><Field label="CONSEQUENCE OF WAITING">{decision.consequence}</Field><Field label="NEXT ACTION">{decision.next}</Field><Field label="EVIDENCE">{decision.evidence}</Field></div>
            <div style={{ marginTop: 17, paddingTop: 13, borderTop: "1px solid #e3e9f0" }}><Label>Review perspectives</Label><div className="perspectiveGrid" style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>{perspectives.map((item) => <button key={item} onClick={() => setPerspective(item)} style={{ border: `1px solid ${perspective === item ? "#173153" : "#dbe3ee"}`, borderRadius: 8, padding: "6px 8px", background: perspective === item ? "#eef3f9" : "#fff", color: "#173153", fontSize: 10, fontWeight: 850, cursor: "pointer" }}>{item}</button>)}</div><div style={{ marginTop: 9, padding: 11, background: "#f7f9fc", borderRadius: 10, color: "#40536c", fontSize: 11, lineHeight: 1.5 }}><b style={{ color: "#102c5c" }}>{perspective}</b> — {decision.perspectives[perspective]}</div></div>
          </Panel>
        </div>
      </section>}

      {tab === "execution" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Execution</Label><h2 className="headline" style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What is actually moving?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>Execution is separate from decisions and evidence. No activity feed.</p></div>
        <Panel tone="warn"><Label>Current execution posture</Label><div style={{ marginTop: 7, color: "#173153", fontSize: 13, lineHeight: 1.5 }}>{executionPosture}</div></Panel>
        <div className="executionLayout" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,.8fr)", gap: 12 }}>
          <Panel><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><Label>Primary governed execution</Label><Badge tone="warn">TRACK CONSTRAINT</Badge></div><h3 style={{ margin: "7px 0 0", color: "#102c5c", fontSize: 18 }}>Physical validation readiness</h3><div style={{ display: "grid", gap: 10, marginTop: 13 }}><Field label="WORK">Existing technical closed-loop validation path.</Field><Field label="SEQUENCE">Procurement → AquaOS truth → lab start → first technical data.</Field><Field label="OWNER">Engineering / PMO</Field><Field label="DEPENDENCY">Physical integration and runtime verification.</Field><Field label="EVIDENCE">PMO CURRENT_STATE.md · VAL-007</Field><Field label="WHEN DONE">Supports the next gate review; does not by itself establish biological or commercial proof.</Field></div></Panel>
          <Panel><Label>Parallel execution</Label><div style={{ display: "grid", gap: 8, marginTop: 9 }}>{tracks.filter((track) => ["Biology", "Commercial", "BIRAC", "IP"].includes(track.name)).map((track) => <button key={track.name} onClick={() => track.name === "Biology" ? openDecision("biology-owner") : track.name === "Commercial" ? openDecision("commercial") : track.name === "BIRAC" ? openDecision("birac") : undefined} style={{ textAlign: "left", border: `1px solid ${palette[track.tone].border}`, background: "#fff", borderRadius: 10, padding: 10, cursor: track.name === "IP" ? "default" : "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><strong style={{ color: "#173153", fontSize: 11 }}>{track.name}</strong><Badge tone={track.tone}>{track.state}</Badge></div><div style={{ marginTop: 4, color: "#6b7b90", fontSize: 10 }}>{track.next}</div></button>)}</div></Panel>
        </div>
      </section>}

      {tab === "company" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Company</Label><h2 className="headline" style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>Where does the company stand?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>Parallel tracks, one company state. A track constraint is not automatically a company-wide blocker.</p></div>
        <div className="companyGrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 9 }}>{tracks.map((track) => <article key={track.name} style={{ border: `1px solid ${palette[track.tone].border}`, borderRadius: 14, padding: 13, background: "#fff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><strong style={{ color: "#102c5c", fontSize: 13 }}>{track.name}</strong><Badge tone={track.tone}>{track.state}</Badge></div><div style={{ display: "grid", gap: 8, marginTop: 11 }}><Field label="OBJECTIVE">{track.objective}</Field><Field label="CONSTRAINT">{track.constraint}</Field><Field label="NEXT">{track.next}</Field><div style={{ color: "#7a889a", fontSize: 10 }}>Owner: {track.owner} · Evidence: {track.evidence}</div></div></article>)}</div>
      </section>}

      {tab === "evidence" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Evidence</Label><h2 className="headline" style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What is actually proven?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>The validation ladder stays authoritative. This view makes its boundary usable.</p></div>
        <div className="gateGrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 9 }}>{gates.map(([id, title, status, tone]) => <article key={id} style={{ border: `1px solid ${palette[tone].border}`, borderRadius: 14, padding: 13, background: "#fff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><span style={{ color: "#7a889a", fontSize: 9, fontWeight: 900 }}>{id}</span><Badge tone={tone}>{status}</Badge></div><div style={{ marginTop: 10, color: "#173153", fontSize: 12, fontWeight: 800 }}>{title}</div></article>)}</div>
        <Panel><Label>Evidence boundary</Label><div style={{ display: "grid", gap: 8, marginTop: 9 }}><Field label="IMPLEMENTATION">Code and architecture can establish implementation evidence.</Field><Field label="PHYSICAL">They do not establish physical integration or biological validation.</Field><Field label="COMMERCIAL">Market research and prospects do not equal customer validation.</Field><Field label="SOURCE">PMO CURRENT_STATE.md remains the authoritative current-state snapshot.</Field></div></Panel>
      </section>}
    </div>
  </main>;
}
