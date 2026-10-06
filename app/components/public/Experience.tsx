import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "./Public";
import { resources, solutions } from "./site-content";
import s from "./Experience.module.css";
export { default as styles } from "./Experience.module.css";

export function Page({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <div className={s.page} data-page={name}>
      {children}
    </div>
  );
}
export function Section({
  children,
  tone,
  id,
}: {
  children: ReactNode;
  tone?: "mist" | "dark";
  id?: string;
}) {
  return (
    <section className={`${s.section} ${tone ? s[tone] : ""}`} id={id}>
      <div className={s.wrap}>{children}</div>
    </section>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}
export function Button({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <Link className={`${s.button} ${secondary ? s.secondary : ""}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function TextLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className={s.textLink}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
export function Status({ children }: { children: ReactNode }) {
  return <span className={s.status}>{children}</span>;
}
export function ImagePanel({
  src,
  alt,
  caption,
  tall = false,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  tall?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={`${s.imagePanel} ${tall ? s.tall : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        preload={priority}
      />
      <figcaption>{caption || "Production photograph"}</figcaption>
    </figure>
  );
}
export function Intro({
  eyebrow,
  title,
  children,
  aside,
  links,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  links?: ReactNode;
}) {
  return (
    <section className={s.intro}>
      <div className={s.wrap}>
        <div className={aside ? s.split : ""}>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{title}</h1>
            {children}
          </div>
          {aside}
        </div>
        {links && (
          <nav className={s.introNav} aria-label="On this page">
            {links}
          </nav>
        )}
      </div>
    </section>
  );
}
export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={s.heading}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}
export function SolutionCards() {
  return (
    <div className={s.four}>
      {solutions.map((solution) => (
        <article className={s.card} key={solution.slug}>
          {solution.image ? (
            <div className={s.cardImage}>
              <Image
                src={solution.image}
                alt={solution.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
              />
              <span className={s.imageLabel}>
                {solution.concept
                  ? "Concept illustration"
                  : "Production photograph"}
              </span>
            </div>
          ) : (
            <div
              className={s.cardImage}
              style={{
                background: "#123a42",
                display: "grid",
                placeItems: "center",
              }}
            >
              <span
                style={{
                  color: "#a8e8d8",
                  fontSize: 40,
                  letterSpacing: "-.05em",
                }}
              >
                AquaOS
              </span>
            </div>
          )}
          <div className={s.cardBody}>
            <span className={s.cardTag}>{solution.category}</span>
            <h3>{solution.name}</h3>
            <p>{solution.description}</p>
            <TextLink href={solution.href}>Explore {solution.name}</TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
export function RoleCards() {
  return (
    <div className={s.three}>
      {[
        [
          "pond",
          "Pond growers",
          "Start with the pond, daily routines and stock. Explore production learning and AquaOS grow-out beta interest.",
          "/producers#pond-production",
        ],
        [
          "finishing",
          "Finishing operators",
          "Define intake, handling, the production unit and responsibilities for a controlled-finishing trial.",
          "/producers#controlled-finishing",
        ],
        [
          "habitat",
          "Buyers & cluster partners",
          "Bring species, condition, quantity and supply timing. Work back from the market requirement.",
          "/producers#buyer-requirements",
        ],
      ].map(([icon, title, description, href]) => (
        <article className={s.card} key={title}>
          <div className={s.cardBody}>
            <div className={s.cardIcon}>
              <Icon name={icon as IconName} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <TextLink href={href}>Explore your setting</TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
export function Flow({ production = false }: { production?: boolean }) {
  const steps = production
    ? [
        ["Hatchery & nursery", "Starting stock and early production context."],
        ["Pond production", "Growing conditions, cohort and biomass."],
        ["Controlled finishing", "Aggregation, grading, intake and handling."],
        ["Market requirements", "Species, condition, quantity and timing."],
      ]
    : [
        ["Observe", "Connect conditions to the pond, unit or cohort."],
        ["Decide", "Operators govern decisions and defined rules."],
        ["Respond", "Bounded commands connect to local equipment."],
        ["Review", "Record the response and what changed."],
      ];
  return (
    <ol
      className={s.flow}
      aria-label={
        production
          ? "Proposed production connection"
          : "Operating design under operator oversight"
      }
    >
      {steps.map(([title, body], i) => (
        <li key={title}>
          <small>0{i + 1}</small>
          <h3>{title}</h3>
          <p>{body}</p>
        </li>
      ))}
    </ol>
  );
}
export function Faq({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  return (
    <div className={s.faq}>
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
export function CTA({
  title = "Let’s start with your production setting.",
  children = "Bring your role, region and production question. We’ll discuss the next step together.",
  href = "/contact#production",
  label = "Discuss a partnership",
}: {
  title?: string;
  children?: ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <Section>
      <div className={s.cta}>
        <div>
          <h2>{title}</h2>
          <p>{children}</p>
        </div>
        <Button href={href}>{label}</Button>
      </div>
    </Section>
  );
}
export function ResourceCards() {
  return (
    <div className={s.three}>
      {resources.map((resource) => (
        <article className={s.card} key={resource.slug}>
          <div className={s.cardBody}>
            <div className={s.resourceMeta}>
              {resource.category} · {resource.reading}
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <TextLink href={`/resources/${resource.slug}`}>
              Read the guide
            </TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
export function AquaPreview() {
  return (
    <figure
      className={s.dashboard}
      aria-label="Illustrative AquaOS workflow preview, sample information, not live farm data"
    >
      <div className={s.dashTop}>
        <strong>AquaOS</strong>
        <span className={s.dashLabel}>Illustrative preview</span>
      </div>
      <div className={s.dashTabs}>
        <span>Operating history</span>
        <span>Observations</span>
        <span>Review</span>
      </div>
      <div className={s.dashRows}>
        {[
          [
            "01",
            "Observation recorded",
            "Pond A · daily operating context",
            "Observe",
          ],
          [
            "02",
            "Operator reviews the setting",
            "Conditions, stock and recent handling",
            "Decide",
          ],
          [
            "03",
            "Defined action requested",
            "Local equipment integration required",
            "Respond",
          ],
          [
            "04",
            "Response linked to the record",
            "Review acknowledgement and next observation",
            "Review",
          ],
        ].map(([n, title, detail, tag]) => (
          <div key={n} className={s.dashRow}>
            <span className={s.dashMarker}>{n}</span>
            <div>
              <b>{title}</b>
              <small>{detail}</small>
            </div>
            <span>{tag}</span>
          </div>
        ))}
      </div>
      <figcaption className={s.dashFooter}>
        Illustrative workflow · sample information
        <br />
        Physical integration is in development. Biological outcomes require
        their own measurements.
      </figcaption>
    </figure>
  );
}
