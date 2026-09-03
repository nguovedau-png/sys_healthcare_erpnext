# Healthcare ERPNext Platform — Release Candidate Status

**Ngày đánh giá:** 03 tháng 09 năm 2026  
**Repository:** `nguovedau-png/sys_healthcare_erpnext`  
**Branch:** `main`  
**HEAD đã push:** `6f88a23`

## Kết luận điều hành

Nền tảng đang ở trạng thái **Release Candidate kỹ thuật** cho healthcare operations tại Việt Nam. Healthcare layer tiếp tục sở hữu patient-care workflow, facility context, mobile workflow, audit và sync metadata; ERPNext là nguồn sự thật cho CRM, ERP, HR và accounting. Các thay đổi trong vòng này không tạo shadow ledger, không đưa credential vào source và không thay thế ERPNext bằng dữ liệu tài chính cục bộ.

Release candidate **chưa được tuyên bố production go-live tuyệt đối** vì việc triển khai database thật, kiểm tra reconciliation với một site ERPNext staging thật, push-notification token trên thiết bị thật và review pháp lý/compliance vẫn phụ thuộc môi trường đích cùng credential vận hành. Đây là các release gate không thể xác minh chỉ bằng sandbox hoặc mock tests.

## Phạm vi đã hoàn thiện

| Khu vực | Trạng thái | Kết quả chính |
|---|---|---|
| Healthcare operations | Đạt baseline | Patient registration/matching, appointment state machine, queue, consent, family links, encounter boundary và billing intent đã có service/API tests. |
| ERPNext integration | Đạt typed adapter baseline | Allowlisted read doctypes, bounded retry, safe document-name validation, Sales Invoice normalization và billing reconciliation status. `ERPNEXT_BASE_URL` là tên canonical; `ERPNEXT_URL` còn được hỗ trợ như alias chuyển đổi. |
| Back-office ownership | Đúng nguyên tắc | CRM, ERP, HR và accounting master/transaction truth thuộc ERPNext; healthcare app chỉ lưu external references, orchestration và metadata cần thiết. |
| Authorization | Đạt tested baseline | Query sensitive được scope theo tenant/facility và permission; billing reconciliation có test cho finance access và receptionist denial. |
| Mobile | Đã harden | Expo notification typings/API cleanup, auth refresh cleanup, route/state typing, i18n fallback Việt/Anh và media store import đã được sửa; TypeScript compile pass. |
| Web admin | Đã harden | Operations workspace tồn tại; menu labels được đưa vào locale song ngữ; route placeholder bị loại bỏ; Vite production build pass. |
| CI/CD | Đạt | GitHub Actions chuyển từ `npm ci` sai lockfile sang pnpm provision + frozen `pnpm-lock.yaml`; Prisma generate/validate, typecheck, Jest, build, whitespace và docs checks đều chạy pass trên GitHub. |
| Production source hygiene | Đạt trong phạm vi đã audit | Đã loại bỏ TODO/placeholder đã phát hiện trong mobile, web-admin, social auth, job và cache controllers; form input `placeholder` hợp lệ không bị coi là unfinished implementation. |

## Các vòng lặp đã thực hiện

Vòng đầu tiên audit baseline phát hiện mobile TypeScript không sạch, package runner Jest không tương thích với ts-jest, và CI dùng `npm ci` trong khi backend được khóa bằng pnpm. Các lỗi đã được sửa bằng type annotations, Expo API hiện hành, Jest 29 tương thích ts-jest 29 và workflow pnpm reproducible.

Vòng thứ hai rà soát ERPNext environment contract phát hiện runbook dùng `ERPNEXT_BASE_URL` nhưng external backend chỉ đọc `ERPNEXT_URL`. Adapter đã được sửa để dùng biến canonical và regression test đã được thêm. Runbook cũng được cập nhật để phân biệt biến canonical với alias legacy.

Vòng thứ ba rà soát production source phát hiện social login có thể sinh placeholder email. Hành vi này đã được thay bằng yêu cầu verified email từ provider để tránh tạo identity không thể khôi phục. Đồng thời, job deletion và cache listing được làm rõ semantics, menu i18n web-admin được hoàn thiện và route comment unfinished được loại bỏ.

## Kiểm chứng đã chạy

| Gate | Kết quả |
|---|---:|
| Backend Jest local | **57 tests passed / 9 suites passed** |
| ERPNext targeted regression | **4 tests passed** |
| Backend TypeScript typecheck | **Pass** |
| Backend production compile | **Pass** |
| Prisma schema validation/generate | **Pass** |
| Mobile TypeScript check | **Pass** |
| Web-admin TypeScript/Vite production build | **Pass**; Vite còn cảnh báo bundle lớn hơn 500 kB, không phải build failure |
| GitHub Actions run `33789956471` | **Success** trên commit `6f88a23` |
| Working tree | **Clean** sau khi push |

> GitHub Actions đã xác nhận toàn bộ pipeline trên runner thật: pnpm setup, frozen install, Prisma validation/generation, typecheck, 57-test suite, production compile, whitespace check và active documentation check.

## Các commit đã push

| Commit | Nội dung |
|---|---|
| `571d0f0` | Mobile client hardening và Jest alignment baseline |
| `c991519` | Chuyển backend quality pipeline sang pnpm |
| `8d77427` | Provision pnpm trước Node cache trong GitHub Actions |
| `1864ca9` | Chuẩn hóa ERPNext environment contract và runbook |
| `6f88a23` | Xóa production placeholders, harden social auth và admin flows |

## Release gates còn mở

| Gate | Lý do chưa thể tự xác nhận trong sandbox | Điều kiện đóng gate |
|---|---|---|
| ERPNext staging reconciliation | Chưa có URL/API key/API secret của site staging đích | Chạy health, Customer mapping, Sales Invoice matching, amount/currency/status mismatch và retry/idempotency test bằng dữ liệu fixture đã được phê duyệt. |
| Database migration trên môi trường thật | Sandbox không đại diện cho PostgreSQL production và không được tự ý migrate dữ liệu đích | Backup, dry-run, apply migration, verify indexes/constraints và restore drill theo runbook. |
| Push notifications thiết bị thật | Sandbox không có device token iOS/Android thật | Đăng ký token thật, gửi notification, kiểm tra token rotation, logout và permission denial. |
| Security/compliance sign-off | Cần chủ sở hữu pháp lý và vận hành của tổ chức | Xác nhận consent, retention, incident response, access review, secret rotation và production CORS/CSP origins. |
| Bundle optimization | Vite cảnh báo JavaScript chunk lớn | Có thể xử lý ở vòng tối ưu riêng bằng route-level dynamic import; không chặn chức năng hiện tại. |

## Hướng dẫn go-live tối thiểu

Trước go-live, operator phải provision `ERPNEXT_BASE_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`, `DATABASE_URL`, `RABBITMQ_URL`, `JWT_SECRET` và các secret provider qua secret manager; tuyệt đối không commit hoặc log credential. Phải chạy migration trên database staging trước, xác nhận tenant/facility/company mapping và kiểm tra rằng các request retry vẫn giữ nguyên `tenantId`, `sourceSystem`, `sourceId` và `idempotencyKey`.

Finance/accounting staff tiếp tục làm việc với invoice, payment, reconciliation và finance reports trên ERPNext. Healthcare admin chỉ dùng web/mobile layer cho registration, appointments, queues và workflow điều phối; mọi chênh lệch invoice phải được hiển thị là reconciliation attention và xử lý theo quy trình vận hành, không tự ý sửa shadow amount trong healthcare database.

## Tài liệu nguồn trong repository

- [`docs/requirements_and_architecture.md`](./requirements_and_architecture.md): product boundary, roles, ownership và sync contract.
- [`docs/production_runbook.md`](./production_runbook.md): environment, migration, authorization, recovery và rollback.
- [`external_apps/backend/src/modules/healthcare/erpnext.client.ts`](../external_apps/backend/src/modules/healthcare/erpnext.client.ts): typed ERPNext adapter.
- [`external_apps/backend/src/modules/healthcare/healthcare.service.ts`](../external_apps/backend/src/modules/healthcare/healthcare.service.ts): healthcare workflow và billing reconciliation.
- [`external_apps/backend/tests/erpnext.client.test.ts`](../external_apps/backend/tests/erpnext.client.test.ts): ERPNext adapter regression tests.
- [GitHub Actions run 33789956471](https://github.com/nguovedau-png/sys_healthcare_erpnext/actions/runs/33789956471): CI evidence cho commit `6f88a23`.

## Trạng thái cuối

**Technical RC: đạt. Production go-live: chờ đóng các gate môi trường thật nêu trên.** Repository ở `main`, đã push sạch lên GitHub và không chứa secrets trong các thay đổi của vòng này.
