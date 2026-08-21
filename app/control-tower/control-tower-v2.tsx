import React from "react";

type Issue = {
  number: number;
  title: string;
  state: string;
  labels: string[];
  url: string;
  updated_at?: string;
};

type Repo = "crabionics-pmo" | "aquaos" | "crabpod" | "habitat" | "crabionics-site";
const OWNER = "Crabionics";
const REPOS: Repo[] = ["crabionics-pmo", "aquaos", "crabpod", "habitat", "crabionics-site"];

const PMO_STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";
const PMO_STATE_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${PMO_STATE_PATH}`;

async function fetchPmoState(): Promise<string | null> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  if (!token) return null;
  const response = await fetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${PMO_STATE_PATH}?ref=main`, {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" },
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;
  const data = await response.json() as { content?: string; encoding?: string };
  if (!data.content) return null;
  return Buffer.from(data.content.replace(/\n/g, ""), data.encoding === "base64" ? "base64" : "utf8").toString("utf8");
}

async function fetchIssues(repo: Repo): Promise<Issue[]> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  if (!token) return [];
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated&direction=desc`, {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" },
    next: { revalidate: 60 },
  });
  if (!response.ok) return [];
  const data = await response.json() as Array<{
    number: number; title: string; state: string; html_url: string; updated_at: string;
    labels: Array<{ name?: string }>; pull_request?: unknown;
  }>;
  return data.filter((item) => !item.pull_request).map((item) => ({
    number: item.number, title: item.title, state: item.state, url: item.html_url,
    updated_at: item.updated_at, labels: item.labels.map((label) => label.name ?? "").filter(Boolean),
  }));
}

function section(markdown: string | null, heading: string): string {
  if (!markdown) return "State unavailable";
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`^## ${escaped}\\n([\\s\\S]*?)(?=^## |\\z)`, "m"));
  return match?.[1]?.trim() ?? "State not recorded";
}

function line(markdown: string | null, prefix: string): string {
  if (!markdown) return "State unavailable";
  const match = markdown.match(new RegExp(`^\\*\\*${prefix}:?\\*\\*\\s*(.+)$`, "mi"));
  return match?.[1]?.trim() ?? "Not recorded";
}

function ageDays(updatedAt?: string) {
  if (!updatedAt) return null;
  return Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000);
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "risk" }) {
  const cls = tone === "good" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : tone === "warn" ? "border-amber-400/25 bg-amber-400/10 text-amber-200" : tone === "risk" ? "border-red-400/25 bg-red-400/10 text-red-200" : "border-white/10 bg-white/5 text-slate-300";
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${cls}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, right }: { eyebrow: string; title: string; right?: React.ReactNode }) {
  return <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">{eyebrow}</div><h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2></div>{right}</div>;
}

export default async function ControlTowerV2() {
  const [pmoState, issueResults] = await Promise.all([
    fetchPmoState(),
    Promise.all(REPOS.map(async (repo) => [repo, await fetchIssues(repo)] as const)),
  ]);
  const issueMap = Object.fromEntries(issueResults) as Record<Repo, Issue[]>;
  const pmoIssues = issueMap["crabionics-pmo"] ?? [];
  const live = Boolean(pmoState);
  const blockers = pmoIssues.filter((issue) => issue.labels.some((label) => /blocked|blocker|p0/i.test(label)));
  const recentlyUpdated = [...pmoIssues].filter((issue) => issue.updated_at).slice(0, 6);
  const stale = pmoIssues.filter((issue) => (ageDays(issue.updated_at) ?? 0) >= 7).slice(0, 6);
  const strategic = section(pmoState, "Current strategic position");
  const funding = section(pmoState, "Funding boundary — critical");
  const execution = section(pmoState, "Current execution posture");
  const validation = section(pmoState, "Current validation ladder");
  const technology = section(pmoState, "Core technology spine");

  return <main className="relative min-h-screen px-4 pb-20 pt-7 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone={live ? "good" : "warn"}>{live ? "LIVE · PMO BOOT STATE + GITHUB" : "DEGRADED · PMO STATE UNAVAILABLE"}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Crabionics Control Tower</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">A projection of the current PMO state, live governed work and evidence posture. The Control Tower does not create company state.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-300"><div>Source authority</div><a className="mt-1 block font-medium text-cyan-200 underline" href={PMO_STATE_URL} target="_blank" rel="noreferrer">PMO → CURRENT_STATE.md</a></div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">🟢 Company state</div><div className="mt-3 text-xl font-semibold text-white">Technology integration → controlled validation</div><div className="mt-2 text-sm text-slate-300">PMO boot state is authoritative.</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Immediate execution</div><div className="mt-3 text-xl font-semibold text-white">BIRAC M0 → M1</div><div className="mt-2 text-sm text-slate-300">M0 release readiness first; company tracks remain active.</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">600-box</div><div className="mt-3 text-xl font-semibold text-white">Downstream / gated</div><div className="mt-2 text-sm text-slate-300">Not the immediate execution lane.</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Needs attention</div><div className="mt-3 text-2xl font-semibold text-white">{blockers.length || "—"}</div><div className="mt-2 text-sm text-slate-300">Explicit P0/blocker-labelled PMO issues.</div></Card>
      </section>

      <section><SectionTitle eyebrow="Current state" title="What is true now" right={<Badge tone={live ? "good" : "warn"}>{live ? "PMO verified at runtime" : "Verify PMO"}</Badge>} /><Card><p className="whitespace-pre-line text-sm leading-7 text-slate-300">{strategic}</p></Card></section>

      <section><SectionTitle eyebrow="Funding boundary" title="BIRAC is a funded lane, not the whole company" right={<Badge tone="warn">Scope traceable</Badge>} /><Card><p className="whitespace-pre-line text-sm leading-7 text-slate-300">{funding}</p></Card></section>

      <section><SectionTitle eyebrow="Execution" title="What happens next" right={<Badge>Current plan wins</Badge>} /><Card><p className="whitespace-pre-line text-sm leading-7 text-slate-300">{execution}</p></Card></section>

      <section><SectionTitle eyebrow="Validation ladder" title="Gate status" right={<Badge tone="warn">Evidence ≠ implementation</Badge>} /><Card><p className="whitespace-pre-line text-sm leading-7 text-slate-300">{validation}</p></Card></section>

      <section><SectionTitle eyebrow="Technology spine" title="Core technology truth" right={<Badge>Owning repositories remain authoritative</Badge>} /><Card><p className="whitespace-pre-line text-sm leading-7 text-slate-300">{technology}</p></Card></section>

      <section><SectionTitle eyebrow="Evidence discipline" title="Known / Observed / Inferred / Unknown / Needs experiment" /><div className="grid gap-3 md:grid-cols-5"><Card><Badge tone="good">KNOWN</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Recorded in authoritative PMO/repository state.</p></Card><Card><Badge>OBSERVED</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Directly visible in current issues, commits or evidence.</p></Card><Card><Badge tone="warn">INFERRED</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Interpretation derived from observed facts.</p></Card><Card><Badge tone="risk">UNKNOWN</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Not established by the available source.</p></Card><Card><Badge tone="warn">NEEDS EXPERIMENT</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Requires a defined experiment and evidence artifact.</p></Card></div></section>

      <section><SectionTitle eyebrow="Live execution" title="Current governed PMO work" right={<Badge>{pmoIssues.length} open PMO issues</Badge>} /><div className="grid gap-3 md:grid-cols-2">{pmoIssues.slice(0, 10).map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4 hover:bg-white/[0.07]"><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2">{issue.labels.slice(0, 4).map((label) => <Badge key={label} tone={/p0|block/i.test(label) ? "risk" : "neutral"}>{label}</Badge>)}</div><div className="mt-2 text-xs text-slate-500">Updated {ageDays(issue.updated_at) ?? "?"}d ago</div></a>)}{!pmoIssues.length && <Card><p className="text-sm text-slate-300">No live PMO issue feed is available. Do not interpret this as zero open work.</p></Card>}</div></section>

      <section><SectionTitle eyebrow="Risk / attention" title="Explicit signals only" right={<Badge tone={blockers.length ? "risk" : "good"}>{blockers.length ? `${blockers.length} flagged` : "No explicit P0/blocker labels"}</Badge>} /><div className="grid gap-3 md:grid-cols-2">{blockers.slice(0, 8).map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-red-400/15 bg-red-400/[0.04] p-4"><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2">{issue.labels.map((label) => <Badge key={label} tone="risk">{label}</Badge>)}</div></a>)}{stale.length > 0 && <Card><Badge tone="warn">STALE SIGNAL</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{stale.length} open issues have not reported an update for at least 7 days. Staleness is an observation, not proof of blockage.</p></Card>}</div></section>

      <section><SectionTitle eyebrow="Recent movement" title="Observed source changes" right={<Badge>Observed only</Badge>} /><div className="grid gap-3 md:grid-cols-2">{recentlyUpdated.map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4 hover:bg-white/[0.07]"><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 text-xs text-slate-500">Updated {ageDays(issue.updated_at) ?? "?"}d ago</div></a>)}{!recentlyUpdated.length && <Card><p className="text-sm text-slate-300">No timestamped PMO movement available.</p></Card>}</div></section>

      <footer className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400"><strong className="text-white">Control rule:</strong> PMO defines company state; owning repositories define implementation truth; runtime/raw evidence defines operational proof. The Control Tower is only a projection. <a className="text-cyan-200 underline" href={PMO_STATE_URL} target="_blank" rel="noreferrer">Open PMO boot file</a>.</footer>
    </div>
  </main>;
}
