"use client";
import { useState } from "react";
import v from "./Refinements.module.css";
const stages = [
  {
    name: "Observe",
    title: "A useful record starts with context.",
    body: "Choose a pond and attach the observation to the work happening there.",
    action: "Record sample observation",
    rows: [
      "Pond A · sample cohort",
      "Routine check · stock handling noted",
      "Source: operator observation",
    ],
  },
  {
    name: "Review",
    title: "See the setting before deciding.",
    body: "Review the observation alongside recent operating work.",
    action: "Log sample decision",
    rows: [
      "Observation added to Pond A",
      "Recent event: handling recorded",
      "Operator review: follow-up check needed",
    ],
  },
  {
    name: "Act",
    title: "Keep the operator decision visible.",
    body: "Record a follow-up task and who will review it. No equipment command is sent.",
    action: "See operating history",
    rows: [
      "Decision: schedule another observation",
      "Assigned role: pond operator",
      "Equipment connection: outside this walkthrough",
    ],
  },
  {
    name: "History",
    title: "The record follows the work.",
    body: "The observation, review and follow-up remain connected in one timeline.",
    action: "Start again",
    rows: [
      "01 · Observation recorded",
      "02 · Operator review completed",
      "03 · Follow-up task logged",
    ],
  },
];
export default function BetaDemo() {
  const [step, setStep] = useState(0);
  const stage = stages[step];
  return (
    <div className={v.demo}>
      <div className={v.demoHeader}>
        <strong>AquaOS / Pond A</strong>
        <span>Interactive walkthrough · sample data</span>
      </div>
      <nav className={v.demoSteps} aria-label="Walkthrough steps">
        {stages.map((stage, i) => (
          <button
            key={stage.name}
            type="button"
            aria-current={step === i ? "step" : undefined}
            onClick={() => setStep(i)}
          >
            {i + 1}. {stage.name}
          </button>
        ))}
      </nav>
      <div className={v.demoBody} aria-live="polite">
        <span className={v.sample}>
          Step {step + 1} of 4 · {stage.name}
        </span>
        <h3>{stage.title}</h3>
        <p>{stage.body}</p>
        <div className={v.demoRecord}>
          {stage.rows.map((row) => (
            <span key={row}>{row}</span>
          ))}
        </div>
      </div>
      <div className={v.demoFoot}>
        <small>
          Sample information only. No farm data is saved and no equipment is
          controlled.
        </small>
        <button onClick={() => setStep((step + 1) % 4)}>
          {stage.action} →
        </button>
      </div>
    </div>
  );
}
