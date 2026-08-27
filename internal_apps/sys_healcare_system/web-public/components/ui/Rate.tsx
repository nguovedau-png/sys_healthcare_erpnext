import React, { useState } from 'react';
import classNames from 'classnames';

export interface RateProps {
  defaultValue?: number;
  value?: number;
  count?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

const Rate: React.FC<RateProps> = ({
  defaultValue = 0,
  value,
  count = 5,
  onChange,
  className,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const handleClick = (index: number) => {
    if (disabled) return;
    const newValue = index + 1;
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleMouseEnter = (index: number) => {
    if (disabled) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverValue(null);
  };

  return (
    <div
      className={classNames('inline-flex items-center gap-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index < displayValue;
        return (
          <div
            key={index}
            className={classNames(
              'cursor-pointer transition-transform transform',
              disabled ? 'cursor-not-allowed opacity-60' : 'hover:scale-110'
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <svg
              className={classNames(
                'w-[1em] h-[1em]',
                isActive ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'
              )}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default Rate;
