import { useState } from "react";
import "./ProjectPage.css";

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    { name: "All", subcategories: [] },
    {
      name: "Brand Activation",
      subcategories: ["Indoor", "Outdoor"],
    },
    {
      name: "Indoor and Outdoor Branding",
      subcategories: ["Indoor", "Outdoor"],
    },
    { name: "Digital Screen Marketing", subcategories: [] },
    { name: "Digital Marketing", subcategories: [] },
  ];

  const products = [
    {
      company: "Kapa oils",
      images: [
        "/api/placeholder/300/220",
        "/api/placeholder/300/220",
        "/api/placeholder/300/220",
      ],
    },
    {
      company: "Tissue Kenya Ltd",
      images: [
        "/api/placeholder/300/220",
        "/api/placeholder/300/220",
        "/api/placeholder/300/220",
      ],
    },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));

    // Also set as active
    setActiveCategory(categoryName);
  };

  const selectSubcategory = (subcategory) => {
    setActiveCategory(subcategory);
  };

  return (
    <div className="product-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <div className="categories-list">
          {categories.map((category) => (
            <div key={category.name} className="category-item">
              <button
                onClick={() => toggleCategory(category.name)}
                className={`category-button ${
                  activeCategory === category.name ? "active" : ""
                }`}
              >
                <span>{category.name}</span>
                {category.subcategories.length > 0 && (
                  <span className="expand-icon">
                    {expandedCategories[category.name] ? "-" : "+"}
                  </span>
                )}
              </button>

              {/* Subcategories */}
              {expandedCategories[category.name] &&
                category.subcategories.length > 0 && (
                  <div className="subcategories">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => selectSubcategory(subcategory)}
                        className={`subcategory-button ${
                          activeCategory === subcategory ? "active" : ""
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {products.map((product, index) => (
          <div key={index} className="product-section">
            <h2 className="product-company">{product.company}</h2>
            <div className="product-grid">
              {product.images.map((image, imgIndex) => (
                <div key={imgIndex} className="product-card">
                  <img
                    src={image}
                    alt={`${product.company} image ${imgIndex + 1}`}
                    className="product-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
