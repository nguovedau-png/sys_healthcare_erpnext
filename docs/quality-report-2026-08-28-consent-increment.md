# Quality Report — Consent and Queue Reliability Increment

**Date:** 28 August 2026  
**Repository:** `nguovedau-png/sys_healthcare_erpnext`  
**Scope:** Vietnamese outpatient healthcare operating layer around ERPNext

## Delivered outcome

This increment closes a high-value gap identified by the Vietnamese market research: purpose-bound patient-data consent was present in the product model but not accessible through the API or operations UI. Staff can now list consent history within a facility, capture a new active consent with legal-basis and policy-version metadata, replace an earlier active consent atomically, and withdraw consent without deleting history. The admin operations page exposes a Vietnamese responsive consent table and capture modal with expiry visibility and withdrawal actions.

The queue check-in path was also hardened. Ticket-number selection now occurs inside the transaction, and unique-key races retry before returning a stable idempotent result. A PostgreSQL partial unique index enforces at most one active consent per patient, facility, and purpose while preserving withdrawn versions. An adjacent request-parsing defect in family-link creation was fixed and covered at the API boundary.

## Research-driven rationale

The product remains an outpatient operating system rather than a broad Vietnamese healthcare super-app. Evidence from Vietnamese hospital adoption research shows uneven EMR maturity and limited external HL7 exchange despite widespread HIS/LIS/RIS-PACS usage, supporting a modular integration boundary rather than a replacement HIS. Local platforms show that Vietnamese users expect mobile booking, family booking, online payment, results and prescriptions, reminders, communication, and trusted provider signals. The immediate differentiation is therefore safe post-booking operations—queue, encounter signing, consent, payment reconciliation, and ERPNext reliability—while patient portal, notification adapters, verified reviews, search, and AI remain staged backlog items.

## Changed files

| Area | File(s) | Change |
|---|---|---|
| Consent validation | `external_apps/backend/src/modules/healthcare/healthcare.validation.ts` | Strict parser with bounded purpose, legal basis, policy version, status, expiry, and transport scope fields |
| Consent domain | `external_apps/backend/src/modules/healthcare/healthcare.service.ts` | Scoped list/capture/withdraw methods; atomic version replacement; idempotent withdrawal; stable conflict handling |
| Consent API | `external_apps/backend/src/modules/healthcare/healthcare.controller.ts`, `healthcare.routes.ts` | Authenticated list, capture, and withdrawal endpoints |
| Queue reliability | `healthcare.service.ts` | Transactional ticket allocation with retry-safe unique-key handling |
| Database invariant | `external_apps/backend/prisma/migrations/20260828083000_add_active_consent_guard/migration.sql` | Partial unique index for one active consent per purpose scope |
| Admin UX | `external_apps/web-admin/src/modules/healthcare/pages/Operations.tsx` | Vietnamese consent search, history table, capture modal, expiry/status display, withdrawal action |
| Regression tests | `external_apps/backend/tests/healthcare.advanced.test.ts`, `healthcare.api.test.ts` | Consent validation/service/API coverage and family-link API regression coverage |
| Product/engineering docs | `docs/research_market-driven-2026-08-28.md`, `docs/development-plan-vietnam-outpatient-2026.md` | Evidence, prioritization, module contract, and implementation record |

## Quality evidence

| Check | Result |
|---|---|
| Backend TypeScript typecheck | Passed |
| Prisma schema validation with placeholder PostgreSQL URL | Passed |
| Backend production compile | Passed |
| Focused healthcare service/API tests | Passed: 28 tests |
| Full backend suite in the final 100-loop run | Passed: 8 suites, 53 tests at each substantive checkpoint |
| Requested automated quality loop | Passed: 100 iterations; substantive checks at 10, 20, …, 100 |
| Modified admin page ESLint | Passed |
| Admin production build | Passed |
| Public web production build | Passed |
| Mobile build | Not run: package has no `build` script; native validation requires Expo/Detox device or simulator configuration |
| Whole-admin ESLint | Not green due pre-existing repository baseline: 132 findings, primarily `no-explicit-any` and unused variables outside the modified healthcare page |
| Dependency audit | Existing install reports vulnerabilities: backend 9 (8 moderate, 1 high), admin 21 (1 low, 4 moderate, 16 high); remediation requires a separate dependency-upgrade task and compatibility review |

## Release and compliance notes

This report does not declare legal compliance. Before production with real patient data, the facility and counsel must map the current Vietnamese personal-data, medical-examination, electronic-record, electronic-invoice, payment, and advertising requirements to the deployment. The consent UI records purpose and policy metadata, but patient-facing consent text, evidence of presentation/acceptance, data-subject export/deletion workflows, retention jobs, and provider-specific notification adapters remain V1 work.

The new partial index migration must be applied through the normal Prisma migration process against a backup-protected environment. Existing data must be checked for duplicate active consents before migration; if duplicates exist, an operator must resolve them according to the facility's policy rather than silently deleting records. The migration is PostgreSQL-specific, consistent with the backend schema provider.

## Next prioritized backlog

The next highest-value slice is notification delivery and reminder state: channel preferences, template versions, quiet hours, provider message IDs, retry/dead-letter, opt-out, and Vietnamese timezone handling. It should be followed by patient/dependent self-service, verified review moderation, search projections, QR/payment-provider adapters, and operational analytics. AI should remain administrative and human-reviewed; autonomous diagnosis or prescribing is explicitly not planned.

## References

[1]: https://formative.jmir.org/2025/1/e53483/ "Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals: Cross-Sectional Assessment"
[2]: https://play.google.com/store/apps/details?id=com.youmed.info&hl=en_GB "YouMed — Google Play listing"
[3]: https://www.docosan.com/en/for-providers "Docosan for providers"
[4]: https://openknowledge.worldbank.org/server/api/core/bitstreams/97fbe6ec-18d3-48ba-a70b-38814b199334/content "Review of Telemedicine Business Models in Vietnam"
