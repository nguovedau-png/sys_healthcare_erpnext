import React from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';
import classNames from 'classnames';

import { convertNum } from './Utilities';

export interface Author {
  name: string;
  avatar: string;
}

export interface Comments {
  length: number;
}

export interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: Comments;
  slug: string;
  type: string; // Changed to string to match data source
}

export interface NewsArticleProps {
  data: NewsData;
  role: 'highlightTop' | 'highlightSub' | 'latestTop' | 'latestSub' | 'mostview' | 'categoriesTop' | 'categoriesSub' | 'profile' | 'userNewsFeed';
}

const colClass: Record<string, [string, string]> = {
  highlightTop: ['w-2/3 order-1', 'w-1/3 pr-0'],
  highlightSub: ['w-full', 'w-full'],
  latestTop: ['w-2/3 order-1', 'w-1/3 pr-0'],
  latestSub: ['w-full lg:w-1/2 2xl:w-5/12 pr-1', 'w-full lg:w-1/2 2xl:w-7/12'],
  mostview: ['w-1/2 lg:w-1/3 xl:w-1/3', 'w-1/2 lg:w-2/3 xl:w-2/3'],
  categoriesTop: ['w-full', 'w-full'],
  categoriesSub: ['xl:w-5/12', 'xl:w-7/12 xl:pl-1'],
  profile: ['w-full md:w-1/3', 'w-full md:w-2/3'],
  userNewsFeed: ['w-full', 'w-full'],
};

const NewsArticle: React.FC<NewsArticleProps> = ({ data, role }) => {
  if (!data) {
    return null;
  }

  const { thumbnail, title, author, publishDate, desc, view, comments, slug, type } = data;

  const isHighlightTop = role === 'highlightTop';
  const isLatestTop = role === 'latestTop';
  const isHighlightSub = role === 'highlightSub';
  const isLatestSub = role === 'latestSub';
  const isMostView = role === 'mostview';
  const isProfile = role === 'profile';
  const isCategoriesTop = role === 'categoriesTop';
  const isCategoriesSub = role === 'categoriesSub';
  const isUserNewsFeed = role === 'userNewsFeed';

  const containerClasses = classNames('rounded-[7px] overflow-hidden group', {
    'bg-[#f3f6f9]': isHighlightTop || isLatestTop,
    'mt-5': isHighlightSub || isUserNewsFeed,
    'mb-5': isHighlightTop || isLatestTop || isLatestSub || isCategoriesSub,
    'mb-7.5': isMostView || isProfile,
    'mb-5 lg:mb-0 border-b-0 rounded-b-0': isCategoriesTop,
  });

  const thumbnailClasses = classNames('overflow-hidden block h-full', {
    'rounded-[7px]': !isHighlightTop && !isLatestTop,
    'rounded-r-[7px] rounded-l-0': isHighlightTop || isLatestTop,
  });

  const contentClasses = classNames({
    'h-full py-[15px] pl-[15px] pr-0': isHighlightTop || isLatestTop,
    'pt-2.5': isHighlightSub || isLatestSub || isUserNewsFeed, // Added padding top for sub items to separate from image if stacked, or just general spacing
    'pt-0': isMostView || isProfile || isCategoriesTop || isCategoriesSub, // Some have padding handled by grid gap usually, but manual padding here
  });

  // Custom margin overrides for content depending on layout
  const contentStyle = (isCategoriesTop) ? { padding: '10px 0' } : {};

  const titleClasses = classNames('text-text-main font-bold transition-colors duration-100 group-hover:text-secondary', {
    'text-[22px] lg:text-[24px] xl:text-[25px] leading-tight': isHighlightTop || isLatestTop,
    'text-base font-medium leading-[22px] my-2.5 line-clamp-2': isHighlightSub || isUserNewsFeed,
    'text-base font-medium leading-[21px] mt-0': isLatestSub,
    'text-lg lg:text-[19px] xl:text-xl leading-relaxed': isMostView || isProfile,
    'text-[15px] lg:text-[16px] xl:text-[17px] leading-snug my-2.5': isCategoriesTop,
    'text-[15px] font-normal leading-snug m-0 w-full': isCategoriesSub
  });

  return (
    <div className={containerClasses}>
      <div className="flex flex-wrap -mx-[5px] h-full"> {/* Using smaller gap to match m-row behavior inside specific components often */}
        <div className={`px-[5px] ${colClass[role][0]}`}>
          <a href={slug} className="block">
            <Ratio
              ratio={16 / 10}
              className={thumbnailClasses}
            >
              <img src={thumbnail} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={title} />
            </Ratio>
          </a>
        </div>

        <div className={`px-[5px] ${colClass[role][1]}`}>
          <div className={contentClasses} style={contentStyle}>
            <a href={slug} title={title} className="block no-underline">
              {(isHighlightTop || isLatestTop) ? (
                <h2 className={titleClasses}>
                  {type === 'video' && <i className="fi flaticon-play mr-1"></i>}
                  {title}
                </h2>
              ) : (
                <h5 className={titleClasses}>
                  {type === 'video' && <i className="fi flaticon-play mr-1"></i>}
                  {title}
                </h5>
              )}
            </a>

            {(isHighlightTop || isLatestTop || isMostView || isProfile) && (
              <p className="text-text-light mb-2.5 text-sm leading-5 overflow-hidden" style={{
                height: (isHighlightTop || isLatestTop) ? '95px' : 'auto',
                maxHeight: (isHighlightTop || isLatestTop) ? '95px' : 'unset'
              }}>
                {(isMostView || isProfile)
                  ? (desc.length > 110 ? desc.substring(0, 110) + '...' : desc)
                  : desc}
              </p>
            )}

            <div className={`flex items-center text-sub-2 text-[13px] ${isProfile || isCategoriesSub ? 'hidden' : 'mt-3'}`}>
              {/* User avatar/name logic */}
              <a href="/" className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] rounded-full overflow-hidden border border-[#f3f6f9] flex justify-center items-center bg-white block mr-[7px]">
                <img src={author.avatar} className="w-full h-full object-cover" alt={author.name} />
              </a>
              <a href="/" className="flex flex-col no-underline group/user">
                <span className="text-sub-2 block -mb-[5px] group-hover/user:underline">{(isLatestSub || isCategoriesSub) ? '' : author.name}</span>
                <small className="text-text-light text-[11px] lg:text-[12px] mt-1">{publishDate}</small>
              </a>
            </div>

            {(isMostView || isProfile) && (
              <div className="hidden"> {/* Previously d-none in NewsArticle.tsx */}
                <div className="news-stats-item">
                  <i className="fi flaticon-visibility"></i>
                  <span>{convertNum(view, 0)}</span>
                </div>
                <div className="news-stats-item">
                  <i className="fi flaticon-speech-bubble"></i>
                  <span>{comments.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;