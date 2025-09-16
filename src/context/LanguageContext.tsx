import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  currentLanguage: string;
  isRtl: boolean;
  changeLanguage: (languageCode: string) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple RTL language check
const isRTL = (language: string): boolean => {
  return language === 'fa' || language === 'ar' || language === 'he';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get saved language from localStorage, fallback to Farsi
    const saved = localStorage.getItem('selectedLanguage');
    if (saved && ['en', 'fa'].includes(saved)) {
      return saved;
    }
    return 'fa'; // Default to Farsi
  });

  const isRtl = isRTL(currentLanguage);

  // Update document direction when language changes
  useEffect(() => {
    updateDocumentDirection(currentLanguage);
    // Save to localStorage
    localStorage.setItem('selectedLanguage', currentLanguage);
  }, [currentLanguage]);

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
      setCurrentLanguage(languageCode);
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