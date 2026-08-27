"use client";

import React, { useState, useEffect } from 'react';
import seminarService, { SeminarBanner, Seminar } from '@/services/seminar.service';

export default function SeminarBannersPage() {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [banners, setBanners] = useState<SeminarBanner[]>([]);
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
    const [searchText, setSearchText] = useState('');

    // Form fields
    const [selectedSeminarId, setSelectedSeminarId] = useState<string>('');
    const [priority, setPriority] = useState(1);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const [bannerResponse, seminarData] = await Promise.all([
                seminarService.getBanners(params),
                seminarService.getSeminars({ limit: 100 }) // Load some seminars for the dropdown
            ]);
            setBanners(bannerResponse.data);
            setTotal(bannerResponse.meta.total);
            setSeminars(seminarData.data);
        } catch (error) {
            console.error('Failed to fetch banner data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchData();
        }
    }, [searchText]);

    const handleUpload = async () => {
        if (!selectedSeminarId) return alert('Vui lòng chọn hội thảo');
        try {
            await seminarService.createBanner({
                seminarId: parseInt(selectedSeminarId),
                image: '/img/banner-1.jpg', // Placeholder for demo
                priority: priority
            });
            setShowUploadForm(false);
            fetchData();
        } catch (error) {
            console.error('Failed to upload banner', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Xóa banner này?')) {
            try {
                await seminarService.deleteBanner(id);
                fetchData();
            } catch (error) {
                console.error('Failed to delete banner', error);
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Banner Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Upload và quản lý banner cho các hội thảo</p>
                </div>
                <button
                    onClick={() => setShowUploadForm(true)}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                >
                    Upload Banner
                </button>
            </div>

            {/* Search */}
            <div className="max-w-md">
                <input
                    type="text"
                    placeholder="Tìm banner theo hội thảo..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-6"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Đang tải...</div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners.map((banner) => (
                            <div key={banner.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <img src={banner.image} alt={banner.seminar?.title} className="w-full h-48 object-cover" onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'} />
                                <div className="p-4">
                                    <p className="font-bold text-gray-900 mb-2">{banner.seminar?.title}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Thứ tự: {banner.priority}</span>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sửa</button>
                                            <button onClick={() => handleDelete(banner.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {banners.length === 0 && (
                            <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                                Chưa có banner nào
                            </div>
                        )}
                    </div>

                    {/* Simple Pagination Control */}
                    {total > pagination.pageSize && (
                        <div className="flex justify-center gap-2">
                            <button
                                disabled={pagination.current === 1}
                                onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50 font-bold"
                            >
                                Trước
                            </button>
                            <span className="px-4 py-2 font-bold">Trang {pagination.current} / {Math.ceil(total / pagination.pageSize)}</span>
                            <button
                                disabled={pagination.current >= Math.ceil(total / pagination.pageSize)}
                                onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50 font-bold"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showUploadForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Banner</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chọn Hội thảo</label>
                                <select
                                    value={selectedSeminarId}
                                    onChange={(e) => setSelectedSeminarId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white"
                                >
                                    <option value="">-- Chọn hội thảo --</option>
                                    {seminars.map(s => (
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image</label>
                                <input type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Thứ tự ưu tiên</label>
                                <input
                                    type="number"
                                    value={priority}
                                    onChange={(e) => setPriority(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setShowUploadForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Hủy</button>
                                <button onClick={handleUpload} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
