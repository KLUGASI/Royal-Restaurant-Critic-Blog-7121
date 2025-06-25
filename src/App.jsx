import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Reviews from './pages/Reviews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;