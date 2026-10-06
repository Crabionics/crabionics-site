import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  CTA,
  Eyebrow,
  Heading,
  Page,
  ResourceCards,
  Section,
  TextLink,
  styles as s,
} from "./components/public/Experience";
import { BetaDirection } from "./components/public/Visuals";
import { SolutionOverview, EvidenceStrip } from "./components/public/Editorial";
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
        <Heading eyebrow="Built for the daily work" title="Care for the stock. Understand the water. Keep a useful record." />
        <SolutionOverview />
      </Section>
      <Section tone="dark">
        <EvidenceStrip />
      </Section>
      <Section>
        <Heading
          eyebrow="Practical resources"
          title="Start with a practical question."
        />
        <ResourceCards />
      </Section>
      <BetaDirection showcase />
      <CTA />
    </Page>
  );
}

