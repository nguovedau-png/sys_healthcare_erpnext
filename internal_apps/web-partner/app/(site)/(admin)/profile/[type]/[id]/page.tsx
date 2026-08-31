"use client";
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import partnerService from '@/services/partner.service';
import userService from '@/services/user.service';

// Mock data as fallback
// @ts-ignore
import { USERS, API_GET_TOP_HOSPITAL } from '@/components/common/Constant';
import { ADDITIONAL_USERS } from '@/components/profile/layouts/MockData';

import DoctorProfile from '@/components/profile/layouts/DoctorProfile';
import HospitalProfile from '@/components/profile/layouts/HospitalProfile';
import ClinicProfile from '@/components/profile/layouts/ClinicProfile';
import PharmacyProfile from '@/components/profile/layouts/PharmacyProfile';
import PharmacistProfile from '@/components/profile/layouts/PharmacistProfile';
import UserProfile from '@/components/profile/layouts/UserProfile';

const ALL_USERS = [...(USERS || []), ...ADDITIONAL_USERS];

const ProfilePage = () => {
    const params = useParams();
    const type = params?.type as string;
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Check mock data first (for legacy compatibility)
                const mockUser = _.find([...ALL_USERS, ...(API_GET_TOP_HOSPITAL?.data || [])], (u) => u.userId === id);
                if (mockUser) {
                    setData(mockUser);
                    setLoading(false);
                    return;
                }

                // 2. Fetch from API if not found in mock or if it's a numeric ID
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    setLoading(false);
                    return;
                }

                let result = null;
                switch (type) {
                    case 'doctor':
                        result = await partnerService.getDoctor(numericId);
                        break;
                    case 'hospital':
                        result = await partnerService.getHospital(numericId);
                        break;
                    case 'clinic':
                        result = await partnerService.getClinic(numericId);
                        break;
                    case 'pharmacy':
                        result = await partnerService.getPharmacy(numericId);
                        break;
                    case 'pharmacist':
                        result = await partnerService.getPharmacist(numericId);
                        break;
                    case 'user':
                        result = await userService.getUser(numericId);
                        break;
                    default:
                        // If no type, it's hard to know which service to call
                        // But we can try to find in mock data which we already did
                        break;
                }

                if (result) {
                    // Normalize the data format to match what the profile components expect
                    // Map backend fields to the common interface used by DoctorProfile etc.
                    const normalizedData = {
                        ...result,
                        userId: result.id.toString(),
                        userType: type,
                        traffic: (result as any).traffic || { like: 0, view: 0, visit: 0, search: 0, post: 0 },
                        statistic: (result as any).statistic || { like: 0, feedback: 0, yearExp: 0 }
                    };
                    setData(normalizedData);
                }
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, type]);

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <Spin size="large" />
                <p className="mt-4 text-gray-500">Đang tải thông tin hồ sơ...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="container py-20 text-center">
                <h3 className="text-xl font-bold text-gray-800">Không tìm thấy thông tin</h3>
                <p className="text-gray-500 mt-2">Vui lòng kiểm tra lại đường dẫn hoặc thử lại sau.</p>
            </div>
        );
    }

    // Render based on userType
    switch (data.userType) {
        case 'doctor':
            return <DoctorProfile data={data} />;
        case 'hospital':
            return <HospitalProfile data={data} />;
        case 'clinic':
            return <ClinicProfile data={data} />;
        case 'pharmacy':
            return <PharmacyProfile data={data} />;
        case 'pharmacist':
            return <PharmacistProfile data={data} />;
        case 'user':
            return <UserProfile data={data} />;
        default:
            return (
                <div className="container py-5">
                    <h3>Loại tài khoản chưa được hỗ trợ: {data.userType}</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            );
    }
};

export default ProfilePage;
