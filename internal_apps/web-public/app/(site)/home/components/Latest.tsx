import React, { useMemo, useEffect, useState } from 'react';
import _ from 'lodash';
import NewsArticle from '@/components/common/NewsArticle';
import { contentService, Post } from '@/services/content.service';
import Link from 'next/link';
import { AiOutlinePlayCircle as PlayCircleOutlined } from 'react-icons/ai';

interface Author {
  avatar: string;
  name: string;
}

interface Comments {
  length: number;
}

interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: Comments;
  slug: string;
  type: string;
}

interface NewsArticleProps {
  data: NewsData;
  role: 'latestTop' | 'latestSub';
}

const Latest: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await contentService.getPosts({ limit: 5 });
        setPosts(result.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const typedData = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return posts.map((item) => ({
      thumbnail: item.thumbnail || '',
      title: item.title,
      author: {
        avatar: item.thumbnail || '',
        name: item.author,
      },
      publishDate: item.date,
      desc: item.desc || '',
      view: item.view || 0,
      comments: { length: 0 },
      slug: `/news/${item.id}`,
      type: 'article',
    })) as NewsData[];
  }, [posts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 h-[400px] bg-slate-100 animate-pulse rounded-[2rem]"></div>
        <div className="lg:col-span-5 space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!typedData.length) return null;

  const featured = typedData[0];
  const list = typedData.slice(1);

  return (
    <div className="news-hub">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Featured News */}
        <div className="lg:col-span-7">
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
            <Link href={featured.slug} className="block relative aspect-[16/10] overflow-hidden">
              <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">Tin nổi bật</span>
              </div>
            </Link>
            <div className="p-8 lg:p-10 flex-1 flex flex-col">
              <Link href={featured.slug}>
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
              </Link>
              <p className="text-slate-500 font-medium mb-8 line-clamp-3 leading-relaxed flex-1">
                {featured.desc}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden">
                    <img src={featured.author.avatar} alt={featured.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{featured.author.name}</p>
                    <p className="text-xs text-slate-400 font-bold">{featured.publishDate}</p>
                  </div>
                </div>
                <Link href={featured.slug} className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Đọc tiếp <PlayCircleOutlined className="rotate-0 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Small List */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {list.map((item, idx) => (
            <Link key={idx} href={item.slug} className="group flex gap-5 p-4 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-x-1">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center py-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Kiến thức y khoa</span>
                <h4 className="text-base lg:text-lg font-black text-slate-800 leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 font-bold">{item.publishDate}</p>
              </div>
            </Link>
          ))}

          <Link href="/news" className="mt-auto p-6 rounded-[2rem] bg-slate-900 text-white text-center font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-slate-900/20">
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Latest;