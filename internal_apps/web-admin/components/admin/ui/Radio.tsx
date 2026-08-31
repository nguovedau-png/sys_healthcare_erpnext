import React from 'react';

interface RadioOption {
    label: string;
    value: string;
    description?: string;
}

interface RadioGroupProps {
    label?: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    error?: string;
    direction?: 'row' | 'column';
}

export const RadioGroup = ({
    label,
    options,
    value,
    onChange,
    name,
    error,
    direction = 'column'
}: RadioGroupProps) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-bold text-gray-700 mb-3">
                    {label}
                </label>
            )}
            <div className={`flex ${direction === 'row' ? 'gap-6 flex-wrap' : 'flex-col gap-3'}`}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`
                            relative flex items-start cursor-pointer p-3 rounded-xl border transition-all duration-200
                            ${value === option.value
                                ? 'border-primary bg-blue-50/50 ring-1 ring-primary'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }
                        `}
                    >
                        <div className="flex items-center h-5">
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <span className={`font-medium ${value === option.value ? 'text-primary' : 'text-gray-900'}`}>
                                {option.label}
                            </span>
                            {option.description && (
                                <p className="text-gray-500 mt-0.5 text-xs">{option.description}</p>
                            )}
                        </div>
                    </label>
                ))}
            </div>
            {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};
