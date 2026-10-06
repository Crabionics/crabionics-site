"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  interests,
  parseRegistration,
  registrationMessage,
} from "../../lib/early-access";
import s from "./Experience.module.css";
import v from "./Refinements.module.css";
export default function EarlyAccessForm({ enabled }: { enabled: boolean }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSent(false);
    setCopied(false);
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const data = parseRegistration({
      ...raw,
      consent: raw.consent === "on",
      updates: raw.updates === "on",
    });
    if (!data) {
      setError("Please check your details and contact permission.");
      return;
    }
    setMessage(registrationMessage(data));
    if (enabled) {
      setBusy(true);
      try {
        const response = await fetch("/api/early-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, website: raw.website }),
        });
        const payload = await response.json();
        if (response.ok && payload.verificationRequested) setSent(true);
        else setError(payload.error || "Please use the email option below.");
      } catch {
        setError("Please use the email option below.");
      } finally {
        setBusy(false);
      }
    }
    requestAnimationFrame(() => result.current?.focus());
  }
  return (
    <form
      className={s.form}
      onSubmit={submit}
      onChange={() => {
        setMessage("");
        setSent(false);
        setCopied(false);
      }}
      aria-label="Early-access interest"
    >
      <div className={s.formGrid}>
        {[
          ["name", "Your name *", "text"],
          ["email", "Email address *", "email"],
          ["role", "Your role *", "text"],
          ["region", "Operating region *", "text"],
        ].map(([name, label, type]) => (
          <div key={name} className={s.field}>
            <label htmlFor={`beta-${name}`}>{label}</label>
            <input
              id={`beta-${name}`}
              name={name}
              type={type}
              maxLength={name === "email" ? 254 : 100}
              required
              autoComplete={
                name === "name"
                  ? "name"
                  : name === "email"
                    ? "email"
                    : undefined
              }
            />
          </div>
        ))}
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor="beta-interest">What interests you most?</label>
          <select id="beta-interest" name="interest">
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor="beta-setting">
            Your production setting (optional)
          </label>
          <textarea
            id="beta-setting"
            name="setting"
            maxLength={500}
            placeholder="Pond or production setting, current records, and what you want to improve."
          />
        </div>
        <div className={s.honeypot} aria-hidden="true">
          <label htmlFor="beta-website">Leave empty</label>
          <input
            id="beta-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>
      <label className={v.consent}>
        <input type="checkbox" name="consent" required />I agree that Crabionics
        may use these details to contact me about early access.{" "}
        <Link href="/privacy">Privacy policy</Link>
      </label>
      <label className={v.consent}>
        <input type="checkbox" name="updates" />
        Also send me occasional beta progress updates (optional).
      </label>
      {!enabled && (
        <div className={v.notice}>
          Preview: direct registration and email verification are not connected
          yet. You can prepare an interest email for the team. This does not add
          you to a verified registration list.
        </div>
      )}
      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}
      <button className={s.button} disabled={busy || sent}>
        {busy
          ? "Preparing…"
          : enabled
            ? "Register early-access interest"
            : "Prepare early-access email"}{" "}
        ↗
      </button>
      {message && (
        <div
          ref={result}
          tabIndex={-1}
          className={s.success}
          aria-live="polite"
        >
          <h3>
            {sent
              ? "Check your inbox to confirm."
              : "Your interest email is ready."}
          </h3>
          <p>
            {sent
              ? "If confirmation is needed, an email will arrive with a seven-day verification link. Already confirmed? Your interest remains registered."
              : "Review these details, then send them from your email app. The website has not registered or sent them."}
          </p>
          {!sent && (
            <>
              <pre className={s.previewText}>{message}</pre>
              <div className={s.actions}>
                <a
                  className={s.button}
                  href={`mailto:info@crabionics.com?subject=AquaOS%20early-access%20interest&body=${encodeURIComponent(message)}`}
                >
                  Open email app ↗
                </a>
                <button
                  type="button"
                  className={`${s.button} ${s.secondary}`}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(message);
                      setCopied(true);
                    } catch {
                      setError("Please select and copy the message above.");
                    }
                  }}
                >
                  {copied ? "Copied" : "Copy message"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <noscript>Please email info@crabionics.com to express interest.</noscript>
    </form>
  );
}
