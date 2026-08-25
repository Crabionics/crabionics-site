import type { ReactNode } from "react";
import styles from "./control-tower-v3.module.css";

type Tone = "neutral" | "good" | "warn" | "risk";

type TowerData = {
  live: boolean;
  githubLive: boolean;
  pmoState: string | null;
  pmoStateUrl: string;
  validation: string;
  technology: string;
};

const horizons: Array<[string, string, string, Tone, string]> = [
  ["H1", "Lab / IP / technical validation", "NOW", "warn", "Prove the integrated system and retire technical risk."],
  ["H2", "Commercial biological production", "NEXT", "neutral", "Prove biological production, repeatability and economics."],
  ["H3", "Multi-site / network operations", "FUTURE", "neutral", "Make deployment repeatable across sites without losing provenance."],
  ["H4", "End-state intelligence / ecosystem", "FUTURE", "neutral", "Use trusted outcome data for higher-order intelligence and selected ecosystem workflows."],
];

const systems: Array<[string, string, string, Tone]> = [
  ["Habitat", "PHYSICAL", "Engineering baseline; integrated validation pending", "warn"],
  ["CrabSense", "SENSE", "Identity / telemetry role defined; runtime evidence pending", "warn"],
  ["AquaOS", "CONTROL + EVIDENCE", "Core lifecycle implemented; physical validation pending", "good"],
  ["CrabPod", "ACT", "Integration contract defined; physical runtime verification pending", "warn"],
  ["BioPod", "BIOLOGICAL OUTCOME", "Lab validation layer; biological proof pending", "risk"],
];

const gates: Array<[string, string, Tone, string]> = [
  ["G0", "Architecture/control plane sufficient to execute experiments", "good", "ACTIVE"],
  ["G1", "Synthetic/no-crab implementation evidence", "warn", "IMPLEMENTED / NOT VALIDATED"],
  ["G2", "Biological lab integration evidence", "risk", "CURRENT GATE · NOT CLEARED"],
  ["G3", "Field / pilot readiness evidence", "risk", "NOT CLEARED"],
  ["G4", "600-box biological validation", "risk", "NOT CLEARED"],
  ["G5", "Commercial / customer validation", "risk", "NOT CLEARED"],
  ["G6", "Scale / repeatability capital", "neutral", "TARGET"],
];

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`${styles.badge} ${tone === "good" ? styles.good : tone === "warn" ? styles.warn : tone === "risk" ? styles.risk : ""}`}>{children}</span>;
}

function Card({ children, accent }: { children: ReactNode; accent?: Tone }) {
  return <div className={`${styles.card} ${accent === "warn" ? styles.accentWarn : accent === "risk" ? styles.accentRisk : accent === "good" ? styles.accentGood : ""}`}>{children}</div>;
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className={styles.section}><div className={styles.sectionHead}><div><div className={styles.eyebrow}>{eyebrow}</div><h2 className={styles.sectionTitle}>{title}</h2></div></div>{children}</section>;
}

function readSection(markdown: string | null, heading: string) {
  if (!markdown) return "State unavailable";
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return "State not recorded";
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, "");
  const next = body.search(/\r?\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}

function cleanText(text: string) {
  return text.replace(/\*\*/g, "").replace(/`/g, "").replace(/^[-*]\s+/gm, "").trim();
}

export default function ControlTowerV4({ data }: { data: TowerData }) {
  const strategic = cleanText(readSection(data.pmoState, "Current strategic position"));
  const technology = cleanText(readSection(data.pmoState, "Core technology spine"));
  const validation = cleanText(readSection(data.pmoState, "Current validation ladder"));
  const liveLabel = !data.live ? "PMO state unavailable" : data.githubLive ? "LIVE · PMO state" : "LIVE · PMO state / GitHub feed unavailable";

  return <main className={styles.tower}>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <Badge tone={data.live ? "good" : "risk"}>{liveLabel}</Badge>
          <div className={styles.source}><div className={styles.sourceLabel}>SOURCE AUTHORITY</div><a className={styles.sourceLink} href={data.pmoStateUrl} target="_blank" rel="noreferrer">PMO → CURRENT_STATE.md</a></div>
        </div>
        <div>
          <div className={styles.eyebrow}>Crabionics · founder / CTO operating view</div>
          <h1 className={styles.heroTitle}>Control Tower</h1>
          <p className={styles.heroCopy}>One company. Four horizons. One current gate. Start with where we are, what must be proven next, and what the larger plan is.</p>
        </div>
      </header>

      <Card accent="warn">
        <div className={styles.cardLabel}>CURRENT HORIZON</div>
        <div className={styles.externalTitle}>H1 — Lab / IP / technical validation</div>
        <p className={styles.externalCopy}>The immediate job is to prove the integrated technology loop and generate evidence for the next gate — not to prove the whole company.</p>
        <div className={styles.commandFlow}>Habitat → CrabSense → AquaOS → CrabPod → BioPod → reconstructable evidence</div>
      </Card>

      <Card accent="risk">
        <div className={styles.cardLabel}>CURRENT GATE</div>
        <div className={styles.cardValue}>G2 — Biological lab integration evidence</div>
        <p className={styles.cardSub}>Not cleared. The next programme action is to execute the current lab integration scope and produce biological evidence. Do not treat implementation or synthetic tests as biological validation.</p>
      </Card>

      <Section eyebrow="Company plan" title="Where H1 sits in the whole company">
        <div className={styles.grid4}>
          {horizons.map(([id, name, state, tone, detail]) => <Card key={id} accent={tone}><div className={styles.cardLabel}>{id} · {state}</div><div className={styles.cardValue}>{name}</div><div className={styles.cardSub}>{detail}</div></Card>)}
        </div>
      </Section>

      <Section eyebrow="What we are building" title="The physical + digital system">
        <Card>
          <div className={styles.stack}>
            {systems.map(([name, role, status, tone]) => <div className={styles.stackRow} key={name}><div className={styles.stackName}>{name}</div><div className={styles.stackRole}>{role}</div><div className={styles.stackStatus}><Badge tone={tone}>{status}</Badge></div></div>)}
          </div>
          <div className={styles.feedbackLoop}><span>Sense</span><b>→</b><span>State</span><b>→</b><span>Decide</span><b>→</b><span>Act</span><b>→</b><span>Outcome</span><b>→</b><span>Evidence</span></div>
        </Card>
      </Section>

      <Section eyebrow="Why AquaOS exists" title="The operational job">
        <Card>
          <div className={styles.principle}>AquaOS is the operating/control layer that turns the physical aquaculture system into an observable, controllable, auditable and validatable system.</div>
          <div className={styles.fieldGrid}>
            <div><b>H1 · PROVE</b><span>Sense → state → decision → intervention → outcome → evidence.</span></div>
            <div><b>H2 · OPERATE</b><span>Run real biological production and connect intervention to biological and economic outcome.</span></div>
            <div><b>H3 · SCALE</b><span>Standardize multiple deployments without losing provenance or operational control.</span></div>
            <div><b>H4 · INTELLIGENCE</b><span>Predict, recommend and optimize only after enough trusted outcome data exists.</span></div>
          </div>
        </Card>
      </Section>

      <Section eyebrow="Current proof path" title="What must be proven before moving forward">
        <div className={styles.gateBoard}>
          {gates.map(([id, meaning, tone, status]) => <Card key={id} accent={tone}><div className={styles.gateNumber}>{id}</div><div className={styles.gateTitle}>{meaning}</div><div className={styles.gateStatus}><Badge tone={tone}>{status}</Badge></div></Card>)}
        </div>
      </Section>

      <Section eyebrow="Current evidence boundary" title="What is true today">
        <Card>
          <div className={styles.grid2}>
            <div><div className={styles.cardLabel}>STRATEGIC POSITION</div><div className={styles.cardSub}>Crabionics is in technology integration and controlled validation. The current programme is deliberately lab-first; commercial repeatability is a later gate.</div></div>
            <div><div className={styles.cardLabel}>IMPLEMENTATION BOUNDARY</div><div className={styles.cardSub}>Code and architecture can establish implementation evidence. They do not by themselves establish physical integration, biological validation or commercial proof.</div></div>
          </div>
        </Card>
        <details className={styles.card}>
          <summary className={styles.cardValue}>Open PMO evidence detail</summary>
          <div className={styles.grid2} style={{ marginTop: "0.8rem" }}>
            <Card><div className={styles.cardLabel}>CORE TECHNOLOGY SPINE</div><div className={styles.cardSub}>{technology}</div></Card>
            <Card><div className={styles.cardLabel}>VALIDATION LADDER</div><div className={styles.cardSub}>{validation}</div></Card>
            <Card accent="risk"><div className={styles.cardLabel}>DO NOT CONFUSE</div><div className={styles.cardValue}>Implementation ≠ integration ≠ biological validation ≠ commercial proof.</div><div className={styles.cardSub}>The PMO remains the authority; this page is a founder/CTO projection.</div></Card>
            <Card><div className={styles.cardLabel}>SOURCE</div><div className={styles.cardSub}>Use the PMO current-state document for the detailed evidence boundary and update the Control Tower when the authoritative state changes.</div></Card>
          </div>
        </details>
      </Section>

      <Section eyebrow="Decision discipline" title="Before we add more work">
        <Card accent="warn">
          <div className={styles.principle}>Which horizon? Which operational job? What uncertainty? What experiment? What evidence? What gate does it unlock?</div>
          <p className={styles.cardSub}>If a feature cannot answer those questions, it should not automatically enter the active AquaOS backlog.</p>
          <div className={styles.sourceMini}>
            <a href="https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/Strategy/Crabionics_Horizon_Architecture_v1.md" target="_blank" rel="noreferrer">Horizon architecture ↗</a>
            <a href="https://github.com/Crabionics/crabionics-pmo/blob/main/05_AquaOS/Product/AquaOS_Use_Case_and_Horizon_Map_v0.2.md" target="_blank" rel="noreferrer">AquaOS use-case map ↗</a>
            <a href="https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/PMO/CURRENT_STATE.md" target="_blank" rel="noreferrer">Current state ↗</a>
          </div>
        </Card>
      </Section>
    </div>
  </main>;
}
