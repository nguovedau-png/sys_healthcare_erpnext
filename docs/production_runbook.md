# Production Runbook

## Phạm vi

Repository này cung cấp healthcare operations workspace cho web-admin, API gateway cho lịch hẹn và hàng đợi khám, cùng ERPNext synchronization gateway cho các nghiệp vụ CRM, ERP, HR và accounting được allowlist. ERPNext là system of record của các phân hệ back-office; healthcare service giữ workflow điều phối tại chỗ và phát event downstream khi lịch hẹn hoàn tất.

## Environment contract

| Variable | Required | Production rule |
|---|---:|---|
| `JWT_SECRET` | Yes | Secret ngẫu nhiên tối thiểu 32 bytes, dùng chung giữa auth-service và API gateway; không commit vào repository. |
| `ERPNEXT_BASE_URL` | Yes for sync | Chỉ dùng HTTPS và phải trỏ tới site ERPNext đã được allowlist. |
| `ERPNEXT_API_KEY` / `ERPNEXT_API_SECRET` | Yes for sync | Inject qua secret manager; không ghi vào log hoặc image layer. |
| `ERPNEXT_RETRY_BASE_DELAY_MS` | No | Exponential backoff base in milliseconds; default `250`. |
| `ERPNEXT_PROCESSING_LEASE_MS` | No | Lease duration before reclaiming abandoned processing; default `120000`. |
| `ERPNEXT_DEAD_LETTER_THRESHOLD` | No | Attempts before dead-letter; default `5`. |
| `ERPNEXT_SYNC_TOKEN` | Yes for sync routes | Token service-to-service, rotate định kỳ; gửi qua `x-erpnext-sync-token`. |
| `DATABASE_URL` | Yes | Database riêng phù hợp schema của từng service; chạy migration trước khi rollout. |
| `RABBITMQ_URL` | Yes | RabbitMQ durable queues cho gateway và microservices. |
| `SEED_DEMO_DATA` | No | Mặc định không seed; chỉ bật `true` trong môi trường development hoặc fixture provisioning có kiểm soát. |
| `FRONTEND_ORIGINS` | Yes in production | Danh sách origin cụ thể, phân tách bằng dấu phẩy; không dùng wildcard khi bật credentials. |

## Release gate

Trước mỗi release, chạy các lệnh sau từ thư mục backend và web-admin. Release chỉ được coi là đủ điều kiện khi toàn bộ unit tests, backend build, TypeScript build và Vite production build thành công.

```bash
cd internal_apps/sys_healcare_system/backend
pnpm exec prisma generate --schema=apps/erp-service/prisma/schema.prisma
pnpm exec prisma generate --schema=apps/booking-service/prisma/schema.prisma
pnpm exec jest --runInBand
pnpm exec nest build

cd ../../../external_apps/web-admin
pnpm exec tsc -b
pnpm exec vite build
pnpm audit --prod
```

## Database rollout

Schema `SyncOperation` và các bảng `ExternalReference`, `WebhookReceipt`, `ConsentRecord`, `AuditEvent` cần được migrate trước khi bật endpoint ERPNext upsert. Migration nằm tại `internal_apps/sys_healcare_system/backend/apps/erp-service/prisma/migrations/20260827_integration_hardening/migration.sql`; chạy trong một bước riêng trước khi rollout application mới bằng migration runner của PostgreSQL. Script có `IF NOT EXISTS` để an toàn khi retry, nhưng vẫn phải được ghi nhận trong migration ledger. Nếu rollback application thì không nên xoá cột hoặc bảng đã tạo. Các bản ghi sync chứa metadata đã redacted, không phải bản sao payload clinical đầy đủ, vì vậy retry an toàn được thực hiện bằng cách gửi lại payload gốc với cùng `tenantId`, `sourceSystem`, `sourceId` và `idempotencyKey`.

## Authorization and data handling

Healthcare booking routes yêu cầu Bearer access token được ký bởi `JWT_SECRET`. ERPNext upsert và sync observability routes yêu cầu thêm `x-erpnext-sync-token`, nên token này chỉ được cấp cho integration operator hoặc trusted service. Client không được gửi password, API secret, access token hoặc dữ liệu clinical không cần thiết vào `requestSummary`; log production phải giữ ở mức metadata redacted.

Appointment status chỉ đi theo state machine `pending → confirmed → checked_in → in_progress → completed`, hoặc chuyển sang `cancelled`/`no_show` trước khi hoàn tất. Completed consultation được coi là immutable ở service boundary; việc chỉnh sửa hồ sơ hoàn tất phải triển khai theo amendment/audit workflow riêng, không dùng update CRUD thông thường.

## Observability and recovery

Theo dõi health endpoint, RabbitMQ queue depth, ERPNext latency/error rate và số lượng `FAILED`/`DEAD_LETTER` trong `SyncOperation`. Khi một sync thất bại, kiểm tra `lastErrorCode`, `attemptCount`, `lastAttemptAt`, `lockedAt` và `nextAttemptAt`; lease quá hạn được phép reclaim có kiểm soát, còn retry bình thường tuân theo exponential backoff; không retry lỗi validation hoặc replay payload với idempotency key khác. Khi phát hiện conflict do cùng idempotency key nhưng payload khác, dừng replay và xử lý qua reconciliation workflow.

## Rollback

Rollback application về bản build trước nếu release gây lỗi runtime, nhưng giữ nguyên migration tương thích ngược. Nếu ERPNext không khả dụng, healthcare local workflows vẫn có thể tiếp tục trong phạm vi service local; các integration write phải hiển thị trạng thái degraded và được replay có kiểm soát sau khi health trở lại. Không xoá `SyncOperation` để “làm sạch” lỗi vì bảng này là audit trail tối thiểu cho reconciliation.
