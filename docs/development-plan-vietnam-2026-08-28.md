# Development plan — Vietnam outpatient core — 28/08/2026

## Delivery strategy

Giữ một modular monolith trong `external_apps/backend` với Prisma/PostgreSQL, Redis/BullMQ và các web/mobile clients hiện hữu. Chỉ tách service khi có boundary vận hành hoặc tải rõ ràng. ERPNext là system of record cho ERP/CRM/HR/accounting/inventory; healthcare backend là owner của booking, queue, clinical workflow, consent, integration state và patient UX.

| Wave | Module | Depends on | Done when |
|---|---|---|---|
| 0 | Baseline, migrations, test harness, env hardening | — | typecheck/build/test chạy reproducibly |
| 1 | Identity, tenant/facility scope, RBAC, audit | 0 | deny-by-default và tenant boundary tests pass |
| 2 | Patient + dedup + family-ready profile | 1 | duplicate candidate không auto-merge, PII redact |
| 3 | Catalog, availability, appointment state machine | 1,2 | concurrent final-slot test không double-book |
| 4 | Check-in + queue | 3 | idempotent check-in, realtime-safe status |
| 5 | Encounter/order/billing intent | 1,2,3 | signed immutable record, amendment, idempotent handoff |
| 6 | Sync/outbox/webhook/reconciliation | 5 | retry/DLQ/out-of-order webhook tests pass |
| 7 | Notification abstraction + Viet Nam channels | 3,4,5 | provider failure does not corrupt domain state |
| 8 | Admin/public responsive UX | 1–7 | critical journeys usable on 360px and desktop |
| 9 | Hardening and release | all | quality gate, runbook, backup/restore evidence |

## Feature contract template

Mỗi module phải có objective, user story, functional/business rules, API DTO, schema/index/migration, UI states, edge cases, security controls, unit/integration/E2E tests, dependencies và acceptance criteria. Không coi “build xanh” là hoàn tất.

## Priority contracts

### Identity and scope

**User story:** Là tenant/facility operator, tôi chỉ thấy và sửa dữ liệu trong phạm vi được cấp.  
**API/data:** principal từ verified token; `Tenant`, `Facility`, `UserRoleScope`; mọi query healthcare bắt buộc tenantId và facilityId khi applicable.  
**Security/tests:** deny-by-default, 401/403, cross-tenant/cross-facility negative tests, break-glass audit, no PII in logs.  
**Acceptance:** không có route nào dùng tenant/facility từ body làm authority; permission được kiểm ở server.

### Patient and deduplication

**User story:** Lễ tân đăng ký nhanh nhưng không tạo hồ sơ trùng.  
**Rules:** normalize Vietnamese phone; candidate match theo phone/name/DOB/identifier khi được phép; candidate review trước merge; canonical profile không xóa âm thầm.  
**API/UI:** search, create, candidate list, review/link; UI hiển thị lý do match và confirm.  
**Edge/security:** concurrent create, malformed phone, sensitive identifier encryption/redaction, dependent consent.  
**Acceptance:** duplicate candidate được tạo deterministic; auto-merge bị cấm; audit đủ actor/reason/time.

### Appointment and queue

**User story:** Bệnh nhân chọn slot thật, lễ tân không bị double-book và bệnh nhân biết đang chờ bao lâu.  
**Rules:** slot thuộc availability, timezone facility, unique conflict transactionally; transitions `requested→confirmed→checked_in→in_progress→completed`, terminal `cancelled/no_show/expired`; cancellation/refund policy explicit.  
**API:** availability, reserve/confirm, reschedule, cancel, check-in, queue status. Require idempotency key for create/transition.  
**Tests:** concurrent booking, stale slot 409, illegal transition 422, retry same payload same result, retry different hash 409, practitioner schedule change.  
**Acceptance:** zero duplicate booking in concurrency test; no transition backward; queue is eventually consistent but never claims an unconfirmed appointment.

### Clinical and billing boundary

**User story:** Bác sĩ ký hồ sơ có cấu trúc, kế toán nhận billing intent mà không nhân bản ledger.  
**Rules:** encounter submit requires practitioner/reason/assessment/signedAt; signed record immutable; amendment requires reason and link; billing uses correlation/idempotency key; ERPNext remains invoice/payment/refund owner.  
**Tests:** unauthorized read, revoked access, submit validation, amendment, ERPNext timeout after remote success, duplicate webhook.  
**Acceptance:** clinical and financial ownership documented in code and docs; reconciliation can explain every intent.

### Integration reliability

**User story:** Integration operator có thể retry/replay mà không tạo duplicate.  
**Rules:** outbox record with deterministic idempotency, payload hash, bounded exponential retry, DLQ, event receipt dedupe, signature/timestamp verification, out-of-order version guard.  
**Acceptance:** replay same event idempotent; hash mismatch 409; permanent failure visible in admin and alertable; redacted payload summary only.

## Quality gate per feature

Unit tests cho domain rules; integration tests cho Prisma/HTTP; E2E cho booking-to-queue và encounter-to-billing; responsive verification at 360/768/1440px; authorization and abuse tests; structured logs/metrics; migration forward/backward check; documentation and rollback note. CI phải chạy lint/typecheck/test/build và fail closed on secrets or known vulnerable dependencies.

## Operational targets

p95 local read <500 ms; local write <800 ms excluding ERPNext; queue lag observable; RTO/RPO documented and restore rehearsal completed; error responses use stable code, message and correlationId; health endpoint exposes sanitized dependency state only.

## Assumptions

Pilot targets private outpatient clinics with 1–10 facilities, Vietnamese locale first, Asia/Ho_Chi_Minh timezone, VND. OTP/payment/Zalo providers are adapters behind interfaces and can run in sandbox mode in development. Legal counsel and facility medical governance approve production policies before real PHI.
