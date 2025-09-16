import { useQuery } from '@apollo/client';
import { GET_MULTILINGUAL_POSTS } from '../graphql/queries';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  date: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  project?: {
    siteUrl: string;
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface MultilingualPostsData {
  EnPost: {
    nodes: Post[];
  };
  FaPost: {
    nodes: Post[];
  };
}

export const useMultilingualPosts = () => {
  const { data, loading, error, refetch } = useQuery<MultilingualPostsData>(GET_MULTILINGUAL_POSTS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const getPostsByLanguage = (language: 'en' | 'fa'): Post[] => {
    if (!data) return [];
    
    return language === 'en' 
      ? data.EnPost?.nodes || []
      : data.FaPost?.nodes || [];
  };

  const getAllPosts = (): { en: Post[]; fa: Post[] } => {
    return {
      en: data?.EnPost?.nodes || [],
      fa: data?.FaPost?.nodes || [],
    };
  };

  const getPostBySlug = (slug: string, language?: 'en' | 'fa'): Post | undefined => {
    if (!data) return undefined;

    if (language) {
      const posts = getPostsByLanguage(language);
      return posts.find(post => post.slug === slug);
    }

    // Search in both languages if no language specified
    const allPosts = [...(data.EnPost?.nodes || []), ...(data.FaPost?.nodes || [])];
    return allPosts.find(post => post.slug === slug);
  };

  const isEnglishPost = (slug: string): boolean => {
    return slug.startsWith('en-');
  };

  const isFarsiPost = (slug: string): boolean => {
    return !slug.startsWith('en-');
  };

  return {
    data,
    loading,
    error,
    refetch,
    getPostsByLanguage,
    getAllPosts,
    getPostBySlug,
    isEnglishPost,
    isFarsiPost,
    posts: {
      en: data?.EnPost?.nodes || [],
      fa: data?.FaPost?.nodes || [],
    }
  };
};