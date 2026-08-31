import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import DoctorCard, { DoctorData } from '@/components/common/DoctorCard';
import partnerService, { Doctor } from '@/services/partner.service';

const TopDoctor: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await partnerService.getDoctors({ limit: 10 });
        console.log('TopDoctor data:', response);
        const doctorsList = response.data || [];
        const mappedDoctors: DoctorData[] = doctorsList.map((d: Doctor) => ({
          userId: d.id.toString(),
          userType: 'doctor',
          name: d.name,
          degree: d.specialty.includes('BS') ? '' : 'Bác sĩ',
          avatar: d.thumbnail || `/img/user/user-${(d.id % 10) + 1}.JPG`,
          speciality: d.specialty,
          address: d.hospital || 'TP. Hồ Chí Minh',
          traffic: {
            like: Math.floor(Math.random() * 100),
            search: Math.floor(Math.random() * 500),
            view: Math.floor(Math.random() * 1000),
            visit: Math.floor(Math.random() * 50),
            post: Math.floor(Math.random() * 20)
          },
          statistic: {
            like: Math.floor(Math.random() * 100),
            search: Math.floor(Math.random() * 500),
            view: Math.floor(Math.random() * 1000),
            visit: Math.floor(Math.random() * 50),
            post: Math.floor(Math.random() * 20),
            feedback: Math.floor(Math.random() * 50),
            yearExp: 10
          }
        }));
        setDoctors(mappedDoctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-8 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-full lg:w-[calc(50%-16px)] h-40 bg-slate-100/80 rounded-lg border border-border"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 lg:divide-y-0 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-slate-100 lg:divide-x">
        {_.map(doctors.slice(0, 10), (item: DoctorData, i: number) => (
          <div key={i} className={i >= 2 ? 'border-t border-slate-100' : ''}>
            <DoctorCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctor;