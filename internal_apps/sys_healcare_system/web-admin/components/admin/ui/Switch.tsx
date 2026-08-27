import React from 'react';

interface SwitchProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
    disabled?: boolean;
}

export const Switch = ({ label, checked, onChange, description, disabled = false }: SwitchProps) => {
    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border ${checked ? 'border-primary/20 bg-blue-50/30' : 'border-gray-100 bg-white'} mb-4 transition-colors`}>
            {(label || description) && (
                <div className="mr-8">
                    {label && <span className={`block text-sm font-bold ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</span>}
                    {description && <span className="block text-xs text-gray-500 mt-1">{description}</span>}
                </div>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${checked ? 'bg-primary' : 'bg-gray-200'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <span
                    aria-hidden="true"
                    className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${checked ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    );
};
