"use client";
import { useState } from "react";
import v from "./Refinements.module.css";
import d from "./BetaDemo.module.css";
const observations = ["Feed refusal noted", "Feeding response observed", "Follow-up inspection needed"] as const;
const outcomes = ["Feed refusal observed again", "Feeding response observed at follow-up", "Follow-up observation still incomplete"] as const;
const stages = ["Observe", "Review", "Follow up", "Outcome", "History"];
const titles = ["Keep the observation with its setting.", "Separate what is known from what is missing.", "Give the next action an owner.", "Record what happened after the action.", "Return to the whole episode."];
export default function BetaDemo() {
  const [step, setStep] = useState(0);
  const [observation, setObservation] = useState<string>(observations[0]);
  const [outcome, setOutcome] = useState<string>(outcomes[0]);
  const [recorded, setRecorded] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [followUp, setFollowUp] = useState(false);
  const [outcomeRecorded, setOutcomeRecorded] = useState(false);
  const blocked = (step === 1 && !recorded) || (step === 2 && !reviewed) || (step === 3 && !followUp);
  function reset() { setStep(0); setObservation(observations[0]); setOutcome(outcomes[0]); setRecorded(false); setReviewed(false); setFollowUp(false); setOutcomeRecorded(false); }
  function advance() {
    if (blocked) return;
    if (step === 0) setRecorded(true);
    if (step === 1) setReviewed(true);
    if (step === 2) setFollowUp(true);
    if (step === 3) setOutcomeRecorded(true);
    if (step === 4) { reset(); return; }
    setStep(current => current + 1);
  }
  return <div className={v.demo}>
    <div className={v.demoHeader}><strong>AquaOS / One operator round</strong><span>Illustrative workflow · sample data</span></div>
    <nav className={v.demoSteps} aria-label="Workflow preview steps">{stages.map((title, index) => <button key={title} type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}>{index + 1}. {title}</button>)}</nav>
    <div className={d.workspace}>
    <aside className={d.context} aria-label="Sample production context">
      <span className={d.kicker}>Sample production setting</span><div className={d.habitat}><svg viewBox="0 0 32 32" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 8h24v20H4z M4 15h24 M12 8v20 M20 8v20"/></svg><strong>B-12</strong><span>Individual habitat · RAS grow-out</span></div>
      <dl><div><dt>Source</dt><dd>Round operator</dd></div><div><dt>Activity</dt><dd>Morning feeding check</dd></div><div><dt>Water readings</dt><dd>Not supplied</dd></div></dl>
      <div className={d.episodeStatus}><span className={d.dot}/>{outcomeRecorded ? "Follow-up recorded" : followUp ? "Awaiting follow-up observation" : recorded ? "Observation awaiting follow-up" : "Ready for an observation"}</div>
    </aside>
    <div className={v.demoBody}>
      <span className={v.sample}>Step {step + 1} of 5 · {stages[step]}</span><h3>{titles[step]}</h3>
      {step === 0 ? <><p>The morning round flags an individual crab in habitat B-12. Choose what the operator saw, then record it in this sample.</p><label htmlFor="sample-observation">Morning observation</label><select id="sample-observation" className={v.sampleSelect} value={observation} onChange={event => { setObservation(event.target.value); setRecorded(false); setReviewed(false); setFollowUp(false); setOutcomeRecorded(false); }}>{observations.map(value => <option key={value}>{value}</option>)}</select></> : null}
      {step === 1 ? <p>An operator reviews the available evidence before choosing a follow-up. Missing context stays visible.</p> : null}
      {step === 2 ? <p>For this example, the operator chooses a follow-up inspection. Recording a task means it is planned; it does not mean it happened.</p> : null}
      {step === 3 ? <><p>Choose a sample observation after the inspection. Record it explicitly to close the history gap.</p><label htmlFor="sample-outcome">Follow-up observation</label><select id="sample-outcome" className={v.sampleSelect} value={outcome} onChange={event => { setOutcome(event.target.value); setOutcomeRecorded(false); }}>{outcomes.map(value => <option key={value}>{value}</option>)}</select></> : null}
      {step === 4 ? <p>See the observation, the reviewed next step and the recorded follow-up together. This is the history a future operator question could draw on.</p> : null}
      <div className={v.demoRecord}>
        {step === 0 ? <span>Record the observation to add it to the episode history alongside this habitat.</span> : null}
        {step === 1 ? <><span>Observation: {recorded ? observation : "not recorded"}</span><span>Earlier feed responses and water readings: not supplied</span><span>Cause: unknown · no diagnosis or prediction</span></> : null}
        {step === 2 ? <><span>Task: inspect B-12 and record the next observation</span><span>Owner: sample round operator · next inspection round</span><span>Review: {reviewed ? "recorded" : "missing—record the review first"}</span><span>Equipment command: none</span></> : null}
        {step === 3 ? <><span>Task: {followUp ? "recorded for the sample operator" : "missing—record a task first"}</span><span>Outcome: {outcomeRecorded ? outcome : "not yet recorded"}</span><span>A changed response does not establish a cause or prove a treatment effect.</span></> : null}
        {step === 4 ? <><strong>{outcomeRecorded ? "The follow-up is now part of the same history." : "This episode still has a recording gap."}</strong><span>Use the timeline below to distinguish recorded work from a pending entry. Recording an outcome does not establish its cause.</span></> : null}
      </div>
      {blocked ? <p role="status">Complete the earlier recording step before adding this entry. Exploring a tab does not record an action.</p> : null}
      <div className={v.demoFoot}><button type="button" disabled={blocked} onClick={advance}>{["Record sample observation", "Record operator review", "Record follow-up task", "Record sample outcome", "Start again"][step]} →</button></div>
    </div>
    </div>
    <section className={d.history} aria-label="Accumulated sample operating history">
      <div className={d.historyHeading}><h3>Episode history</h3><span role="status">{[recorded, reviewed, followUp, outcomeRecorded].filter(Boolean).length} of 4 entries recorded</span></div>
      <ol>{[
        ["Observation", recorded, observation, "No observation recorded"],
        ["Review", reviewed, "Earlier feed responses and water readings missing; cause unknown", "Review not recorded"],
        ["Follow-up task", followUp, "Inspect B-12 · round operator · next inspection round", "No task recorded"],
        ["Outcome", outcomeRecorded, outcome, "Follow-up observation not recorded"],
      ].map(([label, complete, detail, pending], index) => <li key={String(label)} className={complete ? d.complete : undefined}><span className={d.marker} aria-hidden="true">{complete ? "✓" : index + 1}</span><div><strong>{label}</strong><span>{complete ? detail : pending}</span><small>{complete ? "Recorded in this sample" : "Pending"}</small></div></li>)}</ol>
    </section>
    <div className={v.demoFoot}><small>Sample only. Choices remain in this open preview; no farm records are saved or equipment controlled. The operator beta is in development.</small></div>
  </div>;
}
