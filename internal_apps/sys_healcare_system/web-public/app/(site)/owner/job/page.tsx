"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function JobPage() {
    const jobs = [
        {
            id: 1,
            title: 'Bác sĩ Đa khoa',
            location: 'TP. Hồ Chí Minh',
            type: 'Toàn thời gian',
            salary: '20-40 triệu/tháng',
            description: 'Khám bệnh, tư vấn sức khỏe cho bệnh nhân',
            requirements: ['Tốt nghiệp Y khoa', 'Có chứng chỉ hành nghề', 'Kinh nghiệm từ 2 năm']
        },
        {
            id: 2,
            title: 'Điều dưỡng viên',
            location: 'TP. Hồ Chí Minh',
            type: 'Toàn thời gian',
            salary: '10-20 triệu/tháng',
            description: 'Hỗ trợ bác sĩ, chăm sóc bệnh nhân',
            requirements: ['Tốt nghiệp Điều dưỡng', 'Có chứng chỉ hành nghề', 'Nhiệt tình, chu đáo']
        },
        {
            id: 3,
            title: 'Kỹ sư Phần mềm',
            location: 'TP. Hồ Chí Minh',
            type: 'Toàn thời gian',
            salary: '25-50 triệu/tháng',
            description: 'Phát triển ứng dụng y tế số',
            requirements: ['Tốt nghiệp CNTT', 'Biết React/Next.js', 'Kinh nghiệm 2 năm']
        },
        {
            id: 4,
            title: 'Nhân viên Kinh doanh',
            location: 'Toàn quốc',
            type: 'Toàn thời gian',
            salary: '15-30 triệu/tháng',
            description: 'Tìm kiếm đối tác bệnh viện, phòng khám',
            requirements: ['Tốt nghiệp Đại học', 'Kỹ năng giao tiếp tốt', 'Có kinh nghiệm sales']
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Tuyển dụng</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Tham gia cùng chúng tôi xây dựng nền tảng y tế số toàn diện
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map(job => (
                        <div key={job.id} className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                                    <p className="text-gray-500 text-sm">{job.location} · {job.type}</p>
                                </div>
                                <span className="text-primary font-semibold text-sm">{job.salary}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h4>
                                <ul className="space-y-1">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="text-gray-500 text-sm flex items-center">
                                            <i className="fi flaticon-check text-green-500 mr-2"></i>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                                Ứng tuyển
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-blue-50 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Bạn có muốn trở thành đối tác?</h3>
                    <p className="text-gray-600 mb-6">Hợp tác với Medical Ecosystem để tiếp cận hàng triệu bệnh nhân</p>
                    <a href="/owner/contact" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                        Liên hệ hợp tác
                    </a>
                </div>
            </div>
        </div>
    );
}