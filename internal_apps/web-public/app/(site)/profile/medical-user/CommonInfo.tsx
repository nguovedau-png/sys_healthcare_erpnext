import React from 'react';
import { USER_TYPE } from '@/components/common/Constant';
import Avatar from '@/components/ui/Avatar';
import { Title, Text } from '@/components/ui/Typography';
import Tag from '@/components/ui/Tag';
import { AiOutlineHeart as HeartOutlined, AiOutlineLike as LikeOutlined } from 'react-icons/ai';

interface CommonInfoData {
  avatar: string;
  degree: string;
  name: string;
  speciality: string;
  userType: keyof typeof USER_TYPE;
}

interface CommonInfoProps {
  data: CommonInfoData;
  likeCount: number;
}

const CommonInfo: React.FC<CommonInfoProps> = ({ data, likeCount }) => {
  const { avatar, degree, name, speciality, userType } = data;
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-4 bg-surface rounded-lg border border-border shadow-soft">
      <div className="relative shrink-0">
        <Avatar 
          size={160} 
          src={avatar} 
          className="shadow-premium border-4 border-white rounded-lg overflow-hidden"
        />
        <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 border-4 border-white rounded-full animate-pulse shadow-sm"></div>
      </div>
      
      <div className="flex-1 text-center md:text-left pt-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
          <Tag color="primary" bordered={false} className="text-[10px] font-black">{USER_TYPE[userType]}</Tag>
          <Tag color="success" bordered={false} className="text-[10px] font-black">Verified Doctor</Tag>
        </div>
        
        <Title level={1} className="font-black text-slate-900 mb-2 leading-tight">
          <span className="text-primary block md:inline mr-2">{degree}</span>
          {name}
        </Title>
        
        <Text className="text-lg font-bold text-slate-500 block mb-6">
          Chuyên khoa {speciality}
        </Text>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <div className="flex items-center gap-2 bg-slate-50/50 px-4 py-2 rounded-xl border border-border transition-all hover:bg-white hover:shadow-soft">
            <HeartOutlined className="text-accent text-xl" />
            <Text className="text-sm font-black text-slate-700">
              {likeCount} <span className="text-muted font-bold ml-1">yêu thích</span>
            </Text>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/50 px-4 py-2 rounded-xl border border-border transition-all hover:bg-white hover:shadow-soft">
            <LikeOutlined className="text-primary text-xl" />
            <Text className="text-sm font-black text-slate-700">
              98% <span className="text-muted font-bold ml-1">giới thiệu</span>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonInfo;