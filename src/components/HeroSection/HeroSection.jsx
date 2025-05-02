import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

import image1 from "../../assets/images/1.jpg";
import image2 from "../../assets/images/2.jpg";
import image3 from "../../assets/images/3.jpg";
import image4 from "../../assets/images/4.jpg";
import image5 from "../../assets/images/5.jpg";
import image6 from "../../assets/images/6.jpg";
import image7 from "../../assets/images/7.jpg";
import image8 from "../../assets/images/8.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const colors = [
  "#f5f2e4",
  "#f2f2eb",
  "#f5fafc",
  "#f5faf8",
  "#fdfcff",
  "#f7f7ff",
  "#fafafa",
  "#f2f0e9",
];

const HeroSection = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(null);
  const touchMoveThreshold = 5; // Sensitivity for detecting movement

  const rgbToArray = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const arrayToRgb = ([r, g, b]) => {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  const updateBackground = () => {
    const carousel = carouselRef.current;
    let angle = parseFloat(
      carousel.style.transform?.replace("rotateY(", "").replace("deg)", "") ||
        "0"
    );
    if (!carousel.style.transform) {
      const time = (Date.now() / 20000) % 1;
      angle = time * 360;
    }
    angle = ((angle % 360) + 360) % 360;

    const segment = 360 / images.length;
    let totalWeight = 0;
    let blendedRgb = [0, 0, 0];

    colors.forEach((color, index) => {
      const imageAngle = index * segment;
      const angularDistance = Math.abs(
        ((angle - imageAngle + 180) % 360) - 180
      );
      const maxDistance = segment / 2;
      const weight = Math.max(0, 1 - angularDistance / maxDistance);
      totalWeight += weight;
      const rgb = rgbToArray(color);
      blendedRgb[0] += rgb[0] * weight;
      blendedRgb[1] += rgb[1] * weight;
      blendedRgb[2] += rgb[2] * weight;
    });

    if (totalWeight > 0) {
      blendedRgb = blendedRgb.map((c) => c / totalWeight);
      const blendedColor = arrayToRgb(blendedRgb);
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, ${blendedColor}, #ffffff)`;
      }
    }
  };

  const pauseCarousel = (e) => {
    if (!isPaused) {
      setIsPaused(true);
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = "paused";
      }
      
      // Add the paused class to the clicked image
      if (e && e.target) {
        const images = carouselRef.current.querySelectorAll('img');
        images.forEach(img => img.classList.remove('paused'));
        e.target.classList.add('paused');
      }
      
      // Store touch position for movement detection
      if (e.touches) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else if (e.clientX) {
        touchStartRef.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    }
  };

  const resumeCarousel = () => {
    if (isPaused) {
      setIsPaused(false);
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = "running";
        
        // Remove paused class from all images
        const images = carouselRef.current.querySelectorAll('img');
        images.forEach(img => img.classList.remove('paused'));
      }
      touchStartRef.current = null;
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pauseCarousel(e);
  };
  
  const handleImageTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pauseCarousel(e);
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current || !isPaused) return;

    const currentTouch = e.touches ? e.touches[0] : e;
    const dx = Math.abs(currentTouch.clientX - touchStartRef.current.x);
    const dy = Math.abs(currentTouch.clientY - touchStartRef.current.y);
    
    // If the user moves more than the threshold, resume the carousel
    if (dx > touchMoveThreshold || dy > touchMoveThreshold) {
      resumeCarousel();
    }
  };

  const handleScroll = () => {
    // Resume carousel on any scroll
    if (isPaused) {
      resumeCarousel();
    }
  };

  const handleMouseMove = (e) => {
    // If paused and there's previous touch position stored, check for movement
    if (isPaused && touchStartRef.current) {
      const dx = Math.abs(e.clientX - touchStartRef.current.x);
      const dy = Math.abs(e.clientY - touchStartRef.current.y);
      
      if (dx > touchMoveThreshold || dy > touchMoveThreshold) {
        resumeCarousel();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateBackground, 50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isPaused && carouselRef.current) {
            carouselRef.current.style.animationPlayState = entry.isIntersecting
              ? "running"
              : "paused";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    updateBackground();

    // Add event listeners
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused]);

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
            >
              <div className="carousel-3d" id="carousel" ref={carouselRef}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Branding showcase ${index + 1}`}
                    loading="lazy"
                    onClick={handleImageClick}
                    onTouchStart={handleImageTouch}
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