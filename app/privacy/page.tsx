import type { Metadata } from "next";

import { Page, Section } from "@/app/components/public/Experience";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Crabionics covering data collection, usage, retention, security, and contact rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Crabionics Privacy Policy",
    description:
      "How Crabionics handles personal information and privacy rights.",
    url: "https://www.crabionics.com/privacy",
    type: "website",
  },
};

const effectiveDate = "October 7, 2026";

export default function PrivacyPage() {
  return (
    <Page name="legal">
      <section className="relative overflow-hidden border-b border-teal-900/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-4xl">
            <h1>Privacy Policy</h1>
            <p className="mt-6 text-lg">Effective date: {effectiveDate}</p>
            <p className="mt-6 max-w-3xl text-lg">
              This policy explains how Crabionics collects, uses, stores, and
              protects personal information when you interact with our website
              and communications channels.
            </p>
          </div>
        </div>
      </section>
      <Section tone="mist">
        <article className="mx-auto max-w-5xl space-y-10 rounded-2xl bg-white p-8 lg:p-12">
          <section>
            <h2>Anonymous website journey counts</h2>
            <p>Vercel Web Analytics provides aggregate traffic, referral and device information for public pages. Vercel Speed Insights samples public-page performance. We exclude private, API and email-confirmation pages, remove query strings and fragments before reporting page URLs, and do not send form values. Do Not Track and Global Privacy Control requests disable this reporting.</p>
            <p>We count visits and steps such as opening AquaOS, attempting an enquiry and requesting email verification. These are aggregate daily counts by page and broad source (direct, YouTube, LinkedIn or other), retained for 90 days. We do not attach them to your registration, store your questions or form contents in analytics, or use tracking cookies. A source category may be kept in this browser tab’s session storage. Do Not Track and Global Privacy Control requests disable these counts. Temporary hashed network addresses used to limit automated analytics requests expire after one minute.</p>
          </section>
          <section>
            <h2>Early access and the website assistant</h2>
            <p>
              Early-access interest includes your name, email, role, region,
              selected interest and optional production context. Direct
              registration, when enabled, uses private storage and email
              verification. Pending verification details expire after seven
              days; confirmed records expire after one year unless you ask for
              removal sooner. Optional progress updates have a separate choice.
              You may request an update or removal at info@crabionics.com.
            </p>
            <p>
              In preview email mode, the website prepares a message but does not
              submit or store your registration. The FAQ assistant answers
              locally from approved content; questions are not sent to an AI
              provider or stored by Crabionics.
            </p>
          </section>
          {[
            [
              "1. Information We Collect",
              "We may collect contact details, professional information, communication content, and basic technical data such as browser type, pages visited, and referral source.",
            ],
            [
              "2. How We Use Information",
              "We use information to respond to inquiries, evaluate partnerships and hiring applications, improve site performance, maintain security, and meet legal obligations.",
            ],
            [
              "3. Legal Basis and Consent",
              "Where required, we process personal information based on consent, contractual necessity, legitimate interests, and legal compliance.",
            ],
            [
              "4. Data Sharing",
              "We do not sell personal information. We may share limited data with trusted service providers for hosting, analytics, or communications support under appropriate safeguards.",
            ],
            [
              "5. Data Retention",
              "We retain information only for as long as required to fulfill the purpose for which it was collected, resolve disputes, and comply with legal or accounting obligations.",
            ],
            [
              "6. Security",
              "We use administrative, technical, and organizational measures to protect data. No online transmission or storage system can be guaranteed as absolutely secure.",
            ],
            [
              "7. Your Rights",
              "Depending on your jurisdiction, you may request access, correction, deletion, restriction, or portability of personal information, and you may object to certain processing activities.",
            ],
            [
              "8. International Transfers",
              "If information is processed across borders, we apply reasonable measures designed to protect data consistent with applicable privacy requirements.",
            ],
            [
              "9. Children's Privacy",
              "Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children.",
            ],
            [
              "10. Policy Updates",
              "We may update this policy from time to time. Material changes will be posted on this page with an updated effective date.",
            ],
            [
              "11. Contact",
              "For privacy requests or questions, contact: info@crabionics.com.",
            ],
          ].map(([title, body]) => (
            <section key={title}>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4">{body}</p>
            </section>
          ))}
        </article>
      </Section>
    </Page>
  );
}
