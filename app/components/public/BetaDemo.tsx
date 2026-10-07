"use client";
import { useState } from "react";
import v from "./Refinements.module.css";
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
  function reset() { setStep(0); setRecorded(false); setReviewed(false); setFollowUp(false); setOutcomeRecorded(false); }
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
    <div className={v.demoBody} aria-live="polite">
      <span className={v.sample}>Step {step + 1} of 5 · {stages[step]}</span><h3>{titles[step]}</h3>
      {step === 0 ? <><p>The morning round flags an individual crab in habitat B-12. Choose what the operator saw, then record it in this sample.</p><label htmlFor="sample-observation">Morning observation</label><select id="sample-observation" className={v.sampleSelect} value={observation} onChange={event => { setObservation(event.target.value); setRecorded(false); setReviewed(false); setFollowUp(false); setOutcomeRecorded(false); }}>{observations.map(value => <option key={value}>{value}</option>)}</select></> : null}
      {step === 1 ? <p>An operator reviews the available evidence before choosing a follow-up. Missing context stays visible.</p> : null}
      {step === 2 ? <p>For this example, the operator chooses a follow-up inspection. Recording a task means it is planned; it does not mean it happened.</p> : null}
      {step === 3 ? <><p>Choose a sample observation after the inspection. Record it explicitly to close the history gap.</p><label htmlFor="sample-outcome">Follow-up observation</label><select id="sample-outcome" className={v.sampleSelect} value={outcome} onChange={event => { setOutcome(event.target.value); setOutcomeRecorded(false); }}>{outcomes.map(value => <option key={value}>{value}</option>)}</select></> : null}
      {step === 4 ? <p>See the observation, the reviewed next step and the recorded follow-up together. This is the history a future operator question could draw on.</p> : null}
      <div className={v.demoRecord}>
        <span>Sample setting: RAS grow-out · individual habitat B-12</span>
        {step === 0 ? <span>Source: operator · morning feeding round</span> : null}
        {step === 1 ? <><span>Observation: {recorded ? observation : "not recorded"}</span><span>Earlier feed responses and water readings: not supplied</span><span>Cause: unknown · no diagnosis or prediction</span></> : null}
        {step === 2 ? <><span>Task: inspect B-12 and record the next observation</span><span>Owner: sample round operator · next inspection round</span><span>Review: {reviewed ? "recorded" : "missing—record the review first"}</span><span>Equipment command: none</span></> : null}
        {step === 3 ? <><span>Task: {followUp ? "recorded for the sample operator" : "missing—record a task first"}</span><span>Outcome: {outcomeRecorded ? outcome : "not yet recorded"}</span><span>A changed response does not establish a cause or prove a treatment effect.</span></> : null}
        {step === 4 ? <><span>01 · Morning observation: {recorded ? observation : "not recorded"}</span><span>02 · Operator review: {reviewed ? "recorded; missing context acknowledged" : "not recorded"}</span><span>03 · Follow-up task: {followUp ? "inspection assigned to sample operator" : "not recorded"}</span><span>04 · Follow-up observation: {outcomeRecorded ? outcome : "not recorded—episode remains open"}</span></> : null}
      </div>
      {blocked ? <p role="status">Complete the earlier recording step before adding this entry. Exploring a tab does not record an action.</p> : null}
    </div>
    <div className={v.demoFoot}><small>Sample only. Choices remain in this open preview; no farm records are saved or equipment controlled. The operator beta is in development.</small><button type="button" disabled={blocked} onClick={advance}>{["Record sample observation", "Record operator review", "Record follow-up task", "Record sample outcome", "Start again"][step]} →</button></div>
  </div>;
}
