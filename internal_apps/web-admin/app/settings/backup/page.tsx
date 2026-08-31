"use client";
import React from 'react';

export default function BackupSettings() {
    const backups = [
        { id: 1, name: 'Backup 19/12/2024 - 10:00', size: '125 MB', date: '19/12/2024 10:00', status: 'completed' },
        { id: 2, name: 'Backup 18/12/2024 - 10:00', size: '123 MB', date: '18/12/2024 10:00', status: 'completed' },
        { id: 3, name: 'Backup 17/12/2024 - 10:00', size: '121 MB', date: '17/12/2024 10:00', status: 'completed' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Sao lưu & Khôi phục</h1>
                <p className="text-gray-500 mt-1">Quản lý sao lưu dữ liệu hệ thống</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <i className="fi flaticon-database text-2xl text-blue-600"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Sao lưu thủ công</h3>
                    <p className="text-sm text-gray-500 mb-4">Tạo bản sao lưu ngay lập tức</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Tạo backup
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <i className="fi flaticon-clock text-2xl text-green-600"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Sao lưu tự động</h3>
                    <p className="text-sm text-gray-500 mb-4">Lên lịch sao lưu định kỳ</p>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                        Cấu hình
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                        <i className="fi flaticon-upload text-2xl text-orange-600"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Khôi phục</h3>
                    <p className="text-sm text-gray-500 mb-4">Khôi phục từ bản sao lưu</p>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                        Khôi phục
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Lịch sử sao lưu</h2>
                <div className="space-y-3">
                    {backups.map((backup) => (
                        <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i className="fi flaticon-folder text-blue-600"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{backup.name}</p>
                                    <p className="text-sm text-gray-500">{backup.size} • {backup.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                                    Tải xuống
                                </button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                                    Khôi phục
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
