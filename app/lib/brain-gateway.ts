import type { BrainUsage } from "./brain-store";

type GatewayBody = {
  id?: string;
  choices?: Array<{message?:{content?:string|null}}>;
  usage?:{ prompt_tokens?:number; completion_tokens?:number; total_tokens?:number;
    prompt_tokens_details?:{cached_tokens?:number};
    input_tokens?:number;output_tokens?:number; input_tokens_details?:{cached_tokens?:number};
    cost?:number };
  providerMetadata?:{gateway?:{cost?:number}};
  provider_metadata?:{gateway?:{cost?:number}};
};
export function brainGatewayConfigured() {
  return process.env.BRAIN_RUNS_ENABLED==="1"
    && Boolean(process.env.BRAIN_AI_MODEL)
    && Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)
    && Number.isInteger(Number(process.env.BRAIN_MAX_DAILY_CALLS))
    && Number(process.env.BRAIN_MAX_DAILY_CALLS)>=1
    && Number(process.env.BRAIN_MAX_DAILY_CALLS)<=100;
}
export function brainUsage(raw:GatewayBody):BrainUsage {
  const positive=(value:unknown):number|null=>typeof value==="number"&&Number.isSafeInteger(value)&&value>=0?value:null;
  const u=raw.usage;
  const input=positive(u?.prompt_tokens??u?.input_tokens);
  const output=positive(u?.completion_tokens??u?.output_tokens);
  const total=positive(u?.total_tokens)??(input!==null&&output!==null?input+output:null);
  const cached=positive(u?.prompt_tokens_details?.cached_tokens??u?.input_tokens_details?.cached_tokens);
  const costValue=raw.providerMetadata?.gateway?.cost??raw.provider_metadata?.gateway?.cost??u?.cost;
  const cost=typeof costValue==="number"&&Number.isFinite(costValue)&&costValue>=0?costValue:null;
  return {inputTokens:input,outputTokens:output,totalTokens:total,cachedInputTokens:cached,costUsd:cost};
}
export async function brainGenerate(instruction:string):Promise<{text:string;model:string;usage:BrainUsage;requestId:string|null}> {
  if(!brainGatewayConfigured())throw Error("MODEL_NOT_ENABLED");
  const auth=process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  const model=process.env.BRAIN_AI_MODEL!;
  const request=await fetch("https://ai-gateway.vercel.sh/v1/chat/completions",{
    method:"POST",cache:"no-store",
    headers:{"Authorization":`Bearer ${auth}`,"Content-Type":"application/json"},
    body:JSON.stringify({model,
      max_completion_tokens:1024,
      messages:[
        {role:"system",content:"You are a bounded text-work assistant. Produce a useful deliverable for the user's task. You have no tool access and cannot inspect live company documents, run code, execute agents, send messages, or change external systems. Never claim such actions occurred. Mark missing evidence and assumptions clearly. Avoid private data beyond what the user provided. Be structured and practical."},
        {role:"user",content:instruction}
      ]}),
    signal:AbortSignal.timeout(45000)
  });
  if(!request.ok){
    if([401,403].includes(request.status))throw Error("GATEWAY_AUTH_OR_POLICY");
    if(request.status===429)throw Error("GATEWAY_QUOTA");
    if(request.status===402)throw Error("GATEWAY_CREDITS");
    throw Error("MODEL_PROVIDER_UNAVAILABLE");
  }
  const data=await request.json() as GatewayBody;
  const text=data.choices?.[0]?.message?.content;
  if(typeof text!=="string"||!text.trim())throw Error("EMPTY_MODEL_RESULT");
  return {text:text.slice(0,24000),model,usage:brainUsage(data),requestId:data.id??null};
}
