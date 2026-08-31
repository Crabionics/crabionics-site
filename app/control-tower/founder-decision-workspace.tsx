"use client";

import { useMemo, useState } from "react";

type Props = { pmoState: string | null; processorIssueOpen: boolean | null; pmoStateUrl: string };
type Tone = "good" | "warn" | "risk" | "neutral";
type Perspective = "CEO" | "CTO" | "Scientist" | "Investor" | "Farmer" | "Commercial" | "Competitor";
type Tab = "today" | "decisions" | "company" | "evidence" | "lenses";

const tabs: { id: Tab; label: string; short: string }[] = [
  { id: "today", label: "Today", short: "NOW" },
  { id: "decisions", label: "Decisions", short: "DECIDE" },
  { id: "company", label: "Company", short: "TRACKS" },
  { id: "evidence", label: "Evidence", short: "PROOF" },
  { id: "lenses", label: "Lenses", short: "VIEW" },
];

const lenses: Perspective[] = ["CEO", "CTO", "Scientist", "Investor", "Farmer", "Commercial", "Competitor"];

const palette: Record<Tone, { bg: string; border: string; text: string }> = {
  good: { bg: "#eefaf5", border: "#b7e5d2", text: "#087f5b" },
  warn: { bg: "#fff9ed", border: "#ead49a", text: "#8a6100" },
  risk: { bg: "#fff4f3", border: "#efc4c0", text: "#b42318" },
  neutral: { bg: "#f6f8fb", border: "#dbe3ee", text: "#52627a" },
};

type Matter = {
  id: string; title: string; state: string; scope: string; why: string; recommendation: string; next: string; evidence: string; tone: Tone;
  lenses: Record<Perspective, string>;
};

function section(markdown: string | null, heading: string) {
  if (!markdown) return null;
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return null;
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, "");
  const next = body.search(/\r?\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}

function clean(text: string) {
  return text.replace(/\*\*/g, "").replace(/`/g, "").replace(/^[-*]\s+/gm, "").replace(/\n{2,}/g, "\n").trim();
}

function has(text: string, ...terms: string[]) {
  const v = text.toLowerCase();
  return terms.every((term) => v.includes(term.toLowerCase()));
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  const c = palette[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${c.border}`, background: c.bg, color: c.text, borderRadius: 999, padding: "5px 9px", fontSize: 10, fontWeight: 900, letterSpacing: ".05em", whiteSpace: "nowrap" }}>{children}</span>;
}

function Card({ children, tone = "neutral", style = {} }: { children: React.ReactNode; tone?: Tone; style?: React.CSSProperties }) {
  const c = palette[tone];
  return <div style={{ border: `1px solid ${c.border}`, borderRadius: 16, background: "#fff", padding: 16, ...style }}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "#718096", fontSize: 9, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>{children}</div>;
}

function ActionRow({ title, text, tone = "neutral" }: { title: string; text: string; tone?: Tone }) {
  return <div style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, alignItems: "start" }}>
    <div style={{ width: 8, height: 8, marginTop: 6, borderRadius: 99, background: palette[tone].text }} />
    <div><div style={{ color: "#102c5c", fontWeight: 850, fontSize: 13 }}>{title}</div><div style={{ marginTop: 3, color: "#68788e", fontSize: 11, lineHeight: 1.5 }}>{text}</div></div>
  </div>;
}

export default function FounderDecisionWorkspace({ pmoState, processorIssueOpen, pmoStateUrl }: Props) {
  const state = pmoState ?? "";
  const strategic = clean(section(pmoState, "Current strategic position") ?? "Current company position unavailable.");
  const date = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "unknown";
  const physicalPending = has(state, "physical", "validation", "pending");
  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;

  const matters = useMemo<Matter[]>(() => [
    {
      id: "technical", title: "Physical closed-loop validation", state: physicalPending ? "Pending physical/runtime evidence" : "No blocker exposed", scope: "Technology", tone: physicalPending ? "warn" : "good",
      why: "The immediate execution sequence is procurement → AquaOS truth → lab start → first technical data. This is technical proof, not biological or commercial proof.",
      recommendation: "Finish the existing integration path before adding new capability.",
      next: "Execute the already-defined technical path and capture reconstructable evidence.",
      evidence: "PMO CURRENT_STATE.md · Phase 2 gate · VAL-007",
      lenses: {
        CEO: "Protect focus. Prove the existing system before expanding the product surface.",
        CTO: "Prove sensor → command → actuation → acknowledgement/outcome. Only change software when the experiment exposes a real failure.",
        Scientist: "Technical proof is not biological proof. Keep biological protocol, controls and ownership separate.",
        Investor: "This retires a concrete technical risk without overstating validation.",
        Farmer: "A lab loop matters only if it becomes reliable, understandable and maintainable on-farm.",
        Commercial: "Do not sell integration as production proof. Convert validated evidence into the pilot proposition later.",
        Competitor: "The moat is a proven physical + digital operating loop, not another dashboard.",
      },
    },
    {
      id: "biology", title: "Scientific validation ownership", state: biologyRisk ? "Founder decision required" : "Owner not exposed", scope: "Biology", tone: biologyRisk ? "risk" : "neutral",
      why: "The PMO says scientific ownership is TBD and requires an accountable owner before biological advancement.",
      recommendation: "Assign one accountable scientific validation owner before biological stocking or G2/G3/G4 advancement.",
      next: "Resolve ownership, then freeze protocol, endpoints, controls and deviation rules.",
      evidence: "PMO CURRENT_STATE.md · Biological validation rule",
      lenses: {
        CEO: "This is a people/accountability decision, not another software task.",
        CTO: "Do not encode biological policy as product truth until the scientific protocol is authoritative.",
        Scientist: "The protocol needs controls, endpoints, survival/acceptance criteria, measurements and deviations.",
        Investor: "Unowned biological validation is a material execution risk because later claims depend on it.",
        Farmer: "The protocol must survive real husbandry constraints, not only laboratory assumptions.",
        Commercial: "Customer promises should wait for measured biological performance against a defined protocol.",
        Competitor: "Clear ownership and controlled evidence strengthen credibility.",
      },
    },
    {
      id: "birac", title: "BIRAC M0 receipt evidence", state: biracPending ? "Receipt not evidenced" : "No unresolved receipt condition exposed", scope: "BIRAC", tone: biracPending ? "warn" : "good",
      why: "The agreement is executed, but the PMO says the actual ₹20L receipt is not yet evidenced.",
      recommendation: "Treat M0 as release-readiness until primary receipt evidence is recorded.",
      next: "Reconcile bank/receipt evidence and archive the final signed/counter-signed agreement.",
      evidence: "PMO funding boundary · BIRAC/IHMS milestone record",
      lenses: {
        CEO: "Know whether the money has actually arrived before treating it as available capital.",
        CTO: "Keep funded work inside the approved IHMS scope and evidence boundary.",
        Scientist: "A funding milestone does not establish biological validation.",
        Investor: "Clean cash evidence improves diligence. Do not inflate available capital.",
        Farmer: "Grant status does not change whether the system works on-farm.",
        Commercial: "Grant progress supports capability development; it is not customer proof.",
        Competitor: "Compete on validated outcomes, not grant optics.",
      },
    },
    {
      id: "commercial", title: "Processor validation", state: commercialOpen ? "External evidence open" : "Issue closed; outcome needs review", scope: "Commercial", tone: commercialOpen ? "warn" : "neutral",
      why: "The existing processor track is open, but an open issue or prospect list is not customer validation.",
      recommendation: "Continue the existing validation track without upgrading prospects into customers prematurely.",
      next: "Capture response → problem → specification → economics → pilot evidence.",
      evidence: "PMO #39 · commercial evidence ladder",
      lenses: {
        CEO: "Founder time is justified when external evidence can change a material company decision.",
        CTO: "Let evidenced customer requirements change engineering; do not build for imagined demand.",
        Scientist: "Commercial specifications must remain compatible with measurable biological quality and repeatability.",
        Investor: "A prospect is not traction. Look for evidence that survives diligence.",
        Farmer: "Processor requirements must translate into something a farm can repeatedly produce.",
        Commercial: "Advance only as evidence moves: contact → response → need → specification → economics → pilot.",
        Competitor: "Real processor evidence is the countermeasure to building for an imagined market.",
      },
    },
  ], [biologyRisk, biracPending, commercialOpen, physicalPending]);

  const [tab, setTab] = useState<Tab>("today");
  const [matterId, setMatterId] = useState("technical");
  const [lens, setLens] = useState<Perspective>("CEO");
  const matter = matters.find((item) => item.id === matterId) ?? matters[0];
  const attention = matters.filter((item) => item.tone === "risk" || item.tone === "warn");

  const selectMatter = (id: string) => { setMatterId(id); setLens("CEO"); setTab("decisions"); };

  return <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#14243c", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "18px 14px 50px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "5px 2px 17px", borderBottom: "1px solid #dce4ee" }}>
        <div><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".16em" }}>CRABIONICS · CONTROL TOWER</div><h1 style={{ margin: "5px 0 0", color: "#102c5c", fontSize: "clamp(25px,5vw,38px)", lineHeight: 1, letterSpacing: "-.035em" }}>Founder OS</h1></div>
        <div style={{ textAlign: "right" }}><Badge tone={pmoState ? "good" : "risk"}>{pmoState ? "PMO LIVE" : "PMO UNAVAILABLE"}</Badge><div style={{ marginTop: 5, color: "#96a3b4", fontSize: 9 }}>Updated {date}</div></div>
      </header>

      <nav aria-label="Founder workspace tabs" style={{ position: "sticky", top: 0, zIndex: 10, margin: "0 -14px", padding: "9px 14px", background: "rgba(245,247,250,.96)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e3e9f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 5, maxWidth: 980, margin: "0 auto" }}>
          {tabs.map((item) => { const active = tab === item.id; return <button key={item.id} onClick={() => setTab(item.id)} style={{ border: active ? "1px solid #102c5c" : "1px solid #dbe3ee", borderRadius: 10, background: active ? "#102c5c" : "#fff", color: active ? "#fff" : "#52627a", padding: "9px 6px", cursor: "pointer", fontSize: 10, fontWeight: 900 }}><span style={{ display: "block", fontSize: 11 }}>{item.label}</span><span style={{ display: "block", marginTop: 2, opacity: .65, fontSize: 8, letterSpacing: ".08em" }}>{item.short}</span></button>; })}
        </div>
      </nav>

      {tab === "today" && <section style={{ display: "grid", gap: 12, marginTop: 18 }}>
        <Card tone="warn" style={{ padding: "17px 16px" }}><Label>Current horizon</Label><h2 style={{ margin: "6px 0 5px", color: "#102c5c", fontSize: "clamp(20px,4vw,28px)", letterSpacing: "-.025em" }}>H1 — lab / IP / technical validation</h2><p style={{ margin: 0, color: "#68788e", fontSize: 12, lineHeight: 1.55 }}>Prove the integrated technology loop and generate evidence for the next gate. Do not call this biological or commercial validation.</p></Card>
        <div><Label>What matters right now</Label><h2 style={{ margin: "4px 0 10px", color: "#102c5c", fontSize: 23, letterSpacing: "-.025em" }}>Four things only</h2><div style={{ display: "grid", gap: 8 }}>{attention.map((item) => <button key={item.id} onClick={() => selectMatter(item.id)} style={{ width: "100%", textAlign: "left", border: `1px solid ${palette[item.tone].border}`, background: "#fff", borderRadius: 14, padding: 13, cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}><div><div style={{ color: "#102c5c", fontSize: 13, fontWeight: 850 }}>{item.title}</div><div style={{ marginTop: 3, color: "#718096", fontSize: 10 }}>{item.scope} · {item.state}</div></div><Badge tone={item.tone}>{item.tone === "risk" ? "DECIDE" : "ATTENTION"}</Badge></div></button>)}</div></div>
        <Card><Label>Execution sequence</Label><div style={{ marginTop: 10, display: "grid", gap: 10 }}><ActionRow title="Execute" text="Procurement → AquaOS truth → lab start → first technical data." tone="warn" /><ActionRow title="Protect" text="Keep technical closed-loop evidence separate from biological validation." tone="risk" /><ActionRow title="Continue in parallel" text="Processor validation remains a separate company track." tone="neutral" /></div></Card>
      </section>}

      {tab === "decisions" && <section style={{ marginTop: 18 }}><Label>Decision queue</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 24, letterSpacing: "-.025em" }}>Choose one matter</h2><p style={{ margin: "0 0 13px", color: "#718096", fontSize: 11 }}>One decision at a time. The detail below changes with your selection.</p><div style={{ display: "grid", gap: 7 }}>{matters.map((item, i) => <button key={item.id} onClick={() => setMatterId(item.id)} style={{ width: "100%", textAlign: "left", border: `1px solid ${item.id === matter.id ? palette[item.tone].border : "#dbe3ee"}`, background: item.id === matter.id ? "#fff" : "#fafbfd", borderRadius: 13, padding: 12, cursor: "pointer" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 23, height: 23, display: "grid", placeItems: "center", borderRadius: 7, background: item.id === matter.id ? "#102c5c" : "#e8edf4", color: item.id === matter.id ? "#fff" : "#64748b", fontSize: 9, fontWeight: 900 }}>{i + 1}</span><div style={{ flex: 1 }}><div style={{ color: "#102c5c", fontSize: 12, fontWeight: 850 }}>{item.title}</div><div style={{ marginTop: 2, color: "#738198", fontSize: 9 }}>{item.state}</div></div><Badge tone={item.tone}>{item.tone === "risk" ? "DECIDE" : item.tone === "warn" ? "ATTENTION" : "WATCH"}</Badge></div></button>)}</div><Card tone={matter.tone} style={{ marginTop: 12 }}><div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}><Badge>{matter.scope.toUpperCase()}</Badge><Badge tone={matter.tone}>{matter.state.toUpperCase()}</Badge></div><h3 style={{ margin: "9px 0 6px", color: "#102c5c", fontSize: 20 }}>{matter.title}</h3><p style={{ margin: 0, color: "#68788e", fontSize: 11.5, lineHeight: 1.55 }}>{matter.why}</p><div style={{ marginTop: 14, display: "grid", gap: 11 }}><ActionRow title="Recommendation" text={matter.recommendation} tone={matter.tone} /><ActionRow title="Next" text={matter.next} tone="good" /><ActionRow title="Evidence" text={matter.evidence} tone="neutral" /></div></Card></section>}

      {tab === "company" && <section style={{ marginTop: 18 }}><Label>Company map</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 24 }}>Parallel tracks, one company</h2><p style={{ margin: "0 0 14px", color: "#718096", fontSize: 11 }}>Track status is separated from the founder decision queue.</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 9 }}>{[["Technology", physicalPending ? "INTEGRATION" : "CURRENT", "warn" as Tone, "Prove the integrated physical + digital loop."],["Biology", biologyRisk ? "OWNER NEEDED" : "GATED", "risk" as Tone, "Controlled biological validation with accountable ownership."],["Commercial", commercialOpen ? "VALIDATING" : "REVIEW", "warn" as Tone, "Processor evidence → need → economics → pilot."],["BIRAC", biracPending ? "RECEIPT EVIDENCE" : "CURRENT", "warn" as Tone, "Execute approved IHMS milestones with traceable evidence."],["IP", "GOVERNED", "neutral" as Tone, "Protect differentiated technical claims."],["Economics", "UNVERIFIED", "risk" as Tone, "Retire production-cost and contribution-margin uncertainty."],["Capital", "EVIDENCE-GATED", "warn" as Tone, "Fund risk retirement before scaling claims."],["Operations", "READYING", "warn" as Tone, "Prepare ground/lab execution without confusing readiness with validation."],["PMO", "AUTHORITATIVE", "good" as Tone, "Use current evidence to select existing work."]].map(([name, status, tone, objective]) => <Card key={name as string} tone={tone as Tone} style={{ padding: 13 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><strong style={{ color: "#102c5c", fontSize: 12 }}>{name}</strong><Badge tone={tone as Tone}>{status}</Badge></div><p style={{ margin: "8px 0 0", color: "#68788e", fontSize: 10.5, lineHeight: 1.5 }}>{objective}</p></Card>)}</div></section>}

      {tab === "evidence" && <section style={{ marginTop: 18 }}><Label>Proof system</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 24 }}>What is proven?</h2><p style={{ margin: "0 0 14px", color: "#718096", fontSize: 11 }}>A compact gate view. Detailed PMO text stays behind the source link.</p><div style={{ display: "grid", gap: 8 }}>{[["G0", "Architecture / control plane", "ACTIVE", "good" as Tone, "Sufficient to execute experiments."],["G1", "Synthetic / no-crab implementation", "IMPLEMENTED · NOT VALIDATED", "warn" as Tone, "Implementation evidence exists; validation remains open."],["G2", "Biological lab integration", "CURRENT GATE · NOT CLEARED", "risk" as Tone, "Do not advance without controlled biological evidence and ownership."],["G3", "Field / pilot readiness", "NOT CLEARED", "risk" as Tone, "Requires evidence that the system is ready beyond the lab."],["G4", "600-box biological validation", "NOT CLEARED", "risk" as Tone, "Requires the defined biological validation evidence."],["G5", "Commercial / customer validation", "NOT CLEARED", "risk" as Tone, "Requires external customer evidence, not prospects."],["G6", "Scale / repeatability capital", "TARGET", "neutral" as Tone, "Downstream of repeatable evidence."]].map(([gate, title, status, tone, note]) => <div key={gate as string} style={{ display: "grid", gridTemplateColumns: "42px 1fr auto", gap: 10, alignItems: "center", border: "1px solid #dbe3ee", borderRadius: 13, background: "#fff", padding: 12 }}><div style={{ color: "#718096", fontSize: 9, fontWeight: 900 }}>{gate}</div><div><div style={{ color: "#102c5c", fontSize: 11.5, fontWeight: 850 }}>{title}</div><div style={{ marginTop: 2, color: "#7a8799", fontSize: 9.5 }}>{note}</div></div><Badge tone={tone as Tone}>{status}</Badge></div>)}</div><Card style={{ marginTop: 12 }}><Label>Source of truth</Label><p style={{ margin: "7px 0 9px", color: "#68788e", fontSize: 10.5, lineHeight: 1.5 }}>Current state is read from the PMO snapshot. This workspace does not convert implementation into biological or commercial proof.</p><a href={pmoStateUrl} target="_blank" rel="noreferrer" style={{ color: "#315c9b", fontSize: 10.5, fontWeight: 850 }}>Open PMO CURRENT_STATE.md ↗</a></Card></section>}

      {tab === "lenses" && <section style={{ marginTop: 18 }}><Label>Decision lenses</Label><h2 style={{ margin: "4px 0 5px", color: "#102c5c", fontSize: 24 }}>Same matter, different view</h2><p style={{ margin: "0 0 12px", color: "#718096", fontSize: 11 }}>Select a matter, then test it from each operating perspective.</p><div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>{matters.map((item) => <button key={item.id} onClick={() => setMatterId(item.id)} style={{ flex: "0 0 auto", border: `1px solid ${item.id === matter.id ? "#102c5c" : "#dbe3ee"}`, background: item.id === matter.id ? "#102c5c" : "#fff", color: item.id === matter.id ? "#fff" : "#52627a", borderRadius: 9, padding: "8px 10px", fontSize: 9.5, fontWeight: 850, cursor: "pointer" }}>{item.title}</button>)}</div><div style={{ display: "flex", gap: 6, overflowX: "auto", marginTop: 9, paddingBottom: 4 }}>{lenses.map((item) => <button key={item} onClick={() => setLens(item)} style={{ flex: "0 0 auto", border: `1px solid ${lens === item ? "#102c5c" : "#dbe3ee"}`, background: lens === item ? "#102c5c" : "#fff", color: lens === item ? "#fff" : "#52627a", borderRadius: 9, padding: "8px 11px", fontSize: 9.5, fontWeight: 900, cursor: "pointer" }}>{item}</button>)}</div><Card style={{ marginTop: 12 }}><div style={{ color: "#315c9b", fontSize: 9, fontWeight: 900, letterSpacing: ".1em" }}>{lens} · {matter.title.toUpperCase()}</div><p style={{ margin: "9px 0 0", color: "#253b59", fontSize: 13, lineHeight: 1.65 }}>{matter.lenses[lens]}</p></Card><Card tone={matter.tone} style={{ marginTop: 9 }}><Label>Founder judgement</Label><p style={{ margin: "7px 0 0", color: "#253b59", fontSize: 11.5, lineHeight: 1.55 }}>{matter.recommendation}</p></Card></section>}

      <footer style={{ marginTop: 30, paddingTop: 15, borderTop: "1px solid #dce4ee", color: "#94a0b1", fontSize: 9, lineHeight: 1.5 }}><div>Founder workspace · PMO remains authoritative.</div><div style={{ marginTop: 3 }}>Implementation evidence ≠ physical validation ≠ biological validation ≠ commercial proof.</div></footer>
    </div>
  </main>;
}
