import React from 'react';
// eslint-disable-next-line
import Ratio from 'react-ratio';
import _ from 'lodash';
import Flaticon from '@/components/common/Flaticon';
import Link from 'next/link';
interface Service {
  name: string;
  price: number;
}

interface Traffic {
  visit: number;
  search: number;
  view: number;
}

interface SearchCardItem {
  title?: string;
  avatar: string;
  name: string;
  specialist: string;
  totalRating: number;
  link: string;
  address: string;
  services: Service[];
  traffic: Traffic;
  isOnline: boolean;
  isWorking: boolean;
}

interface SearchCardProps {
  item: SearchCardItem;
}

const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
  const { title, avatar, name, specialist, totalRating, traffic, link, address, services, isOnline } = item;
  return (
    <div className="search-result-card">
      <button type="button" className="like-btn">
        <Flaticon icon='like-1' />
      </button>
      <div className="row m-row justify-content-center">
        <div className="col-xl-5 col-lg-4 col-md-6 col-6">
          <a href={link}>
          <Ratio
            ratio={1 / 1}
            className="avatar"
          >
            <div className="overflow-hidden avatar-cover">
              <img src={avatar} className="img-fluid" alt="" />
            </div>

            <div className={`online-status${isOnline ? ' online' : ''}`} title={isOnline ? 'Trực tuyến' : 'Ngoại tuyến'}></div>
          </Ratio>
          </a>
        </div>
        <div className="col-xl-7 col-lg-8 col-md-12 col-12">
          <div className="common">
            <i className="common-degree">
              {title}
            </i>
            <h2 className="common-name">
              {name}
            </h2>
            <span className="common-specialist">
              {specialist}
            </span>

            <div className="common-rating">
              <Flaticon icon='like' />
              <small>{totalRating}</small>
            </div>
            <div className="common-address">
              <Flaticon icon='pin' />
              <small>{address}</small>
            </div>
          </div>
        </div>
      </div>
      <span className="search-result-divider"></span>
      <div className="row m-row">
        <div className="col-lg-6">
          <div className="service">
            <h3>Dịch vụ nổi bật</h3>
            <ul>
              {_.map(_.slice(services, 0, 3), (item, i) =>
                <li key={i}>- {item.name}</li>
              )}
            </ul>
            <Link href={link}>Xem thêm {services.length - 3} dịch vụ</Link>
          </div>
        </div>
        <div className="col-lg-6">
          <span className="status active">
            <Flaticon icon='clock' /> Đang làm việc
          </span>
          <Link href={link} className="btn btn-main">
            <Flaticon icon='calendar' />
            Xem hồ sơ
          </Link>
          <div className="traffic">
            <div className="traffic-item">
              <Flaticon icon='stethoscope' />
              {traffic.visit}
            </div>
            <div className="traffic-item">
              <Flaticon icon='loupe' />
              {traffic.search}
            </div>
            <div className="traffic-item">
              <Flaticon icon='show' />
              {traffic.visit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;