'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';
import { Typography } from '@/components/ui/Typography';
import {
    AiOutlineFileText as FileTextOutlined,
    AiOutlineUser as UserOutlined,
    AiOutlineCalendar as CalendarOutlined,
    AiOutlineSafetyCertificate as SafetyOutlined,
} from 'react-icons/ai';
import { MdOutlineMedicalServices } from 'react-icons/md';

const { Text, Title } = Typography;

interface BookingSummaryProps {
    data: BookingData;
    step: number;
}

export default function BookingSummary({ data, step }: BookingSummaryProps) {
    if (step === 5) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <FileTextOutlined className="text-indigo-600 text-xl" />
                </div>
                <div>
                    <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight">Tóm tắt đặt lịch</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking Summary</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Step 1: Service */}
                <div className={`transition-all duration-300 ${data.service ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-1'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${data.service ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
                            <MdOutlineMedicalServices className="text-base" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-0.5">Dịch vụ</p>
                            <p className="text-[13px] font-bold text-slate-800 truncate">{data.service?.name || 'Chưa lựa chọn'}</p>
                        </div>
                    </div>
                </div>

                {/* Step 2: Provider */}
                <div className={`transition-all duration-300 ${data.provider ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-1'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${data.provider ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400'}`}>
                            <UserOutlined className="text-base" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-0.5">Bác sĩ / Cơ sở</p>
                            <p className="text-[13px] font-bold text-slate-800 truncate">{data.provider?.name || 'Chưa lựa chọn'}</p>
                        </div>
                    </div>
                </div>

                {/* Step 3: Date & Time */}
                <div className={`transition-all duration-300 ${data.date ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-1'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${data.date ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'bg-slate-100 text-slate-400'}`}>
                            <CalendarOutlined className="text-base" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-0.5">Thời gian</p>
                            <p className="text-[13px] font-bold text-slate-800">
                                {data.date ? new Date(data.date).toLocaleDateString('vi-VN') : 'Chưa lựa chọn'}
                                {data.timeSlot ? ` @ ${data.timeSlot.time}` : ''}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Billing Summary */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-slate-500">Phí khám</span>
                            <span className="text-sm font-black text-slate-900">{data.service?.price || '0đ'}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-slate-500">Phí dịch vụ</span>
                            <span className="text-[11px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded-md">Miễn phí</span>
                        </div>
                        
                        <div className="h-[1px] bg-slate-200/50 w-full mb-4"></div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-slate-800">Tổng cộng</span>
                            <div className="text-right">
                                <p className="text-lg font-black text-indigo-600 leading-none mb-1">{data.service?.price || '0đ'}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">Giá đã bao gồm VAT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Trust Badge */}
            <div className="mt-8 flex items-center gap-2 px-2">
                <SafetyOutlined className="text-emerald-500 text-lg" />
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                    Cam kết bảo mật thông tin y tế theo tiêu chuẩn quốc tế.
                </p>
            </div>

            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
    );
}
