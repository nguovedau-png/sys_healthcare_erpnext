import React from 'react';
import classNames from 'classnames';

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
  className?: string;
  dashed?: boolean;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({ type = 'horizontal', className, dashed, style }) => {
  return (
    <div
      style={style}
      className={classNames(
        type === 'horizontal' ? 'w-full my-6 border-t' : 'h-full mx-4 border-l inline-block align-middle',
        dashed ? 'border-dashed' : 'border-solid',
        'border-slate-200',
        className
      )}
    />
  );
};

export default Divider;
