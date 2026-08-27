# Healthcare platform architecture and ERPNext integration

## Architectural decision

The existing NestJS gateway and services remain the application boundary for patient and facility workflows. ERPNext remains the source of truth for CRM, ERP, HR, accounting, inventory, customer/supplier/employee masters, invoices, payment entries and stock ledger. The healthcare platform keeps only operational projections and integration metadata needed for a responsive user experience.

The integration uses an outbox-like `SyncOperation` record. A request is validated, hashed, deduplicated by `(tenantId, sourceSystem, sourceId, idempotencyKey)`, persisted before remote I/O, sent to ERPNext using token authentication and idempotency headers, retried only for transient failures, and marked `DEAD_LETTER` after the configured threshold. Remote document names are persisted in the source domain record or an external-reference table in the next migration. A replay with the same idempotency key and a different hash is rejected with conflict.

ERPNext-to-platform updates should use a signed webhook endpoint where the deployed ERPNext/Marley Health version and facility configuration support it. Otherwise, a bounded reconciliation worker polls `modified` timestamps and compares external references. Webhook events are deduplicated by event ID and processed out of order using version/timestamp checks. No destructive remote delete is inferred from a missing record.

## Domain ownership

| Domain | Source of truth | Platform responsibility |
| --- | --- | --- |
| Patient-facing account and consent | Healthcare platform, with mapped ERPNext Customer/Patient where required | Consent, authentication, patient UX, access audit, mapping |
| Patient/Customer master | ERPNext after approved mapping | Search projection, duplicate review workflow, sync status |
| Practitioner/Employee/HR | ERPNext HRMS | Availability projection, role mapping, schedule cache |
| Appointment orchestration | Healthcare platform | Slot locking, state machine, queue, reminders; publish Patient Appointment to ERPNext |
| Encounter and clinical record | ERPNext/Marley Health plus governed clinical service | Clinical write path, signature/amendment policy, minimum-necessary access |
| Item, batch, warehouse, stock ledger | ERPNext | Read projection, dispensing request and reconciliation |
| Invoice, payment, refund, accounting | ERPNext | Billing intent, display and payment callback correlation |
| Notification delivery | Healthcare platform/provider adapters | Templates, delivery status, retry and opt-out |
| Audit and integration operations | Healthcare platform | Immutable access/change/audit trail and reconciliation UI |

## Core data model additions

The existing `SyncOperation` is retained and should be extended with `remoteName`, `remoteModifiedAt`, `eventId`, `lockedAt`, and `lastAttemptAt`. A normalized `ExternalReference` table should map `(tenantId, facilityId, entityType, entityId)` to `(provider, doctype, remoteName, remoteModifiedAt, versionHash)` with unique constraints on both local and remote identity. A `WebhookReceipt` table should deduplicate provider events by `(provider, tenantId, eventId)` and record signature verification and processing status. A `ConsentRecord` table should store patient, purpose, legal basis, scope, status, capturedAt, withdrawnAt and policy version. An `AuditEvent` table should store actor, tenant, facility, action, resource type/id, outcome, request ID, timestamp and redacted metadata.

## API contract

The gateway exposes versioned endpoints under `/api/v1` in production. High-risk endpoints use DTO validation, request IDs, rate limits and tenant/facility authorization.

| Endpoint | Purpose | Authorization |
| --- | --- | --- |
| `GET /health` | Liveness/readiness with sanitized dependency status | Public liveness; readiness restricted in production |
| `POST /api/v1/patients` | Register or submit duplicate-review candidate | Receptionist/admin/patient self |
| `GET /api/v1/patients/:id` | Minimum-necessary patient profile | Care-team or scoped operations role |
| `GET /api/v1/availability` | Return bookable slots from schedule projection | Public for published availability |
| `POST /api/v1/appointments` | Atomically reserve and confirm/request a slot | Patient/receptionist |
| `POST /api/v1/appointments/:id/check-in` | Start visit queue workflow | Receptionist/nurse |
| `POST /api/v1/encounters` | Create encounter draft | Practitioner/nurse as scoped |
| `POST /api/v1/encounters/:id/submit` | Submit/sign immutable clinical record | Practitioner with clinical permission |
| `POST /api/v1/erp/integrations/erpnext/upsert` | Idempotent outbound ERPNext upsert | Integration credential only |
| `GET /api/v1/erp/integrations/erpnext/sync-operations` | Reconciliation/operations list | Facility admin/integration operator |
| `POST /api/v1/erp/integrations/erpnext/webhook` | Verified ERPNext event intake | Provider signature + rate limit |
| `POST /api/v1/erp/integrations/erpnext/sync-operations/:id/retry` | Explicit retry of failed operation | Integration operator, audited |

## Roles and permissions

`platform_admin` manages global configuration; `tenant_admin` manages organization users and facilities; `facility_admin` manages local operations; `receptionist` manages registration, appointment and check-in; `nurse` manages triage and queue; `practitioner` manages assigned encounters, diagnoses, prescriptions and clinical submission; `pharmacist` manages dispensing and stock operations; `lab_technician` manages specimen and result workflow; `finance` reads billing projections and operates ERPNext accounting; `hr_manager` operates ERPNext HR workflows; `patient` accesses only self data and granted documents; `integration_operator` manages sync/reconciliation without clinical read access; `auditor` reads immutable logs without mutation rights.

Authorization is deny-by-default, scoped by tenant and facility, and checked in the service layer rather than relying only on UI visibility. Clinical field-level restrictions are separate from ordinary CRUD permissions.

## Deployment and reliability

Development uses the existing Docker Compose infrastructure. Production must provide managed PostgreSQL, Redis, RabbitMQ or a managed queue, HTTPS termination, secret injection, database migrations, backups, restore drills, structured logs with sensitive-data redaction, metrics, traces, health probes and a dead-letter operations dashboard. The ERPNext endpoint must be private or allowlisted where possible, use a dedicated least-privilege API user, and never expose its secret to browser bundles.

## Non-functional targets

For the outpatient core, target p95 API latency below 500 ms for reads and below 800 ms for local writes excluding remote provider latency, 99.9% monthly availability for the application boundary, zero duplicate bookings under concurrency tests, and deterministic recovery after ERPNext timeout or duplicate delivery. These are engineering targets, not a compliance certification.
