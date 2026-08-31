import React from 'react';
import Banner from '../../common/Banner';
import Flaticon from '../../common/Flaticon';
import CommonInfo from '../common/CommonInfo';
import ProfileTab from './ProfileTabExtended';

interface UserProfileProps {
    data: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
    // User generally doesn't have public statistics like doctors
    // But we use CommonInfo for consistency, passing 0 likes/stats if not relevant

    return (
        <>
            <Banner page='others' />
            <div className="profile">
                <div className="profile-header box-wrap">
                    <div className="container">
                        <div className="row m-row">
                            <div className="col-xl-8 col-12">
                                <CommonInfo data={data} likeCount={0} />
                            </div>

                            <div className="col-xl-4 col-12">
                                <div className="profile-interaction">
                                    <a className="btn btn-main" href="#">Chỉnh sửa hồ sơ</a>
                                </div>
                                {/* Users might not need public statistics panel */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row m-row">
                        <div className="col-12">
                            <div className="profile-tab box-wrap">
                                <ProfileTab data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
