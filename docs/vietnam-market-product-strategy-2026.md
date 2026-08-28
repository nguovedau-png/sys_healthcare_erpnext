# Product Strategy cải tiến cho thị trường Việt Nam

**Sản phẩm:** lớp vận hành chăm sóc sức khỏe đa cơ sở, tích hợp ERPNext, dành cho phòng khám và bệnh viện tư/chuỗi tại Việt Nam. **Tác giả:** Manus AI. **Ngày:** 28/08/2026.

> Lưu ý pháp lý: đây là phân tích sản phẩm và kỹ thuật, không phải tư vấn pháp lý; cơ sở y tế cần luật sư/chuyên gia tuân thủ xác nhận trước khi triển khai dữ liệu thật.

## 1. Kết luận điều hành

Repository đã có nền tảng rộng gồm backend NestJS/Prisma theo nhiều domain, các ứng dụng web/mobile và tích hợp ERPNext. Tuy nhiên, thị trường không cần thêm một “siêu ứng dụng” ngay từ đầu. Wedge phù hợp hơn là **outpatient operating system cho phòng khám/chuỗi**, giải quyết ba nỗi đau có tần suất cao: đặt lịch không trùng và giảm chờ, hồ sơ bệnh nhân/clinical workflow có kiểm soát, và thu–đối soát thanh toán minh bạch.

Thị trường Việt Nam đã có nhu cầu rõ ràng về nền tảng tìm–so sánh–đặt lịch đơn giản. Nghiên cứu Docosan trên 394 bệnh nhân ghi nhận chỉ 16% đặt lịch trước, 10% từng bỏ về vì chờ đợi và 31% đánh giá trải nghiệm gần nhất thấp/rất thấp; quyết định y tế thường chịu ảnh hưởng gia đình, đặc biệt người mẹ.[1] Vì vậy, UX phải ưu tiên mobile, tiếng Việt, số điện thoại, người đặt lịch thay cho người bệnh, nhắc lịch qua kênh quen thuộc và thông tin giá/thời lượng minh bạch.

Thương mại điện tử Việt Nam đạt trên 25 tỷ USD năm 2024, tăng 20% và chiếm khoảng 9% bán lẻ/dịch vụ tiêu dùng; Bộ Công Thương đồng thời ghi nhận COD còn phổ biến ở khu vực nông thôn do thiếu niềm tin vào thanh toán số.[2] Sản phẩm nên hỗ trợ payment intent, QR/chuyển khoản/ví qua adapter, COD/thu tại quầy khi phù hợp, hoàn tiền và đối soát; không tự xây ví hoặc logistics riêng ở MVP.

Bộ Y tế hiện liệt kê Thông tư 46/2018/TT-BYT về hồ sơ bệnh án điện tử, Thông tư 54/2017/TT-BYT về tiêu chí CNTT và Quyết định 326/QĐ-BYT về an toàn thông tin, an ninh mạng; trang này báo cáo 1.264 cơ sở tham gia bệnh án điện tử vào 28/08/2026.[3] Dữ liệu sức khỏe và đời tư trong bệnh án là dữ liệu cá nhân nhạy cảm theo Nghị định 13/2023/NĐ-CP; hệ thống phải hỗ trợ thông báo xử lý, consent, quyền truy cập/chỉnh sửa/rút consent/xóa hoặc hạn chế theo chính sách, audit và quản trị retention.[4]

## 2. Người dùng mục tiêu và personas

| Persona | Nhu cầu thực tế | Rào cản | Chỉ số thành công |
|---|---|---|---|
| Bệnh nhân bận rộn ở đô thị | Chọn cơ sở/bác sĩ, biết giá, đặt trong 1–2 phút | Sợ phí ẩn, sợ chờ, không muốn điền form dài | Booking completion, thời gian đặt, no-show |
| Người thân đặt cho trẻ/người già | Quản lý nhiều hồ sơ, nhận nhắc lịch | Người đặt khác người bệnh; thiếu giấy tờ | Tỷ lệ dependent profile, repeat booking |
| Lễ tân | Tìm bệnh nhân nhanh, xếp hàng, đổi lịch, thu tiền | Trùng hồ sơ, gọi điện nhiều, hệ thống chậm | Queue wait time, duplicate rate |
| Bác sĩ/điều dưỡng | Triage, encounter, ký và sửa có kiểm soát | Dữ liệu rời rạc, không dùng được mobile | Note completion, signed encounter time |
| Quản lý chuỗi | So sánh cơ sở, doanh thu, SLA, chất lượng | Báo cáo không đồng nhất, khó đối soát | Revenue reconciliation, utilization |
| Dược/lab/đối tác | Nhận order, trạng thái, bằng chứng giao nhận | Order sai/thiếu, tranh chấp | Fulfillment SLA, dispute rate |
| Compliance/auditor | Truy vết ai xem/sửa dữ liệu nào | Log thiếu, quyền quá rộng | Audit completeness, incident MTTR |

## 3. Core journeys

**Đặt lịch:** người dùng nhập số điện thoại chuẩn hóa, chọn cơ sở/dịch vụ/bác sĩ/slot, xem giá–thời lượng–chính sách hủy, giữ slot ngắn trong transaction, xác nhận bằng OTP hoặc tài khoản, nhận mã booking và nhắc lịch. Người thân có thể đặt cho dependent với consent phù hợp.

**Đến khám:** lễ tân tìm hồ sơ theo số điện thoại/mã bệnh nhân, hệ thống hiển thị candidate trùng để xác nhận chứ không tự merge; check-in phát số queue; điều dưỡng triage; bác sĩ mở encounter. Khi submit, encounter và prescription/lab order được khóa; sửa sai tạo amendment có lý do, người sửa và thời điểm.

**Thanh toán:** tạo billing intent có idempotency key; hiển thị pending/paid/failed/refunded; webhook phải kiểm chữ ký, timestamp, event dedupe và out-of-order; refund/dispute đi qua policy và có audit. ERPNext là nguồn cho invoice/ledger, platform là nguồn trải nghiệm và trạng thái điều phối.

**Sau khám:** gửi đơn thuốc/kết quả được cấp quyền, nhắc tái khám, khảo sát chỉ sau service completion, review chỉ từ booking hoàn tất; không cho provider mua điểm hoặc xóa review tiêu cực ngoài quy trình moderation.

## 4. Gap analysis theo đối thủ

| Nhóm sản phẩm | Họ làm tốt | Khoảng trống có thể khai thác | Quyết định |
|---|---|---|---|
| Booking marketplace như Docosan/Medpro | Tìm, so sánh, review, đặt lịch, provider portal; Docosan từng xác minh giấy phép và công bố giá.[1] | Phân mảnh vận hành sau booking, EMR/queue/ERP reconciliation chưa phải lõi | Khác biệt bằng clinic operating layer và integration reliability |
| Chuỗi pharmacy như Long Châu/Pharmacity | Tồn kho, giao nhanh, thương hiệu, app, loyalty | Không tối ưu clinical workflow đa cơ sở và encounter longitudinal | Tích hợp đối tác pharmacy thay vì cạnh tranh retail sớm |
| Bệnh viện/HIS/ERP | Hồ sơ và tài chính nội bộ | UX patient/mobile, discovery, partner network, consent chia sẻ | Bọc ERPNext bằng gateway và patient experience |
| Super-app/social commerce | Discovery, livestream, voucher, chat, thanh toán | Rủi ro chất lượng/y tế, thiếu audit lâm sàng | Chỉ dùng social content/livestream có moderation và claim policy |
| Quốc tế như Zocdoc/Doctolib | Scheduling, reminder, insurance/clinical ecosystem | Giả định payment, bảo hiểm, identity và hành vi khác Việt Nam | Học pattern, bản địa hóa số điện thoại, QR, người thân, COD |

## 5. Ưu tiên tính năng

Điểm ưu tiên = **Business Value × User Value × Market Demand × Technical Feasibility**, mỗi trục 1–5. Điểm dưới đây dùng để sắp xếp backlog, không phải dự báo doanh thu.

| Tính năng | BV | UV | Demand | Feasibility | Tổng | MoSCoW |
|---|---:|---:|---:|---:|---:|---|
| Auth, RBAC, tenant/facility scope, audit | 5 | 5 | 5 | 4 | 500 | Must Have |
| Patient dedup + dependent profile | 5 | 5 | 5 | 4 | 500 | Must Have |
| Appointment state machine + concurrency/idempotency | 5 | 5 | 5 | 4 | 500 | Must Have |
| Queue/check-in và no-show policy | 5 | 5 | 5 | 4 | 500 | Must Have |
| Encounter sign/amend, prescription/lab order | 5 | 5 | 5 | 3 | 375 | Must Have |
| Billing intent, payment webhook, refund/dispute | 5 | 5 | 5 | 3 | 375 | Must Have |
| ERPNext sync/retry/dead-letter/reconciliation | 5 | 4 | 5 | 3 | 300 | Must Have |
| Vietnamese locale, timezone, phone, QR/invoice adapter | 4 | 5 | 5 | 4 | 400 | Must Have |
| Patient portal, notifications, reminders | 4 | 5 | 5 | 4 | 400 | Should Have |
| Verified review/reputation/moderation | 4 | 4 | 4 | 4 | 256 | Should Have |
| Search/discovery, filter price/location/specialty | 4 | 5 | 4 | 3 | 240 | Should Have |
| Stock/expiry, partner referral, FHIR/DICOM boundary | 4 | 4 | 3 | 3 | 144 | Should Have |
| Recommendation/personalization | 3 | 4 | 3 | 3 | 108 | Could Have |
| AI assistant for administrative navigation/summarization | 3 | 4 | 3 | 3 | 108 | Could Have |
| Moderated health education/live content | 3 | 3 | 3 | 2 | 54 | Could Have |
| Full social feed, open marketplace, own delivery fleet, own wallet | 2 | 2 | 2 | 1 | 16 | Not Now |

## 6. Phạm vi theo phiên bản

| Phiên bản | Phạm vi |
|---|---|
| MVP | Auth/RBAC/scope; patient registration/dedup; appointment + availability + concurrency; queue/check-in; encounter sign/amend; prescription/lab order; billing intent; ERPNext typed client; outbox/retry/DLQ; audit/redaction; API validation; Vietnamese locale; admin operations; unit/integration tests |
| V1 | Patient/dependent portal; OTP; reminder qua adapter; review verified; discovery/search; refund/dispute UI; dashboards; stock/expiry alerts; configurable policy; backup/restore drills; browser/mobile E2E |
| V2 | FHIR export/import boundary; DICOM/PACS links; insurance claim adapter; referral/partner fulfillment; analytics warehouse; recommendation with consent; AI administrative copilot with human review |
| Future | Moderated provider content/live consult; predictive no-show/fraud; regional expansion; multi-language beyond Vietnamese/English; marketplace services; selective logistics orchestration |
| Not Now | AI diagnosis/prescribing autonomous; open medical claims marketplace; storing card data; own wallet; unmoderated reviews/livestream; microservices for every feature; custom delivery fleet |

## 7. Business and monetization model

B2B SaaS theo tenant/cơ sở với phí nền tảng theo active provider hoặc appointment volume; add-on cho patient engagement, reports, integration và storage; phí onboarding/data migration; marketplace lead fee chỉ khi có booking hoàn tất và không được ảnh hưởng ranking; payment pass-through minh bạch. Không monetise bằng bán dữ liệu sức khỏe hoặc quảng cáo nhắm mục tiêu dựa trên hồ sơ nhạy cảm.

## 8. Trust, risk và compliance-by-design

Verification gồm pháp nhân/cơ sở, giấy phép hoạt động, giấy phép hành nghề, bank/settlement identity và người đại diện. Trust signals phải có nguồn, ngày xác minh, trạng thái hết hạn và quy trình suspension. Fraud controls gồm rate limit OTP, device/IP velocity, duplicate booking, refund abuse, webhook signature, replay protection, anomaly queue và manual review.

Dữ liệu clinical tách khỏi operational profile; field-level authorization ở service layer; secrets server-only; encryption at rest/in transit; redact PII/PHI trong log; immutable audit; export/delete/restrict workflows; retention theo loại dữ liệu; consent versioning; backup encrypted và restore drill. AI chỉ được dùng cho tìm kiếm, tóm tắt hành chính hoặc gợi ý điều phối có giải thích và human-in-the-loop; không suy luận chẩn đoán trong MVP.

## 9. North-star metrics và quality gates

North-star là **completed care episodes với trải nghiệm an toàn**, không phải số appointment tạo ra. Theo dõi booking completion, median time-to-book, wait time, no-show, duplicate patient rate, signed encounter SLA, payment reconciliation lag, review verified rate, dispute rate, p95 latency, failed sync/DLQ, audit coverage và security incident MTTR.

Không gọi tính năng hoàn tất nếu chỉ compile: phải có unit/integration/E2E phù hợp, negative authorization tests, concurrency test cho booking, webhook replay/out-of-order test, responsive/mobile check, sanitized error, metrics/logging, migration rollback/restore evidence và documentation.

## References

[1]: https://innovations.bmj.com/content/7/Suppl_1/s16 "Digital marketplace to improve healthcare access and transparency in Vietnam – BMJ Innovations"
[2]: https://moit.gov.vn/khoa-hoc-va-cong-nghe/thuong-mai-dien-tu-viet-nam-nam-2024-nhung-buoc-tien-va-thach-thuc.html "Bộ Công Thương – Thương mại điện tử Việt Nam năm 2024"
[3]: https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc "Bộ Y tế – Văn bản pháp lý có hiệu lực về bệnh án điện tử"
[4]: https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-465185.aspx "Nghị định 13/2023/NĐ-CP – Bảo vệ dữ liệu cá nhân"
[5]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8867296/ "Digital Health Policy and Programs for Hospital Care in Vietnam: Scoping Review"
[6]: https://en.baochinhphu.vn/viet-nams-e-commerce-market-up-20-in-2024-111250107155234946.htm "Government News – Viet Nam’s e-commerce hits US$25 billion in 2024"
