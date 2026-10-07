const assert = require("node:assert/strict");
const { test } = require("node:test");
const {
  parseRegistration,
  registrationMessage,
} = require("../.verification/lib/early-access.js");
const { answerQuestion } = require("../.verification/lib/faq-assistant.js");
const { POST } = require("../.verification/api/early-access/route.js");
const { GET, POST: staffAction } = require("../.verification/api/early-access/export/route.js");
const { storageConfigured, redis } = require("../.verification/lib/registration-service.js");
test("Vercel Marketplace Redis credentials connect without copying secrets", async () => {
  const env = { ...process.env };
  const original = global.fetch;
  try {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    process.env.KV_REST_API_URL = "https://marketplace-storage.example";
    process.env.KV_REST_API_TOKEN = "test-marketplace-token";
    assert.equal(storageConfigured(), true);
    global.fetch = async (url, init) => {
      assert.equal(url, "https://marketplace-storage.example");
      assert.equal(init.headers.Authorization, "Bearer test-marketplace-token");
      assert.equal(init.cache, "no-store");
      return Response.json({ result: "PONG" });
    };
    assert.equal(await redis(["PING"]), "PONG");
  } finally {
    global.fetch = original;
    for (const key of Object.keys(process.env)) if (!(key in env)) delete process.env[key];
    Object.assign(process.env, env);
  }
});
const sample = {
  name: "Test Operator",
  email: "operator@example.com",
  role: "Pond grower",
  region: "Odisha",
  setting: "Pond observations",
  interest: "Connected daily operations with AquaOS",
  consent: true,
  updates: false,
  website: "",
};
const req = (body = sample, origin = "https://example.com") =>
  new Request("https://example.com/api/early-access", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
test("registration requires contact permission, rejects injections and preserves optional update consent", () => {
  assert.equal(parseRegistration(sample).updates, false);
  assert.match(
    registrationMessage(parseRegistration(sample)),
    /Optional beta updates: No/,
  );
  assert.ok(parseRegistration({ ...sample, setting: "Pond A\nDaily records" }));
  for (const overrides of [
    { consent: false },
    { updates: "yes" },
    { email: "bad" },
    { name: "x\r\nBcc:someone@example.com" },
    { interest: "invented" },
    { setting: "x".repeat(501) },
    { website: "bot" },
  ])
    assert.equal(parseRegistration({ ...sample, ...overrides }), null);
});
test("assistant uses approved answers and sends unsupported or care-specific questions to the team", () => {
  assert.equal(answerQuestion("How do I join the beta?").id, "beta");
  assert.equal(answerQuestion("What can I try today?").id, "demo");
  assert.match(answerQuestion("pilot pricing").answer, /no standard price/);
  assert.match(
    answerQuestion("My pond crabs are dying what medicine should I use?")
      .answer,
    /cannot diagnose/,
  );
  assert.match(
    answerQuestion("Tell me about the moon").answer,
    /approved answer/,
  );
});
test("unconfigured registration fails honestly and private export requires a token", async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.REGISTRATION_EXPORT_TOKEN;
  assert.equal((await POST(req())).status, 503);
  assert.equal(
    (await POST(req(sample, "https://foreign.example"))).status,
    403,
  );
  assert.equal((await POST(req({ token: "wrong" }))).status, 400);
  assert.equal(
    (await GET(new Request("https://example.com/api/early-access/export")))
      .status,
    401,
  );
});
test("mocked delivery verifies interest once, preserves consent and exposes only authorized confirmed records", async () => {
  const original = global.fetch;
  const env = { ...process.env };
  const memory = new Map();
  const ids = [];
  const emails = [];
  let failMail = false;
  let failTeam = false;
  let duringMail;
  let limit = 1;
  Object.assign(process.env, {
    UPSTASH_REDIS_REST_URL: "https://storage.example",
    UPSTASH_REDIS_REST_TOKEN: "test",
    RESEND_API_KEY: "test",
    CONTACT_FROM_EMAIL: "test@example.com",
    PUBLIC_SITE_URL: "https://example.com",
    REGISTRATION_EXPORT_TOKEN: "test-private-export",
    REGISTRATION_NAMESPACE: "test-beta",
  });
  global.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    if (url === "https://api.resend.com/emails") {
      if (duringMail) { const callback = duringMail; duringMail = null; await callback(); }
      if (failMail || (failTeam && body.to[0] === "info@crabionics.com"))
        return Response.json({ error: "rejected" }, { status: 422 });
      emails.push(body);
      return Response.json({ id: "test-email-id" });
    }
    assert.equal(url, "https://storage.example");
    const [cmd, key, value, ...rest] = body;
    let result;
    if (cmd === "GET") result = memory.get(key) || null;
    else if (cmd === "SET") {
      if (rest.includes("NX") && memory.has(key)) result = null;
      else {
        memory.set(key, value);
        result = "OK";
      }
    } else if (cmd === "EVAL") {
      if (key.includes("INCR")) result = limit;
      else if (key.includes("cjson.decode")) {
        const keys=body.slice(3,7); const [original,state,ttl,notification,id,score]=body.slice(7);
        if (memory.has(keys[2]) || memory.get(keys[0]) !== original) result=0;
        else {
          memory.set(keys[1],state);
          if (notification) {const row=JSON.parse(original); row.notification=notification; memory.set(keys[0],JSON.stringify(row)); const outbox=memory.get(keys[3]) || new Set(); notification === "sent" ? outbox.delete(id) : outbox.add(id); memory.set(keys[3],outbox);}
          result=1;
        }
      }
      else if (key.includes("local current")) {
        const keys = body.slice(3,8); const [record,score,state,id] = body.slice(8);
        if (memory.has(keys[4])) result = null;
        else {
          result = memory.get(keys[0]) || record;
          if (!memory.has(keys[0])) {memory.set(keys[0],record); memory.set(keys[2],state); const outbox=memory.get(keys[3]) || new Set(); outbox.add(id); memory.set(keys[3],outbox);}
          if (!ids.includes(id)) ids.push(id);
        }
      } else if (key.includes("SMEMBERS")) {
        const keys = body.slice(3,9); const id = body[9];
        memory.delete(keys[0]); memory.delete(keys[1]); memory.set(keys[4],"1"); memory.get(keys[3])?.delete(id);
        const position=ids.indexOf(id); if(position>=0) ids.splice(position,1); result=1;
      } else if (key.includes("604800")) {memory.set(body[3],body[6]);memory.set(body[4],body[7]);result=1;}
      else throw new Error("Unknown script");
    } else if (cmd === "DEL") {memory.delete(key); result=1;}
    else if (cmd === "ZREM") result=1;
    else if (cmd === "ZRANGEBYSCORE") result=[];
    else if (cmd === "ZADD") {
      const id = body.at(-1);
      if (!ids.includes(id)) ids.push(id);
      result = 1;
    } else if (cmd === "ZREVRANGE") result = ids;
    else if (cmd === "MGET")
      result = body.slice(1).map((k) => memory.get(k) || null);
    else throw new Error("Unexpected command " + cmd);
    return Response.json({ result });
  };
  try {
    const response = await POST(req());
    assert.equal(response.status, 200);
    assert.equal((await response.json()).verificationRequested, true);
    assert.equal(ids.length, 0);
    assert.equal(emails.length, 1);
    await POST(req());
    assert.equal(emails.length, 1, "email cooldown prevents duplicate verification");
    const token = emails[0].text.match(/token=([a-f0-9]{64})/)[1];
    const expired = await POST(req({ token: "f".repeat(64) }));
    assert.equal(expired.status, 410);
    assert.equal((await (await POST(req({ token }))).json()).confirmed, true);
    assert.equal(ids.length, 1);
    assert.equal(emails.length, 3);
    await POST(req({ token }));
    await POST(req());
    assert.equal(ids.length, 1);
    assert.equal(emails.length, 3);
    const unauthorized = await GET(
      new Request("https://example.com/api/early-access/export"),
    );
    assert.equal(unauthorized.status, 401);
    const csv = await GET(
      new Request("https://example.com/api/early-access/export", {
        headers: { authorization: "Bearer test-private-export" },
      }),
    );
    assert.equal(csv.status, 200);
    assert.match(await csv.text(), /operator@example.com/);
    const review = await GET(
      new Request("https://example.com/api/early-access/export?format=json", {
        headers: { authorization: "Bearer test-private-export" },
      }),
    );
    assert.equal((await review.json()).records[0].updates, false);
    const { retryNotification, digest } = require("../.verification/lib/registration-service.js");
    await POST(req({ ...sample, email: "retry@example.com" }));
    const retryToken = emails.at(-1).text.match(/token=([a-f0-9]{64})/)[1];
    failTeam = true;
    assert.equal((await POST(req({token:retryToken}))).status, 200);
    const retryId = digest("retry@example.com");
    const failed = JSON.parse(memory.get(`test-beta:delivery:${retryId}`));
    assert.equal(failed.team,"pending");
    assert.equal(failed.welcome,"sent", "welcome succeeds independently of team failure");
    const welcomeCount = emails.filter(mail => mail.to[0] === "retry@example.com").length;
    failTeam = false;
    await retryNotification(retryId);
    assert.equal(JSON.parse(memory.get(`test-beta:delivery:${retryId}`)).team,"sent");
    assert.equal(emails.filter(mail => mail.to[0] === "retry@example.com").length,welcomeCount,"retry does not resend accepted welcome");
    // Deletion races an email provider request already in flight. Resolving that
    // request must not recreate the record, delivery state or pending outbox.
    await POST(req({...sample,email:"race@example.com"}));
    const raceToken=emails.at(-1).text.match(/token=([a-f0-9]{64})/)[1];
    const raceId=digest("race@example.com");
    duringMail = async () => {
      const response=await staffAction(new Request("https://example.com/api/early-access/export", {method:"POST",headers:{origin:"https://example.com",authorization:"Bearer test-private-export","content-type":"application/json"},body:JSON.stringify({action:"delete",email:"race@example.com"})}));
      assert.equal(response.status,200);
    };
    assert.equal((await POST(req({token:raceToken}))).status,200);
    assert.equal(memory.has(`test-beta:record:${raceId}`),false,"in-flight retry cannot recreate deleted personal data");
    assert.equal(memory.has(`test-beta:delivery:${raceId}`),false,"in-flight retry cannot recreate delivery state");
    assert.equal(ids.includes(raceId),false,"deleted registration remains absent from index");
    assert.equal(memory.get("test-beta:outbox")?.has(raceId),false,"in-flight retry cannot requeue a deleted registration");
    assert.equal(emails.some(mail => mail.to[0] === "race@example.com" && mail.subject.includes("confirmed")),false,"next recipient is skipped after deletion");
    limit = 6;
    assert.equal((await POST(req())).status, 429);
    limit = 1;
    failMail = true;
    assert.equal(
      (await POST(req({ ...sample, email: "second@example.com" }))).status,
      502,
    );
    assert.equal(ids.length, 2);
    const deletion = await staffAction(new Request("https://example.com/api/early-access/export", {method:"POST", headers:{origin:"https://example.com", authorization:"Bearer test-private-export","content-type":"application/json"},body:JSON.stringify({action:"delete",email:"retry@example.com"})}));
    assert.equal(deletion.status,200);
    assert.equal(ids.length,1);
    failMail = false;
    assert.equal((await POST(req({token:retryToken}))).status,410,"deleted registration cannot be recreated by old confirmation link");
  } finally {
    global.fetch = original;
    for (const key of Object.keys(process.env))
      if (!(key in env)) delete process.env[key];
    Object.assign(process.env, env);
  }
});
