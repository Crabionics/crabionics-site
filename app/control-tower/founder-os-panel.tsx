import { founderActions, founderDecisions } from "./founder-os";

type Props = { currentConstraint: string };

export default function FounderOSPanel({ currentConstraint }: Props) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <section>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", fontWeight: 700, opacity: 0.7 }}>CURRENT CONSTRAINT</div>
        <h2 style={{ margin: "0.35rem 0" }}>{currentConstraint}</h2>
        <p style={{ margin: 0, opacity: 0.72 }}>This is a track constraint, not a claim that the entire company is blocked.</p>
      </section>

      <section>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", fontWeight: 700, opacity: 0.7 }}>FOUNDER DECISION QUEUE</div>
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.6rem" }}>
          {founderDecisions.map((decision) => (
            <article key={decision.id} style={{ border: "1px solid rgba(15,23,42,.12)", borderRadius: 14, padding: "1rem", background: "rgba(255,255,255,.7)" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, opacity: 0.6 }}>{decision.id}</div>
              <h3 style={{ margin: "0.3rem 0" }}>{decision.question}</h3>
              <p style={{ margin: "0.35rem 0", opacity: 0.72 }}><b>WHY NOW</b> — {decision.whyNow}</p>
              <p style={{ margin: "0.35rem 0" }}><b>RECOMMENDATION</b> — {decision.recommendation}</p>
              <p style={{ margin: "0.35rem 0", fontSize: "0.82rem", opacity: 0.65 }}>{decision.evidence.status} · {decision.evidence.source}</p>
              <a href={decision.actionHref} target="_blank" rel="noreferrer">{decision.actionLabel} ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", fontWeight: 700, opacity: 0.7 }}>EXECUTE / PRIORITIZE</div>
        <div style={{ display: "grid", gap: "0.65rem", marginTop: "0.6rem" }}>
          {founderActions.map((action) => (
            <a key={action.title} href={action.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit", border: "1px solid rgba(15,23,42,.1)", borderRadius: 12, padding: "0.8rem" }}>
              <b>{action.title}</b>
              <div style={{ marginTop: "0.25rem", opacity: 0.7, fontSize: "0.88rem" }}>{action.why}</div>
              <div style={{ marginTop: "0.35rem", opacity: 0.55, fontSize: "0.76rem" }}>{action.evidence} ↗</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
