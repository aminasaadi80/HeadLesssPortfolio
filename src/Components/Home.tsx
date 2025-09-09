import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useQuery } from '@apollo/client';
import { GET_HOME_FIELDS } from '../graphql/queries';
import { Skeleton } from "../Components/ui/skeleton";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { stripHtml } from './StripHtml';
import { useLanguage } from '../context/LanguageContext';

interface HomeData {
  page: {
    homeFields: {
      hero: {
        title: string;
        enTitle?: string;
        subtitle: string;
        enSubtitle?: string;
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
      projects: {
        title: string;
        enTitle?: string;
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
        posts: {
          nodes: Array<{
            id: string;
            title: string;
            excerpt: string;
            slug: string;
            featuredImage: {
              node: {
                sourceUrl: string;
                altText: string;
              };
            };
          }>;
        };
      };
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
  };
}

function Home() {
  const { loading, error, data } = useQuery<HomeData>(GET_HOME_FIELDS);
  const { currentLanguage } = useLanguage();

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mx-auto mb-12" />
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
      </section>

      {/* Projects Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <Skeleton className="w-64 h-64 rounded-full mx-auto" />
            </div>
            <div className="w-full md:w-2/3">
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Error loading home data: {error.message}</p>
    </div>
  );

  const homeFields = data?.page?.homeFields;
  if (!homeFields) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">Home data structure is incorrect</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            {currentLanguage === 'en' ? homeFields.hero.enTitle || homeFields.hero.title : homeFields.hero.title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {currentLanguage === 'en' ? homeFields.hero.enSubtitle || homeFields.hero.subtitle : homeFields.hero.subtitle}
          </p>
          <button
            onClick={scrollToProjects}
            className="inline-block bg-white cursor-pointer text-indigo-600 dark:bg-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {currentLanguage === 'en' 
              ? homeFields.hero.enButton?.title || homeFields.hero.button.title 
              : homeFields.hero.button.title}
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {currentLanguage === 'en' ? homeFields.skills.enTitle || homeFields.skills.title : homeFields.skills.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFields.skills.items.map((skill) => (
              <div
                key={skill.title}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  {skill.img?.node && (
                    <img
                      src={skill.img.node.sourceUrl}
                      alt={skill.img.node.altText || skill.title}
                      className="w-8 h-8 mr-3"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? skill.enTitle || skill.title : skill.title}
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
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {currentLanguage === 'en' ? homeFields.projects.enTitle || homeFields.projects.title : homeFields.projects.title}
          </h2>
          <Swiper className='swiper-projects'
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {homeFields.projects.posts.nodes.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={project.featuredImage?.node?.sourceUrl || 'https://placehold.co/600x400'}
                    alt={project.featuredImage?.node?.altText || project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="text-gray-600 h-[50px] max-h-[50px] line-clamp-2 dark:text-gray-400 mb-4">
                      {stripHtml(project.excerpt)}
                    </div>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-center mt-8">
            <Link
              to={homeFields.projects.button.url}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
               {currentLanguage === 'en' 
                 ? homeFields.projects.enButton?.title || homeFields.projects.button.title 
                 : homeFields.projects.button.title}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              {homeFields.about.img?.node && (
                <img
                  src={homeFields.about.img.node.sourceUrl}
                  alt={homeFields.about.img.node.altText || 'Profile'}
                  className="w-64 h-64 rounded-full object-cover mx-auto shadow-lg"
                />
              )}
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {currentLanguage === 'en' ? homeFields.about.enTitle || homeFields.about.title : homeFields.about.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {stripHtml(currentLanguage === 'en' ? homeFields.about.enDesc || homeFields.about.desc : homeFields.about.desc)}
              </p>
              <Link
                to={homeFields.about.button.url}
                target={homeFields.about.button.target}
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                {currentLanguage === 'en' 
                  ? homeFields.about.enButton?.title || homeFields.about.button.title 
                  : homeFields.about.button.title}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
