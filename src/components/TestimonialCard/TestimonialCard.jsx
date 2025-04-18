import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ text, name, position, company, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="quote-icon">
          <i className="icon-quote"></i>
        </div>
        <p className="testimonial-text">{text}</p>
      </div>
      <div className="testimonial-author">
        <div className="author-image">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="author-placeholder">{name.charAt(0)}</div>
          )}
        </div>
        <div className="author-info">
          <h4>{name}</h4>
          <p>{position}, {company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;