import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_HEADER, GET_MENUS } from '../graphql/queries';
import { Skeleton } from "../Components/ui/skeleton";
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcherGlobe from './LanguageSwitcherGlobe';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
}

interface MenuData {
  menus: {
    nodes: Array<{
      id: string;
      name: string;
      menuItems: {
        nodes: MenuItem[];
      };
    }>;
  };
}

interface HeaderData {
  headerFooter: {
    header: {
      logo?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
      light_logo?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
      siteName?: string;
      enSiteName?: string;
    };
  };
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentLanguage } = useLanguage();
  
  const { loading: menuLoading, error: menuError, data: menuData } = useQuery<MenuData>(GET_MENUS);
  const { loading: headerLoading, error: headerError, data: headerData } = useQuery<HeaderData>(GET_HEADER);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Loading state
  if (menuLoading || headerLoading) return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="hidden md:flex space-x-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
          <Skeleton className="md:hidden h-6 w-6" />
        </div>
      </div>
    </header>
  );

  // Error state
  if (menuError || headerError) return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/vite.svg" alt="Logo" className="md:h-8 h-6 w-auto object-contain" />
            {/*<span className="text-xl font-bold text-gray-900 dark:text-white">Portfolio</span>*/}
          </div>
          <p className="text-red-500">Error loading menu data</p>
        </div>
      </div>
    </header>
  );

  // Extract data with fallbacks
  // Select menu based on language
  const menus = menuData?.menus?.nodes || [];
  const headerMenu = currentLanguage === 'en' 
    ? menus.find(menu => menu.name === 'EN Header')
    : menus.find(menu => menu.name === 'Header');
  const menuItems = headerMenu?.menuItems?.nodes || [];
  const darkLogo = headerData?.headerFooter?.header?.logo?.node;
  const lightLogo = headerData?.headerFooter?.header?.light_logo?.node;
  const headerLogo = isDarkMode ? darkLogo : lightLogo || darkLogo;

  // Process menu items to handle internal/external links
  const processedMenuItems = menuItems.map((item: MenuItem) => {
    // Convert WordPress URL to React Router path if it's an internal link
    let url = item.url;
    if (url.includes('aminasaadi.ir')) {
      url = url.replace('https://aminasaadi.ir', '');
      if (url === '') url = '/';
    }
    return {
      ...item,
      url
    };
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2">
              {headerLogo ? (
                <img 
                  src={headerLogo.sourceUrl} 
                  alt={headerLogo.altText || 'Logo'} 
                  className="md:h-8 h-6 w-auto object-contain" 
                />
              ) : (
                <img src="/vite.svg" alt="Logo" className="md:h-8 h-6 w-auto object-contain" />
              )}
              {/*<span className="text-xl font-bold text-gray-900 dark:text-white">*/}
              {/*  {siteName}*/}
              {/*</span>*/}
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              {processedMenuItems.map((item: MenuItem) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className="px-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-300 relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <LanguageSwitcherGlobe />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <div className="md:pt-2">
              <LanguageSwitcherGlobe />
            </div>
            <button
              onClick={toggleDarkMode}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-300 relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="py-4 space-y-4">
            {processedMenuItems.map((item: MenuItem) => (
              <Link
                key={item.id}
                to={item.url}
                className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


