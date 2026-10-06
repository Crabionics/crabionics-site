import type { Metadata } from "next";
import {
  AquaPreview,
  Button,
  CTA,
  Eyebrow,
  Flow,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  TextLink,
  styles as s,
} from "../components/public/Experience";
import { solutions } from "../components/public/site-content";
export const metadata: Metadata = {
  title: "The Connected System",
  description:
    "How habitat, CrabSense, AquaOS and CrabPod connect under operator oversight. Explore the developing operating design and proposed production pathway.",
  alternates: { canonical: "/system" },
};
export default function SystemPage() {
  return (
    <Page name="system">
      <Intro
        eyebrow="How it connects"
        title="One setting. A connected operating relationship."
        aside={
          <ImagePanel
            src="/images/versioned/company-world-medium.f49975f0.webp"
            alt="Concept illustration connecting mud-crab habitats with production equipment."
            caption="Concept illustration"
            priority
          />
        }
        links={
          <>
            {[
              ["Habitat", "habitat"],
              ["CrabSense", "observation"],
              ["AquaOS", "decisions"],
              ["CrabPod", "intervention"],
              ["Water environment", "water"],
            ].map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </>
        }
      >
        <p className={s.lead}>
          The system we’re developing connects conditions, decisions and bounded
          action under operator oversight, followed by observation of the
          response.
        </p>
        <div className={s.actions}>
          <Button href="/contact#technical">
            Discuss your production question
          </Button>
        </div>
      </Intro>
      <Section tone="dark">
        <Heading
          eyebrow="The operating design"
          title="Understand what happened. Decide what follows."
        />
        <Flow />
        <div className={s.note}>
          <p>
            Defined rules can request bounded local actions where integration
            supports them. Equipment responses and biological outcomes require
            separate evidence.
          </p>
        </div>
      </Section>
      {solutions.map((solution, i) => (
        <Section
          key={solution.slug}
          id={["habitat", "observation", "decisions", "intervention"][i]}
          tone={i % 2 ? "mist" : undefined}
        >
          <div className={s.split}>
            <div>
              <Eyebrow>
                {solution.category} / {solution.name}
              </Eyebrow>
              <h2>{solution.title}</h2>
              <p>{solution.description}</p>
              <p>{solution.scope}</p>
              <TextLink href={solution.href}>Explore {solution.name}</TextLink>
            </div>
            {solution.image ? (
              <ImagePanel
                src={solution.image}
                alt={solution.alt}
                caption={solution.concept ? "Concept illustration" : undefined}
              />
            ) : (
              <AquaPreview />
            )}
          </div>
        </Section>
      ))}
      <Section id="water" tone="dark">
        <div className={s.split}>
          <ImagePanel
            src="/photos/ras-plumbing.jpg"
            alt="Water equipment connected to individual production racks."
          />
          <div>
            <Eyebrow>Supporting water environment</Eyebrow>
            <h2>BioPod / RAS, where the setting requires it.</h2>
            <p>
              Water management supports the controlled environment in relevant
              RAS or hatchery contexts. It sits alongside the operating
              relationship and follows the production setting.
            </p>
            <p>
              Individual habitats, ponds and controlled finishing have different
              water and operating requirements.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="The longer-term direction"
          title="Connect production between settings."
        >
          Aggregation, grading and handling would connect pond biomass to
          suitable finishing intake and downstream requirements.
        </Heading>
        <Flow production />
        <div className={s.actions}>
          <TextLink href="/producers">Explore production partnerships</TextLink>
        </div>
        <div className={s.note}>
          <p>
            Proposed production connection. Reliable supply, biological
            performance, operating costs and partner demand need to be examined
            in their own settings.
          </p>
        </div>
      </Section>
      <CTA href="/contact#technical" label="Discuss the technical scope" />
    </Page>
  );
}
