import React from 'react';
import Card from '@/components/ui/Card';
import { Title, Text } from '@/components/ui/Typography';
import { AiOutlineExperiment as ExperimentOutlined, AiOutlineUsergroupAdd as UsergroupAddOutlined, AiOutlineRead as ReadOutlined } from 'react-icons/ai';

interface Traffic {
  visit: number;
  post: number;
}

interface Statistics {
  yearExp: number;
  visit: number;
  post: number;
}

interface StatisticProps {
  data: {
    traffic: Traffic;
    statistic: Statistics;
  };
}

const Statistic: React.FC<StatisticProps> = ({ data }) => {
  const { traffic, statistic } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <Card className="rounded-lg shadow-soft border-border bg-surface p-6 text-center transition-all hover:shadow-card hover:-translate-y-1">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
          <ExperimentOutlined className="text-xl" />
        </div>
        <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest block mb-2">Kinh nghiệm</Text>
        <Title level={2} className="m-0 font-black text-slate-900">{statistic.yearExp}</Title>
        <Text className="text-[10px] font-bold text-muted mt-1 uppercase">Năm hoạt động</Text>
      </Card>

      <Card className="rounded-lg shadow-soft border-border bg-surface p-6 text-center transition-all hover:shadow-card hover:-translate-y-1">
        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mx-auto mb-4">
          <UsergroupAddOutlined className="text-xl" />
        </div>
        <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest block mb-2">Lượt khám</Text>
        <Title level={2} className="m-0 font-black text-slate-900">{statistic.visit.toLocaleString()}</Title>
        <Text className="text-[10px] font-bold text-muted mt-1 uppercase">{traffic.visit} lượt/ngày</Text>
      </Card>

      <Card className="rounded-lg shadow-soft border-border bg-surface p-6 text-center transition-all hover:shadow-card hover:-translate-y-1">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
          <ReadOutlined className="text-xl" />
        </div>
        <Text type="secondary" className="text-[10px] font-black uppercase tracking-widest block mb-2">Bài viết</Text>
        <Title level={2} className="m-0 font-black text-slate-900">{statistic.post}</Title>
        <Text className="text-[10px] font-bold text-muted mt-1 uppercase">{traffic.post} bài/ngày</Text>
      </Card>
    </div>
  );
};

export default Statistic;