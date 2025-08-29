import React from 'react';
import { cn } from '../../lib/utils';

interface TechBadgeProps {
  name: string;
  className?: string;
}

// Color mapping for popular technologies
const techColors: Record<string, string> = {
  // Frontend
  'react': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  'vue': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'angular': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  'svelte': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  'next.js': 'bg-gray-900/10 text-gray-900 dark:text-gray-100 border-gray-500/20',
  'nextjs': 'bg-gray-900/10 text-gray-900 dark:text-gray-100 border-gray-500/20',
  
  // Styling
  'tailwind': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  'tailwindcss': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  'sass': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  'css': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  
  // Backend
  'node': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'node.js': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'nodejs': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'express': 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
  'django': 'bg-green-700/10 text-green-700 dark:text-green-300 border-green-700/20',
  'flask': 'bg-gray-700/10 text-gray-700 dark:text-gray-300 border-gray-700/20',
  'laravel': 'bg-red-600/10 text-red-600 dark:text-red-400 border-red-600/20',
  
  // Languages
  'javascript': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  'typescript': 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20',
  'python': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'java': 'bg-orange-600/10 text-orange-600 dark:text-orange-400 border-orange-600/20',
  'php': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  'c#': 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border-purple-600/20',
  'go': 'bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-600/20',
  'rust': 'bg-orange-700/10 text-orange-700 dark:text-orange-300 border-orange-700/20',
  
  // Databases
  'mongodb': 'bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20',
  'mysql': 'bg-blue-700/10 text-blue-700 dark:text-blue-300 border-blue-700/20',
  'postgresql': 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20',
  'redis': 'bg-red-600/10 text-red-600 dark:text-red-400 border-red-600/20',
  'firebase': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  
  // Tools & Others
  'docker': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'kubernetes': 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20',
  'aws': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  'graphql': 'bg-pink-600/10 text-pink-600 dark:text-pink-400 border-pink-600/20',
  'git': 'bg-orange-600/10 text-orange-600 dark:text-orange-400 border-orange-600/20',
  'figma': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'wordpress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const TechBadge: React.FC<TechBadgeProps> = ({ name, className }) => {
  const normalizedName = name.toLowerCase();
  const colorClass = techColors[normalizedName] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600';
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass,
        className
      )}
    >
      {name}
    </span>
  );
};

export default TechBadge;