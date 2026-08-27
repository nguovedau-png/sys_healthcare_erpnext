import React from 'react';
import classNames from 'classnames';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string | React.ReactNode;
  alt?: string;
  size?: 'small' | 'default' | 'large' | number;
  shape?: 'circle' | 'square';
  icon?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'default',
  shape = 'circle',
  icon,
  children,
  className,
  style,
  ...rest
}) => {
  const sizeMap = {
    small: 'w-6 h-6 text-xs',
    default: 'w-8 h-8 text-sm',
    large: 'w-10 h-10 text-base',
  };

  const isNumericSize = typeof size === 'number';
  const sizeClasses = isNumericSize ? '' : sizeMap[size];
  const customStyle = isNumericSize ? { width: size, height: size, fontSize: size / 2, ...style } : style;

  return (
    <span
      className={classNames(
        'relative inline-flex items-center justify-center overflow-hidden bg-primary text-white shadow-soft border-2 border-white',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        sizeClasses,
        className
      )}
      style={customStyle}
      {...rest}
    >
      {src && typeof src === 'string' ? (
        <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover" />
      ) : src ? (
        src
      ) : icon ? (
        icon
      ) : (
        <span className="font-semibold uppercase">{children}</span>
      )}
    </span>
  );
};

export default Avatar;
