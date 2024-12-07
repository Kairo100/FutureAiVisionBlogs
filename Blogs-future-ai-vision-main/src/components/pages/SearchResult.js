import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav'
import {Link} from 'react-router-dom'
export default function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation(); // To access the query string
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search'); // Extract the search term
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`http://localhost:8000/api/posts/?search=${searchQuery}`)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [searchQuery]);

    return (
        <>
        <Nav />
        <div className="section">
        <div className="container" style={{margin:'7%'}}>
        <h1>Search Results for "{searchQuery}"</h1>
        
        {searchResults.length > 0 ? (
                        <div className="posts-grid">
                            {searchResults.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                                <div key={post.id} className="post-card">
                                    <p className="post-date">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                    <Link to={`/post_details/${post.id}`}>
                                        <h3 className="post-title">{post.title}</h3>
                                    </Link>
                                    <p className="post-content">
                                        {post.content.substring(0, 100) + '...'}
                                    </p>
                                </div>
                                
                            ))}
                            </div>
                    ) : (
                        <p>No results found for "{searchQuery}".</p>
                    )}

       {/* <div className="search-results-page"> */}
            
        {/* /*  {searchResults.length > 0 ? ( */ }
        {/* //         <ul>
        //             {searchResults.map((post) => ( */}
        {/* //                 <li key={post.id}>
        //                     <a href={`/posts/${post.id}`}>{post.title}</a>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p>No results found for "{searchQuery}".</p>
        //     )}
        // </div> */}
   
    </div>
    </div> </>
    );
}
