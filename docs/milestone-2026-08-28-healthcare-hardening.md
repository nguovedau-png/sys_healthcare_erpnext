# Milestone review — Healthcare and ERPNext boundary hardening

## Scope completed

This milestone hardens the existing outpatient healthcare API rather than duplicating CRM, ERP, HR or accounting logic already owned by ERPNext. The changes enforce explicit tenant/facility query scope, support tenant-wide role scopes, validate query fields and dates, enforce a minimum appointment duration, reject idempotency-key reuse with a different appointment payload, restrict appointment transitions by operational roles, restrict encounter amendment to the assigned practitioner, and protect the ERPNext status endpoint from ordinary reception users.

The API boundary now has regression coverage for missing scope, tenant-wide scope access, forbidden ERPNext status access, duplicate appointment payloads and existing healthcare service rules. A root-cause fix was also made after the API test exposed that a broad catch block was converting `ForbiddenError` into a successful 200 response.

## Verification

| Check | Result |
|---|---|
| TypeScript `tsc --noEmit` | Pass |
| Full Jest suite | 7 suites, 27 tests passed |
| Healthcare API/service/validation regression suite | 3 suites, 16 tests passed |
| `git diff --check` | Pass |
| Production dependency audit | 0 high/critical; 1 moderate remains in the transitive tree and should be reviewed in the next dependency window |
| Secret scan | No new production secrets introduced by this milestone; test fixtures contain intentionally fake passwords only |

## Operational commands

From `external_apps/backend`, install with `pnpm install --ignore-scripts`, generate the Prisma client with the repository's Prisma command, run `pnpm run build`, and run `pnpm exec jest --runInBand`. ERPNext credentials remain server-side environment variables (`ERPNEXT_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`); they are not placed in browser code or committed files.

## Review outcome

The milestone is suitable for merge as a focused hardening increment. It is not a claim that the whole monorepo is a completed healthcare SaaS: patient portal, availability projection, queue UI, orders, billing intents, inbound ERPNext webhook receipts, full SyncOperation lifecycle, clinical field-level policy, production migrations, live ERPNext contract tests and mobile release verification remain explicitly tracked as follow-up work in the product blueprint and implementation scope.
