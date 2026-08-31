import React from 'react';
import _ from 'lodash';
import { API_GET_COVID } from '@/components/common/Constant';
import Card from '@/components/ui/Card';

interface CovidData {
  label: string;
  infected: number;
  dead: number;
}

const Covid: React.FC = () => {
  const { data } = API_GET_COVID as { data: CovidData[] };

  return (
    <Card className="p-0 border-border rounded-lg bg-red-50/50 overflow-hidden shadow-sm h-full">
      <div className="h-[80px] lg:h-[100px] bg-center bg-no-repeat bg-cover relative flex justify-center items-center bg-[url('/styles/img/banner/covid.jpg')]">
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-sm lg:text-base text-white font-black m-0 uppercase tracking-widest drop-shadow-md">
            THỐNG KÊ SỐ LIỆU COVID-19
          </h2>
          <p className="text-[11px] lg:text-xs text-center mt-1.5 font-medium m-0 text-slate-200">
            Cập nhật: 15:30 - 15/01/2021
          </p>
        </div>
      </div>
      <div className="p-3">
        <table className="w-full m-0 hidden xl:table">
          <thead>
            <tr className="border-b border-red-100">
              <th scope="col" style={{ width: '60%' }} className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-2 font-bold text-slate-800">Quốc gia</th>
              <th scope="col" className="text-center text-sm lg:text-xs p-2 lg:px-2 lg:py-2 w-[20%]">
                <img src="/img/icon/facial-mask.svg" alt="Infected" className="w-4 h-4 lg:w-5 lg:h-5 mx-auto opacity-70" />
              </th>
              <th scope="col" className="text-center text-sm lg:text-xs p-2 lg:px-2 lg:py-2 w-[20%]">
                <img src="/img/icon/death.svg" alt="Dead" className="w-4 h-4 lg:w-5 lg:h-5 mx-auto opacity-70" />
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(data, (item: CovidData, i: number) =>
              <tr key={i} className="border-b border-red-100/50 last:border-0 hover:bg-red-50 transition-colors">
                <th scope="row" className="text-left text-sm lg:text-xs p-2 lg:px-2 lg:py-2.5 font-bold text-slate-700">{item.label}</th>
                <td className="text-center text-sm lg:text-xs p-2 lg:px-2 lg:py-2.5 font-medium text-slate-600">{item.infected.toLocaleString()}</td>
                <td className="text-center text-sm lg:text-xs p-2 lg:px-2 lg:py-2.5 font-bold text-red-600">{item.dead.toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Mobile View for Covid Data */}
        <div className="xl:hidden flex flex-col gap-2 mt-2">
           {_.map(data, (item: CovidData, i: number) =>
              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <img src="/img/icon/facial-mask.svg" alt="Infected" className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-medium text-slate-600">{item.infected.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src="/img/icon/death.svg" alt="Dead" className="w-4 h-4 opacity-70" />
                    <span className="text-sm font-bold text-red-600">{item.dead.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </Card>
  );
};

export default Covid;