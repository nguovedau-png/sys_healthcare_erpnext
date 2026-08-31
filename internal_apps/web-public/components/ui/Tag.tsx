import React from 'react';
import classNames from 'classnames';

export interface TagProps {
  children?: React.ReactNode;
  color?: string;
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Tag: React.FC<TagProps> = ({ children, color = 'default', bordered = true, className, style }) => {
  const colorMap: Record<string, string> = {
    default: 'bg-slate-100 text-slate-600 border-slate-200',
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-slate-100 text-slate-600 border-slate-200',
    blue: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-primary/10 text-primary border-primary/20',
    processing: 'bg-blue-50 text-blue-600 border-blue-200',
    error: 'bg-accent/10 text-accent border-accent/20',
    warning: 'bg-amber-50 text-amber-600 border-amber-200',
    teal: 'bg-primary/10 text-primary border-primary/20',
  };

  const isPreset = Object.keys(colorMap).includes(color);
  
  const customStyle = isPreset ? style : { ...style, backgroundColor: color, color: '#fff', borderColor: color };
  const baseClass = isPreset ? colorMap[color] : '';

  return (
    <span
      className={classNames(
        'inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200',
        bordered ? 'border' : 'border-none',
        baseClass,
        className
      )}
      style={customStyle}
    >
      {children}
    </span>
  );
};

export default Tag;
