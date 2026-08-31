import React from 'react';
import LineChart from '../../common/Chart/LineChart';
import CommonInfo from '../common/CommonInfo';
import Statistic from '../common/Statistic';
import ArticleList from '../common/ArticleList';
import Facilities from '../common/Facilities';
import ProfileTab from './ProfileTabExtended';

interface PharmacyProfileProps { data: any; }

const PharmacyProfile: React.FC<PharmacyProfileProps> = ({ data }) => {
    const { statistic, facilities } = data;

    return (
        <div className="bg-gray-50 min-h-screen pb-16 pt-8">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <div className="xl:col-span-8">
                            <CommonInfo data={data} likeCount={statistic?.like ?? 0} />
                        </div>
                        <div className="xl:col-span-4 flex flex-col gap-6">
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <Statistic data={data} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-8 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <ProfileTab data={data} />
                        </div>
                    </div>

                    <div className="xl:col-span-4 space-y-8">
                        {facilities && facilities.length > 0 && <Facilities data={facilities} />}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-gray-900 mb-6 text-lg">Lượt truy cập trong tuần</h2>
                            <div className="h-64"><LineChart /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyProfile;
