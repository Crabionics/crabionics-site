const assert = require("node:assert/strict");
const { test } = require("node:test");
const {
  parseEnquiry,
  enquiryMessage,
} = require("../.verification/lib/enquiry.js");
const { POST } = require("../.verification/api/enquiry/route.js");
const sample = {
  topic: "production",
  name: "Test Operator",
  email: "operator@example.com",
  organisation: "Test Farm",
  region: "Test Region",
  role: "Pond grower",
  message: "We would like to discuss our pond records and pilot scope.",
  website: "",
};
function request(body = sample, overrides = {}) {
  return new Request("https://www.crabionics.com/api/enquiry", {
    method: "POST",
    headers: {
      origin: "https://www.crabionics.com",
      "content-type": "application/json",
      "x-forwarded-for": "test-" + Math.random(),
      ...overrides,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
test("enquiry validation preserves the production context and rejects invalid or excessive input", () => {
  const { data } = parseEnquiry({ ...sample, name: "  Test Operator  " });
  assert.equal(data.name, "Test Operator");
  assert.match(enquiryMessage(data), /Operating role: Pond grower/);
  for (const overrides of [
    { topic: "__proto__" },
    { email: "not-an-email" },
    { email: "operator@example.com\r\nBcc: spam@example.com" },
    { name: "" },
    { message: "short" },
    { message: "x".repeat(1501) },
    { website: "spam" },
    { region: "" },
  ])
    assert.ok(parseEnquiry({ ...sample, ...overrides }).error);
});
test("route rejects foreign origins, malformed bodies and invalid enquiries before delivery", async () => {
  assert.equal(
    (await POST(request(sample, { origin: "https://foreign.example" }))).status,
    403,
  );
  assert.equal(
    (await POST(request(sample, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal((await POST(request("x".repeat(20001)))).status, 413);
  assert.equal(
    (await POST(request({ ...sample, topic: "unsupported" }))).status,
    400,
  );
});
test("unconfigured delivery never claims success", async () => {
  const key = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  try {
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.equal((await response.json()).sent, undefined);
  } finally {
    if (key) process.env.RESEND_API_KEY = key;
    if (sender) process.env.CONTACT_FROM_EMAIL = sender;
  }
});
test("provider success, rejection and missing receipt are handled without sending real email", async () => {
  const originalFetch = global.fetch;
  const key = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM_EMAIL;
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_FROM_EMAIL = "test@example.com";
  try {
    global.fetch = async (url, init) => {
      assert.equal(url, "https://api.resend.com/emails");
      const body = JSON.parse(init.body);
      assert.deepEqual(body.to, ["info@crabionics.com"]);
      assert.equal(body.reply_to, sample.email);
      assert.match(body.text, /pond records/);
      return Response.json({ id: "test-message-id" });
    };
    assert.deepEqual(await (await POST(request())).json(), { sent: true });
    global.fetch = async () =>
      Response.json({ error: "rejected" }, { status: 422 });
    assert.equal((await POST(request())).status, 502);
    global.fetch = async () => Response.json({});
    assert.equal((await POST(request())).status, 502);
    global.fetch = async () => {
      throw new Error("network failure");
    };
    assert.equal((await POST(request())).status, 502);
    global.fetch = async () => Response.json({ id: "test-message-id" });
    const headers = { "x-forwarded-for": "rate-limit-test" };
    for (let i = 0; i < 5; i++)
      assert.equal((await POST(request(sample, headers))).status, 200);
    assert.equal((await POST(request(sample, headers))).status, 429);
  } finally {
    global.fetch = originalFetch;
    if (key) process.env.RESEND_API_KEY = key;
    else delete process.env.RESEND_API_KEY;
    if (sender) process.env.CONTACT_FROM_EMAIL = sender;
    else delete process.env.CONTACT_FROM_EMAIL;
  }
});
