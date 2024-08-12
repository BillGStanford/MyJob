// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PostJob from './components/PostJob';
import JobDetail from './components/JobDetail';
import BlogPage from './components/BlogPage'; // Import the BlogPage component
import AboutUs from './components/AboutUs'; // Import the About Us component
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/blog" element={<BlogPage />} /> {/* Added route for BlogPage */}
            <Route path="/about-us" element={<AboutUs />} /> {/* Added route for About Us */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
