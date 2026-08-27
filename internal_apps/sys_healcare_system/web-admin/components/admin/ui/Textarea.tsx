import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
        return (
            <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
                {label && (
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
                        ${fullWidth ? 'w-full' : ''} 
                        px-4 py-3 rounded-xl border 
                        ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'} 
                        focus:outline-none focus:ring-4 focus:border-primary
                        disabled:bg-gray-100 disabled:text-gray-500
                        transition-all duration-200 ease-in-out
                        placeholder:text-gray-400 text-gray-900 font-medium
                        min-h-[120px] resize-y
                        ${className}
                    `}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
