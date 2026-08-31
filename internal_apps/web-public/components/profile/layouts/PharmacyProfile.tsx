import React, { useState, useEffect } from 'react';
import Banner from '../../common/Banner';
import LineChart from '../../common/Chart/LineChart';
import Flaticon from '../../common/Flaticon';
import CommonInfo from '../common/CommonInfo';
import Statistic from '../common/Statistic';
import ArticleList from '../common/ArticleList';
import Facilities from '../common/Facilities';
import ProfileTab from './ProfileTabExtended';

// Mock news
const articlesByUserId = [
    {
        title: 'Cách phân biệt thuốc thật và thuốc giả',
        type: 'article',
        thumbnail: '/img/news/news-1.jpg',
        author: {
            name: 'Nhà thuốc Long Châu',
            avatar: '/img/hospital/choray.jpg'
        },
        publishDate: '1 ngày trước',
        desc: 'Hướng dẫn người tiêu dùng cách nhận biết thuốc chính hãng để đảm bảo an toàn sức khỏe',
        slug: '/news/',
        view: 300,
        comments: {
            length: 5
        }
    }
];

interface PharmacyProfileProps {
    data: any;
    isLikeByUser?: boolean;
}

const PharmacyProfile: React.FC<PharmacyProfileProps> = ({ data, isLikeByUser = false }) => {
    const { statistic, facilities } = data;

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
                            {/* Pharmacy branches */}
                            {facilities && facilities.length > 0 && <Facilities data={facilities} />}

                            <div className="profile-chart box-wrap">
                                <h2 className="profile-title">Lượt truy cập trong tuần</h2>
                                <LineChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PharmacyProfile;
