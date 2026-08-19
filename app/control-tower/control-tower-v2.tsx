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
type EvidenceClass = "KNOWN" | "OBSERVED" | "INFERRED" | "UNKNOWN";

const OWNER = "Crabionics";
const REPOS: Repo[] = ["crabionics-pmo", "aquaos", "crabpod", "habitat", "crabionics-site"];

const FALLBACK_ISSUES: Issue[] = [
  { number: 79, title: "CF-008: Crabionics Control Tower — Live CEO/Mentor/Investor Dashboard", state: "open", labels: ["P0", "Control-Tower"], url: "https://github.com/Crabionics/crabionics-pmo/issues/79" },
  { number: 78, title: "CF-007: Capital Strategy & Institutional Funding Readiness Gate", state: "open", labels: ["PMO", "Funding"], url: "https://github.com/Crabionics/crabionics-pmo/issues/78" },
  { number: 68, title: "CF-003-T01: Execute cross-repository identity contract tests", state: "open", labels: ["Validation"], url: "https://github.com/Crabionics/crabionics-pmo/issues/68" },
  { number: 66, title: "CF-005: Produce integrated Crabionics release baseline and evidence package", state: "open", labels: ["Release", "Evidence"], url: "https://github.com/Crabionics/crabionics-pmo/issues/66" },
];

async function fetchIssues(repo: Repo): Promise<Issue[]> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  if (!token) return [];

  const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated&direction=desc`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) return [];
  const data = await response.json() as Array<{
    number: number; title: string; state: string; html_url: string; updated_at: string;
    labels: Array<{ name?: string }>; pull_request?: unknown;
  }>;

  return data.filter((item) => !item.pull_request).map((item) => ({
    number: item.number,
    title: item.title,
    state: item.state,
    url: item.html_url,
    updated_at: item.updated_at,
    labels: item.labels.map((label) => label.name ?? "").filter(Boolean),
  }));
}

async function getLiveState() {
  const results = await Promise.all(REPOS.map(async (repo) => [repo, await fetchIssues(repo)] as const));
  const issueMap = Object.fromEntries(results) as Record<Repo, Issue[]>;
  const pmoIssues = issueMap["crabionics-pmo"] ?? [];
  return { live: pmoIssues.length > 0, issueMap };
}

function classify(issue: Issue): EvidenceClass {
  if (issue.updated_at) return "OBSERVED";
  return "KNOWN";
}

function ageDays(updatedAt?: string) {
  if (!updatedAt) return null;
  return Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000);
}

function toneForEvidence(value: EvidenceClass) {
  return value === "KNOWN" ? "good" : value === "OBSERVED" ? "neutral" : value === "INFERRED" ? "warn" : "risk";
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "risk" }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${tone === "good" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : tone === "warn" ? "border-amber-400/25 bg-amber-400/10 text-amber-200" : tone === "risk" ? "border-red-400/25 bg-red-400/10 text-red-200" : "border-white/10 bg-white/5 text-slate-300"}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, right }: { eyebrow: string; title: string; right?: React.ReactNode }) {
  return <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">{eyebrow}</div><h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2></div>{right}</div>;
}

export default async function ControlTowerV2() {
  const { live, issueMap } = await getLiveState();
  const pmoIssues = live ? issueMap["crabionics-pmo"] : FALLBACK_ISSUES;
  const blockers = pmoIssues.filter((issue) => issue.labels.some((label) => /blocked|blocker|p0/i.test(label)));
  const stale = pmoIssues.filter((issue) => (ageDays(issue.updated_at) ?? 0) >= 7).slice(0, 6);
  const recentlyUpdated = [...pmoIssues].filter((issue) => issue.updated_at).sort((a, b) => new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime()).slice(0, 6);
  const currentGate = pmoIssues.find((issue) => issue.title.includes("AOS-011")) ? "AOS-011" : "AOS-008 → AOS-011";

  const risks = blockers.slice(0, 5).map((issue) => ({
    issue,
    observed: `Governed issue #${issue.number} is explicitly labelled ${issue.labels.filter((label) => /blocked|blocker|p0/i.test(label)).join(", ") || "priority"}.`,
    inferred: "The work represented by this issue may be constraining the next company milestone.",
    unknown: "The live issue feed does not establish the exact dependency, owner-level cause, or recovery date.",
    decision: "Treat as attention-required until the dependency and recovery path are evidenced.",
  }));

  return <main className="relative min-h-screen px-4 pb-20 pt-7 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge tone={live ? "good" : "warn"}>{live ? "LIVE · PMO/GITHUB" : "DEGRADED · FALLBACK STATE"}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Crabionics Control Tower</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Executive state, risk retirement, evidence movement and live governed work — without collapsing evidence into interpretation.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-300"><div>Source authority</div><div className="mt-1 font-medium text-white">PMO → owning repositories</div></div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">🟢 Executive status</div><div className="mt-3 text-2xl font-semibold text-white">Evidence-gated</div><div className="mt-2 text-sm text-slate-300">Current gate: {currentGate}</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Next irreversible milestone</div><div className="mt-3 text-2xl font-semibold text-white">600-box validation</div><div className="mt-2 text-sm text-slate-300">Biology + technology + economics + demand</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">⚠️ Needs attention</div><div className="mt-3 text-2xl font-semibold text-white">{blockers.length || "—"}</div><div className="mt-2 text-sm text-slate-300">Explicitly labelled governed issues</div></Card>
        <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Data posture</div><div className="mt-3 text-2xl font-semibold text-white">{live ? "Live" : "Fallback"}</div><div className="mt-2 text-sm text-slate-300">No new database; projection only</div></Card>
      </section>

      <section><SectionTitle eyebrow="Evidence discipline" title="Known / Observed / Inferred / Unknown" right={<Badge>Evidence ≠ interpretation ≠ decision</Badge>} /><div className="grid gap-3 md:grid-cols-4"><Card><Badge tone="good">KNOWN</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Architecture and source authority already established by the application and PMO model.</p></Card><Card><Badge>OBSERVED</Badge><p className="mt-3 text-sm leading-6 text-slate-300">Open PMO/owning-repository issues and their labels, timestamps and links.</p></Card><Card><Badge tone="warn">INFERRED</Badge><p className="mt-3 text-sm leading-6 text-slate-300">A priority or stale issue may constrain a milestone; this is interpretation, not evidence.</p></Card><Card><Badge tone="risk">UNKNOWN</Badge><p className="mt-3 text-sm leading-6 text-slate-300">The issue feed alone cannot prove root cause, recovery date, or whether a dependency is actually blocking.</p></Card></div></section>

      <section><SectionTitle eyebrow="🧭 Risk-retirement chain" title="From evidence to decision" right={<Badge tone="warn">No fabricated causes</Badge>} /><div className="space-y-3">{risks.length ? risks.map(({issue, observed, inferred, unknown, decision}) => <Card key={issue.number}><div className="flex flex-col gap-4 lg:grid lg:grid-cols-4"><div><Badge>OBSERVED</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{observed}</p><a className="mt-2 inline-block text-xs text-cyan-200 underline" href={issue.url} target="_blank" rel="noreferrer">Open evidence #{issue.number}</a></div><div><Badge tone="warn">INFERRED</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{inferred}</p></div><div><Badge tone="risk">UNKNOWN</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{unknown}</p></div><div><Badge tone="warn">DECISION / RISK</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{decision}</p></div></div></Card>) : <Card><p className="text-sm text-slate-300">No explicitly blocked or P0 issues are present in the live feed. That is not evidence that all risks are retired.</p></Card>}</div></section>

      <section><SectionTitle eyebrow="🔄 What changed" title="Recent movement in the live source" right={<Badge>Observed only</Badge>} /><div className="grid gap-3 md:grid-cols-2">{recentlyUpdated.map((issue) => <a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4 hover:bg-white/[0.07]"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2">{issue.labels.slice(0,4).map((label)=><Badge key={label}>{label}</Badge>)}</div></div><span className="shrink-0 text-xs text-slate-500">{ageDays(issue.updated_at) ?? "?"}d</span></div></a>)}{!recentlyUpdated.length && <Card><p className="text-sm text-slate-300">No timestamped movement is available from the current source.</p></Card>}</div></section>

      <section><SectionTitle eyebrow="⚠️ What needs attention" title="Attention queue" right={<Badge tone={blockers.length ? "risk" : "good"}>{blockers.length ? `${blockers.length} flagged` : "No explicit blockers"}</Badge>} /><div className="grid gap-3 md:grid-cols-2">{blockers.slice(0,8).map((issue)=><a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-red-400/15 bg-red-400/[0.04] p-4"><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2">{issue.labels.map((label)=><Badge key={label} tone={/p0|block/i.test(label)?"risk":"neutral"}>{label}</Badge>)}</div></a>)}{stale.length > 0 && <Card><Badge tone="warn">STALE SIGNAL</Badge><p className="mt-2 text-sm leading-6 text-slate-300">{stale.length} open issues have not reported an update for at least 7 days. Staleness is an observation, not proof of blockage.</p></Card>}</div></section>

      <section><SectionTitle eyebrow="💰 Capital → evidence sequence" title="Funding follows proof" right={<Badge tone="warn">Decision layer</Badge>} /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["01","Non-dilutive / experimental","BIRAC + grants + founder resources"],["02","Strategic validation","Paid PoCs / co-funded experiments"],["03","Commercial capital","₹1–2 Cr after commercial evidence"],["04","Institutional scale","NABVENTURES / AgriSURE later"]].map(([n,title,sub])=><Card key={n}><div className="text-xs text-slate-500">{n}</div><div className="mt-3 font-semibold text-white">{title}</div><div className="mt-1 text-sm leading-6 text-slate-400">{sub}</div></Card>)}</div><div className="mt-3 rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100">Capital stage is a decision sequence, not live funding evidence. The live PMO source remains authoritative for actual gates and evidence.</div></section>

      <section><SectionTitle eyebrow="🔗 Live PMO / GitHub work" title="Current governed work" right={<Badge>{pmoIssues.length} open PMO items</Badge>} /><div className="grid gap-3 md:grid-cols-2">{pmoIssues.slice(0,10).map(issue=><a key={issue.number} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.045] p-4 hover:bg-white/[0.07]"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2"><Badge>{classify(issue)}</Badge>{issue.labels.slice(0,3).map(label=><Badge key={label}>{label}</Badge>)}</div></div><span className="text-xs text-slate-500">OPEN</span></div></a>)}</div></section>

      <section><SectionTitle eyebrow="📱 Mentor / investor view" title="60-second decision surface" /><Card><div className="grid gap-5 md:grid-cols-3"><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">What is true</div><p className="mt-2 text-sm leading-6 text-slate-300">The system is a projection of live PMO/GitHub evidence, with no new persistence layer.</p></div><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">What is at risk</div><p className="mt-2 text-sm leading-6 text-slate-300">Explicit priority/blocker signals are surfaced without inventing root causes.</p></div><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">What unlocks next</div><p className="mt-2 text-sm leading-6 text-slate-300">Evidence that retires the active technical and commercial gates, then capital sequencing follows.</p></div></div></Card></section>
    </div>
  </main>;
}
