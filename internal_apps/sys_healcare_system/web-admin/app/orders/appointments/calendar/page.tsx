"use client";
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@/components/admin/ui/Button';
import { useRouter } from 'next/navigation';

export default function AppointmentCalendar() {
    const router = useRouter();
    const [date, setDate] = React.useState(new Date());

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Lịch khám</h1>
                    <p className="text-gray-500 mt-1">Xem lịch hẹn theo thời gian thực</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => router.push('/admin/orders/appointments')}
                        icon="list"
                    >
                        Xem Danh sách
                    </Button>
                    <Button
                        onClick={() => router.push('/admin/orders/appointments/create')}
                        icon="plus"
                    >
                        Đặt lịch mới
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <Calendar
                        onChange={setDate as any}
                        value={date}
                        className="!w-full border-none rounded-xl shadow-none p-4 bg-blue-50/50"
                        tileClassName="rounded-lg h-12 flex items-center justify-center font-medium hover:bg-blue-100 focus:bg-blue-200"
                    />
                </div>

                <div className="md:w-2/3 space-y-4">
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                        <i className="fi flaticon-calendar text-primary"></i>
                        Lịch hẹn ngày {date.toLocaleDateString('vi-VN')}
                    </h3>

                    {/* Mock events */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                            <div className="text-center min-w-[60px]">
                                <span className="block text-gray-400 text-xs">BẮT ĐẦU</span>
                                <span className="block text-primary font-bold text-lg">08:00</span>
                            </div>
                            <div className="w-1 h-12 bg-primary/20 rounded-full"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">Khám tổng quát - Nguyễn Văn A</h4>
                                <p className="text-sm text-gray-500">BS. Trần Minh Tuấn • Phòng 102</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">Đã xác nhận</span>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                            <div className="text-center min-w-[60px]">
                                <span className="block text-gray-400 text-xs">BẮT ĐẦU</span>
                                <span className="block text-primary font-bold text-lg">09:30</span>
                            </div>
                            <div className="w-1 h-12 bg-orange-200 rounded-full"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">Tái khám Tim mạch - Lê Thị B</h4>
                                <p className="text-sm text-gray-500">BS. Nguyễn Thị Mai • Phòng 205</p>
                            </div>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">Chờ khám</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                            <div className="text-center min-w-[60px]">
                                <span className="block text-gray-400 text-xs">BẮT ĐẦU</span>
                                <span className="block text-primary font-bold text-lg">14:00</span>
                            </div>
                            <div className="w-1 h-12 bg-blue-200 rounded-full"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900">Tư vấn Online - Phạm Văn C</h4>
                                <p className="text-sm text-gray-500">BS. Hoàng Văn D • Google Meet</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
