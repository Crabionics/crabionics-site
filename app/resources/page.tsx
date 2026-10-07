import type { Metadata } from "next";
import {
  CTA,
  Eyebrow,
  TextLink,
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
        <div className={s.heading}>
          <div><Eyebrow>The question behind the work</Eyebrow><h2>What would make mud-crab production work at scale?</h2></div>
          <p>Seed, survival, growth, water, labour and buyer requirements shape the answer. A box count or a dashboard alone cannot explain a production model.</p>
        </div>
        <div className={s.three}>
          {[
            ["Understand the setting", "Hatchery, nursery, pond grow-out and finishing each solve a different production problem.", "/producers", "Explore production settings"],
            ["Connect the daily work", "See how AquaOS is being developed to connect observations, operator decisions, actions and outcomes.", "/aquaos", "Understand AquaOS"],
            ["Bring your question", "Already operating or planning a project? Share your stage, region and biggest bottleneck.", "/contact#production", "Discuss your production problem"],
          ].map(([title, body, href, label]) => <article className={s.card} key={title}><div className={s.cardBody}><h3>{title}</h3><p>{body}</p><TextLink href={href}>{label}</TextLink></div></article>)}
        </div>
      </Section>
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
