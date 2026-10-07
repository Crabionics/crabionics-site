"use client";
import { useState } from "react";
import v from "./Refinements.module.css";
const observations = ["Feed refusal noted", "Feeding response observed", "Follow-up inspection needed"] as const;
const stages = ["Observe", "Review", "Follow up", "History"];
export default function BetaDemo() {
  const [step, setStep] = useState(0);
  const [observation, setObservation] = useState<string>(observations[0]);
  const [reviewed, setReviewed] = useState(false);
  const [followUp, setFollowUp] = useState(false);
  const titles = ["Record what the operator saw.", "Review the context before deciding.", "Keep the next task visible.", "Reconstruct the sample episode."];
  function advance() {
    if(step===1) setReviewed(true);
    if(step===2) setFollowUp(true);
    if(step===3) { setStep(0); setReviewed(false); setFollowUp(false); return; }
    setStep(s=>s+1);
  }
  return <div className={v.demo}>
    <div className={v.demoHeader}><strong>AquaOS / Habitat B-12</strong><span>Illustrative workflow · sample data</span></div>
    <nav className={v.demoSteps} aria-label="Workflow preview steps">{stages.map((title,i)=><button key={title} type="button" aria-current={step===i?"step":undefined} onClick={()=>setStep(i)}>{i+1}. {title}</button>)}</nav>
    <div className={v.demoBody} aria-live="polite">
      <span className={v.sample}>Step {step+1} of 4 · {stages[step]}</span><h3>{titles[step]}</h3>
      {step===0 ? <><p>During the morning feeding round, attach an observation to the individual habitat.</p><label htmlFor="sample-observation">Sample observation</label><select id="sample-observation" className={v.sampleSelect} value={observation} onChange={event=>{setObservation(event.target.value);setReviewed(false);setFollowUp(false);}}>{observations.map(value=><option key={value}>{value}</option>)}</select></> : null}
      <div className={v.demoRecord}>
        <span>Example site: RAS grow-out · habitat B-12</span>
        <span>Source: operator · morning round</span>
        {step===0 ? <span>{observation}</span> : null}
        {step===1 ? <><span>Current observation: {observation}</span><span>Earlier feed responses: not provided in this example</span><span>No cause, diagnosis or recommendation is inferred.</span></> : null}
        {step===2 ? <><span>Operator task: inspect B-12 and record the next observation</span><span>Review: {reviewed?"logged in this sample session":"not logged—return to Review"}</span><span>Equipment command: none</span></> : null}
        {step===3 ? <><span>01 · Observation: {observation}</span><span>02 · Operator review: {reviewed?"logged":"not logged"}</span><span>03 · Follow-up: {followUp?"task logged; outcome still missing":"not logged"}</span><span>Next evidence: the operator’s follow-up observation</span></> : null}
      </div>
    </div>
    <div className={v.demoFoot}><small>Illustrative example, not the released beta. Your choices last only while this preview is open. No farm records are saved or equipment controlled.</small><button type="button" onClick={advance}>{["Review sample observation", "Log sample review", "Log follow-up task", "Start again"][step]} →</button></div>
  </div>;
}
