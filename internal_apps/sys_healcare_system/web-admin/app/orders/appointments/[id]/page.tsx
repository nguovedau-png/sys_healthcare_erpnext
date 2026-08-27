"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function AppointmentDetail() {
    const params = useParams<{ id: string }>();
    const appointment = {
        id: params.id,
        patientName: 'Nguyễn Văn A',
        patientPhone: '0901234567',
        doctorName: 'BS. Trần Thị B',
        hospital: 'Bệnh viện ABC',
        date: '25/12/2024',
        time: '09:00',
        service: 'Khám tổng quát',
        fee: '300.000đ',
        status: 'approved',
        notes: 'Bệnh nhân cần khám định kỳ',
        createdAt: '20/12/2024 10:30',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Chi tiết Lịch hẹn #{appointment.id}</h1>
                <p className="text-gray-500 mt-1">Ngày tạo: {appointment.createdAt}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Ngày khám</p>
                    <h3 className="text-xl font-bold text-gray-900">{appointment.date}</h3>
                    <p className="text-gray-600 mt-1">{appointment.time}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Phí khám</p>
                    <h3 className="text-2xl font-bold text-green-600">{appointment.fee}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={appointment.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Bệnh nhân</p><p className="font-medium text-gray-900">{appointment.patientName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{appointment.patientPhone}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Bác sĩ</p><p className="font-medium text-gray-900">{appointment.doctorName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Bệnh viện</p><p className="font-medium text-gray-900">{appointment.hospital}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Dịch vụ</p><p className="font-medium text-gray-900">{appointment.service}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Ghi chú</p><p className="font-medium text-gray-900">{appointment.notes}</p></div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Xác nhận</button>
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Hủy lịch</button>
            </div>
        </div>
    );
}
