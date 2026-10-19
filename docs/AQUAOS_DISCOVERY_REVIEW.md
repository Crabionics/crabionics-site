# CrabDesk + Moltie responsive discovery — review build

Website branch: design/aquaos-discovery. Production baseline: 3dcfb522bb73c9f21c9211754006f8e2c5fb8600. Supersedes the abstract conceptual teaser in 0cdcaf0. Preview only; no production release authorized.

## What changed

- Same responsive component replaces the homepage illustration and powers /aquaos and /demo. AquaOS is the broader platform; CrabDesk + Moltie are its first working RAS grow-out capability. No claim of general commercial availability, biological validation or physical closed-loop integration.
- Three user-paced steps: check the stock/activity overview and switch monthly/weekly captured views; choose between two recorded Moltie answers; compare the count with the captured dashboard source.
- Authentic screenshots, clearly labelled demo records and recorded build. The assistant replay is not a live chat. Both replies are exact observed responses, not generated marketing copy. The help response is displayed as a recorded transcript, not a fabricated screenshot.
- Source inspector compares 331 with the actual dashboard card. This demonstrates one matching count only, not independent verification of all source grounding or all assistant answers.
- Desktop has a split product/explanation layout; phone uses a full-width product view and touch controls. Tabs support arrows, Home and End. Native buttons, text alternatives, polite status messages, visible focus and reduced-motion rules. No automatic typing, autoplay, continuous animation or external app connection.
- /early-access registration, confirmation and lead-delivery code untouched. Contact topic and registration CTA routes unchanged. Aggregate events carry only closed event/page/source dimensions, never questions, answers, counts, personal information or record IDs. New replay counters are moltie_count_replay and moltie_help_replay.
- Six cropped WebP captures total about 67 KB before optional Next image transformations. No new dependency. All captures are non-interactive snapshots; public actions only change local website state.

## Evidence and authorization

- Founder confirmed on 19 October 2026: 'those are demo records data not private data you can use'. This permits these sample records in the preview/video; product-owner public-release review remains outstanding.
- Authenticated CrabDesk Beta 0.1.0 dashboard inspected on 19 October. Monthly/weekly period switch observed and captured. Week view is zero events, reflecting the beginning of the displayed week; not a software error or production result.
- Actual Moltie question: 'How many crabs are in the system?' Reply: 'There are 331 crabs in the system right now: 159 male and 172 female. They occupy 331 of the 600 boxes, leaving 269 free.' UI displayed Dashboard this month, Live crabs, and Past crabs all time source links.
- Actual capability prompt: 'In one sentence, what can you help with in CrabDesk? Do not look up or include farm records, names, identifiers, measurements, prices, thresholds, or operational instructions.' Reply: 'I can help you with questions about your farm\'s crab data in CrabDesk, such as growth, batches, suppliers, water tests and daily activity, and with how to use the app.' The public question label is shortened; transcript note identifies generic capability question.
- Existing CP-81, AquaOS issue #76 and Confluence page 1605633 v4 remain governing beta criteria. No new PMO work, no acceptance status changes. Navigation and these successful queries do not establish persistence, isolation or a completed beta release.

## What is withheld

No login links, admin account controls, credentials, individual box identifiers, sampling sequences, supplier rows, complete RAS configurations, thresholds, control algorithms, schemas, SOPs, equipment designs or live app API access. Screenshot crops include aggregate sample counts and demo valuation; founder identifies them as demo data. Moltie's aggregate occupancy answer is shown, without box operations or physical configuration. No CrabDesk source changed and no farm record created/edited. Only authorized read questions submitted to Moltie.

## Product-owner review before public release

Abhishek to confirm public naming, approved crops/transcripts, exact build-to-commit mapping, known Moltie limits, and guided-demo scope/access. Confirm working RAS wording and keep pond upcoming. Hardware/biological validation evidence must remain separate. No new support, pricing or launch commitments created.

## Verification

Clean build, TypeScript, targeted ESLint and links across 33 pages passed. All 12 public API fixtures passed, including registration consent, confirmation, delivery retry and aggregate replay counters. Hosted browser tests exercised weekly/monthly selection, both recorded replies, source comparison, completion, Home/ArrowRight keyboard navigation and loaded captures. Iframe viewport checks at 320, 390, 768 and 1280 px found no horizontal overflow. Phone typography inheritance was detected and fixed with isolated selector specificity. Phone selections bring the result into view and respect reduced motion. Reduced-motion rules verified in source; no OS-level preference emulation available. API fixtures mock providers/storage; no new real registration or email sent. Existing founder-confirmed registration/email flow remains the real delivery evidence. Production unchanged. Preview registration environment is not connected to email verification, so it displays the existing mailto fallback. Production /early-access was inspected read-only and still shows Register early-access interest plus email-confirmation instructions. No new live submission or email delivery was tested. Preview Redis persistence was not independently verified; aggregate event API fixtures passed. Two 30-second captioned, silent review videos were rendered separately at 1920x1080 and 1080x1920; both passed full MP4 decode.
