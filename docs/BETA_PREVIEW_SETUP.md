# Beta preview and launch setup

## Working without external services

The visual explanations, interactive four-step illustrative workflow preview and lazy-loaded FAQ assistant work without third-party accounts. The assistant uses a curated local answer matcher, not a generative AI model. Questions are not transmitted or stored. It provides approved site links, a fallback for unknown topics and a care-specific handoff. The demonstration uses a sample individual-habitat feeding round with selectable observations. Review/task state lasts only while the component is mounted; it stores no farm information and controls no equipment. It is not the released AquaOS operator beta.

Enquiries and early-access interest prepare a reviewable email when services are absent. The early-access form explicitly says it does not create a verified registration in this mode. No public demand count is displayed. Preview service setup is separate from production.

## Connect before enabling direct registration

Provision Resend with a verified sender and a private Upstash Redis database in the user's accounts. Do not use an expiring scratch database for real registrations. No paid subscription was created by this change.

Set these server-only variables in the intended Vercel environment, then rebuild:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` â€” verified sender, such as `Crabionics <updates@mail.crabionics.com>`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `PUBLIC_SITE_URL` â€” canonical trusted origin used for confirmation links; use the preview origin when testing
- `REGISTRATION_NAMESPACE` â€” use different values for preview and production
- `REGISTRATION_EXPORT_TOKEN` â€” a randomly generated private secret of at least 32 bytes

Vercel Marketplace Upstash currently provisions `KV_REST_API_URL` and `KV_REST_API_TOKEN`. The server accepts these as alternatives to the `UPSTASH_REDIS_REST_*` names, without copying or exposing credentials. Production and preview use separate registration namespaces and review credentials.

The confirmed team inbox is `info@crabionics.com`. Keep existing mailbox DNS intact; verify a sending subdomain and use the records supplied by the provider. Do not paste credentials into chat or source control.

## Registration lifecycle

The API validates origin, content type, lengths, email, approved interest, honeypot and explicit contact consent. Optional progress-update permission is separate and off by default. Private storage applies a shared five-request/five-minute limit per hashed IP. Email verification uses a random 32-byte token with only its hash stored. Pending records and links expire after seven days. Email scanners visiting a link do not confirm a registration; the visitor presses the confirmation button.

Confirmation writes one record per normalized email using atomic `SET NX`, then indexes it for team review. Confirmed records expire after one year. Repeated confirmations do not generate extra registrations. The sender sends a team notification and visitor confirmation with stable idempotency keys. Notification failure does not erase a confirmed registration: it is marked `failed` for team review. Provider acceptance is not proof of inbox arrival; check actual delivery before launch.

General enquiries deliver to the team first, then attempt a visitor acknowledgement. A failed acknowledgement does not report the successful team enquiry as failed or encourage duplicate submission. Shared rate limiting is used when Redis is configured; the previous per-process fallback remains for enquiry-only setups.

## Private demand review

Open `/early-access/review` and enter the private export token. It is sent in an authorization header, never in the URL, and cleared after loading. The page has noindex metadata and no public navigation entry. No records are returned without authorization. The token is not stored in the browser. The page shows only confirmed records, role/region/interest data, update opt-ins and notification state; no fictional demand counts are used.

For a CSV export, request `/api/early-access/export` with `Authorization: Bearer <private-token>`. This returns the latest 1,000 confirmed records, excludes expired records and escapes spreadsheet formula prefixes. Keep exports private. For larger lists, add paginated review before exceeding this scope.

Honor removal requests received at the team inbox. Remove the email's SHA-256 record key and sorted-set membership, and any pending records associated with that address. Do not send progress broadcasts without the optional opt-in; no broadcast sender is implemented in this preview.

## Launch verification

Run `npm run test:public`, the production build, and lint for changed files. Verify the resource â†’ demonstration â†’ registration journey, keyboard/phone assistant behavior, valid/expired confirmation links, duplicate signup, failed provider response, authorized/unauthorized review and CSV output. Use a team-controlled test email after service configuration to check verification, acknowledgement, replies and real inbox receipt. Review content/status labels and performance on the deployed preview before production.
