import React from "react";
import styles from "./control-tower-v2.module.css";

type Issue = { number: number; title: string; state: string; labels: string[]; url: string; updated_at?: string };
type Repo = "crabionics-pmo" | "aquaos" | "crabpod" | "habitat" | "crabionics-site";
type IssueFeed = { issues: Issue[]; available: boolean };
const OWNER = "Crabionics";
const REPOS: Repo[] = ["crabionics-pmo", "aquaos", "crabpod", "habitat", "crabionics-site"];
const PMO_STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";
const PMO_STATE_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${PMO_STATE_PATH}`;

async function fetchPmoState(): Promise<string | null> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${PMO_STATE_PATH}?ref=main`,
      { headers, next: { revalidate: 60 } },
    );
    if (!response.ok) return null;
    const data = await response.json() as { content?: string; encoding?: string };
    if (!data.content || data.encoding !== "base64") return null;
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
  } catch {
    return null;
  }
}

async function fetchIssues(repo: Repo): Promise<IssueFeed> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated&direction=desc`, { headers, next: { revalidate: 60 } });
    if (!response.ok) return { issues: [], available: false };
    const data = await response.json() as Array<{ number: number; title: string; state: string; html_url: string; updated_at: string; labels: Array<{ name?: string }>; pull_request?: unknown }>;
    return {
      available: true,
      issues: data.filter((item) => !item.pull_request).map((item) => ({
        number: item.number,
        title: item.title,
        state: item.state,
        url: item.html_url,
        updated_at: item.updated_at,
        labels: item.labels.map((label) => label.name ?? "").filter(Boolean),
      })),
    };
  } catch {
    return { issues: [], available: false };
  }
}

function section(markdown: string | null, heading: string): string {
  if (!markdown) return "State unavailable";
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start < 0) return "State not recorded";
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, "");
  const next = body.search(/\r?\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}

function ageDays(updatedAt?: string) {
  if (!updatedAt) return null;
  return Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000);
}

function inlineMarkdown(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function MarkdownBlock({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }

    if (line.startsWith("|") && i + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[i + 1].replace(/^\|/, ""))) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { tableLines.push(lines[i].trim()); i += 1; }
      const rows = tableLines.filter((row) => !/^\|?\s*:?-{3,}/.test(row.replace(/^\|/, ""))).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
      const head = rows[0] ?? [];
      const body = rows.slice(1);
      blocks.push(<div key={`table-${i}`} style={{ overflowX: "auto" }}><table><thead><tr>{head.map((cell, n) => <th key={n}>{inlineMarkdown(cell)}</th>)}</tr></thead><tbody>{body.map((row, r) => <tr key={r}>{row.map((cell, n) => <td key={n}>{inlineMarkdown(cell)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s+/, "")); i += 1; }
      blocks.push(<ul key={`list-${i}`}>{items.map((item, n) => <li key={n}>{inlineMarkdown(item)}</li>)}</ul>);
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const title = line.replace(/^#{1,3}\s+/, "");
      blocks.push(level === 1 ? <h3 key={`h-${i}`}>{inlineMarkdown(title)}</h3> : <h4 key={`h-${i}`}>{inlineMarkdown(title)}</h4>);
      i += 1;
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^[-*]\s+/.test(lines[i].trim()) && !/^#{1,3}\s+/.test(lines[i].trim()) && !lines[i].trim().startsWith("|")) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(<p key={`p-${i}`}>{paragraph.map((part, n) => <React.Fragment key={n}>{n > 0 && " "}{inlineMarkdown(part)}</React.Fragment>)}</p>);
  }
  return <div className={styles.markdown}>{blocks}</div>;
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "risk" }) {
  return <span className={`${styles.badge} ${tone === "good" ? styles.good : tone === "warn" ? styles.warn : tone === "risk" ? styles.risk : ""}`}>{children}</span>;
}

function Section({ eyebrow, title, right, children }: { eyebrow: string; title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return <section className={styles.section}><div className={styles.sectionHead}><div><div className={styles.eyebrow}>{eyebrow}</div><h2 className={styles.sectionTitle}>{title}</h2></div>{right}</div>{children}</section>;
}

export default async function ControlTowerV2() {
  const [pmoState, issueResults] = await Promise.all([fetchPmoState(), Promise.all(REPOS.map(async (repo) => [repo, await fetchIssues(repo)] as const))]);
  const issueMap = Object.fromEntries(issueResults) as Record<Repo, IssueFeed>;
  const pmoFeed = issueMap["crabionics-pmo"] ?? { issues: [], available: false };
  const pmoIssues = pmoFeed.issues;
  const live = Boolean(pmoState);
  const githubLive = pmoFeed.available;
  const blockers = pmoIssues.filter((issue) => issue.labels.some((label) => /blocked|blocker|p0/i.test(label)));
  const recentlyUpdated = pmoIssues.filter((issue) => issue.updated_at).slice(0, 6);
  const stale = pmoIssues.filter((issue) => (ageDays(issue.updated_at) ?? 0) >= 7).slice(0, 6);
  const strategic = section(pmoState, "Current strategic position");
  const funding = section(pmoState, "Funding boundary — critical");
  const execution = section(pmoState, "Current execution posture");
  const validation = section(pmoState, "Current validation ladder");
  const technology = section(pmoState, "Core technology spine");

  const topStatus = !live ? "DEGRADED · PMO STATE UNAVAILABLE" : githubLive ? "LIVE · PMO + GITHUB" : "LIVE · PMO ONLY — GITHUB FEED UNAVAILABLE";

  return <main className={styles.tower}>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <Badge tone={live && githubLive ? "good" : live ? "warn" : "risk"}>{topStatus}</Badge>
          <div className={styles.source}><div className={styles.sourceLabel}>SOURCE AUTHORITY</div><a className={styles.sourceLink} href={PMO_STATE_URL} target="_blank" rel="noreferrer">PMO → CURRENT_STATE.md</a></div>
        </div>
        <div><div className={styles.eyebrow}>Crabionics operating view</div><h1 className={styles.heroTitle}>Control Tower</h1><p className={styles.heroCopy}>A projection of current PMO state, live governed work and evidence posture. The Control Tower does not create company state.</p></div>
      </header>

      <section className={styles.grid4}>
        <div className={styles.card}><div className={styles.cardLabel}>Company state</div><div className={styles.cardValue}>Technology integration → controlled validation</div><div className={styles.cardSub}>PMO boot state is authoritative.</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>Immediate execution</div><div className={styles.cardValue}>BIRAC M0 → M1</div><div className={styles.cardSub}>M0 release-readiness first; company tracks remain active.</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>600-box</div><div className={styles.cardValue}>Downstream / gated</div><div className={styles.cardSub}>Not the immediate execution lane.</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>Needs attention</div><div className={`${styles.cardValue} ${styles.metric}`}>{githubLive ? blockers.length : "—"}</div><div className={styles.cardSub}>{githubLive ? "Explicit P0/blocker-labelled PMO issues." : "Verify GitHub feed before interpreting issue counts."}</div></div>
      </section>

      <Section eyebrow="Current state" title="What is true now" right={<Badge tone={live ? "good" : "risk"}>{live ? "PMO live" : "Verify PMO"}</Badge>}><div className={styles.card}><MarkdownBlock text={strategic} /></div></Section>
      <Section eyebrow="Funding boundary" title="BIRAC is a funded lane, not the whole company" right={<Badge tone="warn">Scope traceable</Badge>}><div className={styles.card}><MarkdownBlock text={funding} /></div></Section>
      <Section eyebrow="Execution" title="What happens next" right={<Badge>Current plan wins</Badge>}><div className={styles.card}><MarkdownBlock text={execution} /></div></Section>
      <Section eyebrow="Validation ladder" title="Gate status" right={<Badge tone="warn">Evidence ≠ implementation</Badge>}><div className={styles.card}><MarkdownBlock text={validation} /></div></Section>
      <Section eyebrow="Technology spine" title="Core technology truth" right={<Badge>Owning repositories remain authoritative</Badge>}><div className={styles.card}><MarkdownBlock text={technology} /></div></Section>

      <Section eyebrow="Evidence discipline" title="Known / Observed / Inferred / Unknown / Needs experiment">
        <div className={styles.grid5}>
          <div className={styles.card}><Badge tone="good">KNOWN</Badge><div className={styles.cardSub}>Recorded in authoritative PMO/repository state.</div></div>
          <div className={styles.card}><Badge>OBSERVED</Badge><div className={styles.cardSub}>Directly visible in current issues, commits or evidence.</div></div>
          <div className={styles.card}><Badge tone="warn">INFERRED</Badge><div className={styles.cardSub}>Interpretation derived from observed facts.</div></div>
          <div className={styles.card}><Badge tone="risk">UNKNOWN</Badge><div className={styles.cardSub}>Not established by the available source.</div></div>
          <div className={styles.card}><Badge tone="warn">NEEDS EXPERIMENT</Badge><div className={styles.cardSub}>Requires a defined experiment and evidence artifact.</div></div>
        </div>
      </Section>

      <Section eyebrow="Live execution" title="Current governed PMO work" right={<Badge tone={githubLive ? "good" : "warn"}>{githubLive ? `${pmoIssues.length} open PMO issues` : "Issue feed unavailable"}</Badge>}>
        {githubLive && pmoIssues.length > 0 ? <div className={styles.grid2}>{pmoIssues.slice(0, 10).map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className={styles.issue}><div className={styles.issueTitle}>#{issue.number} · {issue.title}</div><div className={styles.issueMeta}>{issue.labels.length ? issue.labels.join(" · ") : "No labels"} · Updated {ageDays(issue.updated_at) ?? "?"}d ago</div></a>)}</div> : <div className={`${styles.card} ${styles.cardSoft}`}><div className={styles.cardSub}>{githubLive ? "No open PMO issues currently returned by GitHub." : "PMO state is available, but the GitHub issue feed could not be verified. Do not interpret this as zero open work."}</div></div>}
      </Section>

      <Section eyebrow="Risk / attention" title="Explicit signals only" right={<Badge tone={blockers.length ? "risk" : "good"}>{blockers.length ? `${blockers.length} flagged` : "No explicit P0/blocker labels"}</Badge>}>
        <div className={styles.grid2}>
          {blockers.slice(0, 8).map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className={styles.issue}><div className={styles.issueTitle}>#{issue.number} · {issue.title}</div><div className={styles.issueMeta}>{issue.labels.join(" · ")}</div></a>)}
          {stale.length > 0 && <div className={styles.card}><Badge tone="warn">STALE SIGNAL</Badge><div className={styles.cardSub}>{stale.length} open issues have not reported an update for at least 7 days. Staleness is an observation, not proof of blockage.</div></div>}
          {!githubLive && <div className={styles.card}><Badge tone="warn">GITHUB UNVERIFIED</Badge><div className={styles.cardSub}>Risk counts are intentionally withheld until the governed issue feed is available.</div></div>}
        </div>
      </Section>

      <Section eyebrow="Recent movement" title="Observed source changes" right={<Badge>Observed only</Badge>}>
        <div className={styles.grid2}>{recentlyUpdated.map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className={styles.issue}><div className={styles.issueTitle}>#{issue.number} · {issue.title}</div><div className={styles.issueMeta}>Updated {ageDays(issue.updated_at) ?? "?"}d ago</div></a>)}{!recentlyUpdated.length && <div className={styles.card}><div className={styles.cardSub}>No timestamped PMO movement available.</div></div>}</div>
      </Section>

      <footer className={styles.footer}><strong>Control rule:</strong> PMO defines company state; owning repositories define implementation truth; runtime/raw evidence defines operational proof. The Control Tower is only a projection. <a href={PMO_STATE_URL} target="_blank" rel="noreferrer">Open PMO boot file</a>.</footer>
    </div>
  </main>;
}
