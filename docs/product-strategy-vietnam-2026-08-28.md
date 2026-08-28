# Chiến lược sản phẩm healthcare Việt Nam — 28/08/2026

**Tác giả:** Manus AI  
**Phạm vi:** nền tảng vận hành phòng khám ngoại trú đa cơ sở trên ERPNext, với lớp trải nghiệm bệnh nhân và điều phối healthcare riêng.

## 1. Kết luận điều hành

Sản phẩm không nên cạnh tranh trực diện với nền tảng marketplace bằng số lượng cơ sở, cũng không nên cố trở thành một HIS bệnh viện đầy đủ ngay từ đầu. Khoảng trống có giá trị nhất là **clinic operating system bản địa hóa cho Việt Nam**, kết nối được khám trực tiếp, đặt lịch, xếp hàng, hồ sơ ngoại trú, dược/kho và tài chính ERPNext trong một luồng có thể kiểm toán. Patient-facing UX cần đủ đơn giản để dùng qua điện thoại, web, đường link/Zalo/SMS và vẫn phục vụ người lớn tuổi qua lễ tân.

Medpro cho thấy kỳ vọng thị trường đã vượt qua “đặt lịch”: lấy số trực tuyến, đặt theo giờ, tư vấn video, xét nghiệm, tiêm chủng, y tế tại nhà, hoàn tiền và ưu đãi đều xuất hiện trong cùng hành trình.[1] BookingCare nhấn mạnh discovery, nội dung được bảo trợ và kênh mobile/social, cho thấy niềm tin và nội dung địa phương là thành phần sản phẩm chứ không chỉ là marketing.[2] MyHospital đặt chuẩn cạnh tranh phía vận hành: cloud HIS, EMR, LIS/PACS, BHYT, kho lô/hạn dùng, BI, app bệnh nhân và AI hỗ trợ lâm sàng.[3]

## 2. Người dùng và hành vi cần phục vụ

| Persona | Nhu cầu thực tế | Rào cản | Thiết kế đáp ứng |
|---|---|---|---|
| Người bệnh bận rộn 18–45 | Tìm bác sĩ/cơ sở, biết giá và thời gian chờ, đặt nhanh | Không muốn tạo tài khoản dài; sợ chờ lâu hoặc phát sinh phí | Booking bằng số điện thoại + OTP tùy chính sách, hiển thị phí/điều kiện rõ, mã đặt khám và live queue |
| Người chăm sóc gia đình | Đặt cho con, cha mẹ, người phụ thuộc | Một tài khoản phải quản lý nhiều hồ sơ | Family profile, consent theo người phụ thuộc, nhắc lịch theo từng bệnh nhân |
| Người lớn tuổi/ít số hóa | Được lễ tân hỗ trợ, nhận hướng dẫn dễ hiểu | Khó thao tác app, lo thanh toán online | Kênh lễ tân, QR/mã đặt khám, SMS/voice fallback, UI chữ lớn và tiếng Việt mặc định |
| Lễ tân | Tiếp nhận nhanh, tránh trùng hồ sơ và sai slot | Áp lực giờ cao điểm, dữ liệu phân tán | Patient dedup, quick booking, queue board, audit và quyền tối thiểu |
| Bác sĩ/điều dưỡng | Ít click, xem đúng hồ sơ, ký/amend an toàn | Gánh nặng nhập liệu, gián đoạn quy trình | Clinical workspace, templates, draft autosave, voice-to-note ở V2, immutable signed record |
| Chủ chuỗi phòng khám | Nắm công suất, doanh thu, no-show, chất lượng | Khó hợp nhất nhiều cơ sở | Multi-facility dashboard, field ownership ERPNext, tenant/facility scope |

## 3. Khoảng trống và ưu tiên

Điểm yếu của baseline cũ là đã mô tả backend khá đầy đủ nhưng chưa biến các kỳ vọng bản địa thành trải nghiệm cụ thể: **giá dự kiến và chính sách hủy**, mã queue có thể chia sẻ cho người nhà, thanh toán VietQR và fallback tại quầy, kênh Zalo/SMS, family profile, campaign/voucher có guardrail, và onboarding cho phòng khám nhỏ. AI chỉ được đưa vào sau khi dữ liệu chuẩn hóa, audit và consent đã ổn định; không đưa chẩn đoán tự động vào MVP.

| Hạng mục | Business value | User value | Demand | Feasibility | Quyết định |
|---|---:|---:|---:|---:|---|
| Patient dedup + family profile | 5 | 5 | 5 | 4 | Must have |
| Appointment concurrency + queue visibility | 5 | 5 | 5 | 4 | Must have |
| VietQR/payment intent + reconciliation | 5 | 4 | 5 | 3 | Must have |
| Vietnamese notification adapters (SMS/Zalo/email) | 4 | 5 | 5 | 4 | Must have |
| Cancellation/refund/dispute policy | 5 | 5 | 4 | 3 | Must have |
| Audit, consent, scoped RBAC, redaction | 5 | 5 | 5 | 4 | Must have |
| Inventory lot/expiry + dispense reference | 4 | 4 | 4 | 3 | V1 |
| LIS/PACS/BHYT adapters | 5 | 4 | 4 | 2 | V1/V2, adapter boundary now |
| Reviews/reputation with verified-visit gating | 3 | 4 | 4 | 3 | V1 |
| Livestream/short video commerce | 2 | 2 | 3 | 2 | Not now |
| AI clinical suggestion/diagnosis | 4 | 3 | 3 | 2 | Not now; research sandbox |
| Full social network/marketplace | 2 | 2 | 2 | 1 | Not now |

## 4. Phạm vi sản phẩm

**Vision:** trở thành lớp vận hành tin cậy giúp phòng khám Việt Nam phục vụ bệnh nhân nhanh hơn, minh bạch hơn và quản trị được nhiều cơ sở mà không phải thay thế sổ cái ERPNext.

**Business model:** B2B SaaS theo cơ sở/tháng, có phí triển khai và gói hỗ trợ; add-on theo SMS/Zalo, payment, LIS/PACS, e-invoice, báo cáo nâng cao. Không bán dữ liệu bệnh nhân, không dùng clinical data cho quảng cáo. Marketplace discovery hoặc referral chỉ là kênh tăng trưởng V2, có disclosure và không được làm sai lệch thứ tự lâm sàng.

**Marketplace rules:** chỉ cơ sở đã xác minh mới được hiển thị; giờ trống phải là giờ thật; giá và phụ phí phải có hiệu lực; review chỉ sau encounter/paid service; cấm claim chữa khỏi và quảng cáo không được phê duyệt; dispute có SLA, audit và quyền kháng nghị.

### Must Have — MVP

Auth/RBAC và tenant/facility scope; patient registration/search/dedup; service/practitioner catalog; availability và booking chống double-book; reschedule/cancel/no-show; check-in và queue; outpatient encounter draft/submit/amend; order/prescription reference; billing intent với idempotency; ERPNext sync/outbox/retry/dead-letter/webhook; consent/audit/redaction; notification abstraction; dashboard vận hành; locale Việt Nam (Asia/Ho_Chi_Minh, VND, tiếng Việt); rate limit, health checks, backup/runbook và test suite.

### Should Have — V1

Family profile và dependent consent; VietQR adapter thật qua payment provider; electronic invoice adapter boundary; patient portal; verified review; recurring appointments; voucher/campaign có quota; inventory lot/expiry; referral; operational BI; FHIR export boundary; Zalo/SMS provider; offline-safe reception draft; multi-language English.

### Could Have — V2/Future

Teleconsultation có consent và recording policy; LIS/PACS; BHYT workflow; OCR giấy tờ; voice-to-note; AI tóm tắt có human-in-the-loop; predictive no-show; care plan; home care; partner fulfillment; regional expansion.

### Not Now

Full hospital inpatient/OR/ICU; open social feed; livestream shopping; automated diagnosis/prescription; crypto/BNPL; automatic patient merge; ad targeting từ PHI; microservices tách nhỏ trước khi có tải và boundary ổn định.

## 5. Core journeys và acceptance principles

Bệnh nhân chọn cơ sở/dịch vụ → xem slot, phí và chính sách → đặt bằng số điện thoại → nhận mã và queue expectation → check-in → được phục vụ → nhận trạng thái kết quả/đơn theo quyền → thanh toán/refund nếu có → nhắc tái khám. Lễ tân có thể hoàn thành cùng hành trình mà không cần bệnh nhân tự dùng app.

Mọi transition đều là state machine; mọi write nhạy cảm đều có authorization server-side; record đã ký không sửa âm thầm; payment và webhook idempotent; timeout ERPNext không được tạo duplicate; log không chứa số điện thoại đầy đủ, token hay clinical payload.

## 6. Tuân thủ, an toàn và rủi ro

Thiết kế phải coi dữ liệu sức khỏe là dữ liệu nhạy cảm: purpose/consent/retention/access log, export và xóa theo chính sách, mã hóa khi truyền/lưu, secret server-only, backup mã hóa và diễn tập restore. Cần legal review tại thời điểm triển khai đối với Luật Bảo vệ dữ liệu cá nhân 2025, Luật An ninh mạng và văn bản hướng dẫn mới nhất; không được tuyên bố “compliant” chỉ dựa trên code. Hồ sơ bệnh án điện tử, chữ ký/ký số, hóa đơn điện tử, BHYT và quảng cáo y tế cần mapping với cơ sở triển khai và tư vấn pháp lý/chuyên môn.

Rủi ro gian lận chính gồm booking ảo/no-show, coupon abuse, account takeover, giả webhook, hoàn tiền trùng, sửa clinical record, privilege creep và lộ PII qua log/export. Biện pháp là OTP/rate limit, device/IP anomaly, verified visit, quota voucher, HMAC + timestamp + event dedupe, dual control cho break-glass/refund lớn, immutable audit và periodic access review.

## 7. Metrics pilot

North-star là tỷ lệ bệnh nhân hoàn tất hành trình từ booking đến completed encounter mà không cần can thiệp thủ công. Theo dõi thêm booking success rate, double-book incidents, median wait, no-show rate, time-to-register, payment reconciliation lag, notification delivery, duplicate-patient review rate, signed encounter amendment rate, support tickets và restore RTO/RPO.

## References

[1]: https://medpro.vn/ "Medpro — Đặt khám, lấy số trực tuyến, tư vấn từ xa và dịch vụ y tế"
[2]: https://bookingcare.vn/ "BookingCare — nền tảng kết nối người bệnh và cơ sở y tế"
[3]: https://myhospital.vn/ "MyHospital — HIS/EMR cloud, LIS/PACS, BHYT, kho và AI"
[4]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11843058/ "Status of Digital Health Technology Adoption in 5 Vietnamese Hospitals"
[5]: https://docs.frappe.io/erpnext/frappe-healthcare "ERPNext Healthcare documentation"
[6]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Bộ Y tế — văn bản pháp lý về bệnh án điện tử"
