import { useLanguage } from '../context/LanguageContext';

/**
 * Helper function to get the correct language field based on current language
 * @param data - The data object containing multilingual fields
 * @param fieldName - The base field name without language suffix
 * @param language - Optional language code, defaults to current language
 * @returns The value in the correct language
 */
export const getLocalizedField = (
  data: any,
  fieldName: string,
  language?: string
): any => {
  if (!data) return null;
  
  const lang = language || 'fa'; // Default to Farsi
  const langSuffix = lang === 'fa' ? 'Fa' : 'En';
  const fieldKey = `${fieldName}${langSuffix}`;
  
  return data[fieldKey] || data[fieldName] || '';
};

/**
 * Hook to get localized field helper with current language
 */
export const useLocalizedField = () => {
  const { currentLanguage } = useLanguage();
  
  return (data: any, fieldName: string) => {
    return getLocalizedField(data, fieldName, currentLanguage);
  };
};

/**
 * Transform multilingual content object based on current language
 */
export const transformMultilingualContent = (
  content: any,
  language: string = 'fa'
): any => {
  if (!content) return null;
  
  const langSuffix = language === 'fa' ? 'Fa' : 'En';
  const transformed: any = {};
  
  // Extract all fields for the current language
  Object.keys(content).forEach(key => {
    if (key.endsWith(langSuffix)) {
      const baseKey = key.slice(0, -2); // Remove language suffix
      transformed[baseKey] = content[key];
    } else if (!key.endsWith('En') && !key.endsWith('Fa')) {
      // Keep non-multilingual fields as is
      transformed[key] = content[key];
    }
  });
  
  return transformed;
};

/**
 * Hook to transform multilingual content with current language
 */
export const useMultilingualTransform = () => {
  const { currentLanguage } = useLanguage();
  
  return (content: any) => {
    return transformMultilingualContent(content, currentLanguage);
  };
};