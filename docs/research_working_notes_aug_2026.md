# Ghi chú nghiên cứu và hiện trạng — 27/08/2026

## Hiện trạng repository

Repository `nguovedau-png/sys_healthcare_erpnext` đang ở nhánh `main`, working tree sạch tại thời điểm khảo sát. Đây là monorepo chứa ERPNext/Frappe apps, một backend Node.js/Express/TypeScript/Prisma dùng PostgreSQL, Redis và BullMQ, web-admin Vite/React, web-public Next.js và mobile-app Expo/React Native. Backend đã có các script build, test, worker và đồng bộ ERPNext; đã có Jest tests cho auth, department, employee và user, cùng Playwright tests cho web/mobile.

Các tài liệu sản phẩm hiện có đã xác định ranh giới đúng: ERPNext là nguồn sự thật cho CRM, ERP, HR và Accounting; lớp healthcare sở hữu trải nghiệm bệnh nhân, đặt lịch, check-in, queue, encounter, clinical orchestration, sync metadata và audit. Blueprint đã nêu các entity tối thiểu, lifecycle appointment, clinical amendment, billing intent, idempotency, retry/dead-letter, webhook dedupe và RBAC tenant/facility.

## Phát hiện thị trường

Nguồn sản phẩm MyHospital tại https://myhospital.vn/ định vị HIS cloud cho bệnh viện và phòng khám. Trang này thể hiện các nhóm tính năng cạnh tranh gồm tiếp nhận và khám chữa bệnh, hồ sơ bệnh án điện tử, báo cáo/BI, CRM/chăm sóc người bệnh, dược/vật tư, viện phí và liên thông BHYT; đồng thời nêu tích hợp AI hỗ trợ bác sĩ, ứng dụng người bệnh, PACS/LIS/máy xét nghiệm và triển khai cloud. Điều này xác nhận thị trường kỳ vọng một luồng end-to-end từ tiếp đón → lâm sàng → cận lâm sàng/dược → tài chính → chăm sóc, không chỉ CRUD hồ sơ.

Kết quả tìm kiếm thị trường cho thấy các nhóm đối thủ/định vị cần so sánh tiếp gồm FPT.eHospital, VNPT HIS, HSOFT, Sao Việt, NANO và các HIS cloud nội địa khác; cần ưu tiên nguồn chính thức của từng nhà cung cấp trước khi đưa claim chi tiết vào tài liệu cuối.

Nguồn nghiên cứu học thuật về áp dụng công nghệ y tế số tại năm bệnh viện Việt Nam đã được phát hiện nhưng trang PMC bị reCAPTCHA khi mở bằng trình duyệt. Không dùng snippet làm bằng chứng cuối; sẽ dùng bản trích xuất/nguồn thay thế hoặc chỉ giữ citation repository đã có nếu không xác minh được toàn văn.

## Hệ quả sản phẩm sơ bộ

Khác biệt nên tập trung vào lớp healthcare operations tích hợp ERPNext thay vì nhân bản ERP/HR/accounting: trải nghiệm đa cơ sở phù hợp phòng khám Việt Nam, đồng bộ có thể quan sát và khôi phục, hỗ trợ mobile cho vận hành, phân quyền theo tenant/facility, kiểm soát dữ liệu nhạy cảm và khả năng mở rộng sang BHYT/PACS/LIS/FHIR sau core reliability.

## Nguồn

[1]: https://myhospital.vn/ — MyHospital, trang sản phẩm HIS cloud.
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ — Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals; trình duyệt yêu cầu reCAPTCHA trong phiên khảo sát.
[3]: ./canonical_product_blueprint.md — Blueprint sản phẩm hiện có trong repository.
[4]: ./product_specification.md — Đặc tả sản phẩm hiện có trong repository.

## Nguồn chính thức bổ sung

Tài liệu ERPNext hiện tại xác nhận Healthcare đã được tách thành app mã nguồn mở Marley Health, cài cạnh ERPNext. Phạm vi lõi gồm patient records, practitioners, appointments/scheduling, patient encounters, clinical records, laboratory tests/procedures, inpatient care và liên kết billing với Sales Invoice. Chu kỳ tham chiếu là Patient Registration → Appointment Booking → Encounter/Consultation → Prescription hoặc Lab Test/Procedure → Billing → Follow-up. Vì vậy adapter của sản phẩm phải version-aware: không giả định mọi site ERPNext đều có Healthcare core giống nhau; cần kiểm tra app/schema capability khi kết nối.

FPT.eHospital 2.0 là benchmark enterprise khác, với đăng ký qua app/kiosk, khám ngoại trú/nội trú/cấp cứu và Smart Queue; các nguồn FPT cũng mô tả hệ sinh thái HIS/LIS/RIS/PACS/EMR và portal. Điều này củng cố rằng queue, mobile/self-service, cận lâm sàng và interoperability là kỳ vọng thực tế khi mở rộng sau outpatient core.

[5]: https://docs.frappe.io/erpnext/frappe-healthcare — Tài liệu chính thức Healthcare Module in ERPNext/Marley Health.
[6]: https://fpt-is.com/en/ehospital-2-0/ — FPT IS, eHospital 2.0.
[7]: https://fpt-is.com/en/fpt-is-presents-a-suite-of-smart-hospital-management-solutions-in-japan/ — FPT IS, mô tả hệ sinh thái HIS/LIS/RIS/PACS/EMR.

## Kết luận khảo sát implementation

Repository có hai lớp: `external_apps` là backend Express/Prisma và các client tương đối độc lập; `internal_apps/sys_healcare_system` là hệ sinh thái NestJS/microservices với nhiều service nhưng README còn mô tả một số phần là planned/partial. External backend hiện có queue/sync file nhưng Prisma schema chỉ có các model generic (User, Role, Permission, Employee, Department, Job, Webhook, AuditLog...), chưa có các entity healthcare tối thiểu như PatientProjection, Appointment, Encounter, BillingIntent, ExternalReference, SyncOperation hay WebhookReceipt; route registry cũng chưa mount healthcare routes. ERPNext sync hiện tại thiên về upsert Customer theo email và delete customer, chưa đạt contract typed/idempotent/tenant-scoped được cam kết.

Vì vậy milestone tiếp theo phải là một healthcare core vertical slice trong backend Express/Prisma hiện có, giữ ERPNext làm system of record cho CRM/ERP/HR/accounting và chỉ lưu projection/orchestration metadata ở lớp healthcare. Không nên mở rộng thêm microservice breadth trước khi có schema, authorization, lifecycle, idempotency và integration boundary đáng tin cậy.

[8]: https://fpt-is.com/en/ehospital-2-0/ — FPT IS eHospital 2.0.
