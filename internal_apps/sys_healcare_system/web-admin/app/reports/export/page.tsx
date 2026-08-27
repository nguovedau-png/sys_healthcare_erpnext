"use client";

import React, { useState, useEffect } from 'react';
import reportService, { ExportTicket } from '@/services/report.service';

export default function ExportReportsPage() {
    const [reports, setReports] = useState<ExportTicket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await reportService.getExportReports();
                setReports(data);
            } catch (error) {
                console.error('Failed to fetch export reports', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const handleExport = async (report: ExportTicket) => {
        try {
            await reportService.triggerExport({ title: report.title, description: report.description });
            alert(`Đang xuất báo cáo: ${report.title}\nFile CSV sẽ được xử lý và tải xuống khi hoàn thành...`);
        } catch (error) {
            alert('Lỗi khi xuất báo cáo. Vui lòng thử lại sau.');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Xuất Báo cáo</h1>
                <p className="text-gray-500 text-sm mt-1">Tải xuống báo cáo chi tiết dưới dạng CSV/Excel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 ${report.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                <i className={`fi ${report.icon} text-xl`}></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
                                <p className="text-sm text-gray-600">{report.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-2xl font-bold text-gray-900">{report.count} <span className="text-sm text-gray-500 font-normal">học viên</span></span>
                            <button
                                onClick={() => handleExport(report)}
                                className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2"
                            >
                                <i className="fi flaticon-download"></i> Xuất CSV
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sample Data Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Xem trước Dữ liệu (Mẫu)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3 font-bold text-gray-700">Tên</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Email</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Nơi làm việc</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Pre-test</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Video</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Post-test</th>
                                <th className="px-4 py-3 font-bold text-gray-700">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: 'Nguyen Van A', email: 'nva@email.com', workplace: 'BV Chợ Rẫy', pretest: 'Đạt', video: '100%', posttest: 'Đạt', status: 'Hoàn thành' },
                                { name: 'Tran Thi B', email: 'ttb@email.com', workplace: 'BV 115', pretest: 'Đạt', video: '85%', posttest: 'Đạt', status: 'Hoàn thành' },
                                { name: 'Le Van C', email: 'lvc@email.com', workplace: 'BV Đại học Y', pretest: 'Không đạt', video: '45%', posttest: '-', status: 'Chưa hoàn thành' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{row.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{row.workplace}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${row.pretest === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {row.pretest}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-blue-600">{row.video}</td>
                                    <td className="px-4 py-3">
                                        {row.posttest === '-' ? (
                                            <span className="text-gray-400">-</span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${row.posttest === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {row.posttest}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
