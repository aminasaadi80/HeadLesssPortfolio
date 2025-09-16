import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMultilingualPosts, Post } from '../hooks/useMultilingualPosts';
import { Skeleton } from "./ui/skeleton";
import { stripHtml } from './StripHtml';
import TechBadge from './ui/TechBadge';
import { useTranslation } from 'react-i18next';

interface MultilingualPostsGridProps {
  itemsPerPage?: number;
  showLanguageFilter?: boolean;
  className?: string;
}

function MultilingualPostsGrid({ 
  itemsPerPage = 6, 
  showLanguageFilter = false,
  className = ""
}: MultilingualPostsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'en' | 'fa'>('all');
  const { t, i18n } = useTranslation();
  
  const { 
    loading, 
    error, 
    posts, 
    getPostsByLanguage 
  } = useMultilingualPosts();

  const filteredPosts = useMemo(() => {
    if (languageFilter === 'all') {
      return [...posts.en, ...posts.fa].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return getPostsByLanguage(languageFilter);
  }, [posts, languageFilter, getPostsByLanguage]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageFilter = (lang: 'all' | 'en' | 'fa') => {
    setLanguageFilter(lang);
    setCurrentPage(1);
  };

  if (loading) return (
    <div className={`${className}`}>
      {showLanguageFilter && (
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-20" />
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className={`text-center py-12 ${className}`}>
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
        {t('posts.errorLoading')}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {error.message}
      </p>
    </div>
  );

  return (
    <div className={className}>
      {showLanguageFilter && (
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => handleLanguageFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                languageFilter === 'all'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('common.all')}
            </button>
            <button
              onClick={() => handleLanguageFilter('en')}
              className={`px-4 py-2 rounded-md transition-colors ${
                languageFilter === 'en'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageFilter('fa')}
              className={`px-4 py-2 rounded-md transition-colors ${
                languageFilter === 'fa'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              فارسی
            </button>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentPosts.map((post: Post) => {
          const isEnglish = post.slug.startsWith('en-');
          
          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.featuredImage?.node?.sourceUrl || 'https://placehold.co/600x400'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white line-clamp-2">{post.title}</h3>
                </div>
                {/* Language indicator */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    isEnglish 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {isEnglish ? 'EN' : 'فا'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {stripHtml(post.excerpt)}
                </p>
                {post.categories?.nodes && post.categories.nodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.nodes.slice(0, 3).map((category) => (
                      <TechBadge key={category.slug} name={category.name} />
                    ))}
                    {post.categories.nodes.length > 3 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{post.categories.nodes.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/projects/${post.slug}`}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    {t('projects.viewProject')}
                    <svg
                      className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString(i18n.language === 'fa' ? 'fa-IR' : 'en-US')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('pagination.previous')}
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              } border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('pagination.next')}
          </button>
        </div>
      )}
    </div>
  );
}

export default MultilingualPostsGrid;