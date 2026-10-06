import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AquaPreview,
  Button,
  CTA,
  Eyebrow,
  Flow,
  Heading,
  ImagePanel,
  Page,
  ResourceCards,
  RoleCards,
  Section,
  SolutionCards,
  Status,
  TextLink,
  styles as s,
} from "./components/public/Experience";
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
        <div className={s.split}>
          <ImagePanel
            src="/photos/isolation-box.jpg"
            alt="Mud crab within an individual blue habitat."
          />
          <div>
            <h3>Build around the animal. Support the people.</h3>
            <p>
              Every production setting brings its own questions. Crabionics
              connects the physical environment, observations and operating work
              so teams can understand what happened and what to examine next.
            </p>
            <ul className={s.checklist}>
              <li>A defined environment for care and handling</li>
              <li>Observations tied to a unit, pond or cohort</li>
              <li>Decisions and local response under operator oversight</li>
              <li>An operating history that keeps the work in context</li>
            </ul>
            <TextLink href="/system">See how the system connects</TextLink>
          </div>
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
          eyebrow="For producers & operating partners"
          title="Start where you work."
        >
          Choose your production setting and explore what a partnership could
          involve.
        </Heading>
        <RoleCards />
      </Section>
      <Section tone="dark">
        <Heading
          eyebrow="The connected system"
          title="Observe. Decide. Respond. Review."
        >
          The operating design connects conditions to actions and the response
          that follows.
        </Heading>
        <Flow />
        <div className={s.actions}>
          <Button href="/system" secondary>
            Explore the operating relationship
          </Button>
        </div>
      </Section>
      <Section>
        <div className={s.feature}>
          <div>
            <Eyebrow>AquaOS</Eyebrow>
            <h2>The record follows the work.</h2>
            <p>
              Operating software being developed to connect observations,
              operator decisions, bounded control and outcomes.
            </p>
            <Status>Grow-out beta interest</Status>
            <div className={s.actions}>
              <Button href="/aquaos">Explore AquaOS</Button>
              <TextLink href="/aquaos#grow-out-beta">Bring your pond</TextLink>
            </div>
          </div>
          <AquaPreview />
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Research & validation"
          title="Build with evidence. Learn in production."
        >
          The current programme connects integration work, pond biology and
          planning for controlled-finishing validation.
        </Heading>
        <div className={s.three}>
          {[
            [
              "Integration",
              "Research & system build",
              "Funded IHMS work examines the physical system, observations and operating routines.",
            ],
            [
              "Production learning",
              "Pond biology & biomass",
              "Defined settings examine stock condition, cohort performance, handling and supply timing.",
            ],
            [
              "Proposed validation",
              "Controlled finishing",
              "A later 600-box configuration would examine biological and operating outcomes.",
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
        >
          Guides to partnership scoping, operating records and production
          connections.
        </Heading>
        <ResourceCards />
      </Section>
      <CTA />
    </Page>
  );
}
