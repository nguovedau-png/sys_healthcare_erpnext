import React from 'react';
import _ from 'lodash';

import NewsArticle, { NewsData } from '../../common/NewsArticle';

interface ArticleListProps {
    data: NewsData[];
}

const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    return (
        <div className="profile-articles box-wrap news">
            <h2 className="profile-title">Bài viết</h2>
            {_.map(data, (item, i) =>
                // @ts-ignore
                <NewsArticle data={item} key={i} role="profile" />
            )}
        </div>
    );
};

export default ArticleList;
