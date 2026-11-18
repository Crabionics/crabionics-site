import { brainJson,brainUserId } from "@/app/lib/brain-access";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){
 if(!await brainUserId())return brainJson({error:"Forbidden"},403);
 const token=process.env.CRABIONICS_GITHUB_READ_TOKEN;
 if(!token)return brainJson({available:false,items:[],note:"GitHub source access not connected"});
 try{
  const response=await fetch("https://api.github.com/repos/Crabionics/crabionics-pmo/pulls?state=all&sort=updated&direction=desc&per_page=20",
   {headers:{"Accept":"application/vnd.github+json","Authorization":`Bearer ${token}`,"X-GitHub-Api-Version":"2022-11-28"},
    cache:"no-store",signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw Error("FETCH_FAILED");
  const data=await response.json() as Array<{number:number;title:string;html_url:string;state:string;merged_at:string|null;updated_at:string}>;
  return brainJson({available:true,items:data.slice(0,20).filter(x=>x.html_url?.startsWith("https://github.com/Crabionics/crabionics-pmo/pull/")).map(x=>({
   number:x.number,title:x.title,url:x.html_url,state:x.merged_at?"merged":x.state,updatedAt:x.updated_at
  })),note:"Real GitHub PR history; not a recovered local Codex CLI session."});
 }catch{return brainJson({available:false,items:[],note:"GitHub activity temporarily unavailable"},503)}
}
