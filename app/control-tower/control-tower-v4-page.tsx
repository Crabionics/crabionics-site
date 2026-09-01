import FounderCommandCenter from "./founder-command-center-v6";

const OWNER = "Crabionics";
const STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";

async function githubFetch(path: string): Promise<Response> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  return fetch(path, {
    headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: { revalidate: 60 },
  });
}

async function readPmo(path: string): Promise<string | null> {
  const response = await githubFetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${path}?ref=main`);
  if (!response.ok) return null;
  const payload = await response.json() as { content?: string; encoding?: string };
  if (!payload.content || payload.encoding !== "base64") return null;
  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf-8");
}

async function readProcessorIssueOpen(): Promise<boolean | null> {
  const response = await githubFetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/issues/39`);
  if (!response.ok) return null;
  const payload = await response.json() as { state?: string };
  return payload.state === "open" ? true : payload.state === "closed" ? false : null;
}

export default async function ControlTowerV4Page() {
  const [pmoState, processorIssueOpen] = await Promise.all([readPmo(STATE_PATH), readProcessorIssueOpen()]);
  return <FounderCommandCenter pmoState={pmoState} processorIssueOpen={processorIssueOpen} />
}
