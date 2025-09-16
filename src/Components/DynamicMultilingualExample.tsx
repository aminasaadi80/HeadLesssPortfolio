import React from 'react';
import { useMultilingualPosts } from '../hooks/useMultilingualPosts';
import MultilingualPostsGrid from './MultilingualPostsGrid';
import { useTranslation } from 'react-i18next';

/**
 * Example component demonstrating how to use the dynamic multilingual post system
 * 
 * This component shows:
 * 1. How to fetch multilingual posts using the useMultilingualPosts hook
 * 2. How to filter posts by language
 * 3. How to display posts with the MultilingualPostsGrid component
 * 4. How to handle loading and error states
 */
function DynamicMultilingualExample() {
  const { t } = useTranslation();
  
  // Example 1: Using the hook directly
  const { 
    loading, 
    error, 
    posts, 
    getPostsByLanguage,
    getPostBySlug,
    isEnglishPost 
  } = useMultilingualPosts();

  // Example 2: Get specific language posts
  const englishPosts = getPostsByLanguage('en');
  const farsiPosts = getPostsByLanguage('fa');

  // Example 3: Find a specific post
  const specificPost = getPostBySlug('en-hyperme');

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-12">
        {/* Example 1: Show all posts with language filter */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            All Posts with Language Filter
          </h2>
          <MultilingualPostsGrid 
            itemsPerPage={6}
            showLanguageFilter={true}
            className="space-y-8"
          />
        </section>

        {/* Example 2: Show only English posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            English Posts Only ({englishPosts.length} posts)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Slug: {post.slug}
                </p>
                <p className="text-gray-500 text-xs">
                  Date: {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Example 3: Show only Farsi posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Farsi Posts Only ({farsiPosts.length} posts)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farsiPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Slug: {post.slug}
                </p>
                <p className="text-gray-500 text-xs">
                  Date: {new Date(post.date).toLocaleDateString('fa-IR')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Example 4: Show specific post if found */}
        {specificPost && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Specific Post Example: {specificPost.title}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="flex items-start gap-4">
                {specificPost.featuredImage?.node?.sourceUrl && (
                  <img 
                    src={specificPost.featuredImage.node.sourceUrl}
                    alt={specificPost.title}
                    className="w-32 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-bold text-xl mb-2">{specificPost.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Is English Post: {isEnglishPost(specificPost.slug) ? 'Yes' : 'No'}
                  </p>
                  <p className="text-gray-500">
                    Published: {new Date(specificPost.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Example 5: Statistics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {englishPosts.length}
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-300">English Posts</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {farsiPosts.length}
              </div>
              <div className="text-sm text-green-800 dark:text-green-300">Farsi Posts</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {posts.en.length + posts.fa.length}
              </div>
              <div className="text-sm text-purple-800 dark:text-purple-300">Total Posts</div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {posts.en.length > 0 && posts.fa.length > 0 ? '✓' : '✗'}
              </div>
              <div className="text-sm text-orange-800 dark:text-orange-300">Bilingual</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DynamicMultilingualExample;