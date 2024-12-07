import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '../css/style.css';
import '../css/responsive.css';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
export default function Nav() {
  const navigate = useNavigate(); // Initialize navigate
    const [toggle, setToggle] = useState(false);

    const [dark, setDark] = useState(() => {
        // Retrieve dark mode preference from localStorage or default to false
        return localStorage.getItem('dark-mode') === 'true';
    });
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [searchResults, setSearchResults] = useState([]); // State for search results

    useEffect(() => {
        const blurHeader = () => {
            const header = document.getElementById('header');
            if (header) {
                // Only add/remove class if the header exists
                window.scrollY >= 50
                    ? header.classList.add('blur-header')
                    : header.classList.remove('blur-header');
            }
        };

        // Add the event listener
        window.addEventListener('scroll', blurHeader);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', blurHeader);
        };
    }, []);

    useEffect(() => {
        document.body.classList.toggle('DarkMode', dark);
        localStorage.setItem('dark-mode', dark);
    }, [dark]);

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
          navigate(`/search?search=${searchQuery}`); // Redirect to search page
      }
  };

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="header" id="header">
                        <div className="logo">
                            <Link to="/"><img src={logo} alt="" /></Link>
                        </div>

                        <nav>
                            <i
                                className={`bx ${toggle ? 'bx-x' : 'bx-menu'} btn-menu`}
                                onClick={() => { setToggle(!toggle); }}
                            ></i>
                            <div className={`menu ${toggle ? 'active' : ''}`}>
                                <ul className="list">
                                    <li className="list-item"><Link to="/posts" className="list-link">Articles</Link></li>
                                    <li className="list-item"><Link to="/categories_details" className="list-link">Categories</Link></li>
                                    <li className="list-item"><Link to="/contact" className="list-link">Contact</Link></li>
                                    <li className="list-item"><Link to="/contact" className="list-link btn-contact">Subscribe</Link></li>
                                    <li className={`list-item ${dark ? 'DarkMode' : ''}`}>
                                        <a href="#dark-mode" className="list-link">
                                            <i
                                                className={`bx ${!dark ? 'bx bxs-moon' : 'bx bxs-sun'}`}
                                                onClick={() => { setDark(!dark); }}
                                            ></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="search-form" style={{display:'flex' , backgroundColor:'transparent'}}>
                        <form onSubmit={handleSearchSubmit}  style={{display:'flex' }}>
                            <input
                             
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit">Go</button>
                        </form>
                    </div>
                </div>
                {/* Display search results */}
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h3>Search Results:</h3>
                        <ul>
                            {searchResults.map((post) => (
                                <li key={post.id}>
                                    <Link to={`/search?search=${post.title}`}>{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
