import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css'; // Import CSS for styling

const jobTypes = [
  'Web Design',
  'Restaurant/Hospitality Worker',
  'Graphic Designers',
  'Video Editors',
  'Film Producers',
  'Video Script Writers',
  'Other'
];

const salaryUnits = [
  'Per Hour',
  'Annual',
  'Monthly'
];

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryUnit, setSalaryUnit] = useState(salaryUnits[0]);
  const [currency, setCurrency] = useState('USD');
  const [customCurrency, setCustomCurrency] = useState('');
  const [googleForm, setGoogleForm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Add phone state
  const [image, setImage] = useState(null);
  const [jobType, setJobType] = useState(jobTypes[0]);
  const [descriptionError, setDescriptionError] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length < 100) {
      setDescriptionError('Description must be at least 100 characters long.');
    } else {
      setDescriptionError('');
    }
    if (value.length <= 200) {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !salary || !googleForm) {
      alert('Please fill out all required fields.');
      return;
    }

    if (description.length < 100) {
      setDescriptionError('Description must be at least 100 characters long.');
      return;
    }

    const newJob = {
      title,
      description,
      salary,
      salaryUnit,
      currencySymbol: currency === 'Other' ? customCurrency : '$',
      googleForm,
      email,
      phone, // Include phone number
      image: image ? URL.createObjectURL(image) : null, // Convert image file to URL
      jobType
    };

    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    existingJobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(existingJobs));

    navigate('/');
  };

  return (
    <div className="post-job-container">
      <h1>POST A JOB</h1>
      <form onSubmit={handleSubmit} className="post-job-form">
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={30}
          />
          <small>{title.length}/30 characters</small>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={200}
          />
          <small>{description.length}/200 characters</small>
          {descriptionError && <p className="error-message">{descriptionError}</p>}
        </div>
        <div className="form-group salary-container">
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <select value={salaryUnit} onChange={(e) => setSalaryUnit(e.target.value)}>
            {salaryUnits.map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))}
          </select>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">U.S. Dollar</option>
            <option value="Other">Other</option>
          </select>
          {currency === 'Other' && (
            <input
              type="text"
              value={customCurrency}
              onChange={(e) => setCustomCurrency(e.target.value)}
              placeholder="Enter currency symbol or acronym"
            />
          )}
        </div>
        <div className="form-group">
          <label>Google Form Link:</label>
          <input
            type="url"
            value={googleForm}
            onChange={(e) => setGoogleForm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number (optional):</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label>Thumbnail Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label>Job Type:</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostJob;
