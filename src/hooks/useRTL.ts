import { useLanguage } from '../context/LanguageContext';

export const useRTL = () => {
  const { currentLanguage, isRtl } = useLanguage();
  
  // The LanguageContext already handles document direction and body classes
  return { isRtl, currentLanguage };
};