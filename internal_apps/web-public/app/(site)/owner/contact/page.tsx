"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">

                    {/* Contact Info */}
                    <div className="p-10 md:p-16 bg-blue-600 text-white">
                        <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>
                        <p className="text-blue-100 mb-10 leading-relaxed">
                            Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của bạn 24/7.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-map text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Trụ sở chính</h3>
                                    <p className="text-blue-100">58/10 Thành Thái, Phường 12, Quận 10, TP.HCM</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-call text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Hotline</h3>
                                    <p className="text-blue-100">(028) 73 099 939</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-email text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <p className="text-blue-100">lienhe@Healthe Care System.com.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-10 md:p-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ tên</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="Nguyễn Văn A" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="090..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Lời nhắn</label>
                                <textarea rows={4} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 resize-none" placeholder="Nội dung cần hỗ trợ..."></textarea>
                            </div>
                            <button type="button" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-primary-dark transition-all">
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-12 bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center text-gray-400">
                    Map iframe placeholder
                </div>
            </div>
        </div>
    );
}
