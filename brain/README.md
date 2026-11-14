# Crabionics Brain — Safe web interface preview (not production AI)

**Status:** release candidate for public read-only UI only. Web and WhatsApp AI execution, private company retrieval, centralized sessions, token purchases/credits and live usage reports are **not activated**.

## Purpose
Bring future Crabionics Brain company OS into one web/WhatsApp experience backed by (eventually) a single source-authorized backend, optimized context router, explicit approvals, immutable session events and metered token/cost ledger. The UI previews navigation, local planning sessions and manual token budget calculations without pretending provider token balances or AI execution exist.

## Implemented in this commit
- Responsive, branded web interface: overview, local session plans, planning-only token budgets, context tiers and channels.
- Browser-local, non-synchronized planning session titles only (ordinary localStorage); **not** secure private data storage.
- `GET /api/status`: no-store, provider usage unavailable (null rather than false zero).
- `GET|POST /api/whatsapp`: fail-closed until Meta onboarding, user identity permissions and durable idempotent message queue; HMAC-SHA256 verification helper is unit-tested.
- Basic secure HTTP headers and unit tests. No API key, connection string or personal source record in client code.

## Before an authenticated pilot
1. Founder and CTO approve separate service architecture, access requirements, source/data/IP privileges and company vs BIRAC boundaries.
2. Confirm private login/SSO, users, org/roles, WhatsApp number pairing and explicit data consent. Separate public informational surface from staff workspace.
3. Set up managed relational DB for shared sessions, source-reference cache, idempotency, actual usage records and durable job state; **no localStorage for company records**.
4. Implement a server-side task/router with minimum relevant source retrieval, permissions, quote+provenance, stable prompt prefix, compact source-linked session history and specialist budget/quota/approval checks.
5. Connect a model API gateway using secure environment variables/managed OIDC and set a **real provider-side money cap**, plus an atomic local reservation/actual-use ledger. Track input, output, cached and reasoning tokens when available; total cost, provider/request IDs, channel/session/user/model; distinguish purchased provider balance from budget.
6. Implement both web and Meta WhatsApp adapters against **the same authenticated task backend**, with WhatsApp HMAC/number allowlisting, Meta verification, deduplication, queues, reply-window/template compliance and consent; then test with real accounts.
7. Per-device/session identity and PMO boot must be auditable; existing R01–R09 agent profiles are in PMO PR #183, proposed R10 in #187. **Do not assume these profiles are running in this web preview**.
8. Run security review, load/quota/rate limit tests, end-to-end usage reconciliation and an authorized pilot before enabling live chat or accepting private business data.

## Test
`cd brain && npm test` (no external dependencies needed).

## Public preview boundary
This site contains no private PMO evidence, customer, grant, bank or patent documents, and the WhatsApp endpoint rejects verification until the durable backend is built. It does **not** use subscription ChatGPT tokens or create provider credits. Any future `brain.crabionics.com` production release needs explicit domain verification and security signoff; do not attach that domain to this preview.

## Sources of company governance
- Crabionics PMO `AGENTS.md`, `PMO_BOOT_MANIFEST.yaml`, `SESSION_PROTOCOL.md` and accepted decision register.
- Working philosophy Confluence (14 Nov 2026) and draft PMO PR #188.
- Nine-agent draft PR #183 and separately proposed patent role PR #187.

## Non-actions
No production site change, no existing CrabDesk/Moltie/AquaOS changes, no live API call, no Meta message send, no purchased token funds and no deployment of Codex subagents.
