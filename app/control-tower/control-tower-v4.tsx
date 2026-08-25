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

const horizons: Array<[string, string, string, Tone]> = [
  ["H1", "Lab / IP / technical validation", "NOW", "warn"],
  ["H2", "Commercial biological production", "NEXT", "neutral"],
  ["H3", "Multi-site / network operations", "FUTURE", "neutral"],
  ["H4", "End-state intelligence / ecosystem", "FUTURE", "neutral"],
];

const systems: Array<[string, string, string, Tone]> = [
  ["Habitat", "Physical production environment", "Engineering baseline; integrated validation pending", "warn"],
  ["CrabSense", "Sense", "Identity / telemetry role defined; runtime evidence pending", "warn"],
  ["AquaOS", "State → Decide → Evidence", "Core lifecycle implemented; physical validation pending", "good"],
  ["CrabPod", "Act", "Integration contract defined; physical runtime verification pending", "warn"],
  ["BioPod", "Biological outcome", "Lab validation layer; biological proof pending", "risk"],
];

const gates: Array<[string, string, Tone]> = [
  ["G0", "Architecture/control plane sufficient to execute experiments", "good"],
  ["G1", "Synthetic/no-crab implementation evidence — not programme validation", "warn"],
  ["G2", "Biological lab integration evidence", "risk"],
  ["G3", "Field / pilot readiness evidence", "risk"],
  ["G4", "600-box biological validation", "risk"],
  ["G5", "Commercial / customer validation", "risk"],
  ["G6", "Scale / repeatability capital", "neutral"],
];

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={`${styles.badge} ${tone === "good" ? styles.good : tone === "warn" ? styles.warn : tone === "risk" ? styles.risk : ""}`}>{children}</span>;
}

function Card({ children, accent }: { children: React.ReactNode; accent?: Tone }) {
  return <div className={`${styles.card} ${accent === "warn" ? styles.accentWarn : accent === "risk" ? styles.accentRisk : accent === "good" ? styles.accentGood : ""}`}>{children}</div>;
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
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
          <p className={styles.heroCopy}>One company. Four horizons. One current gate. This view separates what we are proving now from what we intend to build later.</p>
        </div>
      </header>

      <Card accent="warn">
        <div className={styles.cardLabel}>CURRENT HORIZON</div>
        <div className={styles.externalTitle}>H1 — Lab / IP / technical validation</div>
        <p className={styles.externalCopy}>The immediate job is not to prove the whole company. It is to prove the integrated technology loop and generate evidence that supports the next gate.</p>
        <div className={styles.commandFlow}>Habitat → CrabSense → AquaOS → CrabPod → BioPod → reconstructable evidence</div>
      </Card>

      <Section eyebrow="Company plan" title="Where H1 sits in the whole company">
        <div className={styles.grid4}>
          {horizons.map(([id, name, state, tone]) => <Card key={id} accent={tone}><div className={styles.cardLabel}>{id} · {state}</div><div className={styles.cardValue}>{name}</div><div className={styles.cardSub}>{id === "H1" ? "Prove the integrated system and retire technical risk." : id === "H2" ? "Prove biological production and economics." : id === "H3" ? "Make deployment repeatable across sites." : "Use accumulated evidence for higher-order intelligence and selected ecosystem workflows."}</div></Card>)}
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
          <div className={styles.principle}>AquaOS turns the physical aquaculture system into an observable, controllable, auditable and validatable operating system.</div>
          <div className={styles.fieldGrid}>
            <div><b>H1</b><span>Sense → state → decision → intervention → outcome → evidence.</span></div>
            <div><b>H2</b><span>Run real biological production and connect intervention to biological/economic outcome.</span></div>
            <div><b>H3</b><span>Standardize and operate multiple deployments without losing provenance.</span></div>
            <div><b>H4</b><span>Predict, recommend, optimize and coordinate only after enough trusted outcome data exists.</span></div>
          </div>
        </Card>
      </Section>

      <Section eyebrow="Current proof path" title="What must be proven before moving forward">
        <div className={styles.gateBoard}>
          {gates.map(([id, meaning, tone]) => <Card key={id} accent={tone}><div className={styles.gateNumber}>{id}</div><div className={styles.gateTitle}>{meaning}</div><div className={styles.gateStatus}><Badge tone={tone}>{id === "G0" ? "ACTIVE" : id === "G1" ? "IMPLEMENTED / NOT VALIDATED" : id === "G6" ? "TARGET" : "NOT CLEARED"}</Badge></div></Card>)}
        </div>
      </Section>

      <Section eyebrow="Current evidence boundary" title="What is true today">
        <div className={styles.grid2}>
          <Card><div className={styles.cardLabel}>STRATEGIC POSITION</div><div className={styles.cardSub}>{strategic}</div></Card>
          <Card><div className={styles.cardLabel}>CORE TECHNOLOGY SPINE</div><div className={styles.cardSub}>{technology}</div></Card>
          <Card><div className={styles.cardLabel}>VALIDATION LADDER</div><div className={styles.cardSub}>{validation}</div></Card>
          <Card accent="risk"><div className={styles.cardLabel}>DO NOT CONFUSE</div><div className={styles.cardValue}>Implementation ≠ integration ≠ biological validation ≠ commercial proof.</div><div className={styles.cardSub}>The PMO remains the authority; this page is only a projection.</div></Card>
        </div>
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
