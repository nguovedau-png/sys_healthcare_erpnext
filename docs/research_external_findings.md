# External research findings

## Validated on 2026-08-27

MyHospital publicly positions a cloud HIS/ERP for hospitals and clinics spanning reception, outpatient and inpatient care, EMR, LIS/PACS, pharmacy and medical supplies, fees/BHYT, assets, CRM and AI-assisted clinical support. Its patient-facing channel includes result lookup, medication reminders and follow-up reminders. This reinforces the need for both facility operations and low-friction patient self-service, while AI must remain advisory.

Frappe documents webhooks as user-defined HTTP callbacks triggered by selected DocType events. A webhook can be configured with a DocType, event, conditions, URL, method and headers. Frappe supports an optional webhook secret and sends `X-Frappe-Webhook-Signature`, an HMAC-SHA256 signature encoded as base64. This supports a signed inbound webhook endpoint with replay protection and idempotent event handling in the healthcare platform.

## Sources

[1]: https://myhospital.vn/ — MyHospital: Phần mềm quản lý bệnh viện & phòng khám (HIS)
[2]: https://docs.frappe.io/framework/user/en/guides/integration/webhooks — Frappe Framework: Webhooks
[3]: https://bookingcare.vn/ — BookingCare
[4]: https://medpro.vn/ — Medpro
[5]: https://docs.frappe.io/erpnext/frappe-healthcare — ERPNext Healthcare documentation
