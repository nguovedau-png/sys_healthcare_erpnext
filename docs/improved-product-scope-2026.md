# Improved Product Scope — Vietnam Outpatient Operations Platform

**Date:** 28 August 2026  
**Author:** Manus AI  
**Product boundary:** A Vietnamese, multi-facility outpatient operating layer around ERPNext. ERPNext remains the source of truth for finance, accounting, HR, inventory, and mapped master data; this platform owns patient experience, appointment orchestration, queue, clinical workflow coordination, integration state, consent, and audit.

> This is a product and engineering decision document, not legal advice. A Vietnamese healthcare counsel and the facility's compliance officer must validate the deployment before real patient data is processed.

## Executive decision

The product should not launch as another broad healthcare super-app. The strongest wedge is an **outpatient operating system for private clinics and clinic chains**: reduce booking friction and no-shows, shorten waiting-room uncertainty, preserve safe clinical sign-off, and make ERPNext billing/synchronization reliable. This wedge is supported by Vietnamese marketplace evidence that users value simple find/compare/book journeys [1], by local competitors that already offer multi-channel booking and video consultation [2], and by continued trust, regional logistics, and cashless-payment adoption gaps [3].

The north-star metric is **completed care episodes with a safe, transparent experience**, not raw bookings. The initial ICP is a private outpatient clinic or 2–20-site chain with an existing ERP/HIS/ERPNext footprint and enough appointment volume to feel operational pain, but insufficient engineering capacity to build a patient-facing layer.

## Personas and journeys

| Persona | Job to be done | Product promise | Success metric |
|---|---|---|---|
| Urban patient | Find a suitable service and book quickly | Vietnamese mobile flow, visible price/duration, confirmation and reminders | Median time-to-book; completion rate |
| Family booker | Book for child, parent, or spouse | Dependent profiles, consent and shared reminders | Repeat booking; dependent adoption |
| Receptionist | Register, reschedule, check in, and manage queue | Fast phone search, duplicate candidates, queue controls | Duplicate rate; wait-time variance |
| Practitioner | Complete and sign an encounter safely | Assigned scope, concise templates, immutable sign/amend flow | Signed encounter SLA; amendment quality |
| Clinic manager | Run sites and reconcile money | Facility dashboards, SLA alerts, ERPNext status and DLQ | Reconciliation lag; utilization |
| Integration operator | Recover failures without clinical access | Typed sync operations, retry, replay protection, audit | Failed sync recovery time |
| Compliance auditor | Prove who accessed or changed what | Minimum-necessary access and immutable audit | Audit completeness; incident MTTR |

The primary journey is: discover facility/service, inspect price and cancellation policy, select slot, reserve atomically, authenticate with OTP or existing account, receive booking code, receive reminder, check in, receive queue number, complete triage and encounter, sign clinical record, generate billing intent, reconcile through ERPNext, and receive permitted receipt/instructions. The patient may be a dependent, and the person paying may differ from the patient. A review is allowed only after a completed appointment and enters moderation before publication.

## Business and marketplace model

The commercial model is B2B SaaS per tenant and facility, priced by active provider or appointment volume, with paid add-ons for patient engagement, analytics, storage, and ERPNext integration. Charge onboarding and data migration separately. A marketplace lead fee can be introduced only for completed bookings, must be disclosed, and must not manipulate ranking. Never sell health data or use sensitive clinical data for targeted advertising. Payment processing is pass-through with transparent fees; the platform does not hold card credentials or create a proprietary wallet in the first releases.

Marketplace rules are: only verified facilities and practitioners may publish availability; every trust badge has a source, verification date, expiry, and suspension path; ranking is based on relevance, availability, quality signals, and transparent commercial disclosure; reviews are verified, one per completed episode, moderated for abuse but not suppressed for being negative; clinical claims and livestream content require policy review; providers cannot pay to erase safety signals.

## Scope by priority

| Priority | Included capabilities |
|---|---|
| **Must Have / MVP** | Tenant/facility scope; deny-by-default RBAC; Vietnamese locale and timezone; phone normalization; patient registration with duplicate-review candidate; dependent-ready identity model; appointment availability, atomic slot reservation, overlap prevention, idempotency, lifecycle transitions and no-show/cancel policy; check-in/queue baseline; encounter draft/sign/amend; prescription and lab-order boundary; billing intent and ERPNext correlation; typed ERPNext adapter with outbox/retry/dead-letter; webhook signature/replay/out-of-order handling; consent and access audit; redacted structured logging; rate limits; admin operations; migrations and automated tests. |
| **Should Have / V1** | Patient/dependent portal; OTP adapter; Zalo/SMS/email/push notification adapters; reminders and opt-out; verified review and moderation; search by service, facility, location, price and availability; reschedule/refund/dispute UI; dashboards; inventory expiry alerts; configurable cancellation/no-show policies; encrypted backups and restore drills; responsive web and mobile E2E. |
| **Could Have / V2** | FHIR-compatible export/import boundary; DICOM/PACS links; insurance-claim adapter; referral and partner fulfillment; analytics warehouse; consented recommendation; administrative AI copilot for navigation, summarization and operations; anomaly-assisted fraud queue. |
| **Future / Advanced** | Moderated provider education and livestream; predictive no-show and fraud models; regional expansion; English and additional locales; selective logistics orchestration; partner marketplace. |
| **Not Now** | Autonomous diagnosis or prescribing; open medical-claims marketplace; proprietary wallet; stored card data; unmoderated reviews or livestream; own delivery fleet; a microservice per feature; opaque paid ranking; direct clinical decision support without governance and validation. |

## Gap analysis and competitive strategy

| Competitor class | Existing strength | What the product must match | Deliberate differentiation |
|---|---|---|---|
| Docosan-like marketplace | Search, compare, price, reviews, provider acquisition [1] | Discovery, transparent profiles, verified review | Own the post-booking operating layer and integration reliability |
| Medpro-like network | Multi-channel booking, hotline, facility breadth, video and medical services [2] | Web/app, hotline-friendly operations, reminders, patient records | Multi-tenant clinic-chain controls, queue, clinical sign/amend, ERP reconciliation |
| Jio Health-like integrated care | Telemedicine, home care, e-prescription, clinician tools [4] | Mobile care and remote consultation patterns | Neutral platform for independent facilities, not a single-provider network |
| Hospital HIS/ERP | Internal records, accounting, inventory | Reliable master and financial integration | Better patient UX, consent, discovery, and cross-site orchestration |
| Social commerce/super-apps | Discovery, chat, voucher, livestream | Familiar mobile engagement patterns | Strict moderation, clinical claims policy, verified identity and audit |

The missing essentials in the current repository are not a new feed or more microservices. They are operational completeness and safety: queue/check-in persistence, explicit payment/refund/dispute lifecycle, consent records, webhook receipt dedupe, external-reference mapping, dependent profiles, notification delivery status, verified reviews, search projections, and stronger transactional overlap protection. Existing healthcare service code also needs a safe amendment policy, field-level validation, and tests for tenant leakage, replay, stale writes, and concurrent booking.

## Vietnam-specific requirements

Vietnamese users expect mobile-first flows, phone-number entry, support for a family member booking on behalf of a patient, clear fees and waiting expectations, QR/bank/wallet payment adapters, and fallback pay-at-facility where trust or regional connectivity is weaker. Zalo and hotline-assisted operations should be first-class adapter targets rather than assuming email-only communication. Regional rollout must be explicit: facility timezone, province/district address normalization, local holidays, and degraded connectivity should not break check-in or payment reconciliation.

The product must treat health information as sensitive data. As of 1 January 2026, Law 91/2025/QH15 and Decree 356/2025/ND-CP form the updated personal-data framework, emphasizing purpose limitation, accuracy/correction, proportional retention, and appropriate safeguards [5]. The platform therefore needs consent versioning, purpose/legal-basis capture, correction and restriction workflows, retention policies, data-subject request handling, breach runbooks, server-side authorization, encryption in transit/at rest, and immutable access/change audit. Electronic medical-record and healthcare IT obligations must be validated against the facility's care setting and the current Ministry of Health guidance before production [6].

## AI position

AI is allowed first for administrative search, appointment navigation, translation, summarization of non-diagnostic operational text, and anomaly prioritization. Every AI output must show its purpose, source context, uncertainty where appropriate, and human review state. The existing symptom-intake endpoint remains an operational triage aid only, always requiring clinician review; it must not diagnose, prescribe, or expose a confidence score. Clinical AI, autonomous recommendations, and medical claims are not MVP scope.

## Metrics and release gates

Track booking completion, median time-to-book, no-show rate, duplicate-patient rate, queue wait-time variance, signed-encounter SLA, payment reconciliation lag, refund/dispute resolution time, verified-review rate, failed-sync/dead-letter volume, audit coverage, p95 API latency, and security incident MTTR. A feature is complete only when functional, negative-authorization, data-integrity, concurrency, webhook-replay, responsive/mobile, observability, migration, and documentation checks pass.

## References

[1]: https://innovations.bmj.com/content/7/Suppl_1/s16 "BMJ Innovations — Digital marketplace to improve healthcare access and transparency in Vietnam"
[2]: https://medpro.vn/ "Medpro — Vietnamese healthcare booking platform"
[3]: https://moit.gov.vn/khoa-hoc-va-cong-nghe/thuong-mai-dien-tu-viet-nam-nam-2024-nhung-buoc-tien-va-thach-thuc.html "Vietnam Ministry of Industry and Trade — E-commerce 2024"
[4]: https://www.mobihealthnews.com/news/asia/vietnamese-digital-health-startup-jio-health-nets-20m-in-series-b-round "MobiHealthNews — Jio Health in Vietnam"
[5]: https://www.dlapiperdataprotection.com/?t=law&c=VN "DLA Piper — Data protection laws in Vietnam"
[6]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Vietnam Ministry of Health — Effective legal documents for electronic medical records"
