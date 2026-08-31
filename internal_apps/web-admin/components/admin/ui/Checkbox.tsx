import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    description?: string;
    error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, description, error, className = '', ...props }, ref) => {
        return (
            <div className="mb-4">
                <label className={`flex items-start cursor-pointer group ${className}`}>
                    <div className="flex items-center h-5">
                        <input
                            ref={ref}
                            type="checkbox"
                            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                            {...props}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <span className="font-bold text-gray-700 group-hover:text-primary transition-colors">
                            {label}
                        </span>
                        {description && (
                            <p className="text-gray-500 mt-0.5 text-xs">{description}</p>
                        )}
                    </div>
                </label>
                {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
