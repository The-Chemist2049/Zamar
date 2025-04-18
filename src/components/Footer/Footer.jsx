import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

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
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-services">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/branding">Branding Solutions</Link></li>
              <li><Link to="/activations">Brand Activations</Link></li>
              <li><Link to="/services">Design & Printing</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><i className="icon-phone"></i> +254 724 679 202 / +254 750 082 211</p>
            <p><i className="icon-envelope"></i> sales@zamarsolutions.co.ke</p>
            <p><i className="icon-envelope"></i> marketing@zamarsolutions.co.ke</p>
            <p><i className="icon-globe"></i> www.zamarsolutions.co.ke</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Zamar Solutions Limited. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="icon-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="icon-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="icon-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="icon-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
