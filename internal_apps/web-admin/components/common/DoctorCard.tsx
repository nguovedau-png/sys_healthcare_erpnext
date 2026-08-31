import React from 'react';
import Link from 'next/link';
import Ratio from 'react-ratio';
import { useViewport } from './Function';
import Flaticon from './Flaticon';

export interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

export interface Statistic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
  feedback?: number;
  yearExp?: number;
}

export interface DoctorData {
  userId: string;
  userType: string;
  name: string;
  degree: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistic;
  address: string;
}

interface DoctorCardProps {
  data: DoctorData;
  simpleMode?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ data, simpleMode = false }) => {
  const { userId, userType, name, degree, avatar, speciality, traffic, statistic, address } = data;

  // Responsive
  const { width } = useViewport();
  const breakpoint = 768;
  const breakpoint1 = 414;

  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 h-full border border-gray-100 group">
      <div className="flex p-4 gap-4 h-full">
        {/* Left: Avatar */}
        <div className="w-24 flex-shrink-0">
          <Link href={`/profile/${userId}`} className="block relative aspect-square rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-primary/50 transition-colors">
            <img src={avatar} className="w-full h-full object-cover" alt={name} />
          </Link>
          <div className="mt-2 text-center text-[10px] sm:text-xs font-medium text-gray-500 bg-gray-50 rounded-full py-0.5 px-2 truncate">
            {statistic.feedback} đánh giá
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {!simpleMode && degree && (
              <span className="inline-block text-xs font-semibold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full mb-1">
                {degree}
              </span>
            )}
            <Link href={`/profile/${userType}/${userId}`} className="block">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors truncate" title={name}>
                {name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 font-medium mb-1 truncate">{speciality}</p>
            {!simpleMode && (
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                <i className="fi flaticon-placeholder mr-1 relative top-0.5"></i>
                {address}
              </p>
            )}
          </div>

          {!simpleMode && (
            <div className="mt-auto pt-3 border-t border-gray-50">
              <Link
                href={`/profile/${data.userId}`}
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-white border border-primary text-primary text-xs sm:text-sm font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow"
              >
                Đặt lịch
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;