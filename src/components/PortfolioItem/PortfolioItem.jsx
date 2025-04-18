import React from 'react';
import './PortfolioItem.css';

const PortfolioItem = ({ image, title, category, description }) => {
  return (
    <div className="portfolio-item">
      <div className="portfolio-image">
        <img src={image} alt={title} />
        <div className="portfolio-overlay">
          <div className="portfolio-info">
            <h3>{title}</h3>
            <span className="portfolio-category">{category}</span>
            <p className="portfolio-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;