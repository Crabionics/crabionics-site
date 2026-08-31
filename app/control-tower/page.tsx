import type { Metadata } from "next";
import FounderCommandCenter from "./founder-command-center";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description: "Crabionics founder decision workspace grounded in current PMO evidence.",
  alternates: { canonical: "/control-tower" },
};

const OWNER = "Crabionics";
const STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";
const STATE_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${STATE_PATH}`;

async function githubFetch(path: string): Promise<Response> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  return fetch(path, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });
}

async function readPmo(path: string): Promise<string | null> {
  const response = await githubFetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${path}?ref=main`);
  if (!response.ok) return null;
  const payload = (await response.json()) as { content?: string; encoding?: string };
  if (!payload.content || payload.encoding !== "base64") return null;
  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf-8");
}

async function readIssueState(issueNumber: number): Promise<boolean | null> {
  const response = await githubFetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/issues/${issueNumber}`);
  if (!response.ok) return null;
  const payload = (await response.json()) as { state?: string };
  return payload.state === "open" ? true : payload.state === "closed" ? false : null;
}

export default async function ControlTowerPage() {
  const [pmoState, processorIssueOpen] = await Promise.all([readPmo(STATE_PATH), readIssueState(39)]);
  return (
    <FounderCommandCenter
      pmoState={pmoState}
      processorIssueOpen={processorIssueOpen}
      pmoStateUrl={STATE_URL}
    />
  );
}
