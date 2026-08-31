import React from 'react';
import _ from 'lodash';

import WorkplaceCard from './WorkplaceCard';

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

interface WorkplaceProps {
  data: WorkplaceData[];
}

const Workplace: React.FC<WorkplaceProps> = ({ data }) => {
  return (
    <div className="profile-work-place box-wrap">
      <h2 className="profile-title">Nơi công tác</h2>
      {_.map(data, (item, i) =>
        <WorkplaceCard data={item} simpleMode={true} key={i} />
      )}
    </div>
  );
};

export default Workplace;