"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import Aside from '@/components/layout/Aside';
import TagList from '@/components/common/TagList';
import contentService, { Post } from '@/services/content.service';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Spin from '@/components/ui/Spin';
import { AiOutlineSearch as SearchOutlined, AiOutlineEye as EyeOutlined, AiOutlineClockCircle as ClockCircleOutlined, AiOutlineUser as UserOutlined } from 'react-icons/ai';

const NewsCategory = () => {
  const [allArticles, setAllArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await contentService.getPosts();
        const data = response.data || response;
        setAllArticles(Array.isArray(data) ? data.filter((item: any) => item.isActive) : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center py-20">
        <Spin size="large" tip="Đang cập nhật tin tức y tế..." />
      </div>
    );
  }

  if (error) return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-20 text-center">
      <Title level={4} className="text-error mb-4">Lỗi tải dữ liệu</Title>
      <Text type="secondary" className="mb-6">{error}</Text>
      <Button variant="primary" onClick={() => window.location.reload()}>Thử lại</Button>
    </div>
  );

  // Hero Section Data (Top 3)
  const heroMain = allArticles[0];
  const heroSub = allArticles.slice(1, 3);

  // Latest News Data (Next 6)
  const latestNewsItems = allArticles.slice(3, 9);

  // Group by category for SECTION 3
  const categoriesMap = allArticles.reduce((acc: any, article: any) => {
    const catName = article.category || 'Tin tức chung';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(article);
    return acc;
  }, {});

  const categoryEntries = Object.entries(categoriesMap);

  return (
    <div className="bg-background min-h-screen">
      <Banner page="news" />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-6">

            {/* Main Content (75%) */}
            <div className="w-full lg:w-9/12 px-6 mb-12 lg:mb-0">

              {/* SECTION 1: HERO NEWS */}
              {heroMain && (
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-10 bg-primary rounded-full"></div>
                    <Title level={2} className="m-0 font-black tracking-tight text-slate-900 uppercase">Tiêu điểm sức khỏe</Title>
                    <div className="h-px bg-slate-100 flex-1 ml-4"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Big Main Card */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-lg shadow-premium h-[550px] cursor-pointer">
                      <img src={heroMain.thumbnail || '/img/placeholder.png'} alt={heroMain.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-10 md:p-12 w-full z-10">
                        <Tag color="primary" bordered={false} className="mb-6 px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30">Nổi bật</Tag>
                        <Title className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-6 group-hover:text-primary transition-colors line-clamp-2" style={{ color: 'white' }}>
                          <Link href={`/news/${heroMain.id}`}>{heroMain.title}</Link>
                        </Title>
                        <div className="flex flex-wrap items-center text-white/70 text-sm gap-6 font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                              <UserOutlined className="text-white" />
                            </div>
                            <span className="font-black text-white">{heroMain.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockCircleOutlined className="text-primary" />
                            <span>{heroMain.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <EyeOutlined className="text-primary" />
                            <span>{heroMain.view || 0} lượt xem</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Side Sub Cards */}
                    <div className="flex flex-col gap-8">
                      {heroSub.map((item: any, idx: number) => (
                        <div key={item.id || idx} className="flex-1 relative group overflow-hidden rounded-lg shadow-premium cursor-pointer min-h-[250px]">
                          <img src={item.thumbnail || '/img/placeholder.png'} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                            <Title level={4} className="text-lg font-black text-white leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors" style={{ color: 'white' }}>
                              <Link href={`/news/${item.id}`}>{item.title}</Link>
                            </Title>
                            <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                              <ClockCircleOutlined className="text-primary/80" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: LATEST NEWS GRID */}
              {latestNewsItems.length > 0 && (
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-2 h-10 bg-secondary rounded-full"></div>
                    <Title level={3} className="m-0 font-black tracking-tight text-slate-900 uppercase">Cập nhật mới nhất</Title>
                    <div className="h-px bg-slate-100 flex-1 ml-4"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {latestNewsItems.map((item: any, index: number) => (
                      <Card key={item.id || index} hoverable className="flex flex-col group h-full bg-surface rounded-lg p-4 shadow-soft border-border transition-all">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 relative flex-shrink-0 shadow-soft">
                          <img src={item.thumbnail || '/img/placeholder.png'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                        </div>
                        <div className="flex-1 flex flex-col px-2 pb-2">
                          <div className="flex items-center gap-3 mb-4">
                            <Tag color="secondary" bordered={false} className="text-[10px] font-black uppercase tracking-widest px-3">Y khoa</Tag>
                            <Text type="secondary" className="text-[10px] font-bold text-muted uppercase">{item.date}</Text>
                          </div>
                          <Title level={4} className="text-base font-black text-slate-800 leading-snug mb-4 line-clamp-3 group-hover:text-primary transition-colors">
                            <Link href={`/news/${item.id}`}>{item.title}</Link>
                          </Title>
                          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Bởi {item.author}</Text>
                            <Button variant="text" size="small" className="p-0 text-primary h-auto font-black text-[10px] uppercase">Chi tiết →</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: CATEGORY STRIPS */}
              <div className="space-y-20">
                {categoryEntries.map(([categoryName, articles]: [string, any], catIndex: number) => (
                  <div key={catIndex}>
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-accent rounded-full"></div>
                        <Title level={3} className="m-0 font-black tracking-tight text-slate-900 uppercase">{categoryName}</Title>
                      </div>
                      <Link href="#">
                        <Button variant="text" size="small" className="text-primary font-black text-xs uppercase tracking-widest">
                          Tất cả {categoryName} →
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Large Featured Article for Category */}
                      {articles[0] && (
                        <Card hoverable className="md:row-span-3 group cursor-pointer bg-surface rounded-lg p-6 shadow-soft border-border">
                          <div className="aspect-video rounded-lg overflow-hidden mb-6 relative shadow-soft">
                            <img src={articles[0].thumbnail || '/img/placeholder.png'} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                          </div>
                          <Title level={3} className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/news/${articles[0].id}`}>{articles[0].title}</Link>
                          </Title>
                          <Paragraph type="secondary" className="text-sm font-medium line-clamp-3 mb-6 leading-relaxed">{articles[0].desc}</Paragraph>
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 pt-6 border-t border-slate-50">
                            {articles[0].authorAvatar ? (
                              <img src={articles[0].authorAvatar} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <UserOutlined className="text-slate-400" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-black text-slate-700">{articles[0].author}</span>
                              <span className="text-[10px] uppercase">{articles[0].date}</span>
                            </div>
                          </div>
                        </Card>
                      )}

                      {/* Side List */}
                      <div className="flex flex-col gap-8">
                        {articles.slice(1, 4).map((article: any, aIdx: number) => (
                          <div key={article.id || aIdx} className="flex gap-6 group cursor-pointer group">
                            <div className="w-28 h-28 flex-shrink-0 rounded-[20px] overflow-hidden relative border border-border shadow-soft">
                              <img src={article.thumbnail || '/img/placeholder.png'} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                            </div>
                            <div className="flex-1 py-1">
                              <Title level={5} className="text-sm font-black text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                <Link href={`/news/${article.id}`}>{article.title}</Link>
                              </Title>
                              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><ClockCircleOutlined className="text-primary" /> {article.date}</span>
                                <span className="flex items-center gap-1.5"><EyeOutlined className="text-primary" /> {article.view} lượt xem</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (25%) */}
            <div className="w-full lg:w-3/12 px-6 mt-12 lg:mt-0">
              <div className="sticky top-24 space-y-10">
                {/* Search Box */}
                <Card className="p-8 rounded-lg shadow-soft border-border bg-surface">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <Title level={5} className="m-0 font-black text-xs uppercase tracking-widest text-slate-900">Tìm kiếm tin tức</Title>
                  </div>
                  <Input
                    placeholder="Nhập từ khóa..."
                    prefix={<SearchOutlined className="text-slate-400" />}
                    className="rounded-xl font-bold text-sm h-12"
                  />
                </Card>

                {/* Tags */}
                <Card className="p-8 rounded-lg shadow-soft border-border bg-surface">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <Title level={5} className="m-0 font-black text-xs uppercase tracking-widest text-slate-900">Từ khóa thịnh hành</Title>
                  </div>
                  <TagList />
                </Card>

                {/* Unified Aside Component */}
                <Aside isFixed={false} />

                {/* Ads */}
                <Card className="w-full aspect-[300/400] bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm overflow-hidden relative group cursor-pointer shadow-premium border-none">
                  <img src="https://img.freepik.com/free-vector/medical-doctor-presentation-template_23-2148156685.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000" alt="Ad" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                  <div className="z-10 text-center p-8">
                    <Text className="text-[10px] uppercase tracking-[0.2em] font-black mb-4 text-white/70 block">Quảng cáo tài trợ</Text>
                    <Title level={3} className="text-xl font-black leading-tight mb-6 text-white" style={{ color: 'white' }}>Gói khám sức khỏe tổng quát Premium 2025</Title>
                    <Button variant="primary" className="rounded-full font-black px-8">Tìm hiểu ngay</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;