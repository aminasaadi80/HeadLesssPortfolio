import React from 'react';
import {useLanguage} from "../context/LanguageContext.tsx";

function Loading() {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'fa';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center">
        {/* Multiple spinning rings */}
        <div className="relative w-32 h-32">
          {/* Outer ring - slow spin */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
          <div className="absolute inset-0 w-32 h-32 border-4 border-indigo-500 dark:border-indigo-400 border-t-transparent rounded-full animate-spin" 
               style={{ animationDuration: '2s' }}></div>
          
          {/* Middle ring - medium spin */}
          <div className="absolute inset-2 w-28 h-28 border-3 border-purple-300 dark:border-purple-700 rounded-full"></div>
          <div className="absolute inset-2 w-28 h-28 border-3 border-purple-500 dark:border-purple-400 border-e-transparent rounded-full animate-spin" 
               style={{ 
                 animationDuration: '1.5s',
                 animationDirection: isRTL ? 'reverse' : 'normal'
               }}></div>
          
          {/* Inner ring - fast spin */}
          <div className="absolute inset-4 w-24 h-24 border-2 border-cyan-300 dark:border-cyan-700 rounded-full"></div>
          <div className="absolute inset-4 w-24 h-24 border-2 border-cyan-500 dark:border-cyan-400 border-s-transparent rounded-full animate-spin" 
               style={{ animationDuration: '1s' }}></div>
          
          {/* Center pulsing dot */}
          <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full animate-ping opacity-50"></div>
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-indigo-400 dark:bg-indigo-300 rounded-full animate-pulse"
              style={{
                top: `${20 + Math.sin((i * Math.PI) / 3) * 40}%`,
                [isRTL ? 'right' : 'left']: `${50 + Math.cos((i * Math.PI) / 3) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
        
        {/* Enhanced pulsing dots */}
        <div className="flex space-x-3 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative"
            >
              <div
                className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-full"
                style={{
                  animation: `bounce 1.4s ease-in-out ${i * 0.15}s infinite both`
                }}
              ></div>
              <div
                className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-full opacity-30 animate-ping"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1.4s'
                }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Loading text with gradient */}
        <div className="mt-6">
          <p className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent whitespace-nowrap tracking-wider animate-pulse">
            {currentLanguage === 'en' ? 'Loading...' : '...در حال بارگزاری'}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-full animate-pulse"
               style={{
                 animation: isRTL 
                   ? 'slide-rtl 2s ease-in-out infinite' 
                   : 'slide-ltr 2s ease-in-out infinite'
               }}></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 opacity-30">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-indigo-300 dark:border-indigo-600 rounded-full animate-ping"
              style={{
                animationDelay: `${i * 0.7}s`,
                animationDuration: '3s',
                top: `${-50 - i * 20}px`,
                [isRTL ? 'right' : 'left']: `${-50 - i * 20}px`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Inline styles for custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide-ltr {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes slide-rtl {
            0% { transform: translateX(100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .border-3 {
            border-width: 3px;
          }
        `
      }} />
    </div>
  );
}

export default Loading;