import React from 'react';
import _ from 'lodash';
import { Title, Text } from '@/components/ui/Typography';
import { AiOutlineBank as BankOutlined } from 'react-icons/ai';
import FacilitiesCard from './FacilitiesCard';

interface FacilitiesProps {
  data: Array<{
    facilitiesName: string;
    address: string;
    phone: string;
  }>;
}

const Facilities: React.FC<FacilitiesProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
          <BankOutlined className="text-xl" />
        </div>
        <div>
          <Title level={4} className="m-0 font-black tracking-tight text-slate-900">Cơ sở hoạt động</Title>
          <Text type="secondary" className="text-[10px] font-bold uppercase tracking-widest">Địa điểm làm việc chuyên môn</Text>
        </div>
      </div>
      
      <div className="space-y-4">
        {_.map(data, (item, i) => (
          <FacilitiesCard data={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Facilities;