import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home'; 
import CategoriesDetails from './components/pages/Categories_Detailes';
import PostDetails from './components/pages/post_detailes';
import Posts from './components/pages/Posts';
import Articles from './components/pages/Articles';
import Categories from './components/pages/Categories';
import Contact from './components/pages/Contact';
import PostID from './components/pages/Post_id.js';
import SearchResults from './components/pages/SearchResult.js'

function App() {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="categories_details/" element={<CategoriesDetails />} /> 
          <Route path="categories/" element={<Categories />} /> 
          <Route path="post_details/:id" element={<PostDetails />} />  
          <Route path="posts/" element={<Posts />} />  
          <Route path="posts/:categoryId" element={<PostID />} />  
          <Route path="articles/" element={<Articles />} />  
          <Route path="contact/" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
