import type { ReactNode } from "react";
import styles from "./control-tower-v3.module.css";

type Tone = "neutral" | "good" | "warn" | "risk";
type TowerData = { live: boolean; githubLive: boolean; pmoState: string | null; pmoStateUrl: string; validation: string; technology: string };

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
  const start = markdown.indexOf(`## ${heading}`);
  if (start < 0) return "State not recorded";
  const body = markdown.slice(start).replace(/^## [^\n]+\n?/, "");
  const next = body.search(/\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}
function clean(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .trim();
}
function findGate(markdown: string | null) {
  const section = readSection(markdown, "Phase 2 gate boundary — explicit");
  if (section !== "State unavailable" && section !== "State not recorded") return clean(section.split(/\n\n/)[0]);
  const ladder = readSection(markdown, "Current validation ladder");
  const row = ladder.split("\n").find((line) => /\|\s*G\d\s*\|/.test(line) && !/Gate \|/.test(line));
  return row ? clean(row.replace(/^\|\s*|\s*\|$/g, "").replace(/\|/g, " — ")) : "Current gate not explicitly recorded";
}
function findExecutionSpine(markdown: string | null) {
  const section = readSection(markdown, "Current strategic position");
  const match = section.match(/Near-term execution spine:[^\n]*/i);
  return match ? clean(match[0].replace(/^[^:]+:\s*/i, "")) : "Execution spine not explicitly recorded";
}
function inlineText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

function MarkdownBlock({ markdown }: { markdown: string }) {
  if (!markdown || markdown === "State unavailable" || markdown === "State not recorded") {
    return <p className={styles.cardSub}>{markdown || "State unavailable"}</p>;
  }

  const lines = markdown.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let table: string[][] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={`p-${blocks.length}`} className={styles.cardSub}>{inlineText(paragraph.join(" "))}</p>);
    paragraph = [];
  };
  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(<ul key={`ul-${blocks.length}`} style={{ margin: ".5rem 0 .8rem", paddingLeft: "1.15rem" }}>{bullets.map((item, i) => <li key={i} style={{ marginBottom: ".3rem", fontSize: ".8rem", lineHeight: 1.5 }}>{inlineText(item)}</li>)}</ul>);
    bullets = [];
  };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter((row) => !row.every((cell) => /^[-: ]+$/.test(cell)));
    if (!rows.length) { table = []; return; }
    const [head, ...body] = rows;
    blocks.push(
      <div key={`table-${blocks.length}`} className={styles.tableScroll}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".76rem", lineHeight: 1.45 }}>
          <thead><tr>{head.map((cell, i) => <th key={i} style={{ textAlign: "left", padding: ".55rem .45rem", borderBottom: "1px solid #dbe5ef", color: "#102c5c", fontWeight: 800 }}>{inlineText(cell)}</th>)}</tr></thead>
          <tbody>{body.map((row, r) => <tr key={r}>{head.map((_, c) => <td key={c} style={{ verticalAlign: "top", padding: ".55rem .45rem", borderBottom: "1px solid #e2e8f0" }}>{inlineText(row[c] ?? "")}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    table = [];
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushBullets(); flushTable(); return; }
    if (/^\|.*\|$/.test(line)) {
      flushParagraph(); flushBullets();
      table.push(line.slice(1, -1).split("|").map((cell) => cell.trim()));
      return;
    }
    if (/^#{1,6}\s+/.test(line)) {
      flushParagraph(); flushBullets(); flushTable();
      blocks.push(<h3 key={`h-${index}`} className={styles.sectionTitle} style={{ fontSize: ".95rem", margin: ".65rem 0 .3rem" }}>{inlineText(line.replace(/^#{1,6}\s+/, ""))}</h3>);
      return;
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph(); flushTable();
      bullets.push(line.replace(/^[-*]\s+/, ""));
      return;
    }
    if (/^>\s?/.test(line)) {
      flushParagraph(); flushBullets(); flushTable();
      blocks.push(<blockquote key={`q-${index}`} className={styles.cardSub} style={{ borderLeft: "3px solid #dbe5ef", paddingLeft: ".7rem" }}>{inlineText(line.replace(/^>\s?/, ""))}</blockquote>);
      return;
    }
    flushBullets(); flushTable();
    paragraph.push(line);
  });
  flushParagraph(); flushBullets(); flushTable();
  return <div>{blocks}</div>;
}

export default function ControlTowerV5({ data }: { data: TowerData }) {
  const strategic = readSection(data.pmoState, "Current strategic position");
  const gate = findGate(data.pmoState);
  const spine = findExecutionSpine(data.pmoState);
  const technology = readSection(data.pmoState, "Core technology spine");
  const validation = readSection(data.pmoState, "Current validation ladder");
  const currentState = clean(strategic.split("\n\n")[0] || "Current state unavailable");
  const liveLabel = !data.live ? "PMO state unavailable" : data.githubLive ? "LIVE · PMO state" : "LIVE · PMO state / GitHub feed unavailable";

  return <main className={styles.tower}><div className={styles.inner}>
    <header className={styles.hero}>
      <div className={styles.heroTop}><Badge tone={data.live ? "good" : "risk"}>{liveLabel}</Badge><div className={styles.source}><div className={styles.sourceLabel}>SOURCE AUTHORITY</div><a className={styles.sourceLink} href={data.pmoStateUrl} target="_blank" rel="noreferrer">PMO → CURRENT_STATE.md</a></div></div>
      <div><div className={styles.eyebrow}>Crabionics · founder / CTO operating view</div><h1 className={styles.heroTitle}>Control Tower</h1><p className={styles.heroCopy}>One company. One authoritative current state. Start with what is true now, what must be proven next, and what needs your attention.</p></div>
    </header>

    <Section eyebrow="Founder control surface" title="What matters now">
      <div className={styles.grid2}>
        <Card accent="warn"><div className={styles.cardLabel}>CURRENT OPERATING STATE · PMO</div><div className={styles.cardValue}>{currentState}</div><div className={styles.cardSub}>This value is read from the authoritative PMO current-state snapshot. No hard-coded operational fallback is used.</div></Card>
        <Card accent="risk"><div className={styles.cardLabel}>CURRENT PROGRAMME GATE · PMO</div><div className={styles.cardValue}>{gate}</div><div className={styles.cardSub}>The page reports the PMO gate boundary rather than assuming a fixed G0–G6 card is current.</div></Card>
        <Card accent="good"><div className={styles.cardLabel}>NEAR-TERM EXECUTION SPINE · PMO</div><div className={styles.cardValue}>{spine}</div><div className={styles.cardSub}>Use this as the execution sequence; individual repository issues remain governed by PMO.</div></Card>
        <Card><div className={styles.cardLabel}>SOURCE / FRESHNESS</div><div className={styles.cardValue}>{data.live ? "Authoritative PMO snapshot loaded" : "Authoritative PMO snapshot unavailable"}</div><div className={styles.cardSub}>Source: PMO CURRENT_STATE.md · refresh policy: 60 seconds. If unavailable, the tower says so instead of presenting stale operational state.</div></Card>
      </div>
    </Section>

    <Section eyebrow="Decision discipline" title="What I need to decide">
      <Card accent="warn"><div className={styles.principle}>Which horizon? Which operational job? What uncertainty? What experiment? What evidence? What gate does it unlock?</div><p className={styles.cardSub}>If a founder action is not represented in authoritative PMO state, the Control Tower does not invent one. Use the PMO as the decision record.</p></Card>
    </Section>

    <Section eyebrow="Company plan" title="The four horizons">
      <div className={styles.grid4}>
        {[["H1","Lab / IP / technical validation"],["H2","Commercial biological production"],["H3","Multi-site / network operations"],["H4","End-state intelligence / ecosystem"]].map(([id,name]) => <Card key={id}><div className={styles.cardLabel}>{id}</div><div className={styles.cardValue}>{name}</div></Card>)}
      </div>
    </Section>

    <Section eyebrow="System architecture" title="The physical + digital system">
      <Card><div className={styles.commandFlow}><MarkdownBlock markdown={technology || "Technology spine not recorded"} /></div><div className={styles.feedbackLoop}><span>Sense</span><b>→</b><span>State</span><b>→</b><span>Decide</span><b>→</b><span>Act</span><b>→</b><span>Outcome</span><b>→</b><span>Evidence</span></div></Card>
    </Section>

    <Section eyebrow="Evidence boundary" title="What is actually recorded">
      <Card><div className={styles.grid2}><div><div className={styles.cardLabel}>STRATEGIC POSITION</div><MarkdownBlock markdown={strategic} /></div><div><div className={styles.cardLabel}>VALIDATION LADDER</div><MarkdownBlock markdown={validation} /></div></div><p className={styles.cardSub}>Implementation, CI and website state are not physical or biological validation. The PMO remains the authority; this page is only a projection.</p></Card>
    </Section>
  </div></main>;
}
