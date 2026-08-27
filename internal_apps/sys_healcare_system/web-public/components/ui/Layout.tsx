import React from 'react';
import classNames from 'classnames';

export const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div className={classNames('min-h-screen flex flex-col', className)} {...rest}>{children}</div>
);

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <header className={classNames('flex-shrink-0', className)} {...rest}>{children}</header>
);

export const Sider: React.FC<React.HTMLAttributes<HTMLDivElement> & { width?: number | string }> = ({ children, className, width = 250, style, ...rest }) => (
  <aside className={classNames('flex-shrink-0 transition-all duration-200', className)} style={{ width, ...style }} {...rest}>{children}</aside>
);

export const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <footer className={classNames('flex-shrink-0', className)} {...rest}>{children}</footer>
);

export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <main className={classNames('flex-1', className)} {...rest}>{children}</main>
);

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number];
}

export const Row: React.FC<RowProps> = ({ children, gutter = 0, className, ...rest }) => {
  const gapX = Array.isArray(gutter) ? gutter[0] : gutter;
  const gapY = Array.isArray(gutter) ? gutter[1] : gutter;
  
  return (
    <div 
      className={classNames('flex flex-wrap', className)} 
      style={{ 
        marginLeft: -(gapX / 2), 
        marginRight: -(gapX / 2),
        rowGap: gapY ? gapY : undefined 
      }}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<any>;
          return React.cloneElement(childElement, { 
            style: { ...childElement.props.style, paddingLeft: gapX / 2, paddingRight: gapX / 2 }
          });
        }
        return child;
      })}
    </div>
  );
};

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const Col: React.FC<ColProps> = ({ children, span, xs, sm, md, lg, xl, className, style, ...rest }) => {
  const getWidthClass = (prefix: string, value?: number) => {
    if (!value) return '';
    return `${prefix ? prefix + ':' : ''}w-[${(value / 24) * 100}%]`; // This won't work with JIT well without safelisting.
  };

  // Better approach using inline styles for dynamic width or standard tailwind classes
  const getStyle = (value?: number) => {
    if (!value) return {};
    return { width: `${(value / 24) * 100}%`, flex: `0 0 ${(value / 24) * 100}%`, maxWidth: `${(value / 24) * 100}%` };
  };

  // For simplicity, we just use inline styles for the layout structure since antd uses 24-col grid.
  // In a real tailwind project, we'd refactor to use flex or grid classes directly.
  const baseStyle = getStyle(span || xs);

  return (
    <div 
      className={classNames('relative w-full', className)} 
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={classNames('h-px w-full bg-slate-200 my-6', className)} {...rest} />
);

export const Space: React.FC<React.HTMLAttributes<HTMLDivElement> & { direction?: 'vertical' | 'horizontal', size?: number | 'small' | 'middle' | 'large' }> = ({ children, direction = 'horizontal', size = 'middle', className, ...rest }) => {
  const gapMap = { small: 'gap-2', middle: 'gap-4', large: 'gap-6' };
  const gapClass = typeof size === 'number' ? '' : gapMap[size];
  
  return (
    <div 
      className={classNames('flex', direction === 'vertical' ? 'flex-col' : 'flex-row items-center', gapClass, className)} 
      style={typeof size === 'number' ? { gap: size } : {}}
      {...rest}
    >
      {children}
    </div>
  );
};
