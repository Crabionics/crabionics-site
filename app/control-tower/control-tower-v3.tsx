import ControlTowerVisualPolish from "./control-tower-visual-polish";
import type { TowerData, TowerIssue } from "./control-tower-tabs";

type Repo = "crabionics-pmo" | "aquaos" | "crabpod" | "habitat" | "crabionics-site";
type IssueFeed = { issues: TowerIssue[]; available: boolean };
const OWNER = "Crabionics";
const REPOS: Repo[] = ["crabionics-pmo", "aquaos", "crabpod", "habitat", "crabionics-site"];
const PMO_STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";
const PMO_YAML_PATH = "00_Governance/PMO/CRABIONICS_STATE.yaml";
const PMO_STATE_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${PMO_STATE_PATH}`;
const PMO_YAML_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${PMO_YAML_PATH}`;

async function githubJson(path: string): Promise<string | null> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${path}?ref=main`, { headers, next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data = await response.json() as { content?: string; encoding?: string };
    if (!data.content || data.encoding !== "base64") return null;
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
  } catch { return null; }
}
async function fetchIssues(repo: Repo): Promise<IssueFeed> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated&direction=desc`, { headers, next: { revalidate: 60 } });
    if (!response.ok) return { issues: [], available: false };
    const data = await response.json() as Array<{ number: number; title: string; state: string; html_url: string; updated_at: string; labels: Array<{ name?: string }>; pull_request?: unknown }>;
    return { available: true, issues: data.filter((item) => !item.pull_request).map((item) => ({ number: item.number, title: item.title, state: item.state, url: item.html_url, updated_at: item.updated_at, labels: item.labels.map((label) => label.name ?? "").filter(Boolean) })) };
  } catch { return { issues: [], available: false }; }
}
function section(markdown: string | null, heading: string): string {
  if (!markdown) return "State unavailable";
  const marker = `## ${heading}`; const start = markdown.indexOf(marker);
  if (start < 0) return "State not recorded";
  const body = markdown.slice(start + marker.length).replace(/^\r?\n/, ""); const next = body.search(/\r?\n## /);
  return (next >= 0 ? body.slice(0, next) : body).trim();
}
function ageDays(updatedAt?: string) { return updatedAt ? Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000) : null; }
export default async function ControlTowerV3() {
  const [pmoState, pmoYaml, issueResults] = await Promise.all([githubJson(PMO_STATE_PATH), githubJson(PMO_YAML_PATH), Promise.all(REPOS.map(async (repo) => [repo, await fetchIssues(repo)] as const))]);
  const issueMap = Object.fromEntries(issueResults) as Record<Repo, IssueFeed>;
  const pmoFeed = issueMap["crabionics-pmo"] ?? { issues: [], available: false };
  const pmoIssues = pmoFeed.issues; const live = Boolean(pmoState); const githubLive = pmoFeed.available;
  const blockers = pmoIssues.filter((issue) => issue.labels.some((label) => /blocked|blocker|p0/i.test(label)));
  const stale = pmoIssues.filter((issue) => (ageDays(issue.updated_at) ?? 0) >= 7).slice(0, 8);
  const recentlyUpdated = pmoIssues.filter((issue) => issue.updated_at).slice(0, 8);
  const data: TowerData = {
    live, githubLive, pmoState, pmoYaml, pmoStateUrl: PMO_STATE_URL, pmoYamlUrl: PMO_YAML_URL,
    strategic: section(pmoState, "Current strategic position"), funding: section(pmoState, "Funding boundary — critical"), execution: section(pmoState, "Current execution posture"), validation: section(pmoState, "Current validation ladder"), technology: section(pmoState, "Core technology spine"),
    issues: pmoIssues, blockers, stale, recentlyUpdated,
    repoIssues: Object.fromEntries(REPOS.map((repo) => [repo, issueMap[repo]?.issues ?? []])) as Record<Repo, TowerIssue[]>,
  };
  return <ControlTowerVisualPolish data={data} />;
}
