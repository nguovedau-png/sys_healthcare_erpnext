import React, { Fragment } from 'react';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TABS_BY_USER_TYPE, TABS_BY_USER_TYPE_RES } from '@/components/common/Constant';
import { useViewport } from '@/components/common/Function';

import Intro from './Intro';
import Service from './Service';
import Rating from './Rating';
import Worktime from './Worktime';
import Gallery from './Gallery';
import IndoorMap from './IndoorMap';
import Qa from './Qa';
import Workplace from './Workplace';

import NewsFeed from './NewsFeed';
import FavoriteList from './FavoriteList';
import VisitHistory from './VisitHistory';
import UserQa from './UserQa';
import Schedule from './Schedule';
import UserLog from './UserLog';

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

interface Service {
  name: string;
  description: string;
  price?: string;
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

interface ProfileData {
  name: string;
  speciality: string;
  degree: string;
  userType: 'user' | 'doctor' | 'clinic' | 'hospital';
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

const ProfileTab: React.FC<ProfileTabProps> = ({ data }) => {
  const { name, speciality, degree, userType, address, phone, email, socialContact, intro, service, rating, worktime, workplace, gallery, indoorMap, qa, newsFeed, favoriteList, userQa, visitHistory } = data;

  // Responsive
  const { width } = useViewport();
  const breakpoint = 1199;

  return (
    <Tabs>
      <TabList>
        {_.map(width > breakpoint ? TABS_BY_USER_TYPE[userType] : TABS_BY_USER_TYPE_RES[userType], (tab, i) =>
          <Tab key={i}>{tab}</Tab>
        )}
      </TabList>
      {userType === 'user'
        // User profile
        ? <Fragment>
          <TabPanel className="profile-tab-content">
            <NewsFeed data={newsFeed || []} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <FavoriteList data={favoriteList || []} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <VisitHistory data={visitHistory || []} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <UserQa data={userQa || []} />
          </TabPanel>
          {width <= breakpoint && <>
            <TabPanel className="profile-tab-content">
              <Schedule />
            </TabPanel>
            <TabPanel className="profile-tab-content">
              <UserLog isTab={true} />
            </TabPanel>
          </>}
        </Fragment>

        // Doctor, Clinic, Hospital profile
        : <Fragment>
          <TabPanel className="profile-tab-content">
            <Intro data={{ userType, intro, address, phone, email, socialContact, speciality }} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <Service data={service} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <Rating data={{ userType, rating, name, degree }} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <Worktime data={worktime} />
          </TabPanel>
          <TabPanel className="profile-tab-content">
            <Gallery data={gallery} />
          </TabPanel>

          {/* Only Clinic & Hospital have indoor map */}
          {userType !== 'doctor' &&
            <TabPanel className="profile-tab-content">
              <IndoorMap data={{ userType, indoorMap: indoorMap || [] }} />
            </TabPanel>
          }

          <TabPanel className="profile-tab-content">
            <Qa data={{ qa, userType, name, degree, service }} />
          </TabPanel>

          {userType === 'doctor' &&
            <TabPanel className="profile-tab-content">
              <Workplace data={workplace || []} />
            </TabPanel>
          }
        </Fragment>
      }
    </Tabs>
  );
};

export default ProfileTab;