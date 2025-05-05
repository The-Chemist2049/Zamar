import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

import image1 from "../../assets/images/lucas.jpg";
import image5 from "../../assets/images/boardroom.jpeg";
import image3 from "../../assets/images/lato.jpeg";
import image4 from "../../assets/images/bottle.jpg";
import image2 from "../../assets/images/streetact.jpeg";
import image6 from "../../assets/images/onfomobile.jpeg";
import image7 from "../../assets/images/kapa.jpeg";
import image8 from "../../assets/images/pen.jpg";

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
      const time = (Date.now() / 20000) % 1; // 20s animation cycle
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

  useEffect(() => {
    const interval = setInterval(updateBackground, 50);

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
    updateBackground();

    return () => {
      clearInterval(interval);
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
                <img
                  src={image1}
                  alt="3D branding concept for product display"
                  loading="lazy"
                />
                <img
                  src={image2}
                  alt="Branded vehicle for outdoor campaign"
                  loading="lazy"
                />
                <img
                  src={image3}
                  alt="Outdoor advertising campaign"
                  loading="lazy"
                />
                <img src={image4} alt="Instore branding setup" loading="lazy" />
                <img
                  src={image5}
                  alt="Event activation display"
                  loading="lazy"
                />
                <img src={image6} alt="Point-of-sale display" loading="lazy" />
                <img
                  src={image7}
                  alt="Creative branding installation"
                  loading="lazy"
                />
                <img
                  src={image8}
                  alt="Team executing branding project"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
