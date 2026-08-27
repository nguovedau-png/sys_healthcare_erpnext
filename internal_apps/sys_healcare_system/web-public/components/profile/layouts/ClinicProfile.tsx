import React, { useState, useEffect } from 'react';
import Banner from '../../common/Banner';
import LineChart from '../../common/Chart/LineChart';
import Flaticon from '../../common/Flaticon';
import CommonInfo from '../common/CommonInfo';
import Statistic from '../common/Statistic';
import ArticleList from '../common/ArticleList';
import Facilities from '../common/Facilities';
import ProfileTab from './ProfileTabExtended';

// Mock articles
const articlesByUserId = [
    {
        title: 'Tư vấn sức khỏe mùa dịch cho người cao tuổi',
        type: 'article',
        thumbnail: '/img/news/news-4.jpg',
        author: {
            name: 'Phòng khám Đa khoa',
            avatar: '/img/hospital/choray.jpg'
        },
        publishDate: '2 giờ trước',
        desc: 'Những lưu ý quan trọng khi chăm sóc sức khỏe người cao tuổi trong thời điểm giao mùa',
        slug: '/news/',
        view: 540,
        comments: {
            length: 10
        }
    }
];

interface ClinicProfileProps {
    data: any;
    isLikeByUser?: boolean;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ data, isLikeByUser = false }) => {
    const { statistic } = data;

    const [likeState, setLikeState] = useState<boolean>(isLikeByUser);
    const [isPressLike, setIsPressLike] = useState<boolean>(false);
    const [userStatistic, setUserStatistic] = useState<any>(statistic);

    let likeCount = userStatistic.like;

    const likeButtonHandler = () => {
        setLikeState(!likeState);
        setIsPressLike(true);
    };

    useEffect(() => {
        if (isPressLike) {
            likeCount = likeState ? likeCount + 1 : likeCount - 1;
            setUserStatistic((oldUserStatistic: any) => ({
                ...oldUserStatistic,
                like: likeCount
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likeState]);

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Banner page='others' />

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        {/* Left: Info */}
                        <div className="xl:col-span-8">
                            <CommonInfo data={data} likeCount={userStatistic.like} />
                        </div>

                        {/* Right: Actions */}
                        <div className="xl:col-span-4 flex flex-col gap-6">
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <div className="flex gap-4 mb-5">
                                    <button
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${likeState
                                            ? 'bg-red-50 text-red-500 border border-red-200'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-500'
                                            }`}
                                        onClick={likeButtonHandler}>
                                        <i className={`fi flaticon-like ${likeState ? 'text-red-500' : ''}`}></i>
                                        <span>{likeState ? 'Đã thích' : 'Yêu thích'}</span>
                                    </button>
                                    <a
                                        href="/booking"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <i className="fi flaticon-calendar"></i>
                                        <span>Đặt khám</span>
                                    </a>
                                </div>
                                <Statistic data={data} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Main Feed */}
                    <div className="xl:col-span-8 space-y-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <ProfileTab data={data} />
                        </div>
                        {/* @ts-ignore */}
                        <ArticleList data={articlesByUserId} />
                    </div>

                    {/* Sidebar */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-gray-900 mb-6 text-lg">Lượt truy cập trong tuần</h2>
                            <div className="h-64">
                                <LineChart />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
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
