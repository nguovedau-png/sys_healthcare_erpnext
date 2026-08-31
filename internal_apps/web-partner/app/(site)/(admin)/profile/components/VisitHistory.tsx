import React from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';

interface Doctor {
  userId: string;
  userType: string;
  name: string;
}

interface Service {
  name: string;
  price: number;
}

interface VisitDetail {
  doctor: Doctor;
  service: Service;
  datetime: string;
}

interface VisitHistoryItem {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  detail: VisitDetail;
}

interface VisitHistoryProps {
  data: VisitHistoryItem[];
}

const VisitHistory: React.FC<VisitHistoryProps> = ({ data }) => {
  return (
    <div className="profile-history">
      <div className="profile-history-filter">
        <h2 className="profile-title m-0">Bạn đã đặt lịch khám {data.length} lần</h2>
        <div className="profile-history-filter-items">
          <a href="" className="profile-history-filter-item active">Mới nhất</a>
          <a href="" className="profile-history-filter-item">Cũ nhất</a>
        </div>
      </div>
      {_.map(data, (item, i) =>
        <div className="profile-history-item" key={i}>
          <div className="row m-row align-items-center">
            <div className="col-xl-9">
              <div className="row m-row align-items-xl-center">
                <div className='col-xl-2 col-3 d-lg-block d-flex flex-column align-items-center'>
                  <a href={`/profile/${item.userType}/${item.userId}`}>
                  <Ratio
                    ratio={1 / 1}
                    className="overflow-hidden card-avatar"
                  >
                    <img src={item.avatar} className="img-fluid" alt="" />
                  </Ratio>
                  </a>
                </div>
                <div className="col-xl-10 col-9">
                  <h4>
                    <a className="" href={`/profile/${item.userType}/${item.userId}`}>
                      {item.name}
                    </a>
                  </h4>
                  <span>{item.detail.datetime}</span>
                  <ul>
                    <li>
                      <b>Bác sĩ phụ trách:</b>{' '}
                      <a href={`/profile/${item.detail.doctor.userType}/${item.detail.doctor.userId}`}>
                        {item.detail.doctor.name}
                      </a>
                    </li>
                    <li><b>Dịch vụ khám:</b> {item.detail.service.name}</li>
                    <li><b>Chi phí khám:</b> {item.detail.service.price.toLocaleString()}đ</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="btn-bar">
                <a href='/' className="btn btn-main">Đặt lịch tái khám</a>
                <a href='/' className="btn btn-outline">Đánh giá</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitHistory;