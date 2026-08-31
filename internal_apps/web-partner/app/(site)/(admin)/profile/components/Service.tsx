import React from 'react';
import _ from 'lodash';

interface ServiceItem {
  name: string;
  price: number;
}

interface SpecialityService {
  speciality: string;
  services: ServiceItem[];
}

interface ServiceProps {
  data: SpecialityService[];
}

const Service: React.FC<ServiceProps> = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
    <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
      <h4 className="text-xl font-bold text-gray-900 mb-2">Bảng giá dịch vụ</h4>
      <p className="text-gray-600 text-sm">
        Lưu ý: Bảng giá dịch vụ trên Healthe Care System.vn chỉ mang tính chất tham khảo và có thể thay đổi tuỳ theo tình trạng bệnh lý...
      </p>
    </div>

    <div className="space-y-4">
      {_.map(data, (item, index) => (
        <details key={`${item.speciality}-${index}`} className="border border-gray-100 rounded-xl overflow-hidden mb-4 shadow-sm">
          <summary className="flex items-center justify-between p-4 w-full text-left bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <i className="fi flaticon-folder text-primary" aria-hidden="true" />
              {item.speciality}
            </span>
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {item.services.length} dịch vụ
            </span>
          </summary>
          <div className="p-0">
            <div className="divide-y divide-gray-100">
              {_.map(item.services, (service, serviceIndex) => (
                <div key={`${service.name}-${serviceIndex}`} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                  <strong className="text-gray-700 font-medium">{service.name}</strong>
                  <span className="text-primary font-bold">
                    {service.price.toLocaleString('vi-VN')} <sup className="text-xs text-gray-400">VNĐ</sup>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  </div>
);

export default Service;
