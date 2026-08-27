import React from 'react';
import _ from 'lodash';
import { Title, Text } from '@/components/ui/Typography';
import NewsArticle from '@/components/common/NewsArticle';
import { AiOutlineRead as ReadOutlined } from 'react-icons/ai';

interface Author {
  avatar: string;
  name: string;
}

interface Comment {
  id: string;
  content: string;
}

interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: { length: number };
  slug: string;
  type: 'article' | 'video';
}

interface ArticleListProps {
  data: NewsData[];
}

const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="mt-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <ReadOutlined className="text-xl" />
        </div>
        <div>
          <Title level={3} className="m-0 font-black tracking-tight text-slate-900">Bài viết sức khỏe</Title>
          <Text type="secondary" className="text-xs font-bold uppercase tracking-wider">Chia sẻ kiến thức y khoa chuyên sâu</Text>
        </div>
      </div>
      
      <div className="space-y-6">
        {_.map(data, (item, i) => (
          <div key={i} className="transition-all hover:-translate-y-1">
            <NewsArticle data={item} role="profile" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;