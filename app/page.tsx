import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CTA,
  Heading,
  Page,
  Section,
  styles as s,
} from "./components/public/Experience";
import AquaDiscovery from "./components/discovery/AquaDiscovery";
import CinematicHero from "./components/cinematic/CinematicHero";
import ConnectedAssembly from "./components/cinematic/ConnectedAssembly";
export const metadata: Metadata = {
  title: { absolute: "Crabionics | Mud-Crab Aquaculture, Connected" },
  description:
    "Explore mud-crab production infrastructure, AquaOS and production partnerships. Habitat, sensing, local equipment and operating software in development.",
  alternates: { canonical: "/" },
};
export default function HomePage() {
  return (
    <Page name="home">
      <CinematicHero />
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
          <p>Incubation & research</p>
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
      <ConnectedAssembly />
      <Section tone="dark">
        <Heading eyebrow="Research & development" title="What we’re working on." />
        <p>Funded IHMS monitoring and control research, alongside biological trials. A 600-box controlled-finishing validation facility is proposed.</p>
        <div className={s.actions}>
          <Link href="/validation">Research and validation ↗</Link>
          <Link href="/resources">Read the practical guides ↗</Link>
        </div>
      </Section>
      <AquaDiscovery page="home" />
      <CTA title="Planning a mud-crab project?" label="Discuss a project">Tell us where you farm, your production stage and what you need help with.</CTA>
    </Page>
  );
}
