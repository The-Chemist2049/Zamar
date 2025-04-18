import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Building Brands, Empowering Teams</h1>
          <p>
            Zamar Solutions is a leading experiential marketing and branding agency with
            7 years of expertise in retail marketing, brand activations and more.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="btn">Our Services</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
