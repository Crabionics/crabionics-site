import { timingSafeEqual } from "node:crypto";
import {
  namespace,
  redis,
  type StoredRegistration,
} from "../../../lib/registration-service";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const configured = process.env.REGISTRATION_EXPORT_TOKEN;
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (
    !configured ||
    Buffer.byteLength(provided) !== Buffer.byteLength(configured) ||
    !timingSafeEqual(Buffer.from(provided), Buffer.from(configured))
  )
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  try {
    const ids = await redis<string[]>([
      "ZREVRANGE",
      `${namespace()}:confirmed`,
      0,
      999,
    ]);
    const rows = ids.length
      ? await redis<(string | null)[]>([
          "MGET",
          ...ids.map((id) => `${namespace()}:record:${id}`),
        ])
      : [];
    const records = rows
      .filter((row): row is string => Boolean(row))
      .map((row) => JSON.parse(row) as StoredRegistration)
      .filter((row) => row.status === "confirmed");
    if (new URL(request.url).searchParams.get("format") === "json")
      return Response.json(
        { records },
        { headers: { "Cache-Control": "no-store" } },
      );
    const fields = [
      "name",
      "email",
      "role",
      "region",
      "interest",
      "setting",
      "updates",
      "createdAt",
      "confirmedAt",
      "notification",
    ] as const;
    const cell = (value: unknown) =>
      '"' +
      String(value ?? "")
        .replace(/^\s*[=+@-]/, "'$&")
        .replaceAll('"', '""') +
      '"';
    const csv = [
      fields.join(","),
      ...records.map((row) =>
        fields.map((field) => cell(row[field])).join(","),
      ),
    ].join("\r\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=early-access.csv",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Export unavailable", { status: 503 });
  }
}
