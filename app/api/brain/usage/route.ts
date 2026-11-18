import { brainJson,brainUserId } from "@/app/lib/brain-access";
import { brainStorageAvailable,getBrainUsage } from "@/app/lib/brain-store";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){
 const owner=await brainUserId();if(!owner)return brainJson({error:"Forbidden"},403);
 if(!brainStorageAvailable())return brainJson({error:"Storage unavailable"},503);
 try {return brainJson({usage:await getBrainUsage(owner),providerCreditBalance:null,
   note:"Totals reflect stored Brain runs, not historical CLI sessions or all provider billing. Unpriced runs cannot be treated as zero-cost."});}
 catch{return brainJson({error:"Usage unavailable"},503)}
}
