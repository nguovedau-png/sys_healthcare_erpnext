# Research agent notes — 2026-08-28

## Repository baseline

- Repository: `nguovedau-png/sys_healthcare_erpnext`, branch `main`, clean at clone time.
- Existing product boundary and architecture docs describe a Vietnamese healthcare operations layer around ERPNext. ERPNext is the system of record for CRM, ERP, HR and Accounting; healthcare-owned data stays in the healthcare layer with external references.
- Existing stack in `external_apps`: Node/TypeScript Express backend with Prisma, BullMQ, Redis, Socket.IO, JWT/OIDC, rate limiting, Swagger, and separate web-admin, web-public and Expo mobile applications. Existing tests cover auth, health, departments, employees, users, plus Playwright suites.
- Existing docs already define tenant/facility authorization, patient registration/matching, appointment lifecycle, encounter signing/amendment, typed ERPNext adapter, idempotent retry/dead-letter sync, audit logs, Vietnamese timezone/phone normalization and mobile mutation safety as Must-have.

## Market findings

- FLEX|Clinic positions itself as a cloud clinic-management platform for Vietnamese general and specialty clinics, covering patient intake, appointments, EMR, LIS/PACS connectivity, patient portal, pharmacy inventory, billing, e-invoicing, insurance, marketing and reports. It explicitly markets multi-facility support and workflows from reception through consultation, prescribing, inventory and revenue reporting.
- The observed competitor pattern indicates the product must compete on end-to-end outpatient operations, not only appointment CRUD: reception/coordination, clinical consultation, ancillary services, pharmacy/warehouse, billing and reporting are expected categories.
- A cited 2025 peer-reviewed study on digital health adoption in five Vietnamese hospitals is relevant for validating implementation barriers and EMR adoption context, but the browser route encountered a reCAPTCHA page; use the existing repository citation and seek an accessible authoritative source before relying on detailed claims.

## Source URLs

1. https://flexclinic.vn/en/
2. https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/
3. https://docs.frappe.io/erpnext/frappe-healthcare
4. https://fpt-is.com/emr/
5. https://myhospital.vn/
6. https://cloudgo.vn/phan-mem-quan-ly-phong-kham
