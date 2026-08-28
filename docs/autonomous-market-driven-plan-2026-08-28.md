# Autonomous market-driven development plan — Vietnam outpatient clinic operating system

**Author:** Manus AI  
**Date:** 28 August 2026  
**Status:** Executed baseline with reconciliation slice implemented

## Executive product decision

The product is positioned as a **Vietnamese multi-facility outpatient clinic operating system**, not a consumer marketplace and not an immediate replacement for a full hospital HIS. It connects patient registration, family/caregiver coordination, booking, queue visibility, outpatient records, billing, refunds, notifications, and ERPNext accounting/inventory boundaries. This wedge addresses the operational gap between broad consumer platforms and broad hospital systems while preserving a maintainable modular-monolith product boundary.

Medpro’s official service catalog includes online booking, queue numbers, video consultation, laboratory booking, after-hours care, home care, vaccination, cancellation/refund messaging, and phone-assisted booking.[1] BookingCare’s official platform combines doctor/facility/service discovery, in-facility and at-home care, remote consultation, health content/tests, and AI-assisted discovery.[2] NAPAS describes VietQR as merchant-presented QR infrastructure connecting banks and payment intermediaries under State Bank standards.[3] These signals imply that Vietnamese users expect transparency, assisted channels, real payment confirmation, and a connected journey—not merely a calendar.

## Target users and journeys

| Persona | Primary job | Product response |
|---|---|---|
| Busy adult patient | Book quickly, know cost and waiting time | Phone-first booking, real slot/queue state, VND price, clear cancellation policy |
| Family caregiver | Coordinate care for children or older relatives | Separate dependent records, explicit consent, revocation, minimized projections |
| Older or low-digital-literacy patient | Complete care with assistance | Receptionist workflow, shareable code, SMS/voice fallback, large Vietnamese UI |
| Receptionist | Register and move patients through peak-hour intake | Duplicate review, quick search, check-in, queue board, least privilege |
| Practitioner | Document care accurately with low friction | Draft/sign/amend workflow, assignment checks, immutable signed record |
| Clinic owner/finance | Operate multiple facilities and reconcile money | Scoped dashboard, billing intent lifecycle, provider events, refunds, ERPNext outbox |

The core journey is discovery or receptionist-assisted registration → patient/dependent selection → service and provider availability → booking with idempotency → check-in and queue ticket → encounter draft/sign/amend → billing intent → authenticated payment event/reconciliation → permitted receipt/refund state → follow-up notification. Every transition is server-authoritative and every sensitive write is scoped and auditable.

## Competitive gap analysis and prioritization

Scores are a qualitative 1–5 multiplication of business value, user value, market demand, and feasibility. They are prioritization heuristics rather than forecasts.

| Capability | Competitive evidence or pain | Score | Decision |
|---|---|---:|---|
| Patient deduplication and facility scope | Safety and privacy failure if records are merged or leaked | 500 | Must have; existing and protected |
| Family profiles with consent/revocation | Caregivers coordinate family care; consumer booking rarely solves authority | 500 | Must have; existing and protected |
| Booking concurrency and live queue | Medpro sets queue and time-slot expectations | 500 | Must have; existing and protected |
| Billing reconciliation read surface | Finance needs provider event/refund visibility; QR image alone is not settlement | 400 | Must have; implemented in this change |
| VietQR provider adapter and exception workflow | NAPAS is an infrastructure rail, not a complete clinic ledger | 300 | Must have/V1; adapter boundary next |
| Zalo/SMS delivery status and fallback | Mobile and assisted behavior require reliable delivery | 400 | Should have; V1 |
| Cancellation/refund/dispute policy | Trust depends on visible rules and controlled refunds | 300 | Must have; strengthen policy UI next |
| Verified-visit reviews and provider reputation | BookingCare demonstrates discovery/trust demand | 192 | Should have; V1 |
| Inventory lot/expiry and dispense reference | Healthcare ERP operations need traceability | 256 | Should have; V1 through ERPNext |
| FHIR/LIS/PACS/BHYT adapters | Enterprise expansion, but provider-specific complexity is high | 160 | Boundary now, adapters V1/V2 |
| Human-reviewed AI search or note assistance | Competitors expose AI discovery; clinical automation is high risk | 144 | Could have; V2 with governance |
| Open social feed, livestream commerce, automated diagnosis | Low wedge fit, high moderation/medical risk, weak feasibility | ≤48 | Not now |

## Scope and business model

| Priority | Scope |
|---|---|
| **Must Have — MVP** | Tenant/facility RBAC; Vietnamese phone and locale defaults; patient registry and duplicate review; family/dependent consent; service/practitioner catalog; availability and idempotent appointment booking; cancellation/no-show; check-in and queue; encounter draft/sign/amend; VND billing intents; payment webhook verification and replay protection; scoped billing reconciliation; ERPNext outbox/retry/dead-letter; audit/redaction; notification abstraction; operational dashboard; health checks, backups, and tests. |
| **Should Have — V1** | Real VietQR adapter; reconciliation exception UI; Zalo/SMS delivery status and fallback; patient portal; verified reviews; recurring appointments; voucher quotas and campaign guardrails; inventory lot/expiry; e-invoice adapter; offline-safe reception draft; English locale; FHIR export; operational BI. |
| **Could Have — V2/Future** | Teleconsultation with consent and recording policy; LIS/PACS; BHYT workflow; OCR; voice-to-note; human-reviewed AI summary; predictive no-show; care plans; home care; partner fulfillment; multi-region rollout. |
| **Not Now** | Full inpatient/ICU/OR replacement; open social network; livestream shopping; automated diagnosis or prescription; crypto/BNPL; automatic patient merge; PHI ad targeting; premature microservice splitting. |

The recommended model is B2B SaaS priced per active facility per month, with implementation and support packages. Add-ons may cover message volume, payment integration, e-invoice, analytics, LIS/PACS, and managed integration. Patient data must not be sold or used for advertising. Referral ranking, if introduced later, must be disclosed and must not distort clinical suitability.

## Roles, permissions, and marketplace rules

The server enforces tenant and facility scope for every sensitive read and write. Platform administrators operate cross-tenant controls; tenant administrators manage one tenant; facility administrators manage a facility; receptionists register, book, check in, and manage queue; nurses coordinate intake; practitioners create/sign/amend assigned clinical records; finance manages billing/refunds/reconciliation; integration operators manage ERPNext and provider adapters; auditors receive read-only redacted access. Break-glass access, high-value refunds, and sensitive amendments require explicit audit and optional dual control.

Only verified facilities and practitioners may be listed. Availability must represent real slots. Prices, surcharges, refund rules, sponsored placement, and provider status must be visible before confirmation. Reviews require a verified completed visit. Medical claims require professional approval. No automatic patient merge is permitted.

## Architecture and operational design

The repository should stay a **modular monolith at the product boundary**. Modules are identity/scope, patient, family consent, booking/queue, clinical, billing/payment, notification, ERPNext sync, audit, reporting, and provider adapters. Existing Prisma/PostgreSQL-backed transactional models remain the source of truth for healthcare orchestration; ERPNext remains authoritative for ERP/accounting/inventory records. Redis is reserved for rate limiting, short-lived locks, and cache. Queue workers handle ERPNext sync, notification delivery, reconciliation, and retries. Object storage is restricted to controlled or non-PHI media, with encryption and retention policy. PostgreSQL indexes are preferred before a separate search cluster.

Authentication uses short-lived access tokens, refresh rotation, OTP or configured identity providers, and server-side RBAC. Webhooks require HMAC signatures, timestamps, event deduplication, payload hashes, and monotonic payment transitions. Logs redact phone numbers, tokens, and clinical payloads. Monitoring covers request IDs, error rate, latency, authorization failures, queue depth, payment reconciliation lag, notification delivery, dead letters, backup age, and restore-drill results. CI/CD must run dependency installation, Prisma validation/generation, typecheck, unit/integration tests, production builds, and documentation smoke checks. Migrations are forward-only, backups encrypted, and restore targets explicit.

Legal and compliance are implementation constraints, not claims of certification. The implementation must be reviewed against Vietnam’s current personal-data protection, cybersecurity, electronic medical record, e-invoice, health-insurance, electronic-transaction, and medical-advertising requirements before production. Health data is treated as sensitive: purpose limitation, consent, retention, access logs, encryption, export/deletion policy, incident response, and professional/legal review are required.[4]

## Dependency-aware development plan

| Order | Module | Deliverable and acceptance criteria | Dependencies |
|---:|---|---|---|
| 1 | Identity and scope | Stable 403 on cross-scope access; role matrix; redacted projections; audit event for sensitive access | Auth/UserRoleScope |
| 2 | Patient registry | Vietnamese phone normalization, duplicate candidate response, lifecycle, scoped search; no automatic merge | Identity |
| 3 | Family consent | Create/list/revoke dependent links; self-link and duplicate rejection; active/pending consent; history retained | Identity, patient |
| 4 | Booking and queue | Real availability, idempotency, overlap protection, check-in, queue state machine, live status | Patient |
| 5 | Clinical and billing | Draft/sign/amend; VND billing intents; refund boundaries; monotonic payments; immutable audit | Booking, patient, scope |
| 6 | Reconciliation and adapters | Finance-scoped billing read API; VietQR adapter; event verification/dedup; retry/dead-letter; reconciliation exceptions | Billing, queue, jobs |
| 7 | Notifications and trust | Zalo/SMS/email adapters with delivery states; verified reviews; policy UI; patient portal | Identity, encounter, billing |
| 8 | Growth and operations | Voucher quotas, referrals, BI, inventory lot/expiry, e-invoice | Stable billing and ERPNext boundary |
| 9 | Advanced care | Telehealth, LIS/PACS, BHYT, AI assistance with human review, consent, retention, rollback | Data quality and governance |

For each module, the delivery contract is: implement → unit/integration test → API/security review → fix → refactor → document. Edge cases include duplicate submissions, concurrent booking/check-in, revoked caregiver consent, stale payment events, mismatched amount, replayed webhook, provider timeout, refund overrun, cross-facility identifiers, OTP abuse, and redaction failures.

## Executed implementation in this iteration

Implemented `GET /api/v1/healthcare/billing-intents` in the active backend. The endpoint is restricted to platform/tenant/facility administrators, finance, and auditors; requires explicit `tenantId` and `facilityId`; accepts bounded `status`, `provider`, `from`, `to`, and `take` filters; returns at most 200 records; and includes only operational billing fields plus the last ten payment events and refunds. It does not return full patient names or phone numbers, and it uses the existing tenant/facility scope enforcement.

This fills a real MVP gap: a clinic cannot reconcile VietQR or other provider events operationally if it can only create intents and receive callbacks. The endpoint is intentionally a read surface, not a false claim of direct bank settlement. A real provider adapter and manual exception UI remain the next backlog item.

## Quality gate and metrics

The quality gate requires functional correctness, responsive and mobile behavior for future clients, API contract validity, database integrity, authorization, error handling, performance bounds, edge-case coverage, unit/integration/E2E coverage where applicable, structured logging, monitoring, and documentation. Pilot metrics are booking completion through completed encounter, median wait, no-show rate, duplicate-review rate, payment reconciliation lag, notification delivery, refund SLA, amendment rate, support tickets, authorization failures, and backup restore RTO/RPO.

## Assumptions and risks

The current implementation baseline is the external backend under `external_apps/backend`; generated Prisma client artifacts are not hand-edited. No live payment credentials are assumed, so the adapter remains configuration-driven. Legal references are direction-setting and require counsel and provider-specific review. The repository contains historical and auxiliary applications; this iteration deliberately changes only the active healthcare boundary and its tests to reduce regression risk.

## References

[1]: https://medpro.vn/ "Medpro official platform"
[2]: https://bookingcare.vn/ "BookingCare official platform"
[3]: https://napas.com.vn/dich-vu-thanh-toan-bang-ma-qr "NAPAS — Dịch vụ thanh toán bằng mã QR"
[4]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Bộ Y tế — văn bản pháp lý về bệnh án điện tử"
