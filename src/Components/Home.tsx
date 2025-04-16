import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import { Skeleton } from "../Components/ui/skeleton";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { stripHtml } from './StripHtml';
const profileImg = 'https://placehold.co/200x200';


// Sample skills data
const skills = [
  { name: 'React', level: 90, icon: '⚛️' },
  { name: 'TypeScript', level: 85, icon: '📘' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'GraphQL', level: 75, icon: '📊' },
  { name: 'Tailwind CSS', level: 90, icon: '🎨' },
  { name: 'Docker', level: 70, icon: '🐳' }
];

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            I'm a passionate developer creating amazing web experiences
          </p>
          <button
            onClick={scrollToProjects}
            className="inline-block bg-white text-indigo-600 dark:bg-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            My Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{skill.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}% proficiency
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
            Featured Projects
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
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                    <Skeleton className="w-full h-48" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : error ? (
              // Error state
              <div className="text-center text-red-500 dark:text-red-400">
                Error loading projects: {error.message}
              </div>
            ) : (
              // Projects data
              data?.posts?.nodes?.map((project: any) => {
               return (
               <SwiperSlide key={project.id}>
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                    <img
                      src={project.featuredImage?.node?.sourceUrl || 'https://placehold.co/600x400'}
                      alt={project.title}
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
              )})
            )}
          </Swiper>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <img
                src={profileImg}
                alt="Profile"
                className="w-64 h-64 rounded-full object-cover mx-auto shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I'm a passionate developer with expertise in modern web technologies.
                I love creating beautiful, functional, and user-friendly applications.
              </p>
              <Link
                to="/about"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
