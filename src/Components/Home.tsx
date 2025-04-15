import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of the first project',
    image: 'https://placehold.co/600x400',
    link: '#'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of the second project',
    image: 'https://placehold.co/600x400',
    link: '#'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of the third project',
    image: 'https://placehold.co/600x400',
    link: '#'
  }
];

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Hi, I'm <span className="text-yellow-300">Amin Asaadi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              A passionate developer crafting digital experiences that make an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition duration-300 scroll-smooth"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Slider Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
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
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <img
                src="https://placehold.co/200x200"
                alt="Profile Photo"
                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-blue-100 shadow-lg"
              />
            </div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-gray-600 mb-8">
              I'm a passionate developer with expertise in creating modern web applications.
              My focus is on delivering high-quality, user-friendly solutions that make a difference.
            </p>
            <Link
              to="/about"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
