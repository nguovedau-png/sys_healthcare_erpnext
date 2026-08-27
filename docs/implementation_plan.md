# Healthcare Core Implementation Plan

## Product boundary

Sản phẩm là lớp vận hành healthcare đa cơ sở cho phòng khám Việt Nam. ERPNext/Marley Health là nguồn sự thật cho CRM, ERP, HR và Accounting; backend healthcare chỉ lưu projection bệnh nhân, lịch hẹn, encounter, order, billing intent, đồng bộ và audit. Không tạo sổ cái kế toán, bảng lương hay CRM master độc lập.

## Core flow

Lễ tân chuẩn hóa số điện thoại theo `+84`, tìm bệnh nhân trong tenant/facility và không tự động merge bản ghi nghi trùng. Người dùng đặt lịch với practitioner/resource và idempotency key. Appointment dùng state machine `pending → confirmed → checked_in → in_progress → completed`; `cancelled` và `no_show` là terminal. Encounter chỉ submit khi có practitioner, reason, assessment và signedAt; sau submit chỉ được sửa bằng amendment có lý do. Billing intent gửi sang ERPNext bằng correlation key và có thể reconciliation khi ERPNext không sẵn sàng.

## Roles

`platform_admin` có global scope; `tenant_admin` quản trị tenant; `facility_admin` quản trị cơ sở; `receptionist` quản lý patient/appointment/queue nhưng không đọc clinical notes; `nurse` triage; `practitioner` đọc/ghi encounter và order trong scope; `pharmacist` và `lab_technician` xử lý order liên quan; `finance` đọc billing; `integration_operator` xử lý sync nhưng không đọc clinical data; `auditor` đọc audit; `patient` chỉ đọc dữ liệu của mình. Server kiểm tra scope, không tin tenantId/facilityId từ body.

## Persistence

Các bảng mới tenant-scoped: `Tenant`, `Facility`, `UserRoleScope`, `PatientProjection`, `Appointment`, `Encounter`, `ClinicalAmendment`, `HealthcareOrder`, `BillingIntent`, `ExternalReference`, `SyncOperation`, `WebhookReceipt`, `ConsentRecord`. PII/PHI không ghi vào log; payload sync lưu summary/hash và chỉ giữ body khi cần replay theo retention policy.

## API v1

Đợt đầu triển khai các route patient registration/search, appointment create/list/transition/cancel và health capability endpoint; các module encounter/order/billing/sync dùng cùng schema và boundary để mở rộng mà không đổi contract. DTO whitelisted, reject unknown fields, giới hạn chuỗi, idempotency bắt buộc cho write từ client. HTTP semantics: 401 unauthenticated, 403 out of scope, 409 duplicate/overlap/stale, 422 invalid transition or clinical validation.

## ERPNext boundary

`ERPNextClient` chỉ nhận typed operation gồm tenant/facility/sourceSystem/sourceId/idempotencyKey. HTTP adapter dùng token server-side, timeout, retry bounded cho 408/429/5xx, không retry 4xx khác. Mỗi operation có external reference, payload hash và trạng thái pending/succeeded/failed/dead_letter. Khi không cấu hình ERPNext, local healthcare write vẫn thành công và tạo pending sync để reconciliation; không giả lập dữ liệu ERPNext.

## Acceptance targets

Không overlap appointment dưới transaction/concurrency; duplicate request cùng idempotency key trả cùng resource; lifecycle transition không lùi; patient scope không leak; test unit cho rules và integration/API cho auth, validation, idempotency, overlap, transition và ERPNext outage.
