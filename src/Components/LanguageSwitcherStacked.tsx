import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, isRTL } from '../i18n/i18n';

const LanguageSwitcherStacked: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document direction based on current language
    document.documentElement.dir = isRTL(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLanguageToggle = () => {
    // Toggle between languages
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex].code;
    
    i18n.changeLanguage(nextLanguage);
    document.documentElement.dir = isRTL(nextLanguage) ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLanguage;
  };

  const isFarsi = i18n.language === 'fa';

  return (
    <button
      onClick={handleLanguageToggle}
      className="relative flex items-center justify-center w-16 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle language"
    >
      {/* Globe Icon with animation */}
      <div className="absolute start-1">
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      </div>

      {/* Stacked Language Labels with Z-index effect */}
      <div className="absolute end-1.5 flex items-center">
        {/* FA Label */}
        <span 
          className={`absolute transition-all duration-300 text-xs font-bold px-1.5 py-0.5 rounded ${
            isFarsi 
              ? 'z-20 transform translate-x-0 opacity-100 bg-indigo-600 text-white shadow-lg scale-110' 
              : 'z-10 transform -translate-x-2 rtl:translate-x-2 opacity-60 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 scale-90'
          }`}
        >
          FA
        </span>
        
        {/* EN Label */}
        <span 
          className={`absolute transition-all duration-300 text-xs font-bold px-1.5 py-0.5 rounded ${
            !isFarsi 
              ? 'z-20 transform translate-x-0 opacity-100 bg-indigo-600 text-white shadow-lg scale-110' 
              : 'z-10 transform translate-x-2 rtl:-translate-x-2 opacity-60 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 scale-90'
          }`}
        >
          EN
        </span>
      </div>

      {/* Hover effect ripple */}
      <div className="absolute inset-0 rounded-full bg-indigo-600 dark:bg-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};

export default LanguageSwitcherStacked;