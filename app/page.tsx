import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AquaPreview,
  Button,
  CTA,
  Eyebrow,
  Heading,
  Page,
  ResourceCards,
  Section,
  SolutionCards,
  Status,
  TextLink,
  styles as s,
} from "./components/public/Experience";
import {
  AnnotatedProduction,
  BetaDirection,
  ConnectedDiagram,
  VisualFacts,
} from "./components/public/Visuals";
export const metadata: Metadata = {
  title: { absolute: "Crabionics | Mud-Crab Aquaculture, Connected" },
  description:
    "Explore mud-crab production infrastructure, AquaOS and production partnerships. Habitat, sensing, local equipment and operating software in development.",
  alternates: { canonical: "/" },
};
export default function HomePage() {
  return (
    <Page name="home">
      <section className={s.hero}>
        <Image
          src="/photos/ras-plumbing.jpg"
          alt="Blue individual production racks connected to water equipment in an aquaculture installation."
          fill
          preload
          sizes="100vw"
          className={s.heroImage}
        />
        <div className={s.heroCopy}>
          <Eyebrow>Crabionics aquaculture</Eyebrow>
          <h1>
            Mud-crab aquaculture.<span>Connected.</span>
          </h1>
          <p className={s.lead}>
            We’re developing habitats, sensing, local equipment and AquaOS
            around the people running mud-crab production.
          </p>
          <div
            className={`${s.actions} ${s.dark}`}
            style={{ background: "transparent" }}
          >
            <Button href="/solutions">Explore the solutions</Button>
            <Button href="/contact#production" secondary>
              Discuss a partnership
            </Button>
          </div>
        </div>
        <span className={s.heroCaption}>Production equipment photograph</span>
      </section>
      <nav className={s.roleBar} aria-label="Choose your production setting">
        {[
          ["Pond production", "Growers & operating teams", "pond-production"],
          [
            "Controlled finishing",
            "Intake, habitat & daily care",
            "controlled-finishing",
          ],
          [
            "Buyer & cluster partnerships",
            "Condition, quantity & timing",
            "buyer-requirements",
          ],
        ].map(([title, detail, id]) => (
          <Link key={id} className={s.roleLink} href={`/producers#${id}`}>
            <strong>{title}</strong>
            <small>{detail}</small>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
      <div className={s.trust}>
        <div className={`${s.wrap} ${s.trustInner}`}>
          <p>Our incubation, research and recognition context</p>
          {[
            ["KIIT-TBI", "Technology incubation", "/logos/kiit-tbi.png"],
            ["BIRAC / IHMS", "Funded research", "/logos/birac-big.png"],
            ["DPIIT", "Startup recognition", "/logos/dpiit-startup-india.png"],
          ].map(([name, detail, logo]) => (
            <div className={s.trustItem} key={name}>
              <Image src={logo} alt={name} width={76} height={42} />
              <div>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Section>
        <Heading
          eyebrow="The production challenge"
          title="Better decisions start with a connected setting."
        >
          Crab biology, water, handling and operator decisions belong in the
          same picture.
        </Heading>
        <AnnotatedProduction />
        <div style={{ marginTop: 28 }}>
          <VisualFacts
            items={[
              ["habitat", "Care & handling", "A defined animal environment"],
              ["sense", "Understand conditions", "Observations in context"],
              ["record", "Keep the history", "Decisions & follow-up"],
            ]}
          />
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Our solutions"
          title="Physical infrastructure. Operating intelligence."
        >
          Four connected components, each with a specific role in the production
          work.
        </Heading>
        <SolutionCards />
        <div className={s.note}>
          <p>
            The system is in development. Integration, biological performance
            and commercial fit are tested separately in defined settings.
          </p>
        </div>
      </Section>
      <Section>
        <Heading
          eyebrow="The connected system"
          title="Observe. Decide. Respond. Review."
        />
        <ConnectedDiagram />
        <div className={s.actions}>
          <Button href="/system">Explore the operating relationship</Button>
        </div>
      </Section>
      <Section>
        <div className={s.feature}>
          <div>
            <Eyebrow>AquaOS</Eyebrow>
            <h2>The record follows the work.</h2>
            <p>
              Observations, decisions and follow-up in one developing workflow.
            </p>
            <Status>Grow-out beta interest</Status>
            <div className={s.actions}>
              <Button href="/demo">Try the walkthrough</Button>
              <TextLink href="/early-access">Join early access</TextLink>
            </div>
          </div>
          <AquaPreview />
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Research & validation"
          title="Build with evidence. Learn in production."
        />
        <div className={s.three}>
          {[
            [
              "Integration",
              "Research & system build",
              "Funded IHMS integration work.",
            ],
            [
              "Production learning",
              "Pond biology & biomass",
              "Stock, handling and cohort learning.",
            ],
            [
              "Proposed validation",
              "Controlled finishing",
              "Proposed later 600-box validation.",
            ],
          ].map(([label, title, body]) => (
            <article key={title} className={s.card}>
              <div className={s.cardBody}>
                <span className={s.cardTag}>{label}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={s.actions}>
          <TextLink href="/validation">
            Explore the validation programme
          </TextLink>
        </div>
      </Section>
      <Section>
        <Heading
          eyebrow="Practical resources"
          title="Useful context before the conversation."
        />
        <ResourceCards />
      </Section>
      <BetaDirection />
      <CTA />
    </Page>
  );
}
