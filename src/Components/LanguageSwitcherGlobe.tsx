import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcherGlobe: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  const isFarsi = currentLanguage === 'fa';

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
      aria-label="Toggle language"
    >
      {/* Globe Icon */}
      <svg
        className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>

      {/* Overlapping Language Labels */}
      <div className="absolute -top-0.5 rtl:right-auto">
        {/* FA Label - Higher z-index when active */}
        <span 
          className={`absolute transition-all duration-300 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${
            isFarsi 
              ? 'z-20 bg-indigo-600 text-white shadow-md scale-100 opacity-100' 
              : 'z-10 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 scale-75 opacity-70 translate-x-2 translate-y-1'
          }`}
        >
          FA
        </span>
        
        {/* EN Label - Higher z-index when active */}
        <span 
          className={`absolute transition-all duration-300 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${
            !isFarsi 
              ? 'z-20 bg-indigo-600 text-white shadow-md scale-100 opacity-100' 
              : 'z-10 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 scale-75 opacity-70 -translate-x-2 translate-y-1'
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
};

export default LanguageSwitcherGlobe;