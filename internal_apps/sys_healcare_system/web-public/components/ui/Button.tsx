import React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
  htmlType?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger';
  size?: 'large' | 'middle' | 'small';
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  shape?: 'circle' | 'round';
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  htmlType,
  variant = 'default',
  size = 'middle',
  block = false,
  loading = false,
  icon,
  shape,
  className,
  disabled,
  ...rest
}) => {
  const nativeType = htmlType || type || 'button';
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark border border-transparent shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
    default: 'bg-surface text-slate-700 border border-border hover:text-primary hover:border-primary shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
    dashed: 'bg-surface text-slate-700 border border-dashed border-border hover:text-primary hover:border-primary',
    text: 'bg-transparent text-slate-700 hover:bg-slate-50',
    link: 'bg-transparent text-primary hover:text-primary-dark underline-offset-4 hover:underline',
    danger: 'bg-accent text-white hover:bg-red-600 border border-transparent shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
  };

  const sizeClasses = {
    small: shape === 'circle' ? 'w-8 h-8 text-sm' : 'h-8 px-3 text-sm',
    middle: shape === 'circle' ? 'w-10 h-10 text-sm' : 'h-10 px-4 text-sm',
    large: shape === 'circle' ? 'w-12 h-12 text-base' : 'h-12 px-6 text-base',
  };

  const shapeClasses = {
    circle: 'rounded-full p-0',
    round: 'rounded-full',
  };

  const defaultRounded = 'rounded-lg';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const blockClasses = block ? 'w-full' : '';

  return (
    <button
      type={nativeType}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        shape ? shapeClasses[shape] : defaultRounded,
        blockClasses,
        (disabled || loading) && disabledClasses,
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className={classNames("animate-spin h-4 w-4 text-current", children ? "-ml-1 mr-2" : "")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className={classNames("flex items-center", children ? "mr-2" : "")}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
