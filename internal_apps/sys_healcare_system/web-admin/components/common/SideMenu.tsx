import React from 'react';
import _ from 'lodash';
import SideMenuItem from './SideMenuItem';

interface SubNavItem {
  route: string;
  title: string;
}

interface MenuItem {
  route: string;
  title: string;
  subNav?: SubNavItem[];
}

interface SideMenuProps {
  menu: MenuItem[];
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (isOpen: boolean) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ menu, isSideMenuOpen, setIsSideMenuOpen }) => {
  return (
    <div className={`sidemenu${isSideMenuOpen ? ' show' : ' hide'}`}>
      <div className="sidemenu-overlay" onClick={() => setIsSideMenuOpen(false)} />
      <div className="sidemenu-nav">
        {_.map(menu, (item, i) => (
          <SideMenuItem item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SideMenu;