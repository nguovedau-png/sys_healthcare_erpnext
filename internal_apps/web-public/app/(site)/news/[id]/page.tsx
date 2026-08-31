"use client"
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Aside from '@/components/layout/Aside';
import TagList from '@/components/common/TagList';
import CommentSection from '@/app/(site)/news/components/CommentSection';
import RelatedNews from '@/app/(site)/news/components/RelatedNews';
import contentService, { Post } from '@/services/content.service';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Spin from '@/components/ui/Spin';
import { FaFacebook } from 'react-icons/fa';
import { AiOutlineEye as EyeOutlined, AiOutlineClockCircle as ClockCircleOutlined, AiOutlineUser as UserOutlined, AiOutlineShareAlt as ShareAltOutlined, AiOutlineTag as TagOutlined, AiOutlineSearch as SearchOutlined, AiOutlineArrowLeft as ArrowLeftOutlined } from 'react-icons/ai';

const NewsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [newsItem, setNewsItem] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const item = await contentService.getPost(id);
        setNewsItem(item);
      } catch (err: any) {
        setError(err.message || 'Error loading post');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20">
        <Spin size="large" tip="Đang tải nội dung bài viết..." />
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-20 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center text-4xl mb-8 shadow-soft border border-border">🔍</div>
        <Title level={2} className="font-black text-slate-900 mb-4">Không tìm thấy bài viết</Title>
        <Paragraph type="secondary" className="max-w-md mx-auto mb-10">Bài viết bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc liên kết không hợp lệ.</Paragraph>
        <Link href="/news">
          <Button variant="primary" size="large" icon={<ArrowLeftOutlined />} className="rounded-lg font-black">
            Quay lại trang tin tức
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-background min-h-screen py-16 animate-in fade-in duration-1000">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-6">

          {/* Main Content - Left 75% on large screens */}
          <div className="w-full lg:w-9/12 px-6 mb-12 lg:mb-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 overflow-hidden">
              <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">TRANG CHỦ</Link>
              <span className="opacity-30">/</span>
              <Link href="/news" className="hover:text-primary transition-colors flex-shrink-0">TIN TỨC</Link>
              <span className="opacity-30">/</span>
              <span className="text-primary truncate">{newsItem.title}</span>
            </div>

            <Card className="bg-surface p-8 md:p-12 lg:p-20 rounded-lg shadow-premium border-border overflow-hidden">
              <div className="mb-10">
                <Tag color="primary" bordered={false} className="mb-8 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30 !bg-primary !text-white">
                  {newsItem.category}
                </Tag>
                <Title level={1} className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-10 tracking-tight">
                  {newsItem.title}
                </Title>
              </div>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-8 py-10 border-y border-slate-50 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-lg bg-slate-50 overflow-hidden border-2 border-white shadow-soft ring-1 ring-slate-100">
                    <img src={'/img/user/default.png'} alt={newsItem.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block text-xl font-black text-slate-800 leading-tight mb-1">{newsItem.author || 'Ban biên tập'}</span>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><ClockCircleOutlined className="text-primary" /> {newsItem.date}</span>
                      <span className="flex items-center gap-2"><EyeOutlined className="text-primary" /> {newsItem.view?.toLocaleString() || 0} lượt xem</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="default" className="rounded-xl h-12 px-6 font-black text-sm bg-blue-50 text-blue-600 border-none hover:bg-blue-600 hover:text-white" icon={<FaFacebook />}>
                    Chia sẻ
                  </Button>
                  <Button variant="default" className="rounded-xl w-12 h-12 flex items-center justify-center border-border bg-slate-50 text-slate-400 hover:text-primary" icon={<ShareAltOutlined className="text-xl" />} />
                </div>
              </div>

              {/* Content Body */}
              <div className="article-content max-w-4xl mx-auto">
                {newsItem.desc && (
                  <div className="relative mb-16 pl-10">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary rounded-full shadow-lg shadow-primary/20"></div>
                    <Title level={4} className="text-2xl md:text-3xl font-black text-slate-700 leading-relaxed italic bg-slate-50/50 p-10 rounded-lg border border-border/50" style={{ fontWeight: 900 }}>
                      {newsItem.desc}
                    </Title>
                  </div>
                )}

                <div className="w-full rounded-lg overflow-hidden mb-16 shadow-premium border-8 border-white ring-1 ring-slate-100">
                  <img src={newsItem.thumbnail || '/img/placeholder.png'} alt={newsItem.title} className="w-full h-auto object-cover" />
                </div>

                <div className="prose prose-2xl max-w-none text-slate-700 leading-[1.8] whitespace-pre-line font-medium text-lg lg:text-xl">
                  {newsItem.content}
                </div>

                <div className="mt-20 p-10 bg-primary/5 rounded-lg border border-primary/10 flex gap-8 items-start shadow-soft">
                  <div className="w-14 h-14 rounded-lg bg-primary text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-primary/20">
                    💡
                  </div>
                  <div>
                    <Title level={5} className="text-primary font-black text-lg mb-3">Tuyên bố miễn trừ trách nhiệm</Title>
                    <Paragraph className="text-sm text-slate-600 leading-relaxed m-0 font-medium">
                      Nội dung trên Healthe Care System chỉ mang tính chất tham khảo, không dùng để thay thế chẩn đoán hoặc điều trị y khoa.
                      Quý độc giả vui lòng tham khảo ý kiến chuyên gia y tế trước khi áp dụng bất kỳ thông tin nào.
                    </Paragraph>
                  </div>
                </div>
              </div>

              {/* Footer Tags */}
              <div className="mt-20 p-10 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center flex-wrap gap-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/10">
                    <TagOutlined className="text-sm" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Từ khóa bài viết</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['HEALTHCARE', 'YTE', 'Healthe Care System', 'SUKKHOE'].map((t) => (
                      <Link key={t} href={`/search?q=${t}`}>
                        <Tag color="secondary" bordered={false} className="px-6 py-3 rounded-xl text-[10px] font-black !text-slate-700 hover:!bg-primary hover:!text-white transition-all cursor-pointer border border-slate-200 !bg-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 uppercase tracking-widest">
                          #{t}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Related News & Comments */}
            <div id="comments" className="mt-24 space-y-24">
              <RelatedNews />
              <CommentSection postId={Number(id)} />
            </div>
          </div>

          {/* Sidebar - Right 25% on large screens */}
          <div className="w-full lg:w-3/12 px-6">
            <div className="sticky top-24 space-y-12">
              {/* Search Box */}
              <div className="p-10 rounded-[2.5rem] shadow-premium border-none bg-slate-900 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                    <h5 className="m-0 font-black text-[11px] uppercase tracking-[0.2em] text-white">Tìm kiếm bài viết</h5>
                  </div>
                  <div className="relative group/input">
                    <Input
                      placeholder="Nhập từ khóa..."
                      className="rounded-2xl font-black text-sm h-14 !bg-white/10 border-white/10 !text-white placeholder:text-white/40 focus:!bg-white focus:!text-slate-900 focus:border-white transition-all pr-12"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-lg shadow-primary/30 hover:scale-110 transition-all">
                      <SearchOutlined className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <Card className="p-10 rounded-[2.5rem] shadow-soft border-slate-100 bg-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/20"></div>
                  <Title level={5} className="m-0 font-black text-[11px] uppercase tracking-[0.2em] text-slate-900">Chủ đề HOT</Title>
                </div>
                <TagList />
              </Card>

              {/* Aside Component */}
              <Aside isFixed={false} />

              {/* Banner Ad */}
              <Card className="w-full aspect-[300/500] bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm overflow-hidden relative group cursor-pointer shadow-premium border-none">
                <img src="https://img.freepik.com/free-photo/medical-stethoscope-isolated-with-copyspace_23-2148281313.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all duration-1000" alt="Ad" />
                <div className="z-10 text-center p-10">
                  <Text className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 text-primary block">TƯ VẤN MIỄN PHÍ</Text>
                  <Title level={2} className="text-2xl font-black leading-tight mb-8 text-white" style={{ color: 'white' }}>Bạn cần bác sĩ tư vấn ngay bây giờ?</Title>
                  <Button variant="primary" size="large" className="rounded-lg font-black px-10 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all">
                    Kết nối ngay
                  </Button>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;