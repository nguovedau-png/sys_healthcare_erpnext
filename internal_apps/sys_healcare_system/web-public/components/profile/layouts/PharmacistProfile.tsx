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

// Mock articles
const articlesByUserId = [
    {
        title: 'Tương tác thuốc cần tránh khi sử dụng kháng sinh',
        type: 'article',
        thumbnail: '/img/news/news-2.jpg',
        author: {
            name: 'Dược sĩ Phạm Thị Hương',
            avatar: '/img/doctor/doctor-2.jpg'
        },
        publishDate: '3 giờ trước',
        desc: 'Các loại thực phẩm và thuốc không nên dùng chung với kháng sinh để tránh tác dụng phụ',
        slug: '/news/',
        view: 200,
        comments: {
            length: 2
        }
    }
];

interface PharmacistProfileProps {
    data: any;
    isLikeByUser?: boolean;
}

const PharmacistProfile: React.FC<PharmacistProfileProps> = ({ data, isLikeByUser = false }) => {
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
        <>
            <Banner page='others' />
            <div className="profile">
                <div className="profile-header box-wrap">
                    <div className="container">
                        <div className="row m-row">
                            <div className="col-xl-8 col-12">
                                <CommonInfo data={data} likeCount={userStatistic.like} />
                            </div>

                            <div className="col-xl-4 col-12">
                                <div className="profile-interaction">
                                    <button
                                        className={`btn btn-like${likeState ? ' active' : ''}`}
                                        onClick={likeButtonHandler}>
                                        <Flaticon icon='like' />Yêu thích</button>
                                    {/* Placeholder link */}
                                    <a className="btn btn-main" href="/shop">Mua thuốc</a>
                                </div>
                                <Statistic data={data} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row m-row">
                        <div className="col-xl-8">
                            <div className="profile-tab box-wrap">
                                <ProfileTab data={data} />
                            </div>
                            {/* @ts-ignore */}
                            <ArticleList data={articlesByUserId} />
                        </div>

                        <div className="col-xl-4">
                            {/* Pharmacist Workplace (Pharmacy they work at) */}
                            {width > breakpoint && <Workplace data={workplace || []} />}

                            <div className="profile-chart box-wrap">
                                <h2 className="profile-title">Hoạt động tư vấn</h2>
                                <LineChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PharmacistProfile;
