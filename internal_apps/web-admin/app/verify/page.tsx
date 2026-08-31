"use client";
import React, { useState } from 'react';

// Mock Data for Pending Verifications
const INITIAL_REQUESTS = [
    {
        id: 1,
        user: { name: 'Dr. Nguyen Van A', avatar: 'https://i.pravatar.cc/150?u=1' },
        type: 'Degree',
        documentName: 'Chứng nhận Đào tạo liên tục Tim mạch',
        submittedAt: '10:30 19/12/2023',
        status: 'Pending',
        attachment: '/img/certificate-3.jpg'
    },
    {
        id: 2,
        user: { name: 'Pharmacy Long Chau 01', avatar: 'https://i.pravatar.cc/150?u=2' },
        type: 'License',
        documentName: 'Giấy phép kinh doanh dược phẩm',
        submittedAt: '09:15 19/12/2023',
        status: 'Pending',
        attachment: '/img/license-1.jpg'
    }
];

export default function VerificationPage() {
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleAction = (id: number, action: 'Approve' | 'Reject') => {
        setRequests(prev => prev.filter(r => r.id !== id));
        setSelectedRequest(null);
        // In real app: Call API to update status
        alert(`Đã ${action === 'Approve' ? 'Duyệt' : 'Từ chối'} yêu cầu #${id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Duyệt hồ sơ & Bằng cấp</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List of Requests */}
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-bold text-gray-700">Yêu cầu chờ duyệt ({requests.length})</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {requests.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <i className="fi flaticon-checked text-4xl mb-2 block text-green-500"></i>
                                Không có yêu cầu nào
                            </div>
                        ) : (
                            requests.map(req => (
                                <div
                                    key={req.id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={`p-4 hover:bg-blue-50 cursor-pointer transition ${selectedRequest?.id === req.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={req.user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm text-gray-900 truncate">{req.user.name}</h3>
                                            <p className="text-xs text-gray-500 truncate">{req.documentName}</p>
                                        </div>
                                        <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{req.type}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-right">{req.submittedAt}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2">
                    {selectedRequest ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedRequest.documentName}</h2>
                                    <p className="text-gray-500 text-sm">Người gửi: <span className="font-bold text-gray-800">{selectedRequest.user.name}</span></p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(selectedRequest.id, 'Reject')}
                                        className="px-4 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50"
                                    >
                                        Từ chối
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedRequest.id, 'Approve')}
                                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
                                    >
                                        Duyệt ngay
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[400px]">
                                {/* Preview Placeholder - In real app use verified Image component */}
                                <div className="text-center">
                                    <img
                                        src={selectedRequest.attachment}
                                        alt="Preview"
                                        className="max-h-[500px] max-w-full rounded-lg shadow-sm mx-auto"
                                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Document+Preview')}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Thời gian gửi</span>
                                    <span className="text-gray-900 font-medium">{selectedRequest.submittedAt}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Loại tài liệu</span>
                                    <span className="text-gray-900 font-medium">{selectedRequest.type}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-12">
                            <i className="fi flaticon-document text-4xl mb-4"></i>
                            <p>Chọn một yêu cầu từ danh sách để xem chi tiết</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
