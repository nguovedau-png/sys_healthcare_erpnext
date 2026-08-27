# Healthcare Core Runbook

## Local setup

Trong `external_apps/backend`, copy `.env.example` thành `.env`, điền PostgreSQL, Redis và JWT secret riêng cho môi trường. Nếu bật đồng bộ ERPNext, điền `ERPNEXT_URL`, `ERPNEXT_API_KEY` và `ERPNEXT_API_SECRET` ở server; tuyệt đối không đưa các giá trị này vào frontend hoặc biến `NEXT_PUBLIC_*`.

## Database deployment

Chạy `npm ci`, sau đó `npx prisma generate` và `npx prisma migrate deploy`. Migration healthcare tạo các bảng tenant/facility/patient/appointment/encounter/order/billing/sync và PostgreSQL exclusion constraint để ngăn appointment active overlap cùng practitioner trong cùng tenant/facility. Extension `btree_gist` phải được phép trong database role triển khai.

## API surface

Các endpoint chính nằm dưới `/api/v1/healthcare`: `GET/POST /patients`, `GET/POST /appointments`, `POST /appointments/:id/transition`, `POST /encounters`, `POST /encounters/:id/submit`, `POST /encounters/:id/amendments` và `GET /integrations/erpnext/status`. Tất cả trừ health process đều cần Bearer JWT; server kiểm tra UserRoleScope theo tenant/facility.

## Verification

`npm run build` phải thành công. Unit suite healthcare chạy bằng `npm test -- --runInBand tests/healthcare.validation.test.ts tests/healthcare.service.test.ts`. Integration/API suite cần PostgreSQL và Redis thật; không đánh dấu production-ready nếu chưa chạy migration và smoke test trên staging ERPNext với credential tối thiểu quyền.

## Operational safeguards

Nếu ERPNext không sẵn sàng, local healthcare writes không được tự ý biến thành dữ liệu ERPNext giả; thay vào đó tạo pending sync/reconciliation record trong cùng transaction của integration implementation. Khi triển khai đầy đủ billing/order sync, worker phải dùng bounded retry, idempotency key, payload hash, dead-letter và replay audit. Log phải redact phone đầy đủ, token, clinical notes và payload bí mật.
