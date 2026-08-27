'use client';

import React from 'react';
import Link from 'next/link';

export default function SearchPage() {
    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Tìm kiếm thảo luận</h1>
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <i className="fi flaticon-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                    </div>
                    <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30">
                        Tìm kiếm
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-green-500">
                        <option>Tất cả chuyên mục</option>
                        <option>Dinh dưỡng</option>
                        <option>Bệnh lý</option>
                    </select>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-green-500">
                        <option>Tất cả thời gian</option>
                        <option>24 giờ qua</option>
                        <option>Tuần này</option>
                        <option>Tháng này</option>
                    </select>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-green-500">
                        <option>Sắp xếp: Liên quan nhất</option>
                        <option>Mới nhất</option>
                        <option>Nhiều tương tác nhất</option>
                    </select>
                </div>
            </div>

            {/* Results Mockup */}
            <h2 className="font-bold text-gray-700">Kết quả tìm kiếm phù hợp (3)</h2>
            <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-4 hover:border-green-200 transition-colors">
                        <div className="flex-1">
                            <Link href={`/forum/${item}`} className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors">
                                Triệu chứng cảm cúm và cách phân biệt với COVID-19
                            </Link>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                Gần đây thời tiết thay đổi, mình thấy nhiều người hắt hơi sổ mũi. Làm sao để biết chắc chắn mình không bị...
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                <span className="font-bold text-gray-700">Dr. Smith</span>
                                <span>•</span>
                                <span className="text-gray-400">2 ngày trước</span>
                                <span>•</span>
                                <span className="bg-gray-100 px-2 py-1 rounded">Bệnh lý</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
