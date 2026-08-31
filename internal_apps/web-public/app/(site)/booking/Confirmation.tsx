'use client';

import React from 'react';
import { BookingData } from '@/types/booking.types';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineUser, AiOutlineCalendar, AiOutlineMedicineBox, AiOutlinePhone, AiOutlineMail, AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineMedicalServices } from 'react-icons/md';

interface ConfirmationProps {
    bookingData: BookingData;
    onEdit: (step: number) => void;
    bookingId?: string;
    success?: boolean;
}

const Confirmation: React.FC<ConfirmationProps> = ({ bookingData, onEdit, bookingId, success }) => {
    if (success && bookingId) {
        return (
            <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
                <div className="text-center space-y-8">
                    {/* Success Illustration placeholder/Icon */}
                    <div className="relative inline-block">
                        <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto relative z-10">
                            <AiOutlineCheckCircle className="text-6xl text-emerald-500" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl z-0 animate-pulse"></div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Đặt lịch thành công!</h2>
                        <p className="text-slate-500 font-medium">
                            Mã đặt lịch của bạn là <span className="font-black text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-lg shadow-sm border border-indigo-100 ml-1">#{bookingId}</span>
                        </p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 text-left shadow-xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                            <h3 className="font-black text-slate-900 uppercase tracking-tight">Chi tiết lịch hẹn</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <MdOutlineMedicalServices className="text-indigo-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Dịch vụ</p>
                                        <p className="text-sm font-bold text-slate-800">{bookingData.service?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <AiOutlineUser className="text-indigo-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Chuyên gia / Cơ sở</p>
                                        <p className="text-sm font-bold text-slate-800">{bookingData.provider?.name}</p>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">{bookingData.provider?.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <AiOutlineCalendar className="text-indigo-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Thời gian khám</p>
                                        <p className="text-sm font-bold text-slate-800">
                                            {bookingData.date?.toLocaleDateString('vi-VN')}
                                        </p>
                                        <p className="text-[11px] text-indigo-600 font-black mt-0.5 uppercase">{bookingData.timeSlot?.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                        <AiOutlinePhone className="text-indigo-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Bệnh nhân</p>
                                        <p className="text-sm font-bold text-slate-800">{bookingData.patientInfo?.fullName}</p>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{bookingData.patientInfo?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Abstract background shape */}
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl"></div>
                    </div>

                    {/* Next Steps / Info */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-left relative overflow-hidden shadow-xl shadow-slate-900/10">
                        <div className="relative z-10">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <AiOutlineInfoCircle className="text-indigo-400 text-xl" />
                                Hướng dẫn tiếp theo
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                                        Vui lòng đến trước giờ hẹn <span className="text-indigo-400 font-black">15 phút</span> để hoàn tất các thủ tục tại quầy tiếp đón.
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                                        Email xác nhận kèm mã QR đã được gửi đến <span className="text-indigo-400 font-black">{bookingData.patientInfo?.email}</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Dark mode decoration */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            Về trang chủ
                        </button>
                        <button
                            onClick={() => window.location.href = '/profile?tab=bookings'}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                        >
                            Xem lịch hẹn đã đặt
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Xác nhận thông tin đặt lịch</h2>
                <p className="text-slate-500 text-sm">Vui lòng kiểm tra kỹ các thông tin dưới đây trước khi hoàn tất đặt lịch</p>
            </div>

            <div className="space-y-4">
                {/* Each row is a compact refined card */}
                {[
                    { label: 'Dịch vụ', value: bookingData.service?.name, sub: bookingData.service?.description, icon: MdOutlineMedicalServices, step: 1 },
                    { label: 'Chuyên gia / Cơ sở', value: bookingData.provider?.name, sub: bookingData.provider?.address, icon: AiOutlineUser, step: 2 },
                    { label: 'Thời gian khám', value: bookingData.date?.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), sub: bookingData.timeSlot?.time, icon: AiOutlineCalendar, step: 3 },
                    { label: 'Bệnh nhân', value: bookingData.patientInfo?.fullName, sub: `${bookingData.patientInfo?.phone} • ${bookingData.patientInfo?.email}`, icon: AiOutlineUser, step: 4 },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between group transition-all hover:border-indigo-100 hover:shadow-sm">
                        <div className="flex items-center gap-5 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <item.icon className="text-xl text-slate-400 group-hover:text-indigo-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                <p className="text-sm font-bold text-slate-800 truncate">{item.value}</p>
                                <p className="text-xs text-slate-500 font-medium truncate">{item.sub}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onEdit(item.step)}
                            className="px-4 py-2 text-[10px] font-black text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest"
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Confirmation;
