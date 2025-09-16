import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const { currentLanguage } = useLanguage();

  // Local translations
  const translations = {
    en: {
      title: '404',
      heading: 'Page Not Found',
      description: "The page you're looking for doesn't exist or has been moved.",
      goHome: 'Go Home',
      viewProjects: 'View Projects'
    },
    fa: {
      title: '۴۰۴',
      heading: 'صفحه پیدا نشد',
      description: 'صفحه مورد نظر شما وجود ندارد یا منتقل شده است.',
      goHome: 'بازگشت به خانه',
      viewProjects: 'مشاهده پروژه‌ها'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">
          {t.title}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          {t.heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
          {t.description}
        </p>
        <div className="mt-6 space-x-4 rtl:space-x-reverse">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            {t.goHome}
          </Link>
          <Link
            to="/projects"
            className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {t.viewProjects}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 