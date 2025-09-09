import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ABOUT_FIELDS } from '../graphql/queries';
import { Skeleton } from "../Components/ui/skeleton";
import { stripHtml } from './StripHtml';
import { useLanguage } from '../context/LanguageContext';

interface AboutData {
  page: {
    about: {
      title: string;
      enTitle?: string;
      subtitle: string;
      enSubtitle?: string;
      about: {
        img: {
          node: {
            sourceUrl: string;
            altText: string;
          };
        };
        title: string;
        enTitle?: string;
        desc: string;
        enDesc?: string;
      };
      skills: {
        title: string;
        enTitle?: string;
        items: Array<{
          img: {
            node: {
              sourceUrl: string;
              altText: string;
            };
          };
          title: string;
          enTitle?: string;
          proficiency: number;
        }>;
      };
      experience: {
        title: string;
        enTitle?: string;
        items: Array<{
          title: string;
          enTitle?: string;
          subtitle: string;
          enSubtitle?: string;
          desc: string;
          enDesc?: string;
        }>;
      };
      button: {
        title: string;
        url: string;
        target: string;
      };
      enButton?: {
        title: string;
        url: string;
        target: string;
      };
    };
  };
}

function About() {
  const { currentLanguage } = useLanguage();
  const { loading, error, data } = useQuery<AboutData>(GET_ABOUT_FIELDS);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Skeleton className="w-64 h-64 rounded-full mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Skills & Experience Skeleton */}
          <div className="mt-16 space-y-12">
            <div>
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-2 w-full mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Error loading about data: {error.message}</p>
    </div>
  );

  const aboutData = data?.page?.about;
  if (!aboutData) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">About data structure is incorrect</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {currentLanguage === 'en' ? (aboutData.enTitle || aboutData.title) : aboutData.title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {currentLanguage === 'en' ? (aboutData.enSubtitle || aboutData.subtitle) : aboutData.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={aboutData.about.img?.node?.sourceUrl || 'https://placehold.co/200x200'}
                alt={aboutData.about.img?.node?.altText || 'Profile'}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
              />
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentLanguage === 'en' ? (aboutData.about.enTitle || aboutData.about.title) : aboutData.about.title}
              </h2>
              <div className="text-gray-600 dark:text-gray-400 space-y-4">
                {stripHtml(currentLanguage === 'en' ? (aboutData.about.enDesc || aboutData.about.desc) : aboutData.about.desc)}
              </div>
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="mt-16 space-y-12">
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentLanguage === 'en' ? (aboutData.skills.enTitle || aboutData.skills.title) : aboutData.skills.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutData.skills.items.map((skill) => {
                  const skillTitle = currentLanguage === 'en' ? (skill.enTitle || skill.title) : skill.title;
                  return (
                    <div
                      key={skillTitle}
                      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center mb-4">
                        {skill.img?.node && (
                          <img
                            src={skill.img.node.sourceUrl}
                            alt={skill.img.node.altText || skillTitle}
                            className="w-8 h-8 mr-3"
                          />
                        )}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {skillTitle}
                        </h3>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {skill.proficiency}% proficiency
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentLanguage === 'en' ? (aboutData.experience.enTitle || aboutData.experience.title) : aboutData.experience.title}
              </h3>
              <div className="space-y-6">
                {aboutData.experience.items.map((exp) => {
                  const expTitle = currentLanguage === 'en' ? (exp.enTitle || exp.title) : exp.title;
                  const expSubtitle = currentLanguage === 'en' ? (exp.enSubtitle || exp.subtitle) : exp.subtitle;
                  const expDesc = currentLanguage === 'en' ? (exp.enDesc || exp.desc) : exp.desc;
                  
                  return (
                    <div
                      key={expTitle}
                      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {expTitle}
                      </h4>
                      <p className="text-indigo-600 dark:text-indigo-400">
                        {expSubtitle}
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {stripHtml(expDesc)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link
              to={aboutData.button.url}
              target={aboutData.button.target}
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              {currentLanguage === 'en' ? (aboutData.enButton?.title || aboutData.button.title) : aboutData.button.title}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
