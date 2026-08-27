import React from 'react';
import classNames from 'classnames';

export interface StepItem {
  title: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepsProps {
  current?: number;
  items: StepItem[];
  className?: string;
}

const Steps: React.FC<StepsProps> = ({ current = 0, items, className }) => {
  return (
    <div className={classNames('flex items-center w-full', className)}>
      {items.map((item, index) => {
        const isCompleted = index < current;
        const isActive = index === current;
        const isPending = index > current;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={classNames(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-2 transition-colors',
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30 ring-4 ring-teal-50'
                    : isCompleted
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-slate-100 text-slate-400'
                )}
              >
                {item.icon ? item.icon : index + 1}
              </div>
              <div
                className={classNames(
                  'font-bold text-sm text-center',
                  isActive ? 'text-teal-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                )}
              >
                {item.title}
              </div>
              {item.description && (
                <div className="text-xs text-slate-500 text-center mt-1 max-w-[120px]">
                  {item.description}
                </div>
              )}
            </div>
            {index < items.length - 1 && (
              <div
                className={classNames(
                  'flex-auto h-1 rounded-full -mx-4 z-0 transition-colors',
                  isCompleted ? 'bg-teal-200' : 'bg-slate-100'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Steps;
