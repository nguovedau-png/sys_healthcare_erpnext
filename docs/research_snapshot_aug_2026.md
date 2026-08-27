# Research Snapshot — August 2026

## Validated market and platform findings

ERPNext's former Healthcare module is now documented as the separate open-source Marley Health app, installable alongside ERPNext. Its documented scope includes patient demographics/history, practitioners, appointments, encounters and consultations, clinical records, prescriptions/observations, laboratory tests/procedures, inpatient care, and billing through ERPNext Sales Invoices. This supports keeping CRM, ERP, HR and Accounting owned by ERPNext while the custom layer owns Vietnamese healthcare UX, orchestration, facility context, mobile workflows, and sync metadata.

A 2025 assessment of five Vietnamese public hospitals found HIS, LIS and RIS-PACS in all five hospitals, while EMR/CDR/CDSS maturity was uneven. No hospital reported sharing clinical data with other organizations using HL7 CDA/CCD, and four of five reported DICOM adoption in RIS-PACS. The implication is to prioritize dependable operational workflows and interoperability boundaries rather than claim full EMR or autonomous clinical decision support.

A 2022 scoping review found Vietnamese digital-health policy and implementation concerns spanning HIS, EMR/EHR, laboratory systems, cybersecurity, health-insurance claims, standards, and interoperability. It specifically notes the importance of local implementation context, mobile/cloud options, and standards such as HL7 FHIR.

FLEX|Clinic's current product positioning confirms competitive expectations in Vietnam: patient intake, scheduling/coordination, consultation and EMR, prescriptions, lab/PACS connectivity, pharmacy/inventory, billing, patient portal, role-based access, audit logs, multi-branch operation, reporting, e-invoicing, payment, insurance, and implementation/data migration support. The repository's differentiation should be ERPNext-native finance/HR/CRM, Vietnamese workflow UX, modularity, auditability, mobile access, and explicit integration contracts.

## Product implications

The reliable core must cover tenant/facility scope, identity and RBAC, patient matching and consent, practitioner/department schedules, appointment lifecycle, encounters and signed clinical records, prescriptions/orders, invoice/payment status through ERPNext, sync jobs with idempotency/retries/dead-letter/replay visibility, audit logs, web front-desk/clinical/admin views, partner scope, and mobile staff workflows. Must not silently overwrite signed clinical data. Use versioned amendments and explicit conflict handling.

The first increment should not claim unsupported national insurance submission, full legal EMR certification, or autonomous diagnosis/treatment. Any symptom intake remains an operational triage aid and always requires clinician review.

## References

[1]: https://docs.frappe.io/erpnext/frappe-healthcare — Healthcare Module in ERPNext (updated 2026-07-04).
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ — Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals (JMIR Formative Research, 2025).
[3]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8867296/ — Digital Health Policy and Programs for Hospital Care in Vietnam: Scoping Review (JMIR, 2022).
[4]: https://flexclinic.vn/en/ — FLEX|Clinic product overview and functional scope.

## Competitive comparison

| Segment | Observed market expectation | Implication for this product |
|---|---|---|
| HIS/EMR enterprise | EMR lifecycle, access requests, digital signing, clinical documents, terminology, HL7/DICOM, backup/restore, audit | Preserve signed-record versions, access audit, adapter boundaries, but do not claim certification without validation |
| Cloud clinic platform | Intake, appointment/queue, consultation, e-prescription, LIS/PACS, inventory, billing, insurance, patient app, analytics | Make the front-desk-to-care-to-billing journey fast and Vietnamese-localized |
| Operations layer | Approval workflows, tasks/KPI, document management, asset/equipment, internal communications | ERPNext/HR/ERP ownership can cover these without duplicating clinical logic; expose integrations and operational status |
| CRM layer | 360-degree patient/customer profile, appointment reminders, multi-channel care, campaigns, dashboards | Keep CRM source of truth in ERPNext; custom layer may orchestrate consented reminders and healthcare-specific events |

## Competitive differentiation

The strongest defensible position is not an all-in-one rewrite of HIS. It is a healthcare operations layer with reliable patient-care workflows, Vietnamese multi-facility scope, mobile-first staff UX, ERPNext-native CRM/ERP/HR/Accounting, explicit idempotent synchronization, and auditability. Enterprise EMR capabilities such as legal digital signatures, national claims, full terminology governance, and certification remain gated behind deployment-specific validation.

[5]: https://amis.misa.vn/119673/phan-mem-quan-ly-y-te/ — MISA AMIS, two-layer clinical and operational healthcare management (2026).
[6]: https://fpt-is.com/emr/ — FPT.EMR product overview and capabilities.
[7]: https://myhospital.vn/ — MyHospital cloud HIS/EMR/CRM/HR and pricing overview.
[8]: https://cloudgo.vn/phan-mem-quan-ly-phong-kham — CloudGO clinic-management comparison and feature overview.
