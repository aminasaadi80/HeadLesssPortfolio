import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_FIELDS } from '../graphql/queries';
import { Skeleton } from "../Components/ui/skeleton";
import { stripHtml } from './StripHtml';
import { useLanguage } from '../context/LanguageContext';

interface ContactData {
  page: {
    contact: {
      title: string;
      enTitle?: string;
      subtitle: string;
      enSubtitle?: string;
      info: {
        title: string;
        enTitle?: string;
        subtitle: string;
        enSubtitle?: string;
        email: string;
        phone: string;
        address: string;
        enAddress?: string;
      };
      social: {
        title: string;
        enTitle?: string;
        items: Array<{
          logo: {
            node: {
              sourceUrl: string;
              altText: string;
            };
          };
          link: {
            title: string;
            url: string;
            target: string;
          };
          enLink?: {
            title: string;
            url: string;
            target: string;
          };
        }>;
      };
      location: {
        title: string;
        enTitle?: string;
        desc: string;
        enDesc?: string;
        map: string;
        enMap?: string;
      };
    };
  };
}

function Contact() {
  const { loading, error, data } = useQuery<ContactData>(GET_CONTACT_FIELDS);
  const { currentLanguage } = useLanguage();

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </section>

      {/* Contact Information Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-64 mb-8" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-8" />
              <Skeleton className="aspect-w-16 aspect-h-9 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Error loading contact data: {error.message}</p>
    </div>
  );

  const contactData = data?.page?.contact;
  if (!contactData) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Contact data structure is incorrect</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {currentLanguage === 'en' ? (contactData.enTitle || contactData.title) : contactData.title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {currentLanguage === 'en' ? (contactData.enSubtitle || contactData.subtitle) : contactData.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentLanguage === 'en' ? (contactData.info.enTitle || contactData.info.title) : contactData.info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? (contactData.info.enSubtitle || contactData.info.subtitle) : contactData.info.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentLanguage === 'en' ? 'Email' : 'ایمیل'}
                    </h4>
                    <a href={`mailto:${contactData.info.email}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                      {contactData.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentLanguage === 'en' ? 'Phone' : 'شماره تماس'}
                    </h4>
                    <a href={`tel:${contactData.info.phone}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                      {contactData.info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentLanguage === 'en' ? 'Location' : 'موقعیت'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{currentLanguage === 'en' ? (contactData.info.enAddress || contactData.info.address) : contactData.info.address}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {currentLanguage === 'en' ? (contactData.social.enTitle || contactData.social.title) : contactData.social.title}
                </h4>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  {contactData.social.items.map((social, index) => {
                    const linkData = currentLanguage === 'en' ? (social.enLink || social.link) : social.link;
                    return (
                      <a
                        key={index}
                        href={linkData.url}
                        target={linkData.target || "_blank"}
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        title={linkData.title}
                      >
                        <img
                          src={social.logo.node.sourceUrl}
                          alt={social.logo.node.altText || linkData.title}
                          className="w-6 h-6"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentLanguage === 'en' ? (contactData.location.enTitle || contactData.location.title) : contactData.location.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {stripHtml(currentLanguage === 'en' ? (contactData.location.enDesc || contactData.location.desc) : contactData.location.desc)}
              </p>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src={currentLanguage === 'en' ? (contactData.location.enMap || contactData.location.map) : contactData.location.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;