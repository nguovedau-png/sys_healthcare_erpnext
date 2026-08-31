"use client";
import React, { useState, useEffect } from 'react';
import seminarService, { SeminarSpeaker } from '@/services/seminar.service';
import { message } from 'antd';

export default function SeminarSpeakersPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [speakers, setSpeakers] = useState<SeminarSpeaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 8 }); // Smaller page size for grid
    const [searchText, setSearchText] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');

    const fetchSpeakers = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await seminarService.getSpeakers(params);
            setSpeakers(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch speakers:', error);
            message.error('Lỗi khi tải danh sách diễn giả');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpeakers();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchSpeakers();
        }
    }, [searchText]);

    const handleDelete = async (id: number) => {
        if (confirm('Xóa diễn giả này?')) {
            try {
                await seminarService.deleteSpeaker(id);
                fetchSpeakers();
            } catch (error) {
                console.error('Failed to delete speaker', error);
                message.error('Lỗi khi xóa diễn giả');
            }
        }
    };

    const handleAddSpeaker = async () => {
        try {
            await seminarService.createSpeaker({
                name,
                title,
                bio,
                photo: '/img/speaker-1.jpg'
            });
            setShowAddModal(false);
            setName('');
            setTitle('');
            setBio('');
            fetchSpeakers();
        } catch (error) {
            console.error('Failed to add speaker', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Diễn giả</h1>
                    <p className="text-gray-500 text-sm mt-1">Thêm và quản lý diễn giả cho hội thảo</p>
                </div>
                <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition">
                    Thêm Diễn giả
                </button>
            </div>

            {/* Search */}
            <div className="max-w-md">
                <input
                    type="text"
                    placeholder="Tìm diễn giả..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl mb-6"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Đang tải...</div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {speakers.map((speaker) => (
                            <div key={speaker.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center group relative">
                                <button
                                    onClick={() => handleDelete(speaker.id)}
                                    className="absolute top-2 right-2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
                                >
                                    <i className="fi flaticon-delete"></i>
                                </button>
                                <img src={speaker.photo || 'https://i.pravatar.cc/150'} alt={speaker.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary/10 object-cover" onError={(e) => (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150'} />
                                <h3 className="font-bold text-gray-900">{speaker.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{speaker.title}</p>
                                <p className="text-xs text-gray-400 italic mb-2 line-clamp-2">{speaker.bio}</p>
                            </div>
                        ))}
                        {speakers.length === 0 && (
                            <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                                Chưa có diễn giả nào
                            </div>
                        )}
                    </div>

                    {/* Simple Pagination Control */}
                    {total > pagination.pageSize && (
                        <div className="flex justify-center gap-2">
                            <button
                                disabled={pagination.current === 1}
                                onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50"
                            >
                                Trước
                            </button>
                            <span className="px-4 py-2">Trang {pagination.current} / {Math.ceil(total / pagination.pageSize)}</span>
                            <button
                                disabled={pagination.current >= Math.ceil(total / pagination.pageSize)}
                                onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Thêm Diễn giả mới</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ví dụ: TS. Nguyễn Văn A"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chức danh / Học hàm</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ví dụ: Giám đốc Bệnh viện"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiểu sử tóm tắt</label>
                                <textarea
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh đại diện</label>
                                <input type="file" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Hủy</button>
                                <button onClick={handleAddSpeaker} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
