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
  notification?: string;
};
export default function DemandReview() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
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
      setToken("");
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
        <div className={s.field}>
          <label htmlFor="review-token">Private review token</label>
          <input
            id="review-token"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
            autoComplete="off"
          />
        </div>
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
                  Updates: {row.updates ? "Opted in" : "Not opted in"}
                  <br />
                  Email notification: {row.notification || "Not recorded"}
                </p>
              </details>
            ))}
          </div>
        </>
      )}
    </>
  );
}
