# Production launch hardening — 20 October 2026

Baseline: production `6f34c01c49d9ea97cf28577fe86ba18cd8599a3f`, PR62, branch `design/concise-homepage`. Work branch: `fix/launch-hardening`. CrabDesk application and registration implementation are unchanged.

## Reproduced defects and repairs

- Film: original desktop picture measured 1228 × 689.9px in the review browser. The heading, frame and conversion links could not share the viewport. Cap the frame at 960px and constrain width by available small-viewport height, preserving 16:9 or portrait 9:16. `object-fit:contain`, lazy poster and no video before Play remain. Playback pauses outside the viewport or in a hidden tab; resuming remains a deliberate native-control action. Film-start analytics now fire on actual playback, once per mount, rather than intent alone.
- Layer anchor: `/#connection-water` placed the system heading at y=-539.6px on the old live site. The browser scrolled to the lower tab row. Selecting a fragment now selects its layer and brings the section start below the header. Repaired preview heading y=251.4px, fully visible. Increased display line-height prevents tight text ink bounds; shared heading offsets cover sticky navigation.
- Scroll painting: active homepage imports contain no Framer Motion/particle component and no React scroll loop. Source inspection isolated the large scroll-timeline image transform, sticky backdrop blur, header progress timeline and SVG dash animations/filter glow. Removed scroll-linked transforms/progress and header blur, removed SVG filter glow, limited dash cues to two cycles. Keep intentional layer and hover transitions, including reduced-motion overrides. No claim that every machine's reported lag had one proven cause.
- Assistant: the closed launcher is now in the footer, in normal document flow, so it cannot overlap video controls, CTAs or form fields. The FAQ panel remains user-opened, bounded to the viewport, Escape-dismissable and restores focus without moving the page. Answers scroll only their own panel.
- Accuracy/trust: system-explorer AquaOS text now matches the working CrabDesk + Moltie RAS capability, demo records and separate pond/equipment tracks. The legacy synthetic `/digital-model` engineering prototype is preview-only (production 404) and noindex. Robots exclude review/prototype/private endpoints. Added camera/microphone/geolocation denial via Permissions-Policy. Existing HSTS, nosniff, frame denial and referrer policy retained.

## Verification before release

- Next production build and TypeScript pass. Public-site ESLint and changed cinematic/product/review component ESLint pass.
- Link and anchor checker passes across 33 generated pages.
- All 12 public API regression fixtures pass, including required consent, verification, duplicate/idempotent confirmation, notification delivery/retry, error paths, private access and closed funnel dimensions. These are mocked-provider tests, not fresh mailbox delivery proof. Existing founder-tested live verification/email flow is preserved; no new live signup or email was sent in this repair session.
- Live pre-release endpoint checks: staff export, funnel totals and recovery GET return 401 anonymously. Empty same-origin signup/enquiry payloads return 400; foreign-origin payloads return 403. No operational information submitted.
- Preview responsive viewport matrix: 360×800, 390×844, 768×1024, 1366×768, 1440×900, 1920×1080. At all six widths, document scrollWidth equals clientWidth. Desktop frames: 938.7×528 at 1366, 960×540 at 1440 and 1920. Phone frames: 314×558 at 360 and 341.8×607.7 at 390. Portrait and landscape sources retain containment.
- Desktop video reached 30s/end with no media error; phone portrait video observed playing at 28.95s, native controls, 720×1280, no media error. Desktop source 1280×720. No public interactive replay reintroduced.
- Keyboard Home/ArrowRight moves the selected system tab. Assistant opens, Escape closes, focus returns to the static launcher. Contrast and responsive inspections are sampled manual checks, not a complete automated WCAG certification.

## Performance observations and limits

Preview-only performance probe uses PerformanceObserver and five-second requestAnimationFrame sampling; never served by production review routes. Full-page baseline sample: 0 long tasks / 0 blocking milliseconds, observed CLS 0.00067, cached lab LCP 400ms; settled animation count 2. Repaired sample: 0 long tasks / 0 blocking milliseconds, observed CLS 0, cached lab LCP 556ms, settled animation count 0. These are single cached cloud-browser samples, not field Core Web Vitals or evidence of faster LCP. Frame callbacks were throttled to approximately 1Hz, so FPS/p95 frame comparisons are invalid and are intentionally not used as success claims. Resized iframe CLS was also excluded from conclusions. Vercel Speed Insights remains the existing field measurement source.

Initial local build failed because reused node_modules was symlinked outside Turbopack's root; replaced with local dependency files and rebuilt successfully. Initial link check ran without build output after that failure; subsequent 33-page check passes. Repository-wide ESLint still has 9 pre-existing no-explicit-any errors in the historical digital-model prototype and 4 warnings in early-access fixtures. No new lint errors in touched/public components. Physical mid-range hardware, Safari/iOS, CPU/GPU traces and mailbox receipt were not tested here.

## Necessary follow-up

1. Profile the released site on a real mid-range Android and affected desktop; inspect fresh Vercel LCP/INP/CLS once sufficient real visits exist. Cloud samples cannot certify real-device smoothness.
2. Resolve the legacy prototype's TypeScript lint debt separately; it is no longer a public product route.
3. Abhishek retains ownership of CrabDesk and approval of any future product footage or exposed workflow. This release changes neither his application nor hardware/biological validation claims.

Jira/PMO searched before tracking: CP-81 remains the existing product-demonstration anchor; no duplicate Jira/Confluence records created. Production outcome and post-release checks are recorded in the release PR.
