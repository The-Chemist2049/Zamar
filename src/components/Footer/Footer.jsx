import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-info">
            <h3 className="footer-logo">
              <span>ZAMAR</span> Solutions
            </h3>
            <p>
              An innovative experiential marketing and branding agency elevating
              businesses through strategic retail marketing, immersive
              activations, and distinctive branding solutions.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/projects">Our Work</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <p>
              <i className="fas fa-phone-alt"></i> +254 724 679 202 / +254 750
              082 211
            </p>
            <p>
              <i className="fas fa-envelope"></i> sales@zamarsolutions.co.ke
            </p>
            <p>
              <i className="fas fa-envelope"></i> marketing@zamarsolutions.co.ke
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> Nairobi, Kenya
            </p>
            <p>
              <i className="fas fa-globe"></i> www.zamarsolutions.co.ke
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Zamar Solutions Limited. All Rights Reserved.</p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
