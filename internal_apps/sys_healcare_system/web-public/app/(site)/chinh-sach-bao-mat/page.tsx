"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                        CHÍNH SÁCH BẢO MẬT THÔNG TIN
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 text-center">
                        (Theo Điều Kiện & Điều Khoản PharmaCom)
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Mục đích thu thập thông tin Người dùng / Khách hàng</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Khi truy cập và sử dụng các tính năng và dịch vụ trên ứng dụng di động (gọi tắt PharmaCom) Người dùng/ Khách hàng có thể sẽ được yêu cầu đăng ký với chúng tôi thông tin cá nhân bao gồm họ tên, số điện thoại, email cá nhân… PharmaCom không chịu mọi trách nhiệm liên quan đến pháp luật đối với thông tin Người dùng/ Khách hàng khai báo trên hệ thống.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Phạm vi sử dụng thông tin Người dùng/ Khách hàng</h2>
                            <p className="text-gray-600 leading-relaxed">
                                PharmaCom thu thập và sử dụng thông tin cá nhân của Người dùng/ Khách hàng với mục đích phù hợp, không vi phạm pháp luật và hoàn toàn tuân thủ nội dung của "Chính sách bảo mật" này. Chúng tôi có thể sử dụng những thông tin cá nhân của Người dùng/ Khách hàng để liên hệ trực tiếp với Người dùng/ Khách hàng dưới các hình thức như: gởi thư ngỏ, thư cảm ơn, tin nhắn, các chương trình của PharmaCom cũng như những thay đổi trong chính sách liên quan đến quyền lợi của Người dùng/ Khách hàng.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Thời gian lưu trữ thông tin Người dùng/ Khách hàng</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Dữ liệu cá nhân của Người dùng/ Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc Người dùng/ Khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật tuyệt đối trên máy chủ của PharmaCom.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h2>
                            <div className="text-gray-600 leading-relaxed">
                                <p className="mb-2"><strong>Công ty cổ phần Truyền thông Medihub</strong></p>
                                <p className="mb-2">Địa ch��: 302 Lê Văn Sỹ, Phường 1, Quận Tân Bình, Thành phố Hồ Chí Minh.</p>
                                <p>Điện thoại: (028) 73 099 939</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Phương tiện và công cụ để Người dùng/ Khách hàng tiếp cận và chỉnh sửa dữ liệu cá nhân</h2>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                Người dùng/ Khách hàng có thể chỉnh sửa thông tin cá nhân của mình bằng những cách sau:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Thực hiện đăng nhập tài khoản của mình và chỉnh sửa ngay trên PharmaCom</li>
                                <li>Người dùng/ Khách hàng cũng có thể gọi điện thoại cho chúng tôi qua số điện thoại (028) 73 099 939</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Cam kết bảo mật thông tin cá nhân của Người dùng/ Khách hàng</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Thông tin cá nhân của Người dùng/ Khách hàng cung cấp cho chúng tôi thông qua PharmaCom được chúng tôi cam kết bảo mật tuyệt đối theo Chính sách bảo mật thông tin này và theo các quy định pháp luật. Việc thu thập và sử dụng thông tin của Người dùng/ Khách hàng chỉ được thực hiện khi có sự đồng ý của Người dùng/ Khách hàng hoặc các trường hợp khác do pháp luật quy định.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                PharmaCom cam kết không tiết lộ, cung cấp cho bên thứ ba khác những thông tin của Người dùng khi chưa được sự đồng ý từ Người dùng.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                PharmaCom không chịu trách nhiệm về tính xác thực cũng như mọi trách nhiệm liên quan đến pháp luật đối với các thông tin do Người dùng/ Khách hàng khai báo.
                            </p>
                        </section>


                    </div>
                </div>
            </div>
        </div>
    );
}