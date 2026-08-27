import React from 'react';
import classNames from 'classnames';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  cover?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  bordered = true,
  hoverable = false,
  cover,
  className,
  bodyStyle,
  headStyle,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        'bg-surface rounded-lg flex flex-col',
        bordered ? 'border border-border shadow-soft' : '',
        hoverable ? 'transition-all duration-300 hover:shadow-premium hover:-translate-y-1 cursor-pointer' : '',
        className
      )}
      {...rest}
    >
      {cover && <div className="rounded-t-2xl overflow-hidden">{cover}</div>}
      {(title || extra) && (
        <div
          className={classNames(
            'px-6 py-5 flex items-center justify-between',
            bordered ? 'border-b border-border' : ''
          )}
          style={headStyle}
        >
          {title && <div className="font-bold text-xl text-slate-900 font-heading">{title}</div>}
          {extra && <div className="text-sm">{extra}</div>}
        </div>
      )}
      <div className="px-6 py-5 flex-1" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Card;
