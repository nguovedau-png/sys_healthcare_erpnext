import React from 'react';
import _ from 'lodash';

import Flaticon from '@/components/common/Flaticon';

interface Author {
  name: string;
  avatar: string;
}

interface QaItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  reply: string;
  vote: number;
}

interface UserQaProps {
  data: QaItem[];
}

const UserQa: React.FC<UserQaProps> = ({ data }) => {
  return (
    <div className="profile-rating profile-qa">
      <div className="profile-qa-filter">
        <h2 className="profile-title m-0">Bạn đã hỏi {data.length} câu hỏi</h2>
        <div className="profile-qa-filter-items">
          <a href="/" className="profile-qa-filter-item active">Mới nhất</a>
          <a href="/" className="profile-qa-filter-item">Cũ nhất</a>
        </div>
      </div>
      <div className="profile-rating-items profile-qa-items">
        {_.map(data, (item, i) =>
          <div className="profile-rating-item" key={i}>
            <div className='user'>
              <a href="/" className="user-avatar">
                <img src={item.author.avatar} className="img-fluid" alt="" />
              </a>
              <a href="/" className="user-name">
                <span>{item.author.name}</span>
                <small>{item.publishDate}</small>
              </a>
            </div>
            <div className="profile-rating-content">
              <h6>Hỏi về dịch vụ {item.service}</h6>
              <p>{item.content}</p>
            </div>
            <div className="thumb-up-down">
              <a href=""><Flaticon icon="like" /><span>{item.vote}</span> Hữu ích</a>
            </div>
            <div className="reply">
              <Flaticon icon="share" />
              <div>
                <h5>BS. Nguyễn Thế Dũng trả lời</h5>
                <p>{item.reply}</p>
              </div>
            </div>
          </div>
        )}
        {data.length > 2 && <a className="read-more" href="">Xem tất cả</a>}
      </div>
    </div>
  );
};

export default UserQa;