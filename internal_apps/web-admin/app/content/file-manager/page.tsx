"use client";
import React from 'react';

export default function FileManager() {
    const folders = [
        { name: 'Uploads', count: 120 },
        { name: 'Images', count: 450 },
        { name: 'Documents', count: 85 },
        { name: 'Videos', count: 32 },
    ];

    const files = [
        { name: 'banner_tet_2024.jpg', size: '2.5 MB', type: 'image', date: '19/12/2024' },
        { name: 'huong_dan_su_dung.pdf', size: '1.2 MB', type: 'doc', date: '18/12/2024' },
        { name: 'avatar_default.png', size: '150 KB', type: 'image', date: '18/12/2024' },
        { name: 'video_gioi_thieu.mp4', size: '25 MB', type: 'video', date: '17/12/2024' },
        { name: 'bao_cao_thang_11.xlsx', size: '45 KB', type: 'sheet', date: '16/12/2024' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'image': return 'flaticon-picture text-purple-500';
            case 'video': return 'flaticon-play-button text-red-500';
            case 'doc': return 'flaticon-document text-blue-500';
            case 'sheet': return 'flaticon-document text-green-500';
            default: return 'flaticon-file text-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý Tập tin</h1>
                    <p className="text-gray-500 mt-1">Quản lý hình ảnh và tài liệu</p>
                </div>
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2">
                    <i className="fi flaticon-upload"></i> Tải lên
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {folders.map((folder, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:bg-gray-50">
                        <i className="fi flaticon-folder text-3xl text-yellow-400"></i>
                        <div>
                            <p className="font-bold text-gray-900">{folder.name}</p>
                            <p className="text-xs text-gray-500">{folder.count} files</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-200 font-bold text-gray-700">Tệp tin gần đây</div>
                <div className="divide-y divide-gray-100">
                    {files.map((file, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <i className={`fi text-xl ${getIcon(file.type)}`}></i>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-200 rounded-full text-gray-400">
                                <i className="fi flaticon-menu"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
