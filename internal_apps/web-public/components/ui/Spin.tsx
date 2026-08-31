import React from 'react';
import classNames from 'classnames';

export interface SpinProps {
  size?: 'small' | 'default' | 'large';
  className?: string;
  spinning?: boolean;
  tip?: string;
}

const Spin: React.FC<SpinProps> = ({ size = 'default', className, spinning = true, tip }) => {
  if (!spinning) return null;

  const sizeMap = {
    small: 'w-4 h-4 border-2',
    default: 'w-6 h-6 border-2',
    large: 'w-10 h-10 border-4',
  };

  return (
    <div className={classNames('inline-flex flex-col items-center justify-center gap-2', className)}>
      <div
        className={classNames(
          'animate-spin rounded-full border-border border-t-primary',
          sizeMap[size]
        )}
      />
      {tip && <div className="text-sm text-primary font-bold tracking-tight">{tip}</div>}
    </div>
  );
};

export default Spin;
