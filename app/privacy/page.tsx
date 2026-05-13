import type { Metadata } from "next";

import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Crabionics covering data collection, usage, retention, security, and contact rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Crabionics Privacy Policy",
    description: "How Crabionics handles personal information and privacy rights.",
    url: "https://crabionics.com/privacy",
    type: "website",
  },
};

const effectiveDate = "May 13, 2026";

export default function PrivacyPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-4xl">
            <h1>Privacy Policy</h1>
            <p className="mt-6 text-lg">Effective date: {effectiveDate}</p>
            <p className="mt-6 max-w-3xl text-lg">This policy explains how Crabionics collects, uses, stores, and protects personal information when you interact with our website and communications channels.</p>
          </div>
        </div>
      </section>
      <SectionWrapper>
        <article className="glass-card mx-auto max-w-5xl space-y-10 p-8 lg:p-12">
          {[
            ["1. Information We Collect", "We may collect contact details, professional information, communication content, and basic technical data such as browser type, pages visited, and referral source."],
            ["2. How We Use Information", "We use information to respond to inquiries, evaluate partnerships and hiring applications, improve site performance, maintain security, and meet legal obligations."],
            ["3. Legal Basis and Consent", "Where required, we process personal information based on consent, contractual necessity, legitimate interests, and legal compliance."],
            ["4. Data Sharing", "We do not sell personal information. We may share limited data with trusted service providers for hosting, analytics, or communications support under appropriate safeguards."],
            ["5. Data Retention", "We retain information only for as long as required to fulfill the purpose for which it was collected, resolve disputes, and comply with legal or accounting obligations."],
            ["6. Security", "We use administrative, technical, and organizational measures to protect data. No online transmission or storage system can be guaranteed as absolutely secure."],
            ["7. Your Rights", "Depending on your jurisdiction, you may request access, correction, deletion, restriction, or portability of personal information, and you may object to certain processing activities."],
            ["8. International Transfers", "If information is processed across borders, we apply reasonable measures designed to protect data consistent with applicable privacy requirements."],
            ["9. Children's Privacy", "Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children."],
            ["10. Policy Updates", "We may update this policy from time to time. Material changes will be posted on this page with an updated effective date."],
            ["11. Contact", "For privacy requests or questions, contact: sameer@crabionics.com."],
          ].map(([title, body]) => (
            <section key={title}>
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 text-slate-300">{body}</p>
            </section>
          ))}
        </article>
      </SectionWrapper>
    </main>
  );
}
