'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import shopService, { Pharmacy } from '@/services/shop.service';
import { MdVerified } from 'react-icons/md';
import { AiOutlineShop, AiOutlineEnvironment, AiOutlineStar } from 'react-icons/ai';

const TopPharmacy = () => {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const data = await shopService.getPharmacies();
                setPharmacies(data.slice(0, 4));
            } catch (err) {
                console.error('Error fetching top pharmacies:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacies();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pharmacies.map((pharmacy) => (
                <Link 
                    href={`/shop/pharmacies/${pharmacy.id}`} 
                    key={pharmacy.id}
                    className="group bg-white p-5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex items-center gap-4 cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-xl bg-slate-50 p-2.5 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                        <img src={pharmacy.logo} alt={pharmacy.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <h4 className="font-bold text-slate-800 text-[15px] group-hover:text-primary transition-colors truncate">{pharmacy.name}</h4>
                            {pharmacy.verified && <MdVerified className="text-blue-500 flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                            <AiOutlineEnvironment className="text-primary" />
                            {pharmacy.location || pharmacy.address}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50">
                                <AiOutlineStar /> {pharmacy.rating}
                            </div>
                            <div className="text-[10px] font-black text-primary flex items-center gap-1">
                                <AiOutlineShop /> Ghé shop
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TopPharmacy;
