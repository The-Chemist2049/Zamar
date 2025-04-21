import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ icon, title, description, className = "" }) => {
  return (
    <div className={`service-card ${className}`}>
      <div className="service-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
