"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES } from './mockData';
import Banner from '@/components/common/Banner';
import { contentService, HealthcarePackage } from '@/services/content.service';
import Spin from '@/components/ui/Spin';

export default function PackagesPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortOption, setSortOption] = useState('popular');
    const [packages, setPackages] = useState<HealthcarePackage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            setIsLoading(true);
            try {
                // We could pass category filter here if backend supported specific filters
                // For now we'll fetch all and filter client-side to maintain current logic
                const data = await contentService.getPackages();
                setPackages(data);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const filteredPackages = packages.filter(pkg =>
        activeCategory === 'all' ? true : pkg.category === activeCategory
    );

    const sortedPackages = [...filteredPackages].sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        return 0;
    });

    return (
        <div className="min-h-screen bg-[#f8f9fc] pb-24 font-sans selection:bg-emerald-500 selection:text-white">


            {/* Premium Gold/Emerald Hero Section */}
            <div className="relative pt-20 pb-36 overflow-hidden bg-slate-900 border-b-4 border-amber-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 object-cover mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-900/40"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/20 blur-[150px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-500/30 text-amber-400 font-bold text-xs tracking-widest uppercase mb-8 shadow-lg">
                            <i className="fi flaticon-medal text-lg"></i>
                            Dịch vụ Đẳng cấp 5 Sao
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                            Gói Khám <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Thượng Lưu</span>
                        </h1>

                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
                            Tầm soát sức khỏe toàn diện với công nghệ y khoa tân tiến nhất. Đặc quyền không chờ đợi, dịch vụ chăm sóc VIP 1:1 từ các chuyên gia đầu ngành.
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-black px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transform hover:-translate-y-1 transition-all">
                                Xem Bảng Giá
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-20 -mt-16">

                {/* Advanced Filtering System */}
                <div className="bg-white rounded-lg md:rounded-full shadow-xl shadow-slate-200/50 p-4 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">

                    <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 hide-scrollbar pl-2">
                        {CATEGORIES.map((cat, idx) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${isActive
                                            ? 'bg-slate-900 text-white shadow-md transform scale-105'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 px-2 md:px-0">
                        <i className="fi flaticon-settings text-slate-400"></i>
                        <select
                            className="bg-transparent text-slate-700 font-bold text-sm outline-none cursor-pointer hover:text-emerald-600 transition-colors"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="popular">Được đánh giá cao nhất</option>
                            <option value="price-asc">Giá: Thấp đến Cao</option>
                            <option value="price-desc">Giá: Cao đến Thấp</option>
                        </select>
                    </div>
                </div>

                {/* Listing Grid */}
                {/* Listing Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-32">
                        <Spin size="large" tip="Đang tải danh sách gói khám..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedPackages.map((pkg, idx) => {
                            const isVIP = pkg.price > 3000000;
                            let detailList: string[] = [];
                            try {
                                detailList = JSON.parse(pkg.details);
                            } catch (e) {
                                detailList = Array.isArray(pkg.details) ? pkg.details : [];
                            }

                            return (
                                <div key={pkg.id} className={`group relative bg-white rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col h-full ${isVIP
                                        ? 'shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-amber-300 hover:shadow-[0_30px_60px_rgba(251,191,36,0.15)]'
                                        : 'shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-200'
                                    }`}>

                                    {isVIP && (
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full z-0 pointer-events-none"></div>
                                    )}

                                    {/* Image Header */}
                                    <div className="relative h-60 overflow-hidden shrink-0">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 max-h-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                            <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                                                {CATEGORIES.find(c => c.id === pkg.category)?.name || "Gói Khám"}
                                            </div>
                                            {pkg.discount > 0 && (
                                                <div className="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                                                    GIẢM {pkg.discount}%
                                                </div>
                                            )}
                                        </div>

                                        {/* Title overlay on image */}
                                        <div className="absolute bottom-4 left-6 right-6">
                                            <Link href={`/packages/${pkg.id}`} className="block">
                                                <h3 className="text-xl font-bold text-white leading-tight hover:text-amber-400 transition-colors line-clamp-2 drop-shadow-md">
                                                    {pkg.title}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                                        <div className="flex items-center gap-2 mb-6 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                <i className={`fi flaticon-hospital ${isVIP ? 'text-amber-500' : 'text-emerald-500'}`}></i>
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 truncate">{pkg.hospitalName}</span>
                                        </div>

                                        {/* Features Checklist */}
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {detailList.slice(0, 4).map((detail, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isVIP ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                        <i className="fi flaticon-check text-[10px] font-black"></i>
                                                    </div>
                                                    <span className="text-sm text-slate-600 leading-relaxed line-clamp-2">{detail}</span>
                                                </li>
                                            ))}
                                            {detailList.length > 4 && (
                                                <li className="text-[10px] font-black text-slate-400 pl-8 pt-2 uppercase tracking-widest">
                                                    + VÀ {detailList.length - 4} DANH MỤC KHÁM KHÁC
                                                </li>
                                            )}
                                        </ul>

                                        {/* Action & Price Footer */}
                                        <div className="mt-auto border-t border-slate-100 pt-6">
                                            {pkg.originalPrice > pkg.price && (
                                                <div className="text-[10px] font-bold text-slate-400 line-through mb-1 ml-1 uppercase">{pkg.originalPrice.toLocaleString('vi-VN')} đ</div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-end gap-1">
                                                    <span className={`text-3xl font-black ${isVIP ? 'text-amber-500' : 'text-slate-800'}`}>
                                                        {pkg.price.toLocaleString('vi-VN')}
                                                    </span>
                                                    <span className="text-sm font-bold text-slate-500 mb-1">đ</span>
                                                </div>
                                                <Link
                                                    href={`/packages/${pkg.id}`}
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVIP
                                                            ? 'bg-amber-500 text-white hover:bg-slate-900 shadow-lg shadow-amber-500/30 hover:scale-110'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white'
                                                        }`}
                                                >
                                                    <i className="fi flaticon-right-arrow text-sm"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {sortedPackages.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi flaticon-search text-slate-300 text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy gói khám phù hợp</h3>
                        <p className="text-slate-500">Thử thay đổi bộ lọc hoặc xóa các điều kiện tìm kiếm.</p>
                        <button onClick={() => setActiveCategory('all')} className="mt-6 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
                            Xem tất cả Gói khám
                        </button>
                    </div>
                )}
            </div>

            {/* Trust Footer */}
            <div className="container mx-auto px-4 mt-20">
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-8 md:p-12 text-center max-w-5xl mx-auto shadow-sm">
                    <h3 className="text-2xl md:text-3xl font-black text-emerald-900 mb-4">Cam kết Bảng giá Phẫu thuật & Tầm soát</h3>
                    <p className="text-emerald-700 max-w-2xl mx-auto mb-8">Nền tảng của chúng tôi cam kết giá niêm yết công khai, minh bạch, tuyệt đối không phát sinh chi phí phụ ngoài phác đồ tại viện.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold bg-white px-5 py-2.5 rounded-full shadow-sm"><i className="fi flaticon-shield"></i> Đối tác 50+ Bệnh viện lớn</div>
                        <div className="flex items-center gap-2 text-emerald-800 font-bold bg-white px-5 py-2.5 rounded-full shadow-sm"><i className="fi flaticon-support"></i> Hoàn tiền 100% nếu sai lệch</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
