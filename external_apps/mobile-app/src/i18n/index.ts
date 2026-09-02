import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import vi from './vi.json';

const RESOURCES = {
    en: { translation: en },
    vi: { translation: vi },
};

const LANGUAGE_DETECTOR = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lang: string) => void) => {
        try {
            const storedLanguage = await AsyncStorage.getItem('user-language');
            if (storedLanguage) {
                return callback(storedLanguage);
            }
        } catch (error) {
            console.log('Error reading language', error);
        }
        const deviceLanguage = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
        callback(deviceLanguage === 'vi' ? 'vi' : 'en');
    },
    init: () => { },
    cacheUserLanguage: async (language: string) => {
        try {
            await AsyncStorage.setItem('user-language', language);
        } catch (error) { }
    },
};

i18n
    .use(LANGUAGE_DETECTOR)
    .use(initReactI18next)
    .init({
        resources: RESOURCES,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: 'v4'
    });

export default i18n;
