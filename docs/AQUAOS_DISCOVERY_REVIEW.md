# AquaOS public product discovery — review build

Baseline: production commit 3dcfb522bb73c9f21c9211754006f8e2c5fb8600, verified in Vercel on 19 October 2026. Website-only branch: design/aquaos-discovery. No CrabDesk source or records modified. No production release authorized.

## Implemented

- Replace homepage AquaOS illustration with three compact interactive chapters. Same component powers /demo and the deeper /aquaos showcase.
- See the operation: reveal conceptual overview connections; follow a change: reveal a generic linked follow-up; understand the history: connect earlier observation, follow-up and later update. User-paced, intended 30–45 seconds, no automatic progression.
- RAS grow-out software is working in CrabDesk (founder-confirmed); pond is upcoming. Hardware integration and biological/commercial validation are separate. Guided demonstrations require approved scope and team coordination; public links never enter the privileged demo.
- Real working capability is described in text; all graphics prominently labelled conceptual and explicitly not product screenshots. No synthetic screenshot presented as authentic.
- /early-access backend, form fields, confirmation and email delivery unchanged. Existing contact topic /contact#aquaos-beta handles guided-demo requests. Early-access copy clarifies current RAS/pond status.
- Aggregate events: teaser_view, teaser_start, teaser_overview, teaser_change, teaser_history, teaser_complete, guided_demo_click, registration_click. Existing form_attempt, verification_requested and confirmed retained. Private review dashboard displays discovery counts. Counts are not unique visitors or linked cohort conversion rates.
- Teaser events deduplicated per mounted experience; completion requires all three reveal actions. CTA clicks counted independently. No operational details, identities, queries or record values in event payloads. Existing broad source dimension, DNT/GPC opt-out, origin restrictions, private access and rate limits preserved.
- Native buttons, roving tab focus, arrows/Home/End, labelled tabpanel, polite announcements, focus outlines; reduced-motion CSS. No new library, video, canvas, continuous animation or product image downloads. Motion uses short opacity/transform transitions.

## Evidence inspected

- CP-81 full evidence view (19 October), linked AquaOS #76 release criteria and Confluence roadmap page 1605633, version 4, including 16 October addendum. Existing acceptance gates remain open; no Done/E1 promotion inferred.
- Authenticated read-only CrabDesk dashboard at demo.crabionics.com/dashboard, labelled Beta 0.1.0. Observed overview, activity summaries, recent records and water records; Ask Moltie present. This establishes rendered UI only. Exact release commit, data provenance, save/return, access isolation and grounding were not tested.
- Credential protection blocked later browser observations, including independent new tabs, after one permitted recovery navigation. No screenshot extracted or reused from the private demo. Further visual preview QA is blocked until browser handoff resolves the protected session.
- Existing analytics screenshots: mobile RES 97 from 13 events, desktop 44 from 3 events. Low sample size and hidden individual vitals prevent root-cause attribution. Existing custom private funnel was found in code despite no Vercel custom-event display. No claim of a measured performance improvement.

## Confidential material withheld

No live product screenshots, names, customer/supplier details, financial values, stock totals, readings, dates or internal identifiers copied. No box operations, physical layouts, control thresholds, algorithms, schema, SOPs, operational sequence or equipment designs. No administrator URL or credentials in public discovery code. Abhishek's app and ownership untouched.

## Review questions for Abhishek

1. Approve public product naming (AquaOS / CrabDesk) and wording for the working RAS capability.
2. Confirm exact reviewed build/commit, known limitations and current sample-vs-real data boundaries.
3. Identify an approved sample-only screenshot crop or recording, if desired. Until then, keep the conceptual visuals.
4. Approve scope and access process for guided demonstrations; no shared admin login or public app entry.
5. Reconcile #76 acceptance evidence for persistence, phone critical path, isolation, failure recovery and Moltie grounding separately from this marketing preview. Confirm pond status independently.

## Verification boundary

Registration and delivery tested with isolated mocked provider/storage fixtures; no new real email sent. Existing founder-reported successful delivery is not relabelled as a new end-to-end test. Browser QA and actual preview interaction timings must be recorded after the credential-protected session is resolved. No production changes in this task.
