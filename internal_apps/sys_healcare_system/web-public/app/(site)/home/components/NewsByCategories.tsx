import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import NewsArticle from '@/components/common/NewsArticle';
import { NEWS_BY_CATEGORY } from '@/components/common/Constant';
import { Title } from '@/components/ui/Typography';

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
  type: 'article' | 'video';
}

interface CategoryData {
  categoriesName: string;
  articles: NewsData[];
}

const NewsByCategories: React.FC = () => {
  const { data } = NEWS_BY_CATEGORY;

  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {_.map(data, (category: CategoryData, i: number) =>
        <div key={i} className="flex flex-col h-full">
          <div className="mb-6 pb-2 border-b border-slate-100 flex items-center relative">
            <div className="absolute left-0 bottom-[-1px] w-12 h-[3px] bg-primary rounded-t-full"></div>
            <Title level={4} className="text-xl font-black text-slate-900 m-0 uppercase tracking-tight">
              <Link href="/category" className="no-underline hover:text-primary transition-colors block">
                {category.categoriesName}
              </Link>
            </Title>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="w-full">
              <NewsArticle data={category.articles[0]} role="categoriesTop" />
            </div>
            <div className="flex flex-col gap-4">
              {_.map(_.drop(category.articles), (item: NewsData, j: number) =>
                <div key={j}>
                  <NewsArticle data={item} role="categoriesSub" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsByCategories;