import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobList = () => {
  const { jobType } = useParams(); // Get job type from URL
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  }, []);

  useEffect(() => {
    if (jobType) {
      setFilteredJobs(jobs.filter(job =>
        job.jobType.toLowerCase().replace(/\s+/g, '-') === jobType
      ));
    }
  }, [jobType, jobs]);

  return (
    <div>
      <h1>{jobType.replace('-', ' ').toUpperCase()} Jobs</h1>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-post">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>Salary: ${job.salary} {job.salaryUnit}</p>
            </div>
          ))
        ) : (
          <p>No jobs available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
