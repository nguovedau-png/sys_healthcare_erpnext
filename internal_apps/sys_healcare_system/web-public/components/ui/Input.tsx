import React, { forwardRef } from 'react';
import classNames from 'classnames';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
}

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, size = 'middle', ...rest }, ref) => {
    return (
      <div className={classNames('relative flex items-center w-full', className)}>
        {prefix && (
          <span className={classNames(
            "absolute flex items-center justify-center text-slate-400",
            size === 'large' ? 'left-4' : 'left-3'
          )}>
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={classNames(
            'w-full rounded-lg border border-border bg-surface text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted/60',
            size === 'large' ? 'h-12 px-4 text-base' : size === 'small' ? 'h-8 px-2 text-sm' : 'h-10 px-3 text-sm',
            prefix ? (size === 'large' ? 'pl-12' : size === 'small' ? 'pl-8' : 'pl-10') : '',
            suffix ? (size === 'large' ? 'pr-12' : size === 'small' ? 'pr-8' : 'pr-10') : '',
            className
          )}
          {...rest}
        />
        {suffix && (
          <span className={classNames(
            "absolute flex items-center justify-center text-slate-400",
            size === 'large' ? 'right-4' : 'right-3'
          )}>
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

(InputComponent as any).displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, onPressEnter, autoSize, onKeyDown, ...rest }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (onPressEnter && e.key === 'Enter' && !e.shiftKey) {
        onPressEnter(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <textarea
        ref={ref}
        onKeyDown={handleKeyDown}
        className={classNames(
          'w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors text-sm',
          className
        )}
        {...rest}
      />
    );
  }
);

(TextArea as any).displayName = 'TextArea';

(InputComponent as any).TextArea = TextArea;

export const Input = InputComponent as typeof InputComponent & {
  TextArea: typeof TextArea;
};

export default Input;
