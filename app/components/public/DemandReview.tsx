"use client";
import { useState, type FormEvent } from "react";
import s from "./Experience.module.css";
import v from "./Refinements.module.css";
type Row = {
  name: string;
  email: string;
  role: string;
  region: string;
  interest: string;
  updates: boolean;
  setting: string;
  createdAt: string;
  confirmedAt: string;
  notification?: string;
};
export default function DemandReview({ identityAccess = false }: { identityAccess?: boolean }) {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [credential, setCredential] = useState("");
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [funnel, setFunnel] = useState<Record<string, number> | null>(null);
  async function load(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setRows(null);
    setError("");
    try {
      const response = await fetch("/api/early-access/export?format=json", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok)
        throw new Error(
          response.status === 401
            ? "Access not available. Use the private review token after service setup."
            : "Registration storage is unavailable.",
        );
      const data = await response.json();
      setRows(data.records);
      setNextOffset(data.nextOffset);
      setCredential(token);
      setToken("");
      try {
        const metrics = await fetch("/api/funnel", {headers:{Authorization:`Bearer ${token}`}, cache:"no-store"});
        if (metrics.ok) {
          const payload = await metrics.json();
          const totals: Record<string, number> = {};
          for (const day of payload.days) for (const [key, value] of Object.entries(day.counts)) totals[key] = (totals[key] || 0) + Number(value);
          setFunnel(totals);
        }
      } catch { setFunnel(null); }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load registrations.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function action(action: "retry" | "delete", email?: string) {
    if (action === "delete" && !window.confirm("Permanently remove this registration?")) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/early-access/export", {method:"POST", headers:{"Content-Type":"application/json", Authorization:`Bearer ${credential}`}, body:JSON.stringify({action,email})});
      if (!response.ok) throw new Error("The action could not be completed.");
      if (action === "delete") setRows(previous => previous?.filter(row => row.email !== email) || null);
      else setError("Retry processed. Reload to see the latest delivery status.");
    } catch (error) {setError(error instanceof Error ? error.message : "Action unavailable.");}
    finally {setBusy(false);}
  }
  async function more() {
    setBusy(true);
    try {
      const response = await fetch(`/api/early-access/export?format=json&offset=${nextOffset}`, {headers:{Authorization:`Bearer ${credential}`},cache:"no-store"});
      if (!response.ok) throw new Error("Unable to load more registrations.");
      const data = await response.json(); setRows(previous => [...(previous || []), ...data.records]); setNextOffset(data.nextOffset);
    } catch (error) {setError(error instanceof Error ? error.message : "Load unavailable.");} finally {setBusy(false);}
  }
  function download() {
    const fields = ["name","email","role","region","interest","setting","updates","createdAt","confirmedAt","notification"] as const;
    const cell = (value: unknown) => '"' + String(value ?? "").replace(/^\s*[=+@-]/,"'$&").replaceAll('"','""') + '"';
    const csv = [fields.join(","), ...(rows || []).map(row => fields.map(field => cell(row[field])).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="crabionics-confirmed-interest.csv"; link.click(); URL.revokeObjectURL(url);
  }
  const grouped = (field: "region" | "interest") =>
    Object.entries(
      (rows || []).reduce<Record<string, number>>((result, row) => {
        result[row[field]] = (result[row[field]] || 0) + 1;
        return result;
      }, {}),
    );
  return (
    <>
      <div className={v.notice}>
        Private team review. Counts appear only after authorized access to
        confirmed registrations. No sample registrations are included.
      </div>
      <form onSubmit={load} className={s.form}>
        {!identityAccess && <div className={s.field}>
          <label htmlFor="review-token">Private review token</label>
          <input
            id="review-token"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
            autoComplete="off"
          />
        </div>}
        <button className={s.button} disabled={busy}>
          {busy ? "Loading…" : "Load confirmed interest"}
        </button>
        {error && (
          <p role="alert" className={s.error}>
            {error}
          </p>
        )}
      </form>
      <div style={{ marginTop: 30 }} className={v.states}>
        <div>
          <small>Verified demand</small>
          <strong>{rows ? rows.length : "—"}</strong>
          <p>Confirmed registrations</p>
        </div>
        <div>
          <small>Production reach</small>
          <strong>{rows ? grouped("region").length : "—"}</strong>
          <p>Operating regions</p>
        </div>
        <div>
          <small>Optional updates</small>
          <strong>
            {rows ? rows.filter((row) => row.updates).length : "—"}
          </strong>
          <p>Explicit update opt-ins</p>
        </div>
      </div>
      {rows && (
        <>
          {funnel && <section style={{marginTop:30}}>
            <h3>Website journey · last 30 days</h3>
            <p>Anonymous event totals by broad source. These are activity counts, not unique people or a tracked conversion cohort. Confirmed registrations above are the demand record.</p>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",textAlign:"left",borderSpacing:12}}>
              <thead><tr><th scope="col">Source</th><th scope="col">Views</th><th scope="col">Form attempts</th><th scope="col">Verification requests</th><th scope="col">Confirmation events</th><th scope="col">Enquiries sent</th></tr></thead>
              <tbody>{["direct","youtube","linkedin","other"].map(source => <tr key={source}><th scope="row">{source}</th>{["view","form_attempt","verification_requested","confirmed","enquiry_sent"].map(event => <td key={event}>{Object.entries(funnel).filter(([key]) => key.startsWith(`${source}:`) && key.endsWith(`:${event}`)).reduce((sum,[,value]) => sum+value,0)}</td>)}</tr>)}</tbody>
            </table></div>
          </section>}
          <p>Counts cover the registrations loaded below. Export and deletion requests are handled through this private review.</p>
          <button className={s.button} disabled={busy} onClick={download}>Export loaded registrations</button>{" "}
          <button className={s.button} disabled={busy} onClick={() => action("retry")}>Retry pending emails</button>
          {nextOffset !== null && <button className={s.button} disabled={busy} onClick={more}>Load more registrations</button>}
          <div style={{ marginTop: 30 }} className={s.split}>
            {(["region", "interest"] as const).map((field) => (
              <div key={field}>
                <h3>{field === "region" ? "Regions" : "Primary interests"}</h3>
                <ul>
                  {grouped(field).map(([label, count]) => (
                    <li key={label}>
                      {label}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={s.faq}>
            {rows.map((row) => (
              <details key={row.email}>
                <summary>
                  {row.name} · {row.role}
                </summary>
                <p>
                  {row.email} · {row.region}
                  <br />
                  {row.interest}
                  <br />
                  Daily routine: {row.setting || "Not provided"}
                  <br />
                  Updates: {row.updates ? "Opted in" : "Not opted in"}
                  <br />
                  Email notification: {row.notification || "Not recorded"}
                </p>
                <button disabled={busy} onClick={() => action("retry", row.email)}>Retry emails</button>{" "}
                <button disabled={busy} onClick={() => action("delete", row.email)}>Delete registration</button>
              </details>
            ))}
          </div>
        </>
      )}
    </>
  );
}
