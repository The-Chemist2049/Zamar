import React from "react";
import "./ImpactCard.css";

const ImpactCard = ({ number, suffix, heading }) => {
  return (
    <div className="impact-item">
      <div className="impact-number">
        <span className="number">{number}</span>
        <span className="suffix">{suffix}</span>
      </div>
      <h3 className="impact-heading">{heading}</h3>
    </div>
  );
};

export default ImpactCard;
