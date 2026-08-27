"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

const MOCK_RESULTS = [
    { id: 1, type: 'doctor', name: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', price: 300000, rating: 4.9, distance: '2.5km' },
    { id: 2, type: 'hospital', name: 'Bệnh viện Đa khoa Quốc tế', specialty: 'Đa khoa', hospital: 'TP.HCM', price: 200000, rating: 4.7, distance: '5km' },
    { id: 3, type: 'doctor', name: 'ThS.BS Trần Thị B', specialty: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', price: 250000, rating: 5.0, distance: '3.2km' },
];

export default function AdvancedSearchPage() {
    const [filters, setFilters] = useState({
        specialty: '',
        location: '',
        priceRange: '',
        rating: ''
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Tìm kiếm nâng cao</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Bộ lọc</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Chuyên khoa</label>
                                    <select className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>Tất cả</option>
                                        <option>Tim mạch</option>
                                        <option>Nhi khoa</option>
                                        <option>Da liễu</option>
                                        <option>Tiêu hóa</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Khu vực</label>
                                    <select className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>Hà Nội</option>
                                        <option>Đà Nẵng</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Khoảng giá</label>
                                    <div className="space-y-2">
                                        {['Dưới 200k', '200k - 500k', '500k - 1tr', 'Trên 1tr'].map(range => (
                                            <label key={range} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4" />
                                                <span className="text-sm text-gray-700">{range}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Đánh giá</label>
                                    <div className="space-y-2">
                                        {[5, 4, 3].map(star => (
                                            <label key={star} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4" />
                                                <div className="flex items-center gap-1">
                                                    {Array(star).fill(0).map((_, i) => <i key={i} className="fi flaticon-star text-yellow-500 text-xs"></i>)}
                                                    <span className="text-sm text-gray-700">trở lên</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors">
                                    Áp dụng bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">Tìm thấy <strong>{MOCK_RESULTS.length}</strong> kết quả</p>
                            <select className="border border-gray-200 rounded-lg p-2 text-sm outline-none bg-white">
                                <option>Phù hợp nhất</option>
                                <option>Gần nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Đánh giá cao nhất</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {MOCK_RESULTS.map(item => (
                                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-6">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <i className={`fi ${item.type === 'doctor' ? 'flaticon-doctor' : 'flaticon-hospital'} text-4xl text-gray-400`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.specialty} • {item.hospital}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                                <i className="fi flaticon-star text-yellow-500 text-xs"></i>
                                                <span className="font-bold text-sm">{item.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <i className="fi flaticon-placeholder"></i> {item.distance}
                                            </span>
                                            <span className="flex items-center gap-1 text-green-600 font-bold">
                                                <i className="fi flaticon-money"></i> {item.price.toLocaleString()}đ
                                            </span>
                                        </div>
                                        <button className="bg-primary text-white font-bold px-6 py-2 rounded-xl hover:bg-primary-dark transition-colors">
                                            Đặt lịch ngay
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
