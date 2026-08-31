import React from 'react';
import _ from 'lodash';
import AsideMenu from './AsideMenu';
import { API_GET_COMMON_DISEASE } from '../common/Constant';

interface AsideProps {
  isFixed: boolean;
}

interface DiseaseItem {
  title: string;
  link: string;
}

const Aside: React.FC<AsideProps> = ({ isFixed }) => {
  const { data } = API_GET_COMMON_DISEASE as { data: DiseaseItem[] };

  return (
    <div className="">
      <AsideMenu isFixed={isFixed} />
      <div className="mb-8">
        <div className="mb-[20px] pb-[10px] border-b border-[#dadada]">
          <h1 className="text-[20px] font-bold text-[#1e2225] uppercase before:content-[''] before:block before:w-[50px] before:h-[2px] before:bg-[#47af50] before:mb-[5px]"><a href="" className="hover:text-[#47af50] transition-colors">BỆNH THƯỜNG GẶP</a></h1>
        </div>
        <ul className="">
          {_.map(data, (item: DiseaseItem, i: number) =>
            <li key={i} className="mb-[10px] last:mb-0">
              {/* <span>1.5k</span> */}
              <a href={item.link} className="text-[#1e2225] text-[15px] hover:text-[#47af50] transition-colors block pl-[15px] relative before:content-['•'] before:absolute before:left-0 before:text-[#47af50] before:font-bold">
                {item.title}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Aside;