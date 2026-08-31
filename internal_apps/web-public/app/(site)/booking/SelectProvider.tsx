'use client';

import React, { useState } from 'react';
import { Provider } from '@/types/booking.types';
import { AiFillStar as StarFilled, AiOutlineEnvironment as EnvironmentOutlined, AiOutlineClockCircle as ClockOutlined, AiOutlineRight as RightOutlined } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

interface SelectProviderProps {
    doctors: Provider[];
    hospitals: Provider[];
    selectedProvider?: Provider;
    onSelect: (provider: Provider) => void;
    loading?: boolean;
}

const SelectProvider: React.FC<SelectProviderProps> = ({
    doctors,
    hospitals,
    selectedProvider,
    onSelect,
    loading
}) => {
    const [viewType, setViewType] = useState<'doctor' | 'hospital'>('doctor');
    const providers = viewType === 'doctor' ? doctors : hospitals;

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-50 rounded-2xl h-32 border border-slate-100"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">
                        Chọn {viewType === 'doctor' ? 'Bác sĩ' : 'Cơ sở y tế'}
                    </h2>
                    <p className="text-slate-500 text-sm">Tìm kiếm chuyên gia hoặc bệnh viện phù hợp</p>
                </div>

                {/* Toggle Pill */}
                <div className="inline-flex bg-slate-100/80 p-1 rounded-xl self-start">
                    <button
                        onClick={() => setViewType('doctor')}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${viewType === 'doctor'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        BÁC SĨ
                    </button>
                    <button
                        onClick={() => setViewType('hospital')}
                        className={`px-6 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${viewType === 'hospital'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        CƠ SỞ Y TẾ
                    </button>
                </div>
            </div>

            {/* Provider List */}
            <div className="space-y-3">
                {providers.map((provider) => {
                    const isSelected = selectedProvider?.id === provider.id;
                    
                    return (
                        <button
                            key={provider.id}
                            onClick={() => onSelect(provider)}
                            className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left group flex items-center gap-5 ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-50'
                                    : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/50'
                                }`}
                        >
                            {/* Avatar with fallback */}
                            <div className="flex-shrink-0 relative">
                                <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-colors ${isSelected ? 'border-white shadow-lg' : 'border-slate-100 group-hover:border-indigo-100'}`}>
                                    <img
                                        src={provider.avatar || '/styles/img/user/default-avatar.jpg'}
                                        alt={provider.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(provider.name) + '&background=6366f1&color=fff'; }}
                                    />
                                </div>
                                {viewType === 'doctor' && (
                                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                                        <MdVerified className="text-indigo-600 text-lg" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className={`text-[15px] font-black transition-colors truncate ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        {provider.name}
                                    </h3>
                                    {provider.specialty && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {provider.specialty}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1.5 mb-3">
                                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium truncate">
                                        <EnvironmentOutlined className="text-slate-400 shrink-0" />
                                        {provider.address}
                                    </p>
                                    {provider.experience && (
                                        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                                            <ClockOutlined className="text-slate-400 shrink-0" />
                                            {provider.experience}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                                        <StarFilled className="text-amber-400 text-xs" />
                                        <span className="text-xs font-bold text-amber-700">{provider.rating}</span>
                                        <span className="text-[10px] text-amber-500 font-medium">({provider.reviewCount})</span>
                                    </div>
                                    {provider.price && (
                                        <div className={`text-sm font-black ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>
                                            {provider.price}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Arrow Indicator */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-400'}`}>
                                <RightOutlined className={`transition-transform duration-300 ${isSelected ? 'rotate-0' : 'group-hover:translate-x-0.5'}`} />
                            </div>
                        </button>
                    );
                })}
            </div>

            {providers.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <i className="fi flaticon-search text-2xl text-slate-300"></i>
                    </div>
                    <p className="text-slate-500 font-medium">Không tìm thấy {viewType === 'doctor' ? 'bác sĩ' : 'cơ sở y tế'} nào phù hợp</p>
                </div>
            )}
        </div>
    );
};

export default SelectProvider;
