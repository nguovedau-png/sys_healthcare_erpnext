import React from 'react';
import classNames from 'classnames';

interface LogoProps {
    variant?: 'dark' | 'white';
    className?: string;
    iconClassName?: string;
    textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
    variant = 'dark',
    className,
    iconClassName = "w-10 h-10",
    textClassName = "text-3xl"
}) => {
    const textColor = variant === 'dark' ? 'text-gray-800' : 'text-white';
    const iconColor = variant === 'dark' ? 'text-[#009688]' : 'text-white'; // Teal color or White

    return (
        <div className={classNames("flex items-center gap-2", className)}>
            {/* SVG Icon - Medical Cross/Pulse */}
            <div className={classNames("flex items-center justify-center", iconColor, iconClassName)}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Stylized Cross Base */}
                    <path d="M35 15H65V35H85V65H65V85H35V65H15V35H35V15Z" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Pulse Line */}
                    <path d="M15 50H35L45 25L55 75L65 50H85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Text */}
            <span className={classNames("font-bold tracking-tight", textColor, textClassName)}>
                Healthcare
            </span>
        </div>
    );
};

export default Logo;
