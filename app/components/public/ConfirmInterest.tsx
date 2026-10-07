"use client";
import { useState } from "react";
import s from "./Experience.module.css";
export default function ConfirmInterest({ token }: { token: string }) {
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <button
        className={s.button}
        disabled={busy || state === "confirmed"}
        onClick={async () => {
          setBusy(true);
          try {
            const response = await fetch("/api/early-access", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
            });
            const body = await response.json();
            setState(
              response.ok && body.confirmed
                ? "confirmed"
                : body.error || "Please try again.",
            );
          } catch {
            setState("Connection failed. Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy
          ? "Confirming…"
          : state === "confirmed"
            ? "Interest confirmed"
            : "Confirm my early-access interest"}
      </button>
      <p aria-live="polite">
        {state === "confirmed"
          ? "Your interest is registered. The team will discuss a suitable next step; trial timing is agreed individually."
          : state}
      </p>
    </div>
  );
}
