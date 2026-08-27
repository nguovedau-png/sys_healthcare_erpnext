"use client";
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Banner from '@/components/common/Banner';
import LineChart from '@/components/common/Chart/LineChart';
import { useViewport } from '@/components/common/Function';
import { Title, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { AiOutlineHeart as HeartOutlined, AiOutlineCalendar as CalendarOutlined, AiOutlineLineChart as LineChartOutlined } from 'react-icons/ai';

import ProfileTab from '@/app/(site)/profile/components/ProfileTab';
import CommonInfo from './CommonInfo';
import Statistic from './Statistic';
import ArticleList from './ArticleList';
import Workplace from '@/app/(site)/profile/components/Workplace';
import Facilities from './Facilities';
import { USERS } from '@/components/common/Constant';

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

interface Comment {
  id: string;
  content: string;
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


interface ProfileByUserId {
  userId: string;
  userType: 'user' | 'doctor' | 'clinic' | 'hospital';
  statistic: Statistics;
  traffic: Traffic;
  workplace: WorkplaceData[];
  facilities: Array<{
    facilitiesName: string;
    address: string;
    phone: string;
  }>;
  name: string;
  speciality: string;
  degree: string;
  address: string;
  phone: string[];
  email: string[];
  avatar: string;
  socialContact: SocialContactItem[];
  intro: IntroSection;
  service: SpecialityService[];
  rating: RatingItem[];
  worktime: WorkTime;
  gallery: GalleryItem[];
  indoorMap?: MapItem[];
  qa: QaItem[];
  newsFeed?: NewsData[];
  favoriteList?: FavoriteItem[];
  userQa?: QaItem[];
  visitHistory?: VisitHistoryItem[];
}

const articlesByUserId: NewsData[] = [
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
];



export default function MedicalUser() {
  const profileByUserId = _.find(USERS, { userId: "doc-001" }) as unknown as ProfileByUserId;
  const { statistic, workplace, facilities, userType } = profileByUserId;

  const [likeState, setLikeState] = useState<boolean>(false);
  const [isPressLike, setIsPressLike] = useState<boolean>(false);
  const [userStatistic, setUserStatistic] = useState<Statistics>(statistic);

  const { width } = useViewport();
  const breakpoint = 1199;
  let likeCount = userStatistic.like;

  const likeButtonHandler = () => {
    setLikeState(!likeState);
    setIsPressLike(true);
  };

  useEffect(() => {
    if (isPressLike) {
      likeCount = likeState ? likeCount + 1 : likeCount - 1;
      setUserStatistic(oldUserStatistic => ({
        ...oldUserStatistic,
        like: likeCount
      }));
    }
    setLikeState(likeState);
  }, [likeState]);

  return (
    <div className="min-h-screen bg-background pb-20 animate-in fade-in duration-700">
      <Banner page='others' />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <CommonInfo data={profileByUserId} likeCount={userStatistic.like} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Button
                variant={likeState ? "primary" : "default"}
                className={`flex-1 h-14 rounded-lg font-black shadow-soft transition-all ${likeState ? 'bg-accent border-none' : 'bg-white border-border'}`}
                onClick={likeButtonHandler}
                icon={<HeartOutlined className="text-xl" />}
              >
                {likeState ? 'Đã thích' : 'Yêu thích'}
              </Button>
              <Button 
                variant="primary" 
                className="flex-[1.5] h-14 rounded-lg font-black shadow-premium"
                icon={<CalendarOutlined className="text-xl" />}
              >
                Đặt lịch khám
              </Button>
            </div>
            <Statistic data={profileByUserId} />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2 space-y-12">
            <Card className="rounded-lg shadow-soft border-border bg-surface overflow-hidden">
              <ProfileTab data={profileByUserId} />
            </Card>
            <ArticleList data={articlesByUserId} />
          </div>

          <div className="space-y-10">
            {userType !== 'doctor'
              ? (facilities && facilities.length > 0 && <Facilities data={facilities} />)
              : (width > breakpoint && workplace && <Workplace data={workplace} />)
            }

            <Card className="rounded-lg shadow-soft border-border bg-surface p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <LineChartOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 font-black text-slate-800">Lượt truy cập</Title>
              </div>
              <div className="h-64">
                <LineChart />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};