"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  enquiryMessage,
  parseEnquiry,
  topics,
  type Enquiry,
  type Topic,
} from "../../lib/enquiry";
import s from "./Experience.module.css";
function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}
function snapshot() {
  return window.location.hash.slice(1);
}
export default function EnquiryForm({
  deliveryEnabled,
}: {
  deliveryEnabled: boolean;
}) {
  const hash = useSyncExternalStore(subscribe, snapshot, () => "");
  const [selectedTopic, setSelectedTopic] = useState<{
    hash: string;
    value: Topic;
  } | null>(null);
  const topic =
    (selectedTopic?.hash === hash ? selectedTopic.value : null) ||
    (Object.hasOwn(topics, hash) ? (hash as Topic) : "production");
  const [prepared, setPrepared] = useState<Enquiry | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSent(false);
    setCopied(false);
    const raw = Object.fromEntries(new FormData(event.currentTarget).entries());
    const { data, error: invalid } = parseEnquiry(raw);
    if (!data) {
      setError(invalid || "Please check the details.");
      return;
    }
    setPrepared(data);
    if (deliveryEnabled) {
      setBusy(true);
      try {
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(raw),
        });
        const payload = await response.json();
        if (response.ok && payload.sent === true) setSent(true);
        else
          setError(
            payload.error ||
              "The enquiry could not be sent. You can use the email option below.",
          );
      } catch {
        setError(
          "The enquiry could not be sent. Please use the email option below.",
        );
      } finally {
        setBusy(false);
      }
    }
    requestAnimationFrame(() => result.current?.focus());
  }
  const message = prepared ? enquiryMessage(prepared) : "";
  const mailto = prepared
    ? `mailto:info@crabionics.com?subject=${encodeURIComponent(topics[prepared.topic])}&body=${encodeURIComponent(message)}`
    : "mailto:info@crabionics.com";
  return (
    <form
      className={s.form}
      onSubmit={submit}
      onChange={() => {
        if (prepared) {
          setPrepared(null);
          setSent(false);
          setCopied(false);
        }
      }}
      aria-label="Partnership enquiry"
    >
      <div className={s.formGrid}>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor="enquiry-topic">What would you like to discuss?</label>
          <select
            id="enquiry-topic"
            name="topic"
            value={topic}
            onChange={(event) =>
              setSelectedTopic({ hash, value: event.target.value as Topic })
            }
          >
            {Object.entries(topics).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor="enquiry-name">Your name *</label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="enquiry-email">Email address *</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="enquiry-organisation">Organisation</label>
          <input
            id="enquiry-organisation"
            name="organisation"
            autoComplete="organization"
            maxLength={150}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="enquiry-region">Operating region *</label>
          <input
            id="enquiry-region"
            name="region"
            autoComplete="address-level1"
            required
            maxLength={100}
            placeholder="State / country"
          />
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor="enquiry-role">Your role *</label>
          <input
            id="enquiry-role"
            name="role"
            required
            maxLength={100}
            placeholder="Pond grower, finishing operator, buyer, researcher…"
          />
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label htmlFor="enquiry-message">Your setting and question *</label>
          <textarea
            id="enquiry-message"
            name="message"
            required
            minLength={10}
            maxLength={1500}
            placeholder="Tell us about your species, stock, current routines and what you would like to understand."
          />
        </div>
        <div className={s.honeypot} aria-hidden="true">
          <label htmlFor="enquiry-website">Leave this field empty</label>
          <input
            id="enquiry-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>
      <p className={s.formHelp}>
        {deliveryEnabled
          ? "The details you send will be used to respond to your enquiry."
          : "Prepare your enquiry here, then send it through your email app. Nothing is sent until you send the email."}{" "}
        <Link href="/privacy" className={s.textLink} style={{ fontSize: 12 }}>
          Privacy policy
        </Link>
      </p>
      {error && (
        <p role="alert" className={s.error}>
          {error}
        </p>
      )}
      <button type="submit" disabled={busy || sent} className={s.button}>
        {busy
          ? "Sending…"
          : sent
            ? "Enquiry sent"
            : deliveryEnabled
              ? "Send enquiry"
              : "Prepare email enquiry"}
        <span aria-hidden="true">↗</span>
      </button>
      {prepared && !busy && (
        <div
          ref={result}
          tabIndex={-1}
          className={s.success}
          aria-live="polite"
        >
          <h3>
            {sent
              ? "Your enquiry has been sent."
              : "Your enquiry is ready to review."}
          </h3>
          <p>
            {sent
              ? "The Crabionics team will review the setting and contact you to discuss fit and next steps."
              : "Check the details below. Open your email app to send them to info@crabionics.com, or copy the message into your preferred email service."}
          </p>
          {!sent && (
            <>
              <pre className={s.previewText}>{message}</pre>
              <div className={s.actions}>
                <a href={mailto} className={s.button}>
                  Open email app ↗
                </a>
                <button
                  type="button"
                  className={s.copyButton}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(message);
                      setCopied(true);
                    } catch {
                      setError("Please select and copy the message above.");
                    }
                  }}
                >
                  {copied ? "Message copied" : "Copy message"}
                </button>
              </div>
              <p className={s.formHelp}>
                Your enquiry has not been sent by this website.
              </p>
            </>
          )}
        </div>
      )}
      <noscript>
        <p>
          Please email your name, region, role and production question to{" "}
          <a href="mailto:info@crabionics.com">info@crabionics.com</a>.
        </p>
      </noscript>
    </form>
  );
}
