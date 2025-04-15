import React from 'react';
import { Link } from 'react-router-dom';
const profileImg = 'https://placehold.co/200x200';

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get to know more about my journey, skills, and experience
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
                src={profileImg}
                alt="Profile"
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
              />
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Who Am I?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                I'm a passionate developer with expertise in modern web technologies.
                I love creating beautiful, functional, and user-friendly applications
                that make a difference in people's lives.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                With several years of experience in web development, I've worked on
                various projects ranging from small business websites to complex
                web applications. My focus is on creating clean, efficient, and
                maintainable code while following best practices.
              </p>
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="mt-16 space-y-12">
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Frontend Development', level: 90 },
                  { name: 'Backend Development', level: 85 },
                  { name: 'UI/UX Design', level: 80 },
                  { name: 'Database Management', level: 85 },
                  { name: 'DevOps', level: 75 },
                  { name: 'Project Management', level: 80 },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>
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

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Experience
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Senior Web Developer',
                    company: 'Tech Solutions Inc.',
                    period: '2020 - Present',
                    description: 'Leading development teams and implementing modern web solutions.',
                  },
                  {
                    title: 'Web Developer',
                    company: 'Digital Creations',
                    period: '2018 - 2020',
                    description: 'Developing and maintaining web applications for various clients.',
                  },
                  {
                    title: 'Junior Developer',
                    company: 'Startup Studio',
                    period: '2016 - 2018',
                    description: 'Learning and implementing web development best practices.',
                  },
                ].map((exp) => (
                  <div
                    key={exp.title}
                    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
