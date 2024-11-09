import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} className='imgf' alt="" />
                <p> We are dedicated to bringing you the best food delivery experience. Our platform offers a wide range of cuisines and dishes to satisfy your cravings. Whether you are in the mood for fast food or gourmet meals, we have something for everyone.</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-2289</li>
                    <li>contact@foodie.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>CopyRight 2024 @ Foodie.com -All Right Reversed</p>
    </div>
  )
}

export default Footer