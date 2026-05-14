"use client";

import { useEffect, useState } from "react";

/**
 * One-shot branded intro. Plays for ~900ms on the first navigation in a session,
 * then is skipped on subsequent route changes via sessionStorage.
 *
 * Behavior:
 *  - On mount, checks sessionStorage("crab.intro.shown"). If set, do nothing.
 *  - Otherwise, plays for `INTRO_MS`, sets the flag, then unmounts.
 *  - Pointer-events disabled while playing on the body via overlay alone.
 */
const INTRO_MS = 900;
const FADE_MS = 350;

export default function LoadingIntro() {
  const [mounted, setMounted] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const already = sessionStorage.getItem("crab.intro.shown") === "1";
    if (already) return;

    setVisible(true);

    const t1 = window.setTimeout(() => setFadingOut(true), INTRO_MS);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("crab.intro.shown", "1");
    }, INTRO_MS + FADE_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#050816",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="introStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1DA8DD" />
            <stop offset="100%" stopColor="#25B947" />
          </linearGradient>
        </defs>

        {/* Outer ring — drawn from 0 to full circumference */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="url(#introStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={{
            animation: `crab-intro-draw ${INTRO_MS}ms cubic-bezier(0.6, 0.05, 0.2, 1) forwards`,
            transformOrigin: "60px 60px",
          }}
        />

        {/* Center dot */}
        <circle cx="60" cy="60" r="4" fill="#1DA8DD">
          <animate attributeName="opacity" values="0;1" dur="500ms" fill="freeze" begin="350ms" />
        </circle>
      </svg>

      {/* Wordmark */}
      <p
        style={{
          position: "absolute",
          bottom: "calc(50% - 90px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display), serif",
          fontSize: "20px",
          letterSpacing: "0.06em",
          color: "#f8fafc",
          opacity: 0,
          animation: `crab-intro-fadein 500ms ease forwards`,
          animationDelay: "450ms",
        }}
      >
        Crabionics
      </p>

      {/* Inline keyframes — scoped via the unique animation names */}
      <style>{`
        @keyframes crab-intro-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes crab-intro-fadein {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
