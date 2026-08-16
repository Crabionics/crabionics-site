import "server-only";

import type { Role } from "./roles";

export type Issue = {
  number: number;
  title: string;
  state: "open" | "closed";
  labels: string[];
  url: string;
  updatedAt: string;
};

export type RoleIssue = Omit<Issue, "url"> & { url?: string };

export type RepoStatus = {
  repo: string;
  openIssues: number;
};

export type ControlTowerState = {
  live: boolean;
  lastUpdated: string;
  pmoIssues: Issue[];
  repoStatus: RepoStatus[];
};

const OWNER = "Crabionics";
const REPOS = ["crabionics-pmo", "aquaos", "crabpod", "habitat"] as const;

const FALLBACK: Issue[] = [
  { number: 79, title: "CF-008: Crabionics Control Tower — Live CEO/Mentor/Investor Dashboard", state: "open", labels: ["P0", "Control-Tower"], url: "https://github.com/Crabionics/crabionics-pmo/issues/79", updatedAt: "" },
  { number: 68, title: "CF-003-T01: Execute cross-repository identity contract tests", state: "open", labels: ["Validation"], url: "https://github.com/Crabionics/crabionics-pmo/issues/68", updatedAt: "" },
  { number: 62, title: "Crabionics Foundation Baseline — cross-repository build programme", state: "open", labels: ["Foundation", "PMO"], url: "https://github.com/Crabionics/crabionics-pmo/issues/62", updatedAt: "" },
];

async function githubIssues(repo: string): Promise<Issue[]> {
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

  const data = (await response.json()) as Array<{
    number: number;
    title: string;
    state: "open" | "closed";
    html_url: string;
    updated_at: string;
    labels: Array<{ name?: string }>;
    pull_request?: unknown;
  }>;

  return data.filter((item) => !item.pull_request).map((item) => ({
    number: item.number,
    title: item.title,
    state: item.state,
    labels: item.labels.map((label) => label.name ?? "").filter(Boolean),
    url: item.html_url,
    updatedAt: item.updated_at,
  }));
}

export async function getControlTowerState(): Promise<ControlTowerState> {
  const results = await Promise.all(REPOS.map(async (repo) => [repo, await githubIssues(repo)] as const));
  const pmoIssues = results.find(([repo]) => repo === "crabionics-pmo")?.[1] ?? [];
  const live = pmoIssues.length > 0;

  return {
    live,
    lastUpdated: new Date().toISOString(),
    pmoIssues: live ? pmoIssues : FALLBACK,
    repoStatus: results.map(([repo, issues]) => ({ repo, openIssues: issues.length })),
  };
}

export function filterStateForRole(state: ControlTowerState, role: Role): {
  live: boolean;
  lastUpdated: string;
  pmoIssues: RoleIssue[];
  repoStatus: RepoStatus[];
  blockers: Issue[];
} {
  const permissions = {
    admin: { blockers: true, technical: true, links: true },
    mentor: { blockers: true, technical: true, links: false },
    investor: { blockers: false, technical: false, links: false },
    team: { blockers: true, technical: true, links: true },
  }[role];

  const blockers = state.pmoIssues.filter((issue) => issue.labels.some((label) => /blocked|blocker|p0/i.test(label)));
  const pmoIssues: RoleIssue[] = state.pmoIssues.map((issue) => ({
    number: issue.number,
    title: issue.title,
    state: issue.state,
    labels: issue.labels,
    updatedAt: issue.updatedAt,
    ...(permissions.links ? { url: issue.url } : {}),
  }));

  return {
    live: state.live,
    lastUpdated: state.lastUpdated,
    pmoIssues,
    repoStatus: permissions.technical ? state.repoStatus : [],
    blockers: permissions.blockers ? blockers : [],
  };
}
