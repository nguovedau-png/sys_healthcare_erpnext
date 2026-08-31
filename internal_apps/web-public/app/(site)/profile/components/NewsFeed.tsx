import React from 'react';
import _ from 'lodash';
import NewsArticle, { NewsData } from '@/components/common/NewsArticle';

interface NewsFeedProps {
  data: NewsData[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="profile-newsfeed news">
      <div className="row m-row">
        {data.length > 0 && _.map(data, (item, i) =>
          <div className="col-xl-4 col-md-6" key={i}>
            <NewsArticle data={item} role="userNewsFeed" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;