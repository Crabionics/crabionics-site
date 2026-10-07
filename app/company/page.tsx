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
import { CompanyEngines } from "../components/public/Narrative";
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
            alt="Individual production racks and connected water equipment from Crabionics installation work."
            caption="Production equipment photograph · installation context"
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
              Ninjacrab, our predecessor, began in 2021 with installation, water
              logistics and daily care.
            </p>
            <p>
              Daily care exposed the need to connect each crab, its habitat, feeding, water conditions and stock changes. Notebooks grew into digital workflows—the starting point for AquaOS.
            </p>
            <TextLink href="/system">Explore the connected system</TextLink>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <Heading eyebrow="From the field" title="The physical work behind the direction." />
        <div className={s.detailGrid}>
          {[
            ["/photos/ras-plumbing.jpg", "Production racks and connected water equipment.", "Installation & water", "The installation photograph shows individual racks and plumbing—the physical setting that daily operating records need to describe."],
            ["/photos/isolation-box.jpg", "An individual isolation box used in production work.", "Individual habitats", "An individual box makes handling and observation possible. Its photograph documents equipment, while survival and growth require separate measured evidence."],
          ].map(([src, alt, title, body]) => (
            <article className={s.card} key={src}>
              <div className={s.cardImage}><Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
              <div className={s.cardBody}><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
        <p className={s.note}>Existing production and equipment photographs. Capture dates and measured trial results are not presented here; see the research programme for the proposed validation work.</p>
      </Section>
      <Section>
        <CompanyEngines />
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
              "Co-founder / CTO",
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
        />
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
              Current focus: system integration and defined production
              validation.
            </p>
            <p>
              Longer-term direction: connect production stages and learn from
              reliable histories across sites.
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
