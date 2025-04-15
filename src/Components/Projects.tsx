import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample project data - replace with your actual data
const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of project 1',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+1',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: '/projects/1'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'A brief description of project 2',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+2',
    tags: ['Node.js', 'Express', 'MongoDB'],
    link: '/projects/2'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'A brief description of project 3',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+3',
    tags: ['Python', 'Django', 'PostgreSQL'],
    link: '/projects/3'
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'A brief description of project 4',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+4',
    tags: ['Vue', 'Nuxt', 'Firebase'],
    link: '/projects/4'
  },
  {
    id: 5,
    title: 'Project 5',
    description: 'A brief description of project 5',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+5',
    tags: ['React Native', 'Expo', 'Redux'],
    link: '/projects/5'
  },
  {
    id: 6,
    title: 'Project 6',
    description: 'A brief description of project 6',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Project+6',
    tags: ['Next.js', 'GraphQL', 'Prisma'],
    link: '/projects/6'
  }
];

const ITEMS_PER_PAGE = 3;

function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A collection of my recent work and projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={project.link}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              } border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
