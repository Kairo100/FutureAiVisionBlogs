
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/responsive.css';
import Nav from './Nav';
import hero from '../images/hero.png';
import Articles from './Articles';
import Categories from './Categories';
import Contact from './Contact';
import {Link} from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([]);

    // Fetch posts when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/')  // Update the URL if needed
            .then(response => {
                setPosts(response.data);  // Store the posts in state
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div>
            <Nav />
            <div className="section">
                <div className="container">
                    <div className="hero" id="home">
                        <div className="upper">
                            <div className="left">
                                <img src={hero} className="hero-img" alt="Hero" />
                            </div>
                            <div className="right">
                                <h1 className="hero-title">
                                    Stay Ahead With The Latest in <span className="span-title">AI and Tech</span>
                                </h1>
                                <p className="para-hero">
                                    Discover cutting-edge AI advancements, in-depth tutorials, and expert insights.
                                </p>
                                <div className="buttons">
                                    <button className="btn"><Link to='categories_details/' style={{color:"white "}}>Explore Now</Link></button>
                                    <button className="btn">Subscribe</button>
                                </div>

                                <div className="hot-topics">
                                    <div className="div1">
                                        <h4>HOT TOPICS</h4>
                                        <p>
                                            Welcome to FutureAIVision – your gateway to the latest AI trends, tutorials, tool reviews, and cutting-edge insights.
                                        </p>
                                    </div>

                                    {/* Dynamically render hot topics */}
                                    {posts.filter(post => post.hot).map(post => (
                                        <div key={post.id} className={`div2`}>
                                            <img src={`${post.image}`} className='post-img' alt={post.title} />
                                            <Link to={`/post_details/${post.id}`} style={{color:"blue"}}><h5>{post.title}</h5></Link>
                                            <p>{post.content.substring(0, 100)}...</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Articles />
            <Categories />
            <Contact />
        </div>
    );
}
