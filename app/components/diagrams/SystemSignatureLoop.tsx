const sequence = [
  { label: "Habitat", number: "01", tone: "standard", position: "habitat" },
  { label: "CrabSense / observation", number: "02", tone: "standard", position: "sense" },
  { label: "AquaOS / decision support", number: "03", tone: "standard", position: "aqua" },
  { label: "Operator", number: "", tone: "boundary", position: "operator" },
  { label: "CrabPod / intervention", number: "04", tone: "standard", position: "pod" },
  { label: "Outcome", number: "05", tone: "standard", position: "outcome" },
  { label: "Learning", number: "06", tone: "standard", position: "learning" },
] as const;

function SequenceNode({ label, number, tone, position }: (typeof sequence)[number]) {
  const boundary = tone === "boundary";
  return (
    <div className={`loop-node loop-node-${position} ${boundary ? "loop-node-boundary" : ""}`}>
      <span className="loop-node-number">{number || (boundary ? "Boundary" : "\u00a0")}</span>
      <span className="loop-node-label">{label}</span>
    </div>
  );
}

export default function SystemSignatureLoop() {
  return (
    <div className="system-signature-loop" aria-label="Habitat to learning operating sequence">
      <div className="loop-desktop-stage" aria-hidden="true">
        <div className="loop-ring loop-ring-outer" />
        <div className="loop-ring loop-ring-inner" />
        <div className="loop-axis loop-axis-horizontal" />
        <div className="loop-axis loop-axis-vertical" />
        <div className="loop-center">Loop</div>
        <span className="loop-arrow loop-arrow-top">→</span>
        <span className="loop-arrow loop-arrow-right">↓</span>
        <span className="loop-arrow loop-arrow-bottom">←</span>
        <span className="loop-arrow loop-arrow-left">↑</span>
        {sequence.map((step) => <SequenceNode key={step.label} {...step} />)}
      </div>
      <div className="loop-mobile-stage">
        {sequence.map((step, index) => (
          <div key={step.label} className="loop-mobile-step">
            <SequenceNode {...step} />
            {index < sequence.length - 1 && <span className="loop-mobile-arrow" aria-hidden>↓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
