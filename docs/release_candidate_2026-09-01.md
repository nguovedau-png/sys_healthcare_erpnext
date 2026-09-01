# Release Candidate Notes — 2026-09-01

## Scope completed

This milestone extends the healthcare backend with a typed ERPNext read-through for the operational master and accounting domains. The supported read-only doctypes are Customer, Supplier, Employee, Item, Sales Invoice, Purchase Invoice, and Payment Entry. Every doctype has a server-side field allowlist; caller-supplied arbitrary fields are not forwarded to ERPNext.

The accounting slice adds `GET /api/v1/healthcare/billing-intents/:id/erpnext-status`. The endpoint is authenticated, facility-scoped, and restricted to platform administrators, tenant administrators, facility administrators, finance users, and auditors. It returns the local BillingIntent state, the linked Sales Invoice projection when available, and reconciliation metadata for amount, currency, and status. A missing integration is reported as unavailable; an unlinked intent is reported as unlinked rather than silently treated as paid.

ERPNext remains the source of truth for CRM, ERP, HR, accounting, inventory and billing documents. The healthcare platform owns appointment orchestration, consent, queue, clinical workflow state and integration metadata. Local billing records are correlation records and must not be interpreted as an independent accounting ledger.

## Security and data rules

All invoice document names are length-bounded, newline-rejected and URL-encoded. ERPNext credentials remain server-side. Integration status and reconciliation responses do not expose access tokens, raw request payloads, or provider secrets. Scope enforcement is performed before reading billing data and uses tenant/facility membership from the authenticated actor.

## Verification gates

| Gate | Result |
|---|---|
| External backend unit/API suite | 9 suites, 56 tests passed |
| ERPNext client regression tests | Typed doctype allowlist, bounded limit, normalization and invalid-name rejection passed |
| External backend TypeScript build | Passed with `npm run build` |
| Existing healthcare API coverage | Passed, including billing authorization and payment webhook behavior |
| Dependency installation | Reproducible with `npm ci`; generated Prisma client before tests |

## Deployment steps

Run `npx prisma generate` and apply the checked-in Prisma migrations before starting the external backend. Configure `ERPNEXT_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`, `ERPNEXT_TIMEOUT_MS`, and `ERPNEXT_MAX_RETRIES` only through the deployment secret manager. Configure `DATABASE_URL`, `JWT_SECRET`, and payment webhook secrets independently; never place real values in `.env.example`, source files, logs, or Git history.

Before go-live, execute a staging reconciliation against a non-production ERPNext tenant, confirm that the linked Sales Invoice reference is present on BillingIntent, verify a mismatched amount is surfaced as `attention_required`, and perform a rollback drill using the deployment runbook. A live deployment cannot be certified from this sandbox because production credentials and infrastructure access are not present.

## Dependency audit note

The non-breaking audit remediation upgraded the vulnerable nested `form-data` package. The remaining report contains eight moderate UUID-related transitive findings beneath the current Firebase Admin dependency tree; the package manager offers a breaking downgrade of `firebase-admin` as the automatic fix. That downgrade was not applied because it would change the authentication integration contract. Production security review must either approve this documented residual risk or schedule a separately tested Firebase Admin major-version migration before go-live.
