"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AdminDetail() {
    const params = useParams<{ id: string }>();
    const admin = {
        id: params.id,
        name: 'Nguyễn Admin',
        email: 'admin@healthcare.vn',
        role: 'Super Admin',
        phone: '0901234567',
        lastLogin: '19/12/2024 10:30',
        status: 'active',
        createdAt: '01/01/2024',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{admin.name}</h1>
                <div className="flex gap-3">
                    <Link href={`/admin/users/admins/${admin.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Email</p><p className="font-medium text-gray-900">{admin.email}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Vai trò</p><p className="font-medium text-gray-900">{admin.role}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Số điện thoại</p><p className="font-medium text-gray-900">{admin.phone}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Đăng nhập cuối</p><p className="font-medium text-gray-900">{admin.lastLogin}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Trạng thái</p><StatusBadge status={admin.status as any} /></div>
                    <div><p className="text-sm text-gray-500 mb-1">Ngày tạo</p><p className="font-medium text-gray-900">{admin.createdAt}</p></div>
                </div>
            </div>
        </div>
    );
}
