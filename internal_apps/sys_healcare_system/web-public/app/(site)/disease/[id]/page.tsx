"use client"
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Aside from '@/components/layout/Aside';
import contentService, { Disease } from '@/services/content.service';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Spin from '@/components/ui/Spin';
import { 
  AiOutlineArrowLeft as ArrowLeftOutlined,
  AiOutlineInfoCircle as InfoCircleOutlined,
  AiOutlineWarning as WarningOutlined,
  AiOutlineSafetyCertificate as SafetyOutlined,
  AiOutlineMedicineBox as MedicineOutlined
} from 'react-icons/ai';

const DiseaseDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const item = await contentService.getDisease(id);
        setDisease(item);
      } catch (err: any) {
        setError(err.message || 'Error loading disease information');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDisease();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20">
        <Spin size="large" tip="Đang tải thông tin bệnh lý..." />
      </div>
    );
  }

  if (error || !disease) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-20 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center text-4xl mb-8 shadow-soft border border-border">🔍</div>
        <Title level={2} className="font-black text-slate-900 mb-4">Không tìm thấy thông tin</Title>
        <Paragraph type="secondary" className="max-w-md mx-auto mb-10">Thông tin bệnh lý bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</Paragraph>
        <Link href="/search?type=disease">
          <Button variant="primary" size="large" icon={<ArrowLeftOutlined />} className="rounded-lg font-black">
            Quay lại tìm kiếm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 animate-in fade-in duration-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full lg:w-9/12 px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 overflow-hidden">
              <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">TRANG CHỦ</Link>
              <span className="opacity-30">/</span>
              <Link href="/search?type=disease" className="hover:text-primary transition-colors flex-shrink-0">BỆNH A-Z</Link>
              <span className="opacity-30">/</span>
              <span className="text-primary truncate">{disease.name}</span>
            </div>

            <Card className="p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-premium border-none bg-white mb-10">
              <div className="mb-10">
                <Tag color={disease.severity === 'high' ? 'danger' : disease.severity === 'medium' ? 'warning' : 'success'} bordered={false} className="mb-6 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {disease.severity === 'high' ? 'Mức độ: Nguy hiểm' : disease.severity === 'medium' ? 'Mức độ: Trung bình' : 'Mức độ: Nhẹ'}
                </Tag>
                <Title level={1} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                  {disease.name}
                </Title>
                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl"><InfoCircleOutlined className="text-primary" /> Mã ICD-10: {disease.icd10 || 'Đang cập nhật'}</span>
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl"><MedicineOutlined className="text-primary" /> Chuyên khoa: {disease.specialist}</span>
                </div>
              </div>

              <div className="article-content prose prose-lg max-w-none text-slate-700 leading-relaxed">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-12">
                  <Title level={4} className="text-slate-900 font-black mb-4 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    Tổng quan
                  </Title>
                  <Text className="text-lg leading-relaxed block">{disease.description}</Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                  <div className="space-y-8">
                    <div>
                      <Title level={4} className="text-slate-900 font-black mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        Triệu chứng thường gặp
                      </Title>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <Text className="whitespace-pre-line leading-relaxed">{disease.symptoms || 'Thông tin đang được cập nhật...'}</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <Title level={4} className="text-slate-900 font-black mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                        Lời khuyên y khoa
                      </Title>
                      <div className="bg-teal-50/30 p-6 rounded-2xl border border-teal-100/50">
                        <Paragraph className="m-0 text-slate-700 leading-relaxed">
                          Khi có các dấu hiệu bất thường, người bệnh nên đến ngay cơ sở y tế gần nhất hoặc chuyên khoa <strong>{disease.specialist}</strong> để được thăm khám và điều trị kịp thời.
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Section */}
                <div className="mt-12 p-8 bg-rose-50 rounded-2xl border border-rose-100 flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-rose-500/20">
                    <WarningOutlined />
                  </div>
                  <div>
                    <Title level={5} className="text-rose-900 font-black text-lg mb-2 uppercase tracking-wider">Lưu ý quan trọng</Title>
                    <Paragraph className="text-sm text-rose-800/80 leading-relaxed m-0 font-medium italic">
                      Thông tin này chỉ mang tính chất tham khảo. Đừng tự ý chẩn đoán hoặc tự điều trị. Hãy luôn thảo luận với bác sĩ chuyên khoa về tình trạng sức khỏe của bạn.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center mb-16">
               <Link href="/booking">
                  <Button variant="primary" size="large" className="rounded-2xl h-16 px-12 font-black text-lg shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all">
                    Đặt lịch khám ngay
                  </Button>
               </Link>
            </div>
          </div>

          <div className="w-full lg:w-3/12 px-6">
            <div className="sticky top-24 space-y-10">
              <Card className="p-8 rounded-[2rem] shadow-premium border-none bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 text-center">
                  <SafetyOutlined className="text-5xl text-primary mb-6 mx-auto" />
                  <Title level={4} className="text-white font-black mb-4 uppercase tracking-widest text-sm">Hỗ trợ khẩn cấp</Title>
                  <Text className="text-white/60 text-xs block mb-8 leading-relaxed">Bạn cần tư vấn về bệnh lý <strong>{disease.name}</strong>?</Text>
                  <Button variant="primary" block className="rounded-xl h-12 font-black shadow-lg shadow-primary/30">Gọi bác sĩ ngay</Button>
                </div>
              </Card>
              <Aside isFixed={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetailPage;
