import React from 'react';
import classNames from 'classnames';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

const Title: React.FC<TitleProps> = ({ level = 1, type, children, className, ...rest }) => {
  const Component = `h${level}` as any;
  const sizeClasses = {
    1: 'text-4xl md:text-5xl font-black mb-6 font-heading tracking-tight leading-tight',
    2: 'text-3xl md:text-4xl font-bold mb-5 font-heading tracking-tight leading-tight',
    3: 'text-2xl md:text-3xl font-bold mb-4 font-heading leading-tight',
    4: 'text-xl md:text-2xl font-bold mb-3 font-heading leading-tight',
    5: 'text-lg md:text-xl font-semibold mb-2 font-heading leading-tight',
  };

  const typeClasses = {
    secondary: 'text-muted',
    success: 'text-primary',
    warning: 'text-orange-500',
    danger: 'text-accent',
  };

  return (
    <Component 
      className={classNames(
        type ? typeClasses[type] : 'text-slate-800', 
        sizeClasses[level], 
        className
      )} 
      {...rest}
    >
      {children}
    </Component>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  strong?: boolean;
  italic?: boolean;
}

const Text: React.FC<TextProps> = ({ type, strong, italic, children, className, ...rest }) => {
  const typeClasses = {
    secondary: 'text-muted',
    success: 'text-primary',
    warning: 'text-orange-500',
    danger: 'text-accent',
  };

  return (
    <span
      className={classNames(
        type ? typeClasses[type] : 'text-slate-700',
        strong ? 'font-semibold' : '',
        italic ? 'italic' : '',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

const Paragraph: React.FC<ParagraphProps> = ({ type, children, className, ...rest }) => {
  const typeClasses = {
    secondary: 'text-muted',
    success: 'text-primary',
    warning: 'text-orange-500',
    danger: 'text-accent',
  };

  return (
    <p
      className={classNames(
        'mb-4 leading-relaxed',
        type ? typeClasses[type] : 'text-slate-700',
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export { Title, Text, Paragraph };
export const Typography = { Title, Text, Paragraph };
