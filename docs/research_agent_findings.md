# Research findings captured during implementation

## Vietnam digital health adoption

The 2025 JMIR study *Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals* reports that HIS, LIS and RIS-PACS were implemented in all five assessed public hospitals, but with varied maturity. EMR and advanced capabilities such as clinical data repositories and clinical decision support were less consistently implemented. The study reports that none of the five hospitals shared clinical data with other organizations using HL7 document standards, although two reported adopting those standards; four reported DICOM adoption for RIS-PACS. The practical implication for this product is to prioritize reliable administrative/clinical workflow integration and a standards-ready boundary rather than assuming mature interoperability.

The 2022 JMIR scoping review on digital-health policy and hospital programs in Vietnam maps regulations and guidance covering hospital information management systems, interoperability standards, cybersecurity, electronic health insurance claims, laboratory information systems, HIT maturity, digital-health strategy, electronic medical records and eHealth architecture. It also highlights implementation constraints in resource-constrained settings, including funding, infrastructure, staff computer literacy and the importance of local regulatory context.

## Sources

[1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ "Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals: Cross-Sectional Assessment"
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8867296/ "Digital Health Policy and Programs for Hospital Care in Vietnam: Scoping Review"
[3]: https://frappe.io/erpnext/for-healthcare "ERPNext for healthcare"

## Competitor and workflow observations

YouMed's 2023/2025-updated overview describes recurring pain points for Vietnamese outpatient clinics: electronic prescribing, patient-record management, patient interaction/follow-up, accuracy across handoffs, time/cost control, medical-device connectivity and privacy/security. This supports a product strategy that treats the patient journey and operational queue as first-class workflows, while keeping accounting/HR/CRM in ERPNext.

The official ERPNext healthcare landing page positions ERPNext as an open-source ERP with healthcare capability and links to accounting, CRM, stock, HR/payroll and healthcare modules. In this repository, that supports the explicit ownership boundary: ERPNext remains the canonical system for CRM, ERP, HR and accounting; the healthcare layer owns patient-facing booking, queue, clinical orchestration, sync state and audit context.

## Sources

[4]: https://youmed.vn/tin-tuc/top-5-phan-mem-quan-ly-phong-kham-chat-luong/ "Top 5 phần mềm quản lý phòng khám chất lượng"
[5]: https://frappe.io/erpnext/for-healthcare "Open Source ERP Software for Healthcare Industry | ERPNext"
