# Deployment Runbook — sys_healthcare_erpnext

## Scope

The platform consists of the NestJS microservice backend, the Next.js web-admin application, and the Expo mobile-admin application. CRM, ERP, HR, and Accounting remain ERPNext-owned domains; this platform owns healthcare workflows and exposes a resilient synchronization boundary.

## Required environment variables

Configure these variables through the deployment secret manager. Do not commit `.env` files or real credentials.

| Variable | Component | Purpose |
|---|---|---|
| `ERPNEXT_BASE_URL` | ERP service | ERPNext site URL without trailing slash |
| `ERPNEXT_API_KEY` | ERP service | ERPNext API key |
| `ERPNEXT_API_SECRET` | ERP service | ERPNext API secret |
| `ERPNEXT_TIMEOUT_MS` | ERP service | HTTP timeout; default `10000` |
| `ERPNEXT_MAX_RETRIES` | ERP service | Bounded retry count; default `3` |
| `ERPNEXT_SYNC_TOKEN` | API gateway | Internal token required for ERPNext upsert writes |
| `NEXT_PUBLIC_API_URL` | Web/mobile | API gateway base URL appropriate for the environment |

`ERPNEXT_API_KEY` and `ERPNEXT_API_SECRET` must be available only to the backend ERP service. Web and mobile receive health metadata only and never receive ERPNext credentials.

## Verification sequence

Run the following checks from the relevant application directories after installing dependencies from the lockfiles:

```bash
cd internal_apps/sys_healcare_system/backend
npm run build
npm test -- --runInBand

cd ../web-admin
npm run build

cd ../mobile-admin
npx tsc --noEmit
npm test -- --runInBand --passWithNoTests
```

The web health page and mobile dashboard call `GET /v1/erp/integrations/erpnext/health`. A write operation must call `POST /v1/erp/integrations/erpnext/upsert` with the `x-erpnext-sync-token` header and a validated document context containing tenant, facility, source and idempotency identifiers.

## Operational behavior

ERPNext requests use bounded exponential retry for transient network, rate-limit and server errors. Each request includes tenant/facility context and an idempotency key. Logs must redact credentials and personal data. Failed requests update the health status with the last failure timestamp and consecutive failure count; successful requests reset the failure count.

When ERPNext is unavailable, healthcare workflows should remain readable and queue/retry at the integration boundary rather than exposing credentials or failing unrelated UI routes. Configure alerting on consecutive failures and validate a manual replay process before enabling write synchronization in production.

## Deployment checklist

Before release, verify that migrations are applied in the target environment, the ERPNext integration variables are present in the secret manager, the sync token is rotated from any development value, health endpoints return expected configuration status, and the backend/web/mobile checks above pass. Confirm that `git diff --check` is clean and that no secret-like values are present in the commit.


## Automated API coverage

The gateway E2E suite is isolated from external infrastructure and verifies the HTTP contract for public health metadata, rejected unauthenticated writes, validated authenticated upserts, and DTO whitelisting. Run it with:

```bash
cd internal_apps/sys_healcare_system/backend
npm run test:e2e -- --runInBand
```

The public health response intentionally excludes the ERPNext base URL. The sync guard compares the internal write token using a constant-time comparison and rejects missing, malformed or invalid credentials.
