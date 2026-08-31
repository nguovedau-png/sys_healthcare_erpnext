'use client';

import { useEffect, useState } from 'react';
import shopService, { Pharmacy } from '@/services/shop.service';
import Link from 'next/link';
import { AiOutlineShop, AiOutlineEnvironment, AiOutlineStar, AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

export default function PharmaciesPage() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const data = await shopService.getPharmacies();
                setPharmacies(data);
            } catch (err) {
                console.error('Error fetching pharmacies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacies();
    }, []);

    const filteredPharmacies = pharmacies.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans">
            <div className="container mx-auto px-4 max-w-7xl pt-16">
                
                {/* Header */}
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Hệ Thống <span className="text-primary">Nhà Thuốc</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium">
                        Tìm kiếm và kết nối với các hệ thống nhà thuốc uy tín nhất trên toàn quốc để mua sắm an tâm.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-16 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto relative z-10">
                    <div className="relative flex-1 w-full">
                        <AiOutlineSearch className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tên nhà thuốc hoặc khu vực..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 font-bold text-lg placeholder:text-slate-300"
                        />
                    </div>
                </div>

                {/* Pharmacies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPharmacies.map((pharmacy) => (
                        <Link 
                            href={`/shop/pharmacies/${pharmacy.id}`} 
                            key={pharmacy.id}
                            className="group bg-white rounded-[3rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Verified Badge */}
                            {pharmacy.verified && (
                                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-black text-[10px] uppercase tracking-widest">
                                    <MdVerified /> Uy tín
                                </div>
                            )}

                            {/* Logo */}
                            <div className="w-28 h-28 rounded-[2rem] bg-slate-50 p-6 flex items-center justify-center mb-6 shadow-inner border border-slate-50 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                                <img src={pharmacy.logo} alt={pharmacy.name} className="max-w-full max-h-full object-contain" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{pharmacy.name}</h3>
                            
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-amber-400">
                                    <AiOutlineStar />
                                    <AiOutlineStar />
                                    <AiOutlineStar />
                                    <AiOutlineStar />
                                    <AiOutlineStar />
                                </div>
                                <span className="text-xs font-black text-slate-400">({pharmacy.rating})</span>
                            </div>

                            <div className="space-y-3 mb-8 w-full">
                                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm">
                                    <AiOutlineEnvironment className="text-primary text-lg" />
                                    {pharmacy.address}
                                </div>
                                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm">
                                    <AiOutlineShop className="text-primary text-lg" />
                                    Mở cửa: 06:00 - 23:30
                                </div>
                            </div>

                            <div className="mt-auto w-full pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                                    Ghé cửa hàng <AiOutlineArrowRight />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPharmacies.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-black uppercase tracking-widest">Không tìm thấy nhà thuốc nào phù hợp</p>
                    </div>
                )}
            </div>
        </div>
    );
}
