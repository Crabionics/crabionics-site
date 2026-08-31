import type { ReactNode } from "react";

type Props = { pmoState: string | null; processorIssueOpen: boolean | null };
type Tone = "good" | "warn" | "risk" | "neutral";

type Track = {
  name: string;
  status: string;
  tone: Tone;
  objective: string;
  constraint: string;
  next: string;
  owner: string;
  evidence: string;
};

const TRACKS = ["Technology", "Biology", "Commercial", "BIRAC", "IP", "Economics", "Capital", "Corporate", "Operations", "PMO"] as const;

function section(markdown: string | null, heading: string) {
  if (!markdown) return null;
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return null;
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, "");
  const next = body.search(/\r?\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}

function has(state: string, ...terms: string[]) {
  const value = state.toLowerCase();
  return terms.every((term) => value.includes(term.toLowerCase()));
}

function toneClass(tone: Tone) {
  return tone === "good" ? "#087f5b" : tone === "warn" ? "#9a6700" : tone === "risk" ? "#b42318" : "#475569";
}

function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${tone === "risk" ? "#f4b4b0" : tone === "warn" ? "#f4d48a" : tone === "good" ? "#9ae6cf" : "#dbe5ef"}`, borderRadius: 999, padding: "0.3rem 0.55rem", background: tone === "risk" ? "#fff5f5" : tone === "warn" ? "#fffbeb" : tone === "good" ? "#ecfdf5" : "#f8fafc", color: toneClass(tone), fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.04em" }}>{children}</span>;
}

function Panel({ children, tone }: { children: ReactNode; tone?: Tone }) {
  const border = tone === "risk" ? "#f4b4b0" : tone === "warn" ? "#f4d48a" : tone === "good" ? "#9ae6cf" : "#dbe5ef";
  return <div style={{ border: `1px solid ${border}`, borderRadius: 18, background: "#fff", padding: "1rem", boxShadow: "0 9px 30px rgba(15,23,42,.045)" }}>{children}</div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div><div style={{ color: "#64748b", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.13em" }}>{label}</div><div style={{ marginTop: 4, color: "#102c5c", fontSize: "0.82rem", lineHeight: 1.45 }}>{children}</div></div>;
}

export default function FounderCommandCenter({ pmoState, processorIssueOpen }: Props) {
  const state = pmoState ?? "";
  const strategic = section(pmoState, "Current strategic position") ?? "Unavailable — PMO state could not be read.";
  const funding = section(pmoState, "Funding boundary — critical") ?? section(pmoState, "Funding boundary") ?? "Unavailable";
  const validation = section(pmoState, "Current validation ladder") ?? "Unavailable";
  const execution = section(pmoState, "Current execution posture") ?? "Unavailable";
  const risks = section(pmoState, "Biological validation rule") ?? "No founder-level risk register is currently exposed by the PMO snapshot.";
  const stateDate = state.match(/Last updated:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "unknown";

  const biologyRisk = has(state, "scientific validation owner", "tbd");
  const physicalPending = has(state, "physical", "validation", "pending");
  const biracPending = has(state, "actual ₹20l receipt", "not yet evidenced");
  const commercialOpen = processorIssueOpen !== false;

  const tracks: Track[] = [
    { name: "Technology", status: physicalPending ? "INTEGRATION" : "CURRENT", tone: physicalPending ? "warn" : "good", objective: "Technology integration → controlled validation.", constraint: physicalPending ? "Verified physical/runtime integration remains pending." : "No current PMO constraint exposed.", next: "Execute the governed technical closed-loop path.", owner: "Engineering / PMO", evidence: "PMO current state" },
    { name: "Biology", status: biologyRisk ? "RISK" : "GATED", tone: "risk", objective: "Establish controlled biological validation.", constraint: biologyRisk ? "Scientific validation owner is TBD." : "Biological gate remains uncleared.", next: "Assign accountable scientific owner and freeze protocol before biological advancement.", owner: biologyRisk ? "Founder decision required" : "PMO", evidence: "Biological validation rule" },
    { name: "Commercial", status: commercialOpen ? "VALIDATING" : "UNKNOWN", tone: commercialOpen ? "warn" : "neutral", objective: "Validate processor demand and economic fit.", constraint: commercialOpen ? "PMO #39 remains open; external response is not implied." : "Current processor issue state unavailable.", next: "Continue the existing processor validation track.", owner: "Commercial / Founder", evidence: "PMO #39" },
    { name: "BIRAC", status: biracPending ? "RELEASE READINESS" : "CURRENT", tone: biracPending ? "warn" : "good", objective: "Execute approved IHMS milestones with traceable evidence.", constraint: biracPending ? "M0 agreement executed; receipt not evidenced." : "No current funding constraint exposed.", next: "Reconcile primary M0 receipt and signed/counter-signed records.", owner: "Founder / Finance", evidence: "PMO funding boundary" },
    { name: "IP", status: "GOVERNED", tone: "neutral", objective: "Protect differentiated technical claims.", constraint: "Current PMO snapshot does not expose a live filing blocker here.", next: "Use existing IP records; do not optimize for patent count.", owner: "Founder / Counsel", evidence: "PMO source hierarchy" },
    { name: "Economics", status: "UNVERIFIED", tone: "risk", objective: "Retire production-cost and contribution-margin uncertainty.", constraint: "Working financial model outputs remain unverified until actual costs and receipts are reconciled.", next: "Measure the inputs that determine contribution/kg.", owner: "Founder / Finance / Operations", evidence: "PMO financial model posture" },
    { name: "Capital", status: "EVIDENCE-GATED", tone: "warn", objective: "Fund risk retirement, then commercial repeatability.", constraint: "Stage 1 fundraising remains gated on Phase 2 technical evidence.", next: "Retire the current validation risk before scaling capital claims.", owner: "Founder", evidence: "Capital sequencing principle" },
    { name: "Corporate", status: "STATE", tone: "neutral", objective: "Maintain compliant company records.", constraint: "No current corporate blocker is surfaced in the PMO snapshot.", next: "Keep diligence/compliance evidence current.", owner: "Founder / Finance / Counsel", evidence: "PMO state" },
    { name: "Operations", status: "READYING", tone: "warn", objective: "Prepare ground/lab execution without confusing readiness with validation.", constraint: "Lab start depends on procurement, AquaOS truth and physical readiness.", next: "Follow the governed procurement → lab start sequence.", owner: "Ground / Engineering", evidence: "Critical path" },
    { name: "PMO", status: "AUTHORITATIVE", tone: "good", objective: "Keep company execution governed by current evidence.", constraint: "No new control artifact unless programme reality changes.", next: "Use current state to select the next existing work.", owner: "PMO", evidence: "CURRENT_STATE.md" },
  ];

  const attention = [
    biologyRisk ? "Resolve scientific ownership before biological advancement." : null,
    biracPending ? "Reconcile BIRAC M0 receipt evidence." : null,
    physicalPending ? "Retire the physical/runtime integration dependency." : null,
    commercialOpen ? "Continue processor validation without claiming customer proof." : null,
  ].filter(Boolean) as string[];

  return <section style={{ display: "grid", gap: "0.9rem" }}>
    <Panel tone="warn">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "#64748b", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em" }}>FOUNDER COMMAND CENTER</div>
          <h2 style={{ margin: "0.35rem 0 0", color: "#102c5c", fontSize: "clamp(1.35rem,3vw,2rem)" }}>SEE → UNDERSTAND → DECIDE → EXECUTE → VERIFY → LEARN</h2>
          <p style={{ margin: "0.55rem 0 0", color: "#64748b", fontSize: "0.82rem", lineHeight: 1.55 }}>{strategic}</p>
        </div>
        <Pill tone={pmoState ? "good" : "risk"}>{pmoState ? `PMO SNAPSHOT · ${stateDate}` : "PMO STATE UNAVAILABLE"}</Pill>
      </div>
    </Panel>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "0.65rem" }}>
      <Panel><Field label="FOUNDER ATTENTION">{attention.length} current items</Field></Panel>
      <Panel tone={biologyRisk ? "risk" : "neutral"}><Field label="DECIDE NOW">{biologyRisk ? "Scientific owner" : "No explicit decision exposed"}</Field></Panel>
      <Panel tone={physicalPending ? "warn" : "neutral"}><Field label="TODAY'S CONSTRAINT">{physicalPending ? "Track-specific physical/runtime readiness" : "No constraint exposed"}</Field></Panel>
      <Panel tone={commercialOpen ? "warn" : "neutral"}><Field label="WAITING ON OTHERS">{commercialOpen ? "Processor validation / external response" : "Not exposed"}</Field></Panel>
      <Panel><Field label="EXECUTE NOW">{pmoState ? "Existing governed work" : "Unavailable"}</Field></Panel>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)", gap: "0.75rem" }}>
      <Panel tone={biologyRisk ? "risk" : "neutral"}>
        <div style={{ color: "#64748b", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.14em" }}>DECIDE NOW</div>
        <div style={{ display: "grid", gap: "0.7rem", marginTop: "0.65rem" }}>
          {biologyRisk ? <article><Pill tone="risk">SCI-OWNER · NEEDS DECISION</Pill><h3 style={{ margin: "0.45rem 0 0", color: "#102c5c" }}>Who is the accountable scientific validation owner?</h3><p style={{ margin: "0.35rem 0", color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5 }}>Why now: the PMO explicitly requires an accountable owner before G2/G3/G4 biological advancement.</p><p style={{ margin: 0, fontSize: "0.78rem" }}><b>Recommendation:</b> resolve the owner dependency; do not substitute more software or governance work.</p></article> : <div style={{ color: "#64748b", fontSize: "0.8rem" }}>No additional founder decision is exposed by the current PMO snapshot.</div>}
          {biracPending && <article><Pill tone="warn">BIRAC-M0 · NEEDS EVIDENCE</Pill><h3 style={{ margin: "0.45rem 0 0", color: "#102c5c" }}>Is the M0 release actually received?</h3><p style={{ margin: "0.35rem 0", color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5 }}>The agreement is executed, but primary receipt evidence is not yet recorded. Treat the ₹20L as unreconciled, not cash received.</p></article>}
        </div>
      </Panel>

      <Panel>
        <div style={{ color: "#64748b", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.14em" }}>EXECUTE / WAIT</div>
        <div style={{ display: "grid", gap: "0.65rem", marginTop: "0.65rem" }}>
          <Field label="EXECUTE NOW">Follow the existing procurement → AquaOS truth → lab start → first technical data sequence.</Field>
          <Field label="WAITING ON EXTERNAL">Processor responses remain external evidence; an open issue is not a customer commitment.</Field>
          <Field label="DO NOT EXECUTE">No new AquaOS capability, speculative AI, or new PMO artifact without a changed requirement or observed failure.</Field>
        </div>
      </Panel>
    </div>

    <Panel>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.7rem", alignItems: "end", flexWrap: "wrap" }}><div><div style={{ color: "#64748b", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.14em" }}>COMPANY PORTFOLIO</div><h3 style={{ margin: "0.3rem 0 0", color: "#102c5c", fontSize: "1.15rem" }}>Parallel tracks, one company state</h3></div><span style={{ color: "#64748b", fontSize: "0.7rem" }}>Derived from PMO snapshot; unsupported fields are explicit.</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "0.65rem", marginTop: "0.8rem" }}>
        {tracks.map((track) => <article key={track.name} style={{ border: "1px solid #dbe5ef", borderRadius: 14, padding: "0.8rem", background: "#fbfdff" }}><div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "center" }}><strong style={{ color: "#102c5c" }}>{track.name}</strong><Pill tone={track.tone}>{track.status}</Pill></div><div style={{ marginTop: "0.55rem", display: "grid", gap: "0.42rem" }}><Field label="OBJECTIVE">{track.objective}</Field><Field label="CONSTRAINT">{track.constraint}</Field><Field label="NEXT">{track.next}</Field><div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", color: "#64748b", fontSize: "0.68rem" }}><span>Owner: {track.owner}</span><span>·</span><span>Evidence: {track.evidence}</span></div></div></article>)}
      </div>
    </Panel>

    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "0.75rem" }}>
      <Panel><div style={{ color: "#64748b", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.14em" }}>WHY THIS MATTERS</div><p style={{ margin: "0.5rem 0 0", color: "#102c5c", fontWeight: 800, lineHeight: 1.5 }}>Founder attention is allocated to decisions, risks, dependencies, gates, capital and outcomes—not activity volume.</p><p style={{ margin: "0.4rem 0 0", color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5 }}>Priority is intentionally transparent rather than pretending the PMO already contains a validated numeric scoring model.</p></Panel>
      <Panel><div style={{ color: "#64748b", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.14em" }}>CURRENT EVIDENCE BOUNDARY</div><p style={{ margin: "0.5rem 0 0", color: "#102c5c", fontWeight: 800 }}>Implementation ≠ physical integration ≠ biological validation ≠ commercial proof.</p><p style={{ margin: "0.4rem 0 0", color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5 }}>{validation.slice(0, 500)}{validation.length > 500 ? "…" : ""}</p></Panel>
    </div>

    <details><summary style={{ cursor: "pointer", color: "#102c5c", fontWeight: 800, fontSize: "0.8rem" }}>Open PMO-derived execution and risk context</summary><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.65rem" }}><Panel><Field label="EXECUTION POSTURE">{execution}</Field></Panel><Panel><Field label="BIOLOGICAL RISK RULE">{risks}</Field></Panel><Panel><Field label="FUNDING EVIDENCE">{funding.slice(0, 900)}{funding.length > 900 ? "…" : ""}</Field></Panel></div></details>
  </section>;
}
