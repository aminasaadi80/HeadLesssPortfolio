import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client } from './lib/apollo-client';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes here as you create new components */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/projects" element={<Projects />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
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
