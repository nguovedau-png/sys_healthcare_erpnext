# Agent implementation design — Healthcare Operations Layer

## Quyết định kiến trúc

Hệ thống giữ mô hình monorepo hiện tại: backend Express/TypeScript là boundary duy nhất cho authorization, nghiệp vụ healthcare, audit và tích hợp ERPNext; Prisma/PostgreSQL lưu context healthcare và trạng thái đồng bộ; Redis/BullMQ xử lý tác vụ bất đồng bộ; web-admin, web-public và mobile dùng cùng API contract. ERPNext là nguồn sự thật cho CRM, ERP, HR và Accounting. Không tạo sổ cái kế toán bản sao trong healthcare database.

Các thao tác request-path phải nhanh và idempotent. Việc tạo/cập nhật chứng từ ERPNext phải đi qua adapter typed, credential chỉ từ environment, timeout bounded, retry có phân loại, correlation key và `SyncOperation`. Webhook phải có receipt deduplication và kiểm tra thứ tự phiên bản. Clinical records đã ký chỉ được sửa bằng amendment có lý do, tác giả và dấu thời gian.

## Milestone thực thi

| Milestone | Phạm vi | Tiêu chí hoàn thành |
|---|---|---|
| M1 | Runtime safety và test isolation | Backend build sạch; import app không cố kết nối Redis khi test; CORS/rate-limit cấu hình an toàn; không còn credential fallback |
| M2 | Core outpatient rules | Appointment transition optimistic locking đúng; thời gian/độ dài/role scope được kiểm tra; signed encounter immutable |
| M3 | ERPNext sync contract | Typed allowlist, correlation/idempotency, retry classification, redacted errors, sync operation persistence và health status |
| M4 | Admin/public/mobile UX hardening | UI gọi API thật, trạng thái loading/error/empty, Vietnamese locale, không hard-code credential/demo secret |
| M5 | Verification and release | Unit/integration/API/E2E chạy được trong profile local; security/performance checks; runbook và deployment docs cập nhật; commit/push |

## Phát hiện cần sửa ngay

1. `transitionAppointment` dùng `where: { status }` thay vì trạng thái hiện tại, khiến mọi transition hợp lệ bị từ chối hoặc cạnh tranh sai; phải dùng `where: { id, status: appointment.status, version: appointment.version }`.
2. `src/index.ts` khởi tạo Redis adapter và Redis rate-limit store ở module load, làm test/API import phụ thuộc Redis thật và sinh lỗi kéo dài; cần factory theo môi trường, fallback memory store chỉ cho test/development và đóng kết nối graceful.
3. `src/config/prisma.ts` kéo queue vào khi import Prisma; test setup chưa mock `erpnextSync`; cần tách side effect queue khỏi data client hoặc mock đầy đủ.
4. Legacy `erpnext-sync.service.ts` có credential fallback hard-coded và chỉ đồng bộ user→Customer; phải loại bỏ fallback, dùng typed client duy nhất và không log PII/secret.
5. Auth hiện chỉ xét một `User.role`, trong khi schema đã có `UserRoleScope`; core healthcare service có scope check nhưng route-level permission và tenant/facility context vẫn cần nhất quán.
6. Schema có dữ liệu healthcare quan trọng nhưng chưa có migration đầy đủ trong tree hiện tại; phải kiểm tra migration/deploy strategy trước khi claim production.

## Must-have sau milestone

Tenant/facility authorization, patient matching và duplicate handling, appointment lifecycle/conflict/idempotency, encounter signing/amendment, order/prescription metadata, ERPNext adapter an toàn, billing link/status, retry/dead-letter state, audit, Vietnamese phone/timezone normalization, admin/front-desk/clinical screens, mobile stale mutation protection và deterministic tests.

## Should-have sau khi M1–M5 ổn định

Waiting queue, recurring appointments, patient portal, referral fulfillment, inventory alerts, dashboards, notifications, FHIR export, LIS/PACS links, insurance adapter và digital signatures. Inpatient, autonomous diagnosis, national insurance submission và universal device drivers không nằm trong release đầu tiên.
