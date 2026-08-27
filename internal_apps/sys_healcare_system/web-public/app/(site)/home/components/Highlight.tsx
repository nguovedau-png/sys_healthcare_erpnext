import React, { JSX } from 'react';
import _ from 'lodash';
import Carousel from 'nuka-carousel';

import NewsArticle from '@/components/common/NewsArticle';
import { API_GET_HIGHLIGHT_NEWS } from '@/components/common/Constant';

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

interface CarouselOptions {
  autoplay: boolean;
  autoplayInterval: number;
  wrapAround: boolean;
  transitionMode: string;
  speed: number;
  renderCenterLeftControls: ({ previousSlide }: { previousSlide: () => void }) => JSX.Element;
  renderCenterRightControls: ({ nextSlide }: { nextSlide: () => void }) => JSX.Element;
}

const Highlight: React.FC = () => {
  const { data } = API_GET_HIGHLIGHT_NEWS;

  if (!data || !Array.isArray(data)) {
    return null;
  }

  const options: CarouselOptions = {
    autoplay: true,
    autoplayInterval: 5000,
    wrapAround: true,
    transitionMode: 'fade',
    speed: 500,
    renderCenterLeftControls: ({ previousSlide }) => (
      <button onClick={previousSlide}>
        <i className="fi flaticon-left-arrow"></i>
      </button>
    ),
    renderCenterRightControls: ({ nextSlide }) => (
      <button onClick={nextSlide}>
        <i className="fi flaticon-next"></i>
      </button>
    )
  };

  return (
    <div className="news highlight">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <NewsArticle data={data[0]} role="highlightTop" key={1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {_.map(_.drop(data, 3), (item: NewsData, i: number) =>
            <div key={i}>
              <NewsArticle data={item} role="highlightSub" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlight;