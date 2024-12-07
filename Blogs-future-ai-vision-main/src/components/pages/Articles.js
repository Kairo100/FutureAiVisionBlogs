
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';  // Make sure to install axios
import '../css/style.css';
import '../css/responsive.css';
import recent1 from '../images/recent1.png';
import popural1 from '../images/popural1.png';

export default function Articles() {
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
            <div className='section'>
                <div className='container'>
                    <div className='articles' id="articles">
                        <div className='recent-posts'>
                            <h2 className='section-title'>Recent Posts</h2>
                            <small>Don't Miss It!</small>
                            {posts.filter(post => !post.popular).slice(-3).map(post => (
                                <div key={post.id} className='r-post1'>
                                    <img src={post.image} className='recent-img' alt={post.title} />
                                    <p className='span-title'>{post.date}</p>
                                    <Link to={`/post_details/${post.id}`} style={{color:'#1E88E5'}}>  <h3 className='section-title-2'>{post.title}</h3></Link>
                                    <p>{post.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className='popural-posts'>
                            <h2 className='section-title'>Popular Posts</h2>
                           
                            {posts.filter(post => post.popular).slice(-10).map(post => (
                                 <>
                                <div key={post.id} className='p-post1'>
                                    <div className='div-img'>
                                        <img src={`${post.image}`} className='popular-img' alt={post.title} />
                                    </div>
                                    <div>
                                        <p className='span-title'>{post.date}</p>
                                        <Link to={`/post_details/${post.id}`} style={{color:'#1E88E5'}}><h3 className='section-title-2'>{post.title}</h3></Link>
                                        <p className='p-text'>{post.content}</p>
                                    </div>
                                   
                                </div>
                                 <hr></hr>
                                 </>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
