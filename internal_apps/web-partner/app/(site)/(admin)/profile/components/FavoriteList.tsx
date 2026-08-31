import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import _ from 'lodash';
import HospitalCard from '@/components/common/HospitalCard';
import DoctorCard from '@/components/common/DoctorCard';
import Flaticon from '@/components/common/Flaticon';

interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface Statistics {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
  feedback: number;
  yearExp?: number;
}

interface FavoriteItem {
  userId: string;
  userType: 'doctor' | 'hospital' | 'clinic' | 'pharmacy' | 'pharmacist';
  name: string;
  degree: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface FavoriteListProps {
  data: FavoriteItem[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ data }) => {
  return (
    <div className="profile-favorite">
      <div className="profile-favorite-search">
        <h2 className="profile-title m-0">Bạn đã thích {data.length} trang</h2>
        <div className="input-group form">
          <span className="input-group-text">
            <Flaticon icon='loupe' />
          </span>
          <input type="text" className="form-control" placeholder="Bạn muốn tìm...?" />
        </div>
      </div>
      <div className="profile-favorite-list">
        <div className="row m-row">
          {data.length > 0 && _.map(data, (item, i) =>
            <div className="col-md-6" key={i}>
              {item.userType === 'doctor'
                ? <DoctorCard data={item} simpleMode={true} />
                : <HospitalCard data={item} simpleMode={true} />
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;