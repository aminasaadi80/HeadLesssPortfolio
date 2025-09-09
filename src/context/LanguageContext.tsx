import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isRTL } from '../i18n/i18n';

type LanguageContextType = {
  currentLanguage: string;
  isRtl: boolean;
  changeLanguage: (languageCode: string) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get saved language from localStorage, fallback to Farsi
    const saved = localStorage.getItem('i18nextLng');
    if (saved && ['en', 'fa'].includes(saved)) {
      return saved;
    }
    return 'fa'; // Default to Farsi
  });

  const isRtl = isRTL(currentLanguage);

  // Initialize i18n language on component mount
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, []);

  // Listen to i18n language changes and update state
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
      updateDocumentDirection(lng);
      // Explicitly save to localStorage
      localStorage.setItem('i18nextLng', lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    // Set initial document direction
    updateDocumentDirection(currentLanguage);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, currentLanguage]);

  const updateDocumentDirection = (language: string) => {
    const dir = isRTL(language) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Update body classes for better RTL support
    if (isRTL(language)) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  };

  const changeLanguage = (languageCode: string) => {
    if (['en', 'fa'].includes(languageCode) && languageCode !== currentLanguage) {
      i18n.changeLanguage(languageCode);
      // State will be updated automatically via the languageChanged event
    }
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'fa' ? 'en' : 'fa';
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        isRtl, 
        changeLanguage, 
        toggleLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};