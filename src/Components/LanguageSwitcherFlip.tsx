import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, isRTL } from '../i18n/i18n';

const LanguageSwitcherFlip: React.FC = () => {
  const { i18n } = useTranslation();
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Set document direction based on current language
    document.documentElement.dir = isRTL(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLanguageToggle = () => {
    setIsFlipping(true);
    
    // Toggle between languages
    setTimeout(() => {
      const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
      const nextIndex = (currentIndex + 1) % languages.length;
      const nextLanguage = languages[nextIndex].code;
      
      i18n.changeLanguage(nextLanguage);
      document.documentElement.dir = isRTL(nextLanguage) ? 'rtl' : 'ltr';
      document.documentElement.lang = nextLanguage;
    }, 150);

    setTimeout(() => {
      setIsFlipping(false);
    }, 300);
  };

  const isFarsi = i18n.language === 'fa';

  return (
    <button
      onClick={handleLanguageToggle}
      className="relative group"
      aria-label="Toggle language"
    >
      <div className="relative flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 transition-all duration-300 shadow-sm hover:shadow-md">
        
        {/* Globe Icon with pulse animation on hover */}
        <div className="relative">
          <svg
            className={`w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 ${
              isFlipping ? 'animate-spin' : ''
            }`}
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
          
          {/* Pulse effect on hover */}
          <div className="absolute inset-0 rounded-full bg-indigo-600 dark:bg-indigo-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
        </div>

        {/* Language display with 3D flip effect */}
        <div className="relative w-8 h-6 preserve-3d">
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 backface-hidden ${
            isFlipping ? 'rotate-y-180' : ''
          }`}>
            <span className={`text-sm font-bold transition-all duration-300 ${
              isFarsi 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isFarsi ? 'FA' : 'EN'}
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto">
          <span className={`flex h-2 w-2 ${isFarsi ? 'animate-pulse' : ''}`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isFarsi ? 'bg-indigo-400' : 'bg-gray-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isFarsi ? 'bg-indigo-500' : 'bg-gray-500'
            }`}></span>
          </span>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isFarsi ? 'Switch to English' : 'تغییر به فارسی'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
    </button>
  );
};

// Add necessary CSS for 3D transforms
const style = document.createElement('style');
style.textContent = `
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(style);

export default LanguageSwitcherFlip;