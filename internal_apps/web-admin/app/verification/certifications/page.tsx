"use client";
import React, { useState } from 'react';

interface CertificateSubmission {
    id: string;
    pharmacyId: string;
    pharmacyName: string;
    type: 'gpp' | 'business' | 'pharmacist_license' | 'other';
    certificateNumber: string;
    issueDate: string;
    expiryDate: string;
    issuedBy: string;
    certificateImage: string;
    status: 'pending' | 'verified' | 'rejected';
    submittedDate: string;
    reviewedBy?: string;
    reviewedDate?: string;
    rejectionReason?: string;
}

export default function CertificationVerificationPage() {
    const [selectedCert, setSelectedCert] = useState<CertificateSubmission | null>(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const submissions: CertificateSubmission[] = [
        {
            id: '1',
            pharmacyId: 'PH001',
            pharmacyName: 'Nhà thuốc Long Châu',
            type: 'gpp',
            certificateNumber: 'GPP-2024-001',
            issueDate: '2024-01-15',
            expiryDate: '2027-01-15',
            issuedBy: 'Sở Y tế TP.HCM',
            certificateImage: '/img/certificates/gpp1.jpg',
            status: 'pending',
            submittedDate: '2024-12-20'
        },
        {
            id: '2',
            pharmacyId: 'PH002',
            pharmacyName: 'Nhà thuốc Pharmacity',
            type: 'business',
            certificateNumber: 'GPKD-2024-002',
            issueDate: '2024-02-01',
            expiryDate: '2029-02-01',
            issuedBy: 'Sở Kế hoạch và Đầu tư TP.HCM',
            certificateImage: '/img/certificates/business1.jpg',
            status: 'verified',
            submittedDate: '2024-12-18',
            reviewedBy: 'Admin',
            reviewedDate: '2024-12-19'
        }
    ];

    const handleApprove = (cert: CertificateSubmission) => {
        // API call to approve
        console.log('Approved:', cert);
        setShowReviewModal(false);
    };

    const handleReject = (cert: CertificateSubmission) => {
        // API call to reject with reason
        console.log('Rejected:', cert, 'Reason:', rejectionReason);
        setShowReviewModal(false);
        setRejectionReason('');
    };

    const getCertificateTypeName = (type: string) => {
        const types: Record<string, string> = {
            'gpp': 'Chứng chỉ GPP',
            'business': 'Giấy phép kinh doanh',
            'pharmacist_license': 'Chứng chỉ hành nghề',
            'other': 'Khác'
        };
        return types[type] || type;
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Xác minh Chứng chỉ</h1>
                    <p className="text-gray-500 text-sm mt-1">Duyệt GPP và bằng cấp của nhà thuốc</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Chờ duyệt', value: '45', icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Đã duyệt', value: '1,234', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Từ chối', value: '12', icon: 'flaticon-cancel', color: 'bg-red-500' },
                    { label: 'Sắp hết hạn', value: '23', icon: 'flaticon-warning', color: 'bg-yellow-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả trạng thái</option>
                        <option>Chờ duyệt</option>
                        <option>Đã duyệt</option>
                        <option>Từ chối</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option>Tất cả loại</option>
                        <option>GPP</option>
                        <option>Giấy phép KD</option>
                        <option>Chứng chỉ hành nghề</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" placeholder="Tìm kiếm..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Submissions List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Nhà thuốc</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Loại chứng chỉ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Số chứng chỉ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Cơ quan cấp</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Hiệu lực</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Ngày gửi</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {submissions.map((cert) => (
                            <tr key={cert.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-gray-900">{cert.pharmacyName}</p>
                                        <p className="text-xs text-gray-500">{cert.pharmacyId}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${cert.type === 'gpp' ? 'bg-green-100 text-green-700' :
                                            cert.type === 'business' ? 'bg-blue-100 text-blue-700' :
                                                'bg-purple-100 text-purple-700'
                                        }`}>
                                        {getCertificateTypeName(cert.type)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-gray-900">{cert.certificateNumber}</td>
                                <td className="px-6 py-4 text-gray-600 text-xs">{cert.issuedBy}</td>
                                <td className="px-6 py-4 text-xs">
                                    <p className="text-gray-600">{new Date(cert.issueDate).toLocaleDateString('vi-VN')}</p>
                                    <p className="text-gray-600">đến {new Date(cert.expiryDate).toLocaleDateString('vi-VN')}</p>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-xs">
                                    {new Date(cert.submittedDate).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${cert.status === 'verified' ? 'bg-green-100 text-green-700' :
                                            cert.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {cert.status === 'verified' ? 'Đã duyệt' :
                                            cert.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => {
                                            setSelectedCert(cert);
                                            setShowReviewModal(true);
                                        }}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200"
                                    >
                                        Xem xét
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Review Modal */}
            {showReviewModal && selectedCert && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Xem xét Chứng chỉ</h3>
                            <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Certificate Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nhà thuốc</label>
                                    <p className="text-gray-900">{selectedCert.pharmacyName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Loại chứng chỉ</label>
                                    <p className="text-gray-900">{getCertificateTypeName(selectedCert.type)}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số chứng chỉ</label>
                                    <p className="text-gray-900 font-mono">{selectedCert.certificateNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cơ quan cấp</label>
                                    <p className="text-gray-900">{selectedCert.issuedBy}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Ngày cấp</label>
                                        <p className="text-gray-900">{new Date(selectedCert.issueDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Ngày hết hạn</label>
                                        <p className="text-gray-900">{new Date(selectedCert.expiryDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate Image */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh chứng chỉ</label>
                                <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
                                    <div className="text-center">
                                        <div className="text-6xl mb-3">📄</div>
                                        <p className="text-gray-600">Xem ảnh chứng chỉ</p>
                                        <button className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                                            Phóng to
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rejection Reason (if rejecting) */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Lý do từ chối (nếu có)</label>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Nhập lý do từ chối..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => handleReject(selectedCert)}
                                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
                            >
                                Từ chối
                            </button>
                            <button
                                onClick={() => handleApprove(selectedCert)}
                                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
                            >
                                Phê duyệt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
