import _ from 'lodash';
import React from 'react';
import ReactHtml from 'raw-html-react';

interface Target {
  slug: string;
  // ... more data fields can be added as needed
}

interface LogItem {
  content: string;
  date: string;
  target: Target;
}

interface UserLogProps {
  isTab?: boolean;
}

const log: LogItem[] = [
  {
    content: 'Bạn đã thích <span>9 cách tốt nhất để kiểm soát cơn giận</span>',
    date: '03/01/2021 15:40',
    target: {
      slug: '',
    }
  },
  {
    content: 'Bạn đã đặt lịch khám tại <span>Phòng khám Nội tổng hợp</span> vào ngày 08/01/2021 18:30 ',
    date: '04/01/2021 09:25',
    target: {
      slug: '',
    }
  },
  {
    content: 'Bạn đã thích <span>Bệnh viện Nhân dân 115</span>',
    date: '04/01/2021 12:29',
    target: {
      slug: '',
    }
  },
  {
    content: 'Bạn đã đặt câu hỏi cho <span>Bệnh viện Nhân dân 115</span>',
    date: '04/01/2021 12:45',
    target: {
      slug: '',
    }
  },
];

const UserLog: React.FC<UserLogProps> = ({ isTab = false }) => {
  return (
    <div className="profile-log">
      <h2 className="profile-title">Lịch sử hoạt động</h2>
      <div className="profile-log-items">
        {_.map(log, (item, i) =>
          <a href={item.target.slug} className="profile-log-item" key={i}>
            <div className="row m-row">
              <div className="col-xl-4 pe-xl-0">
                <span className="date">{item.date}</span>
              </div>
              <div className="col-xl-8">
                <div className="content" title={item.content}>
                  <ReactHtml
                    html={
                      (!isTab && item.content.length > 65)
                        ? item.content.substring(0, 65) + '...'
                        : item.content
                    }
                    componentMap={<></>}
                  />
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
      <a href="/" className="see-more mt-0">Xem thêm</a>
    </div>
  );
};

export default UserLog;