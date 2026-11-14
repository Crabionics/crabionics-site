import { brainJson } from "@/app/lib/brain-access";
import { brainGatewayConfigured } from "@/app/lib/brain-gateway";
import { brainStorageAvailable } from "@/app/lib/brain-store";
import { brainUserId } from "@/app/lib/brain-access";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
  if(!await brainUserId())return brainJson({error:"Forbidden"},403);
  return brainJson({service:"brain",stage:"private-r1",
    persistence:brainStorageAvailable()?"configured":"unavailable",
    textExecution:brainGatewayConfigured()?"enabled":"disabled",
    codexAgents:"not_connected",whatsapp:"not_connected",
    historicalCliSessions:"not_imported",
    model:brainGatewayConfigured()?process.env.BRAIN_AI_MODEL:null,
    currency:"USD",providerCreditBalance:null,
    notice:"Execution is model-only text work; no external tools or Codex agent launches."});
}
