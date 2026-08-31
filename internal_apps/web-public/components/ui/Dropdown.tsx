import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

export interface MenuItem {
  key: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  type?: 'divider';
  onClick?: () => void;
}

export interface DropdownProps {
  menu?: { items: MenuItem[] };
  trigger?: ('hover' | 'click')[];
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  arrow?: boolean;
  children: React.ReactElement;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  menu,
  trigger = ['hover'],
  placement = 'bottomLeft',
  arrow = false,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    if (!trigger.includes('click')) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [trigger]);

  const handleMouseEnter = () => {
    if (!trigger.includes('hover')) return;
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!trigger.includes('hover')) return;
    timeoutId = setTimeout(() => setIsOpen(false), 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!trigger.includes('click')) return;
    setIsOpen(!isOpen);
  };

  const placementClasses = {
    bottomLeft: 'top-full left-0 mt-2',
    bottomRight: 'top-full right-0 mt-2',
    topLeft: 'bottom-full left-0 mb-2',
    topRight: 'bottom-full right-0 mb-2',
  };

  return (
    <div
      className={classNames('relative inline-block', className)}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          const childProps = (children as React.ReactElement<any>).props;
          if (childProps && childProps.onClick) childProps.onClick(e);
          handleClick(e);
        },
      })}

      {isOpen && menu?.items && (
        <div
          className={classNames(
            'absolute z-50 min-w-[160px] py-1 bg-white rounded-lg shadow-lg border border-slate-100 animate-in fade-in zoom-in-95 duration-100',
            placementClasses[placement]
          )}
        >
          {arrow && (
            <div
              className={classNames(
                'absolute w-3 h-3 bg-white border-l border-t border-slate-100 transform rotate-45',
                placement.startsWith('bottom') ? '-top-1.5' : '-bottom-1.5 border-l-0 border-t-0 border-r border-b',
                placement.endsWith('Left') ? 'left-4' : 'right-4'
              )}
            />
          )}
          <ul className="relative z-10 w-full flex flex-col m-0 p-0 list-none">
            {menu.items.map((item, index) => {
              if (item.type === 'divider') {
                return <li key={`div-${index}`} className="h-px bg-slate-100 my-1 w-full" />;
              }
              return (
                <li
                  key={item.key}
                  className={classNames(
                    'px-4 py-2 cursor-pointer flex items-center gap-2 text-sm transition-colors',
                    item.danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50 hover:text-teal-600'
                  )}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <span className="flex items-center">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
