import React from 'react';
import Flaticon from '../../common/Flaticon';

interface FacilityData {
    facilitiesName: string;
    address: string;
    phone: string;
}

interface FacilitiesCardProps {
    data: FacilityData;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ data }) => {
    const { facilitiesName, address, phone } = data;
    return (
        <>
            <div className="profile-facilities-item">
                <div className="d-flex justify-content-between">
                    <h5>Cơ sở {facilitiesName}: <span>{address}</span></h5>
                    <a href="">Xem chỉ đường</a>
                </div>
                <h6 className="facilities-phone">
                    <Flaticon icon="telephone" /> {phone}
                </h6>
            </div>
        </>
    );
};

export default FacilitiesCard;
