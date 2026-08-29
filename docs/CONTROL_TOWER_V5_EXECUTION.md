# Control Tower V5 — Operational Truth-Sync

Objective: remove stale/hard-coded founder-critical operational state from the existing `/control-tower` projection and source it from authoritative PMO `CURRENT_STATE.md`.

Scope: PMO-derived current horizon, current gate, execution spine/priorities and blockers where represented; explicit source/freshness and error/stale state; preserve existing UX; no second status database; no redesign; no engineering/physical/biological validation claims.

Acceptance: operational values trace to PMO or are explicitly unavailable; no silent stale fallback; source/freshness visible; error/stale state distinguishable; existing route/core UX intact; build/tests pass; exact source fields and commit/PR recorded.