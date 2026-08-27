'use client';

import React from 'react';

export default function RulesPage() {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <i className="fi flaticon-info text-blue-500"></i>
                Nội quy Diễn đàn
            </h1>
            <p className="text-gray-500 mb-8 text-lg">
                Chào mừng bạn đến với cộng đồng. Để duy trì một môi trường thảo luận lành mạnh, bổ ích và tôn trọng lẫn nhau, vui lòng tuân thủ các quy định sau.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 text-green-600">1. Tôn trọng và Văn minh</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Không sử dụng ngôn từ thô tục, xúc phạm, đe dọa hoặc quấy rối các thành viên khác.</li>
                        <li>Tôn trọng sự khác biệt về quan điểm, tôn giáo, sắc tộc và giới tính.</li>
                        <li>Không gây gổ, kích động bạo lực hoặc chia rẽ nội bộ.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 text-green-600">2. Chất lượng Nội dung</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Đăng bài đúng chuyên mục. Tiêu đề cần rõ ràng, phản ánh đúng nội dung bài viết.</li>
                        <li>Không spaam (đăng nhiều bài cùng nội dung), không đăng quảng cáo trái phép.</li>
                        <li>Nội dung y tế, sức khỏe cần có cơ sở khoa học hoặc trích dẫn nguồn uy tín. Không lan truyền tin giả (fake news).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 text-green-600">3. Quyền Riêng Tư và Bản Quyền</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Không chia sẻ thông tin cá nhân nhạy cảm của bản thân hoặc người khác (số điện thoại, địa chỉ nhà, hồ sơ bệnh án...).</li>
                        <li>Tôn trọng bản quyền tác giả. Trích dẫn nguồn khi sử dụng nội dung của người khác.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 text-green-600">4. Xử lý vi phạm</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Ban quản trị có quyền xóa bài, khóa tài khoản tạm thời hoặc vĩnh viễn đối với các thành viên vi phạm nội quy mà không cần báo trước.
                        Nếu bạn phát hiện bài viết vi phạm, hãy sử dụng tính năng "Báo cáo" để thông báo cho chúng tôi.
                    </p>
                </section>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <p className="text-blue-800 font-medium mb-4">Bạn đã hiểu rõ nội quy?</p>
                <a href="/forum" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                    Tham gia thảo luận ngay
                </a>
            </div>
        </div>
    );
}
