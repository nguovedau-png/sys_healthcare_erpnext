'use client';

import React from 'react';
import Calendar from 'react-calendar';
import { TimeSlot } from '@/types/booking.types';
import { AiOutlineCalendar as CalendarIcon, AiOutlineClockCircle as ClockIcon, AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import 'react-calendar/dist/Calendar.css';

interface SelectDateTimeProps {
    selectedDate?: Date;
    selectedTimeSlot?: TimeSlot;
    timeSlots: TimeSlot[];
    onDateSelect: (date: Date) => void;
    onTimeSlotSelect: (slot: TimeSlot) => void;
    loading?: boolean;
}

const SelectDateTime: React.FC<SelectDateTimeProps> = ({
    selectedDate,
    selectedTimeSlot,
    timeSlots,
    onDateSelect,
    onTimeSlotSelect,
    loading
}) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Chọn ngày và giờ khám</h2>
                <p className="text-slate-500 text-sm">Vui lòng chọn thời gian phù hợp nhất với lịch trình của bạn</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Calendar */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <CalendarIcon className="text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">Chọn ngày khám</h3>
                    </div>
                    <div className="booking-calendar premium-calendar">
                        <Calendar
                            onChange={(value) => onDateSelect(value as Date)}
                            value={selectedDate || today}
                            minDate={today}
                            maxDate={maxDate}
                            locale="vi-VN"
                            className="w-full border-0 font-medium"
                        />
                    </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm min-h-[420px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <ClockIcon className="text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-slate-800">Chọn giờ khám</h3>
                        </div>
                        {selectedDate && (
                            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                {selectedDate.toLocaleDateString('vi-VN')}
                            </span>
                        )}
                    </div>

                    {!selectedDate ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                                <CalendarIcon className="text-3xl text-slate-300" />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Vui lòng chọn ngày khám bên trái để xem các khung giờ trống</p>
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-50 rounded-xl h-12 border border-slate-100"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
                            {timeSlots.map((slot) => {
                                const isSelected = selectedTimeSlot?.id === slot.id;
                                
                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() => slot.available && onTimeSlotSelect(slot)}
                                        disabled={!slot.available}
                                        className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-300 flex flex-col items-center gap-1 ${
                                            isSelected
                                                ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                                : slot.available
                                                    ? 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50 text-slate-700'
                                                    : 'border-slate-50 bg-slate-50/50 text-slate-300 cursor-not-allowed grayscale'
                                        }`}
                                    >
                                        <span className={isSelected ? 'text-white' : slot.available ? 'text-slate-800' : 'text-slate-300'}>
                                            {slot.time}
                                        </span>
                                        <span className={`text-[9px] uppercase tracking-tighter ${isSelected ? 'text-white/80' : slot.available ? 'text-emerald-500' : 'text-slate-300'}`}>
                                            {slot.available ? 'Còn trống' : 'Hết chỗ'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {selectedDate && timeSlots.length === 0 && !loading && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                                <InfoIcon className="text-3xl text-slate-300" />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Rất tiếc, hiện không còn lịch trống trong ngày này</p>
                            <button onClick={() => onDateSelect(new Date(selectedDate.getTime() + 86400000))} className="mt-4 text-xs font-bold text-indigo-600 hover:underline">
                                Xem ngày tiếp theo
                            </button>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="mt-auto pt-6 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-indigo-600"></div>
                            <span>Đã chọn</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-white border border-slate-200"></div>
                            <span>Trống</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-slate-50 border border-slate-50"></div>
                            <span>Hết chỗ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectDateTime;
