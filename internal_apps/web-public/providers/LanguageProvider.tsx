'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'vi' | 'en';

interface LanguageContextType {
    locale: Locale;
    switchLanguage: (lang: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations loader (in a real app, use next-i18next or similar)
import vi from '../locales/vi.json';
import en from '../locales/en.json';

const translations: Record<Locale, any> = { vi, en };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>('vi');

    useEffect(() => {
        const saved = localStorage.getItem('app_locale') as Locale;
        if (saved && (saved === 'vi' || saved === 'en')) {
            setLocale(saved);
        }
    }, []);

    const switchLanguage = (lang: Locale) => {
        setLocale(lang);
        localStorage.setItem('app_locale', lang);
    };

    const t = (path: string) => {
        const keys = path.split('.');
        let current = translations[locale];

        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }

        return typeof current === 'string' ? current : path;
    };

    return (
        <LanguageContext.Provider value={{ locale, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
