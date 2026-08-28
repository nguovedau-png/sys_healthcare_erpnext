# Phát hiện nghiên cứu từ nguồn web đã kiểm chứng

## Bộ Y tế – Bệnh án điện tử

Nguồn chính thức của Bộ Y tế cho biết đến 10:07 ngày 28/08/2026 có 1.264 cơ sở y tế tham gia bệnh án điện tử. Trang liệt kê Thông tư 54/2017/TT-BYT về bộ tiêu chí ứng dụng CNTT tại cơ sở khám chữa bệnh; Thông tư 46/2018/TT-BYT về lập, sử dụng và quản lý hồ sơ bệnh án điện tử, có hiệu lực từ 01/03/2019; và Quyết định 326/QĐ-BYT ngày 07/02/2024 về quy chế bảo đảm an toàn thông tin, an ninh mạng. Điều này củng cố yêu cầu thiết kế EMR với ký số, lưu trữ, kiểm soát truy cập, nhật ký và quy trình công bố/đánh giá thay vì chỉ xây một màn hình CRUD.

Nguồn: [Bộ Y tế – Văn bản pháp lý có hiệu lực về bệnh án điện tử](https://benhandientu.moh.gov.vn/van-bang-phap-ly-co-hieu-luc).

## Nguồn Chính phủ

URL Chính phủ được mở theo kết quả tìm kiếm nhưng trả về một thông tư Bộ Quốc phòng không liên quan đến Nghị định 13/2023/NĐ-CP. Không sử dụng trang này làm căn cứ nội dung; cần dùng đúng trang văn bản Nghị định 13/2023/NĐ-CP hoặc bản công báo/tra cứu pháp luật đáng tin cậy trước khi chốt yêu cầu chi tiết về dữ liệu cá nhân.

## Hàm ý thiết kế sơ bộ

1. Dữ liệu sức khỏe phải được coi là dữ liệu nhạy cảm; cần phân quyền deny-by-default, tenant/facility scope, audit log bất biến và cơ chế consent/amendment.
2. Không tuyên bố sản phẩm tuân thủ pháp luật chỉ dựa trên code; cần checklist thẩm định tại cơ sở, chính sách lưu trữ, ký số, sao lưu/khôi phục, xử lý sự cố và phê duyệt nghiệp vụ.
3. Tập trung MVP vào outpatient core, đặt nền tảng tích hợp ERPNext có idempotency, retry và dead-letter; trì hoãn microservices hoặc marketplace y tế mở rộng cho đến khi core ổn định.
