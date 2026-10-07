import { enquiryMessage, parseEnquiry, topics } from "../../lib/enquiry";
import { deliveryConfigured } from "../../lib/enquiry-delivery";
import { digest, limited, sendMail, storageConfigured } from "../../lib/registration-service";
export const runtime = "nodejs";
const recent = new Map<string, { count: number; until: number }>();
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const respond = (body: object, status: number) =>
    Response.json(body, { status, headers });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return respond({ error: "Please send the enquiry from the website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return respond({ error: "Please check the enquiry format." }, 415);
  const text = await request.text();
  if (text.length > 20000)
    return respond({ error: "Please shorten the enquiry." }, 413);
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return respond({ error: "Please check the enquiry details." }, 400);
  }
  const { data, error } = parseEnquiry(input);
  if (!data) return respond({ error }, 400);
  if (!deliveryConfigured())
    return respond(
      {
        error:
          "Direct delivery is not connected yet. Please use the email option.",
      },
      503,
    );
  const now = Date.now();
  if (storageConfigured()) {
    try {
      if (await limited(request))
        return respond(
          { error: "Please wait a few minutes before trying again." },
          429,
        );
    } catch {
      return respond(
        {
          error:
            "Delivery is temporarily unavailable. Please use the email option.",
        },
        503,
      );
    }
  }
  for (const [key, value] of recent) if (value.until < now) recent.delete(key);
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const current = recent.get(ip);
  if (current && current.count >= 5)
    return respond(
      {
        error:
          "Please wait a few minutes before trying again, or email the team.",
      },
      429,
    );
  recent.set(ip, {
    count: (current?.count || 0) + 1,
    until: current?.until || now + 300000,
  });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: ["info@crabionics.com"],
        reply_to: data.email,
        subject: `Website enquiry: ${topics[data.topic]}`,
        text: enquiryMessage(data),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return respond(
        {
          error:
            "Delivery could not be confirmed. Please use the email option.",
        },
        502,
      );
    const receipt: unknown = await response.json();
    if (
      !receipt ||
      typeof receipt !== "object" ||
      !("id" in receipt) ||
      typeof receipt.id !== "string" ||
      !receipt.id
    )
      return respond(
        {
          error:
            "Delivery could not be confirmed. Please use the email option.",
        },
        502,
      );
    let acknowledgement = false;
    try {
      await sendMail(
        data.email,
        "We received your Crabionics enquiry",
        `Hello ${data.name},\n\nThank you for sharing your production setting with Crabionics. We received your enquiry about ${topics[data.topic]}. The team will review it and reply to discuss fit and next steps. Trial scope, cost and timing are agreed individually.\n\nYou can reply to this email to add context.\n\nCrabionics team`,
        `enquiry-ack-${digest(receipt.id)}`,
      );
      acknowledgement = true;
    } catch {
      /* Team delivery succeeded; acknowledgement failure must not cause duplicate enquiries. */
    }
    return respond({ sent: true, acknowledgement }, 200);
  } catch {
    return respond(
      {
        error: "Delivery could not be confirmed. Please use the email option.",
      },
      502,
    );
  }
}
