
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';  // Make sure to install axios
import '../css/style.css';
import '../css/responsive.css';
import Nav from './Nav'

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the Django backend
        axios.get('http://localhost:8000/api/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <>
        <Nav />
            <div className="section">
                <div className="container">
                    <div className="posts" id="articles" style={{marginTop:'7%'}}>
                       
                           <div> <h2 className="section-title">ALL Blogs</h2></div>
                            
                            <div className="posts-grid">
                                {posts
                                    
                                    .map(post => (
                                        <div key={post.id} className="post-card">
                                            <img
                                                src={post.image}
                                                className="recent-img"
                                                alt={post.title}
                                            />
                                            <p className="post-date">{new Date(post.created_at).toLocaleDateString()}</p>
                                       
                                            <Link to={`/post_details/${post.id}`}>
                                                <h3 className="post-title">{post.title}</h3>
                                            </Link>
                                            <p className="post-content">{post.content.substring(0, 100) + '...'}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    );
}    