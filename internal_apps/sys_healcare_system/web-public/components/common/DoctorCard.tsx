import React from 'react';
import Link from 'next/link';
import {
  AiOutlineEnvironment as EnvironmentOutlined,
  AiOutlineCalendar as CalendarOutlined,
  AiOutlineStar as StarOutlined,
  AiFillStar as StarFilled,
} from 'react-icons/ai';

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
  layout?: 'list' | 'grid' | 'map' | string;
}

// Stable color palette based on userId hash
const AVATAR_COLORS = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
];

const getColorClass = (userId: string) => {
  const idx = parseInt(userId, 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[isNaN(idx) ? 0 : idx];
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const DoctorCard: React.FC<DoctorCardProps> = ({ data, simpleMode = false }) => {
  const { userId, userType, name, degree, avatar, speciality, statistic, address } = data;
  const rating = Math.min(5, 4 + (statistic.feedback ?? 0) % 10 / 10).toFixed(1);
  const colorClass = getColorClass(userId);

  const isDefaultAvatar = !avatar || avatar.includes('undefined') || avatar.endsWith('.JPG');

  return (
    <Link href={`/profile/${userType}/${userId}`} className="block group h-full">
      <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-gradient-to-br hover:from-white hover:to-slate-50/80 hover:shadow-sm transition-all duration-200 h-full">
        
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-sm border-2 border-white flex items-center justify-center bg-gradient-to-br ${colorClass} text-white font-black text-base select-none`}>
            {isDefaultAvatar ? (
              <span>{getInitials(name)}</span>
            ) : (
              <img src={avatar} className="w-full h-full object-cover" alt={name}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
          </div>
          {/* Rating badge below avatar */}
          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
            <StarFilled className="text-amber-400 text-[10px]" />
            <span className="text-[11px] font-bold text-amber-600">{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
          <div>
            {degree && (
              <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md mb-1.5">
                {degree}
              </span>
            )}
            <p className="text-[15px] font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight truncate m-0">
              {name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">{speciality}</p>
          </div>

          <div className="flex items-center justify-between">
            {!simpleMode && address && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[60%]">
                <EnvironmentOutlined className="text-[11px] shrink-0 text-slate-300" />
                {address}
              </span>
            )}
            <span className="text-[10px] text-slate-400">
              {statistic.feedback ?? 0} đánh giá
            </span>
          </div>
        </div>

        {/* Book Button */}
        {!simpleMode && (
          <div className="flex-shrink-0 self-center">
            <span className="flex flex-col items-center gap-1 text-[11px] font-bold text-primary group-hover:text-white bg-primary/8 group-hover:bg-primary px-3 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm">
              <CalendarOutlined className="text-base" />
              <span>Đặt lịch</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DoctorCard;