import Image from "next/image";
import Link from "next/link";
import { Button, Eyebrow, Section, AquaPreview, styles as s } from "./Experience";
import v from "./Refinements.module.css";

export function Glyph({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    habitat: "M4 8h24v20H4z M4 15h24 M12 8v20 M20 8v20",
    sense: "M16 5v15 M11 20a6 6 0 1 0 10 0 M23 6h5 M23 11h3",
    decision: "M8 5h16v23H8z M12 11h8 M12 16h8 M12 21l3 3 6-6",
    pod: "M5 11h22v16H5z M11 5v6 M21 5v6 M11 17h10 M16 17v5",
    record: "M5 6h22v22H5z M10 12h12 M10 17h8 M10 22h12",
    pond: "M3 12c4-5 8 5 12 0s8 5 14 0 M3 21c4-5 8 5 12 0s8 5 14 0",
    market: "M4 13h24 M7 13v15h18V13 M4 13l4-8h16l4 8 M13 28v-8h6v8",
  };
  return (
    <svg
      viewBox="0 0 32 32"
      width="40"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind] || paths.record} />
    </svg>
  );
}
export function ConnectedDiagram() {
  return (
    <figure
      className={v.diagram}
      aria-label="Developing operating loop: habitat conditions are observed by CrabSense, reviewed in AquaOS under operator oversight, and connected to local equipment through CrabPod. The response is observed again."
    >
      <figcaption className={v.diagramTitle}>
        Follow the operating loop.
      </figcaption>
      <div className={v.diagramNodes}>
        {[
          ["habitat", "Habitat", "The animal’s setting", "/solutions/habitat"],
          ["sense", "CrabSense", "Observe conditions", "/solutions/crabsense"],
          ["decision", "AquaOS", "Review & decide", "/aquaos"],
          ["pod", "CrabPod", "Connect local response", "/solutions/crabpod"],
        ].map(([icon, title, caption, href]) => (
          <Link href={href} key={title}>
            <Glyph kind={icon} />
            <strong>{title}</strong>
            <span>{caption}</span>
          </Link>
        ))}
      </div>
      <div className={v.returnLine}>
        ↶ Observe the response · keep the operating history
      </div>
      <small>
        Operating design in development · operator oversight throughout
      </small>
    </figure>
  );
}
export function AnnotatedProduction() {
  return (
    <figure className={v.annotated}>
      <div className={v.photo}>
        <Image
          src="/photos/ras-plumbing.jpg"
          alt="Individual habitat racks beside connected pipework and water equipment."
          fill
          sizes="(max-width:767px) 100vw, 60vw"
        />
        <span className={`${v.pin} ${v.pinOne}`}>1</span>
        <span className={`${v.pin} ${v.pinTwo}`}>2</span>
        <span className={`${v.pin} ${v.pinThree}`}>3</span>
        <small>Production photograph</small>
      </div>
      <figcaption className={v.legend}>
        {[
          ["1", "Individual habitats", "Care & handling"],
          ["2", "Water connections", "Supporting pipework"],
          ["3", "Water equipment", "Management for this setting"],
        ].map(([n, title, caption]) => (
          <div key={n}>
            <b>{n}</b>
            <span>
              <strong>{title}</strong>
              <small>{caption}</small>
            </span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
export function VisualFacts({
  items,
}: {
  items: readonly (readonly [string, string, string])[];
}) {
  return (
    <div className={v.facts}>
      {items.map(([icon, title, caption]) => (
        <div key={title}>
          <Glyph kind={icon} />
          <strong>{title}</strong>
          <span>{caption}</span>
        </div>
      ))}
    </div>
  );
}
export function BetaDirection({ showcase = false }: { showcase?: boolean }) {
  return (
    <Section tone="mist">
      <div className={s.split}>
        <div>
          <Eyebrow>AquaOS / First beta direction</Eyebrow>
          <h2>One pond. One observation. A clear next step.</h2>
          <p>
            Explore how a pond observation becomes a reviewed decision and a daily record. Help shape the beta around your work.
          </p>
          <div className={s.actions}>
            <Button href="/demo">Try the walkthrough</Button>
            <Button href="/early-access" secondary>
              Join early access
            </Button>
          </div>
        </div>
        {showcase ? <AquaPreview /> : <div className={v.roadmap}>
          {[
            [
              "Explore now",
              "Sample AquaOS walkthrough",
              "Available to explore",
            ],
            [
              "Shape next",
              "Grower feedback & record workflows",
              "Early-access interest",
            ],
            [
              "Validate later",
              "Physical integration in defined settings",
              "In development",
            ],
          ].map(([title, detail, status], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
                <small>{status}</small>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </Section>
  );
}
