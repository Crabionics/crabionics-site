import { brainJson,brainUserId } from "@/app/lib/brain-access";
import { getBrainTask,brainStorageAvailable } from "@/app/lib/brain-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{id:string}>}){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainStorageAvailable())return brainJson({error:"Storage unavailable"},503);
 try{const task=await getBrainTask(owner,(await params).id);return task?brainJson({task}):brainJson({error:"Not found"},404)}
 catch{return brainJson({error:"Storage unavailable"},503)}
}
