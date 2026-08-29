# Control Tower V5 — Operational Truth-Sync

Status: EXECUTION
Authority: Crabionics PMO `CURRENT_STATE.md`
Baseline: PMO #79

## Objective
Upgrade the existing Control Tower so founder-critical operational state is derived from authoritative PMO state rather than stale or hard-coded values.

## Scope
- Current Horizon: PMO-derived.
- Current Gate: PMO-derived.
- Current execution priorities/spine: PMO-derived where represented by authoritative state.
- Active blockers/dependencies: PMO-derived where represented.
- Founder actions/decisions: PMO-derived where represented; otherwise explicitly unavailable.
- Source/freshness remains visible.
- Fetch/error/stale states are explicit.

## Non-goals
No new status database, no dashboard redesign, no reopening PMO #79, no invented PMO fields, and no engineering/physical/biological validation claims.

## Acceptance
1. Operational values are traceable to PMO or explicitly unavailable.
2. No stale hard-coded operational fallback.
3. Source/freshness is visible.
4. Error/stale state is distinguishable from current state.
5. Existing route and core UX remain intact.
6. Build/tests pass.
7. Exact source fields and commit/PR are recorded.
