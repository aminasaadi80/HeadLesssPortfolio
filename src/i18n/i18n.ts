import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import enTranslation from '../locales/en/translation.json';
import faTranslation from '../locales/fa/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  fa: {
    translation: faTranslation
  }
};

// Get saved language from localStorage, fallback to Farsi
const getSavedLanguage = (): string => {
  try {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && ['en', 'fa'].includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('Could not access localStorage:', error);
  }
  return 'fa'; // Default to Farsi if no saved preference
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa', // Fallback to Farsi as default
    lng: getSavedLanguage(), // Use saved language or default to Farsi
    debug: false,
    
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      lookupSessionStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fa', name: 'فارسی', dir: 'rtl' }
];

export const isRTL = (language: string) => {
  return language === 'fa';
};