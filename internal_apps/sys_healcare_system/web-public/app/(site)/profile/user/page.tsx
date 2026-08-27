"use client";
import React from 'react';
import Banner from '@/components/common/Banner';
import Flaticon from '@/components/common/Flaticon';
import ProfileTab from '@/app/(site)/profile/components/ProfileTab';
import Schedule from '@/app/(site)/profile/components/Schedule';
import UserLog from '@/app/(site)/profile/components/UserLog';
import { useViewport } from '@/components/common/Function';

interface Author {
  name: string;
  avatar: string;
}

interface SocialContactItem {
  name: string;
  icon: string;
  link: string;
}

interface ServiceItem {
  name: string;
  price: number;
}

interface SpecialityService {
  speciality: string;
  services: ServiceItem[];
}

interface IntroSection {
  exp: string;
  degree: string;
  associationAward: string;
}

interface RatingItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  reply: string;
  vote: number;
  isAgreeRecommend: boolean;
}

interface WorkTime {
  weekday: string[];
  weekend: string[];
  holiday: string[];
}

interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

interface Statistics {
  yearExp: number;
  visit: number;
  post: number;
  like: number;
  search: number;
  view: number;
  feedback: number;
}

interface WorkplaceData {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface GalleryItem {
  img: string;
}

interface MapItem {
  img: string;
  label: string;
}

interface QaItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  reply: string;
  vote: number;
}

interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: { length: number };
  slug: string;
  type: 'article' | 'video';
}

interface FavoriteItem {
  userId: string;
  userType: 'doctor' | 'hospital' | 'clinic';
  name: string;
  degree: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistics;
  address: string;
}

interface VisitHistoryItem {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  detail: {
    doctor: {
      userId: string;
      userType: string;
      name: string;
    };
    service: {
      name: string;
      price: number;
    };
    datetime: string;
  };
}

interface Service {
  name: string;
  description: string;
  price?: string;
}

interface Location {
  userId: string;
  userType: 'clinic' | 'hospital' | 'doctor';
  name: string;
  service: Service;
}

interface ScheduleItem {
  date: string;
  service: string;
  isReVisit: boolean;
  location: Location;
}

interface UserProfile {
  userId: string;
  userType: 'user';
  name: string;
  speciality: string;
  degree: string;
  address: string;
  phone: string[];
  email: string[];
  socialContact: SocialContactItem[];
  intro: IntroSection;
  service: SpecialityService[];
  rating: RatingItem[];
  worktime: WorkTime;
  gallery: GalleryItem[];
  indoorMap?: MapItem[];
  qa: QaItem[];
  newsFeed: NewsData[];
  favoriteList: FavoriteItem[];
  userQa: QaItem[];
  visitHistory: VisitHistoryItem[];
  bookingList: ScheduleItem[];
  activitiesLog: any[];
  avatar: string;
  joinedDate: string;
}

const profileByUserId: UserProfile = {
  userId: 'u-001',
  userType: 'user',
  name: 'Nguyễn Trần Tuấn Anh',
  speciality: '',
  degree: '',
  address: '527 Sư Vạn Hạnh, Phường 12, Quận 10, TP. HCM',
  phone: ['090 365 2826'],
  email: ['tuananh@example.com'],
  socialContact: [
    {
      name: 'facebook',
      icon: 'facebook',
      link: 'https://facebook.com/tuananh'
    }
  ],
  intro: {
    exp: 'Thành viên tích cực của cộng đồng y tế',
    degree: '',
    associationAward: ''
  },
  service: [],
  rating: [],
  worktime: {
    weekday: [],
    weekend: [],
    holiday: []
  },
  gallery: [],
  qa: [],
  newsFeed: [
    {
      title: 'Chuyện về Virus mang vương miện mới, Novel coronavirus (2019-nCoV)',
      type: 'article',
      thumbnail: '/styles/img/news/mostview-news.png',
      author: {
        name: 'Bệnh viện Nhân dân Gia Định',
        avatar: '/styles/img/user/gia-dinh.png'
      },
      publishDate: '5 phút trước',
      desc: 'Thế giới vừa bước sang 2020, chúng ta vừa hưởng cái Tết đầm ấm; xuất hiện 2019- nCoV lây bệnh, chết người',
      slug: '/news/',
      view: 1000,
      comments: {
        length: 20
      }
    }
  ],
  favoriteList: [],
  userQa: [],
  visitHistory: [],
  bookingList: [],
  activitiesLog: [],
  avatar: '/styles/img/user/user-2.jpg',
  joinedDate: '04/01/2021'
};

const User: React.FC = () => {
  const { width } = useViewport();
  const breakpoint = 1199;

  const { avatar, name, joinedDate } = profileByUserId;

  return (
    <>
      <Banner page='others' />
      <div className="profile">
        <div className="profile-header box-wrap">
          <div className="container">
            <div className="row m-row">
              <div className="col-xl-8 col-12">
                <div className="profile-info">
                  <div className="avatar">
                    <div className="avatar-cover">
                      <img src={avatar} className="img-fluid" alt="" />
                    </div>
                    <div className="online"></div>
                  </div>
                  <div className="info">
                    <h1 className="name">{name}</h1>
                    <p className="date">Tham gia từ {joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row m-row">
            <div className="col-xl-8">
              <div className="profile-tab box-wrap">
                <ProfileTab data={profileByUserId} />
              </div>
            </div>

            <div className="col-xl-4">
              {width > breakpoint && <>
                <Schedule />
                <UserLog />
              </>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;