import React from 'react';
import _ from 'lodash';
import FacilitiesCard from './FacilitiesCard';

interface FacilitiesProps {
    data: Array<{
        facilitiesName: string;
        address: string;
        phone: string;
    }>;
}

const Facilities: React.FC<FacilitiesProps> = ({ data }) => {
    return (
        <div className="profile-work-place profile-facilities box-wrap">
            <h2 className="profile-title">Cơ sở hoạt động</h2>
            {_.map(data, (item, i) => (
                <FacilitiesCard data={item} key={i} />
            ))}
        </div>
    );
};

export default Facilities;
