# Producer website redesign

The public site uses a shared server-rendered design system, existing production photography, clearly labelled concept illustrations and an illustrative AquaOS workflow. Protected Control Tower and authentication routes are outside this change.

## Routes

Existing `/system`, `/producers`, `/aquaos`, `/validation`, `/company`, `/investors`, `/contact`, `/privacy` and `/terms` routes are retained. `/insights` permanently redirects to `/resources`. New solution detail pages live under `/solutions`; three planning guides live under `/resources`. Existing production, market, technical, research, AquaOS, institution and investor enquiry anchors remain supported.

## Enquiries

With no email service configured, the form validates and prepares a reviewable message. Visitors explicitly open their email app or copy the message. Nothing is submitted or stored by the website in this mode, and the UI never reports the enquiry as sent.

Optional direct delivery uses Resend. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` as server environment variables. The sender must be an address on a verified domain. Rebuild after configuring the service so the form renders delivery mode. The recipient is fixed to `info@crabionics.com`; the visitor address is used only for replies. Do not put credentials in source control or use a `NEXT_PUBLIC_` variable.

The route validates origin, content type, topic and field lengths, rejects the honeypot, and reports success only when the email provider returns an accepted message ID. Accepted by the provider does not imply final inbox delivery. Rate limiting is best-effort per running server instance; configure a shared or edge limit before enabling delivery at scale. No enquiry content is written to logs.

## Content and performance

The 600-box finishing configuration and wider network remain proposed work. Guide content covers scoping and the existing production approach; it makes no biological performance or ROI claims. Concept and illustrative software panels are labelled. Institutional captions specify incubation, research or recognition rather than asserting customer endorsement.

Photos use responsive Next.js image optimisation, with the homepage image preloaded. Pages stay server-rendered; client interactions are confined to enquiries, interest registration, an illustrative workflow preview, private demand review and the lazy-loaded FAQ assistant. No video autoplay, external font download, analytics or animation library was added. Existing immutable asset caching and scoped authentication middleware are preserved.

## PMO-aligned presentation — 6 October 2026

The public presentation connects production, technology and learning. A labelled concept visual explains the proposed seed/nursery → pond grow-out → aggregation → controlled finishing → buyer requirement journey. It does not claim a deployed supply network. System, AquaOS, company, producer and solution introductions reuse the existing explanatory art rather than repeating the equipment photo. System retains the operator/defined-rule decision, permitted local response and measured outcome relationship.

The workflow preview is an illustrative individual-habitat feeding round: sample observation selection, operator review, follow-up task and a history that explicitly preserves missing outcomes. State is local to the mounted preview, not durable farm storage. This is separate from the proposed AquaOS operator beta in owning issue #76: production setup, persistence/resume, observations, history and record-grounded assistance. Interest collection does not release that product or promote its maturity. Website FAQ answers are separate from product Copilot capabilities.

Public content was reconciled against PMO CURRENT_STATE, October Capability Reality Register, scientific R&D architecture, supply-chain strategy and AquaOS #76. Working strategic maps inform direction, not implementation proof. No private PMO, banking, vendor, customer or protected engineering detail is published.
