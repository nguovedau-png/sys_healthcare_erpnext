"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');

    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0909123456',
        avatar: '/img/avatar-1.jpg',
        points: 450,
        level: 'Dược sĩ',
    };

    const stats = {
        orders: 12,
        courses: 5,
        quizzes: 18,
        communityPosts: 24,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F7FB] to-white py-12 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-4 inline-block">
                        Thông Tin <span className="text-primary">Tài Khoản</span>
                    </h1>
                </div>

                {/* Header Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                                onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-1.jpg'}
                            />
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20 scale-110 pointer-events-none"></div>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                            <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm font-bold rounded-full mt-2 border border-teal-100">{user.level}</span>
                            <p className="text-gray-500 mt-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                {user.email}
                            </p>
                        </div>
                        <div className="text-left md:text-right bg-gray-50/80 p-5 rounded-lg border border-gray-100 min-w-[200px]">
                            <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Điểm tích lũy</p>
                            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">{user.points}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <Link href="/portal/orders">
                        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all hover:border-blue-200 hover:-translate-y-1 cursor-pointer">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-500 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                                    <i className="fi flaticon-shopping-cart text-xl text-blue-600 group-hover:text-white transition-colors"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.orders}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Đơn hàng</p>
                        </div>
                    </Link>
                    <Link href="/portal/education">
                        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all hover:border-green-200 hover:-translate-y-1 cursor-pointer">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-12 h-12 bg-green-50 group-hover:bg-emerald-500 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                                    <i className="fi flaticon-book text-xl text-green-600 group-hover:text-white transition-colors"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.courses}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Khóa học</p>
                        </div>
                    </Link>
                    <Link href="/portal/education/quizzes/history">
                        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all hover:border-purple-200 hover:-translate-y-1 cursor-pointer">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                                    <i className="fi flaticon-list text-xl text-purple-600 group-hover:text-white transition-colors"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.quizzes}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-purple-500 transition-colors">Trắc nghiệm</p>
                        </div>
                    </Link>
                    <Link href="/community">
                        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all hover:border-yellow-200 hover:-translate-y-1 cursor-pointer">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-12 h-12 bg-yellow-50 group-hover:bg-yellow-500 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                                    <i className="fi flaticon-comment text-xl text-yellow-600 group-hover:text-white transition-colors"></i>
                                </div>
                                <p className="text-3xl font-extrabold text-gray-900">{stats.communityPosts}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-yellow-500 transition-colors">Bài viết</p>
                        </div>
                    </Link>
                </div>

                {/* Interactive Tabs Menu */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 hide-scrollbar snap-x">
                    {[
                        { key: 'overview', label: 'Tổng quan', icon: 'flaticon-home' },
                        { key: 'info', label: 'Thông tin', icon: 'flaticon-user' },
                        { key: 'orders', label: 'Đơn hàng', icon: 'flaticon-shopping-cart' },
                        { key: 'addresses', label: 'Địa chỉ', icon: 'flaticon-location' },
                        { key: 'learning', label: 'Học tập', icon: 'flaticon-book' },
                        { key: 'community', label: 'Cộng đồng', icon: 'flaticon-comment' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`snap-start flex-shrink-0 px-6 py-3.5 rounded-full font-bold transition-all flex items-center gap-3 shadow-sm border ${activeTab === tab.key
                                ? 'bg-gradient-to-r from-primary to-teal-500 text-white border-transparent'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                                }`}
                        >
                            <i className={`fi ${tab.icon} ${activeTab === tab.key ? 'text-white' : 'text-gray-400'}`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg p-10 min-h-[400px]">
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">Đang Hoạt Động</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-gray-600 uppercase text-xs tracking-widest mb-4">Đơn hàng gần nhất</h3>
                                    <Link href="/portal/orders">
                                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-primary/40 hover:shadow-md transition-all group">
                                            <div className="flex justify-between items-start mb-3">
                                                <p className="font-extrabold text-lg text-gray-900">#ORD001</p>
                                                <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-green-200 shadow-sm">Đã giao</span>
                                            </div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                2024-12-18
                                            </p>
                                            <div className="flex justify-between items-center border-t border-gray-200/60 pt-4 mt-2">
                                                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Tổng tiền</span>
                                                <p className="text-primary font-black text-xl group-hover:text-teal-500 transition-colors">2.790.000<sup className="text-sm">đ</sup></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-600 uppercase text-xs tracking-widest mb-4">Khóa học đang theo dõi</h3>
                                    <Link href="/portal/education">
                                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-primary/40 hover:shadow-md transition-all">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-900 text-lg mb-4">Khóa cập nhật chuyên môn CPE 2024</p>
                                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-3 shadow-inner">
                                                <div className="h-full bg-gradient-to-r from-primary to-teal-400 relative" style={{ width: '65%' }}>
                                                    <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/30 animate-pulse"></div>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-gray-500">65% <span className="font-normal text-gray-400">hoàn thành quá trình</span></p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="space-y-6 animate-fade-in max-w-3xl">
                            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">Chỉnh Sửa Hồ Sơ</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">Họ và tên</label>
                                    <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">Email <span className="text-red-500">*</span></label>
                                    <input type="email" defaultValue={user.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">Số điện thoại</label>
                                    <input type="tel" defaultValue={user.phone} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">Trình độ chuyên môn</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 cursor-pointer">
                                        <option>Dược sĩ</option>
                                        <option>Bác sĩ</option>
                                        <option>Y tá</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button className="px-8 py-3.5 bg-gradient-to-r from-primary to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5">
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="animate-fade-in text-center py-10">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mx-auto mb-6">
                                <i className="fi flaticon-shopping-cart text-4xl"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Đơn Hàng Của Tôi</h2>
                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Kiểm tra trạng thái đơn hàng hiện tại hoặc xem lại lịch sử giao dịch của bạn.</p>
                            <Link href="/portal/orders" className="inline-block px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-primary hover:text-primary transition-colors">
                                Quản lý đơn hàng
                            </Link>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="animate-fade-in text-center py-10">
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-300 mx-auto mb-6">
                                <i className="fi flaticon-location text-4xl"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Sổ Địa Chỉ</h2>
                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Định dạng sẵn các địa chỉ nhận hàng để tăng tốc quá trình thanh toán.</p>
                            <Link href="/portal/addresses" className="inline-block px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-primary hover:text-primary transition-colors">
                                Sửa địa chỉ
                            </Link>
                        </div>
                    )}

                    {activeTab === 'learning' && (
                        <div className="animate-fade-in space-y-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900">Báo Cáo Học Tập</h2>
                                <Link href="/portal/education/quizzes/history" className="text-primary font-bold hover:underline">
                                    Lịch sử chi tiết →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-100">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-4"><i className="fi flaticon-book"></i></div>
                                    <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">Khóa Học HT</p>
                                    <p className="text-4xl font-black text-blue-900">3</p>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-lg border border-green-100">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-sm mb-4"><i className="fi flaticon-list"></i></div>
                                    <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2">Quiz Đã Làm</p>
                                    <p className="text-4xl font-black text-emerald-900">18</p>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-100">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-500 shadow-sm mb-4"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                                    <p className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">Điểm Trung Bình</p>
                                    <p className="text-4xl font-black text-purple-900">85<span className="text-2xl text-purple-700 ml-1">%</span></p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <div className="animate-fade-in space-y-6">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900">Thống Kê Tương Tác</h2>
                                <Link href="/community" className="text-primary font-bold hover:underline">
                                    Vào cộng đồng →
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <p className="text-4xl font-extrabold text-gray-900 mb-2">24</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bài Viết</p>
                                </div>
                                <div className="text-center p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <p className="text-4xl font-extrabold text-gray-900 mb-2">156</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lượt Thích</p>
                                </div>
                                <div className="text-center p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <p className="text-4xl font-extrabold text-gray-900 mb-2">89</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bình Luận</p>
                                </div>
                                <div className="text-center p-6 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
                                    <p className="text-4xl font-extrabold text-gray-900 mb-2">32</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Chia Sẻ</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Useful Direct Links */}
                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/product-knowledge">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all group h-full">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                                <i className="fi flaticon-video text-2xl drop-shadow-sm"></i>
                            </div>
                            <p className="font-bold text-gray-900 text-center">Kiến Thức SP</p>
                        </div>
                    </Link>
                    <Link href="/health-community">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all group h-full">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform">
                                <i className="fi flaticon-user text-2xl drop-shadow-sm"></i>
                            </div>
                            <p className="font-bold text-gray-900 text-center">Cộng Đồng Y Tế</p>
                        </div>
                    </Link>
                    <Link href="/medical-journal">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all group h-full">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform">
                                <i className="fi flaticon-book text-2xl drop-shadow-sm"></i>
                            </div>
                            <p className="font-bold text-gray-900 text-center">Tạp Chí Y Học</p>
                        </div>
                    </Link>
                    <Link href="/shop/cart">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all group h-full">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform">
                                <i className="fi flaticon-shopping-cart text-2xl drop-shadow-sm"></i>
                            </div>
                            <p className="font-bold text-gray-900 text-center">Giỏ Hàng Mua Sắm</p>
                        </div>
                    </Link>
                </div>

            </div>
            
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
