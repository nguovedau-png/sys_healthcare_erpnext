import React from 'react';
import Banner from '@/components/common/Banner';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AiOutlineExperiment as ExperimentOutlined, AiOutlineMedicineBox as MedicineBoxOutlined } from 'react-icons/ai';
import { FaStethoscope as StethoscopeOutlined } from 'react-icons/fa';

const TIMELINE = [
    { date: '15/12/2024', event: 'Khám Tim mạch', doctor: 'BS. Nguyễn A', hospital: 'BV Chợ Rẫy', type: 'checkup' },
    { date: '10/11/2024', event: 'Xét nghiệm Tổng quát', doctor: '-', hospital: 'Phòng Lab ABC', type: 'test' },
    { date: '05/10/2024', event: 'Tiêm vắc-xin Cúm', doctor: 'BS. Trần B', hospital: 'TT Y tế Q1', type: 'vaccine' },
];

export default function MedicalHistoryPage() {
    return (
        <div className="min-h-screen bg-background pb-20 animate-in fade-in duration-500">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <Title level={1} className="font-black text-slate-900 mb-4">Lịch sử Khám bệnh</Title>
                    <Paragraph type="secondary" className="text-lg">Theo dõi chi tiết các mốc thời gian khám và điều trị của bạn</Paragraph>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-10 top-0 bottom-0 w-px bg-border"></div>
                        <div className="space-y-10">
                            {TIMELINE.map((item, idx) => (
                                <div key={idx} className="relative pl-24 group">
                                    <div className={`absolute left-2 w-16 h-16 rounded-lg shadow-soft border-4 border-white flex items-center justify-center transition-all group-hover:scale-110 z-10 ${
                                        item.type === 'checkup' ? 'bg-primary text-white' : 
                                        item.type === 'test' ? 'bg-secondary text-white' : 
                                        'bg-accent text-white'
                                    }`}>
                                        {item.type === 'checkup' ? <StethoscopeOutlined className="text-2xl" /> : 
                                         item.type === 'test' ? <ExperimentOutlined className="text-2xl" /> : 
                                         <MedicineBoxOutlined className="text-2xl" />}
                                    </div>
                                    <Card className="rounded-lg p-8 shadow-soft border-border bg-surface transition-all hover:shadow-card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <Title level={4} className="font-black text-slate-900 mb-1">{item.event}</Title>
                                                <Text type="secondary" className="text-xs font-bold uppercase tracking-[0.1em]">{item.hospital}</Text>
                                            </div>
                                            <div className="bg-slate-50 px-4 py-1.5 rounded-full border border-border">
                                                <Text className="text-xs font-black text-slate-500">{item.date}</Text>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-8 py-4 border-t border-dashed border-border">
                                            {item.doctor !== '-' && (
                                                <div className="flex flex-col">
                                                    <Text type="secondary" className="text-[10px] font-black uppercase tracking-tighter">Bác sĩ phụ trách</Text>
                                                    <Text className="font-bold text-slate-700">{item.doctor}</Text>
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <Text type="secondary" className="text-[10px] font-black uppercase tracking-tighter">Loại hình</Text>
                                                <Text className="font-bold text-slate-700 uppercase text-xs">{item.type}</Text>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button variant="text" className="text-primary font-black text-sm hover:translate-x-1 transition-transform">
                                                Xem chi tiết hồ sơ →
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
