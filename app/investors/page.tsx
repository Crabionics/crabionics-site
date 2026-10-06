import type { Metadata } from "next";
import {
  Button,
  CTA,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  TextLink,
  styles as s,
} from "../components/public/Experience";
export const metadata: Metadata = {
  title: "Investors",
  description:
    "Crabionics’ production infrastructure thesis, integrated-prototype work and development path towards production validation and wider deployment.",
  alternates: { canonical: "/investors" },
};
export default function InvestorsPage() {
  return (
    <Page name="investors">
      <Intro
        eyebrow="Company / Investors"
        title="Building the infrastructure for mud-crab aquaculture."
        aside={
          <ImagePanel
            src="/images/versioned/company-world-medium.f49975f0.webp"
            alt="Concept illustration of connected mud-crab production infrastructure."
            caption="Concept illustration"
            priority
          />
        }
      >
        <p className={s.lead}>
          Biology, infrastructure and operating tools built around producers.
        </p>
        <div className={s.actions}>
          <Button href="/contact#investors">
            Discuss the company and investment
          </Button>
        </div>
      </Intro>
      <Section>
        <Heading
          eyebrow="The infrastructure thesis"
          title="Start with the unit. Establish what repeats."
        />
        <div className={s.detailGrid}>
          {[
            ["Production problem", "Biology, water, handling and decisions."],
            [
              "System approach",
              "Habitat, sensing, local equipment and software.",
            ],
            [
              "Immediate development",
              "Prototype integration and funded research.",
            ],
            [
              "Commercial questions",
              "Requirements, adoption and responsibilities.",
            ],
          ].map(([title, body]) => (
            <article className={s.detailBox} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Development pathway"
          title="Evidence informs the next scale decision."
        />
        <ol className={s.flow}>
          {[
            ["Production unit", "Integration, biology and operating outcomes."],
            [
              "Production connections",
              "Suitable biomass and buyer requirements.",
            ],
            ["Repeatable cluster", "Adoption, responsibilities and economics."],
            ["Wider network", "Learning across sites and production settings."],
          ].map(([title, body], i) => (
            <li key={title}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className={s.actions}>
          <TextLink href="/validation">
            Explore research and validation
          </TextLink>
          <TextLink href="/company">People and company context</TextLink>
        </div>
      </Section>
      <CTA
        title="Discuss the work and where it could lead."
        href="/contact#investors"
        label="Start an investor conversation"
      >
        We welcome conversations about supporting integrated-prototype
        demonstration and defined production validation.
      </CTA>
    </Page>
  );
}
