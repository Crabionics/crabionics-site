"use client";

import { useMemo, useState, type ReactNode } from "react";

type Props = { pmoState: string | null; processorIssueOpen: boolean | null };
type Tone = "good" | "warn" | "risk" | "neutral";
type Tab = "today" | "decisions" | "execution" | "company" | "evidence";
type Perspective = "CEO" | "CTO" | "Scientist" | "Investor" | "Farmer" | "Commercial" | "Competitor";

type Decision = {
  id: string; area: string; question: string; state: string; tone: Tone;
  why: string; recommendation: string; next: string; evidence: string;
  options: string[]; consequence: string; perspectives: Record<Perspective, string>;
};

type Track = { name: string; state: string; tone: Tone; objective: string; constraint: string; next: string; owner: string; evidence: string };

const tabs: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" }, { id: "decisions", label: "Decisions" },
  { id: "execution", label: "Execution" }, { id: "company", label: "Company" }, { id: "evidence", label: "Evidence" },
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

function has(value: string, ...terms: string[]) { const text = value.toLowerCase(); return terms.every((term) => text.includes(term.toLowerCase())); }
function section(markdown: string | null, heading: string) {
  if (!markdown) return "";
  const start = markdown.indexOf(`## ${heading}`); if (start < 0) return "";
  const body = markdown.slice(start + heading.length + 3).replace(/^\r?\n/, "");
  const end = body.search(/\r?\n## /);
  return (end >= 0 ? body.slice(0, end) : body).replace(/\*\*/g, "").replace(/`/g, "").replace(/^[-*]\s+/gm, "").replace(/\n{2,}/g, " ").trim();
}
function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) { const c = palette[tone]; return <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${c.border}`, borderRadius: 999, padding: "5px 8px", background: c.bg, color: c.text, fontSize: 9, fontWeight: 850, letterSpacing: ".06em", whiteSpace: "nowrap" }}>{children}</span>; }
function Label({ children }: { children: ReactNode }) { return <div style={{ color: "#7a889a", fontSize: 9, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>{children}</div>; }
function Panel({ children, tone = "neutral", style = {} }: { children: ReactNode; tone?: Tone; style?: React.CSSProperties }) { const c = palette[tone]; return <section style={{ background: "#fff", border: `1px solid ${c.border}`, borderRadius: 16, padding: 15, ...style }}>{children}</section>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <div><Label>{label}</Label><div style={{ marginTop: 4, color: "#173153", fontSize: 12, lineHeight: 1.45 }}>{children}</div></div>; }

export default function FounderCommandCenterV6({ pmoState, processorIssueOpen }: Props) {
  const state = pmoState ?? "";
  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const physicalPending = has(state, "physical", "validation", "pending");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;
  const stateDate = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "current PMO snapshot";
  const strategic = section(pmoState, "Current strategic position") || "Current company position is read from the authoritative PMO snapshot.";
  const executionPosture = section(pmoState, "Current execution posture") || "The PMO snapshot does not expose a more specific execution posture.";

  const decisions = useMemo<Decision[]>(() => [
    { id: "biology", area: "BIOLOGY", question: "Who is the accountable scientific validation owner?", state: biologyRisk ? "NEEDS FOUNDER DECISION" : "OWNER NOT EXPOSED", tone: biologyRisk ? "risk" : "neutral", why: "Biological gates cannot advance responsibly without accountable scientific ownership.", recommendation: "Assign one accountable scientific validation owner before biological advancement.", next: "Resolve ownership, then freeze protocol, endpoints, controls and deviation rules.", evidence: "PMO CURRENT_STATE.md · Biological validation rule", options: ["Founder retains accountability", "External / institutional owner", "Internal scientific owner"], consequence: "Without an owner, biological advancement remains evidence-constrained.", perspectives: { CEO: "This is an accountability decision, not another software task.", CTO: "Do not encode biological policy until the scientific protocol is authoritative.", Scientist: "The owner controls protocol, endpoints, controls, acceptance and deviations.", Investor: "Unowned biological validation is a material execution risk.", Farmer: "The protocol must survive real husbandry constraints.", Commercial: "Customer promises should follow measured biological performance.", Competitor: "Controlled evidence is more defensible than speed without proof." } },
    { id: "physical", area: "TECHNOLOGY", question: "Is the physical validation path ready to execute?", state: physicalPending ? "TRACK CONSTRAINT" : "NO BLOCKER EXPOSED", tone: physicalPending ? "warn" : "good", why: "The existing path is procurement → AquaOS truth → lab start → first technical data.", recommendation: "Finish the existing integration path before adding new capability.", next: "Execute the governed technical path and capture reconstructable evidence.", evidence: "PMO CURRENT_STATE.md · Phase 2 gate · VAL-007", options: ["Continue validation", "Change architecture", "Add capability"], consequence: "Changing architecture before validation increases scope without retiring current uncertainty.", perspectives: { CEO: "Protect focus; prove the existing system first.", CTO: "Prove sense → command → actuation → acknowledgement/outcome.", Scientist: "Technical evidence remains separate from biological evidence.", Investor: "This is risk retirement, not business proof.", Farmer: "The loop must become reliable and maintainable on-farm.", Commercial: "Do not sell integration as production proof.", Competitor: "A proven operating loop is stronger than another dashboard." } },
    { id: "birac", area: "BIRAC", question: "Can the M0 release be treated as received cash?", state: biracPending ? "EVIDENCE REQUIRED" : "NO UNRESOLVED CONDITION EXPOSED", tone: biracPending ? "warn" : "good", why: "Primary receipt evidence is required before treating the ₹20L as received.", recommendation: "Keep funding status evidence-led until receipt evidence is reconciled.", next: "Reconcile bank / receipt evidence and supporting records.", evidence: "PMO funding boundary · BIRAC/IHMS milestone record", options: ["Treat as received", "Keep unreconciled"], consequence: "Premature cash treatment can distort runway and capital decisions.", perspectives: { CEO: "Know whether cash actually arrived before allocating it.", CTO: "Keep funded work inside approved scope and evidence boundaries.", Scientist: "Funding evidence does not establish biological validation.", Investor: "Clean cash evidence improves diligence.", Farmer: "Grant status does not establish farm performance.", Commercial: "Funding progress is not customer proof.", Competitor: "Compete on validated outcomes, not funding optics." } },
    { id: "commercial", area: "COMMERCIAL", question: "What evidence do we actually have from processor validation?", state: commercialOpen ? "EXTERNAL EVIDENCE OPEN" : "OUTCOME REVIEW", tone: commercialOpen ? "warn" : "neutral", why: "Commercial value advances when evidence moves beyond prospects into requirements, economics and pilot commitment.", recommendation: "Continue the existing processor validation track without upgrading prospects into customers.", next: "Capture response → problem → specification → economics → pilot evidence.", evidence: "PMO #39 · commercial evidence ladder", options: ["Continue validation", "Pause", "Treat prospects as traction"], consequence: "Stopping early loses learning; overstating traction corrupts the evidence boundary.", perspectives: { CEO: "Spend founder time where external evidence can change a material decision.", CTO: "Let evidenced requirements change engineering.", Scientist: "Commercial specs must remain compatible with measurable biology.", Investor: "A prospect is not traction.", Farmer: "Processor requirements must translate into repeatable farm output.", Commercial: "Advance only as evidence moves through the ladder.", Competitor: "Real processor evidence beats an imagined market narrative." } },
  ], [biologyRisk, physicalPending, biracPending, commercialOpen]);

  const tracks: Track[] = [
    { name: "Technology", state: physicalPending ? "Integration dependency" : "On track", tone: physicalPending ? "warn" : "good", objective: "Integration → controlled validation", constraint: physicalPending ? "Physical/runtime integration remains pending." : "No current constraint exposed.", next: "Execute the governed closed-loop path.", owner: "Engineering / PMO", evidence: "PMO current state" },
    { name: "Biology", state: biologyRisk ? "Owner required" : "Gate constrained", tone: "risk", objective: "Controlled biological validation", constraint: biologyRisk ? "Scientific validation owner is TBD." : "Biological gate remains uncleared.", next: "Assign owner and freeze protocol before advancement.", owner: biologyRisk ? "Founder" : "PMO", evidence: "Biological validation rule" },
    { name: "Commercial", state: commercialOpen ? "Validation open" : "Outcome review", tone: commercialOpen ? "warn" : "neutral", objective: "Processor demand + economic fit", constraint: commercialOpen ? "External evidence remains open." : "Issue closed; outcome needs review.", next: "Response → specification → economics → pilot evidence.", owner: "Commercial / Founder", evidence: "PMO #39" },
    { name: "BIRAC", state: biracPending ? "Receipt evidence gap" : "Current", tone: biracPending ? "warn" : "good", objective: "Traceable milestone execution", constraint: biracPending ? "M0 receipt not evidenced as cash." : "No funding constraint exposed.", next: "Reconcile primary receipt and records.", owner: "Founder / Finance", evidence: "Funding boundary" },
    { name: "IP", state: "Governed", tone: "neutral", objective: "Protect differentiated claims", constraint: "No live filing blocker exposed.", next: "Use existing IP records.", owner: "Founder / Counsel", evidence: "PMO source hierarchy" },
    { name: "Economics", state: "Needs proof", tone: "risk", objective: "Retire cost + contribution uncertainty", constraint: "Model outputs need actual input reconciliation.", next: "Measure contribution/kg drivers.", owner: "Founder / Finance / Operations", evidence: "PMO financial posture" },
    { name: "Capital", state: "Evidence-led", tone: "warn", objective: "Fund risk retirement then repeatability", constraint: "Scale capital depends on evidence maturity.", next: "Retire current validation risk.", owner: "Founder", evidence: "Capital sequencing" },
    { name: "Operations", state: "Readying", tone: "warn", objective: "Prepare execution without confusing readiness with validation", constraint: "Lab start depends on procurement + physical readiness.", next: "Follow procurement → lab start sequence.", owner: "Ground / Engineering", evidence: "Critical path" },
  ];

  const [tab, setTab] = useState<Tab>("today");
  const [decisionId, setDecisionId] = useState("biology");
  const [perspective, setPerspective] = useState<Perspective>("CEO");
  const decision = decisions.find((item) => item.id === decisionId) ?? decisions[0];
  const openDecision = (id: string) => { setDecisionId(id); setPerspective("CEO"); setTab("decisions"); };

  return <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#14243c", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
    <style>{`*{box-sizing:border-box}button{font:inherit}@media(max-width:760px){.page{padding:14px 12px 42px!important}.four{grid-template-columns:1fr 1fr!important}.two{grid-template-columns:1fr!important}.three{grid-template-columns:1fr!important}.tabs{overflow-x:auto!important}.tab{min-width:90px!important}.gate{grid-template-columns:1fr!important}.decisionList{order:2}.decisionMain{order:1}}`}</style>
    <div className="page" style={{ maxWidth: 1080, margin: "0 auto", padding: "22px 18px 60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "1px solid #dde5ee" }}>
        <div><Label>CRABIONICS · FOUNDER OPERATING TERMINAL</Label><h1 style={{ margin: "5px 0 0", color: "#102c5c", fontSize: "clamp(30px,5vw,40px)", lineHeight: 1, letterSpacing: "-.04em" }}>Control Tower</h1></div>
        <div style={{ textAlign: "right" }}><Badge tone={pmoState ? "good" : "risk"}>{pmoState ? "LIVE · PMO STATE" : "PMO UNAVAILABLE"}</Badge><div style={{ marginTop: 5, color: "#8c99aa", fontSize: 9 }}>{stateDate}</div></div>
      </header>
      <nav className="tabs" aria-label="Founder operating sections" style={{ display: "flex", gap: 5, marginTop: 14, padding: 5, background: "#e9eef4", borderRadius: 13 }}>
        {tabs.map((item) => { const active = tab === item.id; return <button className="tab" key={item.id} onClick={() => setTab(item.id)} style={{ flex: 1, border: active ? "1px solid #d8e1ec" : "1px solid transparent", borderRadius: 10, padding: "10px 12px", background: active ? "#fff" : "transparent", color: active ? "#102c5c" : "#65748a", fontSize: 12, fontWeight: 850, cursor: "pointer", boxShadow: active ? "0 1px 3px rgba(16,44,92,.08)" : "none" }}>{item.label}</button>; })}
      </nav>

      {tab === "today" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Today</Label><h2 style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What changes the company position?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>Only decisions, constraints, dependencies and actions that matter now.</p></div>
        <Panel tone="warn"><Label>Current horizon</Label><div style={{ marginTop: 6, color: "#102c5c", fontSize: 22, fontWeight: 900 }}>H1 · Lab / IP / technical validation</div><p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>{strategic}</p></Panel>
        <div className="four" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 9 }}>
          <Panel tone={biologyRisk ? "risk" : "neutral"}><Field label="DECIDE NOW">{biologyRisk ? "Scientific owner" : "No explicit decision"}</Field></Panel>
          <Panel tone={physicalPending ? "warn" : "good"}><Field label="CONSTRAINT">{physicalPending ? "Physical validation" : "No constraint exposed"}</Field></Panel>
          <Panel tone={commercialOpen ? "warn" : "neutral"}><Field label="WAITING ON">{commercialOpen ? "Processor evidence" : "Nothing exposed"}</Field></Panel>
          <Panel tone="good"><Field label="EXECUTE NOW">Existing governed work</Field></Panel>
        </div>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 12 }}>
          <Panel tone="risk"><Label>Founder attention</Label><div style={{ display: "grid", gap: 7, marginTop: 9 }}>{decisions.filter((d) => d.tone !== "neutral").slice(0, 3).map((d) => <button key={d.id} onClick={() => openDecision(d.id)} style={{ textAlign: "left", border: `1px solid ${palette[d.tone].border}`, background: "#fff", borderRadius: 12, padding: 11, cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><strong style={{ color: "#102c5c", fontSize: 12 }}>{d.question}</strong><Badge tone={d.tone}>{d.state}</Badge></div><div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>{d.recommendation}</div></button>)}</div></Panel>
          <Panel><Label>Critical path</Label><div style={{ marginTop: 9, display: "grid", gap: 7 }}>{["Procurement", "AquaOS truth", "Physical validation", "Evidence package", "G2 review"].map((s, i) => <div key={s} style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ width: 22, height: 22, display: "grid", placeItems: "center", borderRadius: 99, background: i === 2 && physicalPending ? "#fff9ed" : "#eefaf5", color: i === 2 && physicalPending ? "#8a6100" : "#087f5b", fontSize: 10, fontWeight: 900 }}>{i + 1}</span><span style={{ color: "#173153", fontSize: 11, fontWeight: 750 }}>{s}</span></div>)}</div><div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #e4eaf1" }}><Field label="DO NOT">Add capability without a changed requirement, observed failure or gate linkage.</Field></div></Panel>
        </div>
      </section>}

      {tab === "decisions" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Decision queue</Label><h2 style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30, letterSpacing: "-.035em" }}>What needs a judgement?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>One matter at a time. The system frames the decision; the Founder decides.</p></div>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "270px minmax(0,1fr)", gap: 12, alignItems: "start" }}>
          <div className="decisionList" style={{ display: "grid", gap: 7 }}>{decisions.map((d) => <button key={d.id} onClick={() => setDecisionId(d.id)} style={{ textAlign: "left", border: `1px solid ${d.id === decision.id ? "#173153" : palette[d.tone].border}`, background: d.id === decision.id ? "#fff" : "#fbfdff", borderRadius: 12, padding: 11, cursor: "pointer" }}><div style={{ color: "#102c5c", fontSize: 11, fontWeight: 850 }}>{d.question}</div><div style={{ marginTop: 4, color: "#7a889a", fontSize: 9 }}>{d.area} · {d.state}</div></button>)}</div>
          <Panel tone={decision.tone} style={{ position: "relative" }}><div className="decisionMain"><div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}><div><Badge tone={decision.tone}>{decision.area}</Badge><h3 style={{ margin: "7px 0 0", color: "#102c5c", fontSize: 22, lineHeight: 1.15 }}>{decision.question}</h3></div><Badge tone={decision.tone}>{decision.state}</Badge></div><div style={{ display: "grid", gap: 11, marginTop: 16 }}><Field label="WHY NOW">{decision.why}</Field><Field label="RECOMMENDATION">{decision.recommendation}</Field><Field label="OPTIONS"><div style={{ display: "grid", gap: 5 }}>{decision.options.map((o, i) => <div key={o} style={{ padding: "7px 9px", background: "#f7f9fc", borderRadius: 8 }}><b>{String.fromCharCode(65 + i)}.</b> {o}</div>)}</div></Field><Field label="CONSEQUENCE OF WAITING">{decision.consequence}</Field><Field label="NEXT ACTION">{decision.next}</Field><Field label="EVIDENCE">{decision.evidence}</Field></div></div><div style={{ marginTop: 17, paddingTop: 13, borderTop: "1px solid #e3e9f0" }}><Label>Seven perspectives — review this decision, not the whole company</Label><div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>{perspectives.map((p) => <button key={p} onClick={() => setPerspective(p)} style={{ border: `1px solid ${perspective === p ? "#173153" : "#dbe3ee"}`, borderRadius: 8, padding: "6px 8px", background: perspective === p ? "#eef3f9" : "#fff", color: "#173153", fontSize: 10, fontWeight: 850, cursor: "pointer" }}>{p}</button>)}</div><div style={{ marginTop: 9, padding: 11, background: "#f7f9fc", borderRadius: 10, color: "#40536c", fontSize: 11, lineHeight: 1.5 }}><b>{perspective}</b> — {decision.perspectives[perspective]}</div></div></Panel>
        </div>
      </section>}

      {tab === "execution" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Execution</Label><h2 style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30 }}>What is actually moving?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>Execution is work with an owner, dependency, completion condition and evidence—not an activity feed.</p></div>
        <Panel tone="warn"><Label>Current execution posture</Label><div style={{ marginTop: 7, color: "#173153", fontSize: 13, lineHeight: 1.5 }}>{executionPosture}</div></Panel>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 12 }}><Panel><Label>Primary governed work</Label><h3 style={{ margin: "7px 0 0", color: "#102c5c", fontSize: 19 }}>Physical validation readiness</h3><div style={{ display: "grid", gap: 10, marginTop: 13 }}><Field label="SEQUENCE">Procurement → AquaOS truth → lab start → first technical data.</Field><Field label="OWNER">Engineering / PMO</Field><Field label="DEPENDENCY">Physical integration + runtime verification.</Field><Field label="EVIDENCE">PMO CURRENT_STATE.md · VAL-007</Field><Field label="DONE WHEN">Supports the next gate review; does not establish biological or commercial proof.</Field></div></Panel><Panel><Label>Parallel work</Label><div style={{ display: "grid", gap: 8, marginTop: 9 }}>{tracks.slice(1, 4).map((t) => <button key={t.name} onClick={() => t.name === "Biology" ? openDecision("biology") : t.name === "Commercial" ? openDecision("commercial") : openDecision("birac")} style={{ textAlign: "left", border: `1px solid ${palette[t.tone].border}`, background: "#fff", borderRadius: 10, padding: 10, cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><strong style={{ color: "#173153", fontSize: 11 }}>{t.name}</strong><Badge tone={t.tone}>{t.state}</Badge></div><div style={{ marginTop: 4, color: "#6b7b90", fontSize: 10 }}>{t.next}</div></button>)}</div></Panel></div>
      </section>}

      {tab === "company" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Company</Label><h2 style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30 }}>Where does the company stand?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>Parallel tracks, one company state. A track constraint is not automatically a company-wide blocker.</p></div>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 9 }}>{tracks.map((t) => <article key={t.name} style={{ border: `1px solid ${palette[t.tone].border}`, borderRadius: 14, padding: 13, background: "#fff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><strong style={{ color: "#102c5c", fontSize: 13 }}>{t.name}</strong><Badge tone={t.tone}>{t.state}</Badge></div><div style={{ display: "grid", gap: 8, marginTop: 11 }}><Field label="OBJECTIVE">{t.objective}</Field><Field label="CONSTRAINT">{t.constraint}</Field><Field label="NEXT">{t.next}</Field><div style={{ color: "#7a889a", fontSize: 10 }}>Owner: {t.owner} · Evidence: {t.evidence}</div></div></article>)}</div>
      </section>}

      {tab === "evidence" && <section style={{ display: "grid", gap: 14, marginTop: 20 }}>
        <div><Label>Evidence control</Label><h2 style={{ margin: "4px 0 0", color: "#102c5c", fontSize: 30 }}>What is proven, what is not?</h2><p style={{ margin: "5px 0 0", color: "#6b7b90", fontSize: 12 }}>This is a proof boundary, not a progress dashboard.</p></div>
        <Panel tone="risk"><div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}><div><Label>CURRENT GATE</Label><h3 style={{ margin: "6px 0 0", color: "#102c5c", fontSize: 21 }}>G2 · Biological lab integration</h3><p style={{ margin: "5px 0 0", color: "#64748b", fontSize: 12 }}>Current gate is not cleared. Technical implementation evidence must not be promoted into biological proof.</p></div><Badge tone="risk">NOT CLEARED</Badge></div></Panel>
        <div className="three" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 9 }}>
          <Panel tone="good"><Label>PROVEN CLASS</Label><div style={{ marginTop: 6, color: "#102c5c", fontWeight: 850 }}>Architecture / control plane</div><div style={{ marginTop: 5, color: "#64748b", fontSize: 11 }}>G0 is active. Implementation can support governed experiments.</div></Panel>
          <Panel tone="warn"><Label>IMPLEMENTED, NOT PROVEN</Label><div style={{ marginTop: 6, color: "#102c5c", fontWeight: 850 }}>Synthetic / no-crab evidence</div><div style={{ marginTop: 5, color: "#64748b", fontSize: 11 }}>G1 is implemented but not equivalent to physical validation.</div></Panel>
          <Panel tone="risk"><Label>CURRENT GAP</Label><div style={{ marginTop: 6, color: "#102c5c", fontWeight: 850 }}>Physical + biological evidence</div><div style={{ marginTop: 5, color: "#64748b", fontSize: 11 }}>G2 remains the boundary before biological advancement.</div></Panel>
        </div>
        <Panel><Label>Gate ladder</Label><div className="gate" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8, marginTop: 9 }}>{gates.map(([id, title, status, tone]) => <article key={id} style={{ border: `1px solid ${palette[tone].border}`, borderRadius: 11, padding: 10, background: "#fff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><strong style={{ color: "#102c5c", fontSize: 11 }}>{id}</strong><Badge tone={tone}>{status}</Badge></div><div style={{ marginTop: 6, color: "#40536c", fontSize: 11 }}>{title}</div></article>)}</div></Panel>
        <div className="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}><Panel tone="warn"><Label>Evidence required next</Label><div style={{ marginTop: 7, display: "grid", gap: 7 }}><Field label="TECHNICAL">Reconstructable physical/runtime integration evidence.</Field><Field label="BIOLOGICAL">Only after the scientific owner, protocol, endpoints, controls and deviations are authoritative.</Field><Field label="SOURCE">PMO CURRENT_STATE.md remains the current-state authority.</Field></div></Panel><Panel><Label>Do not confuse</Label><div style={{ marginTop: 7, display: "grid", gap: 7 }}><Field label="CODE">Implementation evidence ≠ physical integration.</Field><Field label="RUNTIME">Physical integration ≠ biological validation.</Field><Field label="MARKET">Prospects / research ≠ customer validation.</Field></div></Panel></div>
      </section>}
    </div>
  </main>;
}
