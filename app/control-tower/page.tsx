import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description:
    "Live CEO, mentor and investor view of Crabionics company state, evidence and gates.",
  alternates: { canonical: "/control-tower" },
};

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

const FALLBACK_ISSUES: Issue[] = [
  {
    number: 79,
    title: "CF-008: Crabionics Control Tower — Live CEO/Mentor/Investor Dashboard",
    state: "open",
    labels: ["P0", "Control-Tower"],
    url: "https://github.com/Crabionics/crabionics-pmo/issues/79",
  },
  {
    number: 78,
    title: "CF-007: Capital Strategy & Institutional Funding Readiness Gate",
    state: "open",
    labels: ["PMO", "Funding"],
    url: "https://github.com/Crabionics/crabionics-pmo/issues/78",
  },
  {
    number: 68,
    title: "CF-003-T01: Execute cross-repository identity contract tests",
    state: "open",
    labels: ["Validation"],
    url: "https://github.com/Crabionics/crabionics-pmo/issues/68",
  },
  {
    number: 66,
    title: "CF-005: Produce integrated Crabionics release baseline and evidence package",
    state: "open",
    labels: ["Release", "Evidence"],
    url: "https://github.com/Crabionics/crabionics-pmo/issues/66",
  },
];

async function fetchIssues(repo: Repo): Promise<Issue[]> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  if (!token) return [];

  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated&direction=desc`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) return [];

  const data = (await response.json()) as Array<{
    number: number;
    title: string;
    state: string;
    html_url: string;
    updated_at: string;
    labels: Array<{ name?: string }>;
    pull_request?: unknown;
  }>;

  return data
    .filter((item) => !item.pull_request)
    .map((item) => ({
      number: item.number,
      title: item.title,
      state: item.state,
      url: item.html_url,
      updated_at: item.updated_at,
      labels: item.labels.map((label) => label.name ?? "").filter(Boolean),
    }));
}

async function getLiveState() {
  const repos: Repo[] = ["crabionics-pmo", "aquaos", "crabpod", "habitat", "crabionics-site"];
  const results = await Promise.all(repos.map(async (repo) => [repo, await fetchIssues(repo)] as const));
  const issueMap = Object.fromEntries(results);
  const pmoIssues = issueMap["crabionics-pmo"];
  const live = pmoIssues.length > 0;
  return { live, issueMap };
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "risk" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${
      tone === "good"
        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
        : tone === "warn"
          ? "border-amber-400/25 bg-amber-400/10 text-amber-200"
          : tone === "risk"
            ? "border-red-400/25 bg-red-400/10 text-red-200"
            : "border-white/10 bg-white/5 text-slate-300"
    }`}>
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function statusTone(status: string) {
  if (status === "PROVEN") return "good" as const;
  if (status === "IN VALIDATION") return "warn" as const;
  if (status === "NOT PROVEN") return "risk" as const;
  return "neutral" as const;
}

export default async function ControlTowerPage() {
  const { live, issueMap } = await getLiveState();
  const pmoIssues = live ? issueMap["crabionics-pmo"] : FALLBACK_ISSUES;

  const currentGate = pmoIssues.find((issue) => issue.title.includes("AOS-011"))
    ? "AOS-011"
    : "AOS-008 → AOS-011";

  const blockers = pmoIssues.filter((issue) =>
    issue.labels.some((label) => /blocked|blocker|p0/i.test(label))
  );

  return (
    <main className="relative min-h-screen px-5 pb-20 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone={live ? "good" : "warn"}>{live ? "LIVE · PMO/GITHUB" : "DEGRADED · FALLBACK STATE"}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Crabionics Control Tower</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
              One screen for the company state: what exists, what is being validated, what is not proven,
              what gate is active, and what evidence unlocks the next stage.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-300">
            <div>Source authority</div>
            <div className="mt-1 font-medium text-white">PMO → owning repositories</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Current gate</div>
            <div className="mt-3 text-2xl font-semibold text-white">{currentGate}</div>
            <div className="mt-2 text-sm text-slate-300">Technical integration evidence</div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Next irreversible milestone</div>
            <div className="mt-3 text-2xl font-semibold text-white">600-box validation</div>
            <div className="mt-2 text-sm text-slate-300">Biology + technology + economics + demand</div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Capital stage</div>
            <div className="mt-3 text-2xl font-semibold text-white">Evidence first</div>
            <div className="mt-2 text-sm text-slate-300">AgriSURE / NABVENTURES parked for later stage</div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Top blockers</div>
            <div className="mt-3 text-2xl font-semibold text-white">{blockers.length || "—"}</div>
            <div className="mt-2 text-sm text-slate-300">Explicitly labelled in governed issues</div>
          </Card>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Company progression</div>
              <h2 className="mt-2 text-2xl font-semibold text-white">How the pieces fit together</h2>
            </div>
            <Badge>ROADMAP · EVIDENCE-GATED</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {[
              ["01", "Field learning", "Biology + operations", "PROVEN"],
              ["02", "Infrastructure", "Habitat / RAS", "PROVEN"],
              ["03", "Operational layer", "CrabPod + AquaOS", "IN VALIDATION"],
              ["04", "Decision intelligence", "Prediction → action", "IN VALIDATION"],
              ["05", "Network intelligence", "Cross-deployment learning", "NOT PROVEN"],
            ].map(([n, title, sub, state]) => (
              <Card key={n} className="relative overflow-hidden">
                <div className="text-xs text-slate-500">{n}</div>
                <div className="mt-3 font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-slate-400">{sub}</div>
                <div className="mt-4"><Badge tone={statusTone(state)}>{state}</Badge></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Evidence state</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">What is real vs what is still a hypothesis</h2>
            <div className="mt-5 space-y-3">
              {[
                ["Controlled production learning", "PROVEN"],
                ["Technical architecture / contracts", "IN VALIDATION"],
                ["Runtime closed-loop integration", "IN VALIDATION"],
                ["Repeatable commercial economics", "NOT PROVEN"],
                ["Customer willingness-to-pay at scale", "NOT PROVEN"],
                ["Platform / network moat", "HYPOTHESIS"],
              ].map(([label, state]) => (
                <div key={label} className="flex flex-col gap-2 rounded-xl border border-white/8 bg-black/10 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-200">{label}</span>
                  <Badge tone={statusTone(state)}>{state}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Commercial convergence</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">600-box pilot</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">The pilot only clears commercial validation when all four gates are independently supported.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Biology", "Technology", "Economics", "Commercial demand"].map((gate) => (
                <div key={gate} className="rounded-xl border border-white/8 bg-black/10 p-4">
                  <div className="font-medium text-white">{gate}</div>
                  <div className="mt-2"><Badge tone="warn">PENDING EVIDENCE</Badge></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100">
              4/4 = Commercial Validation Gate Cleared. 3/4 = Partial Validation, not full commercial proof.
            </div>
          </Card>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Capital follows evidence</div>
              <h2 className="mt-2 text-2xl font-semibold text-white">Funding sequence</h2>
            </div>
            <Badge tone="warn">PARKED AT INSTITUTIONAL STAGE</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["01", "Non-dilutive / experimental", "BIRAC + grants + founder resources"],
              ["02", "Strategic validation", "Paid PoCs / co-funded experiments"],
              ["03", "Commercial capital", "₹1–2 Cr after commercial evidence"],
              ["04", "Institutional scale", "NABVENTURES / AgriSURE later"],
            ].map(([n, title, sub]) => (
              <Card key={n}>
                <div className="text-xs text-slate-500">{n}</div>
                <div className="mt-3 font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-slate-400">{sub}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Live PMO</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">Current governed work</h2>
              </div>
              <Badge>{pmoIssues.length} open items</Badge>
            </div>
            <div className="mt-5 space-y-3">
              {pmoIssues.slice(0, 8).map((issue) => (
                <a key={`${issue.number}-${issue.url}`} href={issue.url} target="_blank" rel="noreferrer" className="block rounded-xl border border-white/8 bg-black/10 p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="font-medium text-white">#{issue.number} · {issue.title}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {issue.labels.slice(0, 4).map((label) => <Badge key={label}>{label}</Badge>)}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">OPEN</span>
                  </div>
                </a>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">60-second mentor view</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">The company in one paragraph</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Crabionics started from the operational reality of mud-crab farming and is evolving into controlled
              aquaculture production infrastructure with a biological operating layer. The immediate work is not to
              claim autonomous intelligence; it is to prove a reliable chain from physical production and telemetry
              through events, state, decisions and actions. The next irreversible milestone is commercial convergence
              across biology, technology, economics and customer demand.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href="https://github.com/Crabionics/crabionics-pmo/issues/79" target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-sm font-medium text-cyan-100 hover:bg-cyan-300/10">Open PMO Control Tower Issue</a>
              <a href="https://github.com/Crabionics/crabionics-pmo" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10">Open PMO Repository</a>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
