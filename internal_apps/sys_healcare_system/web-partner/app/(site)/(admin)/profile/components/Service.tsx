import React from 'react';
import _ from 'lodash';
import { USER_TYPE } from '@/components/common/Constant';

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
// import 'react-accessible-accordion/dist/fancy-example.css';

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

const Service: React.FC<ServiceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <h4 className="text-xl font-bold text-gray-900 mb-2">Bảng giá dịch vụ</h4>
        <p className="text-gray-600 text-sm">
          Lưu ý: Bảng giá dịch vụ trên Healthe Care System.vn chỉ mang tính chất tham khảo và có thể thay đổi tuỳ theo tình trạng bệnh lý...
        </p>
      </div>

      <div className="space-y-4">
        <Accordion allowMultipleExpanded={false} allowZeroExpanded className="border-none">
          {_.map(data, (item, i) =>
            <AccordionItem key={i} className="border border-gray-100 rounded-xl overflow-hidden mb-4 last:mb-0 shadow-sm">
              <AccordionItemHeading>
                <AccordionItemButton className="flex items-center justify-between p-4 w-full text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none">
                  <span className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <i className="fi flaticon-folder text-primary"></i>
                    {item.speciality}
                  </span>
                  <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    {item.services.length} dịch vụ
                  </span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="p-0">
                <div className="divide-y divide-gray-100">
                  {_.map(item.services, (service, j) =>
                    <div key={j} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                      <strong className="text-gray-700 font-medium">{service.name}</strong>
                      <span className="text-primary font-bold">
                        {service.price.toLocaleString()} <sup className="text-xs text-gray-400">VNĐ</sup>
                      </span>
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Service;