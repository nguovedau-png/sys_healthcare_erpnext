# Canonical product blueprint

## Product boundary

Đây là lớp vận hành healthcare cho phòng khám và cơ sở y tế đa chi nhánh tại Việt Nam, bao quanh ERPNext. ERPNext là hệ thống nguồn cho CRM, ERP, HR và kế toán; nền tảng healthcare là nguồn cho trải nghiệm bệnh nhân, đăng ký, đặt lịch, hàng đợi, encounter, điều phối lâm sàng, trạng thái đồng bộ và audit. Không nhân bản sổ cái kế toán hoặc HR vào database nghiệp vụ healthcare.

## Primary user flow

Bệnh nhân hoặc lễ tân tạo hồ sơ bằng số điện thoại đã chuẩn hóa và phạm vi cơ sở. Hệ thống tìm trùng, yêu cầu xác nhận khi có ứng viên trùng, rồi phát sinh hoặc liên kết Patient/Customer trong ERPNext. Người dùng chọn dịch vụ, cơ sở, practitioner và slot; hệ thống khóa slot trong transaction, ngăn overlap và phát hành appointment. Lễ tân check-in, điều dưỡng triage, practitioner mở encounter và chỉ được submit khi có practitioner, reason, assessment và signed timestamp. Prescription, lab order và clinical note bị khóa sau ký; sửa sai tạo amendment có lý do và liên kết bản gốc. Billing intent gửi sang ERPNext với idempotency key; invoice/payment/refund hiển thị trạng thái từ ERPNext. Mọi outbound/inbound event có audit, retry, replay và dead-letter.

## Business rules

| Area | Rule | Failure handling |
|---|---|---|
| Identity | Điện thoại được chuẩn hóa; match trong tenant + facility; không ghi identifier đầy đủ vào log | Tạo duplicate-review candidate, không tự động merge |
| Appointment | Slot phải thuộc availability; không overlap cùng practitioner/resource; timezone là timezone cơ sở | 409 khi stale/overlap; retry an toàn nhờ idempotency |
| Lifecycle | `pending → confirmed → checked_in → in_progress → completed`; `cancelled` và `no_show` là terminal | Không cho transition ngược; ghi audit |
| Clinical | Encounter submit bắt buộc practitioner, reason, assessment, signedAt | 422; amendment versioned, không update âm thầm |
| Billing | Chỉ phát hành billing intent một lần theo correlation key; hủy appointment có chính sách reversal rõ ràng | Pending reconciliation nếu ERPNext outage |
| Sync | Unique `(tenantId, sourceSystem, sourceId, idempotencyKey)`; payload hash phải ổn định | Hash khác cùng key → 409; transient error → bounded retry; quá ngưỡng → dead-letter |
| Webhook | Event ID dedupe; kiểm chữ ký và timestamp; xử lý out-of-order theo version/modifiedAt | Duplicate trả thành công idempotent; event cũ không overwrite |
| Access | Deny-by-default, tenant/facility scope, role + field boundary ở server | 401/403; không dựa vào ẩn UI |

## Roles and permissions

| Role | Quyền chính |
|---|---|
| `platform_admin` | Tenant, integration, break-glass và global audit |
| `tenant_admin` | Người dùng và cơ sở trong tenant |
| `facility_admin` | Cấu hình dịch vụ, lịch, vận hành và báo cáo cơ sở |
| `receptionist` | Patient registration, appointment, queue, payment status; không đọc clinical notes |
| `nurse` | Triage, queue và dữ liệu chăm sóc được phân công |
| `practitioner` | Encounter, diagnosis, prescription, orders và ký hồ sơ được phân công |
| `pharmacist` / `lab_technician` | Dispense hoặc specimen/result theo order |
| `finance` / `hr_manager` | Dữ liệu và workflow tương ứng ở ERPNext |
| `integration_operator` | Sync/reconciliation, không đọc clinical data |
| `auditor` | Đọc audit immutable, không mutation |
| `patient` | Chỉ dữ liệu của chính mình và tài liệu được cấp |

## Canonical data model

Healthcare database tối thiểu gồm `Tenant`, `Facility`, `UserRoleScope`, `PatientProjection`, `Appointment`, `Encounter`, `ClinicalAmendment`, `Order`, `BillingIntent`, `ExternalReference`, `SyncOperation`, `WebhookReceipt`, `ConsentRecord` và `AuditEvent`. Các bảng tenant-scoped phải có tenantId và facilityId khi dữ liệu thuộc cơ sở; unique/index phải hỗ trợ idempotency, overlap query, external identity và reconciliation. PII/PHI được mã hóa hoặc tối thiểu redact trong log; soft-delete và retention policy được cấu hình theo loại dữ liệu.

## API contract

Production routes nằm dưới `/api/v1`: patient registration/search, availability, appointment reserve/confirm/check-in/cancel, encounter create/submit/amend, order/dispense/result, billing intent/status, ERPNext upsert, sync-operation list/detail/retry, verified webhook, consent và audit query. DTO phải whitelist + forbid unknown fields, giới hạn kích thước, kiểm tra tenant/facility từ server-side principal thay vì tin query/body.

## Must-have / Should-have

| Priority | Scope |
|---|---|
| Must-have | Auth/RBAC/scope; patient dedup; appointment state machine và concurrency; queue/check-in; encounter sign/amend; prescription/lab order; billing intent; ERPNext typed client; idempotency/outbox; retry/dead-letter; webhook dedupe; audit/redaction; API validation; Vietnamese timezone/currency/locale; backup/restore/runbook; unit/integration/E2E/security tests |
| Should-have | Patient portal; recurring appointments; referral/partner fulfillment; dashboards; stock/expiry alerts; notifications; FHIR export boundary; DICOM/PACS links; insurance claim adapter; configurable workflows |

## Non-functional acceptance

Mục tiêu engineering cho outpatient core là p95 read <500ms, local write <800ms không tính remote ERPNext, không duplicate booking dưới concurrency, recovery xác định được sau timeout/duplicate delivery, secrets server-only, dependency health sanitized, structured logs redact PII/PHI, database migrations có thể chạy lặp an toàn và deployment có health probes.

## References

[1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ "Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals"
[2]: https://frappe.io/erpnext/for-healthcare "ERPNext for healthcare"
[3]: ./product_specification.md "Repository product specification"
[4]: ./architecture-and-integration.md "Repository architecture and integration decision"

Các kết luận thị trường trong blueprint chỉ là định hướng sản phẩm dựa trên nghiên cứu năm bệnh viện, không phải ước tính TAM/SAM/SOM.
