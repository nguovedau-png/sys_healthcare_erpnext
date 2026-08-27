import React from 'react';
import classNames from 'classnames';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: React.ReactNode;
  showZero?: boolean;
  overflowCount?: number;
  dot?: boolean;
  color?: string;
  size?: 'default' | 'small';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  showZero = false,
  overflowCount = 99,
  dot = false,
  color,
  size = 'default',
  className,
  style,
  ...rest
}) => {
  const isHidden = !dot && count === 0 && !showZero;
  const displayCount = typeof count === 'number' && count > overflowCount ? `${overflowCount}+` : count;

  return (
    <span className={classNames('relative inline-block w-fit', className)} {...rest}>
      {children}
      {!isHidden && (
        <sup
          className={classNames(
            'absolute z-10 flex items-center justify-center font-medium transform -translate-y-1/2 translate-x-1/2 rounded-full',
            dot ? 'w-2 h-2 top-1 right-1' : 'top-0 right-0 px-1.5 min-w-[20px] h-5',
            size === 'small' && !dot ? 'h-4 min-w-[16px] text-[10px]' : 'text-xs',
            !color ? 'bg-red-500 text-white shadow-sm ring-1 ring-white' : ''
          )}
          style={{
            ...style,
            backgroundColor: color,
            color: color ? '#fff' : undefined,
          }}
        >
          {!dot && displayCount}
        </sup>
      )}
    </span>
  );
};

export default Badge;
