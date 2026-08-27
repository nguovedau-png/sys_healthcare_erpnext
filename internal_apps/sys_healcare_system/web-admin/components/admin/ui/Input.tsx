import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: string;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, fullWidth = true, className = '', ...props }, ref) => {
        return (
            <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
                {label && (
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <i className={`fi flaticon-${icon} absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg`}></i>
                    )}
                    <input
                        ref={ref}
                        className={`
                            ${fullWidth ? 'w-full' : ''} 
                            ${icon ? 'pl-10' : 'px-4'} 
                            py-3 rounded-xl border 
                            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'} 
                            focus:outline-none focus:ring-4 focus:border-primary
                            disabled:bg-gray-100 disabled:text-gray-500
                            transition-all duration-200 ease-in-out
                            placeholder:text-gray-400 text-gray-900 font-medium
                            ${className}
                        `}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
