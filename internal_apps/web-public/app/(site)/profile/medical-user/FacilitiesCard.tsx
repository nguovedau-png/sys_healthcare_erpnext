import React from 'react';
import Card from '@/components/ui/Card';
import { Title, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { AiOutlineEnvironment as EnvironmentOutlined, AiOutlinePhone as PhoneOutlined, AiOutlineCompass as CompassOutlined } from 'react-icons/ai';

interface FacilityData {
  facilitiesName: string;
  address: string;
  phone: string;
}

interface FacilitiesCardProps {
  data: FacilityData;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ data }) => {
  const { facilitiesName, address, phone } = data;
  return (
    <Card className="rounded-lg shadow-soft border-border bg-surface p-5 hover:shadow-card transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Title level={5} className="font-black text-slate-800 mb-1 leading-tight">
            Cơ sở {facilitiesName}
          </Title>
          <div className="flex items-start gap-2">
            <EnvironmentOutlined className="text-primary mt-0.5 shrink-0" />
            <Text className="text-xs font-medium text-slate-500 leading-relaxed">{address}</Text>
          </div>
        </div>
        <Button variant="text" size="small" className="text-primary font-bold text-[10px] uppercase tracking-wider" icon={<CompassOutlined />}>
          Chỉ đường
        </Button>
      </div>
      
      <div className="pt-3 border-t border-dashed border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary border border-border">
          <PhoneOutlined className="text-sm" />
        </div>
        <Text className="text-sm font-black text-slate-700 tracking-tight">{phone}</Text>
      </div>
    </Card>
  );
};

export default FacilitiesCard;