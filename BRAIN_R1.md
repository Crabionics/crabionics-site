# Crabionics Brain R1 — functional private workspace

**Release status:** review build on isolated branch `feat/brain-functional-workspace-r1-20261114`. Not production, not an approved Codex/WhatsApp gateway.

## Product slice implemented

- Staff-protected `/brain` page and `/api/brain/*` endpoints, using existing Clerk server-trusted admin role. Public sign-ups cannot access Brain merely by authenticating.
- Tasks with durable instructions, message/follow-up thread, run status, latest output and a separate execution run ledger. Existing Upstash/Redis connection from site; dedicated `crabionics:brain:r1` namespace, per-user keys and 1-year TTL.
- Actionable GitHub PR activity from the existing server-side `CRABIONICS_GITHUB_READ_TOKEN`; source links can be tracked as new tasks without falsely claiming to have imported private Codex CLI conversations.
- Text-only model run adapter to Vercel AI Gateway, **disabled by default**. When deliberately enabled, user must select verified model, provider budget and daily call ceiling. Each completed/failed attempt has stored status; actual provider input/output/cached tokens are recorded when reported. Cost remains null if not reported.
- One active run per task, write-origin checks and token/cost display; output cannot pretend to have executed tools or inspected source documents.

## What is not implemented

- Actual named Codex agent spawning, GitHub write actions or external tool execution
- Historical local Codex session import
- Multiple user roles beyond authorized staff admins
- WhatsApp Business Cloud API
- Live provider credit balance
- Approved fixed monetary budget enforcement in the application (provider-side spend cap must be configured before any model use)
- End-to-end authenticated app test with a real staff session

## Existing infrastructure used

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` and `CRABIONICS_GITHUB_READ_TOKEN` are preconfigured in the existing website deployment. The app reads these server-side. No new secret is committed.

## To enable bounded model execution (separate human authorization)

1. Choose an existing Vercel AI Gateway `provider/model` from the live catalog and inspect its cost and data policy.
2. Configure actual team/project/key budget limits in the Vercel account. Verify credit and spend authority.
3. Set the following **server-side** preview-environment values through the Vercel dashboard, never in source control or a chat message:
   - `BRAIN_AI_MODEL` — validated model slug
   - `BRAIN_MAX_DAILY_CALLS` — integer between 1 and 100, begin at 3
   - `BRAIN_RUNS_ENABLED=1` — explicit release switch after accounting/access test
4. AI Gateway on Vercel may use `VERCEL_OIDC_TOKEN` when available; an `AI_GATEWAY_API_KEY` is a separate permitted option. Do not paste credentials into UI. This route uses the official compatible Chat Completions endpoint.
5. Run a consented real request and reconcile returned provider usage and costs with the Vercel AI Gateway logs. If cost is unavailable, display 'Not reported'; do not claim zero expense.
6. Treat R1 model execution as **text processing only**. The route has no external tools and must not be marketed as a coding or PMO agent gateway.

## Operator verification

- Open the Vercel preview URL followed by `/brain`, sign in using an existing Clerk account with server-side `publicMetadata.role=admin`.
- Verify a non-admin user is refused access (including API endpoints and unauthenticated attempts).
- Create an actual task; refresh in another authenticated browser on the same account; verify persistence.
- Append a follow-up; refresh; verify original instructions and message history stay intact.
- Inspect real GitHub PR activity, then track one item as a Brain task. Confirm the source link and that no PR content was silently inferred.
- Open Usage; verify zero runs from an empty ledger and unknown provider credit, not fictional token totals.
- With the provider gate deliberately enabled and budget authorized, execute one task, verify the model output persists, the input/output tokens match provider metering and failures are not reported as successful work.

## Technical review required

- Frontend: accessibility/mobile and Staff UI.
- Backend: Redis TTL/index and Lua write atomicity, idempotency, cleanup, backup/retention, per-user data isolation.
- Model: actual gateway syntax, run timeout, rate/budget enforcement and strict source/tool scope.
- Security: use an independent deployment for production Brain rather than expanding the public marketing site's attack surface indefinitely.

## Link to prior work

This R1 branch should **supersede** the earlier nonfunctional read-only preview in draft website PR #75 after functional review; it does not merge or close that PR automatically. Do not confuse this with the existing PMO proposal PR #188, which is a separate strategy/boot discussion.
