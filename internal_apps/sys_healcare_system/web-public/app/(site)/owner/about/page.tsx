"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner page="others" />

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Sứ mệnh của chúng tôi</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Xây dựng nền tảng Y tế số toàn diện, giúp người dân dễ dàng tiếp cận dịch vụ chăm sóc sức khỏe chất lượng cao, minh bạch và tiện lợi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { title: 'Tận tâm', icon: 'flaticon-heart', desc: 'Luôn đặt người bệnh làm trung tâm trong mọi hoạt động.' },
                        { title: 'Chuyên nghiệp', icon: 'flaticon-doctor', desc: 'Hợp tác với đội ngũ y bác sĩ đầu ngành.' },
                        { title: 'Đổi mới', icon: 'flaticon-idea', desc: 'Ứng dụng công nghệ để giải quyết các bài toán y tế.' }
                    ].map(item => (
                        <div key={item.title} className="p-8 bg-gray-50 rounded-lg text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                <i className={`fi ${item.icon}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 lg:order-1">
                        <img src="/img/about-story.jpg" alt="Our Story" className="rounded-lg shadow-lg w-full" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Câu chuyện của chúng tôi</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Được thành lập vào năm 2021, Medical Ecosystem ra đời trong bối cảnh đại dịch COVID-19 bùng phát, khi nhu cầu khám chữa bệnh từ xa trở nên cấp thiết hơn bao giờ hết.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Từ một ứng dụng tư vấn sức khỏe đơn thuần, chúng tôi đã phát triển thành một hệ sinh thái y tế toàn diện, kết nối hơn 50 bệnh viện, 1000 bác sĩ và phục vụ hàng triệu người dùng trên khắp cả nước.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                                <div className="text-sm text-gray-500 font-bold">Đối tác Y tế</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">1M+</div>
                                <div className="text-sm text-gray-500 font-bold">Người dùng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
