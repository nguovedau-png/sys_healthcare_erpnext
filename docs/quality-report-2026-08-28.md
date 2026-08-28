# Quality and Security Report — 28 August 2026

## Scope

This report covers the active healthcare product under `external_apps/backend` and the connected admin surface under `external_apps/web-admin`. Historical apps under `internal_apps/sys_healcare_system` were not rewritten; the CI path was corrected to target the active backend.

## Verification completed

| Check | Result |
|---|---|
| Backend typecheck | Passed |
| Prisma schema validation | Passed with a temporary validation URL; no database connection was required |
| Backend unit/integration suite | Passed: 8 suites, 38 tests |
| Backend production build | Passed |
| Web-admin Operations lint | Passed |
| Web-admin production build | Passed; Vite emitted a pre-existing bundle-size warning above 500 kB |
| Web-admin Playwright smoke suite | Passed: 3 tests |
| Repository whitespace check | Passed |
| Automated quality loop | Passed: 100/100 iterations; substantive checks at iterations 10 through 100 |

The quality loop performs `git diff --check`, package JSON parsing, documentation checks on every pass, and typecheck, Prisma validation, unit/integration tests, and build at every tenth pass. Test logs are written to a temporary directory and are not committed.

## Implemented quality improvements

The backend now has persisted queue tickets with scoped numbering and optimistic state transitions; billing intents with provider-neutral signed callbacks; payment event deduplication, timestamp replay protection, amount matching, monotonic billing transitions, and capped refund requests; raw-body HMAC verification; stricter queue/payment parsers; and recursive audit redaction for credentials, tokens, phone/address, clinical text, payloads, and payment fields. The admin Operations screen now consumes the active healthcare API, masks phone numbers, supports scoped queue data, and generates idempotency keys.

## Dependency findings

The backend production audit reported 8 moderate and 1 high advisory across the current dependency graph; the web-admin production audit reported 2 moderate and 8 high advisories. No blind major-version upgrade was performed because dependency remediation can change authentication, payment, WebSocket, or storage behavior. The deployment gate should pin and review these advisories, test provider integrations, and upgrade in a dedicated dependency hardening change. The current code does not treat audit output as proof of production security.

## Open production gates

A real database migration must be generated and exercised against a staging PostgreSQL database for `QueueTicket`, `PaymentEvent`, `PaymentRefund`, and the added consent metadata. `PAYMENT_WEBHOOK_SECRET` must come from a secret manager. Payment and notification providers need explicit selection and contract tests. Tenant/facility IDs must be provisioned rather than using admin demo defaults. Legal/compliance owners must review the 2026 Vietnamese personal-data regime, clinical-record obligations, retention, consent, incident response, and any telehealth or insurance workflow before real data is enabled. Backup restore drills, load tests, and a full mobile E2E pass remain release gates for V1.

## Known non-blocking warnings

The complete web-admin lint command still reports legacy `any` and unused-variable violations outside the healthcare Operations module. The production bundle is larger than the Vite advisory threshold. These should be scheduled for a broader frontend hardening pass; they do not block the active healthcare slice because the modified module is lint-clean and the build/E2E gates pass.
