import React from 'react';
import classNames from 'classnames';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';

export interface ResultProps {
  status?: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Result: React.FC<ResultProps> = ({ status = 'info', title, subTitle, extra, icon, className }) => {
  const getIcon = () => {
    if (icon) return icon;
    switch (status) {
      case 'success':
        return <AiOutlineCheckCircle className="text-6xl text-teal-500 mb-4" />;
      case 'error':
        return <AiOutlineCloseCircle className="text-6xl text-red-500 mb-4" />;
      case 'warning':
        return <AiOutlineWarning className="text-6xl text-orange-500 mb-4" />;
      case '404':
      case '403':
      case '500':
      case 'info':
      default:
        return <AiOutlineInfoCircle className="text-6xl text-blue-500 mb-4" />;
    }
  };

  return (
    <div className={classNames('py-10 px-8 flex flex-col items-center text-center', className)}>
      {getIcon()}
      {title && <div className="text-2xl font-bold text-slate-800 mb-2">{title}</div>}
      {subTitle && <div className="text-slate-500 mb-6 max-w-lg">{subTitle}</div>}
      {extra && <div className="flex flex-wrap gap-4 justify-center">{extra}</div>}
    </div>
  );
};

export default Result;
