# Healthcare Platform: research and requirements baseline

**Author:** Manus AI
**Status:** Baseline for implementation, subject to validation in pilot deployment

## 1. Market findings

The Vietnamese market is segmented into patient-facing booking networks and clinic/hospital operating systems. BookingCare presents a trusted discovery and booking experience, while Medpro combines facility discovery, online queue numbers, video consultation, laboratory booking, vaccination, home healthcare, and enterprise health packages. Clinic/HIS vendors such as MedSoft and MyHospital emphasize the operational core: patient registration, appointments, EMR, pharmacy and inventory, billing, laboratory and imaging integrations, reports, and multi-branch administration. These findings indicate that a credible product must serve both sides of the workflow: a low-friction patient journey and an auditable facility operating system.[1] [2] [3] [4]

The strongest competitive expectations are not only feature breadth. They include Vietnamese-language workflows, multiple facilities, queue and appointment visibility, prescription and follow-up reminders, inventory lot/expiry control, electronic invoices, role-based access, operational reporting, and integration openness. MyHospital publicly positions cloud HIS, EMR, CRM, ERP, HRM, pharmacy, inventory, billing, health-insurance linkage, LIS/PACS, and configurable permissions as one integrated platform; MedSoft publishes entry-level clinic pricing and a progressive module model, suggesting that an expandable small-clinic entry point is commercially important.[1] [2]

## 2. Target operating model

The initial product should support clinics and multi-branch healthcare operators with outpatient care as the first production slice, while keeping the data model compatible with inpatient, laboratory, pharmacy, telehealth, and enterprise health expansion. ERPNext, including the current separated Marley Health application, is the system of record for CRM, ERP, HR, accounting, inventory, and billing documents. The healthcare platform owns patient-facing experience, booking orchestration, clinical workflow state, notifications, and integration metadata. Clinical records that are legally part of the medical record must be explicitly governed and not treated as ordinary CRM notes.

ERPNext’s current healthcare documentation covers patients, practitioners, appointments, encounters, clinical records, laboratory tests, procedures, inpatient care, and billing integration. The documented lifecycle is registration → booking → encounter → prescription or test/procedure → billing → follow-up.[5]

## 3. Primary user flows

### Patient

A patient discovers a facility or service, selects specialty and practitioner, sees available slots, submits demographic and consent details, receives a booking confirmation, checks in using booking code or phone, follows queue status, receives clinical results and prescription access according to authorization, pays or views invoice status, and receives follow-up reminders. Rescheduling and cancellation must be explicit state transitions with policy-based cutoff times and refund handling.

### Receptionist

A receptionist searches or registers a patient with duplicate detection, verifies identity and contact information, books or reschedules an appointment, assigns queue number, checks the patient in, records payer and invoice metadata, and hands the encounter to the clinical team. Receptionists must not read unrestricted clinical notes unless their role and facility policy allow it.

### Practitioner

A practitioner sees assigned appointments, opens a patient encounter, records symptoms, vital signs, assessment, diagnosis, orders, prescription and follow-up instructions, signs or submits the encounter according to facility policy, and can view only the minimum necessary historical information for the care relationship.

### Nurse or clinical assistant

A nurse records triage, vitals, queue transitions, specimen collection, procedure preparation, and discharge instructions. A nurse may not finalize diagnoses or prescriptions unless separately authorized.

### Pharmacist or inventory operator

The operator receives and issues stock by item, batch and expiry, validates prescription dispensing, tracks stock movement, prevents negative stock unless an explicit emergency override is authorized, and reconciles inventory with ERPNext.

### Finance and HR

Finance users manage invoices, receipts, refunds, payment status, expense and accounting reports through ERPNext. HR users manage employee master data, attendance, leave, payroll and certifications through ERPNext. The healthcare application consumes read models and links users to ERPNext identities; it does not create a competing accounting or HR ledger.

### Facility administrator

The administrator manages facilities, departments, services, schedules, pricing references, roles, consent templates, integrations, reconciliation queues, audit logs and operational dashboards. High-risk actions require step-up authentication or dual approval where configured.

## 4. Business rules

| Area | Rule | Priority |
| --- | --- | --- |
| Identity | A patient can have one canonical profile per tenant, with duplicate candidates generated from normalized phone, national identifier when legally collected, date of birth and name; automatic merge is prohibited. | Must-have |
| Appointment | A slot cannot be double-booked for the same practitioner/resource; concurrency must be enforced transactionally. | Must-have |
| Appointment | Allowed transitions are requested → confirmed → checked-in → in-progress → completed, with cancelled/no-show/expired branches; illegal transitions return a domain error. | Must-have |
| Appointment | Cancellation and refund behavior is policy-driven by facility, service and cutoff window. | Must-have |
| Clinical | Only assigned or explicitly authorized care-team users can access encounter detail; every read/write is auditable. | Must-have |
| Clinical | A submitted/signed encounter is immutable; corrections create an amendment with author, reason and timestamp. | Must-have |
| Medication | Prescription and dispensing must validate item, quantity, dosage instructions and stock/expiry policy; clinical warnings are advisory and never replace practitioner judgment. | Must-have |
| Billing | Clinical completion may create a billable event, but invoice posting, payment and refund remain ERPNext accounting actions. | Must-have |
| Sync | Every outbound operation has a deterministic idempotency key, request hash, retry state, dead-letter state and redacted audit summary. | Must-have |
| Sync | ERPNext document identifiers are stored as external references; retries never create duplicates. | Must-have |
| Sync | Conflicts are resolved by field ownership. ERPNext wins for CRM/ERP/HR/accounting/inventory master and ledger fields; healthcare wins for booking orchestration and patient UX fields. | Must-have |
| Tenant | Every read/write is tenant- and facility-scoped. Cross-facility access requires an explicit role permission. | Must-have |
| Privacy | Consent, purpose, retention and access logging are first-class data. Sensitive values are never written to application logs. | Must-have |

## 5. Must-have and should-have

| Priority | Scope |
| --- | --- |
| Must-have | Multi-tenant/facility model; authentication and RBAC; patient registration and duplicate review; practitioner and service catalog read from ERPNext; appointment availability and booking; check-in and queue; outpatient encounter; prescription and lab/procedure order references; billing handoff; notifications; ERPNext sync queue, retry, dead letter, reconciliation and webhook handling; audit log; Vietnamese timezone/currency/formatting; API validation; admin operations dashboard; responsive public/admin web; deployment configuration and runbooks. |
| Should-have | Patient mobile app; teleconsultation; e-invoice provider; Zalo/SMS provider; LIS/PACS adapters; insurance/BHYT workflows; electronic signature; multi-language; advanced BI; inpatient/bed management; loyalty and campaigns; pharmacy storefront; offline clinic mode. |

## 6. Edge cases that must be tested

Duplicate patient registration, concurrent booking for the final slot, practitioner schedule changes after booking, timezone and daylight-saving-safe timestamps, appointment cancellation after check-in, no-show conversion, partial payment and refund, ERPNext timeout after remote success, duplicate webhook delivery, out-of-order webhook events, expired inventory batch, negative stock attempt, revoked staff access during an active encounter, signed encounter amendment, facility suspension, tenant boundary access, replayed idempotency key with a different payload, malformed doctype data, rate limiting, and notification provider failure.

## References

[1]: https://myhospital.vn/ "MyHospital – phần mềm quản lý bệnh viện và phòng khám"
[2]: https://medsoft.vn/ "MedSoft – phần mềm quản lý phòng khám"
[3]: https://medpro.vn/ "Medpro – nền tảng đặt khám và dịch vụ y tế"
[4]: https://bookingcare.vn/ "BookingCare – nền tảng y tế"
[5]: https://docs.frappe.io/erpnext/frappe-healthcare "Healthcare Module in ERPNext / Marley Health documentation"
[6]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Bộ Y tế – văn bản pháp lý có hiệu lực về bệnh án điện tử"
