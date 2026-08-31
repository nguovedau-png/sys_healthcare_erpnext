'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineAppstore as CategoryOutlined, AiOutlineHome as HomeOutlined, AiOutlineMedicineBox as GeneralOutlined, AiOutlineCoffee as NutritionOutlined, AiOutlineSmile as MentalOutlined, AiOutlineFire as FitnessOutlined, AiOutlineAlert as DiseaseOutlined, AiOutlineHeart as ObsOutlined, AiOutlineUser as PedsOutlined, AiOutlinePlus as PlusOutlined } from 'react-icons/ai';

const categories = [
    { id: 'general', name: 'Sức khỏe chung', icon: <GeneralOutlined />, color: 'text-info' },
    { id: 'nutrition', name: 'Dinh dưỡng', icon: <NutritionOutlined />, color: 'text-success' },
    { id: 'mental', name: 'Tâm lý', icon: <MentalOutlined />, color: 'text-secondary' },
    { id: 'fitness', name: 'Thể dục & Thể thao', icon: <FitnessOutlined />, color: 'text-warning' },
    { id: 'disease', name: 'Bệnh lý', icon: <DiseaseOutlined />, color: 'text-error' },
    { id: 'obs', name: 'Sản phụ khoa', icon: <ObsOutlined />, color: 'text-accent' },
    { id: 'pediatrics', name: 'Nhi khoa', icon: <PedsOutlined />, color: 'text-primary' },
];

export default function ForumSidebarLeft() {
    const pathname = usePathname();

    return (
        <div className="w-64 flex-shrink-0 hidden lg:block animate-in slide-in-from-left-4 duration-500">
            <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-premium overflow-hidden p-6">
                    {/* Section title */}
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full shrink-0 shadow-[0_0_10px_rgba(71,175,80,0.4)]"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Chuyên mục</span>
                    </div>

                    <nav className="space-y-1.5">
                        <Link
                            href="/forum"
                            className={`flex items-center gap-4 px-4 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${
                                pathname === '/forum'
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 translate-x-2'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                            }`}
                        >
                            <HomeOutlined className={`text-xl shrink-0 ${pathname === '/forum' ? 'text-primary' : 'text-slate-300'}`} />
                            Tất cả chủ đề
                        </Link>

                        {categories.map((cat) => {
                            const isActive = pathname === `/forum/c/${cat.id}`;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/forum/c/${cat.id}`}
                                    className={`flex items-center gap-4 px-4 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all group ${
                                        isActive
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-2'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <span className={`text-xl shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                        {cat.icon}
                                    </span>
                                    <span className="truncate">{cat.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom CTA */}
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <Link
                            href="/forum/create"
                            className="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 hover:-translate-y-1 active:scale-95"
                        >
                            <PlusOutlined className="text-base" />
                            Đặt câu hỏi
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
