"use client";

import { useMemo, useState } from "react";

type Props = { pmoState: string | null; processorIssueOpen: boolean | null; pmoStateUrl: string };
type Tone = "good" | "warn" | "risk" | "neutral";
type Perspective = "CEO" | "CTO" | "Scientist" | "Investor" | "Farmer" | "Commercial" | "Competitor";

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
  return text.replace(/\*\*/g, "").replace(/`/g, "").replace(/^[-*]\s+/gm, "").trim();
}

function has(text: string, ...terms: string[]) {
  const v = text.toLowerCase();
  return terms.every((term) => v.includes(term.toLowerCase()));
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  const c = palette[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${c.border}`, background: c.bg, color: c.text, borderRadius: 999, padding: "5px 9px", fontSize: 10, fontWeight: 900, letterSpacing: ".06em" }}>{children}</span>;
}

export default function FounderDecisionWorkspace({ pmoState, processorIssueOpen, pmoStateUrl }: Props) {
  const state = pmoState ?? "";
  const strategic = clean(section(pmoState, "Current strategic position") ?? "Current company position unavailable.");
  const execution = clean(section(pmoState, "Current execution posture") ?? "Current execution posture unavailable.");
  const validation = clean(section(pmoState, "Current validation ladder") ?? "Validation state unavailable.");
  const funding = clean(section(pmoState, "Funding boundary — critical") ?? "Funding state unavailable.");
  const date = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "unknown";
  const physicalPending = has(state, "physical", "validation", "pending");
  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;

  const matters = useMemo<Matter[]>(() => [
    {
      id: "technical", title: "Physical closed-loop validation", state: physicalPending ? "Pending physical/runtime evidence" : "No blocker exposed", scope: "Track-specific", tone: physicalPending ? "warn" : "good",
      why: "The PMO's immediate sequence is procurement → AquaOS truth → lab start → first real technical data. The current technical gate is not biological validation.",
      recommendation: "Finish the existing integration path before adding new capability.",
      next: "Execute the already-defined path to VAL-007 and capture reconstructable evidence.",
      evidence: "PMO CURRENT_STATE.md · Phase 2 gate boundary · VAL-007",
      lenses: {
        CEO: "Protect focus. The company needs proof of the existing system before more product expansion.",
        CTO: "Prove sensor → command → actuation → acknowledgement/outcome. Do not expand AquaOS unless the experiment exposes a real failure.",
        Scientist: "Technical proof is not biological proof. Keep the biological protocol and ownership as a separate gate.",
        Investor: "This retires a concrete technical risk and strengthens the next financing decision without overstating validation.",
        Farmer: "A lab loop matters only if it becomes reliable, understandable and maintainable in farm conditions.",
        Commercial: "Do not sell technical integration as production proof. Use validated evidence later in the pilot proposition.",
        Competitor: "The useful moat is a proven physical + digital operating loop, not another dashboard.",
      },
    },
    {
      id: "biology", title: "Scientific validation ownership", state: biologyRisk ? "Human decision required" : "Owner not exposed", scope: "Dependency", tone: biologyRisk ? "risk" : "neutral",
      why: "The PMO explicitly says the scientific validation owner is TBD and requires accountable ownership before biological advancement.",
      recommendation: "Assign one accountable scientific validation owner before biological stocking or G2/G3/G4 advancement.",
      next: "Resolve ownership, then freeze protocol, endpoints, controls and deviation rules.",
      evidence: "PMO CURRENT_STATE.md · Biological validation rule",
      lenses: {
        CEO: "This is a people/accountability decision, not another software task.",
        CTO: "Do not encode biological policy as product truth until the scientific protocol is authoritative.",
        Scientist: "The protocol must define controls, endpoints, survival/acceptance criteria, measurements and deviations.",
        Investor: "Unowned biological validation is a material execution risk because later business claims depend on it.",
        Farmer: "The protocol must survive real husbandry constraints, not only laboratory assumptions.",
        Commercial: "Customer promises should wait for measured biological performance against a defined protocol.",
        Competitor: "Scientific ambiguity weakens credibility. Clear ownership and controlled evidence are harder to attack.",
      },
    },
    {
      id: "birac", title: "BIRAC M0 receipt evidence", state: biracPending ? "Receipt not evidenced" : "No unresolved receipt condition exposed", scope: "Track-specific", tone: biracPending ? "warn" : "good",
      why: "The agreement is executed, but the PMO says the actual ₹20L receipt is not yet evidenced and the final counter-signed copy remains pending.",
      recommendation: "Treat M0 as release-readiness until primary receipt evidence is recorded.",
      next: "Reconcile bank/receipt evidence and archive the final signed/counter-signed agreement.",
      evidence: "PMO funding boundary — critical · BIRAC/IHMS milestone record",
      lenses: {
        CEO: "Know whether the money has actually arrived before treating it as available capital.",
        CTO: "Keep funded work inside the approved IHMS scope and evidence boundary.",
        Scientist: "A funding milestone does not establish biological validation.",
        Investor: "Clean cash evidence improves diligence. Do not inflate available capital.",
        Farmer: "Grant status does not change whether the system works on-farm.",
        Commercial: "Grant progress supports capability development; it is not customer proof.",
        Competitor: "Do not compete on grant optics. Compete on validated outcomes and repeatability.",
      },
    },
    {
      id: "commercial", title: "Processor validation", state: commercialOpen ? "External evidence still open" : "Issue closed; outcome needs review", scope: "Track-specific", tone: commercialOpen ? "warn" : "neutral",
      why: "The existing processor track is open, but an open issue or prospect list is not customer validation.",
      recommendation: "Continue the existing validation track without upgrading prospects into customers prematurely.",
      next: "Capture response → problem → specification → economics → pilot evidence.",
      evidence: "PMO #39 · commercial evidence ladder",
      lenses: {
        CEO: "Founder time is justified when an external response can change a material company decision.",
        CTO: "Let evidenced customer requirements change engineering; do not build for imagined demand.",
        Scientist: "Commercial specifications must remain compatible with measurable biological quality and repeatability.",
        Investor: "A prospect is not traction. Look for external evidence that survives diligence.",
        Farmer: "Processor requirements must translate into something a farm can repeatedly produce.",
        Commercial: "Advance only when the evidence ladder actually moves: contact → response → need → specification → economics → pilot.",
        Competitor: "The risk is building for an imagined market. Real processor evidence is the countermeasure.",
      },
    },
  ], [biologyRisk, biracPending, commercialOpen, physicalPending]);

  const [matterId, setMatterId] = useState("technical");
  const [lens, setLens] = useState<Perspective>("CEO");
  const matter = matters.find((item) => item.id === matterId) ?? matters[0];

  return <main style={{ minHeight: "100vh", background: "#f5f7fa", color: "#14243c", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 18px 60px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, paddingBottom: 22, borderBottom: "1px solid #dce4ee" }}>
        <div><div style={{ color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".17em" }}>CRABIONICS · CONTROL TOWER</div><h1 style={{ margin: "8px 0 7px", fontSize: "clamp(30px,5vw,50px)", lineHeight: 1, letterSpacing: "-.04em" }}>What should we do?</h1><p style={{ margin: 0, maxWidth: 680, color: "#65758b", fontSize: 14, lineHeight: 1.55 }}>One decision workspace. Pick the matter, look through the seven lenses, then act on the recommendation.</p></div>
        <div style={{ textAlign: "right" }}><Badge tone={pmoState ? "good" : "risk"}>{pmoState ? "PMO LIVE" : "PMO UNAVAILABLE"}</Badge><div style={{ marginTop: 7, color: "#96a3b4", fontSize: 10 }}>Source updated {date}</div></div>
      </header>

      <section style={{ marginTop: 22, display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(250px,.5fr)", gap: 12 }}>
        <div style={{ borderRadius: 18, padding: "20px 22px", background: "#102c5c", color: "white" }}><div style={{ color: "#b8c7dc", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>COMPANY POSITION</div><div style={{ marginTop: 8, fontSize: 19, lineHeight: 1.3, fontWeight: 800 }}>{strategic}</div></div>
        <div style={{ border: "1px solid #dbe3ee", borderRadius: 18, padding: "18px 19px", background: "white" }}><div style={{ color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>FOUNDER FILTER</div><div style={{ marginTop: 9, fontSize: 13, lineHeight: 1.5, fontWeight: 800 }}>If it does not change a decision, risk, dependency, gate, capital or outcome, it does not belong here.</div></div>
      </section>

      <section style={{ marginTop: 27 }}><div style={{ marginBottom: 10, color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>YOUR AGENDA</div><div style={{ display: "grid", gap: 7 }}>{matters.map((item, i) => { const active = item.id === matter.id; const c = palette[item.tone]; return <button key={item.id} onClick={() => { setMatterId(item.id); setLens("CEO"); }} style={{ width: "100%", textAlign: "left", border: `1px solid ${active ? c.border : "#dbe3ee"}`, background: active ? "white" : "#fafbfd", borderRadius: 13, padding: "12px 14px", cursor: "pointer", boxShadow: active ? "0 5px 22px rgba(16,44,92,.06)" : "none" }}><div style={{ display: "flex", alignItems: "center", gap: 11 }}><span style={{ width: 24, height: 24, display: "grid", placeItems: "center", borderRadius: 7, background: active ? "#102c5c" : "#e8edf4", color: active ? "white" : "#64748b", fontSize: 10, fontWeight: 900 }}>{i + 1}</span><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 800, color: "#102c5c" }}>{item.title}</div><div style={{ marginTop: 3, fontSize: 10, color: "#738198" }}>{item.scope} · {item.state}</div></div><Badge tone={item.tone}>{item.tone === "risk" ? "DECIDE" : item.tone === "warn" ? "ATTENTION" : "WATCH"}</Badge></div></button>; })}</div></section>

      <section style={{ marginTop: 16, border: "1px solid #dbe3ee", borderRadius: 20, background: "white", overflow: "hidden" }}>
        <div style={{ padding: "20px 21px", borderBottom: "1px solid #e6ebf2" }}><div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}><Badge>{matter.scope.toUpperCase()}</Badge><Badge tone={matter.tone}>{matter.state.toUpperCase()}</Badge></div><h2 style={{ margin: "9px 0 7px", fontSize: "clamp(21px,3vw,29px)", letterSpacing: "-.025em" }}>{matter.title}</h2><p style={{ margin: 0, maxWidth: 820, color: "#65758b", fontSize: 13, lineHeight: 1.6 }}>{matter.why}</p></div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 330px" }}>
          <div style={{ padding: "19px 21px" }}><div style={{ color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>LOOK AT IT FROM</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 9 }}>{lenses.map((item) => <button key={item} onClick={() => setLens(item)} style={{ border: `1px solid ${lens === item ? "#102c5c" : "#dbe3ee"}`, background: lens === item ? "#102c5c" : "white", color: lens === item ? "white" : "#52627a", borderRadius: 8, padding: "7px 10px", fontSize: 10, fontWeight: 900, cursor: "pointer" }}>{item}</button>)}</div><div style={{ marginTop: 14, padding: "16px", border: "1px solid #e2e8f0", borderRadius: 14, background: "#f8fafc" }}><div style={{ color: "#315c9b", fontSize: 10, fontWeight: 900, letterSpacing: ".08em" }}>{lens} PERSPECTIVE</div><p style={{ margin: "8px 0 0", color: "#253b59", fontSize: 14, lineHeight: 1.65 }}>{matter.lenses[lens]}</p></div></div>
          <aside style={{ padding: "19px 21px", background: "#fbfcfe", borderLeft: "1px solid #e6ebf2" }}><div style={{ color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>RECOMMENDATION</div><div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, lineHeight: 1.5 }}>{matter.recommendation}</div><div style={{ marginTop: 17, color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>NEXT ACTION</div><div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.55 }}>{matter.next}</div><div style={{ marginTop: 17, paddingTop: 13, borderTop: "1px solid #e0e7ef" }}><div style={{ color: "#68788e", fontSize: 10, fontWeight: 900, letterSpacing: ".15em" }}>EVIDENCE</div><div style={{ marginTop: 7, color: "#5f6f84", fontSize: 10, lineHeight: 1.55 }}>{matter.evidence}</div></div></aside>
        </div>
      </section>

      <section style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 9 }}>
        <div style={{ background: "white", border: "1px solid #dbe3ee", borderRadius: 13, padding: 14 }}><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".14em" }}>DO NOT CONFUSE</div><div style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5 }}>Implementation ≠ physical integration ≠ biological validation ≠ commercial proof.</div></div>
        <div style={{ background: "white", border: "1px solid #dbe3ee", borderRadius: 13, padding: 14 }}><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".14em" }}>CURRENT EXECUTION</div><div style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5 }}>{execution}</div></div>
        <div style={{ background: "white", border: "1px solid #dbe3ee", borderRadius: 13, padding: 14 }}><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".14em" }}>SOURCE</div><div style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5 }}><a href={pmoStateUrl} target="_blank" rel="noreferrer" style={{ color: "#315c9b", fontWeight: 800, textDecoration: "none" }}>PMO CURRENT_STATE.md ↗</a><br />Updated {date}</div></div>
      </section>

      <details style={{ marginTop: 14, border: "1px solid #dbe3ee", borderRadius: 13, background: "white", padding: "12px 14px" }}><summary style={{ cursor: "pointer", color: "#315c9b", fontSize: 11, fontWeight: 900 }}>Open underlying validation & funding truth</summary><div style={{ marginTop: 12, display: "grid", gap: 10 }}><div><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".14em" }}>VALIDATION</div><div style={{ marginTop: 5, fontSize: 11, lineHeight: 1.55 }}>{validation}</div></div><div><div style={{ color: "#68788e", fontSize: 9, fontWeight: 900, letterSpacing: ".14em" }}>FUNDING</div><div style={{ marginTop: 5, fontSize: 11, lineHeight: 1.55 }}>{funding}</div></div></div></details>
    </div>
  </main>;
}
