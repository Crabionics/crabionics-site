const assert = require("node:assert/strict");
const {test} = require("node:test");
const funnel = require("../.verification/api/funnel/route.js");
const recovery = require("../.verification/api/registration-recovery/route.js");
const {readFunnel} = require("../.verification/lib/funnel.js");
test("journey counts reject foreign requests and unapproved fields, and private totals require access", async () => {
  const saved = {...process.env};
  try {
    process.env.KV_REST_API_URL="https://storage.example";
    process.env.KV_REST_API_TOKEN="test";
    delete process.env.REGISTRATION_EXPORT_TOKEN;
    delete process.env.REGISTRATION_STAFF_USER_IDS;
    const request=(origin,body)=>new Request("https://example.com/api/funnel", {method:"POST",headers:{origin},body:JSON.stringify(body)});
    assert.equal((await funnel.POST(request("https://foreign.example",{event:"view",page:"home",source:"direct"}))).status,403);
    assert.equal((await funnel.POST(request("https://example.com",{event:"operator@example.com",page:"home",source:"direct"}))).status,400);
    assert.equal((await funnel.GET(new Request("https://example.com/api/funnel"))).status,401);
    assert.equal((await recovery.GET(new Request("https://example.com/api/registration-recovery"))).status,401);
  } finally { for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key]; Object.assign(process.env,saved); }
});
test("private journey read handles both Redis hash formats without visitor identifiers", async () => {
  const saved = {...process.env}; const original=global.fetch;
  try {
    process.env.KV_REST_API_URL="https://storage.example"; process.env.KV_REST_API_TOKEN="test";
    delete process.env.UPSTASH_REDIS_REST_URL; delete process.env.UPSTASH_REDIS_REST_TOKEN;
    let counter=0;
    global.fetch=async()=>Response.json({result:counter++ % 2 ? {"youtube:aquaos:view":"2"} : ["direct:home:view","3"]});
    const days=await readFunnel();
    assert.equal(days.length,30);
    assert.equal(days[0].counts["direct:home:view"],3);
    assert.equal(days[1].counts["youtube:aquaos:view"],2);
    assert.deepEqual(Object.keys(days[0]),["date","counts"]);
  } finally {global.fetch=original; for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key]; Object.assign(process.env,saved);}
});
test("discovery events persist only closed aggregate dimensions", async () => {
  const saved={...process.env}; const original=global.fetch; const commands=[];
  try {
    process.env.KV_REST_API_URL="https://storage.example"; process.env.KV_REST_API_TOKEN="test";
    delete process.env.UPSTASH_REDIS_REST_URL; delete process.env.UPSTASH_REDIS_REST_TOKEN;
    global.fetch=async(_url,init)=>{commands.push(JSON.parse(init.body));return Response.json({result:1});};
    for(const event of ["teaser_view","teaser_start","teaser_overview","teaser_change","teaser_history","teaser_complete","guided_demo_click","registration_click"]){
      const response=await funnel.POST(new Request("https://example.com/api/funnel",{method:"POST",headers:{origin:"https://example.com"},body:JSON.stringify({event,page:"aquaos",source:"direct"})}));
      assert.equal(response.status,204);
      assert.equal(commands.at(-1).at(-1),`direct:aquaos:${event}`);
    }
    assert.equal(commands.filter(command=>command[0]==="EVAL"&&command.at(-1)==="direct:aquaos:teaser_complete").length,1);
    assert.ok(!JSON.stringify(commands).includes("email"));
  } finally {global.fetch=original; for(const key of Object.keys(process.env)) if(!(key in saved)) delete process.env[key];Object.assign(process.env,saved);}
});
