import type { Metadata } from "next";
import {
  CTA,
  Intro,
  Page,
  ResourceCards,
  Section,
  styles as s,
} from "../components/public/Experience";
import { BetaDirection } from "../components/public/Visuals";
export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical guides to mud-crab production partnerships, operating records and planning controlled-finishing intake.",
  alternates: { canonical: "/resources" },
};
export default function ResourcesPage() {
  return (
    <Page name="resources">
      <Intro
        eyebrow="Resources / Production & partnership guides"
        title="Useful context for the work ahead."
      >
        <p className={s.lead}>
          Start with practical guides to the production setting, operating
          relationship and questions that shape a useful pilot.
        </p>
      </Intro>
      <Section>
        <ResourceCards />
        <div className={s.note}>
          <p>
            These guides explain the production and partnership approach.
            Field notes, production breakdowns and research updates will be published when
            there is evidence from a defined setting to share.
          </p>
        </div>
      </Section>
      <BetaDirection />
      <CTA />
    </Page>
  );
}
