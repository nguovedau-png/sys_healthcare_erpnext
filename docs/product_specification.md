# Healthcare ERP Platform — Product Specification

## Product boundary

The platform is a Vietnamese healthcare operations layer around ERPNext. ERPNext remains the source of truth for CRM, ERP, HR and Accounting master/transaction data. The custom healthcare layer owns patient-facing and clinical workflow UX, integration orchestration, facility context, mobile workflows, and synchronization metadata. Clinical data is never silently overwritten; conflict resolution and audit history are explicit.

## Personas and access policy

| Role | Core access | Sensitive-data boundary |
|---|---|---|
| Platform owner | Tenant, facility, integration, audit and system settings | Full tenant scope, break-glass actions audited |
| Facility admin | Users, departments, schedules, services, operational reports | Facility scope |
| Receptionist | Patient registration, appointment booking, queue and payment status | Demographics and operational data; no clinical notes |
| Practitioner | Assigned appointments, encounters, observations, prescriptions and orders | Assigned facility/patient care scope |
| Pharmacist/Lab staff | Prescription dispensing or lab orders/results | Only relevant orders and patient identifiers |
| Accountant | ERPNext invoices, payments and reconciliation status | Financial data; no clinical notes |
| Partner/provider | Referrals, assigned patients and fulfillment updates | Explicit partner scope only |
| Patient | Own profile, appointments, instructions and receipts | Own records only |

Authorization must be enforced server-side using tenant/facility scope plus role permissions. Frontend hiding is not authorization.

## Must-have workflow

Registration creates or matches a patient using a normalized phone plus facility scope, without exposing full identifiers in logs. Appointment transitions are `pending → confirmed → checked_in → in_progress → completed`, with `cancelled` and `no_show` terminal alternatives. Encounter completion requires practitioner, reason, assessment and signed timestamp. Orders and prescriptions are immutable after clinical sign-off; correction creates a versioned amendment. Billing requests are sent to ERPNext and receive an idempotent correlation key. Every outbound/inbound sync attempt has status, retry count, last error, and audit metadata.

## Should-have workflow

Waiting-room queue, recurring appointments, referral management, patient portal, partner fulfillment, inventory alerts, dashboards, HL7/FHIR-compatible export boundary, DICOM/PACS links, insurance claim adapter, and configurable notifications. These are staged after the reliable core lifecycle.

## Integration contract

The integration layer uses a provider interface and an ERPNext REST adapter. Each operation carries `idempotencyKey`, `tenantId`, `facilityId`, `sourceSystem`, `sourceId`, and a redacted payload summary. Retries are bounded with exponential backoff. Non-retryable validation/authentication errors are marked failed; transient 408/429/5xx errors are retried. Credentials are server-only environment variables and never exposed as `NEXT_PUBLIC_*` values.

## Edge cases

Duplicate patient registration, appointment overlap, cancelled appointment payment reversal, practitioner absence, timezone and DST conversion, stale mobile writes, partial ERPNext outage, ERPNext rate limiting, duplicate webhook delivery, out-of-order events, tenant leakage, role escalation, signed clinical record amendment, and deletion requests must all be covered by validation, idempotency, authorization and audit logs.

## Architecture decision

Keep the existing NestJS service topology, but introduce a narrow modular integration boundary instead of coupling clinical controllers to ERPNext HTTP details. The first implementation milestone provides a typed ERPNext REST client, safe retry policy, idempotency metadata, and a health/status endpoint. Healthcare domain services can consume this boundary from booking/ERP modules without duplicating CRM/HR/accounting logic.
