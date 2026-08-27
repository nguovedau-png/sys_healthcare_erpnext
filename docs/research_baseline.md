# Healthcare ERP Vietnam — Research & Repository Baseline

## Repository audit

Repository: `nguovedau-png/sys_healthcare_erpnext`, branch `main`, initial commit only, clean working tree at audit time.

The repository is primarily a Frappe/ERPNext bench containing the standard ERPNext, HRMS, payments and several custom apps. It also contains `internal_apps/sys_healcare_system` with a Node/TypeScript backend, multiple web applications (`web-admin`, `web-partner`, `web-public`, `web-test`), mobile applications (`mobile-admin`, `mobile-partner`, `mobile-test`, `doppio_mobile`), a socket service, and Docker Compose infrastructure with PostgreSQL, Redis, RabbitMQ and Elasticsearch. The installed apps list includes `frappe`, `erpnext`, `hrms`, `payments`, `booking`, `lms`, `webshop`, `doppio`, `lives`, `lmpharma`, `scope_app`, `expense_tracker`, and `gamemarketing`.

The initial implementation has substantial surface area but lacks an explicit product-level requirements document, a consolidated healthcare domain model, a clear ERPNext synchronization contract, and a single source of truth for the web/mobile/backend architecture. There are many setup/seed/debug scripts, so changes must be incremental and avoid broad rewrites until ownership and runtime paths are verified.

## Research findings

A 2025 cross-sectional assessment of five Vietnamese public hospitals reports that HIS, LIS and RIS-PACS were present in all five hospitals, but maturity varied; EMR, clinical data repositories and clinical decision support were less common. No assessed hospital reported sharing clinical data with other organizations using HL7 CDA/CCD, although some systems adopted standards, and DICOM adoption was widespread for RIS-PACS. This supports a product strategy that starts with reliable operational workflows and interoperability boundaries rather than claiming advanced AI/EMR completeness.

Vietnam's digital-health policy literature identifies HL7 messaging, DICOM, SDMX-HD and ICD-10-CM as important or mandatory standards in the national context, while HL7 CDA/CCD, WHO ATC and LOINC are recommended. The policy landscape also emphasizes HIS, EMR/EHR, LIS, RIS-PACS, security, health-insurance claims, national terminology and a unique lifetime health identifier. The product should therefore preserve immutable clinical audit history, support code catalogs and keep adapters separate from core business services.

Current ERPNext documentation states that the former Healthcare module has been separated into Marley Health, which can be installed alongside ERPNext. The documented healthcare scope includes patient demographics and history, practitioners, appointments and scheduling, patient encounters, prescriptions/observations, laboratory tests and procedures, inpatient care, and billing through ERPNext Sales Invoices. The canonical lifecycle is patient registration → appointment → encounter → prescription/investigation → billing → follow-up. Therefore CRM, ERP, HR and Accounting should remain ERPNext-owned capabilities, while the custom healthcare product should provide Vietnamese workflow UX, integration orchestration, mobile access, operational extensions and controlled synchronization.

FPT IS positions FPT.EMR around paperless records, patient treatment history and facility management, citing Vietnamese EMR mandates and the operational burden of paper records. Competitive differentiation should focus on implementation speed for clinics and healthcare groups, Vietnamese localization, mobile-first staff workflows, ERPNext-native finance/HR/CRM, auditability, and API-based interoperability rather than duplicating a large hospital EMR suite immediately.

## Initial product implications

The first production scope should prioritize: tenant/facility and organization context; identity and role-based access; patient master and consent/contact data; practitioner and department schedules; appointment lifecycle; encounter and clinical notes; prescriptions and orders; invoice/payment status via ERPNext; inventory/product references via ERPNext; staff/HR references via ERPNext; sync jobs, idempotency, retries, dead-letter handling and audit logs; web admin/front desk/clinical views; partner portal; mobile staff workflows; observability and automated tests.

Explicit non-goals for the first increment are unsupported national claims submission, full EMR certification, autonomous clinical decision support, and replacing every ERPNext standard screen. These require formal external validation, environment access and operational data that cannot be inferred safely from the repository alone.

## References

[1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ — Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals (JMIR Formative Research, 2025).
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8867296/ — Digital Health Policy and Programs for Hospital Care in Vietnam: Scoping Review (JMIR, 2022).
[3]: https://docs.frappe.io/erpnext/frappe-healthcare — Healthcare Module in ERPNext documentation.
[4]: https://fpt-is.com/en/emr/ — FPT IS FPT.EMR product overview.


## Follow-up research — August 2026

Recent sources reinforce that the next product gaps are interoperability and privacy-by-design rather than duplicating ERPNext finance/HR/accounting. Vietnamese digital-health studies identify fragmented hospital systems and recommend standards such as HL7 FHIR for exchange; the product should therefore maintain canonical healthcare records locally while mapping ERPNext-owned CRM/ERP/HR/Accounting documents through explicit adapters. Health data must be treated as sensitive personal data: production deployment requires least-privilege access, auditable exports, consent/retention controls, secret-manager storage and a documented incident/replay process.

The implementation priority remains: (1) secure tenant/facility authorization and auditability, (2) idempotent ERPNext synchronization with retry and dead-letter/replay visibility, (3) Vietnamese localization for patient identity, phone/address, appointment and invoice workflows, and (4) FHIR-compatible boundary models without forcing a full FHIR server into the current milestone.
