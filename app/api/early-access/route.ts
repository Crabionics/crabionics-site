import { parseRegistration } from "../../lib/early-access";
import {
  confirm,
  limited,
  register,
  registrationConfigured,
  operation,
} from "../../lib/registration-service";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const reply = (body: object, status = 200) =>
    Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ error: "Please use the website form." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Invalid format." }, 415);
  const text = await request.text();
  if (text.length > 6000)
    return reply({ error: "Please shorten the details." }, 413);
  let input;
  try {
    input = JSON.parse(text);
  } catch {
    return reply({ error: "Please check the details." }, 400);
  }
  const isConfirmation = input && typeof input === "object" && "token" in input;
  if (
    isConfirmation &&
    (typeof input.token !== "string" || !/^[a-f0-9]{64}$/.test(input.token))
  )
    return reply({ error: "Invalid confirmation link." }, 400);
  const data = isConfirmation ? null : parseRegistration(input);
  if (!isConfirmation && !data)
    return reply(
      { error: "Please check the required fields and consent." },
      400,
    );
  if (!registrationConfigured())
    return reply(
      {
        error:
          "Registration delivery is not connected in this preview. Use the email option.",
      },
      503,
    );
  try {
    if (await limited(request, isConfirmation ? "confirmation" : "signup"))
      return reply(
        { error: "Please wait a few minutes before trying again." },
        429,
      );
    if (isConfirmation)
      return (await confirm(input.token))
        ? reply({ confirmed: true })
        : reply(
            { error: "This link has expired. Please register again." },
            410,
          );
    await register(data!);
    return reply({ verificationRequested: true });
  } catch {
    operation("request_failed", { purpose: isConfirmation ? "confirmation" : "signup" });
    return reply(
      {
        error:
          "We could not complete this request. Please try again or email info@crabionics.com.",
      },
      502,
    );
  }
}
