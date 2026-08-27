# Market and platform research snapshot

## Evidence captured

1. A 2025 peer-reviewed assessment of five Vietnamese public hospitals reports that HIS, LIS and RIS-PACS were implemented in all five hospitals, while EMR and secondary-use capabilities such as clinical data repositories and clinical decision support were less consistently deployed. It also reports no hospital sharing clinical data with another organization through HL7 CCD/CDA in the assessed sample, while DICOM adoption in RIS-PACS was common. Source: [JMIR Formative Research](https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/).
2. The official ERPNext healthcare page positions ERPNext for hospitals, clinics and dispensaries and describes appointment management, patient files, OPD/IPD, laboratory, pharmacy, HR/payroll, accounting, assets, support, roles/permissions, API-first integration and mobile-friendly access. Source: [Frappe ERPNext for healthcare](https://frappe.io/erpnext/for-healthcare).
3. The repository baseline already defines ERPNext as the source of truth for CRM, ERP, HR and accounting master/transaction data, while healthcare-specific orchestration, patient-facing UX, scheduling, sync state and audit metadata remain in the healthcare platform. Source: `docs/product_specification.md`.

## Product implications

The initial production slice should prioritize reliable HIS-adjacent operational workflows around patient identity, appointment/queue, encounter and orders, while keeping CRM/ERP/HR/accounting synchronized into ERPNext rather than reimplementing those ledgers. Interoperability must be designed as an explicit boundary with FHIR/HL7-compatible export and DICOM/PACS links staged after the reliable core. Because the evidence sample is limited to five hospitals, market conclusions are directional rather than a market-size estimate.
