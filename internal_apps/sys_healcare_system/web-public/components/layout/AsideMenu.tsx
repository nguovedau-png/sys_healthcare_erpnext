import React from 'react';
import _ from 'lodash';
import Flaticon from '../common/Flaticon';
import { API_GET_NEWS_CATEGORY } from '../common/Constant';

interface AsideMenuProps {
  isFixed: boolean;
}

interface CategoryItem {
  link: string;
  icon: string;
  categoryItem: string;
}

const AsideMenu: React.FC<AsideMenuProps> = ({ isFixed }) => {
  const { data } = API_GET_NEWS_CATEGORY as { data: CategoryItem[] };

  return (
    <div className={`mb-8 ${isFixed ? 'fixed top-[100px] w-[262.5px]' : ''}`}>
      <h1 className="text-[20px] font-bold text-[#1e2225] uppercase pb-[10px] border-b border-[#dadada] mb-[20px] before:content-[''] before:block before:w-[50px] before:h-[2px] before:bg-[#47af50] before:mb-[5px]">CHUYÊN MỤC</h1>
      <ul className="">
        {_.map(data, (item: CategoryItem, i: number) =>
          <li key={i} className="mb-[10px] last:mb-0">
            <a href={item.link} className="flex items-center text-[#1e2225] text-[15px] hover:text-[#47af50] transition-colors">
              <span className="mr-[10px] text-[#47af50] flex items-center"><Flaticon icon={item.icon} /></span>
              {item.categoryItem}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AsideMenu;