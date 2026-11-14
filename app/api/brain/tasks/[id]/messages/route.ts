import { brainJson,brainSameOrigin,brainUserId } from "@/app/lib/brain-access";
import { appendBrainFollowup,brainStorageAvailable,getBrainTask } from "@/app/lib/brain-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainSameOrigin(request))return brainJson({error:"Cross-origin write blocked"},403);
 if(!brainStorageAvailable())return brainJson({error:"Storage unavailable"},503);
 if(!request.headers.get("content-type")?.includes("application/json"))return brainJson({error:"JSON required"},415);
 const raw=await request.text();if(raw.length>2500)return brainJson({error:"Too long"},413);
 let data:Record<string,unknown>;try{data=JSON.parse(raw)}catch{return brainJson({error:"Invalid JSON"},400)}
 const message=typeof data.message==="string"?data.message.trim():"";
 if(message.length<3||message.length>2000)return brainJson({error:"Message must be 3–2000 characters"},400);
 const id=(await params).id;
 try{
  if(!await appendBrainFollowup(owner,id,message))return brainJson({error:"Task not found, already running or message limit reached"},409);
  return brainJson({task:await getBrainTask(owner,id)});
 }catch{return brainJson({error:"Storage unavailable"},503)}
}
