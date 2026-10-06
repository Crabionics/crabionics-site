export const topics = {
  production: "Pond / finishing partnership",
  market: "Buyer / cluster requirements",
  technical: "Technical scope",
  research: "Research partnership",
  "aquaos-beta": "AquaOS grow-out beta interest",
  institutions: "Government / institutional collaboration",
  investors: "Company / investment",
} as const;
export type Topic = keyof typeof topics;
export type Enquiry = {
  topic: Topic;
  name: string;
  email: string;
  organisation: string;
  region: string;
  role: string;
  message: string;
};
export function parseEnquiry(input: unknown): {
  data?: Enquiry;
  error?: string;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please check the enquiry details." };
  const raw = input as Record<string, unknown>;
  if (raw.website)
    return { error: "Please use the email link to contact the team." };
  const limits = {
    name: 100,
    email: 254,
    organisation: 150,
    region: 100,
    role: 100,
    message: 1500,
  };
  const values: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    if (typeof raw[key] !== "string")
      return { error: "Please check the enquiry details." };
    const value = raw[key].trim();
    if (value.length > max || (key !== "message" && /[\r\n\u0000]/.test(value)))
      return {
        error: "Please shorten the details or remove invalid characters.",
      };
    values[key] = value;
  }
  if (
    !values.name ||
    !values.region ||
    !values.role ||
    values.message.length < 10
  )
    return {
      error: "Include your name, region, role and a short production question.",
    };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return { error: "Please enter a valid email address." };
  if (typeof raw.topic !== "string" || !Object.hasOwn(topics, raw.topic))
    return { error: "Choose an enquiry topic." };
  return { data: { ...values, topic: raw.topic as Topic } as Enquiry };
}
export function enquiryMessage(data: Enquiry) {
  return `Enquiry: ${topics[data.topic]}\n\nName: ${data.name}\nEmail: ${data.email}\nOrganisation: ${data.organisation || "Not specified"}\nRegion: ${data.region}\nOperating role: ${data.role}\n\nProduction setting / question:\n${data.message}`;
}
