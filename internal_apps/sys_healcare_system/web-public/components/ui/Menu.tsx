import React, { useState } from 'react';
import classNames from 'classnames';

export interface MenuItem {
  key?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'divider';
}

export interface MenuProps {
  items: MenuItem[];
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  onClick?: (info: { key: string }) => void;
  mode?: 'inline' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
}

const Menu: React.FC<MenuProps> = ({
  items,
  defaultSelectedKeys = [],
  selectedKeys: externalSelectedKeys,
  onClick,
  mode = 'inline',
  className,
  style
}) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  
  const currentSelectedKeys = externalSelectedKeys || internalSelectedKeys;

  const toggleSubMenu = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelect = (key: string) => {
    if (!externalSelectedKeys) {
      setInternalSelectedKeys([key]);
    }
    if (onClick) {
      onClick({ key });
    }
  };

  const renderItem = (item: MenuItem, level: number = 0) => {
    if (item.type === 'divider') {
      return <li key={Math.random()} className="h-px bg-slate-100 my-2" />;
    }

    const itemKey = item.key || '';
    const isSelected = currentSelectedKeys.includes(itemKey);
    const isOpen = openKeys.includes(itemKey);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={itemKey} className="w-full px-2">
        <div
          className={classNames(
            'flex items-center justify-between cursor-pointer transition-all duration-200 rounded-xl mb-1',
            mode === 'inline' ? 'py-3' : 'py-4',
            level === 0 ? 'px-4' : 'px-8',
            isSelected && !hasChildren 
              ? 'bg-primary/10 text-primary font-bold shadow-sm' 
              : 'text-slate-600 hover:text-primary hover:bg-slate-50',
            hasChildren ? 'font-bold text-slate-900' : 'text-sm font-medium'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleSubMenu(itemKey);
            } else {
              handleSelect(itemKey);
            }
          }}
        >
          <div className="flex items-center gap-3">
            {item.icon && <span className={classNames('text-lg', isSelected && !hasChildren ? 'text-primary' : 'text-slate-400')}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {hasChildren && (
            <svg
              className={classNames('w-4 h-4 transition-transform text-slate-400', isOpen ? 'rotate-180' : '')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
        
        {hasChildren && (
          <div
            className={classNames(
              'overflow-hidden transition-all duration-200',
              isOpen ? 'max-h-96' : 'max-h-0'
            )}
          >
            <ul className="m-0 p-0 list-none bg-slate-50/50">
              {item.children!.map((child) => renderItem(child, level + 1))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <ul
      className={classNames(
        'm-0 p-0 list-none w-full bg-white',
        mode === 'horizontal' ? 'flex items-center border-b border-slate-100' : 'flex flex-col',
        className
      )}
      style={style}
    >
      {items.map((item) => renderItem(item))}
    </ul>
  );
};

export default Menu;
