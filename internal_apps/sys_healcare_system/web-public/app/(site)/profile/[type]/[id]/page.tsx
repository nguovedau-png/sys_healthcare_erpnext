"use client";
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams } from 'next/navigation';
import Spin from '@/components/ui/Spin';
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
                    const resultAny = result as any;
                    const defaultIntro = {
                        exp: resultAny.description || resultAny.intro || '',
                        degree: resultAny.degree || '',
                        associationAward: resultAny.associationAward || ''
                    };
                    const defaultWorktime = resultAny.worktime ? {
                        weekday: (resultAny.worktime as any).weekday || [],
                        weekend: (resultAny.worktime as any).weekend || [],
                        holiday: (resultAny.worktime as any).holiday || []
                    } : {
                        weekday: ['07:00 - 12:00', '13:30 - 17:30'],
                        weekend: ['07:00 - 12:00'],
                        holiday: []
                    };
                    
                    const parsedRating = typeof resultAny.ratingData === 'string' ? JSON.parse(resultAny.ratingData) : resultAny.ratingData;
                    const defaultRating = (parsedRating && Array.isArray(parsedRating)) ? parsedRating : (resultAny.rating ? [
                        {
                            author: { name: 'Anonymous', avatar: '' },
                            publishDate: new Date().toISOString(),
                            service: '',
                            content: '',
                            reply: '',
                            vote: 0,
                            isAgreeRecommend: true
                        }
                    ] : []);

                    const parsedServices = typeof resultAny.services === 'string' ? JSON.parse(resultAny.services) : resultAny.services;
                    const parsedWorktime = typeof resultAny.worktime === 'string' ? JSON.parse(resultAny.worktime) : resultAny.worktime;
                    const parsedGallery = Array.isArray(resultAny.gallery) ? resultAny.gallery : [];
                    const parsedIndoorMap = resultAny.indoorMap ? (typeof resultAny.indoorMap === 'string' ? JSON.parse(resultAny.indoorMap) : resultAny.indoorMap) : [];
                    const parsedQa = typeof resultAny.qaData === 'string' ? JSON.parse(resultAny.qaData) : resultAny.qaData;

                    let normalizedData: any = {
                        userId: resultAny.id.toString(),
                        userType: type,
                        name: resultAny.name || resultAny.fullName || '',
                        degree: resultAny.degree || '',
                        avatar: resultAny.thumbnail || '',
                        speciality: resultAny.specialty || resultAny.specialties?.[0] || resultAny.departments?.[0] || resultAny.specialistly || '',
                        address: resultAny.address || '',
                        phone: resultAny.phone ? [resultAny.phone] : resultAny.phoneNumber ? [resultAny.phoneNumber] : [],
                        email: resultAny.email ? [resultAny.email] : [],
                        traffic: resultAny.traffic || { like: 0, view: 0, visit: 0, search: 0, post: 0 },
                        statistic: resultAny.statistic || {
                            like: resultAny.rating ? Math.round(resultAny.rating * 20) : 0,
                            feedback: resultAny.reviewCount || resultAny.ratingCount || 0,
                            yearExp: resultAny.expYears || 0,
                            search: 0,
                            view: 0,
                            visit: 0,
                            post: 0
                        },
                        socialContact: [],
                        intro: { exp: resultAny.intro || resultAny.description || '', degree: resultAny.degree || '', associationAward: resultAny.associationAward || '' },
                        service: parsedServices || [],
                        rating: defaultRating,
                        worktime: parsedWorktime || defaultWorktime,
                        gallery: parsedGallery,
                        indoorMap: parsedIndoorMap,
                        qa: Array.isArray(parsedQa) ? parsedQa : []
                    };

                    switch (type) {
                        case 'doctor':
                            normalizedData = {
                                ...normalizedData,
                                name: resultAny.name,
                                degree: resultAny.degree || resultAny.name?.split(' ').slice(0, 2).join(' ') || 'BS.',
                                avatar: resultAny.thumbnail || '/img/doctor/doctor-1.jpg',
                                speciality: resultAny.specialty,
                                workplace: resultAny.hospital ? [{ hospitalName: resultAny.hospital, address: resultAny.address || '', avatar: '', userId: '', userType: 'hospital', speciality: '', traffic: {}, statistic: {} }] : [],
                            };
                            break;
                        case 'hospital':
                            normalizedData = {
                                ...normalizedData,
                                name: resultAny.name,
                                degree: resultAny.degree || 'Bệnh viện',
                                avatar: resultAny.thumbnail || '/img/hospital/benhvienk.jpg',
                                speciality: resultAny.departments?.join(', ') || '',
                                address: resultAny.address || '',
                            };
                            break;
                        case 'clinic':
                            normalizedData = {
                                ...normalizedData,
                                name: resultAny.name,
                                degree: 'Phòng khám',
                                avatar: resultAny.thumbnail || '/img/hospital/choray.jpg',
                                speciality: resultAny.specialties?.join(', ') || '',
                                address: resultAny.address || '',
                                intro: { exp: resultAny.description || '', degree: 'Phòng khám', associationAward: '' }
                            };
                            break;
                        case 'pharmacy':
                            normalizedData = {
                                ...normalizedData,
                                name: resultAny.name,
                                degree: 'Nhà thuốc',
                                avatar: resultAny.thumbnail || '/img/hospital/choray.jpg',
                                speciality: resultAny.gppNumber ? `GPP: ${resultAny.gppNumber}` : '',
                                address: resultAny.address || '',
                                intro: { exp: resultAny.description || '', degree: 'Nhà thuốc', associationAward: '' }
                            };
                            break;
                        case 'pharmacist':
                            normalizedData = {
                                ...normalizedData,
                                name: resultAny.fullName,
                                degree: resultAny.career || 'Dược sĩ',
                                avatar: resultAny.thumbnail || '/img/doctor/doctor-2.jpg',
                                speciality: resultAny.specialistly || '',
                                address: resultAny.address || '',
                                workplace: resultAny.address ? [{ pharmacyName: resultAny.address, address: '', avatar: '', userId: '', userType: 'pharmacy', speciality: '', traffic: {}, statistic: {} }] : [],
                                intro: { exp: resultAny.career || '', degree: resultAny.specialistly || '', associationAward: '' }
                            };
                            break;
                    }

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
