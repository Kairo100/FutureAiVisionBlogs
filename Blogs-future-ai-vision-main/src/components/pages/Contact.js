import React,  { useState ,useEffect}  from 'react'
import '../css/style.css'
import '../css/responsive.css'
import Nav from './Nav'
import axios from 'axios';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/subscribe/', { email })
            .then((response) => {
                setMessage(response.data.message);
                setEmail(''); // Clear the input field on success
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.message || 'An error occurred';
                setMessage(errorMsg);
            });
    };
    return(

        
        <> 
        < Nav/>
    <div className='section'>
        <div className='container'>
          <div className='contact' id="contact" style={{marginTop:'15%'}}>
          <h2 className='section-title' style={{ textAlign: "center" }}>Contact</h2>

          <div className='cont'>
            <div className='about'>
            <h4 className='section-title' style={{ fontSize: "20px" }}>About</h4>
            <p>Our mission is to provide you with the latest insights, trends, 
                and advancements in AI, helping you stay informed and ahead of the curve.
            At FutureAIVision, we believe in the transformative power of AI and
            its potential to reshape our future. Whether you're a tech enthusiast,
             a professional in the field, or a curious learner, our blog offers a wealth of resources to cater to your interests.  </p>
            </div>
            <div className='sub'>
              <h3 className='span-title'>Stay Updated with the Latest in AI!</h3>
              <p>Subscribe to our newsletter</p>
              <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>} {/* Display feedback message */}
            </div>
            
            <div className='social-media'>
                <a href="mailto:info@futureaivision.com" className='social-icon'><i className='bx bxs-envelope'> </i>   futureaivision@info.com</a>
                <a href="https://www.facebook.com/futureaivision" className='social-icon'><i className='bx bxl-facebook-circle'> </i> future-ai-vision</a>
                <a href="https://www.instagram.com/futureaivision" className='social-icon'><i className='bx bxl-instagram-alt'> </i> @futureaivision</a>
            </div>
            </div>
          </div>
          </div>
        
    </div>
    </>
    )
}
