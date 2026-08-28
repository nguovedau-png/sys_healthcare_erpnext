# Implementation scope v1

## Product boundary

The repository already contains the healthcare application boundary around ERPNext. This milestone hardens the outpatient core rather than duplicating ERPNext CRM, ERP, HR or accounting. ERPNext remains authoritative for Customer, Supplier, Item/Stock, Sales Invoice, Payment Entry, Employee, payroll and general ledger. The healthcare service remains authoritative for tenant/facility scope, patient-facing registration, appointment state, queue/encounter orchestration, clinical amendment metadata, synchronization state and audit context.

## Must-have delivered in this milestone

| Capability | Server rule | Verification |
|---|---|---|
| Tenant/facility access | System Admin bypass; scoped roles match exact facility or tenant-wide scope; all resource lookups include tenant/facility | Unit tests for tenant-wide and cross-facility denial |
| Patient registration | Vietnamese mobile normalization; duplicate candidate conflict; no unknown fields | Validation and service tests |
| Appointment | Idempotency replay only when request identity matches; conflicting reuse returns 409; overlap check and optimistic state transition | Service regression tests |
| Encounter | Patient/appointment facility consistency; signed encounters immutable through amendment record; only assigned practitioner signs/amends | Service regression tests |
| API boundary | Authenticated routes, strict body/query validation, bounded result sets and sanitized errors | API tests and typecheck |
| ERPNext boundary | Typed client, bounded retry, no secret logging, status probe remains sanitized | Client tests |
| Delivery hygiene | Reproducible Prisma generation/build command and explicit migration baseline | Documentation and CI commands |

## Should-have deferred

Patient portal, recurring appointments, notifications, FHIR export, DICOM/PACS links, insurance claim adapter, stock/expiry dashboards and configurable workflow UI remain follow-up work. They are not silently represented as complete.

## Core edge cases

The implementation must reject stale appointment transitions, duplicate idempotency keys with different payloads, cross-tenant/cross-facility patient and appointment references, malformed ISO dates, unknown input fields, unsigned encounter amendment attempts, unauthorized practitioners, and unbounded patient search. Remote ERPNext errors must not expose credentials or raw upstream payloads to clients.
