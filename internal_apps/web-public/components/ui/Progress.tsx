import React from 'react';
import classNames from 'classnames';

export interface ProgressProps {
  percent?: number;
  showInfo?: boolean;
  status?: 'success' | 'exception' | 'normal' | 'active';
  className?: string;
  strokeColor?: string;
  trailColor?: string;
  size?: 'small' | 'default';
}

const Progress: React.FC<ProgressProps> = ({
  percent = 0,
  showInfo = true,
  status = 'normal',
  className,
  strokeColor,
  trailColor,
  size = 'default',
}) => {
  const validPercent = Math.min(100, Math.max(0, percent));

  const getColorClass = () => {
    if (strokeColor) return '';
    if (status === 'success' || validPercent === 100) return 'bg-emerald-500';
    if (status === 'exception') return 'bg-red-500';
    return 'bg-teal-500';
  };

  const barStyle = strokeColor ? { backgroundColor: strokeColor } : {};
  const containerStyle = trailColor ? { backgroundColor: trailColor } : {};

  return (
    <div className={classNames('flex items-center w-full', className)}>
      <div 
        className={classNames(
          'w-full bg-slate-200 rounded-full relative overflow-hidden',
          size === 'small' ? 'h-1' : 'h-2'
        )}
        style={containerStyle}
      >
        <div
          className={classNames(
            'h-full rounded-full transition-all duration-300',
            getColorClass()
          )}
          style={{ width: `${validPercent}%`, ...barStyle }}
        />
      </div>
      {showInfo && (
        <span className="ml-3 text-slate-600 text-sm font-medium w-9">
          {validPercent}%
        </span>
      )}
    </div>
  );
};

export default Progress;
