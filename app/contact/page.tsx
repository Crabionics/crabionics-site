import type { Metadata } from "next";
import {
  Eyebrow,
  Intro,
  Page,
  Section,
  styles as s,
} from "../components/public/Experience";
import EnquiryForm from "../components/public/EnquiryForm";
import { topics } from "../lib/enquiry";
import { deliveryConfigured } from "../lib/enquiry-delivery";
export const metadata: Metadata = {
  title: "Discuss a Partnership",
  description:
    "Start a production, technical, research or AquaOS conversation with Crabionics. Prepare an enquiry with your operating role, region and production question.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <Page name="contact">
      <Intro
        eyebrow="Talk to Crabionics"
        title="Let’s start with your setting."
      >
        <p className={s.lead}>
          Tell us about your work and the question you want to explore. Choose a
          conversation below and prepare your enquiry.
        </p>
      </Intro>
      <Section>
        <div className={s.split} style={{ alignItems: "start" }}>
          <div>
            <Eyebrow>Choose a conversation</Eyebrow>
            <h2>Bring the question that matters to you.</h2>
            <nav aria-label="Enquiry topics" className={s.checklist}>
              {Object.entries(topics).map(([id, label]) => (
                <a key={id} href={`#${id}`} className={s.textLink}>
                  {label} <span aria-hidden="true">→</span>
                </a>
              ))}
            </nav>
            <div className={s.note}>
              <p>
                Prefer a direct email?
                <br />
                <a className={s.textLink} href="mailto:info@crabionics.com">
                  info@crabionics.com
                </a>
              </p>
            </div>
            <h3 style={{ marginTop: 36 }}>What happens next?</h3>
            <p>
              The team reviews the production setting and discusses fit,
              responsibilities and useful measurements. Trial scope, costs and
              timing are agreed individually.
            </p>
          </div>
          <div>
            {Object.keys(topics).map((id) => (
              <span
                key={id}
                id={id}
                style={{ display: "block", scrollMarginTop: 110 }}
                aria-hidden="true"
              />
            ))}
            <EnquiryForm deliveryEnabled={deliveryConfigured()} />
          </div>
        </div>
      </Section>
    </Page>
  );
}
