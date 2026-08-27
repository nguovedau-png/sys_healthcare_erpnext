import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import contentService, { TopSearchKeyword } from '@/services/content.service';

const TagList: React.FC = () => {
  const [keywords, setKeywords] = useState<TopSearchKeyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await contentService.getTopSearches();
        setKeywords(data.filter(k => k.isActive));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) return null;

  return (
    <Fragment>
      <h6 className="hidden md:block text-sm font-semibold text-white md:text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">Tìm nhiều nhất:</h6>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {keywords.map((item, i) => (
          <a
            href={`search/keyword=${item.keyword}`}
            key={item.id || i}
            className="inline-flex items-center px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium bg-white/90 md:bg-blue-50 text-blue-700 md:text-blue-600 border border-blue-200 hover:bg-white md:hover:bg-blue-100 hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span className="mr-0.5 opacity-70">#</span>
            {item.keyword}
          </a>
        ))}
      </div>
    </Fragment>
  );
};

export default TagList;