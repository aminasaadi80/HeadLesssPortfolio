import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client } from './lib/apollo-client';
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Add more routes here as you create new components */}
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/projects" element={<Projects />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
