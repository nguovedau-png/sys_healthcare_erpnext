'use client';

import React from 'react';
import { Service } from '@/types/booking.types';
import { MdOutlineHealthAndSafety, MdOutlineMedicalServices, MdOutlineLocalHospital, MdOutlinePsychology, MdOutlineFitnessCenter, MdOutlinePregnantWoman, MdOutlineChildCare, MdOutlineBloodtype } from 'react-icons/md';

const ICON_MAP: Record<string, any> = {
    'flaticon-doctor': MdOutlineMedicalServices,
    'flaticon-hospital': MdOutlineLocalHospital,
    'flaticon-nurse': MdOutlineHealthAndSafety,
    'flaticon-brain': MdOutlinePsychology,
    'flaticon-heart': MdOutlineFitnessCenter,
    'flaticon-pediatrics': MdOutlineChildCare,
    'flaticon-maternity': MdOutlinePregnantWoman,
    'flaticon-blood-test': MdOutlineBloodtype,
};

interface SelectServiceProps {
    services: Service[];
    selectedService?: Service;
    onSelect: (service: Service) => void;
    loading?: boolean;
}

const SelectService: React.FC<SelectServiceProps> = ({ services, selectedService, onSelect, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-50 rounded-2xl h-44 border border-slate-100"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Chọn dịch vụ khám</h2>
                <p className="text-slate-500 text-sm">Vui lòng chọn loại dịch vụ y tế bạn đang quan tâm</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => {
                    const IconComponent = ICON_MAP[service.icon] || MdOutlineMedicalServices;
                    const isSelected = selectedService?.id === service.id;

                    return (
                        <button
                            key={service.id}
                            onClick={() => onSelect(service)}
                            className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                                isSelected
                                    ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-4 ring-indigo-50'
                                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50'
                            }`}
                        >
                            <div className="flex flex-col gap-4 relative z-10">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                    isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                                }`}>
                                    <IconComponent className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className={`font-bold transition-colors ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        {service.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                        {service.description}
                                    </p>
                                    {service.price && (
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className={`text-sm font-black ${isSelected ? 'text-indigo-600' : 'text-slate-900'}`}>
                                                {service.price}
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-indigo-400' : 'text-slate-300'}`}>
                                                VNĐ
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Decoration */}
                            {isSelected && (
                                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-600/5 rounded-full blur-xl"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectService;
