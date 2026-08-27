import React from 'react';
import _ from 'lodash';

const WEEKDAY: string[] = ['Hôm nay', 'Ngày mai (27/03/2021)', '28/03/2021'];

interface WorktimeData {
  weekday: string[];
  weekend: string[];
  holiday: string[];
}

interface WorktimeProps {
  data: WorktimeData;
}

const Worktime: React.FC<WorktimeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-1">Lịch khám bệnh</h4>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <i className="fi flaticon-time"></i>
          Chọn một khung giờ để đặt lịch (Thời gian chờ tối đa 15 phút)
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <h6 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Hôm nay (26/03/2021)
            </h6>
            <div className="flex flex-wrap gap-3">
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">16:00 - 17:30</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">17:40 - 18:00</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">18:10 - 19:00</a>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <h6 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Ngày mai (27/03/2021)
            </h6>
            <div className="flex flex-wrap gap-3">
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">16:00 - 17:30</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">17:40 - 18:00</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">18:10 - 19:00</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">19:10 - 20:00</a>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <h6 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              28/03/2021
            </h6>
            <div className="flex flex-wrap gap-3">
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">18:00 - 19:30</a>
              <a href="/" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-all text-sm font-medium border border-gray-100 hover:border-primary hover:shadow-md">19:40 - 20:00</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Worktime;