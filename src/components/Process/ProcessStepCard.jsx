import React from "react";
import "./ProcessStepCard.css"; // Ensure you have the correct path to your CSS file

const ProcessStepCard = ({ step, title, description }) => {
  return (
    <div className="process-step">
      <div className="step-number">{step}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProcessStepCard;
