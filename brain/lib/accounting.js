'use strict';
/** Pure accounting helpers; do NOT use in-memory state as a multi-user transaction ledger. */
function nonneg(value) {return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null}
function normalizeUsage(raw) {
  if (!raw || typeof raw !== 'object') return {measured:false,inputTokens:null,outputTokens:null,totalTokens:null,cachedInputTokens:null,reasoningTokens:null};
  const inputTokens=nonneg(raw.input_tokens ?? raw.prompt_tokens);
  const outputTokens=nonneg(raw.output_tokens ?? raw.completion_tokens);
  const reportedTotal=nonneg(raw.total_tokens);
  const details=raw.input_tokens_details ?? raw.prompt_tokens_details ?? {};
  const outDetails=raw.output_tokens_details ?? raw.completion_tokens_details ?? {};
  const cachedInputTokens=nonneg(details.cached_tokens ?? raw.cached_input_tokens);
  const reasoningTokens=nonneg(outDetails.reasoning_tokens);
  const measured=inputTokens!==null && outputTokens!==null;
  const totalTokens=reportedTotal ?? (measured?inputTokens+outputTokens:null);
  return {measured,inputTokens,outputTokens,totalTokens,cachedInputTokens,reasoningTokens};
}
function planningEstimate({inputCap,outputCap,requests,inputRateUsdPerMillion,outputRateUsdPerMillion}) {
  const values=[inputCap,outputCap,requests];
  if (!values.every(v=>Number.isSafeInteger(v)&&v>=0)||requests<1)throw new TypeError('Invalid token or request caps');
  if (inputCap>2000000||outputCap>200000||requests>10000)throw new RangeError('Planning limits exceeded');
  const totalTokenCap=(inputCap+outputCap)*requests;
  if (!Number.isSafeInteger(totalTokenCap))throw new RangeError('Unsafe token total');
  const validRate=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
  const costEstimateUsd=validRate(inputRateUsdPerMillion)&&validRate(outputRateUsdPerMillion)
    ? (inputCap*inputRateUsdPerMillion+outputCap*outputRateUsdPerMillion)*requests/1000000
    : null;
  return {totalTokenCap,costEstimateUsd,actualUsage:false,creditBalanceUsd:null};
}
function summarizeEvents(events) {
  if (!Array.isArray(events))throw new TypeError('Events must be an array');
  const seen=new Set();let requests=0,inputTokens=0,outputTokens=0,cachedInputTokens=0,reportedTotalTokens=0,totalCostUsd=0;let missingUsage=0,missingCost=0;
  for(const e of events){
    if(!e||typeof e!=='object')continue;
    const id=String(e.providerRequestId??'');
    if(!id||seen.has(id))continue;
    seen.add(id);requests++;
    const u=normalizeUsage(e.usage);
    if(!u.measured){missingUsage++;continue}
    inputTokens+=u.inputTokens;outputTokens+=u.outputTokens;reportedTotalTokens+=u.totalTokens;
    if(u.cachedInputTokens!==null)cachedInputTokens+=u.cachedInputTokens;
    const c=Number(e.costUsd);
    if(Number.isFinite(c)&&c>=0&&e.costUsd!==null)totalCostUsd+=c;else missingCost++;
  }
  return {requests,inputTokens,outputTokens,cachedInputTokens,reportedTotalTokens,totalCostUsd,missingUsage,missingCost,providerCreditBalanceUsd:null,complete:missingUsage===0&&missingCost===0};
}
function guardBudget({spendLimitUsd,spentUsd,reservedUsd,estimatedWorstCaseUsd}) {
  const vals=[spendLimitUsd,spentUsd,reservedUsd,estimatedWorstCaseUsd];
  if(!vals.every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0))return {allowed:false,reason:'invalid_or_unknown_budget'};
  const remaining=Math.max(0,spendLimitUsd-spentUsd-reservedUsd);
  return {allowed:estimatedWorstCaseUsd<=remaining,remainingUsd:remaining,reason:estimatedWorstCaseUsd<=remaining?'within_planning_budget':'insufficient_reserved_budget'};
}
module.exports={normalizeUsage,planningEstimate,summarizeEvents,guardBudget};
