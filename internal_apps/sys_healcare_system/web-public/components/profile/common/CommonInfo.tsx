import React from 'react';
import Flaticon from '../../common/Flaticon';
import { USER_TYPE_EXTENDED } from '../layouts/MockData';

interface CommonInfoData {
    avatar: string;
    degree: string;
    name: string;
    speciality: string;
    userType: keyof typeof USER_TYPE_EXTENDED;
}

interface CommonInfoProps {
    data: CommonInfoData;
    likeCount: number;
}

const CommonInfo: React.FC<CommonInfoProps> = ({ data, likeCount }) => {
    const { avatar, degree, name, speciality, userType } = data;
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-4">
            <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden border-4 border-white shadow-lg relative z-10 bg-gray-100">
                    <img src={avatar} className="w-full h-full object-cover" alt={name} />
                </div>
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20" title="Online"></div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {degree && <span className="mr-2 font-normal text-gray-500 text-xl">{degree}</span>}
                        {name}
                    </h1>
                    {userType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize self-center md:self-auto">
                            {USER_TYPE_EXTENDED[userType] || userType}
                        </span>
                    )}
                </div>

                <h5 className="text-lg text-primary font-medium">{speciality && `Chuyên khoa ${speciality}`}</h5>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <i className="fi flaticon-like text-primary"></i>
                        <span className="font-semibold text-gray-900">{likeCount}</span>
                        <span>lượt yêu thích</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <i className="fi flaticon-like-3 text-green-500"></i>
                        <span className="font-semibold text-gray-900">98%</span>
                        <span>giới thiệu</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonInfo;
