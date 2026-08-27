import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    loading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    loading,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyles = "font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-200 focus:ring-blue-100",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 focus:ring-red-100",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-50",
        outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <i className="fi flaticon-spinner animate-spin"></i>}
            {!loading && icon && <i className={`fi flaticon-${icon}`}></i>}
            {children}
        </button>
    );
};
