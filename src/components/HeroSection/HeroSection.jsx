import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";
import axios from "axios";

const HeroSection = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [threedimages, setThreedImages] = useState([]);

  // Fetch ThreeD images from the API
  useEffect(() => {
    const getThreeDImages = async () => {
      try {
        const response = await axios.get(
          "https://zamarsolutions.co.ke/Zamar/api/get_images.php"
        );
        const items = response.data;
        const filtered = items.filter((item) => item.category === "ThreeD");
        setThreedImages(filtered);
      } catch (error) {
        console.error("Error fetching ThreeD images:", error);
      }
    };
    getThreeDImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          carouselRef.current.style.animationPlayState =
            entry.isIntersecting && !isPaused ? "running" : "paused";
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(carouselRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPaused]);

  const handleCarouselClick = () => {
    setIsPaused(!isPaused);
    carouselRef.current.style.animationPlayState = isPaused
      ? "running"
      : "paused";
  };

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-container">
        <div className="hero-content">
          <h1>Building Brands, Empowering Teams</h1>
          <p>
            Zamar Solutions is a leading experiential marketing and branding
            agency with 7 years of expertise in retail marketing, brand
            activations and more.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="btn">
              Our Services
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="right">
          <div className="col-md-4 text-center">
            <div
              className="carousel-3d-wrapper"
              role="region"
              aria-label="3D branding showcase carousel"
              onClick={handleCarouselClick}
              style={{ cursor: "pointer" }}
            >
              <div className="carousel-3d" id="carousel" ref={carouselRef}>
                {threedimages.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_URL}
                    alt={`3D image ${index + 1}`}
                    loading="eager"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
