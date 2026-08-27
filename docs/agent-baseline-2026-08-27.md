# Agent baseline — 2026-08-27

## Repository

Repository `nguovedau-png/sys_healthcare_erpnext` is a monorepo on branch `main`, currently clean at commit `5b9d7f5` (`feat(healthcare): harden ERPNext integration boundary`). It contains an existing healthcare platform under `internal_apps/sys_healcare_system`, with a NestJS backend, multiple Next.js web clients (`web-admin`, `web-partner`, `web-public`), Expo/React Native clients (`mobile-admin`, `mobile-partner`), and a Socket.IO backend.

The backend has separate Prisma schemas for authentication, users, booking, ERP, partner, finance, reporting, notifications, jobs, audit, and other modules. The ERP schema already includes `SyncOperation`, `ExternalReference`, `WebhookReceipt`, `ConsentRecord`, and `AuditEvent`. Existing repository documents describe ERPNext as the source of truth for CRM, ERP, HR, and accounting, while healthcare-specific scheduling, patient experience, clinical orchestration, sync state, and audit stay in the healthcare platform.

Existing audit documentation reports 4 backend suites / 14 tests passed, Nest production compile passed, booking and Vietnamese phone regressions passed, and ERPNext response-envelope, headers, and URL validation tests passed. It also records unresolved web-partner type errors, a resource-limited Next build, dependency vulnerabilities, and missing full browser/mobile E2E, webhook verification, migration/restore drills, and production go-live validation.

## External research

A 2025 JMIR study of five major Vietnamese public hospitals reports that HIS, LIS, and RIS-PACS were present in all five hospitals at varying maturity, while EMR adoption and secondary capabilities such as clinical data repositories and clinical decision support were less complete. It also reports no hospital sharing clinical data with other organizations using HL7 documents, although some systems had adopted standards, and 80% reported DICOM adoption. Product implication: interoperability, staged digital maturity, local workflow fit, security, and migration from existing HIS/EMR are more important than an all-at-once replacement pitch.

Frappe's healthcare materials publicly describe ERPNext/Frappe Health capabilities covering appointments, patient records, encounters, vitals, medication and investigation orders, lab workflows, pharmacy inventory, HR/payroll, accounting, purchasing, assets, permissions, dashboards, and API-first integration. Product implication: the healthcare platform should not duplicate ERPNext CRM/ERP/HR/accounting ledgers; it should provide a Vietnamese, role-specific operating layer and synchronize typed, idempotent records into ERPNext.

Public Vietnamese market search results identify enterprise HIS competitors and categories including FPT.eHospital, VNPT HIS, Viettel HIS, CMC/iHIS, Med.HIS, HSOFT, and patient-access platforms such as Medpro. Benchmark dimensions are appointment access, HIS/EMR depth, LIS/RIS-PACS interoperability, pharmacy/inventory, insurance/claims connectivity, multi-branch operations, Vietnamese compliance, patient engagement, and total implementation effort.

## Current architectural risks

ERPNext connector credentials are not present in the current session configuration. Implementation can still harden the connector, contracts, mocks, replay/reconciliation workflows, and tests, but live ERPNext verification requires a configured endpoint and least-privilege credentials. No connector should be created without user-provided credentials.

The next work should validate actual source behavior and tests, then close the documented go-live gaps in priority order: web type/build failures, API authorization and tenant/facility scoping, sync idempotency/conflict/dead-letter handling, webhook verification and ordering, migration/restore reproducibility, and full browser/mobile E2E coverage.

## Competitor observations

The official VNPT HIS page positions the product as a comprehensive hospital and primary-care information system spanning hospital workflows, local health facilities, management reporting, remote access for clinicians, patient online records and booking, and an integrated healthcare ecosystem. This confirms that domestic enterprise competitors compete on breadth, public-sector deployment, multi-level reporting, and implementation services rather than on a narrow appointment app.

Medpro's public patient-facing site emphasizes a marketplace/access layer: searchable healthcare providers, online booking, queue/order support, teleconsultation, test booking, after-hours booking, corporate health checks, and a multi-channel hotline. The product visibly connects patients with many hospitals and clinics, so the differentiating opportunity for this repository is the facility operating system behind the patient experience: reliable scheduling, clinical workflow, ERPNext-backed finance/inventory/HR, and reconciliation.

## Regulatory observations

The Ministry of Health electronic medical record portal publicly lists Circular 54/2017/TT-BYT on IT application criteria, Circular 46/2018/TT-BYT on establishing, using, and managing electronic medical records, and Decision 326/QD-BYT dated 2024-02-07 on information security and cybersecurity governance. The same portal displayed 1,264 participating healthcare facilities at the time of access (2026-08-28 local display). These sources support treating EMR governance, immutable auditability, access control, retention, security incident response, and facility-specific validation as go-live gates rather than optional polish.

References: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ ; https://frappe.io/erpnext/for-healthcare ; https://frappehealth.com/docs/v13/user/manual/en/healthcare/introduction ; https://vnpt.vn/doanh-nghiep/san-pham-dich-vu/dich-vu-phan-mem-quan-ly-benh-vien-vnpt-his/ ; https://medpro.vn/ ; https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc
