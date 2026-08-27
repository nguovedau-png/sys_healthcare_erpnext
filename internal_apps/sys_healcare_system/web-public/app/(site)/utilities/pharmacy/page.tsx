"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function PharmacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2 space-y-6">
                        <span className="text-green-600 font-bold bg-green-50 px-4 py-1 rounded-full uppercase text-sm">Nhà thuốc trực tuyến</span>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">Mua thuốc dễ dàng, giao hàng tận nơi</h1>
                        <p className="text-gray-500 text-lg">Chụp ảnh đơn thuốc hoặc nhập tên thuốc, Dược sĩ chuyên môn sẽ tư vấn và báo giá ngay cho bạn.</p>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-white hover:border-green-500 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                    <i className="fi flaticon-camera text-3xl text-gray-400 group-hover:text-green-600"></i>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">Tải lên đơn thuốc</h3>
                                <p className="text-gray-500 text-sm">Chạm để chụp hoặc chọn ảnh</p>
                            </div>
                            <div className="mt-4 text-center">
                                <button className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-green-700 transition-all">Gửi yêu cầu báo giá</button>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <i className="fi flaticon-pharmacy text-4xl text-green-500 mb-4 inline-block"></i>
                                <h3 className="font-bold text-gray-900 mb-2">Thuốc chính hãng</h3>
                                <p className="text-sm text-gray-500">100% thuốc có nguồn gốc rõ ràng, đạt chuẩn GPP.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <i className="fi flaticon-delivery-truck text-4xl text-blue-500 mb-4 inline-block"></i>
                                <h3 className="font-bold text-gray-900 mb-2">Giao nhanh 2h</h3>
                                <p className="text-sm text-gray-500">Miễn phí vận chuyển cho đơn hàng từ 300k.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <i className="fi flaticon-pharmacist text-4xl text-pink-500 mb-4 inline-block"></i>
                                <h3 className="font-bold text-gray-900 mb-2">Dược sĩ tư vấn</h3>
                                <p className="text-sm text-gray-500">Hỗ trợ tư vấn sử dụng thuốc an toàn, hiệu quả.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <i className="fi flaticon-price-tag text-4xl text-orange-500 mb-4 inline-block"></i>
                                <h3 className="font-bold text-gray-900 mb-2">Giá tốt mỗi ngày</h3>
                                <p className="text-sm text-gray-500">Luôn có ưu đãi giảm giá và quà tặng hấp dẫn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
