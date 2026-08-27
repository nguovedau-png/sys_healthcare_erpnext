"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PACKAGES } from '../mockData';

export default function PackageDetailPage() {
    const params = useParams<{ id: string }>();
    const pkg = PACKAGES.find(p => p.id === params.id);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    if (!pkg) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Không tìm thấy gói khám</h1>
                    <Link href="/packages" className="text-primary hover:underline">Quay lại danh sách</Link>
                </div>
            </div>
        );
    }

    const handleBooking = () => {
        // Mock booking action
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-primary">Trang chủ</Link>
                        <span>/</span>
                        <Link href="/packages" className="hover:text-primary">Gói khám</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium truncate">{pkg.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Gallery & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Image */}
                        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                            <div className="relative rounded-xl overflow-hidden aspect-video">
                                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                {pkg.discount > 0 && (
                                    <span className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        Giảm {pkg.discount}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Package Info */}
                        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-100">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{pkg.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <i className="fi flaticon-hospital text-xl text-primary"></i>
                                    <span className="font-bold">{pkg.hospitalName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <i className="fi flaticon-placeholder"></i>
                                    <span>{pkg.hospitalAddress}</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <i className="fi flaticon-star"></i>
                                    <span>{pkg.rating} ({pkg.reviews} đánh giá)</span>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {pkg.description}
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">Chi tiết gói khám</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {pkg.details.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <i className="fi flaticon-check text-green-600 text-[10px] font-bold"></i>
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hospital Info */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin cơ sở y tế</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <i className="fi flaticon-hospital text-3xl text-gray-400"></i>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-lg">{pkg.hospitalName}</div>
                                    <div className="text-sm text-gray-500">{pkg.hospitalAddress}</div>
                                </div>
                                <Link href={`/search?keyword=${pkg.hospitalName}`} className="ml-auto text-primary font-bold text-sm hover:underline">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sticky top-24">
                            <div className="text-center mb-6">
                                <span className="text-gray-400 line-through text-sm block mb-1">Giá gốc: {pkg.originalPrice.toLocaleString()}đ</span>
                                <div className="text-3xl font-extrabold text-primary">
                                    {pkg.price.toLocaleString()}đ
                                </div>
                                <div className="text-xs text-green-600 font-bold bg-green-50 inline-block px-2 py-1 rounded mt-2">
                                    Tiết kiệm {(pkg.originalPrice - pkg.price).toLocaleString()}đ
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all text-lg mb-4 flex items-center justify-center gap-2"
                            >
                                <i className="fi flaticon-calendar"></i>
                                Đặt lịch ngay
                            </button>

                            <button className="w-full bg-white text-gray-700 font-bold py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <i className="fi flaticon-chat"></i>
                                Tư vấn miễn phí
                            </button>

                            <div className="mt-6 space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fi flaticon-shield text-primary"></i>
                                    <span>Bảo mật thông tin tuyệt đối</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fi flaticon-credit-card text-primary"></i>
                                    <span>Thanh toán online hoặc tại CSYT</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fi flaticon-24-hours text-primary"></i>
                                    <span>Hỗ trợ đặt lịch 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {bookingSuccess && (
                <div className="fixed top-24 right-4 bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in p-4 z-50">
                    <i className="fi flaticon-check text-xl"></i>
                    <div>
                        <div className="font-bold">Đặt lịch thành công!</div>
                        <div className="text-sm">Chúng tôi sẽ liên hệ lại trong 5 phút.</div>
                    </div>
                </div>
            )}
        </div>
    );
}
