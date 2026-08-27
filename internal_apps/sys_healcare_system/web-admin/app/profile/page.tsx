"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';

export default function AdminProfile() {
    const initialValues = {
        fullName: 'Administrator',
        email: 'admin@healthcare.vn',
        phone: '0912345678',
        role: 'Super Admin',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const fields = [
        { name: 'fullName', label: 'Họ và tên', type: 'text' as const, required: true },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, disabled: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const },
        { name: 'role', label: 'Vai trò', type: 'text' as const, disabled: true },
        { name: 'avatar', label: 'Avatar URL', type: 'text' as const, placeholder: '/img/admin-avatar.jpg' },
    ];

    const passwordFields = [
        { name: 'currentPassword', label: 'Mật khẩu hiện tại', type: 'password' as const, required: true },
        { name: 'newPassword', label: 'Mật khẩu mới', type: 'password' as const, required: true },
        { name: 'confirmPassword', label: 'Xác nhận mật khẩu mới', type: 'password' as const, required: true },
    ];

    const handleUpdateInfo = (data: any) => {
        console.log('Update info:', data);
        alert('Cập nhật thông tin thành công!');
    };

    const handleChangePassword = (data: any) => {
        console.log('Change password:', data);
        alert('Đổi mật khẩu thành công!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
                <p className="text-gray-500 mt-1">Quản lý thông tin tài khoản của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chung</h2>
                        <FormBuilder
                            fields={fields}
                            onSubmit={handleUpdateInfo}
                            submitLabel="Lưu thông tin"
                            initialValues={initialValues}
                            columns={2}
                        />
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Đổi mật khẩu</h2>
                        <FormBuilder
                            fields={passwordFields}
                            onSubmit={handleChangePassword}
                            submitLabel="Đổi mật khẩu"
                            initialValues={initialValues}
                            columns={1}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
                            <img src="/img/admin-avatar.jpg" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{initialValues.fullName}</h3>
                        <p className="text-gray-500">{initialValues.email}</p>
                        <span className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {initialValues.role}
                        </span>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
                        <div className="space-y-4">
                            <div className="text-sm">
                                <p className="font-medium text-gray-800">Đăng nhập thành công</p>
                                <p className="text-gray-500">Hôm nay, 08:30</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-800">Cập nhật cài đặt hệ thống</p>
                                <p className="text-gray-500">Hôm qua, 15:20</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-800">Duyệt bài viết #123</p>
                                <p className="text-gray-500">18/12/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
