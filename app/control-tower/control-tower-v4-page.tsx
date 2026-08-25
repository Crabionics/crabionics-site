import ControlTowerV4 from "./control-tower-v4";

type TowerData = Parameters<typeof ControlTowerV4>[0]["data"];
const OWNER = "Crabionics";
const STATE_PATH = "00_Governance/PMO/CURRENT_STATE.md";
const STATE_URL = `https://github.com/${OWNER}/crabionics-pmo/blob/main/${STATE_PATH}`;

async function readPmo(path: string): Promise<string | null> {
  const token = process.env.CRABIONICS_GITHUB_READ_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${OWNER}/crabionics-pmo/contents/${path}?ref=main`, {
    headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: { revalidate: 60 },
  });
  if (!response.ok) return null;
  const payload = await response.json() as { content?: string; encoding?: string };
  if (!payload.content || payload.encoding !== "base64") return null;
  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf-8");
}

export default async function ControlTowerV4Page() {
  const pmoState = await readPmo(STATE_PATH);
  const data: TowerData = {
    live: Boolean(pmoState),
    githubLive: Boolean(pmoState),
    pmoState,
    pmoStateUrl: STATE_URL,
    validation: "",
    technology: "",
  };
  return <ControlTowerV4 data={data} />;
}
