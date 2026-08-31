import React from 'react';
import LineChart from '../../common/Chart/LineChart';
import CommonInfo from '../common/CommonInfo';
import Statistic from '../common/Statistic';
import ArticleList from '../common/ArticleList';
import ProfileTab from './ProfileTabExtended';

interface ClinicProfileProps { data: any; }

const ClinicProfile: React.FC<ClinicProfileProps> = ({ data }) => {
    const { statistic } = data;

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
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-gray-900 mb-6 text-lg">Lượt truy cập trong tuần</h2>
                            <div className="h-64"><LineChart /></div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-gray-900 mb-4 text-lg">Giờ làm việc</h2>
                            <ul className="space-y-3">
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                                    <span className="font-medium text-gray-900">07:00 - 17:00</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-600">Thứ 7</span>
                                    <span className="font-medium text-gray-900">07:00 - 12:00</span>
                                </li>
                                <li className="flex justify-between text-sm">
                                    <span className="text-gray-600">Chủ nhật</span>
                                    <span className="text-red-500 font-medium">Nghỉ</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicProfile;
