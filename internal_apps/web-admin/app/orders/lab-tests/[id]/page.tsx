"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function LabTestDetail() {
    const params = useParams<{ id: string }>();
    const test = {
        id: params.id,
        orderCode: 'LAB10030',
        patientName: 'Trần Thị B',
        patientPhone: '0907654321',
        testType: 'Xét nghiệm máu tổng quát',
        hospital: 'Bệnh viện XYZ',
        doctor: 'BS. Nguyễn Văn C',
        testDate: '20/12/2024',
        testTime: '08:00',
        fee: '350.000đ',
        status: 'processing',
        notes: 'Nhịn đói 8 tiếng trước khi xét nghiệm',
        results: null,
        createdDate: '19/12/2024 14:30',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Đơn xét nghiệm #{test.orderCode}</h1>
                <p className="text-gray-500 mt-1">Ngày tạo: {test.createdDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Phí xét nghiệm</p>
                    <h3 className="text-3xl font-bold text-green-600">{test.fee}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Ngày xét nghiệm</p>
                    <h3 className="text-xl font-bold text-gray-900">{test.testDate}</h3>
                    <p className="text-gray-600 mt-1">{test.testTime}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={test.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin bệnh nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Tên bệnh nhân</p><p className="font-medium text-gray-900">{test.patientName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{test.patientPhone}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Loại xét nghiệm</p><p className="font-medium text-gray-900">{test.testType}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Bệnh viện</p><p className="font-medium text-gray-900">{test.hospital}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Bác sĩ chỉ định</p><p className="font-medium text-gray-900">{test.doctor}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Ghi chú</p><p className="font-medium text-gray-900">{test.notes}</p></div>
                </div>
            </div>

            {test.results ? (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Kết quả xét nghiệm</h2>
                    <p className="text-gray-700">Kết quả sẽ được cập nhật sau khi hoàn thành xét nghiệm</p>
                </div>
            ) : (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <p className="text-yellow-800">⏳ Chưa có kết quả xét nghiệm</p>
                </div>
            )}

            <div className="flex gap-3">
                <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Xác nhận</button>
                <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Cập nhật kết quả</button>
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Hủy</button>
            </div>
        </div>
    );
}
