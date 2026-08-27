import React from 'react';
import classNames from 'classnames';

export interface AlertProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Alert: React.FC<AlertProps> = ({ message, description, type = 'info', showIcon, className, style }) => {
  const typeMap = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  const Icon = () => {
    if (!showIcon) return null;
    
    let iconClass = 'w-5 h-5 mr-3 mt-0.5 shrink-0 ';
    let d = '';
    
    if (type === 'success') {
      iconClass += 'text-emerald-500';
      d = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    } else if (type === 'error') {
      iconClass += 'text-red-500';
      d = 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
    } else if (type === 'warning') {
      iconClass += 'text-amber-500';
      d = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
    } else {
      iconClass += 'text-blue-500';
      d = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }

    return (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    );
  };

  return (
    <div
      className={classNames(
        'px-4 py-3 rounded-lg border text-sm flex items-start',
        typeMap[type],
        className
      )}
      style={style}
    >
      <Icon />
      <div>
        {message && <div className={classNames('font-medium', description ? 'mb-1 text-base' : '')}>{message}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
    </div>
  );
};

export default Alert;
