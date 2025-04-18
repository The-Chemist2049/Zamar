import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';
import { services } from '../../data/Services';
import { testimonials } from '../../data/testimonials';
// import { portfolioHighlights } from '../../data/portfolio';
import { clients } from '../../data/clients';
import './Home.css';

const Home = () => {
  return (
    <>
      <HeroSection />
      
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <div className="view-more-container">
            <Link to="/services" className="btn">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="section about-preview-section">
        <div className="container about-preview-container">
          <div className="about-preview-image">
            <img src="/assets/images/about-preview.jpg" alt="About Zamar Solutions" />
          </div>
          <div className="about-preview-content">
            <h2>About Zamar Solutions</h2>
            <p>
              Zamar Solutions Limited is an experiential marketing and branding agency
              (instore and outdoor) that has been in existence for 7 years.
            </p>
            <h3>Our Mission</h3>
            <p>Activations and beyond</p>
            <h3>Our Vision</h3>
            <p>To be the leading corporate retail solutions provider</p>
            <h3>Our Values</h3>
            <ul className="values-list">
              <li>Value centric</li>
              <li>Trust</li>
              <li>Integrity</li>
              <li>Accountability</li>
            </ul>
            <Link to="/about" className="btn">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="section portfolio-preview-section">
        <div className="container">
          <h2 className="section-title">Our Portfolio</h2>
          {/* <div className="portfolio-grid">
            {portfolioHighlights.map((item, index) => (
              <PortfolioItem
                key={index}
                image={item.image}
                title={item.title}
                category={item.category}
                description={item.description}
              />
            ))}
          </div> */}
          <div className="view-more-container">
            <Link to="/portfolio" className="btn">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                text={testimonial.text}
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title">Our Clients</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-logo">
                <img src={client.logo} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to elevate your brand presence?</h2>
            <p>Get in touch with us today and let's create impactful marketing solutions together.</p>
            <Link to="/contact" className="btn btn-large">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

