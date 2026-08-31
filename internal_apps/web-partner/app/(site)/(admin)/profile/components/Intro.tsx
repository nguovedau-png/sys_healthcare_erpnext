import React from 'react';
import _ from 'lodash';
import { sanitizeRichText } from '@/lib/sanitize-html';
import Flaticon from '@/components/common/Flaticon';

interface SocialContactItem {
  name: string;
  link: string;
  icon: string;
}

interface IntroSection {
  exp: string;
  degree: string;
  associationAward: string;
}

interface IntroData {
  userType: 'doctor' | 'hospital' | 'clinic' | 'pharmacy' | 'pharmacist' | 'user';
  intro: IntroSection;
  address: string;
  email: string[];
  phone: string[];
  socialContact: SocialContactItem[];
  speciality: string;
}

interface IntroProps {
  data: IntroData;
}

const Intro: React.FC<IntroProps> = ({ data }) => {
  const { userType, intro, address, email, phone, socialContact, speciality } = data;

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fi flaticon-pin text-primary text-2xl"></i>
          Thông tin liên lạc
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 group hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <i className="fi flaticon-pin text-lg"></i>
            </div>
            <div>
              <span className="block text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Địa chỉ</span>
              <span className="text-gray-900 font-medium">{address}</span>
            </div>
          </div>

          {phone.length > 0 && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 group hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <i className="fi flaticon-telephone text-lg"></i>
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Điện thoại</span>
                <div className="font-medium text-gray-900">
                  {_.map(phone, (item, i) => (
                    <span key={i} className="block hover:text-primary transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {email.length > 0 && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 group hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                <i className="fi flaticon-email text-lg"></i>
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email</span>
                <div className="font-medium text-gray-900">
                  {_.map(email, (item, i) => (
                    <span key={i} className="block hover:text-primary transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {socialContact?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Mạng xã hội</h4>
            <div className="flex gap-4">
              {_.map(socialContact, (item, i) => (
                <a
                  href={item.link}
                  key={i}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <i className={`fi flaticon-${item.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Intro Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
          {userType === 'doctor' ? 'Kinh nghiệm làm việc' : 'Lịch sử hình thành'}
        </h3>
        <div className="prose prose-blue max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: sanitizeRichText(intro?.exp) }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
          {userType === 'doctor' ? 'Bằng cấp' : 'Chuyên khoa'}
        </h3>
        <div className="prose prose-blue max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: sanitizeRichText(userType === 'doctor' ? intro?.degree : speciality) }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
          Hiệp hội và giải thưởng
        </h3>
        <div className="prose prose-blue max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: sanitizeRichText(intro?.associationAward) }} />
        </div>
      </div>
    </div>
  );
};

export default Intro;