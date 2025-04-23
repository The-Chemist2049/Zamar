import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Note: Ensure Font Awesome is included in your project.
// Add this to your HTML head: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-info">
            <h3 className="footer-logo">
              <span>ZAMAR</span> Solutions
            </h3>
            <p>
              An experiential marketing and branding agency specializing in
              retail marketing, activations, and branding solutions.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-services">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Branding Solutions</Link></li>
              <li><Link to="/services">Brand Activations</Link></li>
              <li><Link to="/services">Design & Printing</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><i className="fas fa-phone"></i> +254 724 679 202 / +254 750 082 211</p>
            <p><i className="fas fa-envelope"></i> sales@zamarsolutions.co.ke</p>
            <p><i className="fas fa-envelope"></i> marketing@zamarsolutions.co.ke</p>
            <p><i className="fas fa-globe"></i> www.zamarsolutions.co.ke</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zamar Solutions Limited. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;