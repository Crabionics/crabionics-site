const gates = [
  ["Unit", "Biology, engineering and operating records in a defined production setting."],
  ["Supply chain", "Suitable farmer biomass, aggregation and transfer into controlled finishing."],
  ["Cluster", "Repeatable operations, buyer requirements and a workable commercial model."],
  ["Network", "Replication across clusters before wider network learning."],
] as const;

export default function ScaleEvidencePath() {
  return <div className="scale-evidence-path"><p className="story-eyebrow">Progression to test · not achieved milestones</p><ol>{gates.map(([name, evidence], index) => <li key={name}><span className="scale-gate-number">0{index + 1}</span><h3>{name}</h3><p>{evidence}</p></li>)}</ol></div>;
}
