"use client";
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Input } from './Input';
import moment from 'moment';

interface DatePickerProps {
    label?: string;
    value?: string; // YYYY-MM-DD
    onChange?: (value: string) => void;
    error?: string;
    required?: boolean;
}

export const DatePicker = ({ label, value, onChange, error, required }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial date object or null
    const dateValue = value ? new Date(value) : null;

    const handleDateChange = (date: any) => {
        // Convert Date to YYYY-MM-DD string
        const formatted = moment(date).format('YYYY-MM-DD');
        onChange?.(formatted);
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative mb-4" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)}>
                <Input
                    label={label}
                    value={value ? moment(value).format('DD/MM/YYYY') : ''}
                    readOnly
                    placeholder="DD/MM/YYYY"
                    icon="calendar"
                    required={required}
                    error={error}
                    className="cursor-pointer bg-white"
                />
            </div>

            {isOpen && (
                <div className="absolute z-50 top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-fadeIn">
                    <Calendar
                        onChange={handleDateChange}
                        value={dateValue}
                        className="border-none !w-full !font-sans rounded-lg"
                        tileClassName="rounded-lg hover:bg-blue-50 focus:bg-blue-100 font-medium text-sm p-2"
                        navigationLabel={({ date }) => <span className="font-bold text-gray-800 text-lg">{moment(date).format('MMMM, YYYY')}</span>}
                        nextLabel={<i className="fi flaticon-angle-right text-gray-400"></i>}
                        prevLabel={<i className="fi flaticon-angle-left text-gray-400"></i>}
                    />
                </div>
            )}
        </div>
    );
};
