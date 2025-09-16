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
                <div className="flex items-center space-x-4">
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

                <div className="flex items-center space-x-4">
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

                <div className="flex items-center space-x-4">
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
                  {currentLanguage === 'en'
                      ? (contactData.social.enTitle || contactData.social.title)
                      : contactData.social.title}
                </h4>

                <div className="flex md:space-x-3 space-x-2">
                  <a
                      href="https://github.com/aminasaadi80"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="md:size-8 size-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                      href="https://wa.me/+989364630330"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="md:size-8 size-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a
                      href="https://t.me/Amin_Asaadi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="md:size-8 size-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.563 8.994l-1.833 8.65c-.144.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.566-4.458c.535-.196 1.006.128.832.941z"/>
                    </svg>
                  </a>
                  <a
                      href="https://www.instagram.com/aminasaadi_m.s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="md:size-8 size-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                      href="https://www.linkedin.com/in/aminasaadi80/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="md:size-8 size-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                </div>
              </div>

              {/* Social Links */}
              {Array.isArray(contactData?.social?.items) && contactData.social.items.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {currentLanguage === 'en'
                          ? (contactData.social.enTitle || contactData.social.title)
                          : contactData.social.title}
                    </h4>

                    <div className="flex md:space-x-4 space-x-3">
                      {contactData.social.items
                          .map((social) => {
                            const linkData =
                                currentLanguage === 'en' ? (social?.enLink || social?.link) : social?.link;
                            if (!linkData?.url) return null; // آیتم بدون لینک را رد کن
                            const imgSrc = social?.logo?.node?.sourceUrl;

                            return (
                                <a
                                    key={linkData.url}
                                    href={linkData.url}
                                    target={linkData.target || '_blank'}
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                    title={linkData.title || ''}
                                >
                                  {imgSrc ? (
                                      <img
                                          src={imgSrc}
                                          alt={social?.logo?.node?.altText || linkData.title || 'social'}
                                          className="md:size-8 size-6"
                                      />
                                  ) : (
                                      <span className="sr-only">{linkData.title || 'social'}</span>
                                  )}
                                </a>
                            );
                          })}
                    </div>
                  </div>
              )}

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