import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import '../css/style.css';
import '../css/responsive.css';

export default function PostDetails() {
  const { id } = useParams();  // Extracts the 'id' from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post details based on the 'id'
    axios.get(`http://localhost:8000/api/posts/${id}/`)
      .then(response => {
        setPost(response.data);  // Store the post data in the state
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [id]);  // The effect will re-run when 'id' changes

  if (!post) {
    return <div>Loading...</div>;  // Show loading state while data is being fetched
  }

  return (
    <>
      <Nav />
      <div className="section">
        <div className="container">
          <div className="post-details container">
            {/* Main Content */}
            <div className="main-content">
              <h1 className="section-title">{post.title}</h1>
              <p className="post-date">Published on {new Date(post.created_at).toLocaleDateString()}</p>
              <img src={`${post.image}`} alt="Post" className="post-image" />
              <div className="post-content">
                <p>{post.content}</p>

                {/* Sidebar with Author Section */}
                <div className="sidebar">
                  <div className="sidebar-section1">
                    <h3 className="sidebar-title">About the Author</h3>
                    <p className="sidebar-content">
                      <strong>{post.author}</strong> is the author of this post.
                    </p>
                  </div>
                  <div className="sidebar-section">
                    <h3 className="sidebar-title">Subscribe to Newsletter</h3>
                    <a href="#" className="sidebar-btn">Subscribe</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
