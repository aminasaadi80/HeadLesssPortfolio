import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, isRTL } from '../i18n/i18n';

const LanguageSwitcherIcon: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set document direction based on current language
    document.documentElement.dir = isRTL(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // Update document direction
    document.documentElement.dir = isRTL(languageCode) ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="language-switcher-container relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {/* Globe Icon */}
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
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
        
        {/* Current Language Badge */}
        <span className="absolute -top-1 -end-1 flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full z-10 uppercase">
          {currentLanguage?.code === 'fa' ? 'FA' : 'EN'}
        </span>
      </button>

      {/* Language Options Dropdown */}
      <div
        className={`absolute top-full mt-2 end-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ${
          isOpen 
            ? 'opacity-100 scale-100 visible z-50' 
            : 'opacity-0 scale-95 invisible z-0'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`relative flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              i18n.language === lang.code 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="flex items-center">
              <span className="font-medium">{lang.name}</span>
            </span>
            <span className={`ms-3 text-xs font-bold uppercase px-1.5 py-0.5 rounded ${
              i18n.language === lang.code
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
            }`}>
              {lang.code === 'fa' ? 'FA' : 'EN'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcherIcon;