'use client';

import React from 'react';
import { Skeleton, Card } from 'antd';

export const DoctorCardSkeleton = () => (
    <Card bodyStyle={{ padding: '16px' }} className="h-full rounded-xl shadow-sm border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
            <Skeleton.Avatar active size={64} shape="circle" />
            <div className="flex-1">
                <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 8 }} />
                <Skeleton.Input active size="small" style={{ width: 80 }} />
            </div>
        </div>
        <Skeleton active paragraph={{ rows: 2 }} />
        <div className="flex justify-between mt-4">
            <Skeleton.Button active size="small" />
            <Skeleton.Button active size="small" />
        </div>
    </Card>
);

export const HospitalCardSkeleton = () => (
    <Card bodyStyle={{ padding: '0' }} className="h-full rounded-xl shadow-sm border-gray-100 overflow-hidden">
        <Skeleton.Image style={{ width: '100%', height: 160 }} active />
        <div className="p-4">
            <Skeleton active paragraph={{ rows: 3 }} />
            <div className="flex justify-end mt-2">
                <Skeleton.Button active size="default" />
            </div>
        </div>
    </Card>
);

export const SkeletonList = ({ count = 4, type = 'doctor' }: { count?: number, type?: 'doctor' | 'hospital' }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i}>
                {type === 'doctor' ? <DoctorCardSkeleton /> : <HospitalCardSkeleton />}
            </div>
        ))}
    </div>
);
