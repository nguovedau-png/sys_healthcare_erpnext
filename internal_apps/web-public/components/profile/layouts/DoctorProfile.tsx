import React, { useState, useEffect } from 'react';
import Banner from '../../common/Banner';
import LineChart from '../../common/Chart/LineChart';
import Flaticon from '../../common/Flaticon';
import { useViewport } from '../../common/Function';
import CommonInfo from '../common/CommonInfo';
import Statistic from '../common/Statistic';
import ArticleList from '../common/ArticleList';
import Workplace from '@/app/(site)/profile/components/Workplace';
import ProfileTab from './ProfileTabExtended';

// Mock articles (can be moved to MockData)
const articlesByUserId = [
    {
        title: 'Chuyện về Virus mang vương miện mới, Novel coronavirus (2019-nCoV)',
        type: 'article',
        thumbnail: '/img/news/news-1.jpg',
        author: {
            name: 'Bệnh viện Nhân dân Gia Định',
            avatar: '/img/user/gia-dinh.png'
        },
        publishDate: '5 phút trước',
        desc: 'Thế giới vừa bước sang 2020, chúng ta vừa hưởng cái Tết đầm ấm; xuất hiện 2019- nCoV lây bệnh, chết người',
        slug: '/news/',
        view: 1000,
        comments: {
            length: 20
        }
    }
];

interface DoctorProfileProps {
    data: any;
    isLikeByUser?: boolean;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ data, isLikeByUser = false }) => {
    const { statistic, workplace } = data;

    const [likeState, setLikeState] = useState<boolean>(isLikeByUser);
    const [isPressLike, setIsPressLike] = useState<boolean>(false);
    const [userStatistic, setUserStatistic] = useState<any>(statistic);

    const { width } = useViewport();
    const breakpoint = 1199;
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

            {/* Main Content */}
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
                                        <span>Đặt lịch khám</span>
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
                        {width > breakpoint && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
                                <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">Nơi làm việc</h3>
                                <Workplace data={workplace || []} />
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-gray-900 mb-6 text-lg">Lượt truy cập trong tuần</h2>
                            <div className="h-64">
                                <LineChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
