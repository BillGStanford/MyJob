// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo"><Link to="/">MyJobBoard</Link></h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/post-job">Post a Job</Link></li>
            <li className="nav-item"><Link to="/blog">Blog</Link></li>
            <li className="nav-item"><Link to="/about-us">About Us</Link></li> {/* Added About Us link */}
            <li className="nav-item"><a href="https://www.patreon.com/NeedoBots/membership" target="_blank" rel="noopener noreferrer">Donate</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
