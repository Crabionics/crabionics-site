import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  CTA,
  Eyebrow,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  TextLink,
  styles as s,
} from "../components/public/Experience";
export const metadata: Metadata = {
  title: "People & Company",
  description:
    "The field experience, people, production infrastructure and research context behind Crabionics Aquaculture.",
  alternates: { canonical: "/company" },
};
export default function CompanyPage() {
  return (
    <Page name="company">
      <Intro
        eyebrow="People & company"
        title="Built from the production problem outward."
        aside={
          <ImagePanel
            src="/photos/ras-plumbing.jpg"
            alt="Individual habitats and water equipment in a production installation."
            priority
          />
        }
      >
        <p className={s.lead}>
          Crabionics brings biology, physical infrastructure, engineering and
          operating software together around mud-crab aquaculture.
        </p>
        <div className={s.actions}>
          <Button href="/producers">Work with Crabionics</Button>
        </div>
      </Intro>
      <Section>
        <div className={s.split}>
          <div>
            <Eyebrow>Our starting point</Eyebrow>
            <h2>Field work shapes the system.</h2>
          </div>
          <div>
            <p>
              The predecessor Ninjacrab work began in 2021. The founding team
              took on installation, water logistics and daily care, learning
              through successive recirculating aquaculture configurations.
            </p>
            <p>
              Operating records grew from notebooks into digital tools, forming
              the starting point for AquaOS. The production environment remains
              the foundation for how habitat, observations and operating
              decisions are connected.
            </p>
            <TextLink href="/system">Explore the connected system</TextLink>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="The people"
          title="Field operations, engineering and software."
        />
        <div className={s.detailGrid}>
          {[
            [
              "Sameer Kumar Dalai",
              "Founder / Company Lead",
              "Field aquaculture, system design and company execution.",
              "/team/sameer-kumar-dalai.jpg",
            ],
            [
              "M Abhishek",
              "Technology / AquaOS",
              "Technology systems, software/firmware and the AquaOS system.",
              "/team/m-abhishek.jpg",
            ],
          ].map(([name, role, bio, photo]) => (
            <article className={s.person} key={name}>
              <div className={s.portrait}>
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="(max-width: 767px) 110px, 180px"
                />
              </div>
              <div>
                <Eyebrow>{role}</Eyebrow>
                <h3>{name}</h3>
                <p>{bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <Heading
          eyebrow="Institutional relationships"
          title="Our incubation and research context."
        >
          These relationships support different parts of the company’s
          development.
        </Heading>
        <div className={s.three}>
          {[
            ["KIIT-TBI", "Technology incubation", "/logos/kiit-tbi.png"],
            [
              "BIRAC / IHMS",
              "Funded research relationship",
              "/logos/birac-big.png",
            ],
            [
              "DPIIT Recognition",
              "Startup recognition",
              "/logos/dpiit-startup-india.png",
            ],
          ].map(([name, role, logo]) => (
            <article className={s.institution} key={name}>
              <Image src={logo} alt={name} width={140} height={66} />
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <div className={s.split}>
          <div>
            <Eyebrow>Company → System → Network</Eyebrow>
            <h2>Extend what can be repeated.</h2>
          </div>
          <div>
            <p>
              The current focus is system integration and defined production
              validation. Scientific validation capability is being established
              alongside that work.
            </p>
            <p>
              The longer-term direction connects hatchery and nursery, pond
              grow-out, aggregation and grading, controlled finishing and market
              requirements. CIN is the direction for learning from reliable
              histories across sites.
            </p>
            <TextLink href="/validation">
              See the development programme
            </TextLink>
          </div>
        </div>
      </Section>
      <CTA
        href="/contact#institutions"
        title="Build the next conversation together."
        label="Discuss a collaboration"
      />
    </Page>
  );
}
