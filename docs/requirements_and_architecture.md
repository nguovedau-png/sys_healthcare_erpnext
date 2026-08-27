# Healthcare ERPNext Platform — Requirements and Architecture

## 1. Product boundary

The product is a Vietnamese healthcare operations layer around ERPNext. ERPNext is the system of record for **CRM, ERP, HR and Accounting** master and transaction documents. The healthcare layer owns patient-care workflow UX, facility context, mobile workflows, orchestration, sync metadata, and clinical audit history. It must never duplicate accounting truth or silently overwrite signed clinical records.

The primary target is a multi-facility outpatient clinic or healthcare group that needs a fast Vietnamese front desk and clinical workflow while retaining ERPNext's finance, HR, CRM, inventory and reporting capabilities. The design can expand toward inpatient, LIS/PACS and patient portal integrations, but the first production milestone must remain operationally reliable.

## 2. Roles and authorization

Authorization is server-side and every query is scoped by tenant and facility. A user may have multiple roles and facility memberships; the effective permission is the intersection of role capability and assigned scope. Frontend visibility is never treated as authorization.

| Role | Allowed capabilities | Explicit restrictions |
|---|---|---|
| Platform owner | Tenant, facilities, integrations, audit, break-glass support | Break-glass access is time-bound and audited |
| Facility admin | Users, departments, schedules, services, operational reports | Cannot alter signed clinical records or ERPNext accounting truth |
| Receptionist | Patient registration/matching, appointments, queue, payment status | No clinical notes, prescriptions, diagnoses or lab results |
| Practitioner | Assigned appointments, encounters, observations, prescriptions and orders | Only assigned facility and care scope |
| Pharmacist/Lab staff | Relevant prescriptions, dispensing or lab orders/results | No unrelated clinical notes or financial administration |
| Accountant | ERPNext invoices, payments, reconciliation and finance reports | No clinical notes or prescriptions |
| Partner/provider | Explicit referrals and assigned fulfillment updates | No cross-partner or unassigned patient access |
| Patient | Own profile, appointments, instructions, receipts and released results | Own records only; no internal notes |

## 3. Core user flows

The must-have flow is: patient registration or safe matching → appointment booking → confirmation → check-in → clinical encounter → signed assessment and orders/prescription → ERPNext billing request → payment/invoice status → follow-up. Appointment states are `pending`, `confirmed`, `checked_in`, `in_progress`, `completed`, `cancelled`, and `no_show`; terminal states cannot be reopened without an audited correction workflow.

A duplicate registration uses normalized phone plus facility scope as a candidate key, but staff must confirm identity before merging. A signed encounter, order or prescription is immutable. Correction creates an amendment with author, reason, prior version reference and timestamp. Mobile writes include a client mutation identifier and reject stale versions rather than overwriting newer data.

## 4. Domain data model

The healthcare database stores only the healthcare-owned context and integration metadata. ERPNext document identifiers are retained as external references, not shadow accounting ledgers.

| Entity | Key fields and invariants |
|---|---|
| Tenant | `id`, legal name, status, timezone, retention policy; all records carry tenant scope |
| Facility | `id`, tenant, ERPNext company/branch reference, address, timezone, active status |
| UserMembership | user, tenant, facility, roles, active period; least privilege |
| Patient | tenant/facility scope, normalized phone hash, display name, DOB, sex, identifiers, consent state, ERPNext Patient reference |
| PractitionerAssignment | practitioner, facility, department, service, schedule and active period |
| Appointment | patient, practitioner, facility, service, start/end, status, source, version; no overlap for same practitioner/facility |
| Encounter | appointment, patient, practitioner, reason, assessment, signedAt, version, amendment chain |
| ClinicalOrder | encounter, type, item/service reference, status, result reference, signedAt; immutable after sign-off |
| Prescription | encounter, medicines, dosage/instructions, sign-off metadata, ERPNext references; immutable after sign-off |
| BillingLink | source entity, ERPNext Sales Invoice/Payment references, amount snapshot, currency, status, correlation key |
| SyncOperation | operation, doctype, source ID, idempotency key, direction, status, attempt count, next retry, redacted summary, error class |
| AuditEvent | actor, tenant/facility, action, resource, result, reason, request ID, timestamp, redacted metadata |
| Consent | patient, purpose, channel, granted/revoked timestamps, evidence reference |

Recommended unique constraints are `(tenant_id, facility_id, normalized_phone_hash)` for matching candidates, `(facility_id, practitioner_id, start_at)` for appointment conflict detection, and `(tenant_id, source_system, source_id, operation)` for integration idempotency. Personally identifiable values must not be placed in ordinary logs.

## 5. ERPNext ownership and sync contract

The integration provider exposes typed operations for ERPNext doctypes including `Customer/Lead` for CRM, `Item/Stock Entry` for ERP inventory, `Employee/Healthcare Practitioner` for HR references, and `Sales Invoice/Payment Entry` for Accounting. Healthcare-specific documents such as patient encounters remain owned by the healthcare app while using ERPNext references where Marley Health or ERPNext is installed.

Every request contains `idempotencyKey`, `tenantId`, `facilityId`, `sourceSystem`, and `sourceId`. The adapter uses server-only token credentials, allowlisted doctypes, bounded exponential retry for timeouts, 408, 429 and 5xx, and no retry for validation or authentication failures. Duplicate webhook delivery is harmless, and out-of-order events are rejected or parked until their predecessor is available. A dead-letter operation can be replayed by a privileged operator with an audit reason.

## 6. API contract

| Method | Endpoint | Purpose | Authorization |
|---|---|---|---|
| GET | `/health` | Service health without secrets | Public operational metadata only |
| GET | `/erp/integrations/erpnext/health` | Sanitized integration status | Facility admin/platform owner |
| POST | `/erp/integrations/erpnext/upsert` | Allowlisted ERPNext upsert | Integration credential plus server-side scope |
| POST | `/patients` | Register or match patient | Receptionist or clinical role |
| GET | `/patients/:id` | Scoped patient summary | Role and care scope |
| POST | `/appointments` | Book appointment with overlap validation | Receptionist/facility admin/patient self-service |
| POST | `/appointments/:id/check-in` | Transition to checked-in | Receptionist |
| POST | `/encounters` | Create encounter draft | Practitioner |
| POST | `/encounters/:id/sign` | Sign encounter | Assigned practitioner |
| POST | `/sync/:id/replay` | Replay dead-letter sync | Platform owner/integration admin |
| GET | `/audit` | Search scoped audit trail | Platform owner/facility admin |

All request DTOs use whitelist validation, reject unknown fields, constrain string lengths and identifiers, and return safe error codes. API responses must not reveal ERPNext credentials, internal stack traces, or unscoped records.

## 7. Edge cases and business rules

The system must handle duplicate patient candidates, appointment overlap and timezone conversion, practitioner absence, cancellation payment reversal, partial ERPNext outage, rate limiting, duplicate inbound events, out-of-order events, stale mobile mutations, tenant leakage, role escalation, amendment of signed records, consent revocation, deletion/retention requests, and redaction of identifiers in logs. A failed sync never causes a second invoice on retry. A clinical sign action requires practitioner, reason, assessment and signed timestamp. A receptionist cannot escalate privileges through request-body role fields.

## 8. Priority

| Priority | Scope |
|---|---|
| Must-have | Tenant/facility authorization, user roles, patient registration/matching, appointment lifecycle, encounter draft/sign/amendment boundary, prescriptions/orders metadata, ERPNext typed adapter, invoice/payment status link, idempotency/retry/dead-letter status, audit logs, Vietnamese timezone/phone normalization, web admin/front desk/clinical screens, mobile mutation safety, unit/integration/API tests |
| Should-have | Waiting queue, recurring appointments, patient portal, referral/partner fulfillment, inventory alerts, dashboards, notifications, FHIR-compatible export, DICOM/PACS links, insurance adapter, digital-signature provider, configuration UI |
| Deferred until validated | National insurance submission, full legal EMR certification, autonomous diagnosis or treatment, complete inpatient/OR/ICU scope, universal device driver library |

## 9. Architecture

The existing NestJS API gateway and service topology remain in place. Controllers depend on domain services and typed ports, never directly on ERPNext HTTP details. The ERP service owns the ERPNext adapter, sync state and retry classification. A durable queue or scheduled worker should process retries and dead letters; request paths return correlation status instead of blocking on long-running synchronization.

Web admin provides facility administration, front desk, practitioner workspace, pharmacy/lab worklists, accounting sync status and audit review. Public web provides consented appointment and patient self-service flows. Mobile clients share the API contract and use offline-safe mutation IDs, version checks and explicit retry states. ERPNext remains the authoritative UI for CRM, ERP, HR and Accounting master/transaction work where the healthcare UX does not add value.

## 10. Production non-functional requirements

Secrets are environment-only and must never use `NEXT_PUBLIC_*`. Production CORS and CSP origins are explicit environment allowlists. Requests have correlation IDs, structured redacted logs, rate limits and bounded payload sizes. Database backups, restore drills, retention policies, health checks and migration rollback plans are required. Performance targets for the core outpatient flow are p95 API latency below 500 ms excluding external ERPNext calls, no duplicate side effects under retry, and deterministic authorization tests for every sensitive endpoint.

## References

[1]: https://docs.frappe.io/erpnext/frappe-healthcare — Healthcare Module in ERPNext / Marley Health documentation.
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ — Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals (2025).
[3]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8867296/ — Digital Health Policy and Programs for Hospital Care in Vietnam (2022).
[4]: https://flexclinic.vn/en/ — FLEX|Clinic Vietnamese clinic-management feature overview.
[5]: https://fpt-is.com/emr/ — FPT.EMR feature and interoperability overview.
[6]: https://myhospital.vn/ — MyHospital HIS/EMR/CRM/HR and cloud feature overview.
[7]: https://cloudgo.vn/phan-mem-quan-ly-phong-kham — CloudGO clinic-management comparison.
