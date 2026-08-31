"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateSupportGroup() {
    const router = useRouter();
    const fields = [
        { name: 'name', label: 'Tên nhóm', type: 'text' as const, required: true },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, required: true, rows: 4 },
        { name: 'moderator', label: 'Người quản lý', type: 'text' as const, required: true },
        {
            name: 'category', label: 'Danh mục', type: 'select' as const, required: true, options: [
                { value: 'diabetes', label: 'Tiểu đường' },
                { value: 'hypertension', label: 'Huyết áp' },
                { value: 'cancer', label: 'Ung thư' },
                { value: 'mental', label: 'Tâm lý' },
            ]
        },
        { name: 'rules', label: 'Nội quy (mỗi quy tắc một dòng)', type: 'textarea' as const, rows: 5 },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating support group:', data);
        alert('Tạo nhóm hỗ trợ thành công!');
        router.push('/admin/community/support-groups');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Nhóm hỗ trợ</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo nhóm" columns={2} />
            </div>
        </div>
    );
}
