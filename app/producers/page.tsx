import type { Metadata } from "next";
import {
  Button,
  CTA,
  Eyebrow,
  Faq,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  TextLink,
  styles as s,
} from "../components/public/Experience";
import { partnershipFaq } from "../components/public/site-content";
export const metadata: Metadata = {
  title: "For Producers & Operating Partners",
  description:
    "Explore mud-crab pond partnerships, controlled-finishing trials and buyer requirements. Understand pilot scope, responsibilities and how to enquire.",
  alternates: { canonical: "/producers" },
};
const roles = [
  {
    id: "pond-production",
    tag: "Growers & operating teams",
    title: "Pond growers & operating teams.",
    text: "Your pond produces the biomass. Start with stock, daily routines and the conditions that affect transfer and harvest.",
    items: [
      "Location & operating role",
      "Species, condition & quantity",
      "Daily routines & records",
    ],
    href: "/contact#production",
    label: "Discuss a pond partnership",
    image: "/photos/isolation-box.jpg",
    alt: "Mud crab in an individual habitat.",
  },
  {
    id: "controlled-finishing",
    tag: "Finishing operators",
    title: "Controlled finishing.",
    text: "Define stock intake, handling and water management together.",
    items: [
      "Site & water equipment",
      "Intake, grading & handling",
      "Roles & measurements",
    ],
    href: "/contact#production",
    label: "Discuss a finishing pilot",
    image: "/photos/ras-plumbing.jpg",
    alt: "Individual blue production racks and water equipment.",
  },
  {
    id: "buyer-requirements",
    tag: "Buyers, processors & cluster partners",
    title: "Buyers & cluster partners.",
    text: "Buyer requirements should shape production planning. Start with species, condition, quantity and supply dates; supply commitments follow validated capacity.",
    items: [
      "Species, size & quantity",
      "Dates & supply frequency",
      "Handling & destination",
    ],
    href: "/contact#market",
    label: "Discuss market requirements",
    image: "/images/versioned/company-world-medium.f49975f0.webp",
    alt: "Concept illustration of connected production infrastructure.",
  },
];
export default function ProducersPage() {
  return (
    <Page name="producers">
      <Intro
        eyebrow="For producers & operating partners"
        title="Let’s plan around your production needs."
        aside={
          <ImagePanel
            src="/images/versioned/company-world-mobile.ebb1281c.webp"
            alt="Concept illustration of production habitats, water equipment and an operator."
            caption="Concept illustration"
            priority
          />
        }
        links={
          <>
            {[
              ["Pond growers", "pond-production"],
              ["Finishing operators", "controlled-finishing"],
              ["Buyer & cluster partners", "buyer-requirements"],
              ["Pilot process", "pilot-process"],
            ].map(([name, id]) => (
              <a href={`#${id}`} key={id}>
                {name}
              </a>
            ))}
          </>
        }
      >
        <p className={s.lead}>
          Choose your production setting and start the conversation.
        </p>
        <div className={s.actions}>
          <Button href="/contact#production">
            Discuss a production partnership
          </Button>
          <TextLink href="/aquaos#grow-out-beta">AquaOS early-access direction</TextLink>
        </div>
      </Intro>
      {roles.map((role, i) => (
        <Section id={role.id} tone={i % 2 ? "mist" : undefined} key={role.id}>
          <div className={s.split}>
            <div>
              <Eyebrow>{role.tag}</Eyebrow>
              <h2>{role.title}</h2>
              <p>{role.text}</p>
              <ul className={s.checklist}>
                {role.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button href={role.href}>{role.label}</Button>
            </div>
            <ImagePanel
              src={role.image}
              alt={role.alt}
              caption={i === 2 ? "Concept illustration" : undefined}
            />
          </div>
        </Section>
      ))}
      <Section tone="dark" id="pilot-process">
        <Heading
          eyebrow="What a pilot involves"
          title="A defined question. A shared operating plan."
        >
          Equipment, costs, responsibilities and timing are agreed for each
          setting.
        </Heading>
        <ol className={s.flow}>
          {[
            ["Start the conversation", "Role, region & stock"],
            ["Understand fit", "Setting & useful measurements"],
            ["Agree the trial", "Scope, roles & costs"],
            ["Measure & review", "Records & next step"],
          ].map(([title, body], i) => (
            <li key={title}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <Heading
          eyebrow="Before you enquire"
          title="Practical partnership questions."
        />
        <Faq items={partnershipFaq} />
      </Section>
      <CTA />
    </Page>
  );
}
