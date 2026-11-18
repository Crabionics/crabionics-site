import { brainJson,brainSameOrigin,brainUserId } from "@/app/lib/brain-access";
import { createBrainTask,listBrainTasks,brainStorageAvailable } from "@/app/lib/brain-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainStorageAvailable())return brainJson({error:"Storage not configured"},503);
 try{return brainJson({tasks:await listBrainTasks(owner)})}catch{return brainJson({error:"Storage unavailable"},503)}
}
export async function POST(req:Request){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainSameOrigin(req))return brainJson({error:"Cross-origin write blocked"},403);
 if(!req.headers.get("content-type")?.includes("application/json"))return brainJson({error:"JSON required"},415);
 const bodyText=await req.text();if(bodyText.length>6500)return brainJson({error:"Task too long"},413);
 let body:Record<string,unknown>;try{body=JSON.parse(bodyText)}catch{return brainJson({error:"Invalid JSON"},400)}
 const title=typeof body.title==="string"?body.title.trim():"";
 const instruction=typeof body.instruction==="string"?body.instruction.trim():"";
 if(title.length<3||title.length>100||instruction.length<8||instruction.length>5000)return brainJson({error:"Title (3–100) and instructions (8–5000) required"},400);
 if(!brainStorageAvailable())return brainJson({error:"Storage not configured"},503);
 try{return brainJson({task:await createBrainTask(owner,title,instruction)},201)}
 catch(e){return brainJson({error:e instanceof Error&&e.message==="TASK_LIMIT"?"Task limit reached":"Storage unavailable"},503)}
}
