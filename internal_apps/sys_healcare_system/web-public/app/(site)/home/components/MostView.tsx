import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import NewsArticle from '@/components/common/NewsArticle';
import { contentService, Post } from '@/services/content.service';

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

const MostView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostViewed = async () => {
      try {
        const result = await contentService.getPosts({ limit: 5, sortBy: 'view' });
        setPosts(result.data || []);
      } catch (error) {
        console.error('Error fetching most viewed posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMostViewed();
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

  if (loading || !typedData.length) {
    return null;
  }

  return (
    <div className="news mostview">
      {typedData.map((item, i) => (
        <NewsArticle data={item} key={i} role="mostview" />
      ))}
      <a href="/" className="block w-full text-center text-xl font-light no-underline text-text-light mt-5 hover:text-secondary transition-colors duration-200">Xem thêm</a>
    </div>
  );
};

export default MostView;