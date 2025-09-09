import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

interface UseMultilingualContentOptions {
  query: DocumentNode;
  variables?: Record<string, any>;
}

export const useMultilingualContent = ({ query, variables = {} }: UseMultilingualContentOptions) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Add language to variables for GraphQL query
  const enhancedVariables = {
    ...variables,
    language: currentLanguage.toUpperCase(), // WordPress typically uses uppercase language codes
  };
  
  const result = useQuery(query, {
    variables: enhancedVariables,
    // Refetch when language changes
    fetchPolicy: 'cache-and-network',
  });
  
  return {
    ...result,
    currentLanguage,
  };
};

// Helper function to get localized field
export const getLocalizedField = (data: any, fieldPath: string, language: string) => {
  const keys = fieldPath.split('.');
  let value = data;
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      // Check if there's a language-specific field
      const langKey = `${key}_${language}`;
      value = value[langKey] || value[key];
    } else {
      return null;
    }
  }
  
  return value;
};