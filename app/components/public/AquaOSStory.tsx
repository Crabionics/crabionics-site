import { Eyebrow, TextLink } from "./Experience";
import a from "./AquaOSStory.module.css";
const loop = [
 ["Production setting", "Habitat, stock & water", "Define where the work happens and which conditions matter."],
 ["Observe", "Operator records / CrabSense", "Connect a time, source and production context to each observation."],
 ["Understand", "AquaOS context & records", "Bring the current observation and previous work into one view."],
 ["Decide", "Operator review", "Review the evidence, missing information and permitted next step."],
 ["Act", "Operator / CrabPod", "Track the response. Equipment connection needs its own integration."],
 ["Learn", "Outcome & operating history", "Record what changed, so the next decision has more useful context."],
] as const;
export function OperatingLoop() {
 return <figure className={a.loop}><div className={a.loopTitle}><Eyebrow>The intended operating loop</Eyebrow><h3>From physical work to evidence for the next decision.</h3></div><ol>{loop.map(([title,label,detail],index)=><li key={title}><span className={a.number}>0{index+1}</span><h4>{title}</h4><strong>{label}</strong><p>{detail}</p>{index<loop.length-1?<span className={`${a.arrow} ${index === 2 ? a.wrapArrow : ""}`} aria-hidden="true">→</span>:null}</li>)}</ol><div className={a.return}><span aria-hidden="true">↺</span>Outcome history returns to AquaOS as context for the next observation and decision.</div><figcaption>System direction · the website demonstration uses sample records. Connected hardware and production benefits require separate validation.</figcaption></figure>;
}
export function OperatorCapabilities() {
 return <div className={a.capabilities}>{[
 ["Know the setting","What are we operating?","Site, production stage, stock and system context make a record meaningful.","Example: connect a site, box and stock record before recording a feeding check."],
 ["Keep the work connected","What happened since the last check?","Observations and follow-ups belong to a shared operating history.","Example: review feeding rounds, a manual water reading and a molt observation together."],
 ["Review the next step","What do we know—and what is missing?","Decision support should show its records and leave review with the operator.","Example: see an inspection still pending and the observation that prompted it."],
 ["Close the loop","What changed after the response?","Actions need an outcome record before they can inform the next decision.","Example: trace a later weight or transfer back to the same stock history."],
 ].map(([title,question,body,example],index)=><article key={title}><span className={a.number}>0{index+1}</span><h3>{title}</h3><strong>{question}</strong><p>{body}</p><p className={a.practical}>{example}</p></article>)}</div>;
}
export function DevelopmentLayers() {
 return <div className={a.layers}>{[
 ["Software foundations","The operating structure","Software and synthetic workflows form the foundation for connecting context, records, decisions and response."],
 ["Proposed operator beta","A useful daily workspace","Setup, observations, saved history and assistance grounded in those records. Release scope and participant fit are being planned."],
 ["Physical integration in development","Connect to the production setting","CrabSense observations and CrabPod execution need integration, permitted actions and outcome evidence in the actual setting."],
 ].map(([status,title,detail])=><article key={status}><span className={a.state}>{status}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>;
}
export function CopilotPosition() {
 return <div className={a.copilot}><div><Eyebrow>The operator experience</Eyebrow><h2>A workspace to see the work.<br/>A copilot to ask about it.</h2><p>The intended copilot helps an operator explore their production context and recorded history. Useful assistance must make its evidence and missing information visible.</p><TextLink href="/early-access">Help shape the operator beta</TextLink></div><div className={a.example}><span>Example question for the planned beta</span><blockquote>“What changed since the last feeding check, and which follow-up is still open?”</blockquote><p>The answer should refer to the recorded observations and actions. If no outcome has been recorded, that gap should remain clear.</p><strong>AquaOS connects the records and operating loop underneath this conversation.</strong></div></div>;
}

