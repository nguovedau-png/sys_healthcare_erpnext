# Production readiness runbook

## Required configuration

The backend requires `DATABASE_URL` for each service schema, queue/cache settings for the existing infrastructure, and the ERPNext integration variables `ERPNEXT_BASE_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`, `ERPNEXT_SYNC_TOKEN`, `ERPNEXT_TIMEOUT_MS`, `ERPNEXT_MAX_RETRIES`, `ERPNEXT_RETRY_BASE_DELAY_MS`, and `ERPNEXT_DEAD_LETTER_THRESHOLD`. Secrets must be injected by the deployment platform and must not be committed to Git or exposed to browser bundles.

The ERPNext API identity should be a dedicated least-privilege user. The endpoint should be HTTPS and network-restricted where possible. The application must be configured with the tenant and facility context on every operation; a shared global token is not sufficient for multi-tenant authorization and should be placed behind an integration gateway or mTLS in a hardened deployment.

## Deployment sequence

Provision PostgreSQL, Redis and RabbitMQ (or managed equivalents), apply each Prisma schema migration in the service deployment pipeline, generate clients, start the ERP service before gateway traffic, then start the gateway and clients. Configure readiness checks for database, queue and ERPNext availability. Verify an authenticated health check, one idempotent Patient upsert in a non-production ERPNext site, retry behavior with a controlled timeout, and the reconciliation/dead-letter dashboard before enabling live traffic.

## Verification completed in this change

| Check | Result |
| --- | --- |
| Backend Jest unit/e2e-oriented tests | 4 suites, 14 tests passed |
| Backend NestJS production compile | Passed |
| Booking state and Vietnamese phone regression tests | Passed |
| ERPNext client response-envelope, headers and URL validation tests | Passed |
| Repository diff whitespace check | Passed |
| Web-partner TypeScript check | Still fails on pre-existing unrelated type errors in survey/layout/components; one JSX parser error was fixed in this change |
| Web-partner Next production build | Terminated by sandbox resource pressure during optimization; rerun in CI or a build runner with sufficient memory |
| Dependency audit | Existing dependency graph reports unresolved vulnerabilities, including packages with breaking-change-only fixes and `xlsx` with no available fix; these require a dedicated dependency modernization milestone |

## Go-live gates

Do not claim regulatory compliance or go live with clinical data until the facility validates its clinical forms, signature/amendment policy, retention schedule, access matrix, backup restoration, incident response, and applicable Ministry of Health requirements. The Ministry of Health reference page lists Circular 46/2018/TT-BYT for electronic medical records and Decision 326/QD-BYT for information security and cybersecurity governance.[1]

Do not enable patient production traffic until the unresolved web type errors, dependency vulnerabilities, database migration/restore drills, webhook verification, and full browser/mobile E2E suite are closed in CI.

## References

[1]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Bộ Y tế – văn bản pháp lý có hiệu lực về bệnh án điện tử"
