import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { services } from '../../data/Services';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive marketing and branding solutions to elevate your business</p>
        </div>
      </section>
      
      <section className="section services-main">
        <div className="container">
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
      
      <section className="section service-process">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
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
            <a href="/contact" className="btn btn-large">Get In Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;