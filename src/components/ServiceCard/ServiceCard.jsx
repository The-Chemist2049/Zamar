import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ icon, image, title, description, className = "" }) => {
  return (
    <div className={`service-card ${className}`}>
      <div className="service-icon">
        {image ? (
          <img src={image} alt={title} className="service-image" />
        ) : (
          <i className={icon}></i>
        )}
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
