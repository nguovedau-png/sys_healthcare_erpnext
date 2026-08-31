import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import HospitalCard, { HospitalData } from '@/components/common/HospitalCard';
import partnerService, { Hospital, Clinic } from '@/services/partner.service';

const TopHospital: React.FC = () => {
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospResponse, clinicResponse] = await Promise.all([
          partnerService.getHospitals({ limit: 5 }),
          partnerService.getClinics({ limit: 5 })
        ]);

        const mappedHospitals: HospitalData[] = (hospResponse.data || []).map((h: Hospital) => ({
          userId: h.id.toString(),
          userType: 'hospital',
          name: h.name,
          avatar: h.thumbnail || `/img/user/${(h.id % 5) + 1}.png`,
          speciality: h.departments?.slice(0, 2).join(', ') || 'Đa khoa',
          address: h.address,
          traffic: {
            like: Math.floor(Math.random() * 1000),
            search: Math.floor(Math.random() * 5000),
            view: Math.floor(Math.random() * 10000),
            visit: Math.floor(Math.random() * 200),
            post: Math.floor(Math.random() * 50)
          },
          statistic: {
            like: Math.floor(Math.random() * 500),
            feedback: Math.floor(Math.random() * 100),
            yearExp: 20
          }
        }));

        const mappedClinics: HospitalData[] = (clinicResponse.data || []).map((c: Clinic) => ({
          userId: c.id.toString(),
          userType: 'clinic',
          name: c.name,
          avatar: c.thumbnail || `/img/user/${(c.id % 5) + 3}.png`,
          speciality: c.specialties?.slice(0, 2).join(', ') || 'Phòng khám',
          address: c.address,
          traffic: {
            like: Math.floor(Math.random() * 500),
            search: Math.floor(Math.random() * 2000),
            view: Math.floor(Math.random() * 5000),
            visit: Math.floor(Math.random() * 50),
            post: Math.floor(Math.random() * 10)
          },
          statistic: {
            like: Math.floor(Math.random() * 200),
            feedback: Math.floor(Math.random() * 50),
            yearExp: 10
          }
        }));

        setHospitals([...mappedHospitals, ...mappedClinics]);
      } catch (error) {
        console.error('Failed to fetch hospital/clinic data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-slate-100 lg:divide-x">
        {_.map(hospitals.slice(0, 10), (item: HospitalData, i: number) => (
          <div key={i} className={i >= 2 ? 'border-t border-slate-100' : ''}>
            <HospitalCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHospital;