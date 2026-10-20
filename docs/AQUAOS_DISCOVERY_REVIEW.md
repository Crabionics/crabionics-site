# CrabDesk + Moltie product film and ocean palette — review build

Website branch: design/aquaos-discovery. Production baseline 3dcfb522bb73c9f21c9211754006f8e2c5fb8600. Preview only; no production release authorized. Supersedes the interactive replay after founder direction on 20 October 2026.

## Implemented

- Removed the interactive discovery component. Homepage illustration area, /aquaos and existing /demo route now use the same compact ProductFilm component. No new public route.
- Two separately framed 30-second films: 16:9 desktop and 9:16 phone. Native controls, playsInline, focus transfer to player, visible keyboard focus and silent on-screen captions. A responsive real-product poster is shown first; no video request before the user presses Play. Phone and desktop use different source files selected at play time. No autoplay on page load.
- Product CTA uses the existing /early-access#register route and tested email-confirmation/lead-delivery implementation. No additional registration form, recipient, API or notification workflow. An unconfigured Vercel preview redirects that existing route to https://www.crabionics.com/early-access#register rather than displaying the disconnected preview fallback. Configured preview and production behaviour are unchanged.
- Deep ocean navy and original-brand teal replace the mostly sage palette. Dark hero and product surfaces, cool blue light sections, teal CTA, white navigation and ocean footer. Existing photographs, logo, shortened homepage structure and compact footer retained.
- Closed aggregate film_start and film_complete events added. Previous discovery events retained only for historical analytics. No question, record, identity, source-link identifier or operational value in analytics.
- No new dependency. Web films approximately 443 KB desktop / 465 KB phone, responsive WebP posters about 40 KB each. Full-quality MP4 edits were separately delivered. Files are self-hosted, with no third-party player.

## Evidence / boundaries

Authentic CrabDesk Beta 0.1.0 captures and actual Moltie stock-count response from 19 October. Founder explicitly confirmed the displayed records are demo data and may be used. Films remain marked review cut, demo records and captured replay. Abhishek remains product technical owner and approves public demonstration. No app source or farm records modified.

Video includes high-level stock overview, monthly/weekly activity views, Moltie welcome, actual stock-count reply and displayed source links. It omits individual box operations, complete RAS configuration, control thresholds/algorithms, schemas, SOPs, sampling sequences, equipment designs, admin controls and credentials. Aggregate sample occupancy appears in the actual assistant reply; no physical system design is disclosed. Pond remains upcoming. Software execution is not hardware, biological or commercial validation.

## Verification and completed registration status

The production signup, email confirmation and lead delivery are already implemented and founder-tested, with evidence supplied earlier. They are completed work. The earlier warning was caused by isolated preview configuration, not missing product functionality; the preview now reuses the existing production signup when unconfigured. No email credentials copied or changed. No new live registration/email test required or sent in this task.

Build, lint, link checks, 12 public API fixtures and hosted video/mobile/CTA checks to be recorded in PR #61. Existing beta criteria CP-81/AquaOS #76 unchanged. Abhishek to approve final naming, film scope/crops and exact reviewed build mapping before release. No duplicate PMO tasks created.
