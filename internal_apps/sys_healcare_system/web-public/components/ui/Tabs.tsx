import React, { useState } from 'react';
import classNames from 'classnames';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActiveKey, activeKey, onChange, className }) => {
  const [internalKey, setInternalKey] = useState<string>(
    activeKey || defaultActiveKey || (items.length > 0 ? items[0].key : '')
  );

  const currentKey = activeKey !== undefined ? activeKey : internalKey;

  const handleTabClick = (key: string) => {
    if (activeKey === undefined) {
      setInternalKey(key);
    }
    if (onChange) {
      onChange(key);
    }
  };

  return (
    <div className={classNames('w-full', className)}>
      <div className="flex border-b border-slate-200">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            className={classNames(
              'px-4 py-3 font-medium text-sm transition-colors border-b-2',
              currentKey === item.key
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-teal-600'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {items.find((item) => item.key === currentKey)?.children}
      </div>
    </div>
  );
};

export default Tabs;
