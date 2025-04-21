import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const carouselRef = useRef(null);

  const colors = [
    '#f5f2e4', // 1.jpg
    '#f2f2eb', // 2.jpg
    '#f5fafc', // 3.jpg
    '#f5faf8', // 4.jpg
    '#fdfcff', // 5.jpg
    '#f7f7ff', // 6.jpg
    '#fafafa', // 7.jpg
    '#f2f0e9'  // 8.jpg
  ];

  const rgbToArray = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 3e16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const arrayToRgb = ([r, g, b]) => {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  const updateBackground = () => {
    const carousel = carouselRef.current;
    let angle = parseFloat(carousel.style.transform?.replace('rotateY(', '')?.replace('deg)', '') || '0');
    if (!carousel.style.transform) {
      const time = (Date.now() / 20000) % 1; // 20s animation cycle
      angle = time * 360;
    }
    angle = (angle % 360 + 360) % 360; // Normalize to 0–360

    const segment = 360 / 8; // 45 degrees per image
    let totalWeight = 0;
    let blendedRgb = [0, 0, 0];
    colors.forEach((color, index) => {
      const imageAngle = index * segment;
      const angularDistance = Math.abs(((angle - imageAngle + 180) % 360) - 180);
      const maxDistance = segment / 2; // 22.5 degrees
      const weight = Math.max(0, 1 - angularDistance / maxDistance); // Linear fade
      totalWeight += weight;
      const rgb = rgbToArray(color);
      blendedRgb[0] += rgb[0] * weight;
      blendedRgb[1] += rgb[1] * weight;
      blendedRgb[2] += rgb[2] * weight;
    });

    if (totalWeight > 0) {
      blendedRgb = blendedRgb.map(c => c / totalWeight);
      const blendedColor = arrayToRgb(blendedRgb);
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, ${blendedColor}, #ffffff)`;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateBackground, 50);

    let touchStartX = 0;
    const carouselWrapper = carouselRef.current.parentElement;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        const carousel = carouselRef.current;
        let angle = parseFloat(carousel.style.transform?.replace('rotateY(', '')?.replace('deg)', '') || '0');
        angle += (deltaX > 0 ? -1 : 1) * (360 / 8);
        carousel.style.animation = 'none';
        carousel.style.transform = `rotateY(${angle}deg)`;
        updateBackground();
      }
    };

    carouselWrapper.addEventListener('touchstart', handleTouchStart);
    carouselWrapper.addEventListener('touchend', handleTouchEnd);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        carouselRef.current.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.1 });
    observer.observe(carouselRef.current);

    updateBackground();

    return () => {
      clearInterval(interval);
      carouselWrapper.removeEventListener('touchstart', handleTouchStart);
      carouselWrapper.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container hero-section">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row align-items-center">
              {/* Left Content */}
              <div className="col-md-4">
                <div className="hero-content">
                  <h2 className="fw-bold mb-4">
                    Experiential Branding That Moves Markets<br />and Elevates Customer Loyalty.
                  </h2>
                  <p className="fs-5 mb-5">
                    Trusted by leading product brands for 7+ years<br />from Outdoor to Instore to Activations.
                  </p>
                  <div className="hero-buttons">
                    <Link to="/assets/profile.pdf" className="btn btn-red px-4 py-2" aria-label="Download Zamar Solutions company profile">
                      Download Profile
                    </Link>
                    <Link to="/contact" className="btn btn-outline-red px-4 py-2" aria-label="Start a new project with Zamar Solutions">
                      Start a Project
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3D Image Carousel */}
              <div className="col-md-4 text-center">
              <div className="carousel-3d-wrapper" role="region" aria-label="3D branding showcase carousel">
  <div className="carousel-3d" id="carousel" ref={carouselRef}>
    <img src="src/assets/images/1.jpg" alt="3D branding concept for product display" loading="lazy" />
    <img src="src/assets/images/2.jpg" alt="Branded vehicle for outdoor campaign" loading="lazy" />
    <img src="src/assets/images/3.jpg" alt="Outdoor advertising campaign" loading="lazy" />
    <img src="src/assets/images/4.jpg" alt="Instore branding setup" loading="lazy" />
    <img src="src/assets/images/5.jpg" alt="Event activation display" loading="lazy" />
    <img src="src/assets/images/6.jpg" alt="Point-of-sale display" loading="lazy" />
    <img src="src/assets/images/7.jpg" alt="Creative branding installation" loading="lazy" />
    <img src="src/assets/images/8.jpg" alt="Team executing branding project" loading="lazy" />
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;