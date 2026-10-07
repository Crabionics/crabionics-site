import { Eyebrow, TextLink } from "./Experience";
import a from "./AquaOSStory.module.css";
import { Glyph } from "./Visuals";
const loop = [
 ["Production setting", "Habitat, stock & water", "habitat"],
 ["Observe", "Operator records / CrabSense", "sense"],
 ["Understand", "AquaOS context & records", "record"],
 ["Decide", "Operator review", "decision"],
 ["Act", "Operator / CrabPod", "pod"],
 ["Learn", "Outcome & operating history", "record"],
] as const;
export function OperatingLoop() {
 return <figure className={a.loop}><div className={a.loopTitle}><Eyebrow>The intended operating loop</Eyebrow><h3>One connected production cycle.</h3></div><ol>{loop.map(([title,label,icon],index)=><li key={title}><div className={a.iconRow}><Glyph kind={icon}/><span className={a.number}>0{index+1}</span></div><h4>{title}</h4><strong>{label}</strong>{index<loop.length-1?<span className={`${a.arrow} ${index === 2 ? a.wrapArrow : ""}`} aria-hidden="true">→</span>:null}</li>)}</ol><div className={a.return}><span aria-hidden="true">↺</span>Each outcome becomes context for the next decision.</div><figcaption>Intended system architecture · decisions stay with the operator.</figcaption></figure>;
}
export function OperatingExample() {
 return <figure className={a.operatingExample}><figcaption><Eyebrow>A concrete operating example</Eyebrow><h3>A feeding observation becomes a trackable follow-up.</h3><span>Illustrative prototype · sample habitat B-12</span></figcaption><ol>{[
  ["sense", "Observation", "Feed refusal noted", "Morning round · operator source"],
  ["decision", "Review", "What needs checking?", "Earlier feeding and water context missing"],
  ["pod", "Task", "Inspect habitat B-12", "Round operator · next inspection"],
  ["record", "Outcome", "Record the next response", "Keep the observation with the same history"],
 ].map(([icon,title,detail,caption])=><li key={title}><Glyph kind={icon}/><span>{title}</span><strong>{detail}</strong><small>{caption}</small></li>)}</ol><TextLink href="/demo">Try recording this episode</TextLink></figure>;
}
export function OperatorCapabilities() {
 return <div className={a.capabilities}>{[
 ["Know the setting","Site → habitat → stock","Connect the production stage and stock before a feeding check."],
 ["Keep the work connected","Feeding · water · molt","Bring observations from successive rounds into the same history."],
 ["Review the next step","Evidence → operator → task","Show the observation behind a pending inspection and any missing context."],
 ["Close the loop","Action → follow-up → history","Keep a later observation, weight or transfer connected to the same stock."],
 ].map(([title,question,example],index)=><article key={title}><span className={a.number}>0{index+1}</span><h3>{title}</h3><strong>{question}</strong><p>{example}</p></article>)}</div>;
}
export function DevelopmentLayers() {
 return <div className={a.layers}>{[
 ["Explore today","Illustrative workflow","Try the public sample. It saves no farm records and controls no equipment."],
 ["Proposed operator beta","One useful daily routine","A focused workspace for context, observations, follow-ups and record-grounded assistance. Scope and participant fit are being planned."],
 ["Later integration","Connected physical work","Connect CrabSense and CrabPod after testing permitted actions, hardware integration and production outcomes."],
 ].map(([status,title,detail])=><article key={status}><span className={a.state}>{status}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>;
}
export function CopilotPosition() {
 return <div className={a.copilot}><div><Eyebrow>The operator experience</Eyebrow><h2>A workspace to see the work.<br/>A copilot to ask about it.</h2><p>The planned copilot draws on operating records, showing both its evidence and missing information.</p><TextLink href="/early-access">Help shape the operator beta</TextLink></div><div className={a.example}><span>Illustrative copilot question · planned capability</span><blockquote>“What changed since the last feeding check, and which follow-up is still open?”</blockquote><div className={a.answer}><strong>Sample record trail</strong><p>B-12: feed refusal recorded → inspection assigned → follow-up observation still missing.</p></div></div></div>;
}

