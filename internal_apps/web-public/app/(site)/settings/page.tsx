'use client';

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Banner page="others" />
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 flex-shrink-0">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Cài đặt</h2>
                        </div>
                        <nav className="p-4 space-y-1">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'general'
                                        ? 'bg-green-50 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <i className={`fi flaticon-user mr-3 text-lg ${activeTab === 'general' ? 'text-green-600' : 'text-gray-400'}`}></i>
                                Thông tin chung
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'security'
                                        ? 'bg-green-50 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <i className={`fi flaticon-locked mr-3 text-lg ${activeTab === 'security' ? 'text-green-600' : 'text-gray-400'}`}></i>
                                Bảo mật & Mật khẩu
                            </button>
                            <button
                                onClick={() => setActiveTab('social')}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'social'
                                        ? 'bg-green-50 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <i className={`fi flaticon-share mr-3 text-lg ${activeTab === 'social' ? 'text-green-600' : 'text-gray-400'}`}></i>
                                Tài khoản liên kết
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-10">
                        {activeTab === 'general' && <GeneralSettings />}
                        {activeTab === 'security' && <SecuritySettings />}
                        {activeTab === 'social' && <SocialSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function GeneralSettings() {
    return (
        <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h3>

            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <img
                        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                        src="/styles/img/user/user-2.jpg"
                        alt="Avatar"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors shadow-sm">
                        <i className="fi flaticon-edit text-xs"></i>
                    </button>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">Nguyễn Trần Tuấn Anh</h4>
                    <p className="text-gray-500 text-sm">Thành viên từ 2021</p>
                    <button className="mt-2 text-sm text-green-600 font-medium hover:text-green-700">
                        Thay đổi ảnh đại diện
                    </button>
                </div>
            </div>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            defaultValue="Nguyễn Trần Tuấn Anh"
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <input
                            type="tel"
                            defaultValue="090 365 2826"
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        defaultValue="tuananh@example.com"
                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu ngắn</label>
                    <textarea
                        rows={4}
                        defaultValue="Thành viên tích cực của cộng đồng y tế"
                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all resize-none"
                    ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="px-6 py-2.5 bg-green-500 text-white font-medium rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-green-600/40 transition-all transform hover:-translate-y-0.5">
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
}

function SecuritySettings() {
    return (
        <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Đổi mật khẩu</h3>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                    <div className="relative">
                        <input
                            type="password"
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                        <input
                            type="password"
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                            placeholder="Ít nhất 6 ký tự"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all"
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="px-6 py-2.5 bg-green-500 text-white font-medium rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-green-600/40 transition-all transform hover:-translate-y-0.5">
                        Cập nhật mật khẩu
                    </button>
                </div>
            </form>
        </div>
    )
}

function SocialSettings() {
    return (
        <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tài khoản liên kết</h3>
            <p className="text-gray-500 mb-8">Liên kết tài khoản mạng xã hội để đăng nhập dễ dàng hơn.</p>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center bg-blue-50 rounded-full">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-6 w-6" alt="Facebook" />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900">Facebook</h5>
                            <p className="text-sm text-green-600 font-medium">Đã kết nối</p>
                        </div>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-red-600 font-medium border border-gray-200 px-4 py-2 rounded-lg hover:border-red-200 hover:bg-red-50 transition-all">
                        Hủy liên kết
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-50 rounded-full">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6 w-6" alt="Google" />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900">Google</h5>
                            <p className="text-sm text-gray-500">Chưa kết nối</p>
                        </div>
                    </div>
                    <button className="text-sm text-gray-900 hover:text-green-600 font-medium border border-gray-200 px-4 py-2 rounded-lg hover:border-green-200 hover:bg-green-50 transition-all">
                        Kết nối
                    </button>
                </div>
            </div>
        </div>
    )
}
