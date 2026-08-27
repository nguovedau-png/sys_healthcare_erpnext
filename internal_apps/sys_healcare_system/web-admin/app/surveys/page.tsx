"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import surveyService, { Survey } from '@/services/survey.service';

export default function SurveyListPage() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            const data = await surveyService.getSurveys();
            // Ensure data is an array, handle edge cases
            setSurveys(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch surveys', error);
            setSurveys([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa khảo sát này?')) {
            try {
                await surveyService.deleteSurvey(id);
                fetchSurveys();
            } catch (error) {
                alert('Lỗi khi xóa khảo sát');
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-700';
            case 'DRAFT': return 'bg-gray-100 text-gray-700';
            case 'CLOSED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'Đang chạy';
            case 'DRAFT': return 'Bản nháp';
            case 'CLOSED': return 'Đã đóng';
            default: return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Khảo sát</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và quản lý các bài khảo sát, thu thập ý kiến người dùng.</p>
                </div>
                <Link href="/surveys/builder" className="btn btn-primary bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition">
                    <i className="fi flaticon-add"></i> Tạo khảo sát
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Đang tải danh sách khảo sát...</div>
                ) : surveys.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">Chưa có khảo sát nào được tạo.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Tên khảo sát</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Phản hồi</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Ngày tạo</th>
                                <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {surveys.map((survey) => (
                                <tr key={survey.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{survey.title}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-xs">{survey.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(survey.status)}`}>
                                            {formatStatus(survey.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">{survey._count?.responses || 0}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(survey.createdAt).toLocaleDateString('vi-VN')}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/surveys/${survey.id}/report`} className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm flex items-center gap-1" title="Xem báo cáo">
                                                <i className="fi flaticon-stats"></i>
                                                <span>Báo cáo</span>
                                            </Link>
                                            <Link href={`/surveys/builder?id=${survey.id}`} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center gap-1" title="Chỉnh sửa">
                                                <i className="fi flaticon-edit"></i>
                                                <span>Sửa</span>
                                            </Link>
                                            <button onClick={() => handleDelete(survey.id)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm flex items-center gap-1" title="Xóa">
                                                <i className="fi flaticon-trash"></i>
                                                <span>Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
