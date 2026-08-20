import type { Metadata } from "next";

import SectionWrapper from "@/app/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Crabionics website including permitted use, intellectual property, disclaimers, liability limits, and governing law.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Crabionics Terms of Use",
    description: "Website use terms and legal conditions for access to Crabionics content.",
    url: "https://crabionics.com/terms",
    type: "website",
  },
};

const effectiveDate = "May 13, 2026";

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="container-shell py-24 lg:py-32">
          <div className="max-w-4xl">
            <h1>Terms of Use</h1>
            <p className="mt-6 text-lg">Effective date: {effectiveDate}</p>
            <p className="mt-6 max-w-3xl text-lg">These terms govern your access to and use of the Crabionics website. By using this website, you agree to these terms.</p>
          </div>
        </div>
      </section>
      <SectionWrapper>
        <article className="glass-card mx-auto max-w-5xl space-y-10 p-8 lg:p-12">
          {[
            ["1. Acceptance of Terms", "By accessing this website, you acknowledge that you have read and agreed to these terms and all applicable laws."],
            ["2. Permitted Use", "You may use this site for lawful informational purposes. You agree not to misuse the website, attempt unauthorized access, or interfere with its operation."],
            ["3. Intellectual Property", "All website content, branding, graphics, and text are owned by Crabionics or its licensors and are protected by applicable intellectual property laws."],
            ["4. No Professional Advice", "Information on this site is provided for general informational purposes and does not constitute investment, legal, engineering, or other professional advice."],
            ["5. Third-Party Links", "The website may include links to external resources. Crabionics is not responsible for third-party content, security, or privacy practices."],
            ["6. Disclaimer of Warranties", "This website is provided on an 'as is' and 'as available' basis without warranties of any kind, express or implied."],
            ["7. Limitation of Liability", "To the maximum extent permitted by law, Crabionics shall not be liable for indirect, incidental, special, or consequential damages arising from website use."],
            ["8. Indemnification", "You agree to indemnify and hold harmless Crabionics from claims, liabilities, damages, and expenses resulting from your misuse of the website or violation of these terms."],
            ["9. Changes to Terms", "We may revise these terms at any time. Updated terms will be posted on this page with the revised effective date."],
            ["10. Governing Law", "These terms are governed by applicable laws of India, without regard to conflict-of-law principles."],
            ["11. Contact", "For legal notices or questions regarding these terms, contact: sameer@crabionics.com."],
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
