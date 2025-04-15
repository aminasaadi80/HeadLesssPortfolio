import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 border-4 border-indigo-500/20 dark:border-indigo-400/20 rounded-full"></div>
        
        {/* Animated ring */}
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-indigo-500 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>
        
        {/* Pulsing dots */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 tracking-wider">LOADING</p>
        </div>
      </div>
    </div>
  );
}

export default Loading; 