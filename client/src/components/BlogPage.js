import React, { useState, useEffect } from 'react';
import './BlogPage.css'; // Import the CSS file for styling

const BlogPage = () => {
  const [postContent, setPostContent] = useState('');
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false); // Manage visibility of the form
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [posts, setPosts] = useState([]); // State to track posts

  useEffect(() => {
    // Load posts from localStorage when the component mounts
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const savePostsToLocalStorage = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  };

  const handlePostContentChange = (e) => setPostContent(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePostClick = () => {
    if (postContent.length > 1500) {
      alert('Post exceeds 1500 characters.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmPost = () => {
    const displayName = username.trim() || 'anonymous';
    const newPost = { username: displayName, content: postContent };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts); // Save posts to localStorage
    setPostContent('');
    setUsername('');
    setShowConfirmation(false);
    setShowForm(false); // Hide the form after posting
  };

  const handleCancelPost = () => setShowConfirmation(false);

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Anonymous Blog</h1>
        <p className="post-count">Results: {posts.length}</p>
      </header>
      <button onClick={() => setShowForm(true)} className="post-something-button">Post Something!</button>
      <div id="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="username">{post.username}</div>
            <div className="post-content">{post.content}</div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="post-form-container">
          <div className="post-form">
            <textarea
              value={postContent}
              onChange={handlePostContentChange}
              rows="5"
              placeholder="Write your post here... (Max 1500 characters)"
            />
            <br />
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username (optional)"
            />
            <br />
            <button onClick={handlePostClick}>Post</button>
          </div>
          {showConfirmation && (
            <div id="confirmation" className="confirmation">
              <p>Are you sure you want to post? Messages cannot be deleted without Admin Contact.</p>
              <button onClick={handleConfirmPost}>Continue</button>
              <button onClick={() => setShowForm(false)}>No</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
