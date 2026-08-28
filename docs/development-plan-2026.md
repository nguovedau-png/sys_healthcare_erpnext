# Kế hoạch phát triển 2026 – Healthcare Vietnam Operating Layer

**Mục tiêu:** biến nền tảng hiện có thành lớp vận hành outpatient an toàn, bản địa hóa Việt Nam và tích hợp ERPNext đáng tin cậy. Kế hoạch được sắp theo dependency và business value; mỗi increment phải đi qua **Implement → Test → Review → Fix → Refactor → Document**.

## 1. Kiến trúc đích

Giữ mô hình **modular monolith theo bounded context ở phía domain và một số service đã tồn tại**, không tách thêm microservice nếu chưa có tải hoặc ownership độc lập. API Gateway là boundary duy nhất cho client; domain services giữ business invariants; Prisma/PostgreSQL giữ transaction; Redis dùng cache/short-lived lock/rate limit; RabbitMQ/outbox dùng integration/background jobs; object storage giữ file y tế với signed URL; ERPNext là system of record cho invoice/CRM/HR/accounting, còn healthcare DB giữ projection và workflow clinical.

| Layer | Quyết định |
|---|---|
| Client | web-public cho discovery/patient, web-admin cho vận hành, web-partner cho cơ sở/đối tác, mobile cho patient/provider/admin; mobile-first, Vietnamese locale, accessible forms |
| Edge/API | NestJS API Gateway, `/api/v1`, DTO whitelist/forbid unknown, correlation/request ID, rate limit, sanitized errors |
| Domain | booking, patient, clinical, payment, partner, notification, content, audit; service-layer authorization, tenant/facility scope |
| Data | PostgreSQL per bounded context/schema, migrations repeatable, tenantId + facilityId, indexes cho idempotency/overlap/external refs, PHI separation |
| Integration | typed ERPNext client, outbox, bounded retry/backoff, DLQ, signed webhook, event dedupe/out-of-order handling |
| Ops | structured redacted logs, metrics/traces, health/readiness probes, alerting, encrypted backup, restore drill, CI/CD gated by tests |

### Security và permission model

Principal từ auth server là nguồn duy nhất cho `tenantId`, `facilityIds`, role và field boundary; không tin tenant/facility từ body/query. Roles gồm platform_admin, tenant_admin, facility_admin, receptionist, nurse, practitioner, pharmacist, lab_technician, finance, integration_operator, auditor và patient. Clinical notes chỉ practitioner được phân công hoặc vai trò được policy cấp; patient chỉ đọc hồ sơ bản thân/dependent có grant. Break-glass cần reason, time limit và audit.

## 2. Dependency graph và thứ tự delivery

`Foundation/Auth → Tenant/Facility scope → Patient identity → Availability/Appointment → Queue → Clinical encounter/orders → Billing/ERPNext → Notifications/Portal → Reviews/Search → Analytics/AI`.

### Module 0 – Engineering foundation

**Objective và user story.** Chuẩn hóa workspace, env, migration, error contract và observability để mọi module sau có nền tảng vận hành được. As an operator, tôi muốn biết request nào thất bại và không làm lộ PII.

**Functional/API/database/UI.** Thêm request ID/correlation, typed error envelope, health/readiness sanitized, config validation, pagination cap, audit hook; không đổi API cũ ngoài backward-compatible headers/error metadata. Bổ sung migration baseline và seed roles/scopes. Admin UI hiển thị health/sync status mà không lộ secret.

**Edge/security/tests.** Thiếu env phải fail fast; health không được tiết lộ DB URL; pagination âm/quá lớn bị chặn; log không có full phone/PHI; test unit config/error, integration health, security log-redaction và migration idempotency.

**Dependencies/acceptance.** Chỉ phụ thuộc code hiện có; đạt khi build backend, migration dry-run, health probe, 100% error path chính có correlation ID và test pass.

### Module 1 – Auth, RBAC, tenant/facility scope

**Objective.** Chặn truy cập chéo tenant/cơ sở trước khi mở rộng dữ liệu.

**User story.** As a facility manager, tôi chỉ xem và sửa tài nguyên thuộc cơ sở được cấp quyền; auditor đọc log nhưng không mutation.

**Functional/API/database/UI.** Middleware/guard lấy principal; policy service `can(action, resource)`; mọi repository query bắt buộc scope; tables `Tenant`, `Facility`, `UserRoleScope`, `ConsentRecord`, `AuditEvent`. API `/api/v1/me`, `/scopes`, admin role assignment, audit query. UI ẩn theo capability nhưng server vẫn enforce.

**Edge/security/tests.** Cross-tenant ID probing trả 404/403 không phân biệt existence; revoked role cắt quyền ngay; patient dependent grant hết hạn; break-glass ghi reason. Test matrix role × action × scope, IDOR, replay token, audit immutability.

**Dependencies/acceptance.** Module 0. Đạt khi mọi route core có policy check và negative authorization suite pass.

### Module 2 – Patient identity, dedup và dependent

**Objective.** Giảm hồ sơ trùng và hỗ trợ người thân đặt lịch.

**User story.** As a receptionist, tôi nhập số Việt Nam và nhận candidate trùng để xác nhận; as a parent, tôi đặt cho con.

**Functional/API/database/UI.** Normalize + validate Vietnamese phone; `PatientProjection` với tenant/facility/external refs, `DuplicateCandidate`, `PatientRelationship/Grant`; `POST /patients`, `GET /patients?search`, confirm duplicate, grant/revoke dependent. Không auto-merge; merge cần privileged workflow và audit.

**Edge/security/tests.** `03x`, `+84`, spaces; missing phone; two concurrent creates; same person across facilities; minor/dependent consent; search không trả PHI dư. Test normalization, uniqueness, concurrent duplicate, IDOR và redaction.

**Dependencies/acceptance.** Module 1 + ERPNext typed client. Đạt khi tỷ lệ duplicate candidate deterministic, không cross-scope leak và upsert ERPNext idempotent.

### Module 3 – Availability, appointment và queue

**Objective.** Đặt lịch không trùng, giảm chờ và no-show.

**User story.** As a patient, tôi thấy slot còn thật; as receptionist, tôi check-in và đổi trạng thái không phá invariant.

**Functional/API/database/UI.** Availability/resource schedule; appointment state machine `pending → confirmed → checked_in → in_progress → completed`, terminal `cancelled/no_show`; hold/confirm/cancel/reschedule/check-in; `IdempotencyKey`, unique external reference và transaction/locking. Queue ticket, priority policy, estimated wait. UI mobile-first với giá, duration, cancellation policy và mã booking.

**Edge/security/tests.** stale slot/overlap → 409; duplicate request replay same response; same key khác payload → 409; timezone DST/holiday; cancellation window; no-show; queue fairness; load/concurrency. Test unit transitions, DB concurrent booking, API auth, E2E booking/check-in.

**Dependencies/acceptance.** Modules 0–2. Đạt khi zero duplicate trong concurrency test, p95 local read <500ms/write <800ms target và transitions immutable/audited.

### Module 4 – Clinical encounter, prescription, lab

**Objective.** Tạo hồ sơ lâm sàng có ký và amendment không ghi đè.

**User story.** As a practitioner, tôi submit encounter; nếu sai tôi tạo amendment có lý do.

**Functional/API/database/UI.** `Encounter`, `ClinicalAmendment`, `Order`, prescription/lab status; required reason/assessment/practitioner; sign timestamp; read field boundaries; result document signed URL. API create/submit/amend/order/result. UI clinical workspace tối ưu tablet/mobile.

**Edge/security/tests.** Unassigned practitioner; submit thiếu trường; double sign; amendment chain; revoked access; attachment malware/size; no raw PHI in error/log. Test immutable original, field authorization, signed URL expiry, integration order lifecycle.

**Dependencies/acceptance.** Module 3 + file-service + audit. Đạt khi original signed record không update/delete âm thầm, amendment trace đầy đủ.

### Module 5 – Billing/payment/refund và ERPNext reconciliation

**Objective.** Thu tiền và đối soát không mất hoặc nhân đôi giao dịch.

**User story.** As finance, tôi xem pending/paid/refunded và retry an toàn; as patient, tôi biết trạng thái và chính sách hoàn.

**Functional/API/database/UI.** `BillingIntent`, payment adapter interface cho QR/bank/wallet/card tokenization provider, webhook receipt, refund/dispute; không lưu raw card data; ERPNext invoice reference. API create/status/refund/reconcile/retry. UI receipt, pending banner, refund timeline.

**Edge/security/tests.** provider timeout, duplicate webhook, forged signature, old event, partial refund, chargeback, COD/at-counter, ERPNext outage. Test idempotency, signature/timestamp, out-of-order, reconciliation report, authorization finance-only.

**Dependencies/acceptance.** Modules 0–4 + ERPNext integration. Đạt khi mọi intent có correlation, DLQ/replay, audit và không duplicate invoice/payment.

### Module 6 – Notification, portal, review, search/discovery

**Objective.** Tăng completion/repeat booking bằng trải nghiệm quen thuộc nhưng có consent.

**User story.** As a patient, tôi nhận nhắc lịch tiếng Việt và xem tài liệu được cấp; as a provider, tôi chỉ được review từ booking hoàn tất.

**Functional/API/database/UI.** Notification preference/template/version/channel adapter; OTP/reminder; portal self/dependent; verified review, moderation, response; search filter specialty/location/price/availability; ranking không bán và không dùng PHI nhạy cảm.

**Edge/security/tests.** Opt-out marketing không tắt transactional safety; quiet hours; duplicate delivery; phone change; review abuse; provider self-review; search injection; inaccessible provider. Test consent, retry, verified review, relevance smoke, mobile E2E.

**Dependencies/acceptance.** Modules 1–5. Đạt khi notification delivery observable, unsubscribe effective và review provenance audit được.

### Module 7 – Analytics, AI và partner ecosystem

**Objective.** Mở rộng sau khi core có dữ liệu tin cậy.

**User story.** As manager, tôi xem utilization/no-show/reconciliation; as operator, tôi có gợi ý hành chính giải thích được.

**Functional/API/database/UI.** Event warehouse/read models; dashboards; FHIR export boundary, DICOM/PACS link, referral; AI chỉ tóm tắt hành chính, FAQ/navigation, no-show/fraud triage với consent, provenance, human approval và kill switch.

**Edge/security/tests.** Data drift, prompt injection từ clinical text, model hallucination, export over-sharing, re-identification, regional retention. Test synthetic fixtures only, permissioned aggregate, AI refusal/human review, explainability and rollback.

**Dependencies/acceptance.** Tất cả core + consent/audit + operational SLO. Không release AI clinical decision support trước governance và validation độc lập.

## 3. CI/CD, backup, testing và quality gate

Pipeline chạy lint/typecheck/unit/integration, Prisma generate/migrate validation, dependency/security scan, API contract, Playwright E2E và Docker image scan. Staging dùng seeded non-production data; production migration có expand/contract, canary và rollback plan. Backup PostgreSQL/object store encrypted, daily incremental/weekly full theo retention; restore drill định kỳ đo RPO/RTO. Metrics gồm latency/error, booking conflict, queue wait, payment pending, webhook reject, DLQ, audit write, notification delivery và auth denial.

Mỗi PR phải có acceptance evidence, migration note, threat-model delta, test cases và runbook update. Definition of Done gồm functional correctness, responsive/mobile, API/database integrity, authorization, errors, performance, edge cases, logs/metrics, docs và rollback.

## 4. Delivery slices thực thi ngay

Trong repository hiện tại, slice đầu tiên ưu tiên **hardening operational boundary** vì backend đã có booking, ERPNext retry và test nền. Thực thi ngay: tạo hai tài liệu chiến lược/kế hoạch; chạy toàn bộ test backend hiện có; sửa lỗi compile/typecheck hoặc security có tính cục bộ; bổ sung regression tests; sau đó refactor theo các vòng lặp được ghi trong verification report. Các hạng mục marketplace, livestream, AI diagnosis và logistics fleet chỉ đưa vào backlog, không triển khai trong slice này.
