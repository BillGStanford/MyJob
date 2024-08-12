// src/components/AboutUs.js

import React from 'react';
import './AboutUs.css'; // Import CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>We are a passionate team dedicated to making job searches easier and more effective.</p>
      </header>
      <section className="about-us-content">
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="path/to/team-member1.jpg" alt="Team Member 1" />
              <h3>Jane Doe</h3>
              <p>Co-founder & CEO</p>
              <p>Jane is the visionary behind our platform, leading the team with passion and dedication.</p>
            </div>
            <div className="team-member">
              <img src="path/to/team-member2.jpg" alt="Team Member 2" />
              <h3>John Smith</h3>
              <p>Co-founder & CTO</p>
              <p>John brings technical expertise and innovation, ensuring our platform runs smoothly.</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>Our mission is to connect job seekers with their dream jobs and help employers find the best talent. We strive to provide a user-friendly and efficient platform for all job-related needs.</p>
        </div>
        <div className="contact-section">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out to us at <a href="mailto:contact@ourcompany.com">contact@ourcompany.com</a>.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
