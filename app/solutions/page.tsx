import type { Metadata } from "next";
import {
  Button,
  CTA,
  Eyebrow,
  Flow,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  SolutionCards,
  TextLink,
  styles as s,
} from "../components/public/Experience";
export const metadata: Metadata = {
  title: "Aquaculture Solutions",
  description:
    "Explore habitat, CrabSense, CrabPod and AquaOS: connected infrastructure and operating tools being developed for mud-crab production.",
  alternates: { canonical: "/solutions" },
};
export default function SolutionsPage() {
  return (
    <Page name="solutions">
      <Intro
        eyebrow="Connected aquaculture solutions"
        title="Built around the production work."
        aside={
          <ImagePanel
            src="/images/versioned/company-world-mobile.ebb1281c.webp"
            alt="Concept illustration of the connected mud-crab production environment."
            caption="Concept illustration"
            priority
          />
        }
      >
        <p className={s.lead}>
          Physical infrastructure, sensing and operating software being
          developed together for mud-crab aquaculture.
        </p>
        <div className={s.actions}>
          <Button href="/contact#technical">Discuss your setting</Button>
        </div>
      </Intro>
      <Section>
        <Heading
          eyebrow="Four connected components"
          title="Understand each part. See the whole."
        >
          Explore the role, development scope and production questions for each
          component.
        </Heading>
        <SolutionCards />
      </Section>
      <Section tone="mist">
        <div className={s.split}>
          <div>
            <Eyebrow>One operating relationship</Eyebrow>
            <h2>Conditions become useful in context.</h2>
            <p>
              The connected system is being developed to link observation,
              operator oversight, local response and history. Each setting
              determines the components and responsibilities involved.
            </p>
            <TextLink href="/system">How the system connects</TextLink>
          </div>
          <ImagePanel
            src="/images/versioned/company-world-medium.f49975f0.webp"
            alt="Concept illustration of habitats, production racks and water equipment."
            caption="Concept illustration"
          />
        </div>
        <Flow />
      </Section>
      <Section>
        <Heading
          eyebrow="Supporting infrastructure"
          title="Water management follows the setting."
        />
        <div className={s.split}>
          <ImagePanel
            src="/photos/ras-plumbing.jpg"
            alt="Water equipment alongside production racks."
          />
          <div>
            <h3>BioPod / RAS</h3>
            <p>
              Water management supports controlled environments in relevant RAS
              or hatchery contexts. Individual habitats, ponds and finishing
              settings have different water and operating requirements.
            </p>
            <p>
              The equipment, installation and measurement scope are defined with
              the production or research setting.
            </p>
            <TextLink href="/system#water">
              Explore the supporting water environment
            </TextLink>
          </div>
        </div>
      </Section>
      <CTA />
    </Page>
  );
}
