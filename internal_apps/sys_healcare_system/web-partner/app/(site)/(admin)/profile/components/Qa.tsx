import React, { useState } from 'react';
import _ from 'lodash';

import Flaticon from '@/components/common/Flaticon';

interface Author {
  name: string;
  avatar: string;
}

interface QaItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  vote: number;
  reply: string;
}

interface ServiceItem {
  name: string;
  price: number;
}

interface Service {
  speciality: string;
  services: ServiceItem[];
}

interface QaProps {
  data: {
    qa: QaItem[];
    name: string;
    degree: string;
    service: Service[];
    userType: "doctor" | "hospital" | "clinic" | "pharmacy" | "pharmacist" | "user";
  };
}

const Qa: React.FC<QaProps> = ({ data }) => {
  const { qa, name, degree, service } = data;
  const allServices = _(service[0].services);

  return (
    <div className="space-y-8">
      {/* QA Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h4 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Đặt câu hỏi cho bác sĩ</h4>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Họ tên của bạn"
                className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                id="inputEmailQa"
              />
            </div>
            <div>
              <div className="relative">
                <select
                  id="inputStateQa"
                  className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:ring-0 transition-all font-medium appearance-none"
                >
                  <option>Chọn dịch vụ bạn cần hỏi</option>
                  {_.map(service, (item, i) => {
                    // Logic placeholder
                    return null;
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <i className="fi flaticon-down-arrow text-xs"></i>
                </div>
              </div>
            </div>
          </div>

          <div>
            <textarea
              className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:ring-0 transition-all font-medium placeholder:text-gray-400"
              placeholder="Nhập câu hỏi của bạn..."
              id="exampleFormControlTextareaQa"
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 transition-all duration-300">
              Gửi câu hỏi
            </button>
          </div>
        </form>
      </div>

      {/* QA List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
              {qa.length}
            </span>
            câu hỏi đã trả lời
          </h4>
        </div>

        <div className="space-y-6">
          {_.map(qa, (item, i) =>
            <div className="border-b border-gray-100 last:border-0 pb-6 last:pb-0" key={i}>
              <div className="flex gap-4">
                <a href="/" className="flex-shrink-0">
                  <img src={item.author.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" alt={item.author.name} />
                </a>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-gray-900 text-lg">{item.author.name}</span>
                    <span className="text-sm text-gray-500">{item.publishDate}</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 inline-block">
                    <span className="text-xs font-semibold uppercase text-gray-500 block mb-1">Dịch vụ quan tâm</span>
                    <span className="text-sm font-medium text-gray-900">{item.service}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed font-medium">"{item.content}"</p>

                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium group">
                    <i className="fi flaticon-like group-hover:scale-110 transition-transform"></i>
                    <span>{item.vote} Hưu ích</span>
                  </button>

                  {item.reply && (
                    <div className="mt-4 ml-0 md:ml-4 bg-teal-50/50 rounded-xl p-4 border border-teal-100 relative">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                          <i className="fi flaticon-doctor-1 text-sm"></i>
                        </div>
                        <div>
                          <h5 className="font-bold text-teal-900 text-sm mb-1">{degree} {name} <span className="font-normal text-teal-600">trả lời</span></h5>
                          <p className="text-teal-800 text-sm leading-relaxed">{item.reply}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {qa.length > 2 && (
          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-primary transition-all">
              Xem tất cả câu hỏi
              <i className="fi flaticon-right-arrow text-xs"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Qa;