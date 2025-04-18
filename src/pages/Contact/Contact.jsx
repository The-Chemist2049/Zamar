import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
    
    // Reset submission message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Reach out to us for all your brand activation and marketing needs</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Office</h3>
            <p>Nairobi, Kenya</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3>Phone</h3>
            <p>+254 724 679 202</p>
            <p>+254 750 082 211</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>sales@zamarsolutions.co.ke</p>
            <p>marketing@zamarsolutions.co.ke</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3>Website</h3>
            <p>www.zamarsolutions.co.ke</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          {submitted && <div className="success-message">Thank you for your message! We'll get back to you soon.</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          <p>Map will be embedded here</p>
          {/* You would typically use Google Maps or another map service here */}
          {/* Example: <iframe src="https://www.google.com/maps/embed?..."></iframe> */}
        </div>
      </div>
      
      <div className="services-overview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Brand Activations</h3>
            <p>Strategic consulting, retail marketing, trade marketing, roadshows, and more</p>
          </div>
          <div className="service-item">
            <h3>Design & Printing</h3>
            <p>Wall branding, vehicle branding, promotional items, and signage solutions</p>
          </div>
          <div className="service-item">
            <h3>In-store Marketing</h3>
            <p>Category branding, merchandising, and promotional displays</p>
          </div>
          <div className="service-item">
            <h3>Outdoor Advertising</h3>
            <p>Billboards, hoardings, and special advertising installations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;