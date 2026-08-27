import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import _ from 'lodash';
import Flaticon from './Flaticon';

interface SubNavItem {
  route: string;
  title: string;
}

interface MenuItem {
  route: string;
  title: string;
  subNav?: SubNavItem[];
}

interface SideMenuItemProps {
  item: MenuItem;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({ item }) => {
  const pathname = usePathname();
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  return (
    <div className="sidemenu-item">
      <Link
        href={item.route}
        onClick={() => setIsDropdown(!isDropdown)}
        className={`sidemenu-link${pathname === item.route ? ' active' : ''}`}
      >
        {item.title}
        {item.subNav && <Flaticon icon='down-arrow' />}
      </Link>
      {item.subNav && (
        <div className={`sidemenu-sub${isDropdown ? ' expanded' : ''}`}>
          {_.map(item.subNav, (subItem, i) => (
            <Link
              href={subItem.route}
              key={i}
              className="sidemenu-link"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenuItem;