# Market-driven development plan — Vietnam outpatient clinic operating system

**Author:** Manus AI  
**Date:** 28 August 2026  
**Status:** Research and implementation baseline for the current repository

## Executive decision

The product should be positioned as a **Vietnamese clinic operating system**, not as a generic hospital HIS and not as a consumer marketplace. Its differentiation is a reliable operational layer connecting multi-facility outpatient workflows, patient-facing booking and queue visibility, Vietnamese payment and messaging adapters, and ERPNext accounting/inventory integration. This is a narrower and more defensible wedge than attempting to reproduce every marketplace or hospital feature.

The current repository already has a secure outpatient core: tenant and facility scoping, patient registration with duplicate detection, appointment idempotency and overlap protection, queue state transitions, signed encounter amendments, billing intents, payment webhook replay protection, ERPNext synchronization boundaries, Vietnamese locale defaults, and operational UI improvements. The highest-value missing MVP capability identified from the research is **family/dependent profiles with explicit consent and revocation**, because Vietnamese patients commonly coordinate care for children and older relatives while many users still need staff-assisted workflows.

## Vietnam market evidence and user behavior

Medpro’s live service catalog demonstrates that the market expectation is broader than appointment booking: online queue numbers, time-slot booking, video consultation, laboratory booking, vaccination, home healthcare, cancellation/refund guidance, and promotional offers are all presented as parts of one patient journey.[1] BookingCare demonstrates a discovery-and-trust model built around provider profiles, health content, mobile distribution, and sponsored editorial categories rather than scheduling alone.[2] A peer-reviewed review of digital-health adoption relevant to Vietnam identifies ease of use, direct professional support, technical support, education, privacy governance, and cross-sector collaboration as adoption enablers; low digital literacy, infrastructure access, and weak implementation protocols are barriers.[3]

The practical implication is a **mobile-first but assisted** experience. Phone-based identification, short booking flows, a shareable queue code, Vietnamese language and VND defaults, Zalo/SMS fallback, and receptionist-assisted registration matter more than forcing every patient into a full app account. A caregiver must be able to manage multiple patient profiles, but the system must distinguish convenience from legal authority: a relationship can be pending, active only after captured consent, or revoked.

| Market signal | Product implication | Priority |
|---|---|---:|
| Online queue and time-slot expectations are established by Medpro.[1] | Expose real availability, queue status, estimated wait, and cancellation policy. | Must have |
| Discovery and content influence trust on BookingCare.[2] | Verified provider profiles and verified-visit reviews belong in V1; an open social feed does not. | Should have |
| Digital-health adoption depends on usability, support, and privacy governance.[3] | Keep receptionist workflows, low-bandwidth fallbacks, explicit consent, and redacted logs. | Must have |
| VietQR is a standardized national QR payment rail operated through NAPAS and the banking ecosystem.[4] | Use a provider adapter plus idempotent payment intents and reconciliation; do not hard-code a single bank. | Must have |
| Zalo describes itself as Vietnam’s leading messaging platform and reports 79 million monthly active users.[5] | Add Zalo notification adapter boundary and delivery status; retain SMS/email fallback. | Should have |
| Ministry of Health sources define EMR and information-security obligations.[6] | Keep signed records immutable, record amendments, audit access, and require legal/medical review before claiming compliance. | Must have |

## Competitive and feature-gap analysis

| Product category | Strengths observed | Gap relative to this product | Strategic response |
|---|---|---|---|
| Medpro | Broad consumer health services, queue numbers, refunds, teleconsultation, tests, vaccination, home care.[1] | Consumer marketplace scale is expensive and provider operations are not the core wedge. | Integrate with provider operations first; expose marketplace-ready APIs later. |
| BookingCare | Discovery, content, provider trust, mobile/social distribution, sponsored categories.[2] | Discovery does not by itself solve clinical record integrity, facility operations, ERP accounting, or inventory. | Build verified profiles/reviews and content hooks without copying a social network. |
| Cloud HIS/EMR vendors such as MyHospital | Broad hospital modules, EMR, LIS/PACS, BHYT, warehouse, BI, AI.[7] | Full hospital scope creates long implementation cycles for small and medium clinics. | Focus on outpatient clinic operations and adapter boundaries for LIS/PACS/BHYT. |
| ERPNext/Frappe Healthcare | Extensible ERP, accounting, stock and healthcare primitives.[8] | Default patient-facing UX, Vietnamese booking, queue, consent, and notification behavior need productization. | Keep ERPNext as system-of-record integration boundary; own the experience and workflow guardrails. |
| International clinic SaaS | Mature scheduling, intake, reminders, billing, telehealth patterns.[9] | Vietnamese payment, messaging, address/phone conventions, assisted care, and local legal governance are not defaults. | Localize the operational edge instead of rebuilding every enterprise subsystem. |

### Prioritized gaps

The score below is a qualitative 1–5 multiplication of **business value × user value × market demand × technical feasibility**. It is a prioritization heuristic, not a forecast.

| Gap or opportunity | Score | Release | Decision |
|---|---:|---|---|
| Family/dependent profiles with consent and revocation | 500 | MVP | Implemented in this change |
| Patient deduplication and facility-scoped access | 500 | MVP | Existing; preserve |
| Appointment concurrency and queue visibility | 500 | MVP | Existing; preserve |
| VietQR payment adapter and reconciliation UI | 300 | MVP/V1 | Next backlog item; adapter boundary first |
| Zalo/SMS delivery status and fallback | 400 | V1 | Next backlog item |
| Cancellation/refund/dispute policy | 300 | MVP | Existing refund request boundary; add policy UI |
| Verified-visit reviews and reputation | 192 | V1 | Build after encounter/payment states are stable |
| Inventory lot/expiry and dispense reference | 256 | V1 | Extend ERPNext integration, not a second inventory ledger |
| FHIR export and LIS/PACS/BHYT adapters | 160 | V1/V2 | Define interfaces now; implement provider-specific adapters later |
| AI summary with human review and consent | 144 | V2 | Research sandbox only until data quality and governance mature |
| Livestream commerce, open social feed, automated diagnosis | 48 or less | Not now | Do not build in the outpatient wedge |

## Improved product definition

### Vision and target users

The vision is to help Vietnamese clinics serve patients faster, more transparently, and with auditable multi-facility operations without replacing the ERPNext financial and inventory ledger. Primary buyers are independent clinics and clinic groups; daily users are receptionists, nurses, practitioners, finance staff, facility managers, and tenant administrators. Patients and caregivers are assisted users through web, mobile, QR, Zalo, SMS, or staff-mediated flows.

The core personas are a busy adult booking for themselves, a caregiver booking for a child or older relative, an older patient who needs receptionist or SMS support, a receptionist handling peak-hour intake, a practitioner needing low-click clinical documentation, and a clinic owner comparing utilization, no-shows, wait times, revenue, and quality across facilities.

### Core journeys

A patient or caregiver discovers a service, sees provider, price, duration, location, availability, and cancellation rules, then books with a phone number and receives a code. On arrival the receptionist searches or safely registers the patient, checks consent and any dependent relationship, and issues a queue ticket. The care team moves the appointment through a server-authoritative state machine, signs the encounter, records amendments rather than silently editing, and creates a billing intent. Payment provider events are authenticated and idempotent. After the encounter, the patient receives permitted results, a receipt or refund status, and a follow-up reminder. The clinic manager sees operational and reconciliation metrics without seeing data outside authorized tenant or facility scope.

### Business and revenue model

Use B2B SaaS priced per active facility per month, with one-time implementation and support packages. Add-ons can cover messaging volume, payment processing integration, e-invoice, advanced analytics, LIS/PACS, and managed integration support. Referral or discovery commissions may be introduced in V2 only with disclosure, provider verification, and ranking rules that cannot distort clinical suitability. Never sell patient data or use protected health information for advertising.

### Marketplace and trust rules

Only verified facilities and practitioners are listed. Published slots must represent real availability; prices and surcharges must be effective and visible before confirmation; reviews require a verified visit or paid service; refund and dispute SLAs are explicit; medical claims require approval; and promotional ranking must be disclosed. Break-glass access, high-value refunds, record amendments, and provider changes require audit and, where appropriate, dual control.

## Scope by release

| Priority | Scope |
|---|---|
| **Must have — MVP** | Tenant/facility RBAC; Vietnamese phone and locale handling; patient registration and duplicate review; family/dependent profiles with consent; service/practitioner catalog; availability and appointment concurrency; cancellation/no-show; check-in and queue; encounter draft/submit/amend; billing intent with idempotency; ERPNext outbox/retry/dead-letter boundary; payment webhook verification; consent/audit/redaction; notification abstraction; operations dashboard; health checks, backup runbook, tests, and CI. |
| **Should have — V1** | Real VietQR provider adapter and reconciliation UI; Zalo/SMS delivery status and fallback; patient portal; verified reviews; recurring appointments; voucher quota and campaign guardrails; inventory lot/expiry; e-invoice adapter; referral; offline-safe reception draft; English locale; FHIR export boundary; operational BI. |
| **Could have — V2/future** | Teleconsultation with consent and recording policy; LIS/PACS; BHYT workflow; OCR; voice-to-note; human-reviewed AI summary; predictive no-show; care plans; home care; partner fulfillment; regional expansion. |
| **Not now** | Full inpatient/ICU/OR/HIS replacement; open social feed; livestream shopping; automated diagnosis or prescription; crypto/BNPL; automatic patient merge; PHI ad targeting; fragmented microservices before measured scale. |

## Architecture and operating model

The repository should remain a **modular monolith at the product boundary**, with explicit modules for identity/scope, patient, family consent, appointment/queue, clinical, billing/payment, notification, ERPNext sync, audit, reporting, and integration adapters. This is easier to test and operate than prematurely splitting twenty-five services. Background work should use the existing queue abstraction for ERPNext sync and later notification/payment reconciliation jobs. Redis is appropriate for rate limits, short-lived locks, and cache; PostgreSQL/Prisma remains the transactional source of truth; object storage is for non-PHI media or encrypted controlled clinical artifacts; and search should begin with PostgreSQL indexes before introducing a separate search cluster.

Authentication uses short-lived access tokens, refresh-token rotation, OTP or provider login as appropriate, and server-side RBAC with tenant/facility scope. Every sensitive write checks scope on the server. PHI is encrypted in transit and at rest, secrets remain server-side, logs redact phone numbers and clinical payloads, webhook signatures use HMAC plus timestamp and event deduplication, and rate limits address OTP abuse, booking bots, coupon abuse, and account takeover. Observability must include structured logs, request IDs, audit events, queue depth, payment reconciliation lag, notification delivery, error rate, latency, and restore drills.

CI/CD should run dependency installation, Prisma validation/generation, typecheck, unit/integration tests, production builds, whitespace checks, and documentation smoke checks. Deploy migrations forward-only, use feature flags for provider adapters, maintain encrypted backups, and test restore against explicit RTO/RPO targets. Legal review is required for the current personal-data, cybersecurity, EMR, health-insurance, e-invoice, and medical-advertising rules; code review is not a legal certification.

## Dependency-aware development plan

Each feature must be delivered as **implement → test → review → fix → refactor → document**. The following order prevents downstream rework.

| Order | Module and objective | Main requirements and acceptance criteria | Dependencies |
|---:|---|---|---|
| 1 | Identity and scope | Server-side tenant/facility authorization, role matrix, redacted projections, audit event on sensitive access. Unauthorized cross-scope reads/writes return a stable 403 and tests prove no data leak. | Existing auth and UserRoleScope |
| 2 | Patient registry | Vietnamese phone normalization, duplicate candidate response, active/inactive lifecycle, facility-scoped search. No automatic merge. | Identity and Prisma patient projection |
| 3 | Family/dependent profiles | Create/list/revoke relationships, same-facility active patients only, self-link rejection, duplicate protection, pending/active consent, revocation, minimized dependent projection. All writes are scoped and every endpoint is tested. | Identity, patient registry |
| 4 | Booking and queue | Availability, idempotency, overlap protection, check-in, queue state machine, live status. Concurrent requests cannot double-book or issue duplicate tickets. | Patient registry |
| 5 | Clinical and billing | Draft/sign/amend, order references, VND billing intents, refund policy, immutable audit. Signed encounters are not overwritten and payment transitions are monotonic. | Booking, patient, scope |
| 6 | Provider adapters | ERPNext outbox/retry/dead-letter; VietQR webhook adapter; Zalo/SMS/email notification adapters; e-invoice boundary. Provider failures are retryable and idempotent. | Billing, queue, background jobs |
| 7 | Trust and growth | Verified review, voucher quota, referral, patient portal, operational BI. Reviews require completed verified encounters; campaign abuse is rate-limited and auditable. | Clinical, billing, identity |
| 8 | Advanced care | Teleconsultation, LIS/PACS, BHYT, AI summary, predictive no-show. Human-in-the-loop, consent, retention, and rollback are mandatory. | Stable data quality, legal and clinical governance |

### Feature contract implemented in this change: family/dependent profiles

**User story:** As a receptionist or authorized clinic administrator, I want to link a guardian patient to a dependent patient so a caregiver can coordinate care without merging records.

**Functional requirements:** The API lists active links for a guardian, creates a link with a bounded relationship label and `pending` or `active` consent status, and revokes a link without deleting history. Reactivation of a previously revoked link is allowed through an explicit new request. The response exposes only the dependent’s identifier, name, last four phone digits, date of birth, sex, and active status.

**Business rules:** Both patients must be active and in the same tenant and facility. Self-links and duplicate active links are rejected. `active` records capture consent time; `pending` records do not grant implicit authorization. Revocation sets a timestamp and status rather than deleting the record. Automatic patient merge is intentionally excluded.

**API contract:** `GET /healthcare/patients/:patientId/family-links?tenantId=&facilityId=` lists links; `POST /healthcare/patients/:patientId/family-links` accepts `{tenantId, facilityId, dependentPatientId, relationship, consentStatus}`; `DELETE /healthcare/family-links/:linkId?tenantId=&facilityId=` revokes a link. Errors use the existing `NOT_FOUND`, `CONFLICT`, and `FORBIDDEN` envelope conventions.

**Security and tests:** Every request passes through authentication and the existing scope helper. Tests cover valid creation, same-facility enforcement, self-link rejection, duplicate detection, revocation, reactivation, pending consent, and redacted projections. Database uniqueness and indexes provide a second line of defense.

## Quality gate and backlog

A feature is complete only when functional, responsive, mobile, API, persistence, authorization, error, edge-case, performance, unit, integration, and documentation checks pass. The current implementation adds family/dependent capability and its migration; the next high-value backlog is real VietQR adapter plus reconciliation, notification delivery status with Zalo/SMS fallback, verified reviews, and inventory lot/expiry projections. Full legacy frontend lint cleanup remains a separate migration because it spans unrelated code and creates unnecessary release risk.

## Assumptions and risks

The current repo is treated as the source of truth for implementation conventions and as a modular-monolith integration layer around ERPNext. Provider credentials, bank accounts, Zalo OA approval, SMS sender identity, e-invoice configuration, and legal interpretations are deployment-specific and are not invented in code. Health data is treated as sensitive; retention, cross-border transfer, deletion, and patient-rights workflows require a deployment-specific legal and clinical review.

## References

[1]: https://medpro.vn/ "Medpro — Vietnamese healthcare booking and service platform"
[2]: https://bookingcare.vn/ "BookingCare — Vietnamese healthcare discovery and booking platform"
[3]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10132046/ "Lessons for Vietnam on the Use of Digital Technologies to Support Patient-Centered Care"
[4]: https://www.napas.com.vn/ "NAPAS — Vietnam national payment infrastructure"
[5]: https://zalo.me/en/product/zalo/ "Zalo — product and platform information"
[6]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Vietnam Ministry of Health — effective electronic medical record and information-security instruments"
[7]: https://myhospital.vn/ "MyHospital — cloud HIS/EMR and healthcare operations platform"
[8]: https://docs.frappe.io/erpnext/freshcare "Frappe/ERPNext healthcare documentation"
[9]: https://octopuspro.com/medical-clinic-management-software/ "International clinic management and booking software reference"
