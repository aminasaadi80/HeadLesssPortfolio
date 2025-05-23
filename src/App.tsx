import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { client } from './lib/apollo-client';
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Projects from "./Components/Projects";
import SingleProject from "./Components/SingleProject";
import Footer from "./Components/Footer";
import { ThemeProvider } from './context/ThemeContext';
import Loading from './Components/Loading';
import { useEffect, useState } from 'react';
import NotFound from './Components/NotFound';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Component to handle loading state
function RouteChangeHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading ? <Loading /> : null;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <ScrollToTop />
            <RouteChangeHandler />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<SingleProject />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
