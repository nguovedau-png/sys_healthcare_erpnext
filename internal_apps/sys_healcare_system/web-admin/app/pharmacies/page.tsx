"use client";

import React, { useState, useEffect } from 'react';
import partnerService, { Pharmacy } from '@/services/partner.service';
import { MEMBER_RANKS } from '@/types/pharmacy';

export default function PharmaciesManagementPage() {
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0,
        gpp: 0,
        platinumPlus: 0
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await partnerService.getPharmacies();
            setPharmacies(data);

            // Calculate stats
            setStats({
                total: data.length,
                active: data.filter(p => p.status === 'active').length,
                pending: data.filter(p => p.status === 'pending').length,
                gpp: data.filter(p => !!p.gppNumber).length,
                platinumPlus: data.filter(p => ['platinum', 'diamond'].includes(p.memberRank || '')).length
            });
        } catch (error) {
            console.error('Failed to fetch pharmacies', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (pharmacy: Pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setShowEditModal(true);
    };

    const handleVerify = async (id: number) => {
        try {
            await partnerService.updatePharmacy(id, { isVerified: true, status: 'active' });
            fetchData();
        } catch (error) {
            alert('Lỗi khi duyệt nhà thuốc');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhà thuốc</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý thông tin và xác minh nhà thuốc</p>
                </div>
                <button
                    onClick={() => alert('Chức năng thêm nhà thuốc đang được phát triển')}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/25 transition active:scale-95"
                >
                    <i className="fi flaticon-add mr-2"></i> Thêm nhà thuốc
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng nhà thuốc', value: stats.total.toLocaleString(), icon: 'flaticon-pharmacy', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: stats.active.toLocaleString(), icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Chờ xác minh', value: stats.pending.toLocaleString(), icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Có GPP', value: stats.gpp.toLocaleString(), icon: 'flaticon-certificate', color: 'bg-purple-500' },
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
                        <option>Tất cả hạng</option>
                        <option>Diamond</option>
                        <option>Platinum</option>
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Tất cả tỉnh/thành</option>
                        <option>TP. Hồ Chí Minh</option>
                        <option>Hà Nội</option>
                        <option>Đà Nẵng</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm theo tên hoặc SDT..." className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
            </div>

            {/* Pharmacies List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px] relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                        <div className="text-gray-500 italic flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            Đang tải danh sách nhà thuốc...
                        </div>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Nhà thuốc</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Chủ sở hữu</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Địa chỉ</th>
                                <th className="px-6 py-4 font-bold text-gray-700">GPP</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Điểm CME</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Hạng</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pharmacies.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Chưa có dữ liệu nhà thuốc.</td>
                                </tr>
                            ) : (
                                pharmacies.map((pharmacy) => {
                                    const rankInfo = MEMBER_RANKS[(pharmacy.memberRank as keyof typeof MEMBER_RANKS) || 'bronze'];
                                    return (
                                        <tr key={pharmacy.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                                                        <span className="text-xl">💊</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{pharmacy.name}</p>
                                                        <p className="text-xs text-gray-500">{pharmacy.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{pharmacy.outletOwner || '---'}</td>
                                            <td className="px-6 py-4 text-gray-600 text-xs max-w-xs truncate" title={pharmacy.address}>
                                                {pharmacy.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {pharmacy.gppNumber ? (
                                                    <div>
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold">
                                                            ✓ CÓ GPP
                                                        </span>
                                                        <p className="text-[11px] text-gray-500 mt-1">{pharmacy.gppNumber}</p>
                                                    </div>
                                                ) : (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[10px] font-bold">
                                                        CHƯA CẬP NHẬT
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-blue-600">{(pharmacy.pointsCMEOnline || 0).toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">{rankInfo.icon}</span>
                                                    <span className="font-bold text-[11px]" style={{ color: rankInfo.color }}>
                                                        {(pharmacy.memberRank || 'bronze').toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${pharmacy.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    pharmacy.status === 'pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                        'bg-gray-50 text-gray-700 border-gray-100'
                                                    }`}>
                                                    {pharmacy.status === 'active' ? 'HOẠT ĐỘNG' :
                                                        pharmacy.status === 'pending' ? 'CHỜ DUYỆT' : 'TẠM DỪNG'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(pharmacy)}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition active:scale-95"
                                                    >
                                                        Xem
                                                    </button>
                                                    {pharmacy.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleVerify(pharmacy.id)}
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
            {showEditModal && selectedPharmacy && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Chi tiết Nhà thuốc</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên nhà thuốc</label>
                                <input type="text" value={selectedPharmacy.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chủ sở hữu</label>
                                <input type="text" value={selectedPharmacy.outletOwner || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                                <input type="text" value={selectedPharmacy.phone} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tạo</label>
                                <input type="text" value={selectedPharmacy.createdAt ? new Date(selectedPharmacy.createdAt).toLocaleDateString() : '---'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ đầy đủ</label>
                                <input type="text" value={selectedPharmacy.address} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tỉnh/Thành</label>
                                <input type="text" value={selectedPharmacy.provinceCode || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Quận/Huyện</label>
                                <input type="text" value={selectedPharmacy.districtCode || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>

                            {/* GPP */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Số GPP</label>
                                <input type="text" value={selectedPharmacy.gppNumber || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh GPP</label>
                                <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                                    <span className="text-gray-500 text-sm font-medium">Xem ảnh GPP</span>
                                </div>
                            </div>

                            {/* Gamification */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Điểm CME Online</label>
                                <input type="number" value={selectedPharmacy.pointsCMEOnline || 0} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hạng thành viên</label>
                                <select value={selectedPharmacy.memberRank || 'bronze'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 outline-none">
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
                                <input type="text" value={selectedPharmacy.os || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">SC Name</label>
                                <input type="text" value={selectedPharmacy.scName || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed" readOnly />
                            </div>

                            {/* Status */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
                                <select value={selectedPharmacy.status || 'active'} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 outline-none">
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
