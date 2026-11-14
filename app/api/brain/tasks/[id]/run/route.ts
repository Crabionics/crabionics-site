import { randomUUID } from "node:crypto";
import { brainJson,brainSameOrigin,brainUserId } from "@/app/lib/brain-access";
import { acquireBrainRun,brainStorageAvailable,dailyExecutionAllowed,finishBrainRun,getBrainTask,setBrainRunning,type BrainRun } from "@/app/lib/brain-store";
import { brainGatewayConfigured,brainGenerate } from "@/app/lib/brain-gateway";
export const runtime="nodejs";export const dynamic="force-dynamic";export const maxDuration=60;

export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainSameOrigin(request))return brainJson({error:"Cross-origin write blocked"},403);
 if(!brainStorageAvailable())return brainJson({error:"Storage unavailable"},503);
 if(!brainGatewayConfigured())return brainJson({error:"Model execution not enabled. Configure model, provider budget and daily call cap."},503);
 const id=(await params).id;
 let task;try{task=await getBrainTask(owner,id)}catch{return brainJson({error:"Storage unavailable"},503)}
 if(!task)return brainJson({error:"Task not found"},404);
 let lease:string|null;
 try{lease=await acquireBrainRun(owner,id)}catch{return brainJson({error:"Storage unavailable"},503)}
 if(!lease)return brainJson({error:"Another run is already active"},409);
 // The daily cap counts attempts, including failures. Remote model calls are never made before this gate.
 let allowed=false;
 try{allowed=await dailyExecutionAllowed(owner,Number(process.env.BRAIN_MAX_DAILY_CALLS))}
 catch{return brainJson({error:"Execution limit check unavailable; task lease will expire"},503)}
 if(!allowed){
   const denied:BrainRun={id:randomUUID(),taskId:id,occurredAt:new Date().toISOString(),model:null,outcome:"failed",usage:null};
   await finishBrainRun(owner,id,lease,denied,null,"DAILY_LIMIT_REACHED");
   return brainJson({error:"Daily execution limit reached"},429);
 }
 try{if(!await setBrainRunning(owner,id,lease))return brainJson({error:"Task unavailable"},409)}
 catch{return brainJson({error:"Storage unavailable"},503)}
 const runId=randomUUID();
 try{
   const result=await brainGenerate(task.instruction);
   const run:BrainRun={id:runId,taskId:id,occurredAt:new Date().toISOString(),model:result.model,outcome:"completed",usage:result.usage};
   const saved=await finishBrainRun(owner,id,lease,run,result.text,null);
   if(!saved)return brainJson({error:"Run completed but storage result could not be confirmed; check task before retry"},503);
   return brainJson({completed:true,run,task:await getBrainTask(owner,id)});
 }catch(error){
   const message=error instanceof Error?error.message:"MODEL_EXECUTION_FAILED";
   const safe=["GATEWAY_AUTH_OR_POLICY","GATEWAY_QUOTA","GATEWAY_CREDITS","MODEL_PROVIDER_UNAVAILABLE","MODEL_NOT_ENABLED","EMPTY_MODEL_RESULT","TimeoutError"].includes(message)?message:"MODEL_EXECUTION_FAILED";
   const run:BrainRun={id:runId,taskId:id,occurredAt:new Date().toISOString(),model:process.env.BRAIN_AI_MODEL??null,outcome:"failed",usage:null};
   try{await finishBrainRun(owner,id,lease,run,null,safe)}catch{}
   return brainJson({error:safe},502);
 }
}
