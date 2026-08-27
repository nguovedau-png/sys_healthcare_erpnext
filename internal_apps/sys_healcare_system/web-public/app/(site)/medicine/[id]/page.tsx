"use client"
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Aside from '@/components/layout/Aside';
import searchService from '@/services/search.service';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Spin from '@/components/ui/Spin';
import { 
  AiOutlineArrowLeft as ArrowLeftOutlined,
  AiOutlineShoppingCart as CartOutlined,
  AiOutlineSafetyCertificate as SafetyOutlined,
  AiOutlineInfoCircle as InfoCircleOutlined,
  AiOutlineWarning as WarningOutlined,
  AiOutlineMedicineBox as MedicineOutlined
} from 'react-icons/ai';

const MedicineDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [medicine, setMedicine] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const item = await searchService.getMedicine(id);
        setMedicine(item);
      } catch (err: any) {
        setError(err.message || 'Error loading medicine information');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMedicine();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20">
        <Spin size="large" tip="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-20 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center text-4xl mb-8 shadow-soft border border-border">💊</div>
        <Title level={2} className="font-black text-slate-900 mb-4">Không tìm thấy sản phẩm</Title>
        <Paragraph type="secondary" className="max-w-md mx-auto mb-10">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã hết hàng.</Paragraph>
        <Link href="/search?type=medicine">
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
              <Link href="/search?type=medicine" className="hover:text-primary transition-colors flex-shrink-0">THUỐC A-Z</Link>
              <span className="opacity-30">/</span>
              <span className="text-primary truncate">{medicine.name}</span>
            </div>

            <Card className="p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-premium border-none bg-white mb-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <div className="md:col-span-5">
                   <div className="bg-white rounded-3xl border border-slate-100 p-8 aspect-square flex items-center justify-center shadow-soft relative group">
                      <img 
                        src={medicine.image || '/img/default-medicine.jpg'} 
                        alt={medicine.name} 
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                      />
                      {medicine.isPrescription && (
                        <div className="absolute top-6 right-6 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg shadow-red-600/20 uppercase tracking-widest">RX - Kê đơn</div>
                      )}
                   </div>
                </div>

                <div className="md:col-span-7 flex flex-col">
                  <div className="mb-8">
                    <Tag color="success" bordered={false} className="mb-4 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {medicine.category || 'Dược phẩm'}
                    </Tag>
                    <Title level={1} className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                      {medicine.name}
                    </Title>
                    <Text className="text-slate-400 font-bold uppercase tracking-[0.15em] text-xs">Thương hiệu: <span className="text-primary">{medicine.manufacturer || 'Đang cập nhật'}</span></Text>
                  </div>

                  <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 mb-10">
                    <div className="flex items-end gap-3 mb-6">
                      <span className="text-3xl font-black text-blue-600">{medicine.price?.toLocaleString('vi-VN')}đ</span>
                      <span className="text-slate-400 text-sm font-bold mb-1.5">/ {medicine.unit || 'Hộp'}</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary" size="large" icon={<CartOutlined />} className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/30 flex-1">
                        Thêm vào giỏ
                      </Button>
                      <Button variant="outline" size="large" className="h-14 w-14 rounded-2xl flex items-center justify-center p-0 border-slate-200 text-slate-400 hover:text-primary hover:border-primary">
                         ❤
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-50 bg-slate-50/20">
                       <Text className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hoạt chất</Text>
                       <Text className="font-bold text-slate-700 truncate block">{medicine.genericName || 'N/A'}</Text>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-50 bg-slate-50/20">
                       <Text className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dạng bào chế</Text>
                       <Text className="font-bold text-slate-700 truncate block">{medicine.form || 'N/A'}</Text>
                    </div>
                  </div>
                </div>
              </div>

              <div className="article-content border-t border-slate-50 pt-16 space-y-16">
                 <section>
                    <Title level={4} className="text-slate-900 font-black mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                      Chỉ định & Công dụng
                    </Title>
                    <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                       {medicine.indications?.length > 0 ? (
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 list-none p-0">
                           {medicine.indications.map((ind: string, i: number) => (
                             <li key={i} className="flex items-start gap-3 before:content-['✓'] before:text-teal-500 before:font-black before:mr-2">
                               {ind}
                             </li>
                           ))}
                         </ul>
                       ) : (
                         <Text>{medicine.description || 'Thông tin đang được cập nhật...'}</Text>
                       )}
                    </div>
                 </section>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section>
                      <Title level={4} className="text-slate-900 font-black mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        Cách dùng & Liều lượng
                      </Title>
                      <div className="bg-orange-50/30 p-8 rounded-2xl border border-orange-100/50">
                        <Text className="text-slate-700 leading-relaxed block">{medicine.dosage || 'Vui lòng đọc kỹ hướng dẫn sử dụng đi kèm sản phẩm.'}</Text>
                      </div>
                    </section>

                    <section>
                      <Title level={4} className="text-slate-900 font-black mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                        Tác dụng phụ
                      </Title>
                      <div className="bg-rose-50/30 p-8 rounded-2xl border border-rose-100/50">
                        <Text className="text-slate-700 leading-relaxed block italic">{medicine.sideEffects || 'Chưa ghi nhận tác dụng phụ nghiêm trọng.'}</Text>
                      </div>
                    </section>
                 </div>

                 {/* Warning Section */}
                 <div className="p-8 bg-slate-900 rounded-[2rem] border-none flex gap-8 items-start shadow-premium">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-primary/30 animate-pulse">
                    <WarningOutlined />
                  </div>
                  <div>
                    <Title level={5} className="text-white font-black text-lg mb-2 uppercase tracking-wider">Cảnh báo an toàn</Title>
                    <Paragraph className="text-sm text-white/60 leading-relaxed m-0 font-medium">
                      Luôn tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi sử dụng bất kỳ loại thuốc nào. 
                      Không tự ý tăng liều hoặc ngưng sử dụng thuốc mà chưa có chỉ định y tế. 
                      Để xa tầm tay trẻ em.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-3/12 px-6">
            <div className="sticky top-24 space-y-10">
              <Card className="p-10 rounded-[2.5rem] shadow-premium border-none bg-primary text-white overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <MedicineOutlined className="text-6xl mb-6 mx-auto" />
                  <Title level={4} className="text-white font-black mb-4 uppercase tracking-widest text-sm">Hỏi đáp Dược sĩ</Title>
                  <Text className="text-white/80 text-xs block mb-8 leading-relaxed">Bạn có thắc mắc về cách sử dụng thuốc <strong>{medicine.name}</strong>?</Text>
                  <Button variant="default" block className="rounded-xl h-12 font-black !bg-white !text-primary border-none shadow-xl shadow-black/10">Trò chuyện ngay</Button>
                </div>
              </Card>
              
              <Card className="p-8 rounded-[2rem] shadow-soft border-slate-100 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                  <Title level={5} className="m-0 font-black text-[11px] uppercase tracking-[0.2em] text-slate-900">Cam kết chất lượng</Title>
                </div>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {[
                    { icon: '🛡️', text: 'Sản phẩm chính hãng 100%' },
                    { icon: '❄️', text: 'Bảo quản đúng tiêu chuẩn GSP' },
                    { icon: '🚚', text: 'Giao hàng nhanh 2h (nội thành)' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-600">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Aside isFixed={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicineDetailPage;
