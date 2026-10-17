# Connected production website implementation

17 October 2026. Based on main e8707c6. Review branch only; production is not authorised.

## Implemented

- Rebuilt the homepage as a production-led story: biological setting, component relationships, recirculating water, operating software, production roles and validation.
- Shared ink navy / warm white / cyan identity, spacing, typography, navigation, buttons, forms and footer across existing public routes.
- Keyboard-operated technology tabs on home, Solutions and System: arrow keys, Home/End, roving tab focus and labelled panels.
- Selectable RAS water-path explanation on home and System. Biological treatment is distinguished from solids removal; recirculation is not represented as zero water exchange.
- AquaOS sample workspace on home and AquaOS. Clearly labelled illustrative records; no fabricated live telemetry or automated biological control claims.
- Native scroll progress and restrained scroll reveals where supported; reduced-motion support and visible content without animation support.
- Existing logo, production rack and individual crab photographs retained. No new generated imagery or product photography claims for the existing sensor-node composite.
- Existing API, registration, consent, enquiry, recovery, auth, Control Tower, analytics and demo implementations retained.

## Reference research

Original composition; no third-party templates or paid assets copied.

| Resource | Design principle applied |
| --- | --- |
| https://www.scrolltide.co/ | Section rhythm, restrained scroll motion and component interaction |
| https://supahero.io/ | Clear hero hierarchy and a distinct product image; the library now points to ScreensDesign |
| https://www.navbar.gallery/ | Compact sticky masthead, visible active state and mobile disclosure |
| https://www.cta.gallery/ | Separate production enquiry and beta-interest paths |
| https://www.footer.design/ | Large closing wordmark with useful route groups |
| https://refero.design/ | Structured workspace, record hierarchy and honest sample state |
| https://3dicons.co/ | Reviewed; custom line diagrams chosen to explain real relationships |
| https://www.figure.ai/ | Product prominence, concise storytelling and a separate software layer |
| https://www.cellares.com/ | Biological process presented alongside engineered systems |

## Architecture and verification

Next.js 16 / React 19 / CSS modules, deployed by the existing Vercel project. Server components retained for page composition; only interactive explorers use local client state. No new dependencies, data stores or external services. Photos use Next Image and responsive sizes; the hero image is preloaded. No autoplay video, WebGL, remote fonts or continuous JavaScript scroll loop.

Local checks: production build; TypeScript; 11 existing public integration tests; built-route link/anchor check; git whitespace check. Email and beta tests use mocked delivery and send no real messages. Deployment and browser observations are recorded in the PR after preview verification. No claim of measured Core Web Vitals or real-device mobile testing is made without those measurements.

Preview release must target the existing Vercel project's **preview** environment from this review branch. Do not merge or promote without approval. Preview availability of email/registration depends on the project's existing preview environment configuration.
