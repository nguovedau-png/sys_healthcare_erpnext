import React from 'react';
import classNames from 'classnames';

export interface RowProps {
  children?: React.ReactNode;
  className?: string;
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

export const Row: React.FC<RowProps> = ({ children, className, gutter = 0, align, justify }) => {
  const gutterX = Array.isArray(gutter) ? gutter[0] : gutter;
  const gutterY = Array.isArray(gutter) ? gutter[1] : 0;

  const style = {
    marginLeft: -gutterX / 2,
    marginRight: -gutterX / 2,
    rowGap: gutterY,
  };

  const alignMap = { top: 'items-start', middle: 'items-center', bottom: 'items-end' };
  const justifyMap = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    'space-around': 'justify-around',
    'space-between': 'justify-between',
  };

  return (
    <div
      className={classNames(
        'flex flex-wrap',
        align ? alignMap[align] : '',
        justify ? justifyMap[justify] : '',
        className
      )}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            style: {
              ...((child.props as any).style || {}),
              paddingLeft: gutterX / 2,
              paddingRight: gutterX / 2,
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export interface ColProps {
  children?: React.ReactNode;
  className?: string;
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  style?: React.CSSProperties;
}

export const Col: React.FC<ColProps> = ({
  children,
  className,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  style,
}) => {
  const createClass = (breakpoint: string, value?: number) => {
    if (!value) return '';
    const prefix = breakpoint ? `${breakpoint}:` : '';
    return `${prefix}w-[${(value / 24) * 100}%]`; // Uses standard Tailwind classes if precompiled, otherwise fallback to style
  };

  // As a workaround since dynamic tailwind width might not compile in time, we'll use inline styles for the width
  const baseWidth = span ? `${(span / 24) * 100}%` : '100%';

  return (
    <div
      className={classNames('max-w-full', className)}
      style={{ ...style, flex: `0 0 ${baseWidth}`, maxWidth: baseWidth }}
    >
      {children}
    </div>
  );
};

export default { Row, Col };
