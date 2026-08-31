import React, { Fragment } from 'react';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useViewport } from '../../common/Function';

// Import existing components from app/profile/components
import Intro from '@/app/(site)/profile/components/Intro';
import Service from '@/app/(site)/profile/components/Service';
import Rating from '@/app/(site)/profile/components/Rating';
import Worktime from '@/app/(site)/profile/components/Worktime';
import Gallery from '@/app/(site)/profile/components/Gallery';
import IndoorMap from '@/app/(site)/profile/components/IndoorMap';
import Qa from '@/app/(site)/profile/components/Qa';
import Workplace from '@/app/(site)/profile/components/Workplace';
import NewsFeed from '@/app/(site)/profile/components/NewsFeed';
import FavoriteList from '@/app/(site)/profile/components/FavoriteList';
import VisitHistory from '@/app/(site)/profile/components/VisitHistory';
import UserQa from '@/app/(site)/profile/components/UserQa';
import Schedule from '@/app/(site)/profile/components/Schedule';
import UserLog from '@/app/(site)/profile/components/UserLog';

export const TABS_BY_USER_TYPE_EXTENDED = {
    doctor: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Câu hỏi"],
    hospital: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    clinic: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    pharmacy: ["Giới thiệu", "Sản phẩm", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    pharmacist: ["Giới thiệu", "Bằng cấp", "Đánh giá", "Nơi làm việc", "Câu hỏi"],
    user: ["Bảng tin", "Danh sách yêu thích", "Lịch sử khám bệnh", "Câu hỏi của bạn"],
};

export const TABS_BY_USER_TYPE_RES_EXTENDED = {
    doctor: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Câu hỏi", "Nơi công tác"],
    hospital: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    clinic: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    pharmacy: ["Giới thiệu", "Sản phẩm", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
    pharmacist: ["Giới thiệu", "Bằng cấp", "Đánh giá", "Nơi làm việc", "Câu hỏi"],
    user: ["Bảng tin", "Danh sách yêu thích", "Lịch sử khám bệnh", "Câu hỏi của bạn", "Lịch hẹn của bạn", "Lịch sử hoạt động"],
};

// Types
interface Author { name: string; avatar: string; }
interface SocialContactItem { name: string; icon: string; link: string; }
interface ServiceItem { name: string; price: number; }
interface SpecialityService { speciality: string; services: ServiceItem[]; }
interface IntroSection { exp: string; degree: string; associationAward: string; }
interface RatingItem {
    author: Author; publishDate: string; service: string; content: string; reply: string; vote: number; isAgreeRecommend: boolean;
}
interface WorkTime { weekday: string[]; weekend: string[]; holiday: string[]; }
interface Traffic { like: number; search: number; view: number; visit: number; post: number; }
interface Statistics { yearExp: number; visit: number; post: number; like: number; search: number; view: number; feedback: number; }
interface WorkplaceData {
    userId: string; userType: string; name: string; avatar: string; speciality: string; traffic: Traffic; statistic: Statistics; address: string;
}
interface GalleryItem { img: string; }
interface MapItem { img: string; label: string; }
interface QaItem { author: Author; publishDate: string; service: string; content: string; reply: string; vote: number; }
import { NewsData } from '../../common/NewsArticle';
interface FavoriteItem {
    userId: string; userType: 'doctor' | 'hospital' | 'clinic'; name: string; degree: string; avatar: string; speciality: string;
    traffic: Traffic; statistic: Statistics; address: string;
}
interface VisitHistoryItem {
    userId: string; userType: string; name: string; avatar: string;
    detail: { doctor: { userId: string; userType: string; name: string; }; service: { name: string; price: number; }; datetime: string; };
}

interface ProfileData {
    name: string;
    speciality: string;
    degree: string;
    userType: 'doctor' | 'hospital' | 'clinic' | 'pharmacy' | 'pharmacist' | 'user';
    address: string;
    phone: string[];
    email: string[];
    socialContact: SocialContactItem[];
    intro: IntroSection;
    service: SpecialityService[];
    rating: RatingItem[];
    worktime: WorkTime;
    workplace?: WorkplaceData[];
    gallery: GalleryItem[];
    indoorMap?: MapItem[];
    qa: QaItem[];
    newsFeed?: NewsData[];
    favoriteList?: FavoriteItem[];
    userQa?: QaItem[];
    visitHistory?: VisitHistoryItem[];
}

interface ProfileTabProps {
    data: ProfileData;
}

const ProfileTabExtended: React.FC<ProfileTabProps> = ({ data }) => {
    const { name, speciality, degree, userType, address, phone, email, socialContact, intro, service, rating, worktime, workplace, gallery, indoorMap, qa, newsFeed, favoriteList, userQa, visitHistory } = data;

    // Responsive
    const { width } = useViewport();
    const breakpoint = 1199;

    // @ts-ignore
    const tabs = width > breakpoint ? TABS_BY_USER_TYPE_EXTENDED[userType] : TABS_BY_USER_TYPE_RES_EXTENDED[userType];

    // Calculate number of TabPanels based on userType
    const getTabPanelsCount = () => {
        switch (userType) {
            case 'user': return width <= breakpoint ? 6 : 4;
            case 'pharmacist': return 5;
            case 'doctor': return width > breakpoint ? 6 : 7; // Extra workplace tab in responsive
            case 'hospital':
            case 'clinic':
            case 'pharmacy': return width > breakpoint ? 7 : 7; // indoorMap + QA always
            default: return 6;
        }
    };

    return (
        <Tabs>
            <TabList>
                {_.map(tabs, (tab, i) =>
                    <Tab key={i}>{tab}</Tab>
                )}
            </TabList>
            {userType === 'user'
                ? <Fragment>
                    <TabPanel className="profile-tab-content"><NewsFeed data={newsFeed || []} /></TabPanel>
                    <TabPanel className="profile-tab-content"><FavoriteList data={favoriteList || []} /></TabPanel>
                    <TabPanel className="profile-tab-content"><VisitHistory data={visitHistory || []} /></TabPanel>
                    <TabPanel className="profile-tab-content"><UserQa data={userQa || []} /></TabPanel>
                    {width <= breakpoint && <>
                        <TabPanel className="profile-tab-content"><Schedule /></TabPanel>
                        <TabPanel className="profile-tab-content"><UserLog isTab={true} /></TabPanel>
                    </>}
                </Fragment>
                // Doctor, Clinic, Hospital, Pharmacy, Pharmacist profile
                : <Fragment>
                    {/* 1. Intro - All */}
                    <TabPanel className="profile-tab-content">
                        <Intro data={{ userType, intro, address, phone, email, socialContact, speciality }} />
                    </TabPanel>

                    {/* 2. Service/Product/Degrees */}
                    <TabPanel className="profile-tab-content">
                        {userType === 'pharmacy' ? <Service data={service || []} /> :
                            userType === 'pharmacist' ? <div className="p-3">{intro?.degree || 'Chưa có thông tin'}</div> :
                                <Service data={service || []} />
                        }
                    </TabPanel>

                    {/* 3. Rating - All */}
                    <TabPanel className="profile-tab-content">
                        <Rating data={{ userType, rating: rating || [], name, degree }} />
                    </TabPanel>

                    {/* 4. Worktime/Workplace */}
                    <TabPanel className="profile-tab-content">
                        {userType === 'pharmacist'
                            ? <Workplace data={workplace || []} />
                            : <Worktime data={worktime || { weekday: [], weekend: [], holiday: [] }} />
                        }
                    </TabPanel>

                    {/* 5. Gallery/Questions */}
                    <TabPanel className="profile-tab-content">
                        {userType === 'pharmacist'
                            ? <Qa data={{ qa: qa || [], userType, name, degree, service: service || [] }} />
                            : <Gallery data={gallery || []} />
                        }
                    </TabPanel>

                    {/* 6. Indoor Map - Only for Hospital/Clinic/Pharmacy */}
                    {(userType === 'hospital' || userType === 'clinic' || userType === 'pharmacy') &&
                        <TabPanel className="profile-tab-content">
                            <IndoorMap data={{ userType, indoorMap: indoorMap || [] }} />
                        </TabPanel>
                    }

                    {/* 7. QA - For non-pharmacist */}
                    {userType !== 'pharmacist' &&
                        <TabPanel className="profile-tab-content">
                            <Qa data={{ qa: qa || [], userType, name, degree, service: service || [] }} />
                        </TabPanel>
                    }

                    {/* 8. Extra Workplace for Doctor (responsive only) */}
                    {userType === 'doctor' && width <= breakpoint &&
                        <TabPanel className="profile-tab-content">
                            <Workplace data={workplace || []} />
                        </TabPanel>
                    }
                </Fragment>
            }
        </Tabs>
    );
};

export default ProfileTabExtended;
