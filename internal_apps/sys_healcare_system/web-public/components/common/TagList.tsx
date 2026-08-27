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
    <div className="tag-container">
      <div className="flex flex-wrap gap-2.5">
        {keywords.map((item, i) => (
          <Link
            href={`/search?q=${encodeURIComponent(item.keyword)}`}
            key={item.id || i}
            className="group relative flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl hover:bg-white hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-slate-400 font-black text-[10px] group-hover:text-primary transition-colors">#</span>
            <span className="font-black text-slate-800 text-[11px] uppercase tracking-wider group-hover:text-primary transition-colors">{item.keyword}</span>
            {item.count > 50 && (
                <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[8px] font-black rounded-md animate-pulse">HOT</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagList;