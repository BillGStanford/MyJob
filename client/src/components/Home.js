import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const jobTypes = [
  'Web Design',
  'Restaurant/Hospitality Worker',
  'Graphic Designers',
  'Video Editors',
  'Film Producers',
  'Video Script Writers',
  'Other'
];

const validKeys = ['45454', '11111', 'UN777'];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [adminJobId, setAdminJobId] = useState(null);
  const [showOptions, setShowOptions] = useState(null); // State to track which job's options to show

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
    setFilteredJobs(storedJobs);
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.jobType === filter));
    }
  }, [filter, jobs]);

  const handleKeySubmit = (jobId) => {
    if (validKeys.includes(keyInput)) {
      setAdminJobId(jobId);
    } else {
      alert('Invalid key. Please enter a valid key.');
    }
  };

  const handleDeleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job, index) => index !== jobId);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setAdminJobId(null); // Hide admin options after deletion
  };

  const handleOptionsClick = (jobId) => {
    setShowOptions(jobId === showOptions ? null : jobId); // Toggle options visibility
  };

  return (
    <div className="home-container">
      <h1>Job Listings</h1>
      <div className="filter-container">
        <label>Filter by Job Type:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {jobTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-post">
              <div className="job-header">
                <h2>{job.title}</h2>
                <button onClick={() => handleOptionsClick(index)} className="options-button">Options</button>
                {showOptions === index && (
                  <div className="options-dropdown">
                    <input
                      type="text"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="Enter Key:"
                    />
                    <button onClick={() => handleKeySubmit(index)}>Submit Key</button>
                    {adminJobId === index && (
                      <button onClick={() => handleDeleteJob(index)} className="delete-button">Delete Content</button>
                    )}
                  </div>
                )}
              </div>
              <p>{job.description}</p>
              <p>Salary: ${job.salary} {job.salaryUnit}</p>
              <Link to={`/job/${index}`} state={{ job }} className="apply-button">Apply Here</Link>
            </div>
          ))
        ) : (
          <p>No jobs yet!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
