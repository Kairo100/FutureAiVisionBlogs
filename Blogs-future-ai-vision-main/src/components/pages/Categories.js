// import React,  { useState ,useEffect}  from 'react'
// import '../css/style.css'
// import '../css/responsive.css'
// import cat1 from '../images/cat1.png'
// import { Link } from 'react-router-dom'
 
// export default function Categories() {
//     return(
//         <> 
//     <div className='section'>
//         <div className='container'>
//             <div className='categories' id="categories">
//             <h2 className='section-title'>Categories</h2>
//             <div className='cat'>
//                 <div className='categories'>
//                     <img className='cat-img' src={cat1} />
//                     <p className='span-title'>AI Trends</p>
//                     <p>Stay updated with the latest developments
//                          and breakthroughs in artificial intelligence. 
//                          Discover emerging trends and technologies shaping the future of AI.</p>
//                 </div>
//                 <div className='categories'>
//                     <img className='cat-img' src={cat1} />
//                     <p className='span-title'>AI Trends</p>
//                     <p>Stay updated with the latest developments
//                          and breakthroughs in artificial intelligence. 
//                          Discover emerging trends and technologies shaping the future of AI.</p>
//                 </div>
//             </div>
//             <div className='cat'>
//                 <div className='categories'>
//                     <img className='cat-img' src={cat1} />
//                     <p className='span-title'>AI Trends</p>
//                     <p>Stay updated with the latest developments
//                          and breakthroughs in artificial intelligence. 
//                          Discover emerging trends and technologies shaping the future of AI.</p>
//                 </div>
//                 <div className='categories'>
//                     <img className='cat-img' src={cat1} />
//                     <p className='span-title'>AI Trends</p>
//                     <p>Stay updated with the latest developments
//                          and breakthroughs in artificial intelligence. 
//                          Discover emerging trends and technologies shaping the future of AI.</p>
//                 </div>
//             </div>
//             <button><Link to='/categories_details/' style={{color:"white "}}>Go to Categories Details</Link></button>
//             </div>
//         </div>
//     </div>
//         </>
//     )
// }
import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';
import axios from 'axios';  

export default function Categories() {
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





  return (
    <>
      <div className='section'>
        <div className='container'>
          <div className='categories' id='categories'>
            <h2 className='section-title'>Categories</h2>
            


            <div className="posts-grid">
            {categories  .sort((a, b) => b.post_count - a.post_count)  // Sort by post_count in descending order
  .slice(0, 3)  // Show only top 3 categories with most posts
  .map((category) => (
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



            <button>
              <Link to='/categories_details/' style={{ color: 'white' }}>
                Go to Categories Details
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
