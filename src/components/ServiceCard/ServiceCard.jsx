import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="/contact" className="inquire-button">
        Inquire Now
      </a>
    </div>
  );
};

export default ServiceCard;