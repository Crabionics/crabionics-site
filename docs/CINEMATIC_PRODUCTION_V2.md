# Cinematic production redesign — isolated preview

Baseline: production `e8707c60e67fb0187829fd78f698b0593f9e7a8d`, confirmed in Vercel and on www.crabionics.com on 17 October 2026. The earlier experimental refinement is not the source baseline. Production deployment is not authorised.

## Implemented

- New editorial hero: local Manrope variable typography, real crab portrait, panoramic production equipment photograph, contextual hotspots and scroll-driven camera movement.
- Original isometric vector system illustration showing the relationship between habitat, recirculating water infrastructure, environmental observation, CrabPod and AquaOS. It is explicitly a schematic, not a manufactured product rendering or engineering drawing.
- Sticky visual with five scroll chapters, layer selection, assembled/separated views and a real-photo view. Native scrolling, keyboard-operable controls and reduced-motion support.
- Technology navigation flyout; public spacing and colour refinements. Compact production footer retained; no oversized duplicate wordmark.
- Production partner pathways, production journey, evidence/validation, resources and AquaOS walkthrough retained. APIs, consent, registration, enquiry, recovery, auth, analytics and Control Tower implementations unchanged.
- Preview-only responsive review route, excluded in production. Preview pages use noindex.

## Reference application

| Resource | Applied principle |
| --- | --- |
| https://www.scrolltide.co/ | Purposeful scroll chapters, sticky visual and image movement |
| https://supahero.io/ | Large editorial hierarchy, distinct subject and clear first action |
| https://www.navbar.gallery/ | Structured technology flyout and mobile disclosure |
| https://www.cta.gallery/ | Separate production enquiry and operator-beta intent |
| https://www.footer.design/ | Compact, useful route groups and legible hierarchy |
| https://refero.design/ | Operating context and honest interface states |
| https://3dicons.co/ | Dimensional visual language; the product relationship is drawn specifically for Crabionics rather than represented by generic symbols |

No paid templates, third-party screenshots or new AI-generated product imagery are included in the frontend. Local Manrope is from Google Fonts (OFL licence retained in public/fonts/OFL-Manrope.txt), subset to Latin and punctuation; approximately 36 KB.

## Checks and scope

Production build, TypeScript, public integration suite and built link/anchor check are run for the preview. Browser validation and comparison are recorded in the PR. Form delivery tests are mocked: no real messages are sent. Browser viewport testing does not establish real-device performance or Core Web Vitals.

The water model explains component roles without prescribing biological setpoints or claiming demonstrated yield, survival, water savings, autonomy or commercial readiness. Treatment capacity, stock biology and integration require their own validation.
