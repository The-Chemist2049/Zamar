import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './Services.css';
import '../../index.css';
import servicesImage from '../../assets/images/services.jpg';
import processImage from '../../assets/images/process.jpg';
import { color } from 'framer-motion';

// Mock data for 5 services with Font Awesome icons
const services = [
  {
    icon: 'fas fa-bullhorn', // Icon for brand activations
    title: 'Brand Activations',
    description: 'Engage your audience with impactful brand activations that create memorable experiences.',
  },
  {
    icon: 'fas fa-store', // Icon for retail marketing
    title: 'Retail Marketing',
    description: 'Boost your retail presence with strategic marketing campaigns tailored to your audience.',
  },
  {
    icon: 'fas fa-lightbulb', // Icon for strategic branding
    title: 'Strategic Branding',
    description: 'Develop a cohesive brand identity that resonates with your target market.',
  },
  {
    icon: 'fas fa-print', // Icon for printing services
    title: 'Printing Services',
    description: 'High-quality printing solutions to bring your brand visuals to life.',
  },
  {
    icon: 'fas fa-paint-brush', // Icon for creative design
    title: 'Creative Design',
    description: 'Innovative design services to enhance your brand’s visual appeal.',
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <section className="services-hero" style={{ backgroundImage: `url(${servicesImage})` }}>
        <div className="container">
          <h1 className="hero-heading">We Offer the Best Branding Services</h1>
          <p className="hero-description">
            Zamar Solutions delivers experiential marketing across East Africa—offering brand activations, retail marketing, strategic branding, and printing services with innovative thinking, flawless execution, and a results-driven approach that brings brands to life.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => {
                const servicesMainSection = document.querySelector('.services-main');
                if (servicesMainSection) {
                  servicesMainSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="button1"
            >
              Explore More
            </button>
            <a href="tel:+254724679202" className="button2">
              Request a Quote
            </a>
          </div>
        </div>
      </section>
      
      <section className="section services-main">
        
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="section service-process" style={{ backgroundImage: `url(${processImage})` }}>
        <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>Our Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Discovery & Strategy</h3>
              <p>
                We begin by understanding your brand, objectives, and target audience
                to develop a tailored strategic approach.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Creative Concept</h3>
              <p>
                Our creative team develops innovative concepts that align with your
                brand identity and campaign objectives.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Implementation</h3>
              <p>
                We execute the planned activations with precision, attention to detail,
                and a focus on creating meaningful experiences.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Measurement & Analysis</h3>
              <p>
                We track performance metrics and provide comprehensive analysis to measure
                the success of our campaigns and identify opportunities for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your brand experience?</h2>
            <p>Contact us today to discuss how our services can help achieve your marketing goals.</p>
            <a href="/contact" className="button1">Get In Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;