import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectPage.css";

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [imagesByCategory, setImagesByCategory] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupImage, setPopupImage] = useState(null);

  const categories = [
    { name: "All", subcategories: [] },
    {
      name: "Brand_Activations",
      subcategories: ["Indoor", "Outdoor"],
    },
    {
      name: "Indoor_and_Outdoor_Branding",
      subcategories: ["Indoor", "Outdoor"],
    },
    { name: "Digital_Screen_Marketing", subcategories: [] },
    { name: "Digital_Marketing", subcategories: [] },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://zamarsolutions.co.ke/Zamar/api/get_images.php"
        );

        const grouped = {};

        categories.forEach((cat) => {
          if (cat.name !== "All") {
            grouped[cat.name] = {};
            if (cat.subcategories.length > 0) {
              cat.subcategories.forEach((sub) => {
                grouped[cat.name][sub] = [];
              });
            } else {
              grouped[cat.name]["main"] = [];
            }
          }
        });

        response.data.forEach((img) => {
          const { category, subcategory = "main", image_URL } = img;
          if (grouped[category]) {
            if (!grouped[category][subcategory]) {
              grouped[category][subcategory] = [];
            }
            grouped[category][subcategory].push(image_URL);
          }
        });

        setImagesByCategory(grouped);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Disable body scroll when popup is open
    if (popupImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popupImage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const openImagePopup = (imageUrl) => {
    setPopupImage(imageUrl);
  };

  const closeImagePopup = () => {
    setPopupImage(null);
  };

  const renderImages = () => {
    if (selectedCategory === "All") {
      return Object.entries(imagesByCategory).map(([cat, subcats]) => (
        <div key={cat} className="product-section">
          <h2 className="product-company">{cat.replaceAll("_", " ")}</h2>
          {Object.entries(subcats).map(([sub, imgs]) =>
            imgs.length > 0 ? (
              <div key={sub} className="subcategory-section">
                {sub !== "main" && <h3 className="subcategory-title">{sub}</h3>}
                <div className="product-grid">
                  {imgs.map((url, i) => (
                    <div key={i} className="product-card">
                      <img
                        src={url}
                        alt={`img-${i}`}
                        className="product-image"
                        onClick={() => openImagePopup(url)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      ));
    }

    const subcats = imagesByCategory[selectedCategory] || {};

    if (selectedSubcategory) {
      const imgs = subcats[selectedSubcategory] || [];
      return (
        <div className="product-section">
          <h2 className="product-company">
            {selectedCategory.replaceAll("_", " ")}
          </h2>
          <h3 className="subcategory-title">{selectedSubcategory}</h3>
          <div className="product-grid">
            {imgs.length > 0 ? (
              imgs.map((img, idx) => (
                <div key={idx} className="product-card">
                  <img
                    src={img}
                    alt={`img-${idx}`}
                    className="product-image"
                    onClick={() => openImagePopup(img)}
                  />
                </div>
              ))
            ) : (
              <p>No images in this subcategory.</p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="product-section">
        <h2 className="product-company">
          {selectedCategory.replaceAll("_", " ")}
        </h2>
        {Object.entries(subcats).map(([sub, imgs]) =>
          imgs.length > 0 ? (
            <div key={sub} className="subcategory-section">
              {sub !== "main" && <h3 className="subcategory-title">{sub}</h3>}
              <div className="product-grid">
                {imgs.map((img, idx) => (
                  <div key={idx} className="product-card">
                    <img
                      src={img}
                      alt={`img-${idx}`}
                      className="product-image"
                      onClick={() => openImagePopup(img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    );
  };

  return (
    <div className="product-page-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categories</h2>
        {categories.map((cat) => (
          <div key={cat.name} className="category-item">
            <button
              className={`category-button ${
                selectedCategory === cat.name && !selectedSubcategory
                  ? "active"
                  : ""
              }`}
              onClick={() => handleCategoryClick(cat.name)}
            >
              {cat.name.replaceAll("_", " ")}
              {cat.subcategories.length > 0 && (
                <span className="expand-icon">
                  {expandedCategories[cat.name] ? "−" : "+"}
                </span>
              )}
            </button>
            {expandedCategories[cat.name] &&
              cat.subcategories.map((sub) => (
                <button
                  key={sub}
                  className={`subcategory-button ${
                    selectedCategory === cat.name && selectedSubcategory === sub
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleSubcategoryClick(sub)}
                >
                  {sub}
                </button>
              ))}
          </div>
        ))}
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="header-title">Our Projects</h1>
          <p className="header-description">
            Explore our diverse range of projects, showcasing our expertise in
            various categories. Click on a category to view the images.
          </p>
        </header>
        {loading ? (
          <div className="spinner">
            <div className="spin"></div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          renderImages()
        )}
      </main>

      {/* Image Popup */}
      {popupImage && (
        <div className="image-popup-overlay" onClick={closeImagePopup}>
          <div
            className="image-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-popup" onClick={closeImagePopup}>
              &times;
            </button>
            <img src={popupImage} alt="Full size" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
}
