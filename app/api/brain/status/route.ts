import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Intentionally reports unavailable metrics; no confidential data or secrets. */
export async function GET() {
 return NextResponse.json({service:"crabionics-brain",mode:"preview",aiExecution:{enabled:false},sourceRetrieval:{enabled:false},sharedSessions:{enabled:false},providerUsage:{available:false,inputTokens:null,outputTokens:null,cachedInputTokens:null,costUsd:null},whatsApp:{enabled:false}},
 {headers:{"Cache-Control":"no-store, max-age=0","X-Content-Type-Options":"nosniff"}});
}
