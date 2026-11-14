import { randomUUID, createHash } from "node:crypto";
import { redis, storageConfigured } from "@/app/lib/registration-service";

export type BrainStatus = "ready" | "running" | "completed" | "failed";
export type BrainUsage = {
  inputTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
  cachedInputTokens: number | null;
  costUsd: number | null;
};
export type BrainTask = {
  id: string; ownerId: string; title: string; instruction: string; status: BrainStatus;
  createdAt: string; updatedAt: string; runCount: number;
  output: string | null; model: string | null; error: string | null;
  usage: BrainUsage | null;
};
export type BrainRun = {
  id: string; taskId: string; occurredAt: string; model: string | null;
  outcome: "completed" | "failed"; usage: BrainUsage | null;
};

const PREFIX = "crabionics:brain:r1";
const RETAIN_SECONDS = 365 * 24 * 3600;
const safe = (userId: string) => createHash("sha256").update(userId).digest("hex");
const indexKey = (ownerId: string) => `${PREFIX}:user:${safe(ownerId)}:tasks`;
const taskKey = (ownerId: string, id: string) => `${PREFIX}:user:${safe(ownerId)}:task:${id}`;
const runKey = (ownerId: string, id: string) => `${PREFIX}:user:${safe(ownerId)}:run:${id}`;
const runIndexKey = (ownerId: string) => `${PREFIX}:user:${safe(ownerId)}:runs`;
const lockKey = (ownerId: string, id: string) => `${PREFIX}:user:${safe(ownerId)}:lock:${id}`;

export function brainStorageAvailable() { return storageConfigured(); }

export async function createBrainTask(ownerId: string, title: string, instruction: string): Promise<BrainTask> {
  const id = randomUUID(), now = new Date().toISOString();
  const task: BrainTask = { id, ownerId, title, instruction, status:"ready",
    createdAt:now,updatedAt:now,runCount:0,output:null,model:null,error:null,usage:null };
  const script = `if redis.call('ZCARD',KEYS[1])>=200 then return 0 end
redis.call('SET',KEYS[2],ARGV[1],'EX',ARGV[3]);
redis.call('ZADD',KEYS[1],ARGV[2],ARGV[4]);
redis.call('EXPIRE',KEYS[1],ARGV[3]);return 1`;
  const saved = await redis<number>(["EVAL",script,2,indexKey(ownerId),taskKey(ownerId,id),
    JSON.stringify(task),Date.now(),RETAIN_SECONDS,id]);
  if(saved!==1) throw new Error("TASK_LIMIT");
  return task;
}
export async function listBrainTasks(ownerId: string): Promise<BrainTask[]> {
  const ids=await redis<string[]>(["ZREVRANGE",indexKey(ownerId),0,199]);
  if(!Array.isArray(ids)||ids.length===0) return [];
  const rows=await redis<(string|null)[]>(["MGET",...ids.map(id=>taskKey(ownerId,id))]);
  return rows.flatMap(raw=>{
    if(!raw) return [];
    try {const task=JSON.parse(raw) as BrainTask;return task.ownerId===ownerId?[task]:[]}
    catch {return []}
  });
}
export async function getBrainTask(ownerId:string,id:string):Promise<BrainTask|null> {
  if(!/^[a-f0-9-]{36}$/.test(id))return null;
  const raw=await redis<string|null>(["GET",taskKey(ownerId,id)]);
  if(!raw)return null;
  const task=JSON.parse(raw) as BrainTask;
  return task.ownerId===ownerId?task:null;
}
export async function acquireBrainRun(ownerId:string,id:string):Promise<string|null> {
  const key=randomUUID();
  const saved=await redis<string|null>(["SET",lockKey(ownerId,id),key,"NX","EX",120]);
  return saved==="OK"?key:null;
}
export async function setBrainRunning(ownerId:string,id:string,lease:string):Promise<boolean> {
  const script=`if redis.call('GET',KEYS[2])~=ARGV[1] then return 0 end
local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end
local obj=cjson.decode(raw); if obj.ownerId~=ARGV[2] then return 0 end
obj.status='running';obj.error=cjson.null;obj.updatedAt=ARGV[3];
redis.call('SET',KEYS[1],cjson.encode(obj),'KEEPTTL');return 1`;
  return (await redis<number>(["EVAL",script,2,taskKey(ownerId,id),lockKey(ownerId,id),lease,ownerId,new Date().toISOString()]))===1;
}
export async function finishBrainRun(ownerId:string,id:string,lease:string,run:BrainRun,output:string|null,error:string|null):Promise<boolean> {
  const script=`if redis.call('GET',KEYS[2])~=ARGV[1] then return 0 end
local raw=redis.call('GET',KEYS[1]);if not raw then return 0 end
local obj=cjson.decode(raw);if obj.ownerId~=ARGV[2] then return 0 end
obj.status=ARGV[3];obj.output=ARGV[4]~='' and ARGV[4] or cjson.null;
obj.error=ARGV[5]~='' and ARGV[5] or cjson.null;obj.model=ARGV[6]~='' and ARGV[6] or cjson.null;
obj.usage=ARGV[7]~='' and cjson.decode(ARGV[7]) or cjson.null;
obj.runCount=(obj.runCount or 0)+1;obj.updatedAt=ARGV[8];
redis.call('SET',KEYS[1],cjson.encode(obj),'KEEPTTL');
redis.call('SET',KEYS[3],ARGV[9],'EX',ARGV[10]);
redis.call('ZADD',KEYS[4],ARGV[11],ARGV[12]);redis.call('EXPIRE',KEYS[4],ARGV[10]);
redis.call('DEL',KEYS[2]);return 1`;
  return (await redis<number>(["EVAL",script,4,taskKey(ownerId,id),lockKey(ownerId,id),runKey(ownerId,run.id),runIndexKey(ownerId),
    lease,ownerId,run.outcome,output??"",error??"",run.model??"",run.usage?JSON.stringify(run.usage):"",
    new Date().toISOString(),JSON.stringify(run),RETAIN_SECONDS,Date.now(),run.id]))===1;
}
export async function dailyExecutionAllowed(ownerId:string,maxPerDay:number):Promise<boolean>{
  if(!Number.isInteger(maxPerDay)||maxPerDay<1||maxPerDay>100) return false;
  const key=`${PREFIX}:user:${safe(ownerId)}:daily:${new Date().toISOString().slice(0,10)}`;
  const count=await redis<number>(["EVAL",`local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],86400) end;return n`,1,key]);
  return count<=maxPerDay;
}
export async function getBrainUsage(ownerId:string) {
  const ids=await redis<string[]>(["ZREVRANGE",runIndexKey(ownerId),0,499]);
  if(!Array.isArray(ids)||ids.length===0) return { runs:0, measuredRuns:0, inputTokens:0,outputTokens:0,cachedInputTokens:0,costUsd:null as number|null,unpricedRuns:0,failedRuns:0 };
  const rows=await redis<(string|null)[]>(["MGET",...ids.map(id=>runKey(ownerId,id))]);
  let runs=0,measuredRuns=0,inputTokens=0,outputTokens=0,cachedInputTokens=0,costUsd=0,unpricedRuns=0,failedRuns=0,pricedRuns=0;
  for(const raw of rows){if(!raw)continue;try{
    const run=JSON.parse(raw) as BrainRun;runs++;
    if(run.outcome==="failed")failedRuns++;
    if(run.usage?.inputTokens!==null&&run.usage?.inputTokens!==undefined && run.usage?.outputTokens!==null&&run.usage?.outputTokens!==undefined){
      measuredRuns++;inputTokens+=run.usage.inputTokens;outputTokens+=run.usage.outputTokens;
      cachedInputTokens+=run.usage.cachedInputTokens??0;
    }
    if(typeof run.usage?.costUsd==="number"){costUsd+=run.usage.costUsd;pricedRuns++}
    else unpricedRuns++;
  }catch{}}
  return {runs,measuredRuns,inputTokens,outputTokens,cachedInputTokens,costUsd:pricedRuns>0?costUsd:null,unpricedRuns,failedRuns};
}
