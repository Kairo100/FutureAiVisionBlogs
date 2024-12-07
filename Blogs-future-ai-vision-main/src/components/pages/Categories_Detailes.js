import React,  { useState ,useEffect}  from 'react'
import '../css/style.css'
import '../css/responsive.css'
import cat1 from '../images/cat1.png'
import Nav from './Nav'
import { Link } from 'react-router-dom';
import axios from 'axios';  
export default function CategoriesDetails() {

    const [categories, setCategories] = useState([]); // State to hold categories data

 

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
    return(
        <> 
        <Nav />
    <div className='section'>
        <div className='container'>
            <div className='categories'>
            <h2 className='section-title'>Categories Details</h2>
    
            <div className="posts-grid">
                       {categories.map((category) => (
                                        <div key={category.id} className="post-card">
                                            <img
                                                src={category.image}
                                                className="recent-img"
                                                alt={category.title}
                                            />
                                           
                                           <Link to={`/posts/${category.id}`}>
                                                <h3 className="post-title">{category.title}</h3>
                                            </Link>
                                            <p className="post-content">{category.description}</p>
                                        </div>
                                    ))}
                            </div>

           
            </div>
        </div>
    </div>
        </>
    )
}
