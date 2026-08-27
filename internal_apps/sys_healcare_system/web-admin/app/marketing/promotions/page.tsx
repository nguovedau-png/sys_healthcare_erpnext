"use client";

import React, { useState, useEffect } from 'react';
import { Promotion, PromotionStats, getStatusText, getStatusColor, getTypeText, getSystemSourceText } from '@/types/promotion';
import marketingService from '@/services/marketing.service';

export default function PromotionManagementPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            const data = await marketingService.getPromotions();
            setPromotions(data as any);
        } catch (error) {
            console.error('Failed to fetch promotions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    // Dynamic stats
    const stats: PromotionStats = {
        totalPromotions: promotions.length,
        activePromotions: promotions.filter(p => p.status === '01').length,
        inactivePromotions: promotions.filter(p => p.status === '02').length,
        systemPromotions: promotions.filter(p => p.isSystem).length,
        userPromotions: promotions.filter(p => !p.isSystem).length
    };

    const handleEdit = (promo: Promotion) => {
        setSelectedPromotion(promo);
        setShowEditModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa chương trình này?')) {
            await marketingService.deletePromotion(id);
            fetchPromotions();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Khuyến mãi</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý các chương trình khuyến mãi và ưu đãi</p>
                </div>
                <button
                    onClick={async () => {
                        await marketingService.createPromotion({
                            code: 'NEW' + Math.floor(Math.random() * 1000),
                            name: 'Chương trình mới ' + new Date().toLocaleTimeString(),
                            createDate: new Date().toISOString(),
                            endDate: '2025-12-31',
                            systemSource: 'admin',
                            link: '#',
                            type: 'discount',
                            isSystem: false,
                            status: '01',
                            userNameCreate: 'Admin'
                        });
                        fetchPromotions();
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark"
                >
                    <i className="fi flaticon-add mr-2"></i> Tạo khuyến mãi
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng chương trình', value: stats.totalPromotions.toString(), icon: 'flaticon-gift', color: 'bg-blue-500' },
                    { label: 'Đang hoạt động', value: stats.activePromotions.toString(), icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Tạm dừng', value: stats.inactivePromotions.toString(), icon: 'flaticon-pause', color: 'bg-orange-500' },
                    { label: 'Hệ thống', value: stats.systemPromotions.toString(), icon: 'flaticon-settings', color: 'bg-purple-500' },
                    { label: 'Người dùng', value: stats.userPromotions.toString(), icon: 'flaticon-user', color: 'bg-yellow-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
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
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Đang hoạt động</option>
                        <option>Tạm dừng</option>
                        <option>Đã kết thúc</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả loại</option>
                        <option>Giảm giá</option>
                        <option>Voucher</option>
                        <option>Quà tặng</option>
                        <option>Hoàn tiền</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả nguồn</option>
                        <option>Website</option>
                        <option>iOS App</option>
                        <option>Android App</option>
                        <option>Admin Panel</option>
                    </select>
                    <input type="text" placeholder="Tìm kiếm..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Promotions Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="min-h-[300px]">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Đang tải dữ liệu...</div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-700">Mã/Tên</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Loại</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Nguồn</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Ngày tạo</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Người tạo</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {promotions.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                                            Chưa có khuyến mãi nào
                                        </td>
                                    </tr>
                                ) : (
                                    promotions.map((promo) => (
                                        <tr key={promo.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-bold text-gray-900">{promo.code}</p>
                                                    <p className="text-xs text-gray-600">{promo.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                    {getTypeText(promo.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600">{getSystemSourceText(promo.systemSource)}</span>
                                                    {promo.isSystem && (
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                                                            System
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs">
                                                {new Date(promo.createDate).toLocaleDateString('vi-VN')}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs">
                                                {promo.userNameCreate}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(promo.status)}`}>
                                                    {getStatusText(promo.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(promo)}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
                                                    >
                                                        Xem
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(promo.id!)}
                                                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedPromotion && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Chi tiết Khuyến mãi</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mã khuyến mãi *</label>
                                <input type="text" value={selectedPromotion.code} className="w-full px-4 py-3 border border-gray-200 rounded-xl" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên chương trình *</label>
                                <input type="text" defaultValue={selectedPromotion.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Loại *</label>
                                <select defaultValue={selectedPromotion.type} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="discount">Giảm giá</option>
                                    <option value="voucher">Voucher</option>
                                    <option value="gift">Quà tặng</option>
                                    <option value="cashback">Hoàn tiền</option>
                                    <option value="combo">Combo</option>
                                    <option value="flash_sale">Flash Sale</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nguồn hệ thống *</label>
                                <select defaultValue={selectedPromotion.systemSource} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="web">Website</option>
                                    <option value="mobile_ios">iOS App</option>
                                    <option value="mobile_android">Android App</option>
                                    <option value="admin">Admin Panel</option>
                                    <option value="api">API</option>
                                </select>
                            </div>

                            {/* Links */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Link khuyến mãi *</label>
                                <input type="text" defaultValue={selectedPromotion.link} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Dynamic Link</label>
                                <input type="text" defaultValue={selectedPromotion.dynamicLink} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            {/* Media */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Link ảnh</label>
                                <input type="text" defaultValue={selectedPromotion.imageLink} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Link video</label>
                                <input type="text" defaultValue={selectedPromotion.videoLink} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Banner Landing Page</label>
                                <input type="text" defaultValue={selectedPromotion.bannerLandingPage} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                                <textarea defaultValue={selectedPromotion.description} className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24" />
                            </div>

                            {/* System Info */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Key/Token *</label>
                                <input type="text" value={selectedPromotion.key || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-mono text-xs" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng thái *</label>
                                <select defaultValue={selectedPromotion.status} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                    <option value="01">Đang hoạt động</option>
                                    <option value="02">Tạm dừng</option>
                                    <option value="03">Đã kết thúc</option>
                                    <option value="04">Chờ duyệt</option>
                                </select>
                            </div>

                            {/* Metadata */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày tạo</label>
                                <input type="text" value={new Date(selectedPromotion.createDate).toLocaleString('vi-VN')} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ngày kết thúc</label>
                                <input
                                    type="date"
                                    defaultValue={selectedPromotion.endDate || ''}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                                Đóng
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
