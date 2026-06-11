# Website Repositioning — Audit & Change Note

A copy/framing pass only. No redesign, no nav changes, no new pages. Every edit is an in-place change to existing content; nothing was invented beyond the two Step-4 additions flagged as missing. Visual system (light blue-grey, colored icon boxes, two-column grid, dark navy footer), navigation, and structure are preserved.

The single test applied to every edit: *does this read true to a technical investor who probes it?* Proven-today reads as fact; thesis reads as "building/designed to"; pilot outcomes read as "validating."

## Audit buckets

**Proven today (kept as present-tense fact):** R&D operating history, molt-driven grade-uplift economics, live export/retail market linkage, institutional backing (DPIIT, KIIT-TBI, DST-NIDHI PRAYAS, BIRAC). Industry/market stats (50–70% traditional mortality, $51 EU price, 4,500 t India export) describe the *problem*, not a Crabionics result — kept.

**Thesis / roadmap (re-tensed to future/aspirational):** AquaOS, CrabPod, CIN, the four/six-layer architecture, the closed loop. These now read as "being built / designed to," not deployed.

**Under validation (re-tensed to pilot objective):** survival, yield, unit economics, TRL-6, the dataset. These now read as what the 600-box pilot will establish, never as achieved.

## Re-tensed claims and why

Homepage (`app/page.tsx`)
- Closed-loop ring copy moved from "the system infers state… and acts" to "the architecture is designed to… — the loop the platform is being built to run." *Reason:* it described a deployed system; the loop is thesis.

Technology (`app/technology/page.tsx`, `components/diagrams/CINNetworkMap.tsx`)
- CIN section subtitle: "Live nodes feed real data today" → CIN labelled the long-term (Stage 3) layer; "today only the R&D site is active." *Reason:* claimed a running distributed network that does not exist yet.
- CIN map: "Pilot Site — KIIT-TBI" → "R&D Site — KIIT-TBI"; "Telemetry Edge Node" demoted from `live` to `pilot`; legend "Live/Pilot/Planned" → "Active today / Pilot (build) / Planned." *Reason:* the KIIT-TBI 600-box pilot is a 2026 validation objective per /capital — it cannot also be "live feeding real data."
- Photo strip subtitle: "Live infrastructure… from the deployment stack" → "R&D infrastructure… from the development stack." *Reason:* implied deployment at scale.

Capital (`app/capital/page.tsx`)
- Hero re-pointed from "Built on hardware, measured on milestones / converting…" to "Back the validation inflection of an operationally-experienced team" with an explicit stage statement (operationally experienced, architecturally coherent, commercially aware, entering first controlled-validation phase). *Reason:* Step 5 reframe from "fund our scaled platform" to backing the validation inflection.
- Thesis card: "AquaOS turns continuous telemetry into operational decisions" → "is being built to turn…" *Reason:* present tense implied deployment.
- Unit-economics subtitle now states the tonne/yr figures are "design targets the 600-box pilot is built to validate — not yet-achieved results." *Reason:* throughput numbers must read as targets under validation.
- Patents: use-of-funds "4 patent families" → "4 families · under filing." *Reason:* patents are under filing, not granted.
- TRL: 18-month outcome "TRL-6 validated IHMS" → "TRL-6 IHMS, validated through the 600-box RAS pilot"; "AquaOS live on cluster" → "AquaOS running on the pilot cluster." *Reason:* tie TRL/AquaOS to the pilot, not a deployed fleet.

AquaOS (`app/aquaos/page.tsx`, `components/sections/AquaOSControlLoop.tsx`)
- Hero: "AquaOS coordinates…" → "AquaOS is the control layer Crabionics is building to coordinate…" *Reason:* page read as deployed software.
- Dashboard mock relabelled "AquaOS Live Infrastructure" / green "Operational" badge / "Active synchronization" → "AquaOS Interface — Concept Preview" / cyan "In development" badge / "Designed signal flow." *Reason:* a green operational dashboard is the strongest false signal of a deployed platform.
- Control loop closing line "This is closed-loop biological control" → "the closed-loop biological control AquaOS is being built to run." *Reason:* thesis, not current state.

## Removed from public copy (lives in data room)
- Precise raise amount "₹50L – ₹3 Cr" → "Milestone-gated pre-seed"; valuation/round size note now reads "shared in the data room." *Reason:* Step 5 guardrail — keep precise valuation and raise amounts out of public copy.

## Added (Step 4 — confirmed absent before adding)
1. Homepage "What's real today" proof-of-operation strip (existing card style), three proven assets: 700+ individually-tracked crabs across soft-shell/hard-shell/RAS trials; molt-driven grade uplift (~3–4.6× per-unit value); live export & retail market linkage. Placed *before* the architecture so proof-of-operation leads. Plus a closing bridge line before the final CTA: "The 600-box pilot is the bridge — from operational intelligence to provable industrial causality."
2. Technology control-stack evolution timeline: manual logging → spreadsheets → AppSheet → Salesforce → telemetry → AquaOS (concept), framed as an origin story (emerged from operational pain, not software ambition).
3. Capital "The model, stated cleanly" statement: distributed production network — centralized biological intelligence (nursery + finishing) + decentralized farmer biomass growth, processor as customer taking guaranteed export-spec live + soft-shell supply. Plus a de-risked-vs-unlocked line on "The Ask."

## Not touched
Unused/orphaned section components (`AquaOSSection`, `DataIntelligenceSection`, `ClosedLoopSection`, `InfrastructureSection`, `RoadmapSection`, `ValidationSection`, `PlatformStackSection`, `SystemsInMotionSection`) are not imported by any page and were left alone to keep the pass minimal. If any are wired in later, the same "Live"/"Operational" re-tensing should be applied.

## Verification note
Type-check/build could not be run in this environment (sandbox out of disk space). All edits are string-level replacements within existing JSX structure; the two larger insertions reuse already-imported components (`GlassCard`, `card-light`). Recommend running `npm run build` / `tsc --noEmit` before merge.
