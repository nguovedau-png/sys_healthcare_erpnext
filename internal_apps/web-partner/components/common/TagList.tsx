"use client";
import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import contentService, { TopSearchKeyword } from '@/services/content.service';
import Link from 'next/link';

const TagList: React.FC = () => {
  const [keywords, setKeywords] = useState<TopSearchKeyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await contentService.getTopSearches();
        console.log('Top Searches fetched:', data);
        if (Array.isArray(data)) {
          setKeywords(data);
        } else {
          setKeywords([]);
        }
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
          <Link
            href={`/search?keyword=${item.keyword}`}
            key={item.id || i}
            className="bg-[#f0f9f4] text-[#47af50] text-[13px] md:text-[14px] px-[12px] py-[4px] md:py-[5px] rounded-full mr-[8px] mb-[8px] hover:bg-[#47af50] hover:text-white transition-all whitespace-nowrap"
          >
            {item.keyword}
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default TagList;