"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Props as SelectProps } from 'react-select';

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps extends Omit<SelectProps, 'onChange'> {
    label?: string;
    error?: string;
    options: Option[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    placeholder?: string;
    isMulti?: boolean;
}

export const Select = ({ label, error, options, value, onChange, placeholder = "-- Chọn --", isMulti = false, ...props }: CustomSelectProps) => {

    // Convert string value to object for react-select
    const getValue = () => {
        if (!value) return isMulti ? [] : null;
        if (isMulti && Array.isArray(value)) {
            return options.filter(opt => value.includes(opt.value));
        }
        return options.find(opt => opt.value === value) || null;
    };

    // Handle change: convert object back to string value
    const handleChange = (selected: any) => {
        if (!selected) {
            onChange?.(isMulti ? [] : '');
            return;
        }
        if (isMulti) {
            onChange?.(selected.map((opt: any) => opt.value));
        } else {
            onChange?.(selected.value);
        }
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    {label} {props.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <ReactSelect
                {...props}
                value={getValue()}
                onChange={handleChange}
                options={options}
                isMulti={isMulti}
                placeholder={placeholder}
                classNamePrefix="react-select"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        padding: '4px',
                        borderRadius: '0.75rem', // rounded-xl
                        borderColor: error ? '#ef4444' : '#d1d5db',
                        boxShadow: state.isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none',
                        '&:hover': {
                            borderColor: '#3b82f6'
                        }
                    }),
                    menu: (base) => ({
                        ...base,
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        zIndex: 9999,
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
                        color: state.isSelected ? 'white' : '#1f2937',
                        cursor: 'pointer',
                        padding: '10px 16px',
                        fontWeight: 500,
                    })
                }}
            />
            {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};
