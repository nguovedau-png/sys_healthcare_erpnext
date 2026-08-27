import React from 'react';
import _ from 'lodash';

import Flaticon from '@/components/common/Flaticon';
import { USER_TYPE } from '@/components/common/Constant';

interface Author {
  name: string;
  avatar: string;
}

interface RatingItem {
  author: Author;
  publishDate: string;
  service: string;
  content: string;
  vote: number;
  reply: string;
  isAgreeRecommend: boolean;
}

interface RatingProps {
  data: {
    userType: keyof typeof USER_TYPE;
    rating: RatingItem[];
    name: string;
    degree: string;
  };
}

const Rating: React.FC<RatingProps> = ({ data }) => {
  const { userType, rating, name, degree } = data;

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h4 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Để lại đánh giá của bạn</h4>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Họ tên của bạn"
                className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                id="inputEmail4"
              />
            </div>
            <div>
              <div className="relative">
                <select
                  id="inputState"
                  className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:ring-0 transition-all font-medium appearance-none"
                  defaultValue="Chọn dịch vụ bạn đã sử dụng"
                >
                  <option disabled>Chọn dịch vụ bạn đã sử dụng</option>
                  <option>Khám bệnh</option>
                  <option>Khám nhi</option>
                  <option>Xét nghiệm</option>
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
              placeholder="Nhập nội dung đánh giá của bạn..."
              id="exampleFormControlTextarea1"
              rows={4}
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="gridCheck"
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <label className="text-sm font-medium text-gray-700" htmlFor="gridCheck">
                Tôi sẽ giới thiệu {USER_TYPE[userType]} này cho người khác
              </label>
            </div>
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 transition-all duration-300">
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>

      {/* Review List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 text-sm font-bold">
              {rating.length}
            </span>
            đánh giá từ bệnh nhân
          </h4>
        </div>

        <div className="space-y-6">
          {_.map(rating, (item, i) =>
            <div className="border-b border-gray-100 last:border-0 pb-6 last:pb-0" key={i}>
              <div className="flex gap-4">
                <a href="/" className="flex-shrink-0">
                  <img src={item.author.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" alt={item.author.name} />
                </a>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-lg">{item.author.name}</span>
                      {item.isAgreeRecommend && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                          <i className="fi flaticon-checklist"></i> Sẽ giới thiệu
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{item.publishDate}</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 inline-block">
                    <span className="text-xs font-semibold uppercase text-gray-500 block mb-1">Dịch vụ đã dùng</span>
                    <span className="text-sm font-medium text-gray-900">{item.service}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{item.content}</p>

                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium group">
                    <i className="fi flaticon-like group-hover:scale-110 transition-transform"></i>
                    <span>{item.vote} Hữu ích</span>
                  </button>

                  {item.reply && (
                    <div className="mt-4 ml-0 md:ml-4 bg-blue-50/50 rounded-xl p-4 border border-blue-100 relative">
                      <i className="fi flaticon-share absolute top-4 left-4 text-blue-300 transform -scale-x-100"></i>
                      <div className="pl-8">
                        <h5 className="font-bold text-blue-900 text-sm mb-1">{degree} {name} <span className="font-normal text-blue-600">phản hồi</span></h5>
                        <p className="text-blue-800 text-sm leading-relaxed">{item.reply}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {rating.length > 2 && (
          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-primary transition-all">
              Xem tất cả đánh giá
              <i className="fi flaticon-right-arrow text-xs"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;