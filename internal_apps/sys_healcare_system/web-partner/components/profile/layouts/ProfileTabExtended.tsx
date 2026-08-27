"use client";
import React from 'react';
import { Tabs } from 'antd';
import { IntroTab, ServiceTab, RatingTab, WorktimeTab, GalleryTab, QaTab, ArticleTab } from '../tabs/ProfileCrudTabs';

interface ProfileTabExtendedProps {
    data: any;
    onRefresh?: () => void;
}

const ProfileTabExtended: React.FC<ProfileTabExtendedProps> = ({ data, onRefresh }) => {
    const { userType } = data;

    const commonTabs = [
        { key: 'intro', label: 'Giới thiệu', children: <IntroTab data={data} onRefresh={onRefresh} /> },
        { key: 'service', label: userType === 'pharmacy' ? 'Sản phẩm' : 'Dịch vụ', children: <ServiceTab data={data} onRefresh={onRefresh} /> },
        { key: 'rating', label: 'Đánh giá', children: <RatingTab data={data} /> },
        { key: 'worktime', label: userType === 'pharmacist' ? 'Nơi làm việc' : 'Giờ làm việc', children: <WorktimeTab data={data} onRefresh={onRefresh} /> },
        { key: 'gallery', label: 'Hình ảnh', children: <GalleryTab data={data} /> },
        { key: 'qa', label: 'Câu hỏi', children: <QaTab data={data} /> },
        { key: 'articles', label: 'Bài viết', children: <ArticleTab data={data} /> },
    ];

    return (
        <Tabs
            items={commonTabs}
            size="small"
            style={{ minHeight: 300 }}
        />
    );
};

export default ProfileTabExtended;
