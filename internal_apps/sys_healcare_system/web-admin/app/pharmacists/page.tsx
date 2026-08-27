"use client";

import React, { useState, useEffect } from 'react';
import partnerService, { Pharmacist } from '@/services/partner.service';
import { MEMBER_RANKS } from '@/types/pharmacy';

export default function PharmacistsManagementPage() {
    const [selectedPharmacist, setSelectedPharmacist] = useState<Pharmacist | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0,
        verified: 0,
        platinumPlus: 0
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await partnerService.getPharmacists();
            setPharmacists(data);

            // Calculate stats
            setStats({
                total: data.length,
                active: data.filter(p => p.status === 'active').length,
                pending: data.filter(p => p.status === 'pending').length,
                verified: data.filter(p => p.isVerified).length,
                platinumPlus: data.filter(p => ['platinum', 'diamond'].includes(p.memberRank || '')).length
            });
        } catch (error) {
            console.error('Failed to fetch pharmacists', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (pharmacist: Pharmacist) => {
        setSelectedPharmacist(pharmacist);
        setShowEditModal(true);
    };

    const handleVerify = async (id: number) => {
        try {
            await partnerService.updatePharmacist(id, { isVerified: true, status: 'active' });
            fetchData();
        } catch (error) {
            alert('Lỗi khi duyệt dược sĩ');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Dược sĩ</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thông tin và xác minh dược sĩ</p>
                </div>
                <button
                    onClick={() => alert('Chức năng thêm dược sĩ đang được phát triển')}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/25 transition active:scale-95"
                >
                    <i className="fi flaticon-add mr-2"></i> Thêm dược sĩ
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng dược sĩ', value: stats.total.toLocaleString(), icon: 'flaticon-user', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: stats.active.toLocaleString(), icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Chờ xác minh', value: stats.pending.toLocaleString(), icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Đã xác minh', value: stats.verified.toLocaleString(), icon: 'flaticon-verified', color: 'bg-purple-500' },
                    { label: 'Platinum+', value: stats.platinumPlus.toLocaleString(), icon: 'flaticon-star', color: 'bg-yellow-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transform hover:scale-[1.02] transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}/20`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Tất cả trạng thái</option>
                        <option>Hoạt động</option>
                        <option>Tạm dừng</option>
                        <option>Chờ xác minh</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Tất cả chuyên môn</option>
                        <option>Dược lâm sàng</option>
                        <option>Dược học cổ truyền</option>
                        <option>Dược công nghiệp</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Tất cả hạng</option>
                        <option>Diamond</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm theo tên hoặc SDT..." className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
            </div>

            {/* Pharmacists List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                        <div className="text-gray-500 italic flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            Đang tải danh sách dược sĩ...
                        </div>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Dược sĩ</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Chuyên môn</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Vị trí</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Địa chỉ</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Điểm CME</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Hạng</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pharmacists.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Chưa có dữ liệu dược sĩ.</td>
                                </tr>
                            ) : (
                                pharmacists.map((pharmacist) => {
                                    const rankInfo = MEMBER_RANKS[(pharmacist.memberRank as keyof typeof MEMBER_RANKS) || 'bronze'];
                                    return (
                                        <tr key={pharmacist.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
                                                        <span className="text-xl">👨‍⚕️</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{pharmacist.fullName}</p>
                                                        <p className="text-xs text-gray-500">{pharmacist.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
                                                    {pharmacist.specialistly || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">{pharmacist.career || '---'}</td>
                                            <td className="px-6 py-4 text-gray-600 text-xs max-w-xs truncate" title={pharmacist.address}>
                                                {pharmacist.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-blue-600">{(pharmacist.pointsCMEOnline || 0).toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">{rankInfo.icon}</span>
                                                    <span className="font-bold text-[11px]" style={{ color: rankInfo.color }}>
                                                        {(pharmacist.memberRank || 'bronze').toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${pharmacist.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    pharmacist.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                        'bg-gray-50 text-gray-700 border-gray-100'
                                                    }`}>
                                                    {pharmacist.status === 'active' ? 'HOẠT ĐỘNG' :
                                                        pharmacist.status === 'pending' ? 'CHỜ DUYỆT' : 'TẠM DỪNG'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(pharmacist)}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition active:scale-95"
                                                    >
                                                        Xem
                                                    </button>
                                                    {pharmacist.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleVerify(pharmacist.id)}
                                                            className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition active:scale-95 shadow-sm"
                                                        >
                                                            Duyệt
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedPharmacist && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-fade-in text-gray-900 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">Chi tiết Dược sĩ</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                                <input type="text" value={selectedPharmacist.fullName} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                <input type="text" value={selectedPharmacist.phoneNumber} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chuyên môn</label>
                                <input type="text" value={selectedPharmacist.specialistly || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Vị trí/Nghề nghiệp</label>
                                <input type="text" value={selectedPharmacist.career || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ đầy đủ</label>
                                <input type="text" value={selectedPharmacist.address} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tỉnh/Thành</label>
                                <input type="text" value={selectedPharmacist.provinceCode || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Quận/Huyện</label>
                                <input type="text" value={selectedPharmacist.districtCode || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>

                            {/* Gamification */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Điểm CME Online</label>
                                <input type="number" value={selectedPharmacist.pointsCMEOnline || 0} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hạng thành viên</label>
                                <select value={selectedPharmacist.memberRank || 'bronze'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option value="bronze">Bronze</option>
                                    <option value="silver">Silver</option>
                                    <option value="gold">Gold</option>
                                    <option value="platinum">Platinum</option>
                                    <option value="diamond">Diamond</option>
                                </select>
                            </div>

                            {/* System */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">OS</label>
                                <input type="text" value={selectedPharmacist.os || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SC Name</label>
                                <input type="text" value={selectedPharmacist.scName || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tạo</label>
                                <input type="text" value={selectedPharmacist.createdAt ? new Date(selectedPharmacist.createdAt).toLocaleDateString() : '---'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>

                            {/* Marketing */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Dynamic Link</label>
                                <input type="text" value={selectedPharmacist.dynamicLink || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select value={selectedPharmacist.status || 'active'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Tạm dừng</option>
                                    <option value="pending">Chờ duyệt</option>
                                    <option value="suspended">Đình chỉ</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition active:scale-95">
                                Đóng
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition active:scale-95 shadow-lg shadow-primary/20">
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
