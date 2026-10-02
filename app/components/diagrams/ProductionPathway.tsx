const stages = [
  { name: "Hatchery & nursery", role: "Seed continuity", detail: "The upstream question: seed availability and early survival." },
  { name: "Farmer grow-out", role: "Biomass generation", detail: "Pond production as a potential source of finishing-stage biomass." },
  { name: "Aggregation & transfer", role: "Intake continuity", detail: "The size, condition and timing needed to connect production stages." },
  { name: "Controlled finishing", role: "Defined production setting", detail: "RAS finishing with measured biological and operating outcomes." },
  { name: "Grading & traceability", role: "Output requirements", detail: "Specifications and production records to be defined with partners." },
  { name: "Processor / buyer", role: "Market connection", detail: "Demand, handling, logistics and the commercial terms to test." },
] as const;

/** A proposed architecture, not a depiction of an operating supply network. */
export default function ProductionPathway() {
  return (
    <figure className="production-network">
      <figcaption className="network-caption"><span>Proposed production pathway</span><span>Each connection needs evidence</span></figcaption>
      <div className="network-demand">
        <div><span className="story-eyebrow">Begin with the requirement</span><h3>What does the buyer need?</h3></div>
        <p>Species · size · quantity · supply cadence · handling</p>
        <span className="network-status">Buyer discovery</span>
      </div>
      <ol className="network-stages">
        {stages.map((stage, index) => <li key={stage.name} className={index === 1 || index === 3 ? "network-stage-production" : ""}><span className="network-stage-number">0{index + 1}</span><h3>{stage.name}</h3><p className="network-stage-role">{stage.role}</p><p className="network-stage-detail">{stage.detail}</p></li>)}
      </ol>
      <div className="network-software">
        <div><span className="story-eyebrow">AquaOS · in development</span><p>The intended operating link between production records, cohort movement and planning.</p></div>
        <div><span className="story-eyebrow">CrabSense + CrabPod</span><p>Sensing and local intervention to be tested in each pond or finishing context.</p></div>
      </div>
      <p className="network-footnote">IHMS research forms part of the upstream seed-security work. This pathway describes the architecture being developed; it does not represent confirmed supply, customers or commercial performance.</p>
    </figure>
  );
}
