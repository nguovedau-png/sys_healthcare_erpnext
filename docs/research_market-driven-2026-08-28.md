# Vietnamese Healthcare Product Research — 2026-08-28

## Evidence summary

The repository already targets an outpatient operations layer around ERPNext rather than a full hospital information system. The external evidence supports keeping that boundary: five Vietnamese public hospitals in a 2025 peer-reviewed assessment had HIS, LIS, and RIS-PACS, but EMR maturity was uneven; two hospitals had no EMR or additional digital capability, no hospital reported sharing clinical data externally with HL7 CDA/CCD, while four of five reported DICOM adoption. This indicates that interoperability boundaries and low-friction workflows are more valuable near term than attempting to replace every hospital subsystem.[1]

Vietnamese consumer platforms show a clear expectation for mobile-first access, appointment booking, family booking, online payment, queue or visit registration, result and prescription delivery, reminders, chat/video consultation, and trusted health content. YouMed's Google Play listing reports 100k+ downloads and describes booking and online payment, booking for relatives, test results and prescriptions, appointment and medication reminders, chat/video consultation, and search by doctor, clinic, specialty, or symptom. Its 3.3 rating and a review describing booking getting stuck are a useful signal that reliability and explainable failure states are differentiators, not merely polish.[2]

Docosan's provider product describes the competing B2B/B2C bundle: online clinic and doctor discovery, verified licensed facilities, pre-listed prices, appointment scheduling, automated reminders, patient communication, online consultation, patient-record storage, clinic profiles, promotions, and provider mobile/web access. The provider value proposition is therefore both operational software and demand generation. A healthcare ERP layer should not blindly become an open marketplace, but it must support referral/discovery, verified provider profiles, price transparency, and campaign attribution as controlled later-stage capabilities.[3]

The World Bank review of Vietnamese telemedicine business models describes appointment scheduling, medical advice, prescriptions/referrals, provider booking management, promotions, and compliant health education/reminder messages as recurring platform patterns. Telemedicine should therefore be treated as a governed clinical workflow with consent, identity, documentation, payment, and follow-up—not as an isolated video feature.[4]

## Product implications

| Finding | Product decision | Priority |
|---|---|---|
| Adoption is uneven and integration maturity varies | Keep a modular outpatient core with typed ERPNext integration, outbox/retry, reconciliation, and standards-ready export boundaries | Must have |
| Vietnamese users expect family booking and mobile self-service | Add family/dependent profiles, caregiver consent, patient portal, reminders, result/prescription access, and receptionist-assisted fallback | MVP/V1 |
| Competitors combine operations, acquisition, and communication | Add provider profile, verified status, price/service catalog, campaign attribution, and a notification abstraction without turning on open marketplace ranking initially | V1 |
| Booking failures damage trust | Use transactional slot reservation, idempotency, clear stale/overlap errors, retry-safe payment, and visible appointment/queue status | Must have |
| Users value results and medication reminders | Model order/result/prescription references and notification preferences with consent and delivery status | MVP/V1 |
| Telemedicine has legal and clinical governance implications | Add a future teleconsult boundary with consent, identity, practitioner assignment, clinical note, payment, recording policy, and escalation | V2 |
| Healthcare data is sensitive | Purpose-bound consent, least privilege, tenant/facility scope, immutable audit, redacted logs, encrypted backups, retention rules, export/delete workflows, and legal review before launch | Must have |
| Trust is a market feature | Verified facilities/practitioners, paid-visit reviews only, moderation, dispute SLA, transparent pricing, and no health-claim advertising | MVP/V1 |
| AI can improve staff productivity but must not diagnose autonomously | Start with administrative summarization, triage completeness checks, no-show prediction, and human-reviewed note drafting; do not automate diagnosis or prescribing | V2 |

## Competitive gap hypotheses

The strongest defensible position is a Vietnamese clinic operating system that combines ERPNext financial/ERP control with trustworthy patient operations: real-time availability, queue/check-in, clinical signing and amendments, consent/audit, reliable notifications, payment reconciliation, and multi-branch scope. Consumer marketplaces already own discovery and content; generic HIS products commonly own broad hospital functionality. The gap is an integration-safe, outpatient-first workflow that is usable by receptionists and practitioners while remaining auditable and expandable.

The repository's existing blueprint already captures important safety rules: duplicate-patient review instead of automatic merge; appointment state machines; signed clinical records requiring versioned amendments; idempotent billing intents; webhook verification and deduplication; deny-by-default authorization; and redacted PII/PHI logs. The next implementation emphasis should therefore be on product completeness around the operational loop—queue, notifications, patient/family experience, billing/reconciliation visibility, provider verification, and dashboards—rather than duplicating already-designed primitives.

## Compliance and risk guardrails

The product should be positioned as implementation-ready, not declared legally compliant by code alone. Vietnam's personal-data regime, medical-examination and treatment rules, electronic medical-record guidance, electronic invoicing, payment-provider rules, advertising rules, and any 2025/2026 amendments require deployment-time legal and clinical review. Health data should be treated as sensitive by design. Key abuse cases are fake bookings/no-shows, voucher abuse, account takeover, forged webhooks, duplicate refunds, clinical-record tampering, privilege creep, and PII leakage through logs or exports. Controls include OTP/rate limits, anomaly detection, dual control for high-value refunds and break-glass access, HMAC/timestamp/event deduplication, immutable audit, and periodic access review.

## References

[1]: https://formative.jmir.org/2025/1/e53483/ "Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals: Cross-Sectional Assessment"
[2]: https://play.google.com/store/apps/details?id=com.youmed.info&hl=en_GB "YouMed — Google Play listing"
[3]: https://www.docosan.com/en/for-providers "Docosan for providers"
[4]: https://openknowledge.worldbank.org/server/api/core/bitstreams/97fbe6ec-18d3-48ba-a70b-38814b199334/content "Review of Telemedicine Business Models in Vietnam"
[5]: https://medpro.vn/ "Medpro"
[6]: https://bookingcare.vn/ "BookingCare"
[7]: https://myhospital.vn/ "MyHospital"
[8]: https://benhandientu.moh.gov.vn/van-ban-phap-ly-co-hieu-luc "Vietnam Ministry of Health electronic medical record legal documents"
