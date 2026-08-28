# Dependency-Aware Development Plan — Vietnam Outpatient Platform

**Implementation target:** Extend the existing `external_apps` healthcare application without rewriting the ERPNext monorepo. Use the current Express/TypeScript/Prisma backend boundary and existing web/mobile surfaces. Keep a modular monolith for the healthcare domain until measured scale or team ownership justifies extraction.

## Architecture baseline

The platform consists of a versioned API gateway, modular healthcare services, PostgreSQL/Prisma for operational projections and workflow state, Redis for short-lived locks/cache/rate limits, BullMQ-compatible queues for notifications and sync retries, object storage for controlled media, and ERPNext REST integration behind a typed adapter. Web and mobile clients consume `/api/v1`; no client receives provider secrets. Observability uses structured redacted logs, request IDs, metrics, health probes, and an operations view for failed jobs and dead letters. Backups are encrypted, retention-aware, and tested by restore drill.

The system is intentionally not split into many microservices. Boundaries are expressed as modules and ports: identity/RBAC, patient, scheduling, queue, clinical, billing, integration, notification, review, search, audit, and admin. The ERPNext adapter is the only module allowed to know remote HTTP/doctype details. All writes use DTO validation, tenant/facility scope, idempotency where retried, and audit events for security-sensitive actions.

## Delivery sequence

| Order | Module | Objective | Dependencies | Release |
|---:|---|---|---|---|
| 1 | Baseline/tooling | Make install, test, build, migration and CI deterministic | Existing repo | MVP |
| 2 | Identity and authorization hardening | Enforce deny-by-default tenant/facility and role scope | Baseline | MVP |
| 3 | Patient and consent | Safe registration, duplicate review, dependents, purpose-specific consent | Identity; schema | MVP/V1 |
| 4 | Scheduling and availability | Prevent overlap and duplicate bookings under concurrency | Identity; patient | MVP |
| 5 | Check-in and queue | Turn booking into predictable visit flow | Scheduling | MVP |
| 6 | Clinical lifecycle | Draft, sign, immutable order boundary, reasoned amendment | Patient; scheduling; RBAC | MVP |
| 7 | Billing and payment adapter | Correlate intent, callback, refund, dispute without storing card data | Scheduling; ERPNext boundary | MVP/V1 |
| 8 | Integration reliability | Outbox, external references, webhook receipt, retry/DLQ/replay | Schema; queue; ERPNext adapter | MVP |
| 9 | Notifications | Delivery preferences, templates, retries, opt-out and reminders | Scheduling; queue | V1 |
| 10 | Discovery and reputation | Search projection, verified reviews, moderation | Patient/facility; completed episode | V1 |
| 11 | Admin analytics and safety | Reconciliation, audit, metrics, anomaly review | All operational modules | V1/V2 |
| 12 | AI and interoperability | Safe administrative AI, FHIR/DICOM/insurance boundaries | Governance; stable data | V2 |

## Module contracts

### 1. Baseline and tooling

**Objective and story.** As a developer, I can install dependencies and run tests/builds reproducibly so that every subsequent feature has a trustworthy quality signal. Functional requirements are pinned package installation, environment validation without secrets, Prisma migration generation, test database setup, lint/typecheck/build scripts, and CI checks. The UI requirement is none beyond existing app health. Edge cases include missing environment variables and absent external services; errors must identify configuration without revealing secrets. Tests cover clean install, build, health endpoint, and missing-config behavior. Acceptance requires a green local and CI pipeline.

### 2. Identity, RBAC, and scope

**Objective and story.** As a facility administrator, I can assign scoped roles; as a patient, I can access only my records. Functional requirements include authenticated actor context, role/scope lookup, facility-level filtering, deny-by-default, audit for role changes, and rate-limited authentication/OTP. API requirements include `GET /api/v1/me`, scoped role administration, and consistent 401/403 semantics. Database requirements include unique role-scope assignments and indexes on tenant/facility/user. UI requirements include an admin role editor that never implies client-side authorization. Edge cases cover missing scope, cross-tenant IDs, revoked role, and system-admin break-glass. Security tests must prove IDOR and escalation are rejected. Acceptance requires every healthcare route to enforce server-side scope.

### 3. Patient, dependents, and consent

**Objective and story.** As a receptionist, I can find a patient by normalized phone and confirm duplicate candidates; as a family booker, I can manage a dependent with recorded consent. Requirements include normalization, masked search results, duplicate review instead of silent merge, patient status, dependent relationship, consent purpose/version/legal basis/status, correction request, and minimum-necessary response fields. APIs: patient create/search/detail, duplicate review/link, dependent create/list, consent capture/withdraw/request. Database: normalized phone index, scoped uniqueness strategy, `ConsentRecord`, relationship table, audit entries. UI: fast Vietnamese form, family member switcher, consent text/version display. Edge cases include same phone shared by family, stale correction, withdrawn consent, and deletion/retention conflict. Security: PII/PHI redaction and object-level authorization. Tests cover duplicate, scope leak, consent withdrawal, and dependent access. Acceptance requires no patient identifier in normal logs and no silent merge.

### 4. Scheduling, availability, and booking

**Objective and story.** As a patient or receptionist, I can reserve one valid slot without double booking. Functional requirements include publishable availability, slot lock/expiry, appointment lifecycle `pending → confirmed → checked_in → in_progress → completed`, cancel/no-show terminals, reschedule policy, idempotency, timezone-safe timestamps, and overlap prevention under concurrent requests. APIs: availability query, appointment create/list/detail, transition, cancel/reschedule. Database: appointment version, idempotency unique key, practitioner/time indexes, optional exclusion/transaction strategy. UI: service/facility/provider/price/duration filters, visible cancellation policy, booking code and status. Edge cases include boundary-touching appointments, expired lock, practitioner absence, duplicate request with changed body, DST conversion, stale version. Security: scoped patient and practitioner views, rate limits and anti-automation. Tests include concurrency, replay, transition matrix, timezone, no-show, and authorization. Acceptance is zero duplicate bookings in concurrency tests and deterministic replay result.

### 5. Check-in and queue

**Objective and story.** As a receptionist, I can check in a confirmed appointment and issue a queue number; as a patient, I can see an approximate status without exposing other patients. Requirements include queue per facility/service/day, priority policy with explicit reason, call/skip/recall, estimated wait, offline-safe local operation, and audit. APIs: check-in, queue list, call, skip, recall, status. Database: queue ticket unique by appointment/day, sequence allocation, status/version, audit. UI: reception board and masked patient display. Edge cases include duplicate check-in, cancelled appointment, no-show reversal, queue rollover, and concurrent ticket allocation. Security: only minimum identifiers on public screens. Tests cover sequence uniqueness, transitions, and role boundaries. Acceptance requires queue numbers never duplicate and public views never expose full PII.

### 6. Clinical encounter and orders

**Objective and story.** As a practitioner, I can draft and sign an encounter; after signing, corrections are amendments rather than silent edits. Requirements include assigned practitioner scope, required reason/assessment, sign timestamp, immutable signed record, reasoned versioned amendment, prescription/lab order status boundary, and clinician review marker for triage. APIs: encounter create/detail/submit/amend; order create/submit/dispense/result boundary. Database: encounter status/version, amendment append-only records, signed metadata, order state. UI: concise clinical form with clear draft/signed state and amendment reason. Edge cases include concurrent signing, wrong practitioner, incomplete assessment, duplicate order, and stale mobile write. Security: field-level restrictions and no clinical access for finance/integration roles. Tests cover sign race, amendment authorization, immutable history, and patient scope. Acceptance requires an audit trail that reconstructs the complete clinical history.

### 7. Billing, payment, refund, and dispute

**Objective and story.** As a patient, I can see a transparent payment state; as finance, I can reconcile it with ERPNext. Requirements include billing intent, provider adapter interface for QR/bank/wallet, pay-at-facility fallback, signed callback verification, idempotent event handling, refund policy, dispute case, and ERPNext correlation. APIs: create intent, status, callback, refund request, dispute create/resolve. Database: payment intent/status, provider event ID unique, refund/dispute states, correlation key, audit. UI: amount/fee/receipt/policy disclosure and failure recovery. Edge cases include duplicate/out-of-order callback, amount mismatch, timeout, partial refund, cancelled appointment, and provider outage. Security: never store PAN/card secrets, verify signature/timestamp, redact payload. Tests cover replay, tampering, amount mismatch, refund authorization, and reconciliation. Acceptance requires no double charge state transition and every financial change to be auditable.

### 8. ERPNext integration reliability

**Objective and story.** As an integration operator, I can retry or inspect a failed sync without clinical data access. Requirements include typed operation contract, outbox persistence before remote I/O, idempotency hash, external reference, bounded exponential retry for 408/429/5xx, permanent-failure classification, dead-letter, signed webhook receipt, dedupe, out-of-order protection, and reconciliation. APIs: status, operations list, explicit retry, verified webhook. Database: `SyncOperation`, `ExternalReference`, `WebhookReceipt`, version/hash indexes. UI: sanitized operations dashboard. Edge cases include ERPNext unavailable, duplicate webhook, changed replay body, remote deletion absence, rate limit, and credential failure. Security: server-only tokens, allowlist/private endpoint, no arbitrary doctype input. Tests cover retry matrix, hash conflict, signature failure, dedupe, and eventual recovery. Acceptance requires deterministic behavior during outage and zero secret leakage.

### 9. Notifications and reminders

**Objective and story.** As a patient, I receive a useful reminder on an opted-in channel; as an operator, I see delivery status. Requirements include template versioning, locale, channel adapter, delivery status, retry, quiet hours, opt-out, and reminder schedule. APIs: preferences, template preview, delivery status. Database: notification intent/delivery, provider message ID, opt-out. UI: channel preference and clear fallback. Edge cases include duplicate delivery, invalid phone, provider outage, consent withdrawal, and timezone. Security: no clinical detail in insecure channels by default. Tests cover opt-out, dedupe and retry. Acceptance requires every delivery attempt to be traceable without sensitive payloads.

### 10. Search, reviews, and reputation

**Objective and story.** As a patient, I can find a verified suitable facility and review a completed episode. Requirements include indexed specialty/location/price/availability, verified provider badges with source/date/expiry, one review per completed appointment, moderation queue, reply workflow, and ranking disclosure. Database: search projection, verification record, review/moderation status. UI: Vietnamese filters, accessible profile, trust signals and transparent sponsored disclosure. Edge cases include expired license, provider suspension, abusive review, negative review, and cancelled appointment. Security: prevent review fraud and provider self-review. Tests cover eligibility, moderation, expiry and ranking rules. Acceptance requires safety signals cannot be bought away or silently deleted.

### 11. Admin, analytics, and operations

**Objective and story.** As a manager, I can see funnel, wait, reconciliation and safety metrics by facility; as an auditor, I can export immutable audit evidence. Requirements include dashboards, filters, CSV export with access log, job/DLQ actions, retention reports, incident workflow, and metric definitions. Database: aggregate tables or read models; never expose raw PHI to analytics unnecessarily. UI: responsive admin dashboard with empty/error/loading states. Tests cover metric correctness, role restrictions and export redaction. Acceptance requires operational metrics and audit coverage to be measurable in production.

### 12. AI and interoperability backlog

**Objective and story.** As an operator, I can use AI for administrative search/summarization with human review; as an enterprise customer, I can export governed interoperability data. Requirements include prompt/input minimization, consent/legal basis, no autonomous diagnosis/prescribing, human approval, model/version logging, FHIR-compatible boundary, DICOM/PACS link metadata, and insurance adapter isolation. Dependencies are stable core schemas, governance review, and security testing. Acceptance is a separately approved V2 release, not an MVP blocker.

## Cross-cutting quality gate

Every module must have unit tests for domain rules, integration tests for persistence/API contracts, authorization-negative tests, migration checks, structured redacted logs, predictable error codes, and documentation. Booking/payment/webhook modules additionally need concurrency, replay, out-of-order and failure-injection tests. Web and mobile flows require responsive checks and E2E where appropriate. Performance targets are p95 below 500 ms for reads and below 800 ms for local writes excluding remote providers; targets are verified with representative load rather than assumed from compilation.

## Immediate implementation slice

The first implementation slice is intentionally narrow and high-value: make the backend installable, harden the existing healthcare service's authorization and data validation, add safe queue/check-in persistence and routes, add explicit clinical amendment validation, add an idempotent payment-intent abstraction without provider-specific secrets, and add regression tests. Patient portal, notification adapters, reviews, full search, and AI remain backlog until the core lifecycle is reliable.

## Assumptions recorded

The active application is `external_apps/backend`; the repository also contains historical/internal healthcare applications that are not rewritten in this slice. Existing Prisma schema and route conventions are retained. Real provider credentials, facility identifiers, and legal policy text are not fabricated. Payment and notification implementations use interfaces and local state until a provider is selected and configured. The 100-loop request is implemented as repeated automated quality cycles with substantive test/build/diff checks at checkpoints; it does not replace fixing concrete defects found by tests.


## Implemented increment — purpose-bound consent workflow (2026-08-28)

**Objective and user story.** As a receptionist, nurse, practitioner, or facility administrator, I can capture a patient's purpose-specific consent with the applicable policy version and expiry, inspect the consent history within my facility, and withdraw an active consent without deleting the historical record. This closes a market and compliance gap while remaining a modular extension of the existing patient workflow.

**Functional requirements.** The API accepts a bounded purpose, optional legal basis and policy version, an active/withdrawn status, and an optional future expiry. Capturing a new active consent withdraws any prior active record for the same patient, facility, and purpose in one database transaction. Withdrawal is idempotent and preserves the original record. Listing returns only minimum consent metadata and only within the caller's tenant/facility scope.

**API contract.** `GET /api/v1/healthcare/patients/:patientId/consents?tenantId=...&facilityId=...` lists history; `POST /api/v1/healthcare/patients/:patientId/consents` captures a new version; `POST /api/v1/healthcare/consents/:id/withdraw?tenantId=...&facilityId=...` withdraws a record. Request DTOs reject unknown fields and enforce bounded values before service execution.

**Database and security.** The existing `ConsentRecord` model is reused, preserving `tenantId`, `facilityId`, `patientId`, purpose, legal basis, policy version, status, capture time, expiry, and withdrawal time. Authorization is enforced server-side through the existing scoped role lookup. Cross-facility patient and consent IDs return scoped not-found errors, and no consent payload is written to normal logs by this change.

**Edge cases and acceptance criteria.** Expired-on-arrival consent is rejected; invalid status or unknown fields are rejected; a cross-scope patient cannot be listed or mutated; replacing active consent creates a new version and withdraws the previous version atomically; repeating withdrawal returns the already withdrawn record without a second mutation. Focused tests cover validation, version replacement, idempotent withdrawal, and facility-scope isolation.

**Dependencies.** Existing auth/RBAC, Prisma schema, patient projection, and audit middleware. Notifications, patient self-service consent, consent-text rendering, and data-subject export remain V1 backlog items and are not fabricated in this slice.
