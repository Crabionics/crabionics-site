export const interests = [
  "Connected daily operations with AquaOS",
  "Controlled finishing",
  "Buyer / cluster partnership",
  "Research collaboration",
] as const;
export type Registration = {
  name: string;
  email: string;
  role: string;
  region: string;
  setting: string;
  interest: string;
  updates: boolean;
  consent: true;
};
export function parseRegistration(input: unknown): Registration | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const lengths: Record<string, number> = {
    name: 100,
    email: 254,
    role: 100,
    region: 100,
    setting: 500,
    interest: 100,
  };
  if (raw.website || raw.consent !== true || typeof raw.updates !== "boolean")
    return null;
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(lengths)) {
    const value = raw[key];
    if (
      typeof value !== "string" ||
      value.length > max ||
      (key === "setting"
        ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/
        : /[\x00-\x1f\x7f]/
      ).test(value)
    )
      return null;
    fields[key] = value.trim();
  }
  if (
    !fields.name ||
    !fields.role ||
    !fields.region ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ||
    !interests.includes(fields.interest as (typeof interests)[number])
  )
    return null;
  return {
    ...fields,
    email: fields.email.toLowerCase(),
    updates: raw.updates,
    consent: true,
  } as Registration;
}
export function registrationMessage(data: Registration) {
  return `AquaOS early-access interest\n\nName: ${data.name}\nEmail: ${data.email}\nRole: ${data.role}\nRegion: ${data.region}\nInterest: ${data.interest}\nSetting: ${data.setting || "Not specified"}\n\nContact about early access: Yes\nOptional beta updates: ${data.updates ? "Yes" : "No"}`;
}
