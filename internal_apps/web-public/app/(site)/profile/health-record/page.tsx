'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { Row, Col } from '@/components/ui/Grid';
import Divider from '@/components/ui/Divider';
import { AiOutlineFileText as FileTextOutlined, AiOutlineShareAlt as ShareAltOutlined, AiOutlineCloudUpload as CloudUploadOutlined, AiOutlineFilePdf as FilePdfOutlined } from 'react-icons/ai';

export default function HealthRecordPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const healthMetrics = [
        { label: 'Huyết áp', value: '120/80', unit: 'mmHg', status: 'normal', icon: 'fi-rr-heart' },
        { label: 'Đường huyết', value: '95', unit: 'mg/dL', status: 'normal', icon: 'fi-rr-blood' },
        { label: 'BMI', value: '23.5', unit: 'kg/m²', status: 'normal', icon: 'fi-rr-weight' },
        { label: 'Nhiệt độ', value: '36.8', unit: '°C', status: 'normal', icon: 'fi-rr-thermometer' },
    ];

    const recentRecords = [
        { date: '2024-12-15', type: 'Khám bệnh', doctor: 'BS. Nguyễn Văn A', hospital: 'BV Chợ Rẫy', diagnosis: 'Viêm họng cấp' },
        { date: '2024-12-10', type: 'Xét nghiệm', doctor: 'BS. Trần Thị B', hospital: 'PK Đa khoa', diagnosis: 'Xét nghiệm máu tổng quát' },
        { date: '2024-12-05', type: 'Đơn thuốc', doctor: 'BS. Lê Văn C', hospital: 'BV 115', diagnosis: 'Kê đơn thuốc điều trị' },
    ];

    return (
        <div className="min-h-screen bg-background py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <Title level={2} className="font-black tracking-tight text-slate-900 mb-2">Hồ sơ Sức khỏe Điện tử</Title>
                    <Paragraph type="secondary" className="font-medium">Quản lý toàn bộ thông tin và lịch sử y tế của bạn một cách an toàn</Paragraph>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {healthMetrics.map((metric, i) => (
                        <Card key={i} className="rounded-lg shadow-soft border-border bg-surface p-6 transition-all hover:shadow-card hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <i className={`fi ${metric.icon} text-2xl text-primary`}></i>
                                </div>
                                <Tag color="success" bordered={false}>Bình thường</Tag>
                            </div>
                            <Text type="secondary" className="text-xs font-bold uppercase tracking-widest">{metric.label}</Text>
                            <div className="mt-2 flex items-baseline gap-1">
                                <Text className="text-2xl font-black text-slate-900">{metric.value}</Text>
                                <Text type="secondary" className="text-sm font-bold">{metric.unit}</Text>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Quick Links */}
                    <div className="lg:col-span-1">
                        <Card className="rounded-lg shadow-soft border-border bg-surface p-2 sticky top-24">
                            <div className="p-4 border-b border-border mb-2">
                                <Title level={4} className="m-0 font-black text-slate-800">Danh mục hồ sơ</Title>
                            </div>
                            <div className="flex flex-col gap-1">
                                {[
                                    { icon: 'fi-rr-time-past', label: 'Lịch sử khám bệnh', link: '/health-record/medical-history', count: 12 },
                                    { icon: 'fi-rr-document-signed', label: 'Đơn thuốc', link: '/health-record/prescriptions', count: 8 },
                                    { icon: 'fi-rr-microscope', label: 'Kết quả xét nghiệm', link: '/health-record/lab-results', count: 5 },
                                    { icon: 'fi-rr-shield-check', label: 'Tiêm chủng', link: '/health-record/vaccinations', count: 15 },
                                    { icon: 'fi-rr-pulse', label: 'Chỉ số sức khỏe', link: '/health-record/vitals', count: 45 },
                                    { icon: 'fi-rr-share', label: 'Chia sẻ hồ sơ', link: '/health-record/share', count: 0 },
                                ].map((item, i) => (
                                    <Link key={i} href={item.link}>
                                        <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <i className={`fi ${item.icon} text-lg text-slate-400 group-hover:text-primary transition-colors`}></i>
                                                <span className="font-bold text-slate-600 group-hover:text-primary text-sm">{item.label}</span>
                                            </div>
                                            {item.count > 0 && (
                                                <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-black">{item.count}</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Records */}
                        <Card className="rounded-lg shadow-soft border-border bg-surface overflow-hidden">
                            <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/30">
                                <Title level={4} className="m-0 font-black text-slate-800">Hồ sơ gần đây</Title>
                                <Link href="/health-record/medical-history">
                                    <Button variant="text" className="text-primary font-bold text-sm">Xem tất cả →</Button>
                                </Link>
                            </div>
                            <div className="p-6 space-y-6">
                                {recentRecords.map((record, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0">
                                                {new Date(record.date).getDate()}
                                            </div>
                                            <div className="w-px flex-1 bg-border my-2 group-last:hidden"></div>
                                        </div>
                                        <div className="pb-6 group-last:pb-0 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <Tag color="blue" bordered={false} className="text-[10px]">{record.type}</Tag>
                                                    <Title level={4} className="font-black text-slate-900 mt-2 mb-1">{record.diagnosis}</Title>
                                                </div>
                                                <Text type="secondary" className="text-xs font-bold">{new Date(record.date).toLocaleDateString('vi-VN')}</Text>
                                            </div>
                                            <div className="flex flex-wrap gap-4 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <Text type="secondary" className="text-xs font-bold uppercase tracking-tighter">Bác sĩ:</Text>
                                                    <Text className="text-sm font-bold text-slate-700">{record.doctor}</Text>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Text type="secondary" className="text-xs font-bold uppercase tracking-tighter">Bệnh viện:</Text>
                                                    <Text className="text-sm font-bold text-slate-700">{record.hospital}</Text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Action Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button 
                                variant="primary" 
                                size="large" 
                                className="h-16 rounded-lg font-black shadow-soft"
                                icon={<CloudUploadOutlined className="text-xl" />}
                            >
                                Tải lên tài liệu
                            </Button>
                            <Button 
                                variant="default" 
                                size="large" 
                                className="h-16 rounded-lg font-black shadow-soft bg-white border-2 border-slate-100 hover:border-primary/20"
                                icon={<FilePdfOutlined className="text-xl" />}
                            >
                                Xuất file PDF
                            </Button>
                            <Button 
                                variant="primary" 
                                size="large" 
                                className="h-16 rounded-lg font-black shadow-soft bg-emerald-600 hover:bg-emerald-700 border-none"
                                icon={<ShareAltOutlined className="text-xl" />}
                            >
                                Chia sẻ bác sĩ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
