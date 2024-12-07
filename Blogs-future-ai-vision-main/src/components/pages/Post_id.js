import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav'
import {Link} from 'react-router-dom'
export default function PostID() {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]); 
  useEffect(() => {
    // Fetch posts from the Django backend
    axios.get('http://localhost:8000/api/categories/')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}, []);

  useEffect(() => {
    // Fetch posts for the given category
    axios.get(`http://localhost:8000/api/posts/?category=${categoryId}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [categoryId]);

  return (
    <>
    < Nav/>
    <div className="section">
      <div className="container">
        <h2 className="section-title" style={{marginTop:'7%'}}>Posts for Category {categories.find(cat => cat.id == categoryId)?.title || 'Unknown Category'}</h2>
        


        <div className="posts-grid" >
        {posts.filter(post => post.category == categoryId).map(post => (
                                        <div key={post.id} className="post-card">
                                           
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
    </>
  );
}
