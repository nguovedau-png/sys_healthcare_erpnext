'use client';

import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import _ from 'lodash';
import Banner from '@/components/common/Banner';
import DiseaseCard from './components/DiseaseCard';
import MedicineCard from './components/MedicineCard';
import HospitalCard, { HospitalData } from '@/components/common/HospitalCard';
import DoctorCard, { DoctorData } from '@/components/common/DoctorCard';
import TopicCard from './components/TopicCard';
import { SkeletonList } from '@/components/common/Skeletons';
import Aside from '@/components/layout/Aside';
import JsonLd from '@/components/common/JsonLd';
import dynamic from 'next/dynamic';
import {
    AiOutlineUnorderedList as UnorderedListOutlined,
    AiOutlineEnvironment as EnvironmentOutlined,
    AiOutlineAppstore as AppstoreOutlined
} from 'react-icons/ai';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import Empty from '@/components/ui/Empty';
import partnerService, { Doctor, Hospital, Clinic } from '@/services/partner.service';
import searchService from '@/services/search.service';

const MapView = dynamic(() => import('./components/MapView'), {
    ssr: false,
    loading: () => <div className="h-96 w-full bg-gray-100 flex items-center justify-center rounded-xl">Loading Map...</div>
});

const SearchResultContent: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const type = searchParams.get('type') || 'doctor';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('q') || '';

    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [fixed, setFixed] = useState<boolean>(false);

    const [filters, setFilters] = useState({
        speciality: 'all',
        location: 'all',
        rating: 'all',
        availability: 'all'
    });

    const handleScroll = () => {
        const header = document.querySelector('.header') as HTMLElement;
        const banner = document.querySelector('.banner') as HTMLElement;
        const aside = document.querySelector('.aside') as HTMLElement;

        if (header && banner && aside) {
            let limitBorderline = header.offsetHeight + banner.offsetHeight + aside.offsetHeight + 30;
            setFixed(window.pageYOffset >= limitBorderline);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response: any;
                const params = { page, limit, search };

                switch (type) {
                    case 'disease':
                        response = await searchService.searchDiseases(search, page, limit);
                        setData(response.data || []);
                        setTotal(response.meta?.total || 0);
                        setLoading(false);
                        return;
                    case 'medicine':
                        response = await searchService.searchMedicines(search, page, limit);
                        setData(response.data || []);
                        setTotal(response.meta?.total || 0);
                        setLoading(false);
                        return;
                    case 'doctor':
                        response = await partnerService.getDoctors(params);
                        setData(response.data.map((d: Doctor) => ({
                            userId: d.id.toString(),
                            userType: 'doctor',
                            name: d.name,
                            degree: d.specialty.includes('BS') ? '' : 'Bác sĩ',
                            avatar: d.thumbnail || `/img/user/user-${(d.id % 10) + 1}.JPG`,
                            speciality: d.specialty,
                            address: d.hospital || 'TP. Hồ Chí Minh',
                            rating: d.rating || 4.5,
                            isAvailable: true,
                            traffic: { like: 10, search: 11, view: 21, visit: 123, post: 0 },
                            statistic: { like: 120, feedback: 85 }
                        })));
                        break;
                    case 'hospital':
                        response = await partnerService.getHospitals(params);
                        setData(response.data.map((h: Hospital) => ({
                            userId: h.id.toString(),
                            userType: 'hospital',
                            name: h.name,
                            avatar: h.thumbnail || `/img/user/${(h.id % 5) + 1}.png`,
                            speciality: h.departments?.slice(0, 2).join(', ') || 'Đa khoa',
                            address: h.address,
                            traffic: { visit: 1540, search: 302, view: 500, like: 120, post: 10 },
                            statistic: { like: 120, feedback: 85 }
                        })));
                        break;
                    case 'clinic':
                        response = await partnerService.getClinics(params);
                        setData(response.data.map((c: Clinic) => ({
                            userId: c.id.toString(),
                            userType: 'clinic',
                            name: c.name,
                            avatar: c.thumbnail || `/img/user/${(c.id % 5) + 3}.png`,
                            speciality: c.specialties?.slice(0, 2).join(', ') || 'Phòng khám',
                            address: c.address,
                            traffic: { visit: 450, search: 120, view: 300, like: 80, post: 5 },
                            statistic: { like: 80, feedback: 45 }
                        })));
                        break;
                    case 'pharmacy':
                        response = await partnerService.getPharmacies(params);
                        setData(response.data.map((p: any) => ({
                            userId: p.id.toString(),
                            userType: 'pharmacy',
                            name: p.name,
                            avatar: p.thumbnail || `/img/user/${(p.id % 5) + 2}.png`,
                            speciality: 'Nhà thuốc',
                            address: p.address,
                            traffic: { visit: 200, search: 50, view: 150, like: 40, post: 2 },
                            statistic: { like: 40, feedback: 20 }
                        })));
                        break;
                    default:
                        setData([]);
                        response = { meta: { total: 0 } };
                }
                setTotal(response.meta.total);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
                setData([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, page, limit, search]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const getTitle = () => {
        if (type === 'disease') return 'Bệnh A-Z';
        if (type === 'medicine') return 'Thuốc A-Z';
        if (type === 'hospital') return 'Bệnh viện & Cơ sở y tế';
        if (type === 'clinic') return 'Phòng khám';
        if (type === 'pharmacy') return 'Nhà thuốc';
        if (type === 'forum') return 'Thảo luận cộng đồng';
        return 'Bác sĩ phù hợp nhất';
    };

    const renderContent = () => {
        if (loading) {
            const skeletonType = type === 'disease' ? 'disease' : type === 'medicine' ? 'medicine' : type === 'doctor' ? 'doctor' : 'hospital';
            return <SkeletonList count={limit} type={skeletonType} />;
        }

        if (data.length === 0) {
            return <Empty description="Không tìm thấy kết quả phù hợp" className="bg-white p-20 rounded-xl" />;
        }

        if (type === 'disease') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item: any) => (
                        <DiseaseCard key={item.id} item={item} />
                    ))}
                    <div className="col-span-full flex justify-center mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <Pagination
                            current={page}
                            pageSize={limit}
                            total={total}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="custom-pagination"
                        />
                    </div>
                </div>
            );
        }

        if (type === 'medicine') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item: any) => (
                        <MedicineCard key={item.id} item={item} />
                    ))}
                    <div className="col-span-full flex justify-center mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <Pagination
                            current={page}
                            pageSize={limit}
                            total={total}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="custom-pagination"
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                {data.map((item, i) => (
                    <div key={i} className="h-full">
                        {type === 'doctor' ? <DoctorCard data={item} layout={viewMode} /> : <HospitalCard data={item} layout={viewMode} />}
                    </div>
                ))}

                <div className={`flex justify-center mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${viewMode === 'grid' ? 'col-span-full' : ''}`}>
                    <Pagination
                        current={page}
                        pageSize={limit}
                        total={total}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        className="custom-pagination"
                    />
                </div>
            </div>
        );
    };

    const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list');

    return (
        <Fragment>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'MedicalWebPage',
                'name': getTitle(),
                'description': 'Tìm kiếm thông tin y tế, bác sĩ và cơ sở y tế.'
            }} />
            <Banner page="search" />
            <div className="news-container py-8 bg-gray-50/50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Kết quả tìm kiếm</h2>
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === 'list' ? 'primary' : 'default'}
                                icon={<UnorderedListOutlined />}
                                onClick={() => setViewMode('list')}
                            >
                                Danh sách
                            </Button>
                            <Button
                                variant={viewMode === 'grid' ? 'primary' : 'default'}
                                icon={<AppstoreOutlined />}
                                onClick={() => setViewMode('grid')}
                            >
                                Lưới
                            </Button>
                            <Button
                                variant={viewMode === 'map' ? 'primary' : 'default'}
                                icon={<EnvironmentOutlined />}
                                onClick={() => setViewMode('map')}
                            >
                                Bản đồ
                            </Button>
                        </div>
                    </div>

                    {viewMode === 'map' ? (
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-8">
                                <MapView locations={data} />
                            </div>
                            <div className="col-span-12 lg:col-span-4 h-[calc(100vh-100px)] overflow-y-auto pr-2">
                                <div className="space-y-4">
                                    {data.map(item => (
                                        type === 'doctor' ? <DoctorCard key={item.userId} data={item} /> : <HospitalCard key={item.userId} data={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full lg:w-9/12 px-4 order-2 lg:order-1">
                                <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 leading-tight">{getTitle()}</h2>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Dữ liệu được cập nhật từ hệ thống</p>
                                    </div>
                                    <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                        {total} kết quả
                                    </div>
                                </div>
                                {renderContent()}
                            </div>
                            <div className="w-full lg:w-3/12 px-4 order-1 lg:order-2 mb-8 lg:mb-0">
                                <div className="sticky top-24">
                                    <Aside isFixed={fixed} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

const SearchResult: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResultContent />
        </Suspense>
    );
};

export default SearchResult;