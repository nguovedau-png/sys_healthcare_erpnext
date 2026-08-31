import React from 'react';
import classNames from 'classnames';

interface BaseSkeletonProps {
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<BaseSkeletonProps & { size?: number | 'small' | 'large' | 'default', shape?: 'circle' | 'square' }> = ({
  active = true,
  size = 'default',
  shape = 'circle',
  className,
  style,
}) => {
  const sizeMap = { small: 'w-6 h-6', default: 'w-8 h-8', large: 'w-10 h-10' };
  const sizeClasses = typeof size === 'number' ? '' : sizeMap[size];
  const customStyle = typeof size === 'number' ? { width: size, height: size, ...style } : style;

  return (
    <div
      className={classNames(
        'bg-slate-200',
        active ? 'animate-pulse' : '',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        sizeClasses,
        className
      )}
      style={customStyle}
    />
  );
};

const Input: React.FC<BaseSkeletonProps & { size?: 'small' | 'default' | 'large' }> = ({
  active = true,
  size = 'default',
  className,
  style,
}) => {
  const sizeMap = { small: 'h-6', default: 'h-8', large: 'h-10' };
  return (
    <div
      className={classNames(
        'bg-slate-200 rounded-md w-full',
        active ? 'animate-pulse' : '',
        sizeMap[size],
        className
      )}
      style={style}
    />
  );
};

const Button: React.FC<BaseSkeletonProps & { size?: 'small' | 'default' | 'large', block?: boolean }> = ({
  active = true,
  size = 'default',
  block,
  className,
  style,
}) => {
  const sizeMap = { small: 'h-6 w-16', default: 'h-8 w-24', large: 'h-10 w-32' };
  return (
    <div
      className={classNames(
        'bg-slate-200 rounded-lg',
        active ? 'animate-pulse' : '',
        block ? 'w-full h-8' : sizeMap[size],
        className
      )}
      style={style}
    />
  );
};

const Image: React.FC<BaseSkeletonProps> = ({ active = true, className, style }) => (
  <div
    className={classNames(
      'bg-slate-200 flex items-center justify-center',
      active ? 'animate-pulse' : '',
      className
    )}
    style={style}
  >
    <svg className="w-8 h-8 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  </div>
);

const Skeleton: React.FC<BaseSkeletonProps & { paragraph?: { rows?: number, width?: number | string | Array<number | string> } }> = ({
  active = true,
  paragraph = { rows: 3 },
  className,
  style,
}) => {
  const rows = paragraph.rows || 3;
  return (
    <div className={classNames('w-full', className)} style={style}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={classNames(
            'bg-slate-200 h-4 rounded-sm mb-2',
            active ? 'animate-pulse' : '',
            i === rows - 1 && rows > 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

export default Object.assign(Skeleton, { Avatar, Input, Button, Image });
