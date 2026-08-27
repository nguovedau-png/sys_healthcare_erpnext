import React from 'react';
import Link from 'next/link';
import {
  AiOutlineEnvironment as EnvironmentOutlined,
  AiOutlineCalendar as CalendarOutlined,
  AiOutlineShoppingCart as ShoppingCartOutlined,
  AiOutlineEye as EyeOutlined,
  AiFillStar as StarFilled,
} from 'react-icons/ai';
import { MdLocalHospital } from 'react-icons/md';

export interface Traffic {
  like: number;
  search: number;
  view: number;
  visit: number;
  post: number;
}

export interface Statistic {
  like: number;
  feedback: number;
  yearExp?: number;
}

export interface HospitalData {
  userId: string;
  userType: string;
  name: string;
  avatar: string;
  speciality: string;
  traffic: Traffic;
  statistic: Statistic;
  address: string;
}

interface HospitalCardProps {
  data: HospitalData;
  simpleMode?: boolean;
  layout?: 'list' | 'grid' | 'map' | string;
}

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; gradient: string }> = {
  hospital: {
    label: 'Bệnh viện',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    gradient: 'from-blue-400 to-blue-600',
  },
  clinic: {
    label: 'Phòng khám',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    gradient: 'from-teal-400 to-emerald-500',
  },
  pharmacy: {
    label: 'Nhà thuốc',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    gradient: 'from-green-400 to-emerald-500',
  },
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const HospitalCard: React.FC<HospitalCardProps> = ({ data, simpleMode = false }) => {
  const { userId, userType, name, avatar, speciality, traffic, statistic, address } = data;

  const cfg = TYPE_CONFIG[userType] || TYPE_CONFIG.hospital;
  const rating = Math.min(5, 4 + (statistic.feedback % 10) / 10).toFixed(1);
  const isDefaultAvatar = !avatar || avatar.includes('undefined') || avatar.match(/\d+\.png$/);

  const actionLabel = userType === 'pharmacy' ? 'Mua thuốc' : 'Đặt lịch';
  const ActionIcon = userType === 'pharmacy' ? ShoppingCartOutlined : CalendarOutlined;

  return (
    <Link href={`/profile/${userType}/${userId}`} className="block group h-full">
      <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-gradient-to-br hover:from-white hover:to-slate-50/80 hover:shadow-sm transition-all duration-200 h-full">

        {/* Avatar / Logo */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-sm border-2 border-white flex items-center justify-center bg-gradient-to-br ${cfg.gradient} text-white font-black text-base select-none`}>
            {isDefaultAvatar ? (
              <MdLocalHospital className="text-2xl text-white/90" />
            ) : (
              <img
                src={avatar}
                className="w-full h-full object-cover"
                alt={name}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
          </div>
          {/* Rating badge */}
          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
            <StarFilled className="text-amber-400 text-[10px]" />
            <span className="text-[11px] font-bold text-amber-600">{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
          <div>
            <span className={`inline-block text-[10px] font-bold ${cfg.color} ${cfg.bg} border ${cfg.border} px-2 py-0.5 rounded-md mb-1.5`}>
              {cfg.label}
            </span>
            <p className="text-[15px] font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight line-clamp-1 m-0">
              {name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">{speciality}</p>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            {address && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[65%]">
                <EnvironmentOutlined className="text-[11px] shrink-0 text-slate-300" />
                {address}
              </span>
            )}
            {!simpleMode && traffic.visit > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                <EyeOutlined className="text-[10px]" />
                {traffic.visit} lượt/ngày
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        {!simpleMode && (
          <div className="flex-shrink-0 self-center">
            <span className={`flex flex-col items-center gap-1 text-[11px] font-bold ${cfg.color} group-hover:text-white ${cfg.bg} group-hover:bg-primary px-3 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-sm border ${cfg.border} group-hover:border-primary`}>
              <ActionIcon className="text-base" />
              <span>{actionLabel}</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default HospitalCard;