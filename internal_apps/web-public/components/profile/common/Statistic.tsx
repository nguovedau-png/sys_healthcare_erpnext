import React from 'react';

interface Traffic {
    visit: number;
    post: number;
}

interface Statistics {
    yearExp: number;
    visit: number;
    post: number;
}

interface StatisticProps {
    data: {
        traffic: Traffic;
        statistic: Statistics;
    };
}

const Statistic: React.FC<StatisticProps> = ({ data }) => {
    const { traffic, statistic } = data;

    return (
        <div className="profile-statistic">
            <div className="profile-statistic-item">
                <p>Kinh nghiệm</p>
                <h3>{statistic.yearExp}</h3>
                <small>Năm hoạt động</small>
            </div>
            <div className="profile-statistic-item">
                <p>Lượt khám bệnh</p>
                <h3>{statistic.visit}</h3>
                <small>{traffic.visit} lượt/ngày</small>
            </div>
            <div className="profile-statistic-item">
                <p>Bài viết sức khỏe</p>
                <h3>{statistic.post}</h3>
                <small>{traffic.post} bài/ngày</small>
            </div>
        </div>
    );
};

export default Statistic;
