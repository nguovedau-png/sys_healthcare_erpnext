import React from 'react';
import classNames from 'classnames';

export interface DescriptionsProps {
  title?: React.ReactNode;
  column?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface DescriptionsItemProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ label, children, className }) => {
  return (
    <div className={classNames('pb-4 flex', className)}>
      <div className="w-10 flex-shrink-0 pt-1 text-slate-500">{label}</div>
      <div className="flex-1 text-slate-800">{children}</div>
    </div>
  );
};

const Descriptions = ({ title, column = 1, className, children }: DescriptionsProps) => {
  return (
    <div className={classNames('w-full', className)}>
      {title && <div className="font-bold text-slate-800 mb-4">{title}</div>}
      <div
        className={classNames('grid gap-x-4', {
          'grid-cols-1': column === 1,
          'grid-cols-2': column === 2,
          'grid-cols-3': column === 3,
          'grid-cols-4': column === 4,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Descriptions.Item = DescriptionsItem;

export default Descriptions;
