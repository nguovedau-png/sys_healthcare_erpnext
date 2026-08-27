import React from 'react';
import Ratio from 'react-ratio';
import { useViewport } from '@/components/common/Function';

interface Traffic {
  visit: number;
}

interface Statistics {
  like: number;
  feedback: number;
}

interface WorkplaceData {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface WorkplaceCardProps {
  data: WorkplaceData;
  simpleMode?: boolean;
}

const WorkplaceCard: React.FC<WorkplaceCardProps> = ({ data, simpleMode = false }) => {
  const { userId, userType, name, avatar, speciality, traffic, statistic, address } = data;

  const { width } = useViewport();
  const breakpoint1 = 414;

  return (
    <div className="card doctor">
      <div className="row m-row">
        <div className={simpleMode ? 'col-4' : 'col-3'}>
          <a href={`/profile/${userType}/${userId}`}>
          <Ratio
            ratio={1 / 1}
            className="overflow-hidden card-avatar"
          >
            <img src={avatar} className="img-fluid" alt="" />
          </Ratio>
          </a>
        </div>
        <div className={simpleMode ? 'col-8' : 'col-9'}>
          <div className="row m-row">
            <div className={simpleMode ? 'col-12' : 'col-lg-9 col-md-8'}>
              <div className="card-info">
                <div className="card-permanent card-permanent-hospital">
                  <a href={`/profile/${userType}/${userId}`} className="card-name">{name}</a>
                  <span className="card-speciality">{speciality}</span>
                  <p className="card-address">
                    {address}
                  </p>
                  {!simpleMode && <i className="card-traffic">{traffic.visit} lượt khám/ngày</i>}
                </div>
              </div>
            </div>

            {!simpleMode && (
              <div className="col-lg-3 col-md-4 col-12 ps-lg-0 d-flex justify-content-between flex-md-column">
                <div className="card-statistic">
                  <div className="card-rating">
                    <i className="fi flaticon-like me-1"></i>
                    <small>{statistic.like}</small>
                  </div>
                  <p className="card-feedback">{statistic.feedback} đánh giá</p>
                </div>
                {userType !== 'hospital' && (
                  <a 
                    href={`/profile/${userType}/${userId}`} 
                    className={`btn btn-main ${width > breakpoint1 ? 'w-100' : ''}`}
                  >
                    Đặt lịch
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceCard;