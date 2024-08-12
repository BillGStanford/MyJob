import React from 'react';
import { useLocation } from 'react-router-dom';
import './JobDetail.css'; // Optional: import CSS file for styling

const JobDetail = () => {
  const { state } = useLocation();
  const { job } = state || {};

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div className="job-detail-container">
      <div className="job-detail-content">
        <div className="job-detail-text">
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <p>Salary: ${job.salary} {job.salaryUnit}</p>
          <div className="apply-info">
            <h2>Submit Application Here</h2>
            <a href={job.googleForm} target="_blank" rel="noopener noreferrer">Apply Here</a>
            {job.email && <p>Contact Email: <a href={`mailto:${job.email}`}>{job.email}</a></p>}
            {job.phone && <p>Contact Phone: {job.phone}</p>} {/* Display phone number if available */}
          </div>
        </div>
        {job.image && (
          <div className="job-detail-image">
            <img src={job.image} alt="Job Thumbnail" />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
